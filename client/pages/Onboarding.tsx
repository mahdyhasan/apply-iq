import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  User,
  Phone,
  Mail,
  Building,
  Target,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Star,
  Crown,
  Zap,
  FileText,
  TrendingUp
} from "lucide-react";

interface OnboardingData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  
  // Professional Info
  currentRole: string;
  currentCompany: string;
  industry: string;
  experienceLevel: string;
  
  // Goals
  careerGoal: string;
  targetRole: string;
  targetIndustry: string;
  
  // Package Selection
  selectedPackage: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    fullName: "",
    email: "",
    phone: "",
    currentRole: "",
    currentCompany: "",
    industry: "",
    experienceLevel: "",
    careerGoal: "",
    targetRole: "",
    targetIndustry: "",
    selectedPackage: "free"
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const industries = [
    "Banking & Finance", "Information Technology", "Telecommunications", 
    "E-commerce", "Healthcare", "Education", "Manufacturing", 
    "Retail", "Consulting", "Government", "NGO", "Startup"
  ];

  const careerGoals = [
    { id: "switch_role", label: "Switch to a different role", icon: Target },
    { id: "switch_industry", label: "Change industry", icon: Building },
    { id: "get_promoted", label: "Get promoted in current company", icon: TrendingUp },
    { id: "salary_increase", label: "Increase salary significantly", icon: DollarSign },
    { id: "remote_work", label: "Find remote work opportunities", icon: Globe },
    { id: "skill_upgrade", label: "Upgrade technical skills", icon: Zap },
  ];

  const packages = [
    {
      id: "free",
      name: "Free",
      price: "৳0",
      period: "Forever",
      features: ["1 Resume", "3 Revisions", "PDF Download (Watermarked)"],
      badge: null,
      color: "border-gray-200"
    },
    {
      id: "starter",
      name: "Starter",
      price: "৳200",
      period: "/month",
      features: ["1 Resume", "10 Revisions", "PDF + DOCX", "3 Job Matches"],
      badge: "Popular",
      color: "border-blue-500 ring-2 ring-blue-200"
    },
    {
      id: "premium",
      name: "Premium",
      price: "৳500",
      period: "/month",
      features: ["5 Resume Variations", "10 Revisions Each", "Unlimited Job Matches", "24h Refresh"],
      badge: "Best Value",
      color: "border-purple-500 ring-2 ring-purple-200"
    }
  ];

  const updateData = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Save user data
    const userData = {
      ...data,
      plan: data.selectedPackage,
      role: "user",
      onboardingCompleted: true
    };
    
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Let's start with your basic details</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={data.fullName}
                    onChange={(e) => updateData("fullName", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={data.email}
                    onChange={(e) => updateData("email", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+880 1XXX-XXXXXX"
                    value={data.phone}
                    onChange={(e) => updateData("phone", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Background</h2>
              <p className="text-gray-600">Tell us about your current work situation</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentRole">Current Role/Position</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentRole"
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    value={data.currentRole}
                    onChange={(e) => updateData("currentRole", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currentCompany">Current Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentCompany"
                    placeholder="e.g., BRAC Bank, Grameenphone"
                    value={data.currentCompany}
                    onChange={(e) => updateData("currentCompany", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Industry</Label>
                <Select value={data.industry} onValueChange={(value) => updateData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Experience Level</Label>
                <RadioGroup
                  value={data.experienceLevel}
                  onValueChange={(value) => updateData("experienceLevel", value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entry" id="entry" />
                    <Label htmlFor="entry">Entry Level (0-2 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mid" id="mid" />
                    <Label htmlFor="mid">Mid Level (3-5 years)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior">Senior Level (6+ years)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Career Goals</h2>
              <p className="text-gray-600">What do you want to achieve with your career?</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Primary Career Goal</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {careerGoals.map((goal) => (
                    <div
                      key={goal.id}
                      onClick={() => updateData("careerGoal", goal.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        data.careerGoal === goal.id
                          ? "border-blue-500 bg-blue-50 text-blue-900"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <goal.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{goal.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="targetRole">Target Role (Optional)</Label>
                <Input
                  id="targetRole"
                  placeholder="e.g., Senior Software Engineer, Product Manager"
                  value={data.targetRole}
                  onChange={(e) => updateData("targetRole", e.target.value)}
                />
              </div>

              <div>
                <Label>Target Industry (Optional)</Label>
                <Select value={data.targetIndustry} onValueChange={(value) => updateData("targetIndustry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the plan that best fits your needs</p>
            </div>
            
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => updateData("selectedPackage", pkg.id)}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    data.selectedPackage === pkg.id ? pkg.color : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {pkg.badge && (
                    <Badge className="absolute -top-2 left-4 bg-blue-600 text-white">
                      {pkg.badge}
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-blue-600">
                          {pkg.price}<span className="text-sm text-gray-500">{pkg.period}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {data.selectedPackage === pkg.id && (
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> You can upgrade or downgrade your plan anytime from your dashboard settings. 
                Start with Free to explore, then upgrade when you need more features!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.fullName && data.email && data.phone;
      case 2:
        return data.currentRole && data.industry && data.experienceLevel;
      case 3:
        return data.careerGoal;
      case 4:
        return data.selectedPackage;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ApplyIQ!</h1>
          <p className="text-gray-600">Let's set up your profile to create amazing resumes</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content */}
        <Card className="border-2 border-blue-100">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep === totalSteps ? (
            <Button
              onClick={completeOnboarding}
              disabled={!isStepValid()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Complete Setup</span>
              <CheckCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Skip Option */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Skip onboarding (you can complete this later)
          </button>
        </div>
      </div>
    </div>
  );
}
