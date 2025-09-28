import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Search, 
  Filter, 
  Shield, 
  Users, 
  Activity, 
  Database,
  Eye,
  User,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';

export function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');

  // Mock data for audit logs
  const auditLogs = [
    {
      id: 'AUDIT-001',
      timestamp: '2024-09-22 14:30:15',
      user: 'Dr. Smith',
      userRole: 'Senior Clinician',
      action: 'CREATE_MAPPING',
      resource: 'Code Mapping NAM001 → MG30.0',
      details: 'Created new exact match mapping with 95% confidence',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 'AUDIT-002',
      timestamp: '2024-09-22 13:45:22',
      user: 'Admin User',
      userRole: 'System Administrator',
      action: 'BULK_IMPORT',
      resource: 'ICD-11 Codes',
      details: 'Imported 43 new ICD-11 codes from WHO database',
      ipAddress: '192.168.1.10',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'Success'
    },
    {
      id: 'AUDIT-003',
      timestamp: '2024-09-22 12:20:08',
      user: 'Dr. Johnson',
      userRole: 'Clinician',
      action: 'UPDATE_PATIENT',
      resource: 'Patient Record P001234',
      details: 'Updated clinical notes and diagnosis codes',
      ipAddress: '192.168.1.150',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 'AUDIT-004',
      timestamp: '2024-09-22 11:15:33',
      user: 'Dr. Wilson',
      userRole: 'Clinician',
      action: 'DELETE_MAPPING',
      resource: 'Code Mapping NAM005 → FA20.1',
      details: 'Deleted mapping due to incorrect classification',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'Success'
    },
    {
      id: 'AUDIT-005',
      timestamp: '2024-09-22 10:45:18',
      user: 'System',
      userRole: 'System',
      action: 'AUTO_VALIDATION',
      resource: 'Mapping Validation',
      details: 'Automatic validation failed for 5 mappings below confidence threshold',
      ipAddress: 'localhost',
      userAgent: 'System Process',
      status: 'Warning'
    },
    {
      id: 'AUDIT-006',
      timestamp: '2024-09-22 09:30:45',
      user: 'Guest User',
      userRole: 'Guest',
      action: 'LOGIN_FAILED',
      resource: 'Authentication',
      details: 'Failed login attempt with invalid credentials',
      ipAddress: '203.0.113.100',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      status: 'Error'
    }
  ];

  // Mock data for system stats
  const systemStats = {
    activeUsers: 23,
    totalSessions: 156,
    failedLogins: 3,
    systemUptime: '99.9%',
    avgResponseTime: '1.2s',
    diskUsage: 68,
    memoryUsage: 45,
    cpuUsage: 32
  };

  // Mock data for user management
  const users = [
    {
      id: 'USER-001',
      name: 'Dr. Smith',
      email: 'smith@hospital.com',
      role: 'Senior Clinician',
      status: 'Active',
      lastLogin: '2024-09-22 14:30',
      permissions: ['READ', 'WRITE', 'CREATE_MAPPING', 'REVIEW_MAPPING']
    },
    {
      id: 'USER-002',
      name: 'Dr. Johnson',
      email: 'johnson@hospital.com',
      role: 'Clinician',
      status: 'Active',
      lastLogin: '2024-09-22 13:45',
      permissions: ['READ', 'WRITE', 'CREATE_MAPPING']
    },
    {
      id: 'USER-003',
      name: 'Admin User',
      email: 'admin@hospital.com',
      role: 'System Administrator',
      status: 'Active',
      lastLogin: '2024-09-22 12:20',
      permissions: ['ALL']
    },
    {
      id: 'USER-004',
      name: 'Dr. Wilson',
      email: 'wilson@hospital.com',
      role: 'Clinician',
      status: 'Inactive',
      lastLogin: '2024-09-20 16:15',
      permissions: ['READ', 'WRITE']
    }
  ];

  const actions = ['all', 'CREATE_MAPPING', 'UPDATE_PATIENT', 'BULK_IMPORT', 'DELETE_MAPPING', 'LOGIN_FAILED'];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'Error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            System administration, user management, and audit logs
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">Active Users</p>
                <p className="text-3xl font-bold text-green-600">{systemStats.activeUsers}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 border border-green-200">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">Total Sessions</p>
                <p className="text-3xl font-bold text-slate-900">{systemStats.totalSessions}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 border border-blue-200">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">Failed Logins</p>
                <p className="text-3xl font-bold text-red-600">{systemStats.failedLogins}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 border border-red-200">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">System Uptime</p>
                <p className="text-3xl font-bold text-green-600">{systemStats.systemUptime}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 border border-green-200">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Response Time</p>
              <p className="text-2xl font-bold text-slate-900">{systemStats.avgResponseTime}</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Disk Usage</p>
              <p className="text-2xl font-bold text-orange-600">{systemStats.diskUsage}%</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{width: '68%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Memory Usage</p>
              <p className="text-2xl font-bold text-slate-900">{systemStats.memoryUsage}%</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-slate-600 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">CPU Usage</p>
              <p className="text-2xl font-bold text-slate-900">{systemStats.cpuUsage}%</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{width: '32%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="audit-logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audit-logs" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Audit Logs</span>
          </TabsTrigger>
          <TabsTrigger value="user-management" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="system-health" className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        {/* Audit Logs Tab */}
        <TabsContent value="audit-logs" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search audit logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {actions.map(action => (
                      <option key={action} value={action}>
                        {action === 'all' ? 'All Actions' : action.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs ({filteredLogs.length} results)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{log.user}</div>
                            <div className="text-xs text-muted-foreground">{log.userRole}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action.replace('_', ' ')}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={log.resource}>
                            {log.resource}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(log.status)}
                            <Badge className={getStatusColor(log.status)}>
                              {log.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {log.ipAddress}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Tab */}
        <TabsContent value="user-management" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Management</span>
                <Button className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Add User</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getUserStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">
                            {user.permissions.slice(0, 2).join(', ')}
                            {user.permissions.length > 2 && ` +${user.permissions.length - 2}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="system-health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>{systemStats.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${systemStats.cpuUsage}%`}}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>{systemStats.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${systemStats.memoryUsage}%`}}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span>{systemStats.diskUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: `${systemStats.diskUsage}%`}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">System Uptime</span>
                  <span className="font-medium">{systemStats.systemUptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Response Time</span>
                  <span className="font-medium">{systemStats.avgResponseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Database Status</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">API Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Backup Status</span>
                  <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}