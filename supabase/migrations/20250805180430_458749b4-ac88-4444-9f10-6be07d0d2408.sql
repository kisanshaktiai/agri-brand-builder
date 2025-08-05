
-- First, let's drop any conflicting policies and recreate them properly
DROP POLICY IF EXISTS "Public can submit new leads" ON public.leads;
DROP POLICY IF EXISTS "Admin users can manage all leads" ON public.leads;
DROP POLICY IF EXISTS "Public can read leads for validation" ON public.leads;

-- Create a comprehensive policy that allows anonymous users to insert leads
CREATE POLICY "Allow anonymous lead submission" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Allow authenticated users to insert leads as well
CREATE POLICY "Allow authenticated lead submission" 
ON public.leads 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow admin users to manage all leads
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
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Also ensure the anon role has the necessary permissions
-- Grant INSERT permission to anon role
GRANT INSERT ON public.leads TO anon;
GRANT USAGE ON SEQUENCE leads_id_seq TO anon;

-- Grant SELECT permission to authenticated users for admin functionality
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
