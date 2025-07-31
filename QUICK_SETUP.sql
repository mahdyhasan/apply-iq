-- ApplyIQ Bangladesh - Quick Setup SQL
-- Copy and paste this entire script into your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Profiles & Onboarding
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  career_goal TEXT,
  experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  industry TEXT,
  location TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. Subscription Packages
CREATE TABLE IF NOT EXISTS public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_bdt INTEGER,
  billing_period TEXT,
  resume_limit INTEGER NOT NULL,
  revision_limit INTEGER NOT NULL,
  job_match_limit INTEGER NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Subscriptions
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  package_id TEXT REFERENCES public.packages(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  payment_method TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Resumes
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  template_id TEXT,
  ats_score INTEGER CHECK (ats_score >= 0 AND ats_score <= 100),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own profile data" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile data" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile data" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view packages" ON public.packages FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);

-- Insert Package Data
INSERT INTO public.packages (id, name, price_bdt, billing_period, resume_limit, revision_limit, job_match_limit, features) VALUES
('free', 'Free', 0, 'lifetime', 1, 3, 0, '["1 resume creation", "3 revision attempts", "Basic templates", "PDF export"]'::jsonb),
('starter', 'Starter', 200, 'monthly', 1, 10, 3, '["1 professional resume", "10 revision attempts", "Premium templates", "ATS optimization", "3 job matches daily", "Basic job filters", "PDF & DOCX export", "Email support"]'::jsonb),
('premium', 'Premium', 500, 'monthly', 5, -1, -1, '["5 resume variations", "Unlimited revisions", "All premium templates", "Advanced ATS scoring", "Unlimited job matches", "Advanced job filters", "24-hour job refresh", "Cover letter generator", "LinkedIn profile optimization", "Priority support"]'::jsonb),
('elite', 'Elite', 1000, 'monthly', -1, -1, -1, '["Unlimited resumes", "Unlimited revisions", "Exclusive templates", "AI-powered optimization", "Personal job curator", "Company insights", "Interview preparation", "Salary negotiation tips", "1-on-1 career consultation", "Direct recruiter connections", "24/7 priority support"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Function to initialize user data after signup
CREATE OR REPLACE FUNCTION public.initialize_user_data()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_profiles (user_id, onboarding_completed)
  VALUES (NEW.id, FALSE)
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO public.user_subscriptions (user_id, package_id, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user data on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_data();

-- Verification query - run this to check setup
SELECT 
  'Setup Complete!' as status,
  (SELECT COUNT(*) FROM public.packages) as package_count,
  (SELECT COUNT(*) FROM public.users) as user_count;
