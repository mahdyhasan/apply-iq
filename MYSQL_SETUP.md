# ApplyIQ Bangladesh - MySQL Database Setup

## 🚀 MySQL Database Setup Guide

### 1. Prerequisites
- MySQL 8.0 or higher
- Node.js backend (for API endpoints)
- Access to your MySQL server

### 2. Database Setup

#### Step 1: Create Database and Tables
```sql
-- Run the entire mysql_schema.sql file in your MySQL server
source mysql_schema.sql;

-- OR copy and paste the contents of mysql_schema.sql into your MySQL client
```

#### Step 2: Verify Installation
```sql
USE applyiq_bangladesh;
SHOW TABLES;
SELECT * FROM packages;
```

You should see 4 packages: free, starter, premium, elite

### 3. Environment Configuration

Create a `.env` file with your MySQL connection details:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=applyiq_bangladesh

# App Configuration
JWT_SECRET=your_jwt_secret_key_here
BCRYPT_ROUNDS=10

# File Upload Configuration
UPLOAD_MAX_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx

# Bangladesh Payment Configuration (for future use)
BKASH_APP_KEY=your_bkash_app_key
NAGAD_MERCHANT_ID=your_nagad_merchant_id
```

### 4. Backend API Setup (Required)

You'll need to create a backend API to connect to MySQL. Here's a basic structure:

#### Option 1: Node.js/Express Backend
```javascript
// backend/config/database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

#### Option 2: Python/FastAPI Backend (Already exists in your project)
```python
# backend/database.py
import mysql.connector
from mysql.connector import pooling
import os

config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME', 'applyiq_bangladesh'),
    'pool_name': 'applyiq_pool',
    'pool_size': 10
}

pool = mysql.connector.pooling.MySQLConnectionPool(**config)
```

### 5. API Endpoints Needed

Create these endpoints for your frontend:

#### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### User Management
- `GET /api/users/dashboard` - Get dashboard data
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/onboarding` - Complete onboarding

#### Packages & Subscriptions
- `GET /api/packages` - Get all packages
- `POST /api/subscriptions/upgrade` - Upgrade user package
- `GET /api/subscriptions/current` - Get current subscription

#### Resumes
- `GET /api/resumes` - Get user resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/revisions` - Create revision

#### Job Matching
- `GET /api/jobs/matches` - Get job matches for user
- `POST /api/jobs/apply` - Mark job as applied
- `POST /api/jobs/save` - Save job for later

#### File Uploads
- `POST /api/uploads/resume` - Upload resume file
- `GET /api/uploads/:id` - Download file

### 6. Database Schema Overview

#### Core Tables:
- **users** - User accounts and authentication
- **user_profiles** - Profile data and onboarding info
- **packages** - Subscription plans (Free ৳0, Starter ৳200, Premium ৳500, Elite ৳1000)
- **user_subscriptions** - Active user subscriptions
- **resumes** - Resume data and content
- **resume_revisions** - Revision history tracking
- **job_matches** - Personalized job recommendations
- **usage_stats** - Monthly usage tracking for limits
- **payment_transactions** - Payment history
- **file_uploads** - Uploaded file tracking

#### Key Features:
- ✅ Bangladesh pricing in Taka (BDT)
- ✅ Package-based feature limitations
- ✅ Revision tracking with limits
- ✅ Usage statistics for enforcement
- ✅ File upload management
- ✅ Stored procedures for common operations
- ✅ Optimized indexes for performance

### 7. Frontend Integration

Update your React components to use API endpoints instead of localStorage:

```javascript
// Example API service
class ApiService {
  static async login(email, password) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  static async getDashboard() {
    const response = await fetch('/api/users/dashboard', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return response.json();
  }
}
```

### 8. Testing Your Setup

#### Test Database Connection:
```sql
-- Check if packages are loaded
SELECT COUNT(*) FROM packages;  -- Should return 4

-- Test user creation procedure
CALL CreateUser('test@example.com', 'hashed_password', 'Test User', '+880123456789');

-- Check dashboard view
SELECT * FROM user_dashboard_data LIMIT 1;
```

#### Test API Endpoints:
```bash
# Test registration
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@applyiq.bd","password":"test123","full_name":"Test User"}'

# Test login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@applyiq.bd","password":"test123"}'
```

### 9. Production Considerations

#### Security:
- Use SSL/TLS for database connections
- Implement proper password hashing (bcrypt)
- Add rate limiting to API endpoints
- Validate all input data
- Use prepared statements to prevent SQL injection

#### Performance:
- Enable MySQL query cache
- Regular database maintenance (OPTIMIZE TABLE)
- Monitor slow query logs
- Consider read replicas for scaling

#### Backup:
```bash
# Daily backup script
mysqldump -u username -p applyiq_bangladesh > backup_$(date +%Y%m%d).sql
```

### 10. Next Steps

1. **Set up your MySQL server** and run the schema
2. **Create backend API** using Node.js or Python
3. **Update frontend components** to use API endpoints
4. **Test authentication flow** end-to-end
5. **Implement file upload handling**
6. **Set up payment integration** for Bangladesh methods

## 📞 Need Help?

- Check MySQL error logs: `/var/log/mysql/error.log`
- Verify connection: `mysql -u username -p -h hostname`
- Test database: `USE applyiq_bangladesh; SHOW TABLES;`

---

**🎉 Your ApplyIQ Bangladesh platform is now MySQL-ready!**
