import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  Key
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [resumeProgress, setResumeProgress] = useState(85);

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
      color: "text-green-600 bg-green-100",
      features: ["Resume Builder", "3 AI Revisions", "Job Matching", "Company Insights"],
      limit: { resumes: 1, jobs: 10, companies: 5, aiRevisions: 3 }
    },
    basic: { 
      name: "Basic Plan", 
      price: "৳200/month", 
      color: "text-blue-600 bg-blue-100",
      features: ["Resume Builder", "Unlimited AI Revisions", "2 Premium Templates"],
      limit: { resumes: 3, jobs: 50, companies: 15, aiRevisions: Infinity }
    },
    standard: { 
      name: "Standard Plan", 
      price: "৳500/month", 
      color: "text-purple-600 bg-purple-100",
      features: ["Resume Builder", "Job Scraper", "Company Insights", "Job Alerts"],
      limit: { resumes: 10, jobs: 200, companies: 50, aiRevisions: Infinity }
    },
    premium: { 
      name: "Premium Plan", 
      price: "৳1000/month", 
      color: "text-orange-600 bg-orange-100",
      features: ["All Features", "Auto Alerts", "Cover Letter Generator", "Company Comparisons"],
      limit: { resumes: Infinity, jobs: Infinity, companies: Infinity, aiRevisions: Infinity }
    }
  };

  const currentPlan = planDetails[user.plan as keyof typeof planDetails] || planDetails.standard;

  const recentJobs = [
    { title: "Software Engineer", company: "BRAC Bank", location: "Dhaka", salary: "৳50,000-70,000", posted: "2 hours ago", match: 92 },
    { title: "Frontend Developer", company: "grameenphone", location: "Dhaka", salary: "৳40,000-60,000", posted: "5 hours ago", match: 88 },
    { title: "Full Stack Developer", company: "Pathao", location: "Dhaka", salary: "৳60,000-80,000", posted: "1 day ago", match: 85 },
    { title: "React Developer", company: "Daraz Bangladesh", location: "Dhaka", salary: "৳45,000-65,000", posted: "2 days ago", match: 82 }
  ];

  const topCompanies = [
    { name: "BRAC Bank", industry: "Banking", rating: 4.2, employees: "5K+", openings: 12 },
    { name: "Grameenphone", industry: "Telecom", rating: 4.0, employees: "3K+", openings: 8 },
    { name: "Pathao", industry: "Tech/Logistics", rating: 4.1, employees: "2K+", openings: 15 },
    { name: "Daraz Bangladesh", industry: "E-commerce", rating: 3.9, employees: "1K+", openings: 6 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
                <p className="text-xs text-gray-500">Career Dashboard</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Badge className={currentPlan.color}>
                {currentPlan.name}
              </Badge>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">{user.name || user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name || user.email.split('@')[0]}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to advance your career in Bangladesh? Let's get started.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Plan</p>
              <p className="text-xl font-bold text-primary">{currentPlan.name}</p>
              <p className="text-sm text-gray-600">{currentPlan.price}</p>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild className="h-16 flex-col space-y-1">
              <Link to="/resume-assistant">
                <Upload className="h-5 w-5" />
                <span className="text-sm">Upload Resume</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-16 flex-col space-y-1">
              <Link to="/resume-assistant">
                <Search className="h-5 w-5" />
                <span className="text-sm">Find Jobs</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-16 flex-col space-y-1">
              <Link to="/resume-assistant">
                <Building className="h-5 w-5" />
                <span className="text-sm">Research Companies</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-16 flex-col space-y-1">
              <Link to="/resume-assistant">
                <BarChart3 className="h-5 w-5" />
                <span className="text-sm">View Analytics</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Resume Score</p>
                  <p className="text-2xl font-bold text-blue-900">{resumeProgress}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+5% this week</span>
                  </div>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Job Matches</p>
                  <p className="text-2xl font-bold text-green-900">47</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+12 today</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Companies</p>
                  <p className="text-2xl font-bold text-purple-900">23</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+3 analyzed</span>
                  </div>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Applications</p>
                  <p className="text-2xl font-bold text-orange-900">8</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-orange-600 mr-1" />
                    <span className="text-xs text-orange-600">2 pending</span>
                  </div>
                </div>
                <Mail className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">24%</p>
                  <div className="flex items-center mt-1">
                    <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">Above avg</span>
                  </div>
                </div>
                <Award className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-12">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Resume</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Companies</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Resume Progress */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Resume Optimization Progress</span>
                  </CardTitle>
                  <CardDescription>Your resume score has improved significantly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">ATS Compatibility</span>
                      <span className="text-sm text-gray-600">{resumeProgress}%</span>
                    </div>
                    <Progress value={resumeProgress} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <p className="text-sm font-medium">Keywords Optimized</p>
                        <p className="text-xs text-gray-600">23/25 target keywords</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Zap className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <p className="text-sm font-medium">AI Suggestions</p>
                        <p className="text-xs text-gray-600">3 improvements pending</p>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <Link to="/resume-assistant">Continue Optimizing</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>Today's Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Apply to 3 new positions</p>
                      <p className="text-xs text-blue-700">Based on your profile</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Update skills section</p>
                      <p className="text-xs text-green-700">Add React & TypeScript</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900">Research BRAC Bank</p>
                      <p className="text-xs text-purple-700">Perfect match found</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <FileText className="h-5 w-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">Resume optimized for Bangladesh market</p>
                      <p className="text-sm text-gray-600">ATS score improved to {resumeProgress}% • 2 hours ago</p>
                    </div>
                    <Badge variant="secondary">+5%</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Target className="h-5 w-5 text-green-600 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">12 new job matches from BDJobs & LinkedIn</p>
                      <p className="text-sm text-gray-600">High-match positions available • 4 hours ago</p>
                    </div>
                    <Badge variant="secondary">New</Badge>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Building className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">Company insights for Pathao completed</p>
                      <p className="text-sm text-gray-600">Culture analysis & salary data • 1 day ago</p>
                    </div>
                    <Badge variant="secondary">Insight</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>My Resume</span>
                    </span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="font-medium">Software_Engineer_Resume_v2.pdf</p>
                      <p className="text-sm text-gray-600">Last updated: 2 hours ago</p>
                      <p className="text-sm text-green-600 font-medium">ATS Score: {resumeProgress}%</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Optimization Checklist</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Keywords optimized for Bangladesh market</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">ATS-friendly formatting applied</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Add 2 more technical skills</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">Include quantified achievements</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Resume Templates</span>
                  </CardTitle>
                  <CardDescription>Choose from Bangladesh-optimized templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-16 w-full bg-blue-100 rounded mb-2"></div>
                      <p className="text-sm font-medium">Professional</p>
                      <p className="text-xs text-gray-600">Banking & Corporate</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-16 w-full bg-green-100 rounded mb-2"></div>
                      <p className="text-sm font-medium">Tech Modern</p>
                      <p className="text-xs text-gray-600">IT & Software</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-16 w-full bg-purple-100 rounded mb-2"></div>
                      <p className="text-sm font-medium">Creative</p>
                      <p className="text-xs text-gray-600">Design & Media</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center hover:border-primary transition-colors cursor-pointer">
                      <div className="h-16 w-full bg-orange-100 rounded mb-2"></div>
                      <p className="text-sm font-medium">Executive</p>
                      <p className="text-xs text-gray-600">Management</p>
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link to="/resume-assistant">Browse All Templates</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Job Matches</h2>
                <p className="text-gray-600">Personalized job recommendations for you</p>
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

            <div className="grid gap-4">
              {recentJobs.map((job, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <Badge className="bg-green-100 text-green-800">{job.match}% Match</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm">Apply Now</Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Company Research</h2>
                <p className="text-gray-600">Top companies in Bangladesh with insights</p>
              </div>
              <Button asChild>
                <Link to="/resume-assistant">
                  <Search className="h-4 w-4 mr-2" />
                  Search Companies
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {topCompanies.map((company, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                        <p className="text-gray-600 mb-2">{company.industry}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{company.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{company.employees}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {company.openings} openings
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Insights
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Search className="h-4 w-4 mr-2" />
                        View Jobs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Profile Views</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">127</p>
                    <p className="text-sm text-gray-600">This month</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+23% vs last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Application Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">24%</p>
                    <p className="text-sm text-gray-600">Success rate</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Above industry avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span>Response Time</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-orange-600">3.2</p>
                    <p className="text-sm text-gray-600">Days average</p>
                    <div className="flex items-center justify-center mt-2">
                      <ArrowDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Faster than avg</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Your job search activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Applications Sent</span>
                    <span className="font-medium">8 this month</span>
                  </div>
                  <Progress value={65} />
                  
                  <div className="flex items-center justify-between">
                    <span>Profile Views</span>
                    <span className="font-medium">127 views</span>
                  </div>
                  <Progress value={85} />
                  
                  <div className="flex items-center justify-between">
                    <span>Resume Downloads</span>
                    <span className="font-medium">34 downloads</span>
                  </div>
                  <Progress value={45} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <p className="text-lg">Dhaka, Bangladesh</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Industry</label>
                    <p className="text-lg">Information Technology</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Subscription Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Plan</span>
                    <Badge className={currentPlan.color}>
                      {currentPlan.name}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <span className="font-medium">{currentPlan.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Next Billing</span>
                    <span>Jan 15, 2024</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">Upgrade Plan</Button>
                    <Button variant="outline" className="w-full">Billing History</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notification Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Job Alerts</p>
                      <p className="text-sm text-gray-600">New job matches via email</p>
                    </div>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Application Updates</p>
                      <p className="text-sm text-gray-600">Status changes notifications</p>
                    </div>
                    <Button variant="outline" size="sm">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-gray-600">Progress summary emails</p>
                    </div>
                    <Button variant="outline" size="sm">Off</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy & Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <AlertCircle className="h-4 w-4 mr-2" />
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
