import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Target, 
  Eye, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles,
  Users,
  Shield,
  Award,
  Building,
  TrendingUp,
  Search,
  Briefcase,
  Globe,
  Clock,
  Zap
} from "lucide-react";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: Upload,
      title: "Smart Resume Enhancement",
      description: "Upload your existing resume and let AI transform it with industry keywords and ATS optimization for Bangladesh job market",
      image: "📄➡️✨"
    },
    {
      icon: Target,
      title: "Job Matching Algorithm",
      description: "Get personalized job recommendations from BDJobs, LinkedIn, and Google Jobs with AI-calculated match scores",
      image: "🎯📊💼"
    },
    {
      icon: Eye,
      title: "Company Intelligence",
      description: "Research Bangladeshi company culture, salary insights, and employee reviews before you apply",
      image: "🏢📈🔍"
    }
  ];

  const testimonials = [
    {
      name: "Rafiq Ahmed",
      role: "Software Engineer at BRAC Bank",
      image: "👨‍💻",
      quote: "Got 3 interview calls within a week of using ApplyIQ. The AI suggestions were spot-on for Bangladesh market!"
    },
    {
      name: "Fatima Khan",
      role: "Marketing Manager at Grameenphone",
      image: "👩‍💼",
      quote: "The company insights helped me avoid a toxic workplace. Best investment I made for my career in Dhaka!"
    },
    {
      name: "Siam Rahman",
      role: "Fresh Graduate, NSU",
      image: "🎓",
      quote: "As a fresh graduate, this platform gave me confidence to apply for senior positions. Landed my dream job in IT!"
    }
  ];

  const stats = [
    { number: "25,000+", label: "Resumes Enhanced" },
    { number: "15,000+", label: "Job Matches Found" },
    { number: "87%", label: "Success Rate" },
    { number: "500+", label: "BD Companies Analyzed" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ApplyIQ</h1>
                <p className="text-xs text-gray-500">For Bangladesh</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
              <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transform hover:scale-105 transition-all">
                <Link to="/signup">Start Free Trial</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-blue-100 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
                <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
                <Button asChild className="w-fit bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Free for 7 Days • No Credit Card Required</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Land Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dream Job</span> in Bangladesh
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AI-powered resume builder, job matcher, and company insights platform designed specifically for Bangladeshi professionals. Get hired faster with smarter applications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  <Link to="/signup">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Building Resume
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 transition-all">
                  <Link to="/demo">
                    <Eye className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>25,000+ Users</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>87% Success Rate</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Resume Enhanced!</p>
                    <p className="text-sm text-gray-500">ATS Score: 94/100</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-blue-900">Software Engineer - BRAC Bank</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">97% Match</span>
                    </div>
                    <p className="text-xs text-blue-700">Salary: ৳60,000 - ৳80,000 • Posted 2 days ago</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-purple-900">Product Manager - Pathao</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">85% Match</span>
                    </div>
                    <p className="text-xs text-purple-700">Salary: ৳70,000 - ৳90,000 • Posted 1 day ago</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-900">Data Analyst - Grameenphone</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">92% Match</span>
                    </div>
                    <p className="text-xs text-green-700">Salary: ৳50,000 - ৳70,000 • Posted 3 hours ago</p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                ✨ AI Enhanced
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                🎯 Perfect Match
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Get <span className="text-blue-600">Hired</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines resume optimization, job matching, and company research to give you an unfair advantage in the Bangladeshi job market.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all transform hover:scale-105">
                <div className="text-4xl mb-6">{feature.image}</div>
                <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Get Hired in <span className="text-blue-600">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upload or Build Resume</h3>
              <p className="text-gray-600">Upload your existing resume or build one from scratch. Our AI will optimize it for ATS systems and Bangladesh job market keywords.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Matched Jobs</h3>
              <p className="text-gray-600">Receive personalized job recommendations from BDJobs, LinkedIn, and Google Jobs with AI-calculated match scores for Bangladesh.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research & Apply</h3>
              <p className="text-gray-600">Get Bangladeshi company insights, salary information, and culture analysis before applying to make informed decisions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Success Stories from <span className="text-blue-600">Bangladesh</span>
            </h2>
            <p className="text-xl text-gray-600">Join thousands of Bangladeshi professionals who transformed their careers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Free Trial */}
            <Card className="border-2 border-gray-200 rounded-2xl p-6">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Free Trial</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-2">৳0</div>
                <p className="text-gray-600">7 days • All features</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Resume Builder</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>3 AI Revisions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Job Matching</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Company Insights</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup?plan=free">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Basic Plan */}
            <Card className="border-2 border-gray-200 rounded-2xl p-6">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Basic</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-2">৳200</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Resume Builder</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Unlimited AI Revisions</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>2 Premium Templates</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup?plan=basic">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="border-2 border-blue-500 rounded-2xl p-6 relative bg-blue-50">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
                Most Popular
              </Badge>
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Standard</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-2">৳500</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Job Scraper (1 Month)</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Company Insights</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Job Alerts</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-105 transition-all" asChild>
                  <Link to="/signup?plan=standard">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-gray-200 rounded-2xl p-6">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">Premium</CardTitle>
                <div className="text-4xl font-bold text-gray-900 my-2">৳1000</div>
                <p className="text-gray-600">per month</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Everything in Standard</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Auto Alerts</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Cover Letter Generator</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>Company Comparisons</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/signup?plan=premium">Go Premium</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 25,000+ Bangladeshi professionals who found their dream jobs using our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-lg text-gray-900 w-full"
            />
            <Button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center whitespace-nowrap" asChild>
              <Link to="/signup">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ApplyIQ</span>
              </div>
              <p className="text-gray-400">
                AI-powered career platform designed specifically for Bangladeshi professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Job Matching</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Company Insights</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Tips</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@applyiq.bd</li>
                <li>+880 1XXX-XXXXXX</li>
                <li>Dhaka, Bangladesh</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ApplyIQ. All rights reserved. Made with ❤️ for Bangladesh.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
