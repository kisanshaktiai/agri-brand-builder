
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
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'closed_won' | 'closed_lost' | 'assigned' | 'converted';
  priority: 'low' | 'medium' | 'high';
  lead_source: string;
  notes?: string;
  assigned_to?: string;
  assigned_at?: string;
  follow_up_date?: string;
  created_by?: string;
  converted_tenant_id?: string;
  converted_at?: string;
  lead_score?: number;
  last_activity?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export class LeadsService {
  async submitInquiry(leadData: LeadData): Promise<{ success: boolean; error?: string; lead?: Lead }> {
    try {
      console.log('🔍 LeadsService: Verifying anonymous session state...');
      
      // Double-check session state in service layer
      const { data: currentSession } = await supabase.auth.getSession();
      console.log('📊 LeadsService session check:', {
        hasSession: !!currentSession.session,
        hasUser: !!currentSession.session?.user,
        accessToken: currentSession.session?.access_token ? 'EXISTS' : 'NULL',
        role: currentSession.session?.user?.role || 'anon'
      });
      
      // If somehow there's still a session, force cleanup
      if (currentSession.session) {
        console.warn('⚠️ LeadsService: Unexpected session found, forcing cleanup...');
        await supabase.auth.signOut();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verify cleanup worked
        const { data: verifySession } = await supabase.auth.getSession();
        if (verifySession.session) {
          console.error('❌ LeadsService: Session cleanup failed');
          return { success: false, error: 'Session cleanup failed. Please refresh the page and try again.' };
        }
      }

      console.log('✅ LeadsService: Confirmed anonymous state');

      // Basic validation
      if (!leadData.organization_name?.trim()) {
        return { success: false, error: 'Organization name is required' };
      }

      if (!leadData.contact_name?.trim()) {
        return { success: false, error: 'Contact name is required' };
      }

      if (!leadData.email?.trim()) {
        return { success: false, error: 'Email is required' };
      }

      if (!leadData.phone?.trim()) {
        return { success: false, error: 'Phone number is required' };
      }

      // Email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(leadData.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Validate organization type
      const validOrgTypes = ['agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'];
      if (!validOrgTypes.includes(leadData.organization_type)) {
        return { success: false, error: 'Invalid organization type selected' };
      }

      console.log('✅ LeadsService: Validation passed, preparing data for database...');

      // Prepare the data for insertion - only include fields that exist in the database
      const insertData = {
        organization_name: leadData.organization_name.trim(),
        organization_type: leadData.organization_type,
        contact_name: leadData.contact_name.trim(),
        email: leadData.email.trim().toLowerCase(),
        phone: leadData.phone.trim(),
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
        metadata: {
          submission_source: 'website_form',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          timestamp: new Date().toISOString(),
          anonymous_submission: true,
          session_cleanup_verified: true
        }
      };

      console.log('📤 LeadsService: Inserting lead into database as anonymous user...');
      const { data, error } = await supabase
        .from('leads')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('💥 LeadsService: Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          timestamp: new Date().toISOString()
        });

        // Handle specific error types with enhanced debugging
        if (error.code === '42501' || error.message.includes('RLS') || error.message.includes('row-level security')) {
          console.error('🚨 RLS policy violation detected - this should not happen with anonymous submissions');
          console.error('🔧 Debug info: Check if the RLS policy allows auth.role() = \'anon\' for INSERT');
          return { success: false, error: 'Permission denied. Please refresh the page and try again in incognito mode.' };
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
        console.error('❌ LeadsService: No data returned from insert operation');
        return { success: false, error: 'Failed to save inquiry. Please try again.' };
      }

      console.log('✅ LeadsService: Lead successfully inserted:', data.id);
      return { success: true, lead: data as Lead };

    } catch (error) {
      console.error('💥 LeadsService: Unexpected error submitting lead:', error);
      
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
      
      // This method requires admin authentication - RLS policy enforces this
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        // If it's a permission error, provide more context
        if (error.code === '42501' || error.message.includes('RLS')) {
          throw new Error('You don\'t have permission to view leads. Admin access required.');
        }
        throw new Error(`Failed to fetch leads: ${error.message}`);
      }

      console.log(`Successfully fetched ${data?.length || 0} leads`);
      return (data || []) as Lead[];
    } catch (error) {
      console.error('Unexpected error fetching leads:', error);
      throw error; // Re-throw to let the calling component handle it
    }
  }

  async updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<boolean> {
    try {
      console.log(`Updating lead ${leadId} status to ${status}`);
      
      const updateData: any = { 
        status,
        last_activity: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (notes) {
        updateData.notes = notes;
      }

      // This method requires admin authentication - RLS policy enforces this
      const { error } = await supabase
        .from('leads')
        .update(updateData)
        .eq('id', leadId);

      if (error) {
        console.error('Error updating lead status:', error);
        if (error.code === '42501' || error.message.includes('RLS')) {
          throw new Error('You don\'t have permission to update leads. Admin access required.');
        }
        throw new Error(`Failed to update lead: ${error.message}`);
      }

      console.log(`Successfully updated lead ${leadId} status`);
      return true;
    } catch (error) {
      console.error('Unexpected error updating lead:', error);
      throw error; // Re-throw to let the calling component handle it
    }
  }
}

export const leadsService = new LeadsService();
