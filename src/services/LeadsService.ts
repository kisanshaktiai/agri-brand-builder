
import { supabase } from '@/integrations/supabase/client';

export interface LeadData {
  organization_name: string;
  organization_type: 'cooperative' | 'private_company' | 'government' | 'ngo' | 'individual' | 'other';
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
      // Validate required fields
      if (!leadData.organization_name.trim()) {
        return { success: false, error: 'Organization name is required' };
      }

      if (!leadData.contact_name.trim()) {
        return { success: false, error: 'Contact name is required' };
      }

      if (!leadData.email.trim()) {
        return { success: false, error: 'Email is required' };
      }

      if (!leadData.phone.trim()) {
        return { success: false, error: 'Phone number is required' };
      }

      // Validate email format
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(leadData.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      // Submit lead to database
      const { data, error } = await supabase
        .from('leads')
        .insert({
          organization_name: leadData.organization_name,
          organization_type: leadData.organization_type,
          company_size: leadData.company_size || null,
          contact_name: leadData.contact_name,
          email: leadData.email,
          phone: leadData.phone,
          expected_farmers: leadData.expected_farmers ? Number(leadData.expected_farmers) : null,
          budget_range: leadData.budget_range || null,
          timeline: leadData.timeline || null,
          current_solution: leadData.current_solution || null,
          requirements: leadData.requirements || null,
          how_did_you_hear: leadData.how_did_you_hear || null,
          lead_source: 'website',
          status: 'new',
          priority: 'medium',
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting lead:', error);
        return { success: false, error: 'Failed to submit inquiry. Please try again.' };
      }

      return { success: true, lead: data as Lead };
    } catch (error) {
      console.error('Unexpected error submitting lead:', error);
      return { success: false, error: 'An unexpected error occurred. Please try again.' };
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

  async updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<boolean> {
    try {
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

      return true;
    } catch (error) {
      console.error('Unexpected error updating lead:', error);
      return false;
    }
  }
}

export const leadsService = new LeadsService();
