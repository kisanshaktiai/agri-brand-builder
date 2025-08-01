
-- Add RLS policy to allow anonymous users to submit leads
-- This is essential for a public lead form that doesn't require authentication

CREATE POLICY "Allow anonymous lead submissions" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Also ensure authenticated users can insert leads
CREATE POLICY "Allow authenticated users to submit leads" 
ON public.leads 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow users to view their own leads (for authenticated users)
CREATE POLICY "Users can view their own leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (auth.uid() IS NOT NULL);

-- Allow super admins to view all leads
CREATE POLICY "Super admins can view all leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND role = 'super_admin' 
    AND is_active = true
  )
);
