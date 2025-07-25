import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BrainCircuit, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentication with default credentials
    if (email === "user@applyiq.com" && password === "user123") {
      localStorage.setItem("user", JSON.stringify({ email, role: "user" }));
      navigate("/dashboard");
    } else if (email === "admin@applyiq.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      navigate("/admin");
    } else {
      setError("Invalid email or password. Try user@applyiq.com/user123 or admin@applyiq.com/admin123");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
        </div>

        <Card className="border-2 border-blue-100">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your ApplyIQ account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@applyiq.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Demo Credentials</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p><strong>User Account:</strong></p>
                  <p>Email: user@applyiq.com</p>
                  <p>Password: user123</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p><strong>Admin Account:</strong></p>
                  <p>Email: admin@applyiq.com</p>
                  <p>Password: admin123</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-gray-600 hover:text-primary">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
