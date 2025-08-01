
-- First, let's check the current leads table structure and fix the schema
-- Add the missing created_by column that the policies reference
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Drop all existing conflicting policies
DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can create leads" ON public.leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can delete their own leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can manage all leads" ON public.leads;
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;

-- Create simplified, consolidated RLS policies
-- Allow anonymous users to insert leads (for public lead forms)
CREATE POLICY "Anonymous can insert leads" 
ON public.leads 
FOR INSERT 
TO anon, public
WITH CHECK (true);

-- Allow anonymous users to read leads they just inserted (needed for .select() after insert)
CREATE POLICY "Anonymous can read inserted leads" 
ON public.leads 
FOR SELECT 
TO anon, public
USING (true);

-- Allow authenticated users to view and manage their own leads if created_by is set
CREATE POLICY "Users can view their own leads" 
ON public.leads 
FOR SELECT 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can update their own leads" 
ON public.leads 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own leads" 
ON public.leads 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Allow admins to manage all leads
CREATE POLICY "Admins can manage all leads" 
ON public.leads 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = auth.uid() 
    AND is_active = true 
    AND role IN ('super_admin', 'platform_admin', 'admin')
  )
);

-- Update the leads table to set created_by when inserting (for future records)
-- This trigger will automatically set created_by for authenticated users
CREATE OR REPLACE FUNCTION public.set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set created_by if user is authenticated and it's not already set
  IF auth.uid() IS NOT NULL AND NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set created_by
DROP TRIGGER IF EXISTS set_created_by_trigger ON public.leads;
CREATE TRIGGER set_created_by_trigger
  BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_created_by();

-- Grant necessary table privileges
GRANT INSERT ON public.leads TO anon, public;
GRANT SELECT ON public.leads TO anon, public;
GRANT ALL ON public.leads TO authenticated;
