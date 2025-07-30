import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  LogOut, 
  User, 
  Settings, 
  Upload,
  Download,
  Eye,
  Search,
  Crown,
  Zap,
  Star,
  Lock,
  ArrowUp,
  RefreshCw,
  Edit3,
  Plus,
  Trash2
} from "lucide-react";

// Package configuration
const PACKAGE_CONFIG = {
  free: {
    name: "Free",
    price: "৳0",
    period: "Forever",
    resumeLimit: 1,
    revisionLimit: 3,
    jobMatches: 0,
    downloadFormats: ["PDF (Watermarked)"],
    features: ["Basic resume creation", "3 total revisions", "PDF with watermark"],
    upgradePrompt: "Upgrade to remove watermark and get more features!",
    color: "text-gray-600 bg-gray-100"
  },
  starter: {
    name: "Starter",
    price: "৳200",
    period: "/month",
    resumeLimit: 1,
    revisionLimit: 10,
    jobMatches: 3,
    downloadFormats: ["PDF", "DOCX"],
    features: ["1 resume", "10 revisions/month", "Clean downloads", "3 job matches"],
    upgradePrompt: "Upgrade to Premium for more resume variations!",
    color: "text-blue-600 bg-blue-100"
  },
  premium: {
    name: "Premium", 
    price: "৳500",
    period: "/month",
    resumeLimit: 5,
    revisionLimit: 10, // per resume
    jobMatches: -1, // unlimited
    downloadFormats: ["PDF", "DOCX"],
    features: ["5 resume variations", "10 revisions each", "Unlimited job matches", "24h refresh"],
    upgradePrompt: "Coming soon: Elite with company analysis!",
    color: "text-purple-600 bg-purple-100"
  }
};

interface User {
  fullName?: string;
  email: string;
  phone?: string;
  plan: keyof typeof PACKAGE_CONFIG;
  role: string;
  resumeCount?: number;
  revisionsUsed?: number;
}

interface Resume {
  id: string;
  name: string;
  created: string;
  lastModified: string;
  revisionsUsed: number;
  status: "draft" | "optimized" | "final";
}

export default function PackageDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Load demo resumes based on package
    const demoResumes: Resume[] = [];
    if (parsedUser.plan !== "free") {
      demoResumes.push({
        id: "resume_1",
        name: "Software Engineer Resume",
        created: "2024-01-20",
        lastModified: "2024-01-25",
        revisionsUsed: 3,
        status: "optimized"
      });
    }
    if (parsedUser.plan === "premium") {
      demoResumes.push(
        {
          id: "resume_2", 
          name: "Backend Developer Resume",
          created: "2024-01-22",
          lastModified: "2024-01-24",
          revisionsUsed: 1,
          status: "draft"
        },
        {
          id: "resume_3",
          name: "Team Lead Resume", 
          created: "2024-01-23",
          lastModified: "2024-01-23",
          revisionsUsed: 0,
          status: "draft"
        }
      );
    }
    setResumes(demoResumes);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  const config = PACKAGE_CONFIG[user.plan];
  const canCreateResume = resumes.length < config.resumeLimit;
  const totalRevisionsUsed = resumes.reduce((sum, resume) => sum + resume.revisionsUsed, 0);

  // Sample job matches based on package
  const getJobMatches = () => {
    const allJobs = [
      { title: "Senior Software Engineer", company: "BRAC Bank", match: 95, salary: "৳80k-120k" },
      { title: "Frontend Developer", company: "Grameenphone", match: 88, salary: "৳60k-90k" },
      { title: "Full Stack Developer", company: "Pathao", match: 85, salary: "৳70k-100k" },
      { title: "Backend Developer", company: "Brain Station 23", match: 82, salary: "৳65k-95k" },
      { title: "DevOps Engineer", company: "SSL Commerz", match: 79, salary: "৳75k-110k" }
    ];

    if (config.jobMatches === 0) return [];
    if (config.jobMatches === -1) return allJobs;
    return allJobs.slice(0, config.jobMatches);
  };

  const jobMatches = getJobMatches();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-xl font-bold text-gray-900">ApplyIQ</span>
                <p className="text-xs text-gray-500">Resume Builder</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={config.color}>{config.name}</Badge>
              <div className="text-sm text-gray-600">
                {user.fullName || user.email.split('@')[0]}
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Package Info Banner */}
        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back! 👋
                </h2>
                <p className="text-gray-600">
                  You're on the <strong>{config.name}</strong> plan - {config.price}{config.period}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-2">Usage This Month</div>
                <div className="space-y-1">
                  <div className="text-xs">Resumes: {resumes.length}/{config.resumeLimit}</div>
                  <div className="text-xs">
                    Revisions: {totalRevisionsUsed}/
                    {user.plan === "premium" ? `${config.revisionLimit} per resume` : config.revisionLimit}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resumes">My Resumes</TabsTrigger>
            {jobMatches.length > 0 && <TabsTrigger value="jobs">Job Matches</TabsTrigger>}
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Resume Creation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Resume Builder</span>
                  </CardTitle>
                  <CardDescription>Create and optimize your resume with AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Create Your Resume</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Upload existing resume, paste content, or start from scratch
                      </p>
                      {canCreateResume ? (
                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Create New Resume
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <Alert>
                            <Lock className="h-4 w-4" />
                            <AlertDescription>
                              You've reached your resume limit ({config.resumeLimit}). 
                              Upgrade to create more variations!
                            </AlertDescription>
                          </Alert>
                          <Button variant="outline" className="w-full">
                            <ArrowUp className="h-4 w-4 mr-2" />
                            Upgrade Plan
                          </Button>
                        </div>
                      )}
                    </div>

                    {user.plan === "free" && (
                      <Alert className="bg-amber-50 border-amber-200">
                        <Zap className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          <strong>Upgrade for ৳100:</strong> Remove watermark + get DOCX format!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Package Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-purple-600" />
                    <span>Your Plan Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {config.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">{config.upgradePrompt}</p>
                    {user.plan !== "premium" && (
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        <ArrowUp className="h-4 w-4 mr-2" />
                        View Upgrade Options
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs">Upload Resume</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Edit3 className="h-5 w-5" />
                    <span className="text-xs">Manual Entry</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">Templates</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <Zap className="h-5 w-5" />
                    <span className="text-xs">AI Optimize</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resumes Tab */}
          <TabsContent value="resumes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Resumes</h2>
              {canCreateResume && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Resume
                </Button>
              )}
            </div>

            {resumes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
                  <p className="text-gray-600 mb-6">Create your first resume to get started</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Resume
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{resume.name}</h3>
                        <Badge variant={resume.status === "optimized" ? "default" : "secondary"}>
                          {resume.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div>Created: {resume.created}</div>
                        <div>Modified: {resume.lastModified}</div>
                        <div>Revisions: {resume.revisionsUsed}/{config.revisionLimit}</div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add New Resume Card */}
                {canCreateResume && (
                  <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
                    <CardContent className="p-6 text-center">
                      <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Create New Resume</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Add another resume variation
                      </p>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Create
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Jobs Tab */}
          {jobMatches.length > 0 && (
            <TabsContent value="jobs" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Job Matches</h2>
                  <p className="text-gray-600">
                    {user.plan === "starter" 
                      ? `Showing top ${config.jobMatches} matches` 
                      : "All job matches with ratings"
                    }
                  </p>
                </div>
                {user.plan === "premium" && (
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh (24h)
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {jobMatches.map((job, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <Badge className="bg-green-100 text-green-800">
                              {job.match}% Match
                            </Badge>
                          </div>
                          <div className="text-gray-600 mb-2">
                            <span className="font-medium">{job.company}</span> • {job.salary}
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Job Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {user.plan === "starter" && (
                <Alert>
                  <ArrowUp className="h-4 w-4" />
                  <AlertDescription>
                    Upgrade to Premium to see all job matches with unlimited refresh!
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          )}

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-lg">{user.fullName || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-lg">{user.phone || "Not provided"}</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Current Plan</span>
                    <Badge className={config.color}>{config.name}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price</span>
                    <span className="font-medium">{config.price}{config.period}</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Billing History
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
