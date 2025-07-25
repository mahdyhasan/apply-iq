import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, FileText, Presentation, Users, CheckCircle, Star, ArrowRight, Menu, X } from "lucide-react";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">ApplyIQ</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
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
                <Button asChild className="w-fit">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-primary border-blue-200">
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Your AI-Powered
            <span className="text-primary block">Career & Learning</span>
            Assistant
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ApplyIQ combines cutting-edge AI to help job seekers land their dream jobs and educators create engaging learning materials. Two powerful tools, one intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Two Powerful AI Services</h2>
            <p className="text-xl text-gray-600">Designed for job seekers and educators alike</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Resume Assistant */}
            <Card className="border-2 border-blue-100 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">AI Resume & Job Assistant</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Smart job matching, company insights, and personalized cover letters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI-powered resume analysis & optimization</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Daily job scraping from top platforms</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Smart job matching with relevance scores</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Company reputation analysis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Custom cover letter generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Application tracking dashboard</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Educator Tools */}
            <Card className="border-2 border-blue-100 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <Presentation className="h-8 w-8 text-primary" />
                  <CardTitle className="text-2xl">AI Notes & Slide Generator</CardTitle>
                </div>
                <CardDescription className="text-lg">
                  Intelligent content creation for teachers and coaching centers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI-generated class notes in multiple tones</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Automatic MCQ creation with answer keys</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Professional slide deck generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Multiple export formats (PDF, DOC, PPT)</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Content library with reusable materials</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Customizable tone: exam-focused, conceptual, interactive</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Resume Assistant Plan */}
            <Card className="border-2 border-gray-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Resume Assistant</CardTitle>
                <CardDescription>Perfect for job seekers</CardDescription>
                <div className="text-4xl font-bold text-primary">$9<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited resume analysis</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Daily job matching</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>50 cover letters/month</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Company insights</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/signup?plan=resume">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Bundle Plan */}
            <Card className="border-2 border-primary shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Complete Bundle</CardTitle>
                <CardDescription>Best value for professionals</CardDescription>
                <div className="text-4xl font-bold text-primary">$15<span className="text-lg text-gray-600">/month</span></div>
                <div className="text-sm text-green-600">Save $6/month</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Everything in Resume Assistant</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Everything in Notes Generator</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/signup?plan=bundle">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notes Generator Plan */}
            <Card className="border-2 border-gray-200 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Notes Generator</CardTitle>
                <CardDescription>Ideal for educators</CardDescription>
                <div className="text-4xl font-bold text-primary">$12<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited notes generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>MCQ creation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Slide deck generation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>All export formats</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/signup?plan=notes">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Trusted by Professionals Worldwide</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"ApplyIQ helped me land my dream job in just 2 weeks. The AI matching is incredibly accurate!"</p>
              <p className="font-semibold">- Sarah Chen, Software Engineer</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"As a teacher, the notes generator saves me hours every week. The quality is outstanding!"</p>
              <p className="font-semibold">- Mark Johnson, High School Teacher</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4">"The company insights feature helped me avoid a toxic workplace. Invaluable tool!"</p>
              <p className="font-semibold">- Emily Rodriguez, Marketing Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Supercharge Your Career or Teaching?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of professionals already using ApplyIQ</p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link to="/signup">
              Start Your Free Trial Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ApplyIQ</span>
              </div>
              <p className="text-gray-400">Empowering careers and education with AI intelligence.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Assistant</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Notes Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ApplyIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
