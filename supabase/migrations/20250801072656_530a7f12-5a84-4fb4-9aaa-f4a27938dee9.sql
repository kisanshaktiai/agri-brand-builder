
-- First, let's see what RLS policies exist and clean them up
DROP POLICY IF EXISTS "Users can manage their own analytics reports" ON public.leads;
DROP POLICY IF EXISTS "farmer_access" ON public.leads;
DROP POLICY IF EXISTS "super_admin_access" ON public.leads;
DROP POLICY IF EXISTS "tenant_admin_access" ON public.leads;

-- Create a simple policy that allows anonymous users to insert leads
CREATE POLICY "Allow anonymous lead submissions" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Also allow authenticated users to view their own leads if needed later
CREATE POLICY "Users can view their own leads" 
ON public.leads 
FOR SELECT 
USING (auth.uid() IS NULL OR created_by = auth.uid());

-- Allow system/admin access for management
CREATE POLICY "System can manage all leads" 
ON public.leads 
FOR ALL 
USING (
  auth.jwt()->>'role' = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() AND is_active = true
  )
);
