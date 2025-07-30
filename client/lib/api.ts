// API client for Python FastAPI backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  role: string;
  plan?: string;
}

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  match: number;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface Company {
  id: string;
  name: string;
  industry: string;
  rating: number;
  employees: string;
  openings: number;
  description: string;
  culture: string;
  benefits: string[];
  locations: string[];
}

interface Application {
  id: string;
  company: string;
  position: string;
  status: string;
  date: string;
  stage: string;
  salary_offered?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API request failed, using demo mode:', error);
      // For demo purposes, return mock data based on endpoint
      return this.getMockData<T>(endpoint, options);
    }
  }

  private getMockData<T>(endpoint: string, options: RequestInit): T {
    // Return appropriate mock data based on endpoint
    if (endpoint.includes('/api/auth/login')) {
      return {
        access_token: 'demo-token',
        token_type: 'bearer',
        user: {
          email: 'demo@applyiq.com',
          name: 'Demo User',
          role: 'user',
          plan: 'free'
        }
      } as T;
    }

    if (endpoint.includes('/api/auth/me')) {
      return {
        email: 'demo@applyiq.com',
        name: 'Demo User',
        role: 'user',
        plan: 'free'
      } as T;
    }

    // Default empty response
    return {} as T;
  }

  // Authentication
  async login(credentials: LoginCredentials): Promise<{ user: User; access_token: string }> {
    const response = await this.request<{ user: User; access_token: string; token_type: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    this.token = response.access_token;
    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    return response;
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/me');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Jobs
  async getJobs(params?: {
    limit?: number;
    offset?: number;
    company?: string;
    location?: string;
  }): Promise<JobListing[]> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.company) searchParams.append('company', params.company);
    if (params?.location) searchParams.append('location', params.location);

    const endpoint = `/api/jobs${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.request<JobListing[]>(endpoint);
  }

  async getJob(jobId: string): Promise<JobListing> {
    return this.request<JobListing>(`/api/jobs/${jobId}`);
  }

  // Companies
  async getCompanies(params?: {
    limit?: number;
    offset?: number;
    industry?: string;
  }): Promise<Company[]> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.industry) searchParams.append('industry', params.industry);

    const endpoint = `/api/companies${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.request<Company[]>(endpoint);
  }

  async getCompany(companyId: string): Promise<Company> {
    return this.request<Company>(`/api/companies/${companyId}`);
  }

  // Applications
  async getApplications(): Promise<Application[]> {
    return this.request<Application[]>('/api/applications');
  }

  async createApplication(jobId: string): Promise<{ message: string; application: Application }> {
    return this.request<{ message: string; application: Application }>('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ job_id: jobId }),
    });
  }

  // Analytics
  async getDashboardAnalytics(): Promise<any> {
    return this.request<any>('/api/analytics/dashboard');
  }

  async getMarketAnalytics(): Promise<any> {
    return this.request<any>('/api/analytics/market');
  }

  // Admin endpoints
  async getAllUsers(): Promise<any[]> {
    return this.request<any[]>('/api/admin/users');
  }

  async getAdminAnalytics(): Promise<any> {
    return this.request<any>('/api/admin/analytics');
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export types for use in components
export type {
  User,
  JobListing,
  Company,
  Application,
  LoginCredentials,
};
