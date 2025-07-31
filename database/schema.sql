-- ApplyIQ Bangladesh Database Schema
-- Complete schema for resume building platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. User Profiles & Onboarding
CREATE TABLE public.user_profiles (
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
CREATE TABLE public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_bdt INTEGER,
  billing_period TEXT,
  resume_limit INTEGER NOT NULL, -- -1 for unlimited
  revision_limit INTEGER NOT NULL,
  job_match_limit INTEGER NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Subscriptions
CREATE TABLE public.user_subscriptions (
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
CREATE TABLE public.resumes (
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

-- 6. Resume Revisions
CREATE TABLE public.resume_revisions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  changes JSONB DEFAULT '{}'::jsonb,
  revision_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Job Matches
CREATE TABLE public.job_matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  salary TEXT,
  match_score INTEGER CHECK (match_score >= 0 AND match_score <= 100),
  job_data JSONB DEFAULT '{}'::jsonb,
  source TEXT,
  applied_at TIMESTAMP WITH TIME ZONE,
  saved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Usage Tracking
CREATE TABLE public.usage_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL, -- Format: '2024-01'
  resumes_created INTEGER DEFAULT 0,
  revisions_used INTEGER DEFAULT 0,
  jobs_viewed INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);

-- 9. Payment Transactions
CREATE TABLE public.payment_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.user_subscriptions(id),
  amount_bdt INTEGER NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_user_subscriptions_active ON public.user_subscriptions(user_id, status);
CREATE INDEX idx_resumes_user_status ON public.resumes(user_id, status);
CREATE INDEX idx_resume_revisions_resume ON public.resume_revisions(resume_id);
CREATE INDEX idx_job_matches_user_score ON public.job_matches(user_id, match_score DESC);
CREATE INDEX idx_usage_stats_user_month ON public.usage_stats(user_id, month_year);
CREATE INDEX idx_payment_transactions_user ON public.payment_transactions(user_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for users
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Policies for user_profiles
CREATE POLICY "Users can view own profile data" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile data" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile data" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for resumes
CREATE POLICY "Users can view own resumes" ON public.resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON public.resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON public.resumes FOR DELETE USING (auth.uid() = user_id);

-- Policies for resume revisions
CREATE POLICY "Users can view own resume revisions" ON public.resume_revisions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resume revisions" ON public.resume_revisions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for job matches
CREATE POLICY "Users can view own job matches" ON public.job_matches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own job matches" ON public.job_matches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own job matches" ON public.job_matches FOR UPDATE USING (auth.uid() = user_id);

-- Policies for usage stats
CREATE POLICY "Users can view own usage stats" ON public.usage_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage stats" ON public.usage_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage stats" ON public.usage_stats FOR UPDATE USING (auth.uid() = user_id);

-- Policies for payment transactions
CREATE POLICY "Users can view own payment transactions" ON public.payment_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payment transactions" ON public.payment_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow read access to packages for all authenticated users
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can view packages" ON public.packages FOR SELECT TO authenticated USING (is_active = true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON public.resumes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
