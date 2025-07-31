# 🚀 ApplyIQ Bangladesh - Supabase Setup Instructions

## Your Project Details:

- **Project URL**: https://qzalbwldhvcgrceixfeq.supabase.co
- **Project Ref**: qzalbwldhvcgrceixfeq
- **Status**: ✅ Environment variables configured

## 📋 Step-by-Step Setup

### 1. Go to your Supabase Dashboard

Visit: [https://qzalbwldhvcgrceixfeq.supabase.co](https://qzalbwldhvcgrceixfeq.supabase.co)

### 2. Open SQL Editor

- Click on **SQL Editor** in the left sidebar
- Click **New Query**

### 3. Set Up Database Schema

Copy and paste the entire contents of `database/schema.sql` into the SQL editor and click **Run**.

This will create:

- ✅ All required tables (users, user_profiles, packages, resumes, etc.)
- ✅ Row Level Security policies
- ✅ Indexes for performance
- ✅ Triggers for automatic user initialization
- ✅ Functions for timestamp updates

### 4. Insert Demo Data

Copy and paste the entire contents of `database/demo-data.sql` into a new query and click **Run**.

This will create:

- ✅ Package plans (Free, Starter ৳200, Premium ৳500, Elite ৳1000)
- ✅ Demo data functions
- ✅ User initialization triggers
- ✅ Sample job creation functions

### 5. Configure Authentication Settings

1. Go to **Authentication > Settings**
2. Set **Site URL** to: `http://localhost:5173`
3. Add **Redirect URLs**: `http://localhost:5173/**`
4. Enable **Confirm email** if desired
5. Configure **Email templates** (optional)

### 6. Verify Setup

After running the SQL, you should see these tables in **Table Editor**:

- `users`
- `user_profiles`
- `packages` (should have 4 rows: free, starter, premium, elite)
- `user_subscriptions`
- `resumes`
- `resume_revisions`
- `job_matches`
- `usage_stats`
- `payment_transactions`

## 🧪 Test Your Setup

### Option 1: Quick Test in Supabase

1. Go to **Table Editor**
2. Click on `packages` table
3. You should see 4 package records with Bangladesh pricing

### Option 2: Test in the App

1. Visit: http://localhost:5173
2. Try to sign up with a new account
3. Complete the onboarding flow
4. Check if data appears in your Supabase tables

## 🔧 Troubleshooting

### If you get RLS errors:

```sql
-- Run this if you have RLS issues
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
```

### If packages table is empty:

Re-run the `database/demo-data.sql` script.

### If user signup fails:

Check Authentication settings and ensure email confirmation is configured.

## 🎯 What You'll Get After Setup:

✅ **Complete user authentication** with automatic profile creation  
✅ **4 subscription packages** with Bangladesh pricing in Taka  
✅ **Resume builder** with revision tracking  
✅ **Job matching system** ready for Bangladesh companies  
✅ **Usage analytics** and package limits  
✅ **Payment tracking** for future integration  
✅ **Secure data** with Row Level Security

## 📞 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Verify all SQL ran without errors in Supabase
3. Check **Authentication > Users** to see if users can sign up
4. Look at **Logs** in Supabase for detailed error messages

---

**🎉 Once completed, your ApplyIQ Bangladesh platform will be fully functional with real database persistence!**
