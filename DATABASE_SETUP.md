# 🗄️ ApplyIQ Database Setup Guide

## Quick Setup Steps

### 1. Get Your Prisma Connection String
1. Go to your [Prisma Dashboard](https://console.prisma.io)
2. Select your `applyiq-bangladesh-main` database
3. Copy the **Database URL** (connection string)

### 2. Update Environment Variables
Create/update your `.env` file:

```bash
# Replace this with your actual Prisma connection string
DATABASE_URL="your-prisma-connection-string-here"

# App Settings
VITE_APP_NAME="ApplyIQ Bangladesh"
VITE_APP_ENV="development"
```

### 3. Set Up Your Database
Run these commands in order:

```bash
# 1. Generate Prisma client
npm run db:generate

# 2. Push schema to database (creates all tables)
npm run db:push

# 3. Set up initial data (companies, templates, sample users)
npm run db:setup
```

### 4. Optional: Open Database Studio
```bash
npm run db:studio
```

## 📊 What Gets Created

### **Tables Created:**
- `User` - User accounts and profiles
- `Resume` - Resume files and metadata
- `ResumeInput` - Resume content (education, experience, skills)
- `Template` - Resume templates for different industries
- `ResumeTemplate` - Links resumes to templates
- `JobScrape` - Job scraping sessions
- `Job` - Individual job listings
- `SavedJob` - User's saved/applied jobs
- `CompanyInsight` - Company research data
- `UserCompanyView` - Track which companies users viewed

### **Sample Data Includes:**

#### **5 Resume Templates:**
- Professional Bangladesh (Corporate/Banking)
- Tech Modern (IT/Software)
- Banking Executive (Finance)
- Creative Designer (Design/Media)
- Startup Professional (Startup/Tech)

#### **6 Major Bangladesh Companies:**
- **BRAC Bank** - Leading financial institution
- **Grameenphone** - Largest telecom operator
- **Pathao** - Tech startup (ride-sharing/logistics)
- **Daraz Bangladesh** - E-commerce platform
- **SSL Commerz** - Payment gateway/fintech
- **Brain Station 23** - Software development company

#### **3 Sample Users:**
- `user@applyiq.com` (Standard user with resume)
- `admin@applyiq.com` (Admin user)
- `jane.smith@example.com` (Additional test user)

#### **4 Sample Jobs:**
- Software Engineer @ BRAC Bank (92% match)
- Frontend Developer @ Grameenphone (88% match)
- Full Stack Developer @ Pathao (85% match)
- React Developer @ Daraz Bangladesh (82% match)

## 🔧 Troubleshooting

### Connection Issues
If you get connection errors:
1. Verify your `DATABASE_URL` is correct
2. Make sure your Prisma database is active
3. Check your internet connection

### Schema Issues
If schema push fails:
```bash
# Reset and try again
npm run db:generate
npm run db:push --force-reset
npm run db:setup
```

### Permission Issues
Make sure your Prisma account has:
- Database creation permissions
- Schema modification permissions

## 🚀 Next Steps

After setup is complete:
1. Your app will connect to the real database instead of localStorage
2. All user data, resumes, and job matches will be persistent
3. You can view/edit data in Prisma Studio
4. Ready for production deployment!

## 📱 Test Your Setup

1. **Login** with `user@applyiq.com` / `user123`
2. **Check Dashboard** - Should show real data from database
3. **View Companies** - Should display 6 Bangladesh companies
4. **Browse Jobs** - Should show 4 sample job listings
5. **Check Resume** - Should show uploaded resume with optimization

---

**Need Help?** Check the Prisma documentation or ask for assistance!
