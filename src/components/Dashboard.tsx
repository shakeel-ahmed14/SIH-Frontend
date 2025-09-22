import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Search, 
  Map, 
  FileSearch, 
  Download,
  TrendingUp,
  ArrowRight 
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    {
      title: 'NAMASTE Codes',
      value: '12,847',
      change: '+127 this week',
      trend: 'up'
    },
    {
      title: 'TM2 Codes',
      value: '8,652',
      change: '+43 this week',
      trend: 'up'
    },
    {
      title: 'Active Mappings',
      value: '6,234',
      change: '+89 this week',
      trend: 'up'
    },
    {
      title: 'Patient Records',
      value: '1,456',
      change: '+12 today',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Code Lookup',
      description: 'Search and browse medical codes',
      icon: Search,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      page: 'namaste-codes'
    },
    {
      title: 'Mapping Explorer',
      description: 'Explore code mappings between systems',
      icon: Map,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      page: 'mappings'
    },
    {
      title: 'Smart Search',
      description: 'Unified search across all systems',
      icon: FileSearch,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      page: 'namaste-codes'
    },
    {
      title: 'Bulk Downloads',
      description: 'Download FHIR data in bulk',
      icon: Download,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      page: 'downloads'
    }
  ];

  const handleActionClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Code Mapping Portal</h1>
        <p className="text-muted-foreground">
          Welcome to the FHIR Code Mapping Portal. Manage medical codes, mappings, and patient data
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                {stat.trend === 'up' && <TrendingUp className="w-3 h-3 text-green-600" />}
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="bg-card hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => handleActionClick(action.page)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <Icon className={`w-6 h-6 ${action.iconColor}`} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Section */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="space-y-1">
                <p className="text-sm font-medium">New mapping created: NAMASTE-12847 → ICD-11-MG30</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="space-y-1">
                <p className="text-sm font-medium">Batch upload completed: 43 new TM2 codes</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Admin audit: Code validation completed</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}