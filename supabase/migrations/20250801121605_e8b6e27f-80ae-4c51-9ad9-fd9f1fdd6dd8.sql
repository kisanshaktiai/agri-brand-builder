
-- Update the leads table constraints to match form values

-- Drop existing constraints
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_organization_type_check;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_budget_range_check;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_company_size_check;
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_timeline_check;

-- Add new constraints that match the form values
ALTER TABLE public.leads ADD CONSTRAINT leads_organization_type_check 
CHECK (organization_type IN ('agri_company', 'ngo', 'university', 'government', 'cooperative', 'other'));

ALTER TABLE public.leads ADD CONSTRAINT leads_budget_range_check 
CHECK (budget_range IN ('under-50k', '50k-2l', '2l-5l', '5l-10l', '10l+'));

ALTER TABLE public.leads ADD CONSTRAINT leads_company_size_check 
CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '500+'));

ALTER TABLE public.leads ADD CONSTRAINT leads_timeline_check 
CHECK (timeline IN ('immediate', '1-3months', '3-6months', '6-12months', 'exploring'));

-- Update how_did_you_hear constraint to match form values
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_how_did_you_hear_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_how_did_you_hear_check 
CHECK (how_did_you_hear IN ('youtube', 'facebook', 'google', 'linkedin', 'referral', 'website', 'other'));
