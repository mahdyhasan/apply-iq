import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Edit3, 
  Wand2, 
  Copy, 
  Eye, 
  Download, 
  Save,
  Plus,
  Trash2,
  ArrowLeft,
  Lightbulb,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles
} from "lucide-react";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    portfolio: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications: string[];
}

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMethod, setActiveMethod] = useState<"upload" | "manual" | "template" | "ai" | "jd">("upload");
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [referenceResume, setReferenceResume] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [atsScore, setAtsScore] = useState(75);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      portfolio: ""
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const industries = [
    "Banking & Finance", "Information Technology", "Telecommunications",
    "E-commerce", "Healthcare", "Education", "Manufacturing"
  ];

  const jobRoles = [
    "Software Engineer", "Frontend Developer", "Backend Developer", 
    "Full Stack Developer", "Data Scientist", "Product Manager",
    "UI/UX Designer", "DevOps Engineer", "Business Analyst"
  ];

  const templates = [
    {
      id: "professional_bd",
      name: "Professional Bangladesh",
      category: "Corporate",
      preview: "/templates/professional-bd.png",
      description: "Perfect for banking, finance, and corporate roles in Bangladesh"
    },
    {
      id: "tech_modern",
      name: "Tech Modern",
      category: "Technology",
      preview: "/templates/tech-modern.png", 
      description: "Clean, modern design for software developers and IT professionals"
    },
    {
      id: "creative",
      name: "Creative Professional",
      category: "Design",
      preview: "/templates/creative.png",
      description: "Eye-catching design for creative roles and portfolios"
    },
    {
      id: "executive",
      name: "Executive",
      category: "Management",
      preview: "/templates/executive.png",
      description: "Premium template for senior management and executive positions"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate AI text extraction
      setTimeout(() => {
        setExtractedText(`
JOHN DOE
Software Engineer
Email: john.doe@email.com | Phone: +880 1234567890
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years in web development...

EXPERIENCE
Senior Software Engineer | BRAC Bank | 2022-Present
- Developed and maintained banking applications
- Led a team of 3 developers
- Improved system performance by 40%

Software Developer | Grameenphone | 2020-2022
- Built customer-facing applications
- Implemented REST APIs
- Collaborated with cross-functional teams

EDUCATION
Bachelor of Science in Computer Science
Bangladesh University of Engineering and Technology (BUET) | 2020

SKILLS
JavaScript, React, Node.js, Python, MongoDB, AWS
        `);
        setAtsScore(78);
      }, 2000);
    }
  };

  const handleAIOptimization = () => {
    // Simulate AI optimization
    setAtsScore(prev => Math.min(prev + 15, 95));
  };

  const generateFromJD = () => {
    if (!jobDescription) return;
    
    // Simulate AI generation from JD
    const mockData = {
      personalInfo: {
        fullName: "John Doe",
        email: "john.doe@email.com", 
        phone: "+880 1234567890",
        location: "Dhaka, Bangladesh",
        linkedIn: "linkedin.com/in/johndoe",
        portfolio: "johndoe.dev"
      },
      summary: "Results-driven Software Engineer with 5+ years of experience in developing scalable web applications. Expertise in React, Node.js, and cloud technologies. Proven track record of delivering high-quality solutions in the Bangladesh banking sector.",
      experience: [
        {
          id: "exp1",
          title: "Senior Software Engineer",
          company: "BRAC Bank",
          location: "Dhaka, Bangladesh",
          startDate: "2022-01",
          endDate: "",
          current: true,
          description: "Led development of customer-facing banking applications serving 2M+ users. Implemented microservices architecture resulting in 40% performance improvement."
        }
      ],
      education: [
        {
          id: "edu1",
          degree: "Bachelor of Science in Computer Science",
          institution: "BUET",
          year: "2020",
          gpa: "3.75"
        }
      ],
      skills: ["React", "Node.js", "Python", "AWS", "MongoDB", "TypeScript"],
      projects: [
        {
          id: "proj1",
          name: "Banking Mobile App",
          description: "Developed React Native app for mobile banking with 100K+ downloads",
          technologies: ["React Native", "Node.js", "MongoDB"],
          link: "github.com/johndoe/banking-app"
        }
      ],
      certifications: ["AWS Certified Solutions Architect", "React Professional Certificate"]
    };
    
    setResumeData(mockData);
    setAtsScore(88);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

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
                <h1 className="text-xl font-bold">Resume Builder</h1>
                <p className="text-sm text-gray-600">Create your perfect resume with AI assistance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800">
                ATS Score: {atsScore}%
              </Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Resume Creation Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span>How would you like to create your resume?</span>
            </CardTitle>
            <CardDescription>Choose the method that works best for you</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeMethod} onValueChange={(value: any) => setActiveMethod(value)}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="upload">Upload Existing</TabsTrigger>
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="template">From Template</TabsTrigger>
                <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                <TabsTrigger value="jd">From Job Post</TabsTrigger>
              </TabsList>

              {/* Upload Existing Resume */}
              <TabsContent value="upload" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="h-5 w-5" />
                      <span>Upload Your Existing Resume</span>
                    </CardTitle>
                    <CardDescription>
                      Upload a PDF or DOCX file and our AI will extract and optimize the content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {uploadedFile ? uploadedFile.name : "Drop your resume here or click to browse"}
                      </h3>
                      <p className="text-gray-600 mb-4">Supports PDF, DOC, DOCX files up to 10MB</p>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {extractedText && (
                      <div className="mt-6">
                        <Label>Extracted Content (Editable)</Label>
                        <Textarea
                          value={extractedText}
                          onChange={(e) => setExtractedText(e.target.value)}
                          rows={10}
                          className="mt-2"
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              ATS Score: {atsScore}%
                            </Badge>
                            <Button variant="outline" size="sm" onClick={handleAIOptimization}>
                              <Wand2 className="h-4 w-4 mr-2" />
                              AI Optimize
                            </Button>
                          </div>
                          <Button>
                            Continue with This Content
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Manual Entry */}
              <TabsContent value="manual" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Form Section */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name *</Label>
                            <Input
                              value={resumeData.personalInfo.fullName}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                              }))}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label>Email *</Label>
                            <Input
                              type="email"
                              value={resumeData.personalInfo.email}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, email: e.target.value }
                              }))}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <Label>Phone *</Label>
                            <Input
                              value={resumeData.personalInfo.phone}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, phone: e.target.value }
                              }))}
                              placeholder="+880 1234567890"
                            />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={resumeData.personalInfo.location}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, location: e.target.value }
                              }))}
                              placeholder="Dhaka, Bangladesh"
                            />
                          </div>
                          <div>
                            <Label>LinkedIn</Label>
                            <Input
                              value={resumeData.personalInfo.linkedIn}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                              }))}
                              placeholder="linkedin.com/in/johndoe"
                            />
                          </div>
                          <div>
                            <Label>Portfolio/Website</Label>
                            <Input
                              value={resumeData.personalInfo.portfolio}
                              onChange={(e) => setResumeData(prev => ({
                                ...prev,
                                personalInfo: { ...prev.personalInfo, portfolio: e.target.value }
                              }))}
                              placeholder="johndoe.dev"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Professional Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Summary</CardTitle>
                        <CardDescription>
                          Write a compelling summary of your experience and goals
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={resumeData.summary}
                          onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                          rows={4}
                          placeholder="Results-driven software engineer with 5+ years of experience..."
                        />
                        <Button variant="outline" size="sm" className="mt-2">
                          <Wand2 className="h-4 w-4 mr-2" />
                          AI Improve
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Work Experience */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Work Experience</CardTitle>
                            <CardDescription>Add your professional experience</CardDescription>
                          </div>
                          <Button onClick={addExperience} size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Experience
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {resumeData.experience.map((exp, index) => (
                          <div key={exp.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold">Experience #{index + 1}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label>Job Title *</Label>
                                <Input
                                  value={exp.title}
                                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                  placeholder="Senior Software Engineer"
                                />
                              </div>
                              <div>
                                <Label>Company *</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                  placeholder="BRAC Bank"
                                />
                              </div>
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={exp.location}
                                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                                  placeholder="Dhaka, Bangladesh"
                                />
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                  disabled={exp.current}
                                />
                              </div>
                              <div className="flex items-center space-x-2 pt-6">
                                <input
                                  type="checkbox"
                                  checked={exp.current}
                                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                />
                                <Label>Currently working here</Label>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <Label>Job Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                rows={3}
                                placeholder="• Led development of customer-facing applications&#10;• Improved system performance by 40%&#10;• Managed team of 3 developers"
                              />
                              <Button variant="outline" size="sm" className="mt-2">
                                <Wand2 className="h-4 w-4 mr-2" />
                                AI Enhance
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        {resumeData.experience.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No experience added yet. Click "Add Experience" to get started.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Live Preview */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-white border rounded-lg p-4 text-xs space-y-2">
                          <div className="text-center border-b pb-2">
                            <h3 className="font-bold">{resumeData.personalInfo.fullName || "Your Name"}</h3>
                            <p>{resumeData.personalInfo.email}</p>
                            <p>{resumeData.personalInfo.phone}</p>
                          </div>
                          
                          {resumeData.summary && (
                            <div>
                              <h4 className="font-semibold border-b">SUMMARY</h4>
                              <p>{resumeData.summary.substring(0, 100)}...</p>
                            </div>
                          )}
                          
                          {resumeData.experience.length > 0 && (
                            <div>
                              <h4 className="font-semibold border-b">EXPERIENCE</h4>
                              {resumeData.experience.slice(0, 2).map((exp) => (
                                <div key={exp.id} className="mb-2">
                                  <p className="font-medium">{exp.title}</p>
                                  <p>{exp.company}</p>
                                  <p className="text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ATS Score</span>
                            <Badge className="bg-green-100 text-green-800">{atsScore}%</Badge>
                          </div>
                          <Progress value={atsScore} className="mt-2" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>AI Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Alert>
                          <Lightbulb className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            Add quantifiable achievements to increase impact
                          </AlertDescription>
                        </Alert>
                        <Alert>
                          <Target className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            Include more Bangladesh market keywords
                          </AlertDescription>
                        </Alert>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* From Template */}
              <TabsContent value="template" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Industry Template</CardTitle>
                    <CardDescription>
                      Select a template optimized for your industry and role
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label>Industry</Label>
                        <Select>
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
                        <Label>Target Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target role" />
                          </SelectTrigger>
                          <SelectContent>
                            {jobRoles.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setSelectedTemplate(template.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTemplate === template.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="aspect-[3/4] bg-gray-100 rounded mb-4 flex items-center justify-center">
                            <FileText className="h-16 w-16 text-gray-400" />
                          </div>
                          <h3 className="font-semibold mb-1">{template.name}</h3>
                          <Badge variant="secondary" className="mb-2">{template.category}</Badge>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          
                          {selectedTemplate === template.id && (
                            <Button className="w-full mt-4">
                              Use This Template
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* AI Assistant */}
              <TabsContent value="ai" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Wand2 className="h-5 w-5 text-purple-600" />
                      <span>AI Resume Assistant</span>
                    </CardTitle>
                    <CardDescription>
                      Upload a reference resume and our AI will create a similar one for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Upload Reference Resume</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Upload a resume you like the style of
                        </p>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Reference File
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>Your Content (Text)</Label>
                      <Textarea
                        value={referenceResume}
                        onChange={(e) => setReferenceResume(e.target.value)}
                        rows={8}
                        placeholder="Paste your experience, education, skills here..."
                      />
                    </div>

                    <Button className="w-full" disabled={!referenceResume}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Resume with AI Style
                    </Button>

                    <Alert>
                      <Sparkles className="h-4 w-4" />
                      <AlertDescription>
                        AI will analyze the reference resume's format, style, and structure 
                        to create a similar resume with your content.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* From Job Description */}
              <TabsContent value="jd" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span>Tailored Resume from Job Description</span>
                    </CardTitle>
                    <CardDescription>
                      Paste a job description and we'll create a perfectly tailored resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Job Description</Label>
                      <Textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={10}
                        placeholder="Paste the complete job description here..."
                      />
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={generateFromJD}
                      disabled={!jobDescription}
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Generate Tailored Resume
                    </Button>

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        AI will analyze the job requirements and create a resume that 
                        highlights your most relevant experience and skills.
                      </AlertDescription>
                    </Alert>

                    {resumeData.personalInfo.fullName && (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Resume generated successfully! Your ATS score is {atsScore}%.
                          You can now edit and refine the content.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
