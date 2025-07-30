import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ArrowLeft,
  Check,
  Crown,
  CreditCard,
  Star,
  Zap,
  Target,
  Building,
  Smartphone,
  Banknote,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Globe,
  Users,
  TrendingUp,
  Award
} from "lucide-react";

interface Package {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  popular?: boolean;
  recommended?: boolean;
  features: string[];
  limits: {
    resumes: number;
    revisions: number;
    jobMatches: number;
    aiFeatures: string[];
  };
  badge?: string;
  color: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  processingTime: string;
  fees: string;
  popular?: boolean;
}

export default function PackageUpgrade() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string>("starter");
  const [selectedPayment, setSelectedPayment] = useState<string>("bkash");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currentStep, setCurrentStep] = useState<"packages" | "payment" | "confirmation">("packages");
  const [isProcessing, setIsProcessing] = useState(false);

  const packages: Package[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "Forever",
      description: "Perfect for trying out our resume builder",
      features: [
        "1 Resume creation",
        "3 Total revisions",
        "Basic AI suggestions",
        "PDF download (watermarked)",
        "Community support"
      ],
      limits: {
        resumes: 1,
        revisions: 3,
        jobMatches: 0,
        aiFeatures: ["Basic optimization"]
      },
      color: "border-gray-300 bg-gray-50"
    },
    {
      id: "starter",
      name: "Starter",
      price: billingCycle === "monthly" ? 200 : 2000,
      originalPrice: billingCycle === "yearly" ? 2400 : undefined,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Great for active job seekers",
      popular: true,
      features: [
        "1 Resume with unlimited edits",
        "10 Revisions per month",
        "3 Job matches daily",
        "PDF + DOCX downloads",
        "Email support",
        "ATS optimization",
        "Industry templates"
      ],
      limits: {
        resumes: 1,
        revisions: 10,
        jobMatches: 3,
        aiFeatures: ["ATS optimization", "Content suggestions"]
      },
      badge: "Most Popular",
      color: "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
    },
    {
      id: "premium",
      name: "Premium",
      price: billingCycle === "monthly" ? 500 : 5000,
      originalPrice: billingCycle === "yearly" ? 6000 : undefined,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "For serious professionals",
      recommended: true,
      features: [
        "5 Resume variations",
        "10 Revisions per resume",
        "Unlimited job matches",
        "24-hour job refresh",
        "Priority support",
        "Advanced AI features",
        "Cover letter generation",
        "Interview preparation tips"
      ],
      limits: {
        resumes: 5,
        revisions: 10,
        jobMatches: -1,
        aiFeatures: ["Advanced optimization", "JD matching", "Style replication"]
      },
      badge: "Best Value",
      color: "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
    },
    {
      id: "elite",
      name: "Elite",
      price: billingCycle === "monthly" ? 800 : 8000,
      originalPrice: billingCycle === "yearly" ? 9600 : undefined,
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Everything + company insights",
      features: [
        "Everything in Premium",
        "Company culture analysis",
        "Salary benchmarking",
        "Industry trend reports",
        "Personal career coach",
        "LinkedIn optimization",
        "Phone support",
        "Custom templates"
      ],
      limits: {
        resumes: 5,
        revisions: 15,
        jobMatches: -1,
        aiFeatures: ["All AI features", "Company analysis", "Career coaching"]
      },
      badge: "Coming Soon",
      color: "border-orange-500 bg-orange-50 ring-2 ring-orange-200"
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "bkash",
      name: "bKash",
      icon: Smartphone,
      description: "Mobile payment - Most convenient for Bangladesh users",
      processingTime: "Instant",
      fees: "No additional fees",
      popular: true
    },
    {
      id: "nagad",
      name: "Nagad",
      icon: Smartphone,
      description: "Digital wallet payment",
      processingTime: "Instant",
      fees: "No additional fees"
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, MasterCard, or local bank cards",
      processingTime: "Instant",
      fees: "2.9% processing fee"
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: Banknote,
      description: "Direct bank transfer (Manual verification required)",
      processingTime: "1-2 business days",
      fees: "No additional fees"
    }
  ];

  const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedPayment);

  const calculateSavings = (pkg: Package) => {
    if (billingCycle === "yearly" && pkg.originalPrice) {
      const savings = pkg.originalPrice - pkg.price;
      const percentage = Math.round((savings / pkg.originalPrice) * 100);
      return { amount: savings, percentage };
    }
    return null;
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleContinueToPayment = () => {
    setCurrentStep("payment");
  };

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update user's plan in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      user.plan = selectedPackage;
      user.planPurchaseDate = new Date().toISOString();
      user.billingCycle = billingCycle;
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    setIsProcessing(false);
    setCurrentStep("confirmation");
  };

  const renderPackages = () => (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              billingCycle === "yearly"
                ? "bg-white text-gray-900 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly
            <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Package Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => {
          const savings = calculateSavings(pkg);
          const isSelected = selectedPackage === pkg.id;
          
          return (
            <Card
              key={pkg.id}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? pkg.color : "hover:border-gray-300"
              } ${pkg.id === "elite" ? "opacity-75" : ""}`}
              onClick={() => pkg.id !== "elite" && handlePackageSelect(pkg.id)}
            >
              {pkg.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  {pkg.badge}
                </Badge>
              )}
              
              {pkg.id === "elite" && (
                <div className="absolute inset-0 bg-gray-900/10 rounded-lg flex items-center justify-center">
                  <Badge className="bg-orange-600 text-white">Coming Soon</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  {pkg.id === "free" && <Zap className="h-5 w-5 text-gray-600" />}
                  {pkg.id === "starter" && <Target className="h-5 w-5 text-blue-600" />}
                  {pkg.id === "premium" && <Crown className="h-5 w-5 text-purple-600" />}
                  {pkg.id === "elite" && <Award className="h-5 w-5 text-orange-600" />}
                  <span>{pkg.name}</span>
                </CardTitle>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    ৳{pkg.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">{pkg.period}</span>
                  </div>
                  
                  {savings && (
                    <div className="text-sm text-green-600">
                      Save ৳{savings.amount.toLocaleString()} ({savings.percentage}% off)
                    </div>
                  )}
                  
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {isSelected && pkg.id !== "elite" && (
                  <div className="pt-4">
                    <CheckCircle className="h-6 w-6 text-blue-600 mx-auto" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center space-y-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>30-day money-back guarantee.</strong> Cancel anytime, no questions asked.
          </AlertDescription>
        </Alert>

        <Button 
          onClick={handleContinueToPayment}
          disabled={!selectedPackage || selectedPackage === "elite"}
          size="lg"
          className="px-8"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">{selectedPkg?.name} Plan</h3>
              <p className="text-sm text-gray-600">{selectedPkg?.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">৳{selectedPkg?.price.toLocaleString()}</div>
              <div className="text-sm text-gray-600">{selectedPkg?.period}</div>
            </div>
          </div>
          
          {billingCycle === "yearly" && selectedPkg?.originalPrice && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-800">Annual discount (20% off)</span>
                <span className="text-green-800 font-medium">
                  -৳{(selectedPkg.originalPrice - selectedPkg.price).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex items-center space-x-3 flex-1">
                    <method.icon className="h-6 w-6 text-gray-600" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={method.id} className="font-medium">
                          {method.name}
                        </Label>
                        {method.popular && (
                          <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>⚡ {method.processingTime}</span>
                        <span>💰 {method.fees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Payment Form */}
      {selectedPayment === "card" && (
        <Card>
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div>
                <Label>Cardholder Name</Label>
                <Input placeholder="John Doe" />
              </div>
              <div>
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input placeholder="123" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPayment === "bkash" && (
        <Card>
          <CardHeader>
            <CardTitle>bKash Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  You will be redirected to bKash to complete your payment securely.
                </AlertDescription>
              </Alert>
              <div>
                <Label>bKash Account Number</Label>
                <Input placeholder="01XXXXXXXXX" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrentStep("packages")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Packages
        </Button>
        
        <Button onClick={handleProcessPayment} disabled={isProcessing} size="lg">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ৳{selectedPkg?.price.toLocaleString()}
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful! 🎉</h1>
        <p className="text-lg text-gray-600">
          Welcome to {selectedPkg?.name}! Your account has been upgraded.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Plan</span>
              <span className="font-semibold">{selectedPkg?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Amount Paid</span>
              <span className="font-semibold">৳{selectedPkg?.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Payment Method</span>
              <span className="font-semibold">{selectedPaymentMethod?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Next Billing Date</span>
              <span className="font-semibold">
                {new Date(Date.now() + (billingCycle === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">What's Next?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="font-medium">Create Resumes</p>
            <p className="text-gray-600">Start building your professional resume</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="font-medium">Find Jobs</p>
            <p className="text-gray-600">Get personalized job matches</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="font-medium">AI Optimize</p>
            <p className="text-gray-600">Enhance with AI suggestions</p>
          </div>
        </div>
      </div>

      <Button onClick={() => navigate("/dashboard")} size="lg">
        Go to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold">Upgrade Your Plan</h1>
                <p className="text-sm text-gray-600">Choose the perfect plan for your career goals</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${
              currentStep === "packages" ? "text-blue-600" : 
              currentStep !== "packages" ? "text-green-600" : "text-gray-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "packages" ? "bg-blue-600 text-white" :
                currentStep !== "packages" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                1
              </div>
              <span className="font-medium">Choose Plan</span>
            </div>
            
            <div className={`w-16 h-0.5 ${
              currentStep !== "packages" ? "bg-green-600" : "bg-gray-200"
            }`}></div>
            
            <div className={`flex items-center space-x-2 ${
              currentStep === "payment" ? "text-blue-600" : 
              currentStep === "confirmation" ? "text-green-600" : "text-gray-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "payment" ? "bg-blue-600 text-white" :
                currentStep === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
            
            <div className={`w-16 h-0.5 ${
              currentStep === "confirmation" ? "bg-green-600" : "bg-gray-200"
            }`}></div>
            
            <div className={`flex items-center space-x-2 ${
              currentStep === "confirmation" ? "text-green-600" : "text-gray-400"
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "confirmation" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                3
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Content */}
        {currentStep === "packages" && renderPackages()}
        {currentStep === "payment" && renderPayment()}
        {currentStep === "confirmation" && renderConfirmation()}
      </div>
    </div>
  );
}
