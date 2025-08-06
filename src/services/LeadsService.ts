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
      console.log('🔄 LeadsService: Submitting lead via Edge Function...');

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

      console.log('✅ LeadsService: Validation passed, calling Edge Function...');

      // Call the Edge Function instead of direct Supabase insert
      const { data, error } = await supabase.functions.invoke('submit-lead', {
        body: leadData
      });

      if (error) {
        console.error('💥 LeadsService: Edge Function error:', error);
        return { 
          success: false, 
          error: `Submission failed: ${error.message}` 
        };
      }

      if (!data?.success) {
        console.error('💥 LeadsService: Edge Function returned error:', data);
        return { 
          success: false, 
          error: data?.error || 'Submission failed' 
        };
      }

      console.log('✅ LeadsService: Lead successfully submitted via Edge Function:', data.lead_id);
      
      // Return success with lead data (we can't return full lead object from Edge Function for security)
      return { 
        success: true, 
        lead: { 
          id: data.lead_id, 
          ...leadData,
          status: 'new',
          priority: 'medium',
          lead_source: 'website',
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as Lead
      };

    } catch (error) {
      console.error('💥 LeadsService: Unexpected error:', error);
      
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
