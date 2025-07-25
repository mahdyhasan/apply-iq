import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Users, Settings, LogOut, Shield, BarChart3, Database } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "admin") {
        navigate("/dashboard");
      } else {
        setUser(parsedUser);
      }
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
              <Badge variant="destructive" className="bg-red-600">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.email}</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage ApplyIQ platform and users</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-600">1 user + 1 admin</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-600">1 bundle plan</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Jobs Scraped</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-600">Coming in Phase 3</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">AI API Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-600">Coming in Phase 3+</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Management */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage registered users</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-lg font-semibold mb-2">Coming in Phase 5!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  View all users, their plans, usage history, and send system updates.
                </p>
                <Button variant="outline" disabled>
                  Manage Users
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Analytics */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>System Analytics</CardTitle>
                  <CardDescription>Platform usage and performance metrics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Coming in Phase 5!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Monitor job scraping, AI usage, token consumption, and system logs.
                </p>
                <Button variant="outline" disabled>
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Platform Settings */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Settings className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure job boards and AI settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-lg font-semibold mb-2">Coming in Phase 5!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Add/remove job boards, configure news sources, and manage AI prompts.
                </p>
                <Button variant="outline" disabled>
                  Platform Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Database Management */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Database className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Database Management</CardTitle>
                  <CardDescription>Monitor system health and data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-lg font-semibold mb-2">Coming in Phase 5!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  View system logs, backup data, and monitor platform health.
                </p>
                <Button variant="outline" disabled>
                  Database Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development Progress */}
        <Card className="mt-8 border-2 border-green-100">
          <CardHeader>
            <CardTitle className="text-green-800">Development Progress</CardTitle>
            <CardDescription>Current implementation status</CardDescription>
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
                <span>Phase 5: Admin Dashboard Implementation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
