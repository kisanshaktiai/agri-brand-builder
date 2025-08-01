
-- Create RLS policies for leads table

-- Policy 1: Allow anonymous users to INSERT leads (for form submissions)
CREATE POLICY "Anonymous users can submit leads" 
ON public.leads 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Policy 2: Allow authenticated users to INSERT leads (fallback)
CREATE POLICY "Authenticated users can submit leads" 
ON public.leads 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy 3: Only authenticated admins can SELECT leads
CREATE POLICY "Admins can view leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Policy 4: Only authenticated admins can UPDATE leads
CREATE POLICY "Admins can update leads" 
ON public.leads 
FOR UPDATE 
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

-- Policy 5: Only authenticated admins can DELETE leads
CREATE POLICY "Admins can delete leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true
  )
);

-- Grant necessary permissions to anon role
GRANT INSERT ON public.leads TO anon;
GRANT USAGE ON SCHEMA public TO anon;
