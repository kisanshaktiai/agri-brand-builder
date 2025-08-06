import { supabase } from '@/integrations/supabase/client';
import type { FormSubmissionData, FormValidationResult, FormConfiguration } from '@/types/UniversalForm';

interface LeadSubmissionResult {
  success: boolean;
  leadId?: string;
  error?: string;
  warnings?: string[];
  duplicateDetected?: boolean;
  leadScore?: number;
}

interface RetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

interface OfflineQueueItem {
  id: string;
  data: FormSubmissionData;
  attempts: number;
  lastAttempt?: string;
  status: 'pending' | 'processing' | 'failed' | 'completed';
}

export class AdvancedLeadsService {
  private config: FormConfiguration;
  private retryOptions: RetryOptions = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2
  };
  private offlineQueue: OfflineQueueItem[] = [];
  private isOnline: boolean = navigator.onLine;

  constructor(config: FormConfiguration) {
    this.config = config;
    this.initializeOfflineSupport();
    this.loadOfflineQueue();
  }

  private initializeOfflineSupport(): void {
    if (!this.config.features.enableOfflineSupport) return;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processOfflineQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private loadOfflineQueue(): void {
    try {
      const stored = localStorage.getItem(`leads_queue_${this.config.websiteId}`);
      if (stored) {
        this.offlineQueue = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load offline queue:', error);
    }
  }

  private saveOfflineQueue(): void {
    try {
      localStorage.setItem(
        `leads_queue_${this.config.websiteId}`,
        JSON.stringify(this.offlineQueue)
      );
    } catch (error) {
      console.warn('Failed to save offline queue:', error);
    }
  }

  async submitLead(submissionData: FormSubmissionData): Promise<LeadSubmissionResult> {
    console.log('AdvancedLeadsService: Starting lead submission...', submissionData);

    try {
      // Validate submission data
      const validation = this.validateSubmission(submissionData);
      if (!validation.isValid) {
        console.error('Validation failed:', validation.errors);
        return {
          success: false,
          error: `Validation failed: ${Object.values(validation.errors).flat().join(', ')}`
        };
      }

      // Check for duplicates if enabled
      let duplicateDetected = false;
      if (this.config.features.enableDuplicateDetection) {
        duplicateDetected = await this.checkForDuplicates(submissionData.data);
      }

      // Calculate lead score if enabled
      let leadScore: number | undefined;
      if (this.config.features.enableLeadScoring) {
        leadScore = this.calculateLeadScore(submissionData.data);
      }

      // Handle offline submission
      if (!this.isOnline && this.config.features.enableOfflineSupport) {
        return this.queueForOfflineSubmission(submissionData);
      }

      // Submit to database with retry logic
      const result = await this.submitWithRetry(submissionData, leadScore);
      
      if (result.success) {
        // Track analytics
        if (this.config.features.enableAnalytics) {
          await this.trackAnalytics(submissionData, result.leadId!);
        }

        // Trigger webhooks
        if (this.config.schema.integrations?.webhooks) {
          this.triggerWebhooks(submissionData, result.leadId!).catch(console.error);
        }
      }

      return {
        ...result,
        duplicateDetected,
        leadScore
      };

    } catch (error) {
      console.error('AdvancedLeadsService: Unexpected error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }

  private validateSubmission(data: FormSubmissionData): FormValidationResult {
    const errors: Record<string, string[]> = {};
    const warnings: Record<string, string[]> = {};

    // Basic validation
    if (!data.formId) {
      errors.formId = ['Form ID is required'];
    }

    if (!data.data || Object.keys(data.data).length === 0) {
      errors.data = ['Form data is required'];
    }

    // Validate required fields based on schema
    const requiredFields = this.config.schema.fields.filter(field => field.required);
    
    for (const field of requiredFields) {
      if (!data.data[field.id] || data.data[field.id] === '') {
        if (!errors[field.id]) errors[field.id] = [];
        errors[field.id].push(`${field.label} is required`);
      }
    }

    // Email validation
    const emailFields = this.config.schema.fields.filter(field => field.type === 'email');
    for (const field of emailFields) {
      const value = data.data[field.id];
      if (value && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
        if (!errors[field.id]) errors[field.id] = [];
        errors[field.id].push('Please enter a valid email address');
      }
    }

    // Validate form values against database constraints
    const constraintErrors = this.validateConstraints(data.data);
    Object.keys(constraintErrors).forEach(field => {
      if (!errors[field]) errors[field] = [];
      errors[field].push(...constraintErrors[field]);
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings: Object.keys(warnings).length > 0 ? warnings : undefined
    };
  }

  private validateConstraints(data: Record<string, any>): Record<string, string[]> {
    const errors: Record<string, string[]> = {};

    // Validate organization_type
    if (data.organization_type && !['agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'].includes(data.organization_type)) {
      errors.organization_type = ['Invalid organization type'];
    }

    // Validate budget_range
    if (data.budget_range && !['under_25k', '25k_50k', '50k_100k', '100k_plus'].includes(data.budget_range)) {
      errors.budget_range = ['Invalid budget range'];
    }

    // Validate timeline
    if (data.timeline && !['immediate', '1_month', '3_months', '6_months', 'flexible'].includes(data.timeline)) {
      errors.timeline = ['Invalid timeline'];
    }

    // Validate company_size
    if (data.company_size && !['1-10', '11-50', '51-200', '201-1000', '1000+'].includes(data.company_size)) {
      errors.company_size = ['Invalid company size'];
    }

    return errors;
  }

  private async checkForDuplicates(data: Record<string, any>): Promise<boolean> {
    try {
      // Use anonymous access to check for duplicates - this requires admin permissions
      // so we'll skip duplicate checking for anonymous submissions
      console.log('Skipping duplicate check for anonymous submission');
      return false;
    } catch (error) {
      console.warn('Duplicate check error:', error);
      return false;
    }
  }

  private calculateLeadScore(data: Record<string, any>): number {
    let score = 50; // Base score

    // Score based on completeness
    const totalFields = this.config.schema.fields.length;
    const filledFields = Object.keys(data).filter(key => data[key] && data[key] !== '').length;
    const completenessScore = (filledFields / totalFields) * 20;
    score += completenessScore;

    // Score based on field values
    if (data.company_size) {
      const sizeScores: Record<string, number> = {
        '1-10': 5,
        '11-50': 10,
        '51-200': 15,
        '201-1000': 20,
        '1000+': 25
      };
      score += sizeScores[data.company_size] || 0;
    }

    if (data.budget_range) {
      const budgetScores: Record<string, number> = {
        'under_25k': 5,
        '25k_50k': 10,
        '50k_100k': 15,
        '100k_plus': 20
      };
      score += budgetScores[data.budget_range] || 0;
    }

    if (data.timeline) {
      const timelineScores: Record<string, number> = {
        'immediate': 25,
        '1_month': 20,
        '3_months': 15,
        '6_months': 10,
        'flexible': 5
      };
      score += timelineScores[data.timeline] || 0;
    }

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private async submitWithRetry(
    submissionData: FormSubmissionData,
    leadScore?: number
  ): Promise<LeadSubmissionResult> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.retryOptions.maxRetries; attempt++) {
      try {
        console.log(`Submission attempt ${attempt}/${this.retryOptions.maxRetries}`);

        const leadData = this.transformSubmissionData(submissionData, leadScore);
        console.log('Transformed lead data:', leadData);
        
        // Use anonymous access for lead submission - allowed by RLS policy
        const { data, error } = await supabase
          .from('leads')
          .insert(leadData)
          .select()
          .single();

        if (error) {
          console.error('Supabase insertion error:', error);
          throw new Error(`Database error: ${error.message}${error.hint ? ` (${error.hint})` : ''}`);
        }

        if (!data) {
          throw new Error('No data returned from submission');
        }

        console.log('Lead successfully submitted:', data.id);
        return {
          success: true,
          leadId: data.id
        };

      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`Submission attempt ${attempt} failed:`, lastError.message);

        if (attempt < this.retryOptions.maxRetries) {
          const delay = Math.min(
            this.retryOptions.baseDelay * Math.pow(this.retryOptions.backoffMultiplier, attempt - 1),
            this.retryOptions.maxDelay
          );
          await this.delay(delay);
        }
      }
    }

    return {
      success: false,
      error: `Failed after ${this.retryOptions.maxRetries} attempts: ${lastError?.message}`
    };
  }

  private transformSubmissionData(submissionData: FormSubmissionData, leadScore?: number) {
    // Transform data to match the leads table schema
    const transformedData = {
      organization_name: submissionData.data.organization_name || '',
      organization_type: submissionData.data.organization_type || 'other',
      contact_name: submissionData.data.contact_name || '',
      email: (submissionData.data.email || '').toLowerCase().trim(),
      phone: submissionData.data.phone || '',
      company_size: submissionData.data.company_size || null,
      expected_farmers: submissionData.data.expected_farmers ? Number(submissionData.data.expected_farmers) : null,
      budget_range: submissionData.data.budget_range || null,
      timeline: submissionData.data.timeline || null,
      current_solution: submissionData.data.current_solution || null,
      requirements: submissionData.data.requirements || null,
      how_did_you_hear: submissionData.data.how_did_you_hear || null,
      lead_source: submissionData.metadata?.source || 'website',
      status: 'new' as const,
      priority: this.determinePriority(leadScore),
      metadata: {
        formId: submissionData.formId,
        formVersion: submissionData.formVersion,
        submissionMetadata: submissionData.metadata,
        analytics: submissionData.analytics,
        leadScore,
        submission_source: 'advanced_form',
        timestamp: new Date().toISOString()
      }
    };

    console.log('Data transformation complete:', transformedData);
    return transformedData;
  }

  private determinePriority(leadScore?: number): 'low' | 'medium' | 'high' {
    if (!leadScore) return 'medium';
    if (leadScore >= 80) return 'high';
    if (leadScore >= 60) return 'medium';
    return 'low';
  }

  private queueForOfflineSubmission(submissionData: FormSubmissionData): LeadSubmissionResult {
    const queueItem: OfflineQueueItem = {
      id: crypto.randomUUID(),
      data: submissionData,
      attempts: 0,
      status: 'pending'
    };

    this.offlineQueue.push(queueItem);
    this.saveOfflineQueue();

    return {
      success: true,
      leadId: queueItem.id,
      warnings: ['Submission queued for when connection is restored']
    };
  }

  private async processOfflineQueue(): Promise<void> {
    const pendingItems = this.offlineQueue.filter(item => item.status === 'pending');
    
    for (const item of pendingItems) {
      try {
        item.status = 'processing';
        const result = await this.submitWithRetry(item.data);
        
        if (result.success) {
          item.status = 'completed';
        } else {
          item.attempts++;
          item.lastAttempt = new Date().toISOString();
          item.status = item.attempts >= this.retryOptions.maxRetries ? 'failed' : 'pending';
        }
      } catch (error) {
        console.error('Error processing offline queue item:', error);
        item.status = 'failed';
      }
    }

    // Clean up completed items older than 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.offlineQueue = this.offlineQueue.filter(item => {
      if (item.status === 'completed' && item.lastAttempt) {
        return new Date(item.lastAttempt) > oneDayAgo;
      }
      return true;
    });

    this.saveOfflineQueue();
  }

  private async trackAnalytics(submissionData: FormSubmissionData, leadId: string): Promise<void> {
    try {
      console.log('Tracking analytics for lead:', leadId, submissionData.analytics);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  private async triggerWebhooks(submissionData: FormSubmissionData, leadId: string): Promise<void> {
    const webhooks = this.config.schema.integrations?.webhooks || [];
    
    for (const webhook of webhooks) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            leadId,
            formId: submissionData.formId,
            data: submissionData.data,
            metadata: submissionData.metadata
          })
        });
      } catch (error) {
        console.warn(`Webhook failed for ${webhook}:`, error);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async testConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      // Test connection by trying to access leads table - requires admin permissions
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { 
          connected: false, 
          error: 'Not authenticated - cannot test admin connection' 
        };
      }

      // Try to access leads table - this will fail if user is not admin
      const { error } = await supabase
        .from('leads')
        .select('count')
        .limit(1);

      if (error) {
        if (error.code === '42501') {
          return { 
            connected: false, 
            error: 'Admin permissions required to access leads' 
          };
        }
        return { connected: false, error: error.message };
      }

      return { connected: true };
    } catch (error) {
      return { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Connection test failed' 
      };
    }
  }

  getQueueStatus() {
    return {
      totalItems: this.offlineQueue.length,
      pending: this.offlineQueue.filter(item => item.status === 'pending').length,
      processing: this.offlineQueue.filter(item => item.status === 'processing').length,
      failed: this.offlineQueue.filter(item => item.status === 'failed').length,
      completed: this.offlineQueue.filter(item => item.status === 'completed').length
    };
  }
}
