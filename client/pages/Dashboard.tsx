import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,
  LogOut,
  User,
  Settings,
  CheckCircle,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Briefcase,
  Target,
  Award,
  Activity,
  BarChart3,
  Eye,
  Building,
  Search,
  Globe,
  Upload,
  Download,
  Edit,
  BookOpen,
  Bell,
  CreditCard,
  Shield,
  RefreshCw,
  Filter,
  Heart,
  AlertCircle,
  Zap,
  Lightbulb,
  MapPin,
  DollarSign,
  Users,
  TrendingDown,
  Mail,
  Phone,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Percent,
  Key,
  Home,
  PlusCircle,
  Database,
  MessageSquare,
  HelpCircle
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [resumeProgress, setResumeProgress] = useState(85);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.email === "user@applyiq.com" && !parsedUser.plan) {
        parsedUser.plan = "standard";
        localStorage.setItem("user", JSON.stringify(parsedUser));
      }
      setUser(parsedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  const planDetails = {
    free: { 
      name: "Free Trial", 
      price: "৳0/7 days", 
      color: "bg-green-50 text-green-700 border-green-200",
      features: ["Resume Builder", "3 AI Revisions", "Job Matching", "Company Insights"],
      limit: { resumes: 1, jobs: 10, companies: 5, aiRevisions: 3 }
    },
    basic: { 
      name: "Basic Plan", 
      price: "৳200/month", 
      color: "bg-blue-50 text-blue-700 border-blue-200",
      features: ["Resume Builder", "Unlimited AI Revisions", "2 Premium Templates"],
      limit: { resumes: 3, jobs: 50, companies: 15, aiRevisions: Infinity }
    },
    standard: { 
      name: "Standard Plan", 
      price: "৳500/month", 
      color: "bg-purple-50 text-purple-700 border-purple-200",
      features: ["Resume Builder", "Job Scraper", "Company Insights", "Job Alerts"],
      limit: { resumes: 10, jobs: 200, companies: 50, aiRevisions: Infinity }
    },
    premium: { 
      name: "Premium Plan", 
      price: "৳1000/month", 
      color: "bg-orange-50 text-orange-700 border-orange-200",
      features: ["All Features", "Auto Alerts", "Cover Letter Generator", "Company Comparisons"],
      limit: { resumes: Infinity, jobs: Infinity, companies: Infinity, aiRevisions: Infinity }
    }
  };

  const currentPlan = planDetails[user.plan as keyof typeof planDetails] || planDetails.standard;

  const recentJobs = [
    { title: "Software Engineer", company: "BRAC Bank", location: "Dhaka", salary: "৳50,000-70,000", posted: "2 hours ago", match: 92 },
    { title: "Frontend Developer", company: "Grameenphone", location: "Dhaka", salary: "৳40,000-60,000", posted: "5 hours ago", match: 88 },
    { title: "Full Stack Developer", company: "Pathao", location: "Dhaka", salary: "৳60,000-80,000", posted: "1 day ago", match: 85 },
    { title: "React Developer", company: "Daraz Bangladesh", location: "Dhaka", salary: "৳45,000-65,000", posted: "2 days ago", match: 82 }
  ];

  const topCompanies = [
    { name: "BRAC Bank", industry: "Banking", rating: 4.2, employees: "5K+", openings: 12 },
    { name: "Grameenphone", industry: "Telecom", rating: 4.0, employees: "3K+", openings: 8 },
    { name: "Pathao", industry: "Tech/Logistics", rating: 4.1, employees: "2K+", openings: 15 },
    { name: "Daraz Bangladesh", industry: "E-commerce", rating: 3.9, employees: "1K+", openings: 6 }
  ];

  const applications = [
    { company: "BRAC Bank", position: "Software Engineer", status: "Interview Scheduled", date: "2024-01-15", stage: "Technical Round" },
    { company: "Grameenphone", position: "Frontend Developer", status: "Under Review", date: "2024-01-12", stage: "HR Screening" },
    { company: "Pathao", position: "Full Stack Developer", status: "Application Sent", date: "2024-01-10", stage: "Initial Review" },
    { company: "SSL Commerz", position: "Backend Developer", status: "Rejected", date: "2024-01-08", stage: "Technical Assessment" }
  ];

  const MetricCard = ({ title, value, change, icon, gradientFrom, gradientTo, changeColor = "text-green-600" }: any) => (
    <Card className={`h-full bg-gradient-to-br ${gradientFrom} ${gradientTo} border-0 shadow-sm`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-lg font-bold text-gray-900 mb-1">{value}</p>
            <div className="flex items-center">
              <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
              <span className={`text-xs ${changeColor}`}>{change}</span>
            </div>
          </div>
          <div className="text-gray-600 opacity-80">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const JobCard = ({ job }: any) => (
    <Card className="mb-2 hover:shadow-md transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{job.title}</h3>
              <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                {job.match}% Match
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span className="font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{job.posted}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="text-xs px-3 py-1 h-6">
                Apply Now
              </Button>
              <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-6">
                <Heart className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-6">
                <Eye className="h-3 w-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CompanyCard = ({ company }: any) => (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{company.name}</h3>
            <p className="text-xs text-gray-600 mb-1">{company.industry}</p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{company.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{company.employees}</span>
              </div>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5">
            {company.openings} openings
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 text-xs px-2 py-1 h-6">
            <Eye className="h-3 w-3 mr-1" />
            Insights
          </Button>
          <Button size="sm" className="flex-1 text-xs px-2 py-1 h-6">
            <Search className="h-3 w-3 mr-1" />
            Jobs
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ApplicationCard = ({ application }: any) => {
    const statusColors: any = {
      "Interview Scheduled": "bg-blue-100 text-blue-800",
      "Under Review": "bg-yellow-100 text-yellow-800",
      "Application Sent": "bg-gray-100 text-gray-800",
      "Rejected": "bg-red-100 text-red-800",
      "Offer Received": "bg-green-100 text-green-800"
    };

    return (
      <Card className="mb-2 hover:shadow-sm transition-shadow">
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">{application.position}</h4>
              <p className="text-xs text-gray-600 mb-1">{application.company}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>Applied: {application.date}</span>
                <span>•</span>
                <span>{application.stage}</span>
              </div>
            </div>
            <Badge className={`text-xs px-2 py-0.5 ${statusColors[application.status]}`}>
              {application.status}
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-900">ApplyIQ</span>
                <p className="text-xs text-gray-500">Career Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Badge className={`text-xs px-2 py-1 ${currentPlan.color}`}>
                {currentPlan.name}
              </Badge>
              <div className="flex items-center space-x-2">
                <User className="h-3 w-3 text-gray-600" />
                <span className="text-xs text-gray-600">{user.name || user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="text-xs px-3 py-1 h-6">
                <LogOut className="h-3 w-3 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-4">
        {/* Welcome Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back, {user.name || user.email.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-600 text-sm">
                Your comprehensive career management dashboard
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Current Plan</p>
              <p className="text-base font-bold text-primary">{currentPlan.name}</p>
              <p className="text-xs text-gray-600">{currentPlan.price}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-4">
          <MetricCard 
            title="Resume Score" 
            value={`${resumeProgress}%`} 
            change="+5% this week" 
            icon={<FileText className="h-5 w-5" />}
            gradientFrom="from-blue-50"
            gradientTo="to-blue-100"
          />
          <MetricCard 
            title="Job Matches" 
            value="47" 
            change="+12 today" 
            icon={<Target className="h-5 w-5" />}
            gradientFrom="from-green-50"
            gradientTo="to-green-100"
          />
          <MetricCard 
            title="Companies" 
            value="23" 
            change="+3 analyzed" 
            icon={<Building className="h-5 w-5" />}
            gradientFrom="from-purple-50"
            gradientTo="to-purple-100"
          />
          <MetricCard 
            title="Applications" 
            value="8" 
            change="2 pending" 
            icon={<Mail className="h-5 w-5" />}
            gradientFrom="from-orange-50"
            gradientTo="to-orange-100"
          />
          <MetricCard 
            title="Success Rate" 
            value="24%" 
            change="Above avg" 
            icon={<Award className="h-5 w-5" />}
            gradientFrom="from-indigo-50"
            gradientTo="to-indigo-100"
          />
          <MetricCard 
            title="Profile Views" 
            value="127" 
            change="+18 this week" 
            icon={<Eye className="h-5 w-5" />}
            gradientFrom="from-teal-50"
            gradientTo="to-teal-100"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 h-9">
            <TabsTrigger value="overview" className="flex items-center space-x-1 text-xs">
              <Home className="h-3 w-3" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-1 text-xs">
              <FileText className="h-3 w-3" />
              <span>Resume</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-1 text-xs">
              <Search className="h-3 w-3" />
              <span>Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center space-x-1 text-xs">
              <Briefcase className="h-3 w-3" />
              <span>Applications</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center space-x-1 text-xs">
              <Building className="h-3 w-3" />
              <span>Companies</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-1 text-xs">
              <BarChart3 className="h-3 w-3" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-1 text-xs">
              <Settings className="h-3 w-3" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Resume Progress */}
              <Card className="md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span>Resume Optimization Progress</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Your resume score has improved significantly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">ATS Compatibility</span>
                      <span className="text-xs text-gray-600">{resumeProgress}%</span>
                    </div>
                    <Progress value={resumeProgress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="text-center p-2 bg-green-50 rounded-lg border">
                        <CheckCircle className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <p className="text-xs font-medium">Keywords Optimized</p>
                        <p className="text-xs text-gray-600">23/25 target keywords</p>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded-lg border">
                        <Zap className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs font-medium">AI Suggestions</p>
                        <p className="text-xs text-gray-600">3 improvements pending</p>
                      </div>
                    </div>

                    <Button className="w-full text-xs h-7">
                      Optimize Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Recommendations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <span>Today's Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Alert className="p-2 bg-blue-50 border-blue-200">
                      <AlertDescription className="text-xs">
                        <p className="font-medium text-blue-900">Apply to 3 new positions</p>
                        <p className="text-blue-700">Based on your profile</p>
                      </AlertDescription>
                    </Alert>
                    <Alert className="p-2 bg-green-50 border-green-200">
                      <AlertDescription className="text-xs">
                        <p className="font-medium text-green-900">Update skills section</p>
                        <p className="text-green-700">Add React & TypeScript</p>
                      </AlertDescription>
                    </Alert>
                    <Alert className="p-2 bg-purple-50 border-purple-200">
                      <AlertDescription className="text-xs">
                        <p className="font-medium text-purple-900">Research BRAC Bank</p>
                        <p className="text-purple-700">Perfect match found</p>
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Applications */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Activity className="h-4 w-4" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Resume optimized for Bangladesh market</p>
                        <p className="text-xs text-gray-600">ATS score improved to {resumeProgress}% • 2 hours ago</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-xs">+5%</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Target className="h-4 w-4 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">12 new job matches found</p>
                        <p className="text-xs text-gray-600">High-match positions available • 4 hours ago</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <Building className="h-4 w-4 text-purple-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Company insights for Pathao completed</p>
                        <p className="text-xs text-gray-600">Culture analysis & salary data • 1 day ago</p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">Insight</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Recent Applications</span>
                    </span>
                    <Button variant="outline" size="sm" className="text-xs h-6">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {applications.slice(0, 3).map((app, index) => (
                      <ApplicationCard key={index} application={app} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>My Resume</span>
                    </span>
                    <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium">Software_Engineer_Resume_v2.pdf</p>
                      <p className="text-xs text-gray-600">Last updated: 2 hours ago</p>
                      <p className="text-xs text-green-600 font-medium">ATS Score: {resumeProgress}%</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Upload className="h-3 w-3 mr-1" />
                        Upload New
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Optimization Checklist</h4>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">Keywords optimized for Bangladesh market</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">ATS-friendly formatting applied</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-3 w-3 text-orange-500" />
                          <span className="text-xs">Add 2 more technical skills</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-3 w-3 text-orange-500" />
                          <span className="text-xs">Include quantified achievements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Star className="h-4 w-4" />
                    <span>Resume Templates</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Choose from Bangladesh-optimized templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-12 w-full bg-blue-100 rounded mb-1"></div>
                      <p className="text-xs font-medium">Professional</p>
                      <p className="text-xs text-gray-600">Banking & Corporate</p>
                    </div>
                    <div className="p-2 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-12 w-full bg-green-100 rounded mb-1"></div>
                      <p className="text-xs font-medium">Tech Modern</p>
                      <p className="text-xs text-gray-600">IT & Software</p>
                    </div>
                    <div className="p-2 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-12 w-full bg-purple-100 rounded mb-1"></div>
                      <p className="text-xs font-medium">Creative</p>
                      <p className="text-xs text-gray-600">Design & Media</p>
                    </div>
                    <div className="p-2 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-12 w-full bg-orange-100 rounded mb-1"></div>
                      <p className="text-xs font-medium">Executive</p>
                      <p className="text-xs text-gray-600">Management</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4 text-xs h-7">
                    Browse All Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Job Matches</h2>
                <p className="text-gray-600 text-sm">Personalized job recommendations for you</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {recentJobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">My Applications</h2>
                <p className="text-gray-600 text-sm">Track your job application status</p>
              </div>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="grid gap-3">
              {applications.map((app, index) => (
                <ApplicationCard key={index} application={app} />
              ))}
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Company Research</h2>
                <p className="text-gray-600 text-sm">Top companies in Bangladesh with insights</p>
              </div>
              <Button size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search Companies
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {topCompanies.map((company, index) => (
                <CompanyCard key={index} company={company} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>Profile Views</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">127</p>
                    <p className="text-xs text-gray-600">This month</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">+23% vs last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span>Application Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">24%</p>
                    <p className="text-xs text-gray-600">Success rate</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Above industry avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span>Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">3.2</p>
                    <p className="text-xs text-gray-600">Days average</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">Faster than avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Monthly Progress</CardTitle>
                <CardDescription className="text-xs">Your job search activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Applications Sent</span>
                    <span className="text-sm font-medium">8 this month</span>
                  </div>
                  <Progress value={65} />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Views</span>
                    <span className="text-sm font-medium">127 views</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resume Downloads</span>
                    <span className="text-sm font-medium">34 downloads</span>
                  </div>
                  <Progress value={45} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Messages</h2>
                <p className="text-gray-600 text-sm">Communication with recruiters and companies</p>
              </div>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600 text-sm mb-4">Start connecting with recruiters and companies</p>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Send First Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <User className="h-4 w-4" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Email</label>
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Location</label>
                    <p className="text-sm">Dhaka, Bangladesh</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Industry</label>
                    <p className="text-sm">Information Technology</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs h-7">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <CreditCard className="h-4 w-4" />
                    <span>Subscription Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Current Plan</span>
                    <Badge className={currentPlan.color}>
                      {currentPlan.name}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Price</span>
                    <span className="text-sm font-medium">{currentPlan.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs">Next Billing</span>
                    <span className="text-sm">Jan 15, 2024</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full text-xs h-7">Upgrade Plan</Button>
                    <Button variant="outline" className="w-full text-xs h-7">Billing History</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Bell className="h-4 w-4" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Job Alerts</p>
                      <p className="text-xs text-gray-600">New job matches via email</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-6">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Application Updates</p>
                      <p className="text-xs text-gray-600">Status changes notifications</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-6">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Weekly Reports</p>
                      <p className="text-xs text-gray-600">Progress summary emails</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-6">Off</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-base">
                    <Shield className="h-4 w-4" />
                    <span>Privacy & Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-xs h-7">
                      <Key className="h-3 w-3 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-xs h-7">
                      <Download className="h-3 w-3 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 text-xs h-7">
                      <AlertCircle className="h-3 w-3 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
