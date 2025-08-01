
-- Fix the data mismatch by updating CHECK constraints and cleaning up RLS policies

-- First, remove all existing policies to start clean
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
DROP POLICY IF EXISTS "System can manage all leads" ON public.leads;

-- Update the organization_type constraint to match frontend values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_organization_type_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_organization_type_check 
CHECK (organization_type IN ('agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'));

-- Update the budget_range constraint to match frontend values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_budget_range_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_budget_range_check 
CHECK (budget_range IN ('under_25k', '25k_50k', '50k_100k', '100k_plus') OR budget_range IS NULL);

-- Update the timeline constraint to match frontend values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_timeline_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_timeline_check 
CHECK (timeline IN ('immediate', '1_month', '3_months', '6_months', 'flexible') OR timeline IS NULL);

-- Update the company_size constraint to match frontend values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_company_size_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_company_size_check 
CHECK (company_size IN ('1-10', '11-50', '51-200', '201-1000', '1000+') OR company_size IS NULL);

-- Create one clear INSERT policy for anonymous users
CREATE POLICY "Allow anonymous lead insertion" 
ON public.leads 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create SELECT policy for viewing leads
CREATE POLICY "Allow lead viewing" 
ON public.leads 
FOR SELECT 
TO anon, authenticated
USING (
  -- Anonymous users can't view leads
  (auth.role() = 'authenticated' AND (created_by = auth.uid() OR auth.uid() IS NULL)) OR
  -- Admins can view all leads
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() AND is_active = true
  )
);

-- Create UPDATE/DELETE policies for authenticated users and admins
CREATE POLICY "Allow lead management" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (
  created_by = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Allow lead deletion" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() AND is_active = true
  )
);
