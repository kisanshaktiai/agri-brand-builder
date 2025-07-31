
-- First, let's check if the leads table exists and create it with proper structure
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  organization_type TEXT NOT NULL CHECK (organization_type IN ('agri_company', 'ngo', 'university', 'government', 'cooperative', 'other')),
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_size TEXT,
  expected_farmers INTEGER,
  budget_range TEXT,
  timeline TEXT,
  requirements TEXT,
  current_solution TEXT,
  how_did_you_hear TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'closed_won', 'closed_lost')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  lead_source TEXT NOT NULL DEFAULT 'website',
  notes TEXT,
  assigned_to UUID,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated users to view their leads" ON public.leads;
DROP POLICY IF EXISTS "Allow admins to manage all leads" ON public.leads;

-- Create simple, permissive policies for lead submission
-- Allow anyone to submit leads (INSERT)
CREATE POLICY "Public can submit leads" ON public.leads
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users to view and update leads
CREATE POLICY "Authenticated users can view leads" ON public.leads
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update leads" ON public.leads
  FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_leads_updated_at_trigger ON public.leads;

-- Create the trigger
CREATE TRIGGER update_leads_updated_at_trigger
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_leads_updated_at();
