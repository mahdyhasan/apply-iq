#!/usr/bin/env python3
"""
ApplyIQ Bangladesh Backend Startup Script
"""
import uvicorn
import os
from pathlib import Path

def main():
    """Start the FastAPI server"""
    print("🚀 Starting ApplyIQ Bangladesh Backend...")
    print("📊 Features: Job matching, Company insights, Resume optimization")
    print("🇧🇩 Market: Bangladesh job market focus")
    print("=" * 50)
    
    # Development settings
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info",
        access_log=True
    )

if __name__ == "__main__":
    main()
