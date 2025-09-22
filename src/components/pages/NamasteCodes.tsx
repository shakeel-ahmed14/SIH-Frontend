import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';

export function NamasteCodes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for Namaste codes
  const namasteCodesData = [
    {
      id: 'NAMASTE-001',
      code: 'NAM001',
      description: 'Anxiety disorder, generalized',
      category: 'Mental Health',
      status: 'Active',
      lastModified: '2024-09-20',
      mappings: 3
    },
    {
      id: 'NAMASTE-002',
      code: 'NAM002',
      description: 'Hypertension, essential',
      category: 'Cardiovascular',
      status: 'Active',
      lastModified: '2024-09-19',
      mappings: 5
    },
    {
      id: 'NAMASTE-003',
      code: 'NAM003',
      description: 'Diabetes mellitus, type 2',
      category: 'Endocrine',
      status: 'Under Review',
      lastModified: '2024-09-18',
      mappings: 2
    },
    {
      id: 'NAMASTE-004',
      code: 'NAM004',
      description: 'Chronic obstructive pulmonary disease',
      category: 'Respiratory',
      status: 'Active',
      lastModified: '2024-09-17',
      mappings: 4
    },
    {
      id: 'NAMASTE-005',
      code: 'NAM005',
      description: 'Rheumatoid arthritis',
      category: 'Musculoskeletal',
      status: 'Inactive',
      lastModified: '2024-09-16',
      mappings: 1
    }
  ];

  const categories = ['all', 'Mental Health', 'Cardiovascular', 'Endocrine', 'Respiratory', 'Musculoskeletal'];

  const filteredCodes = namasteCodesData.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Namaste Codes</h1>
          <p className="text-muted-foreground">
            Manage and browse Namaste medical classification codes
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Code</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search codes, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Codes</p>
              <p className="text-2xl font-bold">12,847</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">11,234</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Under Review</p>
              <p className="text-2xl font-bold text-yellow-600">892</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mapped</p>
              <p className="text-2xl font-bold text-blue-600">8,456</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Codes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Namaste Codes ({filteredCodes.length} results)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mappings</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono">{code.code}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate" title={code.description}>
                        {code.description}
                      </div>
                    </TableCell>
                    <TableCell>{code.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(code.status)}>
                        {code.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{code.mappings}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {code.lastModified}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
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
    </div>
  );
}