import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Settings, 
  BarChart, 
  Database, 
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  RefreshCw,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Crown,
  Mail,
  Calendar
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
  usage: {
    jobMatches: number;
    coverLetters: number;
    notesGenerated: number;
    mcqsCreated: number;
  };
}

interface SystemLog {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "error";
  message: string;
  component: string;
}

interface JobBoard {
  id: string;
  name: string;
  url: string;
  status: "active" | "inactive" | "error";
  lastScrape: string;
  jobsFound: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "user@applyiq.com",
    plan: "bundle",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    usage: {
      jobMatches: 45,
      coverLetters: 12,
      notesGenerated: 23,
      mcqsCreated: 8
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "resume",
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    usage: {
      jobMatches: 32,
      coverLetters: 8,
      notesGenerated: 0,
      mcqsCreated: 0
    }
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@education.com",
    plan: "notes",
    status: "inactive",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
    usage: {
      jobMatches: 0,
      coverLetters: 0,
      notesGenerated: 156,
      mcqsCreated: 42
    }
  }
];

const mockLogs: SystemLog[] = [
  {
    id: "1",
    timestamp: "2024-01-20 14:30:22",
    type: "info",
    message: "Job scraping completed successfully - 1,234 new jobs found",
    component: "Job Scraper"
  },
  {
    id: "2",
    timestamp: "2024-01-20 14:15:10",
    type: "warning",
    message: "High API usage detected - 95% of daily limit reached",
    component: "OpenAI API"
  },
  {
    id: "3",
    timestamp: "2024-01-20 13:45:33",
    type: "error",
    message: "Failed to scrape Indeed.com - Rate limit exceeded",
    component: "Job Scraper"
  },
  {
    id: "4",
    timestamp: "2024-01-20 12:20:15",
    type: "info",
    message: "New user registration: jane.smith@example.com",
    component: "Auth System"
  }
];

const mockJobBoards: JobBoard[] = [
  {
    id: "1",
    name: "LinkedIn Jobs",
    url: "https://linkedin.com/jobs",
    status: "active",
    lastScrape: "2024-01-20 14:30:00",
    jobsFound: 456
  },
  {
    id: "2",
    name: "Indeed",
    url: "https://indeed.com",
    status: "error",
    lastScrape: "2024-01-20 13:45:00",
    jobsFound: 0
  },
  {
    id: "3",
    name: "Glassdoor",
    url: "https://glassdoor.com",
    status: "active",
    lastScrape: "2024-01-20 14:25:00",
    jobsFound: 234
  },
  {
    id: "4",
    name: "AngelList",
    url: "https://angel.co",
    status: "active",
    lastScrape: "2024-01-20 14:20:00",
    jobsFound: 123
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);
  const [jobBoards, setJobBoards] = useState<JobBoard[]>(mockJobBoards);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive": return <Badge className="bg-yellow-100 text-yellow-800">Inactive</Badge>;
      case "suspended": return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case "error": return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "info": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const sendAnnouncement = () => {
    if (!announcement.trim()) return;
    
    // Simulate sending announcement
    const newLog: SystemLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      type: "info",
      message: `System announcement sent to all users: "${announcement.substring(0, 50)}..."`,
      component: "Admin Panel"
    };
    
    setLogs([newLog, ...logs]);
    setAnnouncement("");
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "suspended" : "active" as const }
        : user
    ));
  };

  const toggleJobBoard = (boardId: string) => {
    setJobBoards(jobBoards.map(board => 
      board.id === boardId 
        ? { ...board, status: board.status === "active" ? "inactive" : "active" as const }
        : board
    ));
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const totalRevenue = users.reduce((sum, user) => {
    const planPrices = { bundle: 15, resume: 9, notes: 12 };
    return sum + (planPrices[user.plan as keyof typeof planPrices] || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Comprehensive platform management and analytics</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold">{totalUsers}</p>
                  <p className="text-sm text-green-600">+2 this week</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold">{activeUsers}</p>
                  <p className="text-sm text-gray-500">{Math.round((activeUsers / totalUsers) * 100)}% active</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold">${totalRevenue}</p>
                  <p className="text-sm text-green-600">+15% this month</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Health</p>
                  <p className="text-3xl font-bold text-green-600">98.5%</p>
                  <p className="text-sm text-gray-500">Uptime</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Send Announcement</span>
                  </CardTitle>
                  <CardDescription>
                    Send system-wide notifications to all users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type your announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={sendAnnouncement} disabled={!announcement.trim()}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send to All Users
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3">
                        {getLogIcon(log.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-gray-500">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Job Board Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {jobBoards.map((board) => (
                      <div key={board.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{board.name}</p>
                          <p className="text-sm text-gray-500">{board.jobsFound} jobs found</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(board.status)}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleJobBoard(board.id)}
                          >
                            {board.status === "active" ? "Disable" : "Enable"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart className="h-5 w-5" />
                    <span>Usage Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Job Matches</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cover Letters Generated</span>
                      <span className="font-semibold">456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notes Created</span>
                      <span className="font-semibold">789</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MCQs Generated</span>
                      <span className="font-semibold">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>Jobs: {user.usage.jobMatches}</p>
                            <p>Notes: {user.usage.notesGenerated}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === "active" ? "Suspend" : "Activate"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="text-2xl font-bold">${totalRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Last Month</span>
                      <span className="text-lg">${Math.round(totalRevenue * 0.85)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+15% growth</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Bundle Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: "40%"}}></div>
                        </div>
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Resume Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: "35%"}}></div>
                        </div>
                        <span className="text-sm">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Notes Plan</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: "25%"}}></div>
                        </div>
                        <span className="text-sm">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Platform Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>OpenAI API Settings</Label>
                    <Input placeholder="API Key" type="password" defaultValue="sk-..." />
                    <Input placeholder="Max tokens per request" defaultValue="2048" />
                  </div>
                  <div className="space-y-4">
                    <Label>Job Scraping Settings</Label>
                    <Input placeholder="Scraping frequency (hours)" defaultValue="6" />
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Job categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="tech">Technology Only</SelectItem>
                        <SelectItem value="custom">Custom Filter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Logs</span>
                  </CardTitle>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                      {getLogIcon(log.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{log.message}</p>
                          <Badge variant="outline" className="text-xs">
                            {log.component}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle>User Details: {selectedUser.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Plan</Label>
                  <Badge className="capitalize">{selectedUser.plan}</Badge>
                </div>
                <div>
                  <Label>Status</Label>
                  {getStatusBadge(selectedUser.status)}
                </div>
                <div>
                  <Label>Join Date</Label>
                  <p>{selectedUser.joinDate}</p>
                </div>
              </div>
              <div>
                <Label>Usage Statistics</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <p className="text-2xl font-bold">{selectedUser.usage.jobMatches}</p>
                    <p className="text-sm text-gray-600">Job Matches</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <p className="text-2xl font-bold">{selectedUser.usage.coverLetters}</p>
                    <p className="text-sm text-gray-600">Cover Letters</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <p className="text-2xl font-bold">{selectedUser.usage.notesGenerated}</p>
                    <p className="text-sm text-gray-600">Notes Generated</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded">
                    <p className="text-2xl font-bold">{selectedUser.usage.mcqsCreated}</p>
                    <p className="text-sm text-gray-600">MCQs Created</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Close
                </Button>
                <Button onClick={() => toggleUserStatus(selectedUser.id)}>
                  {selectedUser.status === "active" ? "Suspend User" : "Activate User"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
