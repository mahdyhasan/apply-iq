import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BrainCircuit, 
  FileText, 
  Presentation, 
  LogOut, 
  User, 
  Settings, 
  CheckCircle, 
  TrendingUp,
  Calendar,
  Clock,
  Star,
  BookOpen,
  Briefcase,
  Target,
  Award,
  Activity,
  BarChart3
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
      // Set default bundle plan for demo user if not set
      if (parsedUser.email === "user@applyiq.com" && !parsedUser.plan) {
        parsedUser.plan = "bundle";
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

  const hasResumeAccess = user.plan === "resume" || user.plan === "bundle";
  const hasEducatorAccess = user.plan === "notes" || user.plan === "bundle";
  const isBundle = user.plan === "bundle";

  const planDetails = {
    bundle: { 
      name: "Complete Bundle", 
      price: "$15/month", 
      color: "text-purple-600 bg-purple-100",
      features: ["Resume Assistant", "Educator Tools", "Priority Support", "Advanced Analytics"]
    },
    resume: { 
      name: "Resume Assistant", 
      price: "$9/month", 
      color: "text-blue-600 bg-blue-100",
      features: ["Job Matching", "Cover Letters", "Company Insights", "Application Tracking"]
    },
    notes: { 
      name: "Notes Generator", 
      price: "$12/month", 
      color: "text-green-600 bg-green-100",
      features: ["AI Notes", "MCQ Generation", "Slide Decks", "Export Tools"]
    }
  };

  const currentPlan = planDetails[user.plan as keyof typeof planDetails] || planDetails.bundle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
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
            You're on the <strong>{currentPlan.name}</strong> plan. {currentPlan.price}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Matches Found</p>
                  <p className="text-3xl font-bold text-primary">15</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applications Sent</p>
                  <p className="text-3xl font-bold text-green-600">3</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notes Generated</p>
                  <p className="text-3xl font-bold text-purple-600">12</p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-orange-600">87%</p>
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
            <div className="grid md:grid-cols-2 gap-8">
              {/* Resume Assistant Access */}
              {hasResumeAccess && (
                <Card className="border-2 border-blue-100 hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-xl">Resume & Job Assistant</CardTitle>
                        <CardDescription>AI-powered job matching and application tools</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-2xl font-bold text-primary">15</div>
                          <div className="text-sm text-gray-600">Job Matches</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">3</div>
                          <div className="text-sm text-gray-600">Applications</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Resume uploaded</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Daily job scraping</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Company insights</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link to="/resume-assistant">Access Resume Tools</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Educator Tools Access */}
              {hasEducatorAccess && (
                <Card className="border-2 border-purple-100 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Presentation className="h-8 w-8 text-purple-600" />
                      <div>
                        <CardTitle className="text-xl">Notes & Slide Generator</CardTitle>
                        <CardDescription>AI-powered content creation for educators</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="text-2xl font-bold text-purple-600">12</div>
                          <div className="text-sm text-gray-600">Notes Created</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-2xl font-bold text-green-600">8</div>
                          <div className="text-sm text-gray-600">MCQ Sets</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded">
                          <div className="text-2xl font-bold text-orange-600">5</div>
                          <div className="text-sm text-gray-600">Slide Decks</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Multiple teaching styles</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Export to PDF, DOC, PPT</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Content library</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                        <Link to="/educator-tools">Access Educator Tools</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Bundle Benefits */}
            {isBundle && (
              <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-800">
                    <Star className="h-5 w-5" />
                    <span>Bundle Plan Benefits</span>
                  </CardTitle>
                  <CardDescription>You have access to all ApplyIQ features</CardDescription>
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
                      <h4 className="font-semibold mb-3">Your Savings:</h4>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Individual plans: $21/month</div>
                        <div className="text-sm text-green-600 font-semibold">Bundle plan: $15/month</div>
                        <div className="text-sm text-purple-600 font-bold">You save: $6/month</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6">
              {hasResumeAccess && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Resume & Job Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">15</div>
                        <div className="text-sm text-gray-600">Job Matches</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-sm text-gray-600">Applications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">12</div>
                        <div className="text-sm text-gray-600">Cover Letters</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">8</div>
                        <div className="text-sm text-gray-600">Companies Analyzed</div>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to="/resume-assistant">Launch Resume Assistant</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {hasEducatorAccess && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Educator Tools</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">12</div>
                        <div className="text-sm text-gray-600">Notes Generated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-gray-600">MCQ Sets</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">5</div>
                        <div className="text-sm text-gray-600">Slide Decks</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">25</div>
                        <div className="text-sm text-gray-600">Total Content</div>
                      </div>
                    </div>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link to="/educator-tools">Launch Educator Tools</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
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
                    <Briefcase className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Applied to Senior Software Engineer at TechCorp</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded">
                    <FileText className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium">Generated cover letter for Frontend Engineer position</p>
                      <p className="text-sm text-gray-600">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded">
                    <BookOpen className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <p className="font-medium">Created class notes for Photosynthesis topic</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded">
                    <Target className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <p className="font-medium">Generated 5 MCQs for World War II topic</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
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
                      <p className="text-sm font-medium text-gray-700">Member Since</p>
                      <p className="text-lg">January 2024</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Usage This Month</p>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between text-sm">
                          <span>Job matches</span>
                          <span className="font-medium">15/50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cover letters</span>
                          <span className="font-medium">12/50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Notes generated</span>
                          <span className="font-medium">12/100</span>
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
