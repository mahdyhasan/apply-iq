import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  FileText, 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  Download,
  Heart,
  Eye,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  posted: string;
  matchScore: number;
  description: string;
  requirements: string[];
  companyRating: number;
  sentiment: "positive" | "negative" | "neutral";
  sentimentReason: string;
  saved: boolean;
  applied: boolean;
  coverLetter?: string;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "applied" | "interview" | "rejected" | "offer";
  notes: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp Inc",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    posted: "2 days ago",
    matchScore: 92,
    description: "We're looking for a senior software engineer to join our growing team...",
    requirements: ["React", "TypeScript", "Node.js", "AWS", "5+ years experience"],
    companyRating: 4.2,
    sentiment: "positive",
    sentimentReason: "Recent funding round, expanding team, great glassdoor reviews",
    saved: false,
    applied: false
  },
  {
    id: "2", 
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$80k - $110k",
    posted: "1 day ago",
    matchScore: 87,
    description: "Join our fast-paced startup building the future of fintech...",
    requirements: ["React", "Python", "PostgreSQL", "Docker", "3+ years experience"],
    companyRating: 3.8,
    sentiment: "neutral",
    sentimentReason: "Mixed reviews about work-life balance, good growth potential",
    saved: true,
    applied: false
  },
  {
    id: "3",
    title: "Frontend Engineer",
    company: "BigTech Corp",
    location: "New York, NY",
    salary: "$140k - $180k",
    posted: "5 days ago",
    matchScore: 78,
    description: "Build user interfaces that millions of users interact with daily...",
    requirements: ["React", "JavaScript", "CSS", "Testing", "4+ years experience"],
    companyRating: 3.2,
    sentiment: "negative",
    sentimentReason: "Recent layoffs, management changes, declining stock price",
    saved: false,
    applied: true
  }
];

const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "3",
    jobTitle: "Frontend Engineer",
    company: "BigTech Corp",
    appliedDate: "2024-01-15",
    status: "interview",
    notes: "Phone screen scheduled for next week"
  },
  {
    id: "2",
    jobId: "4",
    jobTitle: "React Developer",
    company: "MediumCorp",
    appliedDate: "2024-01-10",
    status: "applied",
    notes: "Waiting for response"
  }
];

export default function ResumeAssistant() {
  const [resume, setResume] = useState("");
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [generatingCoverLetter, setGeneratingCoverLetter] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResume(text);
        setActiveTab("jobs");
      };
      reader.readAsText(file);
    }
  };

  const generateCoverLetter = async (job: Job) => {
    setGeneratingCoverLetter(true);
    setSelectedJob(job);
    setShowCoverLetter(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const coverLetter = `Dear ${job.company} Hiring Team,

I am writing to express my strong interest in the ${job.title} position at ${job.company}. With my extensive background in ${job.requirements.slice(0, 3).join(", ")}, I am confident that I would be a valuable addition to your team.

My experience in modern web development, particularly with ${job.requirements[0]} and ${job.requirements[1]}, aligns perfectly with your requirements. In my previous roles, I have successfully delivered scalable applications and worked collaboratively in fast-paced environments.

Key highlights that make me an ideal candidate:
• ${job.requirements[0]} expertise with 5+ years of hands-on experience
• Strong problem-solving skills and attention to detail
• Proven track record of delivering high-quality software solutions
• Excellent communication and teamwork abilities

I am particularly excited about ${job.company}'s mission and would love the opportunity to contribute to your continued success. Thank you for considering my application.

Best regards,
[Your Name]`;
      
      const updatedJobs = jobs.map(j => 
        j.id === job.id ? { ...j, coverLetter } : j
      );
      setJobs(updatedJobs);
      setGeneratingCoverLetter(false);
    }, 2000);
  };

  const toggleSaveJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const applyToJob = (job: Job) => {
    // Update job as applied
    setJobs(jobs.map(j => 
      j.id === job.id ? { ...j, applied: true } : j
    ));
    
    // Add to applications
    const newApplication: Application = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: "applied",
      notes: "Applied via ApplyIQ"
    };
    setApplications([newApplication, ...applications]);
    setActiveTab("tracker");
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative": return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "offer": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume & Job Assistant</h1>
          <p className="text-gray-600">AI-powered job matching and application management</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upload">Resume Upload</TabsTrigger>
            <TabsTrigger value="jobs">Job Matches</TabsTrigger>
            <TabsTrigger value="insights">Company Insights</TabsTrigger>
            <TabsTrigger value="tracker">Application Tracker</TabsTrigger>
          </TabsList>

          {/* Resume Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Upload Your Resume</span>
                </CardTitle>
                <CardDescription>
                  Upload your resume file or paste the content below for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Drop your resume here</p>
                    <p className="text-gray-500">or click to browse files</p>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume-text">Or paste your resume content</Label>
                  <Textarea
                    id="resume-text"
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>

                {resume && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Resume content loaded! Switch to Job Matches tab to see AI-powered recommendations.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                  </Button>
                  <Button 
                    onClick={() => setActiveTab("jobs")} 
                    disabled={!resume}
                  >
                    Analyze & Find Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Matches Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>AI Job Matches</span>
                </CardTitle>
                <CardDescription>
                  Jobs matched to your resume with AI-powered relevance scoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold">{job.title}</h3>
                              <Badge className={`${getMatchColor(job.matchScore)} border-0`}>
                                {job.matchScore}% Match
                              </Badge>
                              {job.applied && (
                                <Badge variant="secondary">Applied</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{job.posted}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.requirements.map((req, idx) => (
                                <Badge key={idx} variant="outline">{req}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSaveJob(job.id)}
                            >
                              <Heart className={`h-4 w-4 mr-2 ${job.saved ? 'fill-red-500 text-red-500' : ''}`} />
                              {job.saved ? 'Saved' : 'Save'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateCoverLetter(job)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              Generate Cover Letter
                            </Button>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Job
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => applyToJob(job)}
                              disabled={job.applied}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {job.applied ? 'Applied' : 'Apply Now'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Company Insights</span>
                </CardTitle>
                <CardDescription>
                  AI-powered company analysis and sentiment tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{job.company}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm">{job.companyRating}/5.0</span>
                            </div>
                            {getSentimentIcon(job.sentiment)}
                          </div>
                          <p className="text-gray-600 mb-3">{job.sentimentReason}</p>
                          <div className="flex items-center space-x-4">
                            <Badge variant={job.sentiment === "positive" ? "default" : 
                                           job.sentiment === "negative" ? "destructive" : "secondary"}>
                              {job.sentiment.charAt(0).toUpperCase() + job.sentiment.slice(1)} Sentiment
                            </Badge>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Full Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Tracker Tab */}
          <TabsContent value="tracker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Application Tracker</span>
                </CardTitle>
                <CardDescription>
                  Track your job applications and interview progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{app.jobTitle}</h3>
                            <Badge className={getStatusColor(app.status)}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-gray-600 mb-2">
                            <span>{app.company}</span>
                            <span>Applied: {app.appliedDate}</span>
                          </div>
                          <p className="text-gray-700">{app.notes}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Cover Letter Modal */}
      {showCoverLetter && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Cover Letter for {selectedJob.title}</CardTitle>
              <CardDescription>{selectedJob.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatingCoverLetter ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Generating personalized cover letter...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    value={selectedJob.coverLetter}
                    onChange={(e) => {
                      const updatedJobs = jobs.map(j => 
                        j.id === selectedJob.id ? { ...j, coverLetter: e.target.value } : j
                      );
                      setJobs(updatedJobs);
                      setSelectedJob({ ...selectedJob, coverLetter: e.target.value });
                    }}
                    className="min-h-[300px]"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setShowCoverLetter(false)}>
                      Close
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={() => applyToJob(selectedJob)}>
                        <Send className="h-4 w-4 mr-2" />
                        Apply with Cover Letter
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
