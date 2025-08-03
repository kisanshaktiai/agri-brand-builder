
-- First, let's ensure the leads table exists with proper structure
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name text NOT NULL,
  organization_type text NOT NULL CHECK (organization_type IN ('agri_company', 'ngo', 'university', 'government', 'cooperative', 'other')),
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_size text,
  expected_farmers integer,
  budget_range text,
  timeline text,
  requirements text,
  current_solution text,
  how_did_you_hear text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'closed_won', 'closed_lost', 'assigned', 'converted')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  lead_source text NOT NULL DEFAULT 'website',
  notes text,
  assigned_to uuid,
  assigned_at timestamp with time zone,
  follow_up_date timestamp with time zone,
  created_by uuid,
  converted_tenant_id uuid,
  converted_at timestamp with time zone,
  lead_score integer DEFAULT 0,
  last_activity timestamp with time zone DEFAULT now(),
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for leads table

-- Policy 1: Allow public to insert new leads (for lead submission forms)
CREATE POLICY "Public can submit new leads" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow authenticated admin users to view and manage all leads
CREATE POLICY "Admin users can manage all leads" 
ON public.leads 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Policy 3: Allow public read access for lead validation (if needed)
CREATE POLICY "Public can read leads for validation" 
ON public.leads 
FOR SELECT 
TO anon
USING (false); -- Disabled by default, enable if needed

-- Create or update the leads-related tables for assignments and activities

-- Lead assignments table
CREATE TABLE IF NOT EXISTS public.lead_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  assigned_from uuid,
  assigned_to uuid,
  assignment_type text NOT NULL CHECK (assignment_type IN ('auto', 'manual', 'reassign')),
  assignment_reason text,
  assigned_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on lead_assignments
ALTER TABLE public.lead_assignments ENABLE ROW LEVEL SECURITY;

-- Policy for lead_assignments
CREATE POLICY "Admin users can manage lead assignments" 
ON public.lead_assignments 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Lead activities table
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('note', 'call', 'email', 'meeting', 'status_change', 'assignment')),
  title text NOT NULL,
  description text,
  scheduled_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_by uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on lead_activities
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

-- Policy for lead_activities
CREATE POLICY "Admin users can manage lead activities" 
ON public.lead_activities 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Create lead assignment rules table
CREATE TABLE IF NOT EXISTS public.lead_assignment_rules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_name text NOT NULL,
  rule_type text NOT NULL CHECK (rule_type IN ('round_robin', 'weighted', 'territory', 'skill_based')),
  admin_pool uuid[] NOT NULL DEFAULT '{}',
  conditions jsonb DEFAULT '{}',
  priority_order integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on lead_assignment_rules
ALTER TABLE public.lead_assignment_rules ENABLE ROW LEVEL SECURITY;

-- Policy for lead_assignment_rules
CREATE POLICY "Admin users can manage assignment rules" 
ON public.lead_assignment_rules 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Create lead scoring rules table
CREATE TABLE IF NOT EXISTS public.lead_scoring_rules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_name text NOT NULL,
  rule_type text NOT NULL CHECK (rule_type IN ('demographic', 'behavioral', 'engagement', 'firmographic')),
  conditions jsonb NOT NULL DEFAULT '{}',
  score_value integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on lead_scoring_rules
ALTER TABLE public.lead_scoring_rules ENABLE ROW LEVEL SECURITY;

-- Policy for lead_scoring_rules
CREATE POLICY "Admin users can manage scoring rules" 
ON public.lead_scoring_rules 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Create team invitations table (if not exists)
CREATE TABLE IF NOT EXISTS public.team_invitations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  tenant_id uuid,
  invited_email text NOT NULL,
  invited_name text NOT NULL,
  role text NOT NULL DEFAULT 'tenant_admin',
  invitation_token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at timestamp with time zone,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on team_invitations
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

-- Policy for team_invitations
CREATE POLICY "Admin users can manage team invitations" 
ON public.team_invitations 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all relevant tables
DO $$ 
BEGIN
    -- Drop existing triggers if they exist
    DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
    DROP TRIGGER IF EXISTS update_lead_activities_updated_at ON public.lead_activities;
    DROP TRIGGER IF EXISTS update_lead_assignment_rules_updated_at ON public.lead_assignment_rules;
    DROP TRIGGER IF EXISTS update_lead_scoring_rules_updated_at ON public.lead_scoring_rules;
    DROP TRIGGER IF EXISTS update_team_invitations_updated_at ON public.team_invitations;
    
    -- Create new triggers
    CREATE TRIGGER update_leads_updated_at 
        BEFORE UPDATE ON public.leads 
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        
    CREATE TRIGGER update_lead_activities_updated_at 
        BEFORE UPDATE ON public.lead_activities 
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        
    CREATE TRIGGER update_lead_assignment_rules_updated_at 
        BEFORE UPDATE ON public.lead_assignment_rules 
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        
    CREATE TRIGGER update_lead_scoring_rules_updated_at 
        BEFORE UPDATE ON public.lead_scoring_rules 
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
        
    CREATE TRIGGER update_team_invitations_updated_at 
        BEFORE UPDATE ON public.team_invitations 
        FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON public.leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_lead_assignments_lead_id ON public.lead_assignments(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON public.lead_activities(lead_id);
