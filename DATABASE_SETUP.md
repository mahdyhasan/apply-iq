# ApplyIQ Bangladesh - Supabase Database Setup

This guide will help you set up the Supabase database for the ApplyIQ Bangladesh application.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. **Project Name**: `ApplyIQ Bangladesh`
4. **Organization**: Choose your organization
5. **Region**: `Asia Pacific (Singapore)` (recommended for Bangladesh)
6. **Database Password**: Generate a strong password and save it
7. Click "Create new project"

### 2. Get Connection Details

Once your project is created, go to **Settings > API** and copy:

- **Project URL**: `https://[your-project-ref].supabase.co`
- **Anon/Public Key**: `eyJ...` (public key)
- **Service Role Key**: `eyJ...` (secret key - keep this secure)

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL to create all tables and policies

### 5. Insert Demo Data

1. In the **SQL Editor**, copy the contents of `database/demo-data.sql`
2. Run the SQL to insert package data and demo functions

### 6. Configure Authentication

1. Go to **Authentication > Settings**
2. **Site URL**: `http://localhost:5173` (for development)
3. **Redirect URLs**: Add your production URL when ready
4. Enable **Email confirmation** if desired

### 7. Set Up Row Level Security

The schema automatically enables RLS policies that ensure:
- Users can only access their own data
- Packages are publicly readable
- Secure authentication flow

## 📊 Database Schema Overview

### Core Tables:
- **users** - User profiles and basic info
- **user_profiles** - Onboarding and profile data
- **packages** - Subscription plan configurations
- **user_subscriptions** - Active user subscriptions
- **resumes** - User resume data
- **resume_revisions** - Revision tracking
- **job_matches** - Personalized job recommendations
- **usage_stats** - Monthly usage tracking
- **payment_transactions** - Payment history

### Key Features:
- ✅ Row Level Security enabled
- ✅ Automatic user initialization on signup
- ✅ Usage tracking and limits
- ✅ Audit trails for revisions
- ✅ Bangladesh-specific pricing in Taka

## 🧪 Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:5173`
3. Try signing up with a new account
4. Complete the onboarding flow
5. Test creating resumes and viewing job matches

## 🔧 Troubleshooting

### Common Issues:

**Environment Variables Not Loading:**
```bash
# Make sure .env is in the project root
# Restart the dev server after changes
npm run dev
```

**Database Connection Failed:**
- Check your Supabase URL and keys
- Ensure your project is not paused
- Verify the region settings

**Authentication Issues:**
- Check Site URL in Supabase Auth settings
- Verify email confirmation settings
- Check browser console for errors

**RLS Policy Errors:**
- Ensure all SQL from schema.sql was executed
- Check user authentication status
- Verify policy configurations in Supabase dashboard

## 📱 Production Deployment

Before deploying:

1. Update environment variables for production
2. Add production URL to Supabase Auth settings
3. Configure proper CORS settings
4. Set up email templates in Supabase
5. Enable database backups

## 🛡️ Security Considerations

- ✅ RLS policies protect user data
- ✅ Anon key is safe for client-side use
- ⚠️ Never expose service role key in frontend
- ✅ Users can only access their own data
- ✅ Package data is read-only for users

## 🎯 Next Steps

After setup:
1. Test all user flows
2. Configure payment integration
3. Set up job API connections
4. Add email notifications
5. Configure production monitoring

## 📞 Support

If you encounter issues:
1. Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
2. Review console errors in browser dev tools
3. Check Supabase dashboard logs
4. Verify all environment variables are set correctly

---

**✨ Your ApplyIQ Bangladesh database is now ready!**
