
-- Allow anonymous users to insert leads (for public form submissions)
CREATE POLICY "Allow public lead submissions"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Also allow authenticated users to insert leads
CREATE POLICY "Allow authenticated lead submissions"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (true);
