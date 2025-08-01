
import { supabase } from '@/integrations/supabase/client';

export interface LeadData {
  organization_name: string;
  organization_type: 'agri_company' | 'ngo' | 'university' | 'government' | 'cooperative' | 'other';
  contact_name: string;
  email: string;
  phone: string;
  company_size?: string;
  expected_farmers?: number;
  budget_range?: string;
  timeline?: string;
  requirements?: string;
  current_solution?: string;
  how_did_you_hear?: string;
}

export interface Lead extends LeadData {
  id: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost';
  priority: 'low' | 'medium' | 'high';
  lead_source: string;
  notes?: string;
  assigned_to?: string;
  follow_up_date?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export class LeadsService {
  async submitInquiry(leadData: LeadData): Promise<{ success: boolean; error?: string; lead?: Lead }> {
    try {
      console.log('Starting lead submission process...');
      console.log('Lead data:', leadData);
      console.log('Current Supabase session:', await supabase.auth.getSession());

      // Basic validation - phone is now required and NOT NULL in database
      if (!leadData.organization_name?.trim()) {
        return { success: false, error: 'Organization name is required' };
      }

      if (!leadData.contact_name?.trim()) {
        return { success: false, error: 'Contact name is required' };
      }

      if (!leadData.email?.trim()) {
        return { success: false, error: 'Email is required' };
      }

      // Phone is now NOT NULL in database - must be validated
      if (!leadData.phone?.trim()) {
        return { success: false, error: 'Phone number is required' };
      }

      // Email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(leadData.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate organization type matches database constraint exactly
      const validOrgTypes = ['agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'];
      if (!validOrgTypes.includes(leadData.organization_type)) {
        return { success: false, error: 'Invalid organization type selected' };
      }

      console.log('Validation passed, preparing data for database...');

      // Prepare the data for insertion with all required fields
      const insertData = {
        organization_name: leadData.organization_name.trim(),
        organization_type: leadData.organization_type,
        contact_name: leadData.contact_name.trim(),
        email: leadData.email.trim().toLowerCase(),
        phone: leadData.phone.trim(), // Now NOT NULL in database - constraint fixed
        company_size: leadData.company_size || null,
        expected_farmers: leadData.expected_farmers ? Number(leadData.expected_farmers) : null,
        budget_range: leadData.budget_range || null,
        timeline: leadData.timeline || null,
        current_solution: leadData.current_solution || null,
        requirements: leadData.requirements || null,
        how_did_you_hear: leadData.how_did_you_hear || null,
        lead_source: 'website',
        status: 'new' as const,
        priority: 'medium' as const,
        metadata: {}
      };

      console.log('Data prepared for insertion:', insertData);

      // Test connection first
      console.log('Testing database connection...');
      const connectionTest = await this.testConnection();
      if (!connectionTest.connected) {
        console.error('Database connection failed:', connectionTest.error);
        return { success: false, error: 'Unable to connect to database. Please try again.' };
      }

      // Submit lead to database with specific error handling
      console.log('Attempting to insert lead into database...');
      const { data, error } = await supabase
        .from('leads')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });

        // Handle specific error types
        if (error.code === '42501') {
          return { success: false, error: 'Permission denied. Please refresh the page and try again.' };
        }
        
        if (error.code === '23514') {
          return { success: false, error: 'Invalid data format. Please check your entries and try again.' };
        }

        if (error.code === '23505') {
          return { success: false, error: 'A lead with this information already exists.' };
        }

        return { success: false, error: `Submission failed: ${error.message}` };
      }

      if (!data) {
        console.error('No data returned from insert operation');
        return { success: false, error: 'Failed to save inquiry. Please try again.' };
      }

      console.log('Lead successfully inserted:', data);
      return { success: true, lead: data as Lead };

    } catch (error) {
      console.error('Unexpected error submitting lead:', error);
      
      // Handle network/connection errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { success: false, error: 'Network error. Please check your internet connection and try again.' };
      }
      
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return { success: false, error: errorMessage };
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      console.log('Fetching leads from database...');
      
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return [];
      }

      console.log(`Successfully fetched ${data?.length || 0} leads`);
      return (data || []) as Lead[];
    } catch (error) {
      console.error('Unexpected error fetching leads:', error);
      return [];
    }
  }

  async updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<boolean> {
    try {
      console.log(`Updating lead ${leadId} status to ${status}`);
      
      const { error } = await supabase
        .from('leads')
        .update({ 
          status,
          notes: notes || undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) {
        console.error('Error updating lead status:', error);
        return false;
      }

      console.log(`Successfully updated lead ${leadId} status`);
      return true;
    } catch (error) {
      console.error('Unexpected error updating lead:', error);
      return false;
    }
  }

  async testConnection(): Promise<{ connected: boolean; error?: string }> {
    try {
      console.log('Testing database connection...');
      
      // Simple query to test connection without requiring authentication
      const { error } = await supabase
        .from('leads')
        .select('id')
        .limit(0); // Don't return any data, just test the connection

      if (error) {
        console.error('Connection test failed:', error);
        return { connected: false, error: error.message };
      }

      console.log('Database connection successful');
      return { connected: true };
    } catch (error) {
      console.error('Connection test error:', error);
      return { connected: false, error: 'Failed to connect to database' };
    }
  }

  // New method to clear any authentication state that might interfere
  async ensureAnonymousAccess(): Promise<void> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('Found existing session, signing out for anonymous access...');
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.warn('Error ensuring anonymous access:', error);
    }
  }
}

export const leadsService = new LeadsService();
