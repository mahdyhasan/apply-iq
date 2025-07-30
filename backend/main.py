from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
import jwt
import json
import os
from pathlib import Path

# Initialize FastAPI app
app = FastAPI(
    title="ApplyIQ Bangladesh API",
    description="Career management platform API for Bangladesh job market",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
SECRET_KEY = "your-secret-key-here"  # In production, use environment variable

# Pydantic models
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    email: str
    name: str
    role: str
    plan: Optional[str] = None

class JobListing(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary: str
    posted: str
    match: int
    description: str
    requirements: List[str]
    benefits: List[str]

class Company(BaseModel):
    id: str
    name: str
    industry: str
    rating: float
    employees: str
    openings: int
    description: str
    culture: str
    benefits: List[str]
    locations: List[str]

class Application(BaseModel):
    id: str
    company: str
    position: str
    status: str
    date: str
    stage: str
    salary_offered: Optional[str] = None

# Demo data
DEMO_USERS = {
    "user@applyiq.com": {
        "email": "user@applyiq.com",
        "password": "user123",  # In production, this would be hashed
        "name": "John Doe",
        "role": "user",
        "plan": "standard"
    },
    "admin@applyiq.com": {
        "email": "admin@applyiq.com",
        "password": "admin123",
        "name": "Admin User",
        "role": "admin",
        "plan": "enterprise"
    }
}

DEMO_JOBS = [
    {
        "id": "job_001",
        "title": "Senior Software Engineer",
        "company": "BRAC Bank",
        "location": "Dhaka, Bangladesh",
        "salary": "৳80,000-120,000",
        "posted": "2 hours ago",
        "match": 95,
        "description": "Join our digital banking team to build next-generation financial applications.",
        "requirements": [
            "5+ years experience in software development",
            "Strong knowledge of React, Node.js, Python",
            "Experience with cloud platforms (AWS/GCP)",
            "Banking domain knowledge preferred"
        ],
        "benefits": [
            "Competitive salary + bonuses",
            "Health insurance for family",
            "Flexible working hours",
            "Professional development budget"
        ]
    },
    {
        "id": "job_002",
        "title": "Frontend Developer",
        "company": "Grameenphone",
        "location": "Dhaka, Bangladesh",
        "salary": "৳60,000-90,000",
        "posted": "5 hours ago",
        "match": 88,
        "description": "Build user-facing applications for millions of Grameenphone customers.",
        "requirements": [
            "3+ years React/Vue.js experience",
            "Strong CSS and JavaScript skills",
            "Mobile-first development",
            "Telecom industry experience a plus"
        ],
        "benefits": [
            "International exposure",
            "Learning and development opportunities",
            "Performance bonuses",
            "Modern office environment"
        ]
    },
    {
        "id": "job_003",
        "title": "Full Stack Developer",
        "company": "Pathao",
        "location": "Dhaka, Bangladesh",
        "salary": "৳70,000-100,000",
        "posted": "1 day ago",
        "match": 85,
        "description": "Help scale our logistics and ride-sharing platform across Bangladesh.",
        "requirements": [
            "4+ years full-stack development",
            "Experience with React, Node.js, Python",
            "Database design and optimization",
            "Startup environment experience"
        ],
        "benefits": [
            "Equity participation",
            "Fast-paced startup culture",
            "Direct impact on product",
            "Continuous learning opportunities"
        ]
    },
    {
        "id": "job_004",
        "title": "Data Scientist",
        "company": "Brain Station 23",
        "location": "Dhaka, Bangladesh",
        "salary": "৳90,000-130,000",
        "posted": "2 days ago",
        "match": 82,
        "description": "Drive data-driven insights for our international software development projects.",
        "requirements": [
            "Master's in Data Science/Statistics",
            "Python, R, SQL proficiency",
            "Machine learning experience",
            "Business intelligence tools"
        ],
        "benefits": [
            "International project exposure",
            "Research publication opportunities",
            "Conference attendance budget",
            "Collaborative team environment"
        ]
    }
]

DEMO_COMPANIES = [
    {
        "id": "comp_001",
        "name": "BRAC Bank",
        "industry": "Banking & Finance",
        "rating": 4.2,
        "employees": "5,000+",
        "openings": 15,
        "description": "Leading financial institution focused on digital banking innovation.",
        "culture": "Professional, collaborative, innovation-driven environment with strong emphasis on work-life balance.",
        "benefits": [
            "Comprehensive health insurance",
            "Performance bonuses",
            "Professional development programs",
            "Flexible working arrangements"
        ],
        "locations": ["Dhaka", "Chittagong", "Sylhet", "Rajshahi"]
    },
    {
        "id": "comp_002",
        "name": "Grameenphone",
        "industry": "Telecommunications",
        "rating": 4.0,
        "employees": "3,000+",
        "openings": 12,
        "description": "Largest mobile operator in Bangladesh, part of Telenor Group.",
        "culture": "Diverse, inclusive workplace with international exposure and continuous learning opportunities.",
        "benefits": [
            "International career opportunities",
            "Learning stipend",
            "Health and wellness programs",
            "Employee stock options"
        ],
        "locations": ["Dhaka", "Chittagong", "Sylhet"]
    },
    {
        "id": "comp_003",
        "name": "Pathao",
        "industry": "Technology/Logistics",
        "rating": 4.1,
        "employees": "2,000+",
        "openings": 20,
        "description": "Fast-growing tech startup revolutionizing transportation and logistics.",
        "culture": "Fast-paced, entrepreneurial environment with high growth potential and innovation focus.",
        "benefits": [
            "Equity participation",
            "Unlimited PTO",
            "Modern office space",
            "Team building activities"
        ],
        "locations": ["Dhaka", "Chittagong"]
    },
    {
        "id": "comp_004",
        "name": "Brain Station 23",
        "industry": "Software Development",
        "rating": 4.3,
        "employees": "1,500+",
        "openings": 25,
        "description": "Leading software development company with international client base.",
        "culture": "Engineering-focused culture with emphasis on technical excellence and continuous improvement.",
        "benefits": [
            "International project exposure",
            "Technical training programs",
            "Conference sponsorship",
            "Flexible work hours"
        ],
        "locations": ["Dhaka", "Chittagong", "Sylhet"]
    },
    {
        "id": "comp_005",
        "name": "SSL Commerz",
        "industry": "Fintech/Payments",
        "rating": 4.0,
        "employees": "500+",
        "openings": 8,
        "description": "Leading payment gateway and fintech solutions provider.",
        "culture": "Innovation-driven fintech environment with focus on digital payments evolution.",
        "benefits": [
            "Fintech industry expertise",
            "Performance incentives",
            "Health coverage",
            "Skill development programs"
        ],
        "locations": ["Dhaka"]
    },
    {
        "id": "comp_006",
        "name": "Daraz Bangladesh",
        "industry": "E-commerce",
        "rating": 3.9,
        "employees": "1,000+",
        "openings": 18,
        "description": "Leading e-commerce platform, part of Alibaba Group.",
        "culture": "Fast-paced e-commerce environment with focus on customer experience and market growth.",
        "benefits": [
            "E-commerce industry leadership",
            "Performance bonuses",
            "Career growth opportunities",
            "Employee discounts"
        ],
        "locations": ["Dhaka", "Chittagong"]
    }
]

DEMO_APPLICATIONS = [
    {
        "id": "app_001",
        "company": "BRAC Bank",
        "position": "Senior Software Engineer",
        "status": "Interview Scheduled",
        "date": "2024-01-15",
        "stage": "Technical Round",
        "salary_offered": None
    },
    {
        "id": "app_002",
        "company": "Grameenphone",
        "position": "Frontend Developer",
        "status": "Under Review",
        "date": "2024-01-12",
        "stage": "HR Screening",
        "salary_offered": None
    },
    {
        "id": "app_003",
        "company": "Pathao",
        "position": "Full Stack Developer",
        "status": "Application Sent",
        "date": "2024-01-10",
        "stage": "Initial Review",
        "salary_offered": None
    },
    {
        "id": "app_004",
        "company": "Brain Station 23",
        "position": "Data Scientist",
        "status": "Offer Received",
        "date": "2024-01-05",
        "stage": "Salary Negotiation",
        "salary_offered": "৳95,000"
    }
]

# Utility functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# API Routes
@app.get("/")
async def root():
    return {"message": "ApplyIQ Bangladesh API", "version": "1.0.0"}

@app.post("/api/auth/login")
async def login(user_data: UserLogin):
    user = DEMO_USERS.get(user_data.email)
    if not user or user["password"] != user_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": user["email"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "plan": user.get("plan")
        }
    }

@app.get("/api/auth/me")
async def get_current_user(email: str = Depends(verify_token)):
    user = DEMO_USERS.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "plan": user.get("plan")
    }

@app.get("/api/jobs", response_model=List[JobListing])
async def get_jobs(
    limit: int = 10,
    offset: int = 0,
    company: Optional[str] = None,
    location: Optional[str] = None,
    email: str = Depends(verify_token)
):
    jobs = DEMO_JOBS.copy()
    
    # Filter by company if specified
    if company:
        jobs = [job for job in jobs if company.lower() in job["company"].lower()]
    
    # Filter by location if specified
    if location:
        jobs = [job for job in jobs if location.lower() in job["location"].lower()]
    
    # Apply pagination
    return jobs[offset:offset + limit]

@app.get("/api/jobs/{job_id}", response_model=JobListing)
async def get_job(job_id: str, email: str = Depends(verify_token)):
    job = next((job for job in DEMO_JOBS if job["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@app.get("/api/companies", response_model=List[Company])
async def get_companies(
    limit: int = 10,
    offset: int = 0,
    industry: Optional[str] = None,
    email: str = Depends(verify_token)
):
    companies = DEMO_COMPANIES.copy()
    
    # Filter by industry if specified
    if industry:
        companies = [comp for comp in companies if industry.lower() in comp["industry"].lower()]
    
    # Apply pagination
    return companies[offset:offset + limit]

@app.get("/api/companies/{company_id}", response_model=Company)
async def get_company(company_id: str, email: str = Depends(verify_token)):
    company = next((comp for comp in DEMO_COMPANIES if comp["id"] == company_id), None)
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company

@app.get("/api/applications", response_model=List[Application])
async def get_applications(email: str = Depends(verify_token)):
    return DEMO_APPLICATIONS

@app.post("/api/applications")
async def create_application(
    job_id: str,
    email: str = Depends(verify_token)
):
    # Find the job
    job = next((job for job in DEMO_JOBS if job["id"] == job_id), None)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Create new application
    new_app = {
        "id": f"app_{len(DEMO_APPLICATIONS) + 1:03d}",
        "company": job["company"],
        "position": job["title"],
        "status": "Application Sent",
        "date": datetime.now().strftime("%Y-%m-%d"),
        "stage": "Initial Review",
        "salary_offered": None
    }
    
    DEMO_APPLICATIONS.append(new_app)
    return {"message": "Application submitted successfully", "application": new_app}

@app.get("/api/analytics/dashboard")
async def get_dashboard_analytics(email: str = Depends(verify_token)):
    user = DEMO_USERS.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user["role"] == "admin":
        return {
            "total_users": 1247,
            "active_users": 892,
            "total_jobs": len(DEMO_JOBS),
            "total_companies": len(DEMO_COMPANIES),
            "applications_today": 23,
            "revenue_this_month": 145000,  # in Taka
            "user_growth": 12.5,  # percentage
            "job_success_rate": 24.8
        }
    else:
        return {
            "resume_score": 85,
            "job_matches": 47,
            "companies_viewed": 23,
            "applications_sent": len(DEMO_APPLICATIONS),
            "profile_views": 127,
            "success_rate": 24.0
        }

@app.get("/api/analytics/market")
async def get_market_analytics(email: str = Depends(verify_token)):
    return {
        "salary_trends": {
            "software_engineer": {"min": 50000, "max": 120000, "avg": 75000},
            "frontend_developer": {"min": 40000, "max": 90000, "avg": 65000},
            "data_scientist": {"min": 70000, "max": 130000, "avg": 95000},
            "product_manager": {"min": 80000, "max": 150000, "avg": 110000}
        },
        "industry_growth": {
            "technology": 18.5,
            "banking": 12.3,
            "telecommunications": 8.7,
            "e_commerce": 22.1
        },
        "popular_skills": [
            {"skill": "React", "demand": 85},
            {"skill": "Python", "demand": 78},
            {"skill": "Node.js", "demand": 72},
            {"skill": "TypeScript", "demand": 68},
            {"skill": "AWS", "demand": 65}
        ]
    }

# Admin-only routes
@app.get("/api/admin/users")
async def get_all_users(email: str = Depends(verify_token)):
    user = DEMO_USERS.get(email)
    if not user or user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return [
        {
            "id": i,
            "name": user_data["name"],
            "email": user_email,
            "role": user_data["role"],
            "plan": user_data.get("plan", "free"),
            "created_at": "2024-01-01",
            "last_active": "2024-01-26"
        }
        for i, (user_email, user_data) in enumerate(DEMO_USERS.items(), 1)
    ]

@app.get("/api/admin/analytics")
async def get_admin_analytics(email: str = Depends(verify_token)):
    user = DEMO_USERS.get(email)
    if not user or user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return {
        "users": {
            "total": 1247,
            "active_monthly": 892,
            "new_this_month": 78,
            "churn_rate": 3.2
        },
        "revenue": {
            "monthly": 145000,
            "yearly": 1650000,
            "growth_rate": 15.8,
            "arpu": 125  # Average Revenue Per User
        },
        "jobs": {
            "total_posted": 2847,
            "applications": 15623,
            "success_rate": 24.8,
            "avg_time_to_hire": 18  # days
        },
        "popular_companies": [
            {"name": "BRAC Bank", "applications": 156},
            {"name": "Grameenphone", "applications": 134},
            {"name": "Pathao", "applications": 98},
            {"name": "Brain Station 23", "applications": 87}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
