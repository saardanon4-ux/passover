-- Add parent_email to registration table
-- Run in Supabase SQL Editor

ALTER TABLE registration
ADD COLUMN IF NOT EXISTS parent_email TEXT;

-- If your table is named "registrations" (plural), run this instead:
-- ALTER TABLE registrations
-- ADD COLUMN IF NOT EXISTS parent_email TEXT;
