-- ============================================================
-- Payment and Expense Tables for Supabase
-- Run this in Supabase SQL Editor after registration table exists
-- ============================================================

-- 1. PAYMENTS TABLE
-- Matches PaymentsTab.jsx: registration_id, child_name, is_paid, amount, payment_method, payment_date, receipt_url, notes
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID REFERENCES registration(id) ON DELETE CASCADE,
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

-- 2. EXPENSES TABLE
-- Matches ExpensesTab.jsx: description, amount, payment_method, expense_date, is_planned, category, notes
CREATE TABLE IF NOT EXISTS expenses (
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

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_payments_registration_id ON payments(registration_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_date ON payments(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_created_date ON expenses(created_date DESC);

-- ============================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 4. RLS POLICIES - Admin (authenticated user) can Read/Write
-- ============================================================

-- Payments: Authenticated users can do everything
CREATE POLICY "Admin can read payments"
  ON payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update payments"
  ON payments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete payments"
  ON payments FOR DELETE
  TO authenticated
  USING (true);

-- Expenses: Authenticated users can do everything
CREATE POLICY "Admin can read expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can insert expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can update expenses"
  ON expenses FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (true);
