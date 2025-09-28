import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Check,
  X,
  AlertCircle,
  Download,
  Globe2,
  Stethoscope,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Mappings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Categories");

  const mappingsData = [
    {
      id: "MAP-001",
      namasteCode: "NAM001",
      namasteDescription: "Anxiety disorder, generalized",
      icd11Code: "MG30.0",
      icd11Description: "Generalized anxiety disorder",
      mappingType: "Exact Match",
      confidence: 95,
      status: "Approved",
      reviewer: "Dr. Smith",
      dateCreated: "2024-09-15",
      lastReviewed: "2024-09-20",
    },
    {
      id: "MAP-002",
      namasteCode: "NAM002",
      namasteDescription: "Hypertension, essential",
      icd11Code: "BA00",
      icd11Description: "Essential hypertension",
      mappingType: "Exact Match",
      confidence: 98,
      status: "Approved",
      reviewer: "Dr. Johnson",
      dateCreated: "2024-09-14",
      lastReviewed: "2024-09-19",
    },
    {
      id: "MAP-003",
      namasteCode: "NAM003",
      namasteDescription: "Diabetes mellitus, type 2",
      icd11Code: "5A11",
      icd11Description: "Type 2 diabetes mellitus",
      mappingType: "Close Match",
      confidence: 87,
      status: "Under Review",
      reviewer: "Dr. Wilson",
      dateCreated: "2024-09-13",
      lastReviewed: "2024-09-18",
    },
    {
      id: "MAP-004",
      namasteCode: "NAM004",
      namasteDescription: "Chronic obstructive pulmonary disease",
      icd11Code: "CA22",
      icd11Description: "Chronic obstructive pulmonary disease",
      mappingType: "Exact Match",
      confidence: 96,
      status: "Approved",
      reviewer: "Dr. Davis",
      dateCreated: "2024-09-12",
      lastReviewed: "2024-09-17",
    },
    {
      id: "MAP-005",
      namasteCode: "NAM005",
      namasteDescription: "Rheumatoid arthritis",
      icd11Code: "FA20.0",
      icd11Description: "Rheumatoid arthritis, unspecified",
      mappingType: "Partial Match",
      confidence: 75,
      status: "Pending Review",
      reviewer: null,
      dateCreated: "2024-09-11",
      lastReviewed: null,
    },
  ];

  const statuses = ["All Categories", "Approved", "Under Review", "Pending Review", "Rejected"];

  const filteredMappings = mappingsData.filter((mapping) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      mapping.namasteCode.toLowerCase().includes(term) ||
      mapping.icd11Code.toLowerCase().includes(term) ||
      mapping.namasteDescription.toLowerCase().includes(term) ||
      mapping.icd11Description.toLowerCase().includes(term);
    const matchesStatus = selectedStatus === "All Categories" || mapping.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statHighlights: Array<{
    label: string;
    value: string;
    caption: string;
    accent: string;
    icon: LucideIcon;
  }> = [
    {
      label: "Total Mappings",
      value: "6,234",
      caption: "Bridged therapeutic linkages",
      accent: "bg-blue-50 border-blue-200 text-blue-700",
      icon: Globe2,
    },
    {
      label: "Approved Pathways",
      value: "5,123",
      caption: "Clinical governance aligned",
      accent: "bg-green-50 border-green-200 text-green-700",
      icon: ShieldCheck,
    },
    {
      label: "Under Review",
      value: "892",
      caption: "Experts validating therapies",
      accent: "bg-amber-50 border-amber-200 text-amber-700",
      icon: Stethoscope,
    },
    {
      label: "Avg. Confidence",
      value: "89%",
      caption: "Weighted by reviewer certainty",
      accent: "bg-slate-50 border-slate-200 text-slate-700",
      icon: Sparkles,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700";
      case "Under Review":
        return "bg-amber-100 text-amber-700";
      case "Pending Review":
        return "bg-indigo-100 text-indigo-700";
      case "Rejected":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getMappingTypeColor = (type: string) => {
    switch (type) {
      case "Exact Match":
        return "bg-emerald-100 text-emerald-700";
      case "Close Match":
        return "bg-amber-100 text-amber-700";
      case "Partial Match":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-emerald-600";
    if (confidence >= 75) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <h1 className="text-2xl font-semibold text-slate-900">Code Mappings</h1>
          <p className="text-sm text-slate-500">
            Manage NAMASTE ↔ TM2/ICD-11 alignments, governance checks, and runtime confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="flex items-center gap-2"
        >
          <Button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-green-300 hover:text-green-600">
            <Download className="h-4 w-4" />
            Export evidence
          </Button>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260 }}
          >
            <Plus className="h-4 w-4" />
            Create mapping
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-none bg-transparent">
          <CardContent className="flex flex-col space-y-4 rounded-lg bg-white border border-slate-200 p-6 shadow-sm sm:flex-row sm:space-y-0 sm:space-x-4">
            <motion.div
              className="relative flex-1"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                placeholder="Search mappings, codes, descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-2xl border-slate-200/70 bg-white/95 pl-10 text-sm shadow-sm shadow-amber-100/30"
              />
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600">
                {selectedStatus}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-lg shadow-blue-100/40">
                <DropdownMenuLabel className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status filters
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1 h-px bg-slate-200/60" />
                {statuses.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setSelectedStatus(cat)}
                    className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition hover:bg-amber-50 hover:text-amber-600 ${
                      cat === selectedStatus ? "bg-amber-100/70 text-amber-700 font-semibold" : "text-slate-600"
                    }`}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.08 }}
            >
              <Button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-green-300 hover:text-green-600">
                <Filter className="h-4 w-4" />
                More filters
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">
                      {stat.value}
                    </p>
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

      <Card className="border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">Mapping Quality Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {[
              {
                label: "Exact Match",
                value: "3,245 (52%)",
                percent: 52,
                color: "bg-green-500",
                accent: "bg-green-50 border-green-200 text-green-700",
              },
              {
                label: "Close Match",
                value: "2,234 (36%)",
                percent: 36,
                color: "bg-amber-500",
                accent: "bg-amber-50 border-amber-200 text-amber-700",
              },
              {
                label: "Partial Match",
                value: "755 (12%)",
                percent: 12,
                color: "bg-red-500",
                accent: "bg-red-50 border-red-200 text-red-700",
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                className={`group relative overflow-hidden rounded-lg border bg-white p-5 shadow-sm ${item.accent}`}
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              >
                <div className="absolute left-4 top-0 h-0.5 w-8 bg-green-500" />
                <div className="relative flex items-center justify-between text-sm text-slate-600">
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-900">{item.value}</span>
                </div>
                <div className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className={`${item.color} h-full rounded-full`}
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

      <Card className="border-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900">
            Code Mappings ({filteredMappings.length} results)
          </CardTitle>
        </CardHeader>
        <CardContent className="rounded-3xl border border-white/70 bg-white/95 p-0 shadow-lg shadow-blue-100/30">
          <div className="overflow-x-auto rounded-3xl">
            <Table className="text-sm">
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
                  <TableRow key={mapping.id} className="align-top">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-mono font-medium text-slate-900">{mapping.namasteCode}</div>
                        <div className="max-w-xs truncate text-sm text-slate-600">{mapping.namasteDescription}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-mono font-medium text-slate-900">{mapping.icd11Code}</div>
                        <div className="max-w-xs truncate text-sm text-slate-600">{mapping.icd11Description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getMappingTypeColor(mapping.mappingType)} rounded-full px-3 py-1 text-xs font-semibold`}>
                        {mapping.mappingType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getConfidenceColor(mapping.confidence)}`}>
                          {mapping.confidence}%
                        </span>
                        {mapping.confidence >= 90 && <Check className="h-4 w-4 text-emerald-600" />}
                        {mapping.confidence < 75 && <AlertCircle className="h-4 w-4 text-rose-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(mapping.status)} rounded-full px-3 py-1 text-xs font-semibold`}>
                        {mapping.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {mapping.reviewer || "Unassigned"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {mapping.status === "Pending Review" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-emerald-600">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-rose-600">
                              <X className="h-4 w-4" />
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