
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
  async submitInquiry(leadData: LeadData, source: string = 'website'): Promise<{ success: boolean; error?: string; lead?: Lead }> {
    try {
      console.log('Starting lead submission process...');

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

      // Prepare data for insertion
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
        lead_source: source,
        status: 'new' as const,
        priority: 'medium' as const,
        metadata: {
          submitted_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }
      };

      const { data, error } = await supabase
        .from('leads')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, error: `Submission failed: ${error.message}` };
      }

      console.log('Lead successfully inserted:', data);
      return { success: true, lead: data as Lead };

    } catch (error) {
      console.error('Unexpected error submitting lead:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  async getLeads(): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return [];
      }

      return (data || []) as Lead[];
    } catch (error) {
      console.error('Unexpected error fetching leads:', error);
      return [];
    }
  }

  async updateLeadStatus(leadId: string, status: Lead['status']): Promise<boolean> {
    try {
      console.log('Updating lead status:', leadId, status);

      const { error } = await supabase
        .from('leads')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) {
        console.error('Error updating lead status:', error);
        return false;
      }

      console.log('Lead status updated successfully');
      return true;
    } catch (error) {
      console.error('Unexpected error updating lead status:', error);
      return false;
    }
  }
}

export const leadsService = new LeadsService();
