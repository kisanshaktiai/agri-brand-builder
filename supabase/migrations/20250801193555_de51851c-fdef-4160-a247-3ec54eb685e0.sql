
-- Fix phone field constraint mismatch by making it NOT NULL
-- This aligns the database schema with frontend validation and service expectations

-- First, ensure any existing records with NULL phone values are updated
-- (This shouldn't be an issue since the form requires phone, but safety first)
UPDATE public.leads 
SET phone = 'UNKNOWN' 
WHERE phone IS NULL OR phone = '';

-- Now alter the column to be NOT NULL
ALTER TABLE public.leads 
ALTER COLUMN phone SET NOT NULL;

-- Add a check constraint to ensure phone is not empty
ALTER TABLE public.leads 
ADD CONSTRAINT leads_phone_not_empty 
CHECK (trim(phone) != '');
