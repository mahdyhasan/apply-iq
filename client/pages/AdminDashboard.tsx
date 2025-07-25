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
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
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
  Calendar,
  Shield,
  Server,
  Globe,
  FileText,
  Key,
  Zap,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  UserCheck,
  UserX,
  CreditCard,
  PieChart,
  LineChart,
  Filter,
  Upload,
  Archive,
  CloudDownload,
  Workflow,
  Bug,
  AlertCircle,
  Lightbulb,
  Target,
  Gauge,
  Monitor,
  Bell,
  Code,
  Sliders
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: "active" | "inactive" | "suspended" | "trial";
  joinDate: string;
  lastActive: string;
  ipAddress: string;
  country: string;
  device: string;
  totalSpent: number;
  usage: {
    jobMatches: number;
    coverLetters: number;
    notesGenerated: number;
    mcqsCreated: number;
    apiCalls: number;
    storageUsed: number;
  };
  limits: {
    jobMatches: number;
    coverLetters: number;
    notesGenerated: number;
    mcqsCreated: number;
  };
}

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

interface APIKey {
  id: string;
  name: string;
  service: string;
  status: "active" | "inactive" | "expired";
  usage: number;
  limit: number;
  expiresAt: string;
}

interface BackupRecord {
  id: string;
  type: "full" | "incremental" | "user-data";
  size: string;
  createdAt: string;
  status: "completed" | "in-progress" | "failed";
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
    ipAddress: "192.168.1.100",
    country: "United States",
    device: "Desktop",
    totalSpent: 45,
    usage: {
      jobMatches: 45,
      coverLetters: 12,
      notesGenerated: 23,
      mcqsCreated: 8,
      apiCalls: 156,
      storageUsed: 2.3
    },
    limits: {
      jobMatches: 100,
      coverLetters: 50,
      notesGenerated: 100,
      mcqsCreated: 50
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "resume",
    status: "trial",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    ipAddress: "10.0.0.45",
    country: "Canada",
    device: "Mobile",
    totalSpent: 0,
    usage: {
      jobMatches: 5,
      coverLetters: 2,
      notesGenerated: 0,
      mcqsCreated: 0,
      apiCalls: 23,
      storageUsed: 0.1
    },
    limits: {
      jobMatches: 10,
      coverLetters: 5,
      notesGenerated: 0,
      mcqsCreated: 0
    }
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@education.com",
    plan: "notes",
    status: "suspended",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
    ipAddress: "203.45.67.89",
    country: "United Kingdom",
    device: "Tablet",
    totalSpent: 36,
    usage: {
      jobMatches: 0,
      coverLetters: 0,
      notesGenerated: 156,
      mcqsCreated: 42,
      apiCalls: 289,
      storageUsed: 5.7
    },
    limits: {
      jobMatches: 0,
      coverLetters: 0,
      notesGenerated: 200,
      mcqsCreated: 100
    }
  }
];

const mockSystemMetrics: SystemMetric[] = [
  { id: "1", name: "CPU Usage", value: 72, unit: "%", status: "warning", trend: "up", lastUpdated: "2 mins ago" },
  { id: "2", name: "Memory Usage", value: 64, unit: "%", status: "healthy", trend: "stable", lastUpdated: "2 mins ago" },
  { id: "3", name: "Disk Space", value: 85, unit: "%", status: "warning", trend: "up", lastUpdated: "2 mins ago" },
  { id: "4", name: "API Response Time", value: 245, unit: "ms", status: "healthy", trend: "down", lastUpdated: "1 min ago" },
  { id: "5", name: "Active Connections", value: 1247, unit: "", status: "healthy", trend: "up", lastUpdated: "1 min ago" },
  { id: "6", name: "Error Rate", value: 0.2, unit: "%", status: "healthy", trend: "stable", lastUpdated: "3 mins ago" }
];

const mockAPIKeys: APIKey[] = [
  { id: "1", name: "OpenAI GPT-4", service: "openai", status: "active", usage: 85000, limit: 100000, expiresAt: "2024-12-31" },
  { id: "2", name: "Google Search API", service: "google", status: "active", usage: 450, limit: 1000, expiresAt: "2024-06-30" },
  { id: "3", name: "News API", service: "newsapi", status: "active", usage: 2340, limit: 5000, expiresAt: "2024-08-15" },
  { id: "4", name: "LinkedIn Scraper", service: "linkedin", status: "inactive", usage: 0, limit: 1000, expiresAt: "2024-03-31" }
];

const mockBackups: BackupRecord[] = [
  { id: "1", type: "full", size: "2.4 GB", createdAt: "2024-01-20 02:00", status: "completed" },
  { id: "2", type: "incremental", size: "156 MB", createdAt: "2024-01-19 02:00", status: "completed" },
  { id: "3", type: "user-data", size: "892 MB", createdAt: "2024-01-18 02:00", status: "completed" },
  { id: "4", type: "full", size: "2.3 GB", createdAt: "2024-01-17 02:00", status: "completed" }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [metrics] = useState<SystemMetric[]>(mockSystemMetrics);
  const [apiKeys, setApiKeys] = useState<APIKey[]>(mockAPIKeys);
  const [backups] = useState<BackupRecord[]>(mockBackups);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [systemAlerts, setSystemAlerts] = useState([
    { id: "1", type: "warning", message: "High API usage detected - 95% of daily limit reached", timestamp: "5 mins ago" },
    { id: "2", type: "info", message: "Scheduled maintenance in 2 hours", timestamp: "1 hour ago" },
    { id: "3", type: "error", message: "Failed to scrape Indeed.com - Rate limit exceeded", timestamp: "2 hours ago" }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-yellow-100 text-yellow-800", 
      suspended: "bg-red-100 text-red-800",
      trial: "bg-blue-100 text-blue-800",
      error: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800"
    };
    return <Badge className={variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };

  const getMetricIcon = (status: string) => {
    switch (status) {
      case "healthy": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "critical": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "suspended" : "active" as const }
        : user
    ));
  };

  const toggleAPIKey = (keyId: string) => {
    setApiKeys(apiKeys.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === "active" ? "inactive" : "active" as const }
        : key
    ));
  };

  const exportUsers = (format: string) => {
    const data = format === "csv" 
      ? users.map(u => `${u.name},${u.email},${u.plan},${u.status},${u.joinDate}`).join('\n')
      : JSON.stringify(users, null, 2);
    
    const blob = new Blob([data], { type: format === "csv" ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendSystemAlert = (type: string, message: string) => {
    const newAlert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: "Just now"
    };
    setSystemAlerts([newAlert, ...systemAlerts.slice(0, 9)]);
  };

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const trialUsers = users.filter(u => u.status === "trial").length;
  const totalRevenue = users.reduce((sum, user) => sum + user.totalSpent, 0);
  const avgUsage = users.reduce((sum, user) => sum + user.usage.apiCalls, 0) / users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Control Center</h1>
            <p className="text-gray-600">Advanced platform management and system monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-green-600">
              <Activity className="h-3 w-3 mr-1" />
              System Healthy
            </Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts ({systemAlerts.length})
            </Button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
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
                <UserCheck className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trial Users</p>
                  <p className="text-3xl font-bold">{trialUsers}</p>
                  <p className="text-sm text-blue-600">Converting 23%</p>
                </div>
                <Crown className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
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
                  <p className="text-sm font-medium text-gray-600">API Calls</p>
                  <p className="text-3xl font-bold">{Math.round(avgUsage)}</p>
                  <p className="text-sm text-gray-500">avg/user</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-3xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-gray-500">30 days</p>
                </div>
                <Gauge className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="api">API Management</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* System Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.slice(0, 4).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getMetricIcon(metric.status)}
                          <div>
                            <p className="font-medium">{metric.name}</p>
                            <p className="text-sm text-gray-500">{metric.lastUpdated}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{metric.value}{metric.unit}</p>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                metric.status === "healthy" ? "bg-green-500" :
                                metric.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{width: `${Math.min(metric.value, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Recent Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemAlerts.slice(0, 5).map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                        {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />}
                        {alert.type === "error" && <AlertCircle className="h-4 w-4 text-red-500 mt-1" />}
                        {alert.type === "info" && <CheckCircle className="h-4 w-4 text-blue-500 mt-1" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-gray-500">{alert.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Workflow className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                      onClick={() => sendSystemAlert("info", "Manual backup initiated")}
                    >
                      <Archive className="h-4 w-4" />
                      <span>Backup Now</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Restart Services</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Export Logs</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Sliders className="h-4 w-4" />
                      <span>System Config</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Send Announcement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>System Announcements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type your announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => {
                        if (announcement.trim()) {
                          sendSystemAlert("info", `Announcement sent: "${announcement.substring(0, 50)}..."`);
                          setAnnouncement("");
                        }
                      }} 
                      disabled={!announcement.trim()}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send to All Users
                    </Button>
                    <Button variant="outline" onClick={() => setAnnouncement("")}>
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Enhanced Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Advanced User Management</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline"
                      onClick={() => exportUsers("csv")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => exportUsers("json")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export JSON
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
                      <TableHead>Usage</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Last Active</TableHead>
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
                            <p className="text-xs text-gray-400">{user.device}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span>API:</span>
                              <span className="font-medium">{user.usage.apiCalls}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Storage:</span>
                              <span className="font-medium">{user.usage.storageUsed}GB</span>
                            </div>
                            <Progress 
                              value={(user.usage.apiCalls / (user.limits.jobMatches + user.limits.coverLetters + user.limits.notesGenerated)) * 100} 
                              className="h-1 mt-1"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{user.country}</p>
                            <p className="text-gray-500">{user.ipAddress}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${user.totalSpent}</div>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
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
                              {user.status === "active" ? 
                                <UserX className="h-4 w-4" /> : 
                                <UserCheck className="h-4 w-4" />
                              }
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Mail className="h-4 w-4" />
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

          {/* Enhanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Revenue Analytics</span>
                  </CardTitle>
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
                    <div className="flex justify-between items-center">
                      <span>YTD</span>
                      <span className="text-lg">${Math.round(totalRevenue * 3.2)}</span>
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
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5" />
                    <span>Usage Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total API Calls</span>
                      <span className="text-2xl font-bold">12,456</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Peak Usage</span>
                      <span className="text-lg">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg Response Time</span>
                      <span className="text-lg">245ms</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm">+8% usage increase</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Monitoring Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="h-5 w-5" />
                    <span>Server Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getMetricIcon(metric.status)}
                          <span className="text-sm">{metric.name}</span>
                        </div>
                        <span className="font-medium">{metric.value}{metric.unit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Database Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Connections</span>
                      <span className="font-medium">47/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Query Time</span>
                      <span className="font-medium">12ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Hit Rate</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Used</span>
                      <span className="font-medium">2.3GB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wifi className="h-5 w-5" />
                    <span>Network Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Bandwidth</span>
                      <span className="font-medium">45MB/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latency</span>
                      <span className="font-medium">23ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Packet Loss</span>
                      <span className="font-medium">0.01%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CDN Status</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Management Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Key Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Limit</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{key.name}</p>
                            <p className="text-sm text-gray-500">{key.service}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(key.status)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>{key.usage.toLocaleString()}</span>
                              <span>{Math.round((key.usage / key.limit) * 100)}%</span>
                            </div>
                            <Progress value={(key.usage / key.limit) * 100} className="h-1 mt-1" />
                          </div>
                        </TableCell>
                        <TableCell>{key.limit.toLocaleString()}</TableCell>
                        <TableCell>{key.expiresAt}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAPIKey(key.id)}
                            >
                              {key.status === "active" ? "Disable" : "Enable"}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
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

          {/* Billing Management Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Revenue Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Today</p>
                        <p className="text-2xl font-bold">$12</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">This Week</p>
                        <p className="text-2xl font-bold">$89</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold">${totalRevenue}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Bundle Plans</span>
                        <span>$45 (65%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Resume Plans</span>
                        <span>$18 (25%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Notes Plans</span>
                        <span>$12 (10%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Conversion Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Trial to Paid</span>
                      <div className="text-right">
                        <span className="font-bold">23%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full w-[23%]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Monthly Retention</span>
                      <div className="text-right">
                        <span className="font-bold">87%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-500 h-2 rounded-full w-[87%]"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Upgrade Rate</span>
                      <div className="text-right">
                        <span className="font-bold">12%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-purple-500 h-2 rounded-full w-[12%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <Switch id="two-factor" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ip-filtering">IP Address Filtering</Label>
                      <Switch id="ip-filtering" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="rate-limiting">Rate Limiting</Label>
                      <Switch id="rate-limiting" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="encryption">Data Encryption</Label>
                      <Switch id="encryption" defaultChecked disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>Access Logs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Admin login: admin@applyiq.com</p>
                      <p className="text-gray-500">2 minutes ago • 192.168.1.1</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Failed login attempt</p>
                      <p className="text-gray-500">1 hour ago • 203.45.67.89</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">User registration: jane@example.com</p>
                      <p className="text-gray-500">3 hours ago • 10.0.0.45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Archive className="h-5 w-5" />
                    <span>Backup Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Auto Backup</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      {backups.slice(0, 3).map((backup) => (
                        <div key={backup.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium capitalize">{backup.type}</span>
                            <span className="text-gray-500 ml-2">{backup.size}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-500">{backup.createdAt}</span>
                            {getStatusBadge(backup.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" onClick={() => sendSystemAlert("info", "Manual backup started")}>
                      <Archive className="h-4 w-4 mr-2" />
                      Create Backup Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CloudDownload className="h-5 w-5" />
                    <span>Data Export</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => exportUsers("csv")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        User Data
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        System Logs
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Billing Data
                      </Button>
                    </div>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertDescription>
                        Data exports are encrypted and include compliance reports for GDPR requirements.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>{selectedUser.name}</span>
                  </CardTitle>
                  <CardDescription>{selectedUser.email}</CardDescription>
                </div>
                {getStatusBadge(selectedUser.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label>Account Details</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Plan:</span>
                      <Badge className="capitalize">{selectedUser.plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Join Date:</span>
                      <span className="text-sm">{selectedUser.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Active:</span>
                      <span className="text-sm">{selectedUser.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Spent:</span>
                      <span className="text-sm font-medium">${selectedUser.totalSpent}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Location & Device</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Country:</span>
                      <span className="text-sm">{selectedUser.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">IP Address:</span>
                      <span className="text-sm">{selectedUser.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Device:</span>
                      <span className="text-sm">{selectedUser.device}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Usage Limits</Label>
                  <div className="space-y-2 mt-2">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Job Matches:</span>
                        <span>{selectedUser.usage.jobMatches}/{selectedUser.limits.jobMatches}</span>
                      </div>
                      <Progress value={(selectedUser.usage.jobMatches / selectedUser.limits.jobMatches) * 100} className="h-1" />
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Cover Letters:</span>
                        <span>{selectedUser.usage.coverLetters}/{selectedUser.limits.coverLetters}</span>
                      </div>
                      <Progress value={(selectedUser.usage.coverLetters / selectedUser.limits.coverLetters) * 100} className="h-1" />
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>Notes:</span>
                        <span>{selectedUser.usage.notesGenerated}/{selectedUser.limits.notesGenerated}</span>
                      </div>
                      <Progress value={(selectedUser.usage.notesGenerated / selectedUser.limits.notesGenerated) * 100} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label>Usage Statistics</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
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
                    <p className="text-2xl font-bold">{selectedUser.usage.apiCalls}</p>
                    <p className="text-sm text-gray-600">API Calls</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
                <Button 
                  variant={selectedUser.status === "active" ? "destructive" : "default"}
                  onClick={() => {
                    toggleUserStatus(selectedUser.id);
                    setSelectedUser(null);
                  }}
                >
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
