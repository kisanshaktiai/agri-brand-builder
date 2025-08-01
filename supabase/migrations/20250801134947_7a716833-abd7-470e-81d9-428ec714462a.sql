
-- Phase 1: Clean up all existing RLS policies on leads table
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated admins can manage leads" ON public.leads;
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage leads" ON public.leads;

-- Phase 2: Fix database constraints and make phone NOT NULL
ALTER TABLE public.leads ALTER COLUMN phone SET NOT NULL;

-- Ensure organization_type values match exactly what the form sends
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_organization_type_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_organization_type_check 
CHECK (organization_type IN ('agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'));

-- Ensure status values match
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_status_check 
CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'closed_won', 'closed_lost'));

-- Ensure priority values match
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_priority_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_priority_check 
CHECK (priority IN ('low', 'medium', 'high'));

-- Phase 3: Create simple, clear RLS policies

-- Policy 1: Allow anonymous users (using anon role) to INSERT leads
CREATE POLICY "Anonymous users can submit leads" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Policy 2: Allow public role to INSERT leads (fallback)
CREATE POLICY "Public can submit leads" 
ON public.leads 
FOR INSERT 
TO public
WITH CHECK (true);

-- Policy 3: Allow authenticated users to INSERT leads
CREATE POLICY "Authenticated users can submit leads" 
ON public.leads 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy 4: Only authenticated admins can SELECT/UPDATE/DELETE leads
CREATE POLICY "Admins can manage leads" 
ON public.leads 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Grant necessary permissions to anon and public roles
GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.leads TO public;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO public;
