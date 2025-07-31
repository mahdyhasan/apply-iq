-- ApplyIQ Bangladesh Demo Data
-- Sample data for testing and demonstration

-- Insert Package Plans
INSERT INTO public.packages (id, name, price_bdt, billing_period, resume_limit, revision_limit, job_match_limit, features) VALUES
('free', 'Free', 0, 'lifetime', 1, 3, 0, '[
  "1 resume creation",
  "3 revision attempts",
  "Basic templates",
  "PDF export"
]'::jsonb),

('starter', 'Starter', 200, 'monthly', 1, 10, 3, '[
  "1 professional resume",
  "10 revision attempts",
  "Premium templates",
  "ATS optimization",
  "3 job matches daily",
  "Basic job filters",
  "PDF & DOCX export",
  "Email support"
]'::jsonb),

('premium', 'Premium', 500, 'monthly', 5, -1, -1, '[
  "5 resume variations",
  "Unlimited revisions",
  "All premium templates",
  "Advanced ATS scoring",
  "Unlimited job matches",
  "Advanced job filters",
  "24-hour job refresh",
  "Cover letter generator",
  "LinkedIn profile optimization",
  "Priority support"
]'::jsonb),

('elite', 'Elite', 1000, 'monthly', -1, -1, -1, '[
  "Unlimited resumes",
  "Unlimited revisions",
  "Exclusive templates",
  "AI-powered optimization",
  "Personal job curator",
  "Company insights",
  "Interview preparation",
  "Salary negotiation tips",
  "1-on-1 career consultation",
  "Direct recruiter connections",
  "24/7 priority support"
]'::jsonb);

-- Note: User data will be created through authentication flow
-- But we can create some sample job matches data for demo

-- Sample job data (these would normally come from external APIs)
-- We'll create these as a reference for the job matching system

-- Create a demo user profile (this would be done through auth signup)
-- INSERT INTO public.users (id, email, full_name, phone) VALUES 
-- ('550e8400-e29b-41d4-a716-446655440000', 'demo@applyiq.bd', 'Demo User', '+880123456789');

-- INSERT INTO public.user_profiles (user_id, career_goal, experience_level, industry, location, onboarding_completed) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 'Senior Software Engineer at a leading tech company', 'mid', 'Technology', 'Dhaka', TRUE);

-- INSERT INTO public.user_subscriptions (user_id, package_id, status) VALUES
-- ('550e8400-e29b-41d4-a716-446655440000', 'starter', 'active');

-- Sample job matches data structure for reference
-- This data would typically be inserted dynamically from job APIs
/*
Sample job match data structure:
{
  "job_title": "Senior Software Engineer",
  "company": "BRAC Bank",
  "location": "Dhaka",
  "salary": "৳80,000-120,000",
  "type": "Full-time",
  "experience": "4-6 years",
  "posted": "2 hours ago",
  "deadline": "Jan 30, 2024",
  "description": "Join our digital banking team to build next-generation financial applications using React, Node.js, and cloud technologies.",
  "requirements": ["5+ years experience", "React/Node.js expertise", "Banking domain knowledge"],
  "benefits": ["Health insurance", "Performance bonus", "Flexible hours"],
  "applyUrl": "https://bdjobs.com/brac-bank-software-engineer",
  "source": "BDJobs",
  "featured": true
}
*/

-- Functions for demo data generation
CREATE OR REPLACE FUNCTION public.create_sample_jobs_for_user(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.job_matches (user_id, job_title, company, location, salary, match_score, job_data, source, created_at) VALUES
  (user_uuid, 'Senior Software Engineer', 'BRAC Bank', 'Dhaka', '৳80,000-120,000', 95, '{
    "type": "Full-time",
    "experience": "4-6 years",
    "posted": "2 hours ago",
    "deadline": "Jan 30, 2024",
    "description": "Join our digital banking team to build next-generation financial applications using React, Node.js, and cloud technologies.",
    "requirements": ["5+ years experience", "React/Node.js expertise", "Banking domain knowledge"],
    "benefits": ["Health insurance", "Performance bonus", "Flexible hours"],
    "applyUrl": "https://bdjobs.com/brac-bank-software-engineer",
    "featured": true
  }'::jsonb, 'BDJobs', NOW() - INTERVAL '2 hours'),
  
  (user_uuid, 'Frontend Developer', 'Grameenphone', 'Dhaka', '৳60,000-90,000', 88, '{
    "type": "Full-time",
    "experience": "2-4 years",
    "posted": "5 hours ago",
    "description": "Build user-facing applications for millions of customers using modern React and TypeScript.",
    "requirements": ["3+ years React", "TypeScript proficiency", "Mobile-first development"],
    "benefits": ["International exposure", "Learning budget", "Modern office"],
    "applyUrl": "https://linkedin.com/jobs/grameenphone-frontend"
  }'::jsonb, 'LinkedIn', NOW() - INTERVAL '5 hours'),
  
  (user_uuid, 'Full Stack Developer', 'Pathao', 'Dhaka', '৳70,000-100,000', 85, '{
    "type": "Full-time",
    "experience": "3-5 years",
    "posted": "1 day ago",
    "description": "Help scale our logistics platform serving millions across Bangladesh.",
    "requirements": ["Full-stack experience", "React/Node.js", "Database optimization"],
    "benefits": ["Equity participation", "Startup culture", "Growth opportunities"],
    "applyUrl": "https://pathao.com/careers/fullstack-developer"
  }'::jsonb, 'Company', NOW() - INTERVAL '1 day'),
  
  (user_uuid, 'React Developer', 'Daraz Bangladesh', 'Dhaka', '৳50,000-75,000', 82, '{
    "type": "Full-time",
    "experience": "2-4 years",
    "posted": "2 days ago",
    "description": "Build e-commerce experiences for Bangladeshs leading online marketplace.",
    "requirements": ["React expertise", "E-commerce experience", "Performance optimization"],
    "benefits": ["Employee discounts", "Career growth", "Multicultural team"],
    "applyUrl": "https://jobs.daraz.com.bd/react-developer"
  }'::jsonb, 'Company', NOW() - INTERVAL '2 days'),
  
  (user_uuid, 'Backend Developer', 'Brain Station 23', 'Dhaka', '৳65,000-95,000', 79, '{
    "type": "Full-time",
    "experience": "3-5 years",
    "posted": "3 days ago",
    "description": "Work on international software projects with cutting-edge technologies.",
    "requirements": ["Node.js/Python", "API development", "Cloud platforms"],
    "benefits": ["International projects", "Technical training", "Conference sponsorship"],
    "applyUrl": "https://brainstation-23.com/careers/backend-dev"
  }'::jsonb, 'Company', NOW() - INTERVAL '3 days'),
  
  (user_uuid, 'DevOps Engineer', 'SSL Commerz', 'Dhaka', '৳75,000-110,000', 76, '{
    "type": "Full-time",
    "experience": "4-6 years",
    "posted": "4 days ago",
    "description": "Manage infrastructure for Bangladeshs leading payment gateway.",
    "requirements": ["AWS/GCP", "Docker/Kubernetes", "CI/CD pipelines"],
    "benefits": ["Fintech exposure", "Performance bonuses", "Health coverage"],
    "applyUrl": "https://sslcommerz.com/careers/devops"
  }'::jsonb, 'BDJobs', NOW() - INTERVAL '4 days'),
  
  (user_uuid, 'Product Manager', 'Chaldal', 'Dhaka', '৳90,000-130,000', 73, '{
    "type": "Full-time",
    "experience": "5-7 years",
    "posted": "5 days ago",
    "description": "Lead product strategy for Bangladeshs largest online grocery platform.",
    "requirements": ["Product management", "E-commerce experience", "Data-driven decisions"],
    "benefits": ["Product ownership", "Stock options", "Flexible work"],
    "applyUrl": "https://chaldal.com/careers/product-manager"
  }'::jsonb, 'LinkedIn', NOW() - INTERVAL '5 days'),
  
  (user_uuid, 'UI/UX Designer', 'Shohoz', 'Dhaka', '৳45,000-70,000', 70, '{
    "type": "Full-time",
    "experience": "2-4 years",
    "posted": "1 week ago",
    "description": "Design user experiences for digital services used by millions.",
    "requirements": ["Figma/Sketch", "User research", "Mobile design"],
    "benefits": ["Creative freedom", "Design tools budget", "Team collaboration"],
    "applyUrl": "https://shohoz.com/careers/ui-ux-designer"
  }'::jsonb, 'Others', NOW() - INTERVAL '1 week');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to initialize user data after signup
CREATE OR REPLACE FUNCTION public.initialize_user_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert basic user data
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  -- Create user profile
  INSERT INTO public.user_profiles (user_id, onboarding_completed)
  VALUES (NEW.id, FALSE);
  
  -- Assign free package by default
  INSERT INTO public.user_subscriptions (user_id, package_id, status)
  VALUES (NEW.id, 'free', 'active');
  
  -- Initialize usage stats for current month
  INSERT INTO public.usage_stats (user_id, month_year, resumes_created, revisions_used, jobs_viewed)
  VALUES (NEW.id, TO_CHAR(NOW(), 'YYYY-MM'), 0, 0, 0);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user data on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_data();

-- Function to create sample resume for demo
CREATE OR REPLACE FUNCTION public.create_sample_resume_for_user(user_uuid UUID)
RETURNS UUID AS $$
DECLARE
  resume_id UUID;
BEGIN
  INSERT INTO public.resumes (user_id, title, content, ats_score, status) VALUES
  (user_uuid, 'Software Engineer Resume', '{
    "personalInfo": {
      "fullName": "Demo User",
      "email": "demo@applyiq.bd",
      "phone": "+880123456789",
      "location": "Dhaka, Bangladesh",
      "linkedin": "linkedin.com/in/demo-user",
      "github": "github.com/demo-user"
    },
    "summary": "Experienced software engineer with 3+ years in full-stack development. Proficient in React, Node.js, and cloud technologies. Passionate about building scalable applications for the Bangladesh market.",
    "experience": [
      {
        "title": "Software Engineer",
        "company": "Tech Solutions BD",
        "location": "Dhaka",
        "duration": "Jan 2022 - Present",
        "description": "Developed and maintained web applications using React and Node.js. Improved application performance by 40% through optimization techniques."
      }
    ],
    "education": [
      {
        "degree": "BSc in Computer Science",
        "institution": "University of Dhaka",
        "year": "2021",
        "gpa": "3.75"
      }
    ],
    "skills": ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "AWS"],
    "projects": [
      {
        "name": "E-commerce Platform",
        "description": "Built a full-stack e-commerce platform with React and Node.js",
        "technologies": ["React", "Node.js", "MongoDB"]
      }
    ]
  }'::jsonb, 78, 'draft')
  RETURNING id INTO resume_id;
  
  RETURN resume_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
