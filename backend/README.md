# 🐍 ApplyIQ Bangladesh - Python FastAPI Backend

## 🚀 Quick Start

### **1. Install Python Dependencies**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Or using Poetry (recommended)
poetry install
```

### **2. Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### **3. Start Development Server**
```bash
# Using Python directly
python start.py

# Or using Poetry
poetry run python start.py

# Or using Uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: **http://localhost:8000**

## 📚 API Documentation

### **Interactive Docs**
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### **Key Endpoints**

#### **Authentication**
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### **Jobs**
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/{job_id}` - Get job details
- `POST /api/applications` - Apply to job

#### **Companies**
- `GET /api/companies` - List companies
- `GET /api/companies/{company_id}` - Company details

#### **Analytics**
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/market` - Market insights

#### **Admin (Admin Only)**
- `GET /api/admin/users` - All users
- `GET /api/admin/analytics` - Admin analytics

## 🏗️ Architecture

### **Tech Stack**
- **Framework**: FastAPI (Python 3.9+)
- **Authentication**: JWT tokens
- **Documentation**: Auto-generated OpenAPI/Swagger
- **CORS**: Configured for frontend development
- **Validation**: Pydantic models

### **Features**
- ✅ **Demo Data**: Rich Bangladesh job market data
- ✅ **Authentication**: JWT-based auth system
- ✅ **Job Matching**: AI-powered job recommendations
- ✅ **Company Insights**: Detailed company information
- ✅ **Analytics**: User and admin dashboards
- ✅ **Market Data**: Salary trends and industry insights

### **Demo Users**
```python
# User Account
Email: user@applyiq.com
Password: user123

# Admin Account  
Email: admin@applyiq.com
Password: admin123
```

## 🗄️ Data Structure

### **Jobs (4 Sample Jobs)**
- Senior Software Engineer @ BRAC Bank
- Frontend Developer @ Grameenphone
- Full Stack Developer @ Pathao
- Data Scientist @ Brain Station 23

### **Companies (6 Major BD Companies)**
- BRAC Bank (Banking)
- Grameenphone (Telecom)
- Pathao (Tech/Logistics)
- Brain Station 23 (Software)
- SSL Commerz (Fintech)
- Daraz Bangladesh (E-commerce)

### **Applications**
- Complete application tracking
- Status management
- Interview scheduling
- Salary negotiation

## 🔧 Development

### **Code Structure**
```
backend/
├── main.py              # FastAPI application
├── start.py             # Development server startup
├── requirements.txt     # Python dependencies
├── pyproject.toml      # Poetry configuration
├── .env.example        # Environment template
└── README.md           # This file
```

### **Key Features Implementation**

#### **Authentication System**
```python
# JWT token-based authentication
# Secure password handling (ready for bcrypt)
# Role-based access control (user/admin)
```

#### **Bangladesh Market Focus**
```python
# Taka (৳) currency formatting
# Local company database
# Bangladesh-specific job categories
# Dhaka/Chittagong location data
```

#### **API Design**
```python
# RESTful endpoints
# Comprehensive error handling
# Request/response validation
# Auto-generated documentation
```

## 🚀 Production Deployment

### **Recommended Stack**
- **Hosting**: Railway, Heroku, or DigitalOcean
- **Database**: PostgreSQL
- **Cache**: Redis
- **Queue**: Celery
- **Monitoring**: Sentry

### **Environment Variables**
```bash
# Required for production
SECRET_KEY="production-secret-key"
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."
JWT_SECRET_KEY="jwt-secret"
```

## 🤝 Integration with React Frontend

The frontend automatically connects to this backend:

```typescript
// Frontend API client configuration
const API_BASE_URL = 'http://localhost:8000'

// All endpoints are pre-configured
await apiClient.login({ email, password })
await apiClient.getJobs()
await apiClient.getCompanies()
```

## 📈 Next Steps

1. **Database Integration**: Add PostgreSQL for persistent data
2. **Job Scraping**: Implement BDJobs/LinkedIn scrapers
3. **AI/ML**: Add resume optimization algorithms
4. **Email**: Implement notification system
5. **Caching**: Add Redis for performance
6. **Testing**: Add comprehensive test suite

---

**Happy Coding!** 🇧🇩 Built for Bangladesh's job market with ❤️
