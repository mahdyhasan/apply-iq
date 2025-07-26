import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BrainCircuit, 
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
  Globe
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      // Set default premium plan for demo user if not set (focused on resume building)
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
      features: ["Resume Builder", "3 AI Revisions", "Job Matching", "Company Insights"]
    },
    basic: { 
      name: "Basic Plan", 
      price: "৳200/month", 
      color: "text-blue-600 bg-blue-100",
      features: ["Resume Builder", "Unlimited AI Revisions", "2 Premium Templates"]
    },
    standard: { 
      name: "Standard Plan", 
      price: "৳500/month", 
      color: "text-purple-600 bg-purple-100",
      features: ["Resume Builder", "Job Scraper", "Company Insights", "Job Alerts"]
    },
    premium: { 
      name: "Premium Plan", 
      price: "৳1000/month", 
      color: "text-orange-600 bg-orange-100",
      features: ["All Features", "Auto Alerts", "Cover Letter Generator", "Company Comparisons"]
    }
  };

  const currentPlan = planDetails[user.plan as keyof typeof planDetails] || planDetails.standard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
                <p className="text-xs text-gray-500">For Bangladesh</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || user.email.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            You're on the <strong>{currentPlan.name}</strong>. {currentPlan.price}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resume Enhanced</p>
                  <p className="text-3xl font-bold text-primary">1</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Matches Found</p>
                  <p className="text-3xl font-bold text-green-600">15</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Companies Analyzed</p>
                  <p className="text-3xl font-bold text-purple-600">8</p>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-orange-600">94%</p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tools">My Tools</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="settings">Account Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-8">
              {/* Resume & Career Tools */}
              <Card className="border-2 border-blue-100 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-2xl">Resume & Career Assistant</CardTitle>
                      <CardDescription>AI-powered resume builder, job matching, and company insights for Bangladesh</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">15</div>
                        <div className="text-sm text-gray-600">Job Matches</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-gray-600">Companies Analyzed</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">3</div>
                        <div className="text-sm text-gray-600">AI Revisions Used</div>
                      </div>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <h3 className="font-semibold">Resume Builder</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Build and optimize your resume with AI for Bangladesh job market</p>
                        <Button size="sm" asChild className="w-full">
                          <Link to="/resume-assistant">Build Resume</Link>
                        </Button>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Search className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold">Job Matching</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Find personalized job matches from BDJobs, LinkedIn, and more</p>
                        <Button size="sm" variant="outline" asChild className="w-full">
                          <Link to="/resume-assistant">Find Jobs</Link>
                        </Button>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Eye className="h-5 w-5 text-purple-600" />
                          <h3 className="font-semibold">Company Insights</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Research Bangladeshi companies before applying</p>
                        <Button size="sm" variant="outline" asChild className="w-full">
                          <Link to="/resume-assistant">Research Companies</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Resume uploaded & optimized</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Daily job scraping active</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Company insights enabled</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>ATS optimization active</span>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Plan Benefits */}
            <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Star className="h-5 w-5" />
                  <span>{currentPlan.name} Benefits</span>
                </CardTitle>
                <CardDescription>Your current plan includes these features for Bangladesh job market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {currentPlan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Bangladesh Focus:</h4>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">✓ BDJobs integration</div>
                      <div className="text-sm text-gray-600">✓ Local company insights</div>
                      <div className="text-sm text-gray-600">✓ Salary data in Taka (৳)</div>
                      <div className="text-sm text-gray-600">✓ ATS optimization for BD market</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Career Tools Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15</div>
                    <div className="text-sm text-gray-600">Job Matches from BD Portals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">8</div>
                    <div className="text-sm text-gray-600">BD Companies Analyzed</div>
                  </div>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link to="/resume-assistant">Launch Career Tools</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded">
                    <FileText className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Resume optimized for Bangladesh market</p>
                      <p className="text-sm text-gray-600">ATS score improved to 94% • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded">
                    <Target className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium">New job matches found from BDJobs</p>
                      <p className="text-sm text-gray-600">3 high-match positions available • 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded">
                    <Building className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium">Company insight generated for BRAC Bank</p>
                      <p className="text-sm text-gray-600">Culture analysis completed • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded">
                    <Award className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <p className="font-medium">Profile created successfully</p>
                      <p className="text-sm text-gray-600">Welcome to ApplyIQ Bangladesh • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Plan</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={currentPlan.color}>
                          {currentPlan.name}
                        </Badge>
                        <span className="text-sm text-gray-600">{currentPlan.price}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-lg">Bangladesh</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Usage This Month</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>AI Revisions</span>
                          <span className="font-medium">3/∞</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Job matches</span>
                          <span className="font-medium">15/∞</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Company insights</span>
                          <span className="font-medium">8/∞</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <Button variant="outline">Upgrade Plan</Button>
                  <Button variant="outline">Billing Settings</Button>
                  <Button variant="outline">Download Data</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
