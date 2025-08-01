
-- Drop all existing policies on leads table to start fresh
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead submission" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage all leads" ON public.leads;
DROP POLICY IF EXISTS "Public read access for lead confirmation" ON public.leads;

-- Create a simple policy that allows anyone to insert leads
CREATE POLICY "Anyone can submit leads" ON public.leads
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view leads (for admin panel)
CREATE POLICY "Authenticated users can view leads" ON public.leads
  FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to update leads (for admin panel)
CREATE POLICY "Authenticated users can update leads" ON public.leads
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete leads (for admin panel)
CREATE POLICY "Authenticated users can delete leads" ON public.leads
  FOR DELETE 
  TO authenticated
  USING (true);

-- Verify RLS is enabled
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to public role for INSERT
GRANT INSERT ON public.leads TO anon;
GRANT INSERT ON public.leads TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
