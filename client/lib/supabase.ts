import { createClient } from '@supabase/supabase-js'

// These will be set through environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  career_goal?: string
  experience_level?: 'entry' | 'mid' | 'senior' | 'executive'
  industry?: string
  location?: string
  onboarding_completed: boolean
  created_at: string
}

export interface Package {
  id: string // 'free', 'starter', 'premium', 'elite'
  name: string
  price_bdt?: number
  billing_period?: string
  resume_limit: number
  revision_limit: number
  job_match_limit: number
  features: string[]
}

export interface UserSubscription {
  id: string
  user_id: string
  package_id: string
  status: 'active' | 'cancelled' | 'expired'
  start_date: string
  end_date?: string
  payment_method?: string
  transaction_id?: string
}

export interface Resume {
  id: string
  user_id: string
  title: string
  content: any // JSONB
  template_id?: string
  ats_score?: number
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface ResumeRevision {
  id: string
  resume_id: string
  user_id: string
  changes: any // JSONB
  revision_number: number
  created_at: string
}

export interface JobMatch {
  id: string
  user_id: string
  job_title: string
  company: string
  location: string
  salary: string
  match_score: number
  job_data: any // JSONB
  source: string
  applied_at?: string
  saved_at?: string
  created_at: string
}

export interface UsageStats {
  id: string
  user_id: string
  month_year: string
  resumes_created: number
  revisions_used: number
  jobs_viewed: number
  last_updated: string
}

export interface PaymentTransaction {
  id: string
  user_id: string
  subscription_id: string
  amount_bdt: number
  payment_method: string
  transaction_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}
