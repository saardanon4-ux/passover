-- Full schema for Supabase migration from Base44
-- Run in Supabase SQL Editor

-- Registration table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  grade TEXT NOT NULL,
  shirt_size TEXT NOT NULL,
  health_declaration BOOLEAN NOT NULL DEFAULT false,
  payment_terms_accepted BOOLEAN NOT NULL DEFAULT false,
  signature_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  parent_email TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_registrations_created_date ON registrations(created_date DESC);

-- Payment table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registrations(id) ON DELETE CASCADE,
  child_name TEXT,
  is_paid BOOLEAN DEFAULT false,
  amount NUMERIC DEFAULT 0,
  payment_method TEXT,
  payment_date DATE,
  receipt_url TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Expense table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT,
  amount NUMERIC DEFAULT 0,
  payment_method TEXT,
  expense_date DATE,
  is_planned BOOLEAN DEFAULT false,
  category TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Storage buckets (create in Supabase Dashboard > Storage):
-- 1. "signatures" - public read, for registration form signatures
-- 2. "receipts" - public read, for payment receipt uploads

-- Optional: RLS policies (uncomment and adjust as needed)
-- ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public insert" ON registrations FOR INSERT WITH CHECK (true);
