import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Users, Settings, LogOut, Shield, BarChart, Database } from "lucide-react";

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

        <Card className="border-2 border-green-100">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">🎉 Admin Dashboard is Ready!</h2>
            <p className="text-gray-600 mb-6">
              Access the full-featured admin dashboard with user management, analytics,
              system monitoring, and platform configuration.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/admin-dashboard">
                <Shield className="h-5 w-5 mr-2" />
                Access Full Admin Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>

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
