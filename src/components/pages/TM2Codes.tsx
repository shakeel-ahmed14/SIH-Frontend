import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Search, Filter, Plus, Eye, Edit, ExternalLink } from 'lucide-react';

export function TM2Codes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');

  // Mock data for TM2/ICD-11 codes
  const tm2CodesData = [
    {
      id: 'ICD11-001',
      code: 'MG30.0',
      title: 'Generalized anxiety disorder',
      chapter: 'Mental, behavioural or neurodevelopmental disorders',
      parent: 'MG30',
      status: 'Current',
      version: 'ICD-11 2024',
      mappings: 5
    },
    {
      id: 'ICD11-002',
      code: 'BA00',
      title: 'Essential hypertension',
      chapter: 'Diseases of the circulatory system',
      parent: 'BA0',
      status: 'Current',
      version: 'ICD-11 2024',
      mappings: 8
    },
    {
      id: 'ICD11-003',
      code: '5A11',
      title: 'Type 2 diabetes mellitus',
      chapter: 'Endocrine, nutritional or metabolic diseases',
      parent: '5A1',
      status: 'Current',
      version: 'ICD-11 2024',
      mappings: 6
    },
    {
      id: 'ICD11-004',
      code: 'CA22',
      title: 'Chronic obstructive pulmonary disease',
      chapter: 'Diseases of the respiratory system',
      parent: 'CA2',
      status: 'Current',
      version: 'ICD-11 2024',
      mappings: 4
    },
    {
      id: 'ICD11-005',
      code: 'FA20.0',
      title: 'Rheumatoid arthritis, unspecified',
      chapter: 'Diseases of the musculoskeletal system or connective tissue',
      parent: 'FA20',
      status: 'Under Review',
      version: 'ICD-11 2024',
      mappings: 3
    }
  ];

  const chapters = [
    'all',
    'Mental, behavioural or neurodevelopmental disorders',
    'Diseases of the circulatory system',
    'Endocrine, nutritional or metabolic diseases',
    'Diseases of the respiratory system',
    'Diseases of the musculoskeletal system or connective tissue'
  ];

  const filteredCodes = tm2CodesData.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'all' || code.chapter === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">TM2/ICD-11 Codes</h1>
          <p className="text-muted-foreground">
            Browse WHO ICD-11 classification codes and TM2 traditional medicine classifications
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>WHO Portal</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Import Codes</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search ICD-11 codes, titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground max-w-xs"
              >
                <option value="all">All Chapters</option>
                {chapters.slice(1).map(chapter => (
                  <option key={chapter} value={chapter}>
                    {chapter.length > 30 ? chapter.substring(0, 30) + '...' : chapter}
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
              <p className="text-sm text-muted-foreground">Total ICD-11 Codes</p>
              <p className="text-2xl font-bold">8,652</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">TM2 Codes</p>
              <p className="text-2xl font-bold text-purple-600">1,234</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Current Version</p>
              <p className="text-2xl font-bold text-green-600">7,890</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mapped to Namaste</p>
              <p className="text-2xl font-bold text-blue-600">6,234</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Version Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Current ICD-11 Version</p>
              <p className="text-sm text-muted-foreground">ICD-11 for Mortality and Morbidity Statistics (Version 2024)</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Latest</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Codes Table */}
      <Card>
        <CardHeader>
          <CardTitle>ICD-11 Codes ({filteredCodes.length} results)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Chapter</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mappings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono">{code.code}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate" title={code.title}>
                        {code.title}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={code.chapter}>
                        {code.chapter}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{code.parent}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(code.status)}>
                        {code.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{code.mappings}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
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