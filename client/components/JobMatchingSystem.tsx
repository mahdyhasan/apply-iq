import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Search,
  MapPin,
  Building,
  DollarSign,
  Clock,
  Star,
  ExternalLink,
  Filter,
  RefreshCw,
  Heart,
  Eye,
  TrendingUp,
  ArrowUp,
  Lock,
  Calendar,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  posted: string;
  deadline?: string;
  match: number;
  description: string;
  requirements: string[];
  benefits: string[];
  applyUrl: string;
  source: "BDJobs" | "LinkedIn" | "Company" | "Others";
  featured?: boolean;
}

interface JobMatchingProps {
  userPlan: "free" | "starter" | "premium" | "elite";
  onUpgrade: () => void;
}

export default function JobMatchingSystem({
  userPlan,
  onUpgrade,
}: JobMatchingProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [canRefresh, setCanRefresh] = useState(true);

  // Package limitations
  const packageLimits = {
    free: { jobs: 0, refresh: false, filters: false },
    starter: { jobs: 3, refresh: false, filters: true },
    premium: { jobs: -1, refresh: true, filters: true },
    elite: { jobs: -1, refresh: true, filters: true },
  };

  const currentLimit = packageLimits[userPlan];

  // Demo job data
  const allJobs: Job[] = [
    {
      id: "job_001",
      title: "Senior Software Engineer",
      company: "BRAC Bank",
      location: "Dhaka",
      salary: "৳80,000-120,000",
      type: "Full-time",
      experience: "4-6 years",
      posted: "2 hours ago",
      deadline: "Jan 30, 2024",
      match: 95,
      description:
        "Join our digital banking team to build next-generation financial applications using React, Node.js, and cloud technologies.",
      requirements: [
        "5+ years experience",
        "React/Node.js expertise",
        "Banking domain knowledge",
      ],
      benefits: ["Health insurance", "Performance bonus", "Flexible hours"],
      applyUrl: "https://bdjobs.com/brac-bank-software-engineer",
      source: "BDJobs",
      featured: true,
    },
    {
      id: "job_002",
      title: "Frontend Developer",
      company: "Grameenphone",
      location: "Dhaka",
      salary: "৳60,000-90,000",
      type: "Full-time",
      experience: "2-4 years",
      posted: "5 hours ago",
      match: 88,
      description:
        "Build user-facing applications for millions of customers using modern React and TypeScript.",
      requirements: [
        "3+ years React",
        "TypeScript proficiency",
        "Mobile-first development",
      ],
      benefits: ["International exposure", "Learning budget", "Modern office"],
      applyUrl: "https://linkedin.com/jobs/grameenphone-frontend",
      source: "LinkedIn",
    },
    {
      id: "job_003",
      title: "Full Stack Developer",
      company: "Pathao",
      location: "Dhaka",
      salary: "৳70,000-100,000",
      type: "Full-time",
      experience: "3-5 years",
      posted: "1 day ago",
      match: 85,
      description:
        "Help scale our logistics platform serving millions across Bangladesh.",
      requirements: [
        "Full-stack experience",
        "React/Node.js",
        "Database optimization",
      ],
      benefits: [
        "Equity participation",
        "Startup culture",
        "Growth opportunities",
      ],
      applyUrl: "https://pathao.com/careers/fullstack-developer",
      source: "Company",
    },
    {
      id: "job_004",
      title: "React Developer",
      company: "Daraz Bangladesh",
      location: "Dhaka",
      salary: "৳50,000-75,000",
      type: "Full-time",
      experience: "2-4 years",
      posted: "2 days ago",
      match: 82,
      description:
        "Build e-commerce experiences for Bangladesh's leading online marketplace.",
      requirements: [
        "React expertise",
        "E-commerce experience",
        "Performance optimization",
      ],
      benefits: ["Employee discounts", "Career growth", "Multicultural team"],
      applyUrl: "https://jobs.daraz.com.bd/react-developer",
      source: "Company",
    },
    {
      id: "job_005",
      title: "Backend Developer",
      company: "Brain Station 23",
      location: "Dhaka",
      salary: "৳65,000-95,000",
      type: "Full-time",
      experience: "3-5 years",
      posted: "3 days ago",
      match: 79,
      description:
        "Work on international software projects with cutting-edge technologies.",
      requirements: ["Node.js/Python", "API development", "Cloud platforms"],
      benefits: [
        "International projects",
        "Technical training",
        "Conference sponsorship",
      ],
      applyUrl: "https://brainstation-23.com/careers/backend-dev",
      source: "Company",
    },
    {
      id: "job_006",
      title: "DevOps Engineer",
      company: "SSL Commerz",
      location: "Dhaka",
      salary: "৳75,000-110,000",
      type: "Full-time",
      experience: "4-6 years",
      posted: "4 days ago",
      match: 76,
      description:
        "Manage infrastructure for Bangladesh's leading payment gateway.",
      requirements: ["AWS/GCP", "Docker/Kubernetes", "CI/CD pipelines"],
      benefits: ["Fintech exposure", "Performance bonuses", "Health coverage"],
      applyUrl: "https://sslcommerz.com/careers/devops",
      source: "BDJobs",
    },
    {
      id: "job_007",
      title: "Product Manager",
      company: "Chaldal",
      location: "Dhaka",
      salary: "৳90,000-130,000",
      type: "Full-time",
      experience: "5-7 years",
      posted: "5 days ago",
      match: 73,
      description:
        "Lead product strategy for Bangladesh's largest online grocery platform.",
      requirements: [
        "Product management",
        "E-commerce experience",
        "Data-driven decisions",
      ],
      benefits: ["Product ownership", "Stock options", "Flexible work"],
      applyUrl: "https://chaldal.com/careers/product-manager",
      source: "LinkedIn",
    },
    {
      id: "job_008",
      title: "UI/UX Designer",
      company: "Shohoz",
      location: "Dhaka",
      salary: "৳45,000-70,000",
      type: "Full-time",
      experience: "2-4 years",
      posted: "1 week ago",
      match: 70,
      description:
        "Design user experiences for digital services used by millions.",
      requirements: ["Figma/Sketch", "User research", "Mobile design"],
      benefits: [
        "Creative freedom",
        "Design tools budget",
        "Team collaboration",
      ],
      applyUrl: "https://shohoz.com/careers/ui-ux-designer",
      source: "Others",
    },
  ];

  useEffect(() => {
    // Set initial jobs based on package
    let initialJobs = allJobs;
    if (currentLimit.jobs > 0) {
      initialJobs = allJobs.slice(0, currentLimit.jobs);
    } else if (currentLimit.jobs === 0) {
      initialJobs = [];
    }

    setJobs(initialJobs);
    setFilteredJobs(initialJobs);
  }, [userPlan]);

  useEffect(() => {
    // Apply filters
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter((job) => job.location === locationFilter);
    }

    if (companyFilter && companyFilter !== "all") {
      filtered = filtered.filter((job) => job.company === companyFilter);
    }

    if (salaryFilter && salaryFilter !== "all") {
      // Simple salary filtering logic
      filtered = filtered.filter((job) => {
        const salaryNum = parseInt(job.salary.replace(/[^\d]/g, ""));
        const filterNum = parseInt(salaryFilter);
        return salaryNum >= filterNum;
      });
    }

    setFilteredJobs(filtered);
  }, [searchTerm, locationFilter, companyFilter, salaryFilter, jobs]);

  const handleRefresh = () => {
    if (!currentLimit.refresh) return;

    setLastRefresh(new Date());
    setCanRefresh(false);

    // Simulate refresh - in real app, this would call API
    setTimeout(() => {
      // Add some new jobs or shuffle existing ones
      const shuffled = [...allJobs].sort(() => Math.random() - 0.5);
      const newJobs =
        currentLimit.jobs === -1
          ? shuffled
          : shuffled.slice(0, currentLimit.jobs);
      setJobs(newJobs);
      setCanRefresh(true);
    }, 2000);
  };

  const canUseFilters = currentLimit.filters;
  const showAllJobs = currentLimit.jobs === -1;
  const jobCount =
    currentLimit.jobs === -1 ? allJobs.length : currentLimit.jobs;

  if (userPlan === "free") {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Job Matching Unavailable
          </h3>
          <p className="text-gray-600 mb-6">
            Upgrade to Starter plan to start seeing personalized job matches
            from top Bangladesh companies.
          </p>
          <Button onClick={onUpgrade} size="lg">
            <ArrowUp className="h-4 w-4 mr-2" />
            Upgrade to Starter (৳200/month)
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Matches</h2>
          <p className="text-gray-600">
            {showAllJobs
              ? `Showing all ${allJobs.length} personalized job matches`
              : `Showing top ${jobCount} matches for ${userPlan} plan`}
          </p>
        </div>

        {currentLimit.refresh && (
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-600">
              Last refresh: {lastRefresh.toLocaleTimeString()}
            </div>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={!canRefresh}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${!canRefresh ? "animate-spin" : ""}`}
              />
              Refresh Jobs
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      {canUseFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filter Jobs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search jobs, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Dhaka">Dhaka</SelectItem>
                  <SelectItem value="Chittagong">Chittagong</SelectItem>
                  <SelectItem value="Sylhet">Sylhet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  <SelectItem value="BRAC Bank">BRAC Bank</SelectItem>
                  <SelectItem value="Grameenphone">Grameenphone</SelectItem>
                  <SelectItem value="Pathao">Pathao</SelectItem>
                  <SelectItem value="Daraz Bangladesh">
                    Daraz Bangladesh
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Min Salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Salary</SelectItem>
                  <SelectItem value="40000">৳40K+</SelectItem>
                  <SelectItem value="60000">৳60K+</SelectItem>
                  <SelectItem value="80000">৳80K+</SelectItem>
                  <SelectItem value="100000">৳100K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Premium Refresh Notice */}
      {!currentLimit.refresh && userPlan === "starter" && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Jobs are updated daily. Upgrade to Premium for 24-hour refresh and
            unlimited job matches!
          </AlertDescription>
        </Alert>
      )}

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job, index) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <Badge className="bg-green-100 text-green-800">
                        {job.match}% Match
                      </Badge>
                      {job.featured && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {job.source}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{job.company}</span>
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
                        <Clock className="h-4 w-4" />
                        <span>{job.posted}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => window.open(job.applyUrl, "_blank")}
                          size="sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>

                      {job.deadline && (
                        <div className="text-sm text-orange-600">
                          <Calendar className="h-4 w-4 inline mr-1" />
                          Deadline: {job.deadline}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Upgrade Prompt for Starter Users */}
      {userPlan === "starter" && filteredJobs.length >= currentLimit.jobs && (
        <Alert>
          <ArrowUp className="h-4 w-4" />
          <AlertDescription>
            You're seeing {currentLimit.jobs} job matches. Upgrade to Premium to
            see all job matches with unlimited refresh and advanced filters!
          </AlertDescription>
        </Alert>
      )}

      {/* Load More for Premium Users */}
      {showAllJobs && filteredJobs.length === allJobs.length && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
}
