import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import type { LucideIcon } from 'lucide-react';
import { Search, Filter, Plus, Eye, Edit, Trash2, Leaf, Sparkles, Activity, Stethoscope } from 'lucide-react';
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function NamasteCodes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
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

  const categories = ['All Categories', 'Mental Health', 'Cardiovascular', 'Endocrine', 'Respiratory', 'Musculoskeletal'];

  const filteredCodes = namasteCodesData.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const statHighlights: Array<{
    label: string;
    value: string;
    caption: string;
    accent: string;
    icon: LucideIcon;
  }> = [
    {
      label: 'Total Namaste Codes',
      value: '12,847',
      caption: 'Holistic knowledge base',
      accent: 'bg-green-50 border-green-200 text-green-700',
      icon: Leaf,
    },
    {
      label: 'Active Therapeutics',
      value: '11,234',
      caption: 'Practitioner-ready pathways',
      accent: 'bg-amber-50 border-amber-200 text-amber-700',
      icon: Sparkles,
    },
    {
      label: 'Clinical Reviews',
      value: '892',
      caption: 'Under Ayurvedic peer review',
      accent: 'bg-blue-50 border-blue-200 text-blue-700',
      icon: Stethoscope,
    },
    {
      label: 'Mapped to ICD-11',
      value: '8,456',
      caption: 'Bridged with global taxonomy',
      accent: 'bg-slate-50 border-slate-200 text-slate-700',
      icon: Activity,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Namaste Codes</h1>
          <p className="text-sm text-slate-500">
            Manage and browse Namaste medical classification codes
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Code</span>
        </motion.button>
      </div>

      <Card className="border-none bg-transparent">
        <CardContent className="flex flex-col space-y-4 rounded-3xl bg-gradient-to-r from-white via-[#f5f2ff]/85 to-[#fff4e6]/80 p-6 shadow-lg shadow-blue-100/40 backdrop-blur-sm sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Search Box */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 1.02 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
            <Input
              placeholder="Search codes, descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl border-slate-200/70 bg-white/95 pl-10 text-sm shadow-sm shadow-amber-100/30"
            />
          </motion.div>

          {/* Category Select */}
          {/* <AnimatedDropdown
            options={categories}
            selected={selectedCategory}
            onSelect={(val) => setSelectedCategory(val)}
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600"
            >
              {selectedCategory}
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="min-w-[200px] rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-lg shadow-blue-100/40"
            >
              <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Categories
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="my-1 h-px bg-slate-200/60" />

              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition hover:bg-amber-50 hover:text-amber-600 ${cat === selectedCategory ? "bg-amber-100/70 text-amber-700 font-semibold" : "text-slate-600"
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
            <Button variant="outline" className="flex items-center gap-2 rounded-full border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-600 transition hover:border-amber-300 hover:text-amber-600">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {statHighlights.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Card className="border-none bg-transparent">
              <CardContent className={`group relative overflow-hidden rounded-lg border bg-white p-5 shadow-sm ${stat.accent}`}>
                <div className="absolute left-4 top-0 h-0.5 w-8 bg-green-500" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg border ${stat.accent}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="relative mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  {stat.caption}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Codes Table */}
      <Card className="border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Namaste Codes ({filteredCodes.length} results)</CardTitle>
        </CardHeader>
        <CardContent className="rounded-3xl border border-white/70 bg-white/95 p-0 shadow-lg shadow-blue-100/30">
          <div className="overflow-x-auto rounded-3xl">
            <Table className="text-sm">
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
                      <div className="truncate text-slate-600" title={code.description}>
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
                    <TableCell className="text-slate-500">
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