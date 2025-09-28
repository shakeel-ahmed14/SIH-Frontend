import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Search, Filter, Plus, Eye, Edit, ExternalLink } from 'lucide-react';
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function TM2Codes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('All Categories');

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
    'All Categories',
    'Mental, behavioural or neurodevelopmental disorders',
    'Diseases of the circulatory system',
    'Endocrine, nutritional or metabolic diseases',
    'Diseases of the respiratory system',
    'Diseases of the musculoskeletal system or connective tissue'
  ];

  const filteredCodes = tm2CodesData.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === 'All Categories' || code.chapter === selectedChapter;
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
          <motion.button
            className="flex items-center space-x-2 btn btn-outline rounded-md px-3 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-4 h-4" />
            <span>WHO Portal</span>
          </motion.button>
          <motion.button
            className="flex items-center space-x-2 btn btn-primary rounded-md px-3 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Import Codes</span>
          </motion.button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6 bg-blue-100 rounded-xl">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search ICD-11 codes, titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </motion.div>
            {/* Chapter dropdown (custom animated) */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className="px-4 py-2 bg-blue-200 border rounded-md shadow-sm hover:bg-blue-300 focus:outline-none"
              >
                {selectedChapter}
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="min-w-[180px] bg-white border rounded-md shadow-lg p-2"
              >
                <DropdownMenuLabel className="px-2 py-1 text-gray-700 font-medium">
                  Categories
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

                {chapters.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setSelectedChapter(cat)}
                    className={`px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${cat === selectedChapter ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                      }`}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* More Filters Button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.08 }}
            >
              {/* wrap Button in motion.div so Button props/variants are preserved */}
              <div className="inline-block">
                <Button variant="outline" className="flex items-center space-x-2 bg-blue-200 hover:bg-blue-300 rounded-md">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </Button>
              </div>
          </motion.div>

        </div>
      </CardContent>
    </Card>

      {/* Stats Cards */ }
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {[
      { label: "Total ICD-11 Codes", value: "8,652", color: "text-foreground" },
      { label: "TM2 Codes", value: "1,234", color: "text-purple-600" },
      { label: "Current Version", value: "7,890", color: "text-green-600" },
      { label: "Mapped to Namaste", value: "6,234", color: "text-blue-600" },
    ].map((stat, index) => (
      <motion.div
        key={index}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 }
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.97 }}
      >
        <Card>
          <CardContent className="p-4 bg-white rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </div>

  {/* Version Info */ }
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <Card className="bg-[#f8f8f8]/50">
      <CardContent className="p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Current ICD-11 Version</p>
            <p className="text-sm text-muted-foreground">ICD-11 for Mortality and Morbidity Statistics (Version 2024)</p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">Latest</Badge>
        </div>
      </CardContent>
    </Card>
  </motion.div>

  {/* Codes Table */ }
  <Card className='bg-[#f8f8f8]/50'>
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
            {filteredCodes.map((code, index) => (
              <motion.tr
                key={code.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
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
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
    </div >
  );
}