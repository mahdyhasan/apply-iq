import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, FileText, Presentation, LogOut, User, Settings } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

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
              <Badge variant="secondary">{user.plan?.charAt(0).toUpperCase() + user.plan?.slice(1)} Plan</Badge>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ApplyIQ</h1>
          <p className="text-gray-600">Your AI-powered career and learning assistant</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resume Assistant */}
          {(user.plan === "resume" || user.plan === "bundle") && (
            <Card className="border-2 border-blue-100 hover:border-primary transition-colors cursor-pointer">
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
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚧</div>
                    <h3 className="text-lg font-semibold mb-2">Coming in Phase 3!</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      This dashboard will include resume upload, job matching, 
                      company insights, and cover letter generation.
                    </p>
                    <Button variant="outline" disabled>
                      Access Resume Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Generator */}
          {(user.plan === "notes" || user.plan === "bundle") && (
            <Card className="border-2 border-blue-100 hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Presentation className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">Notes & Slide Generator</CardTitle>
                    <CardDescription>AI-powered content creation for educators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🚧</div>
                    <h3 className="text-lg font-semibold mb-2">Coming in Phase 4!</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      This dashboard will include topic input, AI-generated notes, 
                      MCQs, slide decks, and export options.
                    </p>
                    <Button variant="outline" disabled>
                      Access Educator Tools
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Account Settings */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-primary" />
              <CardTitle>Account Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Current Plan</p>
                <p className="text-lg font-semibold text-primary">
                  {user.plan?.charAt(0).toUpperCase() + user.plan?.slice(1)} Plan
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Member Since</p>
                <p className="text-lg">Today</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button variant="outline">Upgrade Plan</Button>
              <Button variant="outline">Billing Settings</Button>
            </div>
          </CardContent>
        </Card>

        {/* Development Progress */}
        <Card className="mt-8 border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Development Progress</CardTitle>
            <CardDescription>Track the implementation phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Phase 1: Architecture & Tech Stack ✅</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Phase 2: Landing Page & Auth ✅</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Phase 3: Resume Assistant Dashboard (Next)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span>Phase 4: Educator Tools Dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <span>Phase 5: Admin Dashboard</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
