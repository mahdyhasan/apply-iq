# ApplyIQ Bangladesh - Backend API

Complete Node.js/Express backend for the ApplyIQ Bangladesh resume building platform.

## 🚀 Features

- **Complete Authentication System** - JWT-based auth with bcrypt password hashing
- **User Management** - Registration, login, profile management, onboarding
- **Resume Builder** - CRUD operations with revision tracking and package limits
- **Package System** - 4-tier subscription management (Free, Starter ৳200, Premium ৳500, Elite ৳1000)
- **Job Matching** - Personalized job recommendations with Bangladesh companies
- **Usage Analytics** - Monthly usage tracking and package limit enforcement
- **Payment Tracking** - Bangladesh payment methods (bKash, Nagad, etc.)
- **Security** - Rate limiting, CORS, Helmet, input validation
- **Database** - MySQL with proper relationships and indexes

## 📦 Installation

### 1. Install Dependencies
```bash
cd backend-api
npm install
```

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Update with your database credentials
nano .env
```

### 3. Set Up Database
Make sure your MySQL database is running with the ApplyIQ schema:
```bash
# Your database should already have all tables from the schema
mysql -u lemoninfosys_jobportal -p lemoninfosys_jobportal
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Start Production Server
```bash
npm start
```

## 🔧 Environment Variables

```env
# Required - Database
DB_HOST=your-mysql-host
DB_USER=lemoninfosys_jobportal
DB_PASSWORD=your-password
DB_NAME=lemoninfosys_jobportal

# Required - Security
JWT_SECRET=your-jwt-secret

# Optional - Server
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://yourfrontend.com
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### User Management
- `POST /api/users/onboarding` - Complete user onboarding
- `GET /api/users/dashboard` - Get dashboard data
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/usage` - Get usage statistics

### Resume Management
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/revisions` - Create resume revision

### Package Management
- `GET /api/packages` - Get all available packages
- `GET /api/packages/current` - Get current user subscription
- `POST /api/packages/upgrade` - Upgrade/change package
- `GET /api/packages/history` - Get subscription history
- `GET /api/packages/payments` - Get payment history
- `POST /api/packages/cancel` - Cancel subscription

### Job Matching
- `GET /api/jobs/matches` - Get personalized job matches
- `POST /api/jobs/matches` - Create job matches (admin)
- `POST /api/jobs/:id/apply` - Mark job as applied
- `POST /api/jobs/:id/save` - Save job for later
- `GET /api/jobs/saved` - Get saved jobs
- `GET /api/jobs/applied` - Get applied jobs
- `POST /api/jobs/generate-sample` - Generate sample jobs (demo)

### System
- `GET /api/health` - Health check
- `GET /` - API information

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in requests:

```javascript
headers: {
  'Authorization': 'Bearer your-jwt-token-here'
}
```

## 📊 Package System

### Package Limits
- **Free**: 1 resume, 3 revisions, 0 job matches
- **Starter** (৳200/month): 1 resume, 10 revisions, 3 job matches
- **Premium** (৳500/month): 5 resumes, unlimited revisions, unlimited jobs
- **Elite** (৳1000/month): Unlimited everything + premium features

### Usage Enforcement
The API automatically enforces package limits:
- Resume creation blocked when limit reached
- Revision creation blocked when limit reached
- Job viewing blocked when limit reached

## 🎯 Integration with Frontend

### Update React App
Update your React components to use the API instead of localStorage:

```javascript
// Example: Login component
const handleLogin = async (email, password) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    // Handle successful login
  }
};

// Example: Get dashboard data
const getDashboard = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/users/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  return response.json();
};
```

## 🔄 Database Relationships

The API properly handles all database relationships:
- Users → Profiles (1:1)
- Users → Subscriptions (1:many)
- Users → Resumes (1:many)
- Resumes → Revisions (1:many)
- Users → Job Matches (1:many)
- Users → Usage Stats (1:many)

## 🚀 Production Deployment

### 1. Build for Production
```bash
npm install --production
```

### 2. Set Environment Variables
```bash
export NODE_ENV=production
export DB_HOST=your-production-db-host
export JWT_SECRET=your-production-jwt-secret
```

### 3. Start with PM2 (Recommended)
```bash
npm install -g pm2
pm2 start server.js --name "applyiq-api"
pm2 startup
pm2 save
```

### 4. Nginx Configuration (Optional)
```nginx
server {
    listen 80;
    server_name your-api-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🛡️ Security Features

- **JWT Authentication** with secure token generation
- **Password Hashing** using bcrypt with 12 rounds
- **Rate Limiting** to prevent abuse (100 requests/15min, 5 auth/15min)
- **CORS Protection** with configurable origins
- **Helmet.js** for HTTP header security
- **Input Validation** for all endpoints
- **SQL Injection Protection** using parameterized queries

## 📈 Monitoring

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Server Logs
```bash
# With PM2
pm2 logs applyiq-api

# Direct node
npm run dev  # Shows logs in console
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test MySQL connection
mysql -h your-host -u lemoninfosys_jobportal -p
```

### JWT Issues
- Ensure `JWT_SECRET` is set in environment
- Check token format: `Bearer <token>`

### CORS Issues
- Add your frontend URL to `FRONTEND_URL` environment variable
- Check that requests include proper headers

## 🔄 Development Workflow

1. **Make changes** to the code
2. **Test endpoints** using curl, Postman, or your frontend
3. **Check logs** for any errors
4. **Update documentation** if needed

---

**🎉 Your ApplyIQ Bangladesh backend is now ready for production!**
