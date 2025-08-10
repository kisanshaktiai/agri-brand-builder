
-- 1) Normalize existing emails to lower-case + trim for consistent uniqueness
UPDATE public.leads
SET email = lower(trim(email))
WHERE email IS NOT NULL;

-- 2) Create a case-insensitive unique index on email
-- Using an expression index to enforce uniqueness on lower(email)
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_unique_ci
ON public.leads ((lower(email)));

-- 3) Remove any anonymous/public insert policies to force use of Edge Function
-- These DROP statements are safe even if some policies don't exist.
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Public can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead submission" ON public.leads;
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;

-- Note: We are not adding a new INSERT policy for authenticated users,
-- because inserts should now go exclusively through the Edge Function using the service role.
-- Existing SELECT/UPDATE policies (for admins) remain untouched.
