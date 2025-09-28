import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Search, Filter, Plus, Eye, Edit, ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedDropdown } from '../ui/AnimatedDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function Mappings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Categories');

  // Mock data for code mappings
  const mappingsData = [
    {
      id: 'MAP-001',
      namasteCode: 'NAM001',
      namasteDescription: 'Anxiety disorder, generalized',
      icd11Code: 'MG30.0',
      icd11Description: 'Generalized anxiety disorder',
      mappingType: 'Exact Match',
      confidence: 95,
      status: 'Approved',
      reviewer: 'Dr. Smith',
      dateCreated: '2024-09-15',
      lastReviewed: '2024-09-20'
    },
    {
      id: 'MAP-002',
      namasteCode: 'NAM002',
      namasteDescription: 'Hypertension, essential',
      icd11Code: 'BA00',
      icd11Description: 'Essential hypertension',
      mappingType: 'Exact Match',
      confidence: 98,
      status: 'Approved',
      reviewer: 'Dr. Johnson',
      dateCreated: '2024-09-14',
      lastReviewed: '2024-09-19'
    },
    {
      id: 'MAP-003',
      namasteCode: 'NAM003',
      namasteDescription: 'Diabetes mellitus, type 2',
      icd11Code: '5A11',
      icd11Description: 'Type 2 diabetes mellitus',
      mappingType: 'Close Match',
      confidence: 87,
      status: 'Under Review',
      reviewer: 'Dr. Wilson',
      dateCreated: '2024-09-13',
      lastReviewed: '2024-09-18'
    },
    {
      id: 'MAP-004',
      namasteCode: 'NAM004',
      namasteDescription: 'Chronic obstructive pulmonary disease',
      icd11Code: 'CA22',
      icd11Description: 'Chronic obstructive pulmonary disease',
      mappingType: 'Exact Match',
      confidence: 96,
      status: 'Approved',
      reviewer: 'Dr. Davis',
      dateCreated: '2024-09-12',
      lastReviewed: '2024-09-17'
    },
    {
      id: 'MAP-005',
      namasteCode: 'NAM005',
      namasteDescription: 'Rheumatoid arthritis',
      icd11Code: 'FA20.0',
      icd11Description: 'Rheumatoid arthritis, unspecified',
      mappingType: 'Partial Match',
      confidence: 75,
      status: 'Pending Review',
      reviewer: null,
      dateCreated: '2024-09-11',
      lastReviewed: null
    }
  ];

  const statuses = ['All Categories', 'Approved', 'Under Review', 'Pending Review', 'Rejected'];

  const filteredMappings = mappingsData.filter(mapping => {
    const matchesSearch = mapping.namasteCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.icd11Code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.namasteDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.icd11Description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All Categories' || mapping.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Pending Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMappingTypeColor = (type: string) => {
    switch (type) {
      case 'Exact Match': return 'bg-green-100 text-green-800';
      case 'Close Match': return 'bg-yellow-100 text-yellow-800';
      case 'Partial Match': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Code Mappings</h1>
          <p className="text-muted-foreground">
            Manage mappings between Namaste codes and ICD-11/TM2 classifications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <motion.button
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Plus className="w-4 h-4" />
            <span>Create Mapping</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search Box */}
              <motion.div
                className="flex-1 relative"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search mappings, codes, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </motion.div>

              {/* Status Select */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {selectedStatus}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="min-w-[180px] bg-white border rounded-md shadow-lg p-2"
                >
                  <DropdownMenuLabel className="px-2 py-1 text-gray-700 font-medium">
                    Categories
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

                  {statuses.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setSelectedStatus(cat)}
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${cat === selectedStatus ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
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
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>More Filters</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.1 } // cards appear one by one
          }
        }}
      >
        {[
          { label: "Total Mappings", value: "6,234", color: "text-foreground" },
          { label: "Approved", value: "5,123", color: "text-green-600" },
          { label: "Under Review", value: "892", color: "text-yellow-600" },
          { label: "Avg. Confidence", value: "89%", color: "text-blue-600" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card>
              <CardContent className="p-4 bg-[#d2edd9] rounded-xl">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Mapping Quality Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Mapping Quality Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {[
              { label: "Exact Match", value: "3,245 (52%)", percent: 52, color: "bg-green-600" },
              { label: "Close Match", value: "2,234 (36%)", percent: 36, color: "bg-yellow-600" },
              { label: "Partial Match", value: "755 (12%)", percent: 12, color: "bg-orange-600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="space-y-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>

                {/* Animated progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`${item.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      {/* Mappings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Code Mappings ({filteredMappings.length} results)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Namaste Code</TableHead>
                  <TableHead>ICD-11 Code</TableHead>
                  <TableHead>Mapping Type</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMappings.map((mapping) => (
                  <TableRow key={mapping.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-mono font-medium">{mapping.namasteCode}</div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {mapping.namasteDescription}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-mono font-medium">{mapping.icd11Code}</div>
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {mapping.icd11Description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMappingTypeColor(mapping.mappingType)}>
                        {mapping.mappingType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getConfidenceColor(mapping.confidence)}`}>
                          {mapping.confidence}%
                        </span>
                        {mapping.confidence >= 90 && <Check className="w-4 h-4 text-green-600" />}
                        {mapping.confidence < 75 && <AlertCircle className="w-4 h-4 text-red-600" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(mapping.status)}>
                        {mapping.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {mapping.reviewer || 'Unassigned'}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {mapping.status === 'Pending Review' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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