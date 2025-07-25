import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function TestDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-login for testing
    const testUser = {
      email: "user@applyiq.com",
      role: "user",
      plan: "bundle",
      name: "John Doe"
    };
    localStorage.setItem("user", JSON.stringify(testUser));
    
    // Redirect to dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return <Dashboard />;
}
