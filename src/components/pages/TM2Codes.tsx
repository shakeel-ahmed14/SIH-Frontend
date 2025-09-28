import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ExternalLink,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Stethoscope,
  Globe2,
  Leaf,
  Activity,
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

export function TM2Codes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("All Categories");

  const tm2CodesData = [
    {
      id: "ICD11-001",
      code: "MG30.0",
      title: "Generalized anxiety disorder",
      chapter: "Mental, behavioural or neurodevelopmental disorders",
      parent: "MG30",
      status: "Current",
      version: "ICD-11 2024",
      mappings: 5,
    },
    {
      id: "ICD11-002",
      code: "BA00",
      title: "Essential hypertension",
      chapter: "Diseases of the circulatory system",
      parent: "BA0",
      status: "Current",
      version: "ICD-11 2024",
      mappings: 8,
    },
    {
      id: "ICD11-003",
      code: "5A11",
      title: "Type 2 diabetes mellitus",
      chapter: "Endocrine, nutritional or metabolic diseases",
      parent: "5A1",
      status: "Current",
      version: "ICD-11 2024",
      mappings: 6,
    },
    {
      id: "ICD11-004",
      code: "CA22",
      title: "Chronic obstructive pulmonary disease",
      chapter: "Diseases of the respiratory system",
      parent: "CA2",
      status: "Current",
      version: "ICD-11 2024",
      mappings: 4,
    },
    {
      id: "ICD11-005",
      code: "FA20.0",
      title: "Rheumatoid arthritis, unspecified",
      chapter: "Diseases of the musculoskeletal system or connective tissue",
      parent: "FA20",
      status: "Under Review",
      version: "ICD-11 2024",
      mappings: 3,
    },
  ];

  const chapters = [
    "All Categories",
    "Mental, behavioural or neurodevelopmental disorders",
    "Diseases of the circulatory system",
    "Endocrine, nutritional or metabolic diseases",
    "Diseases of the respiratory system",
    "Diseases of the musculoskeletal system or connective tissue",
  ];

  const filteredCodes = tm2CodesData.filter((code) => {
    const matchesSearch =
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChapter = selectedChapter === "All Categories" || code.chapter === selectedChapter;
    return matchesSearch && matchesChapter;
  });

  const statHighlights: Array<{
    label: string;
    value: string;
    caption: string;
    accent: string;
    icon: LucideIcon;
  }> = [
    {
      label: "Total ICD-11 Codes",
      value: "8,652",
      caption: "Global ICD footprint",
      accent: "bg-blue-50 border-blue-200 text-blue-700",
      icon: Globe2,
    },
    {
      label: "TM2 Codes Harmonised",
      value: "1,234",
      caption: "Traditional modules mapped",
      accent: "bg-green-50 border-green-200 text-green-700",
      icon: Stethoscope,
    },
    {
      label: "Current Reference Version",
      value: "2024",
      caption: "Mortality & Morbidity track",
      accent: "bg-slate-50 border-slate-200 text-slate-700",
      icon: Activity,
    },
    {
      label: "Mapped to NAMASTE",
      value: "6,234",
      caption: "Ayurveda-informed pathways",
      accent: "bg-amber-50 border-amber-200 text-amber-700",
      icon: Leaf,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-emerald-100 text-emerald-700";
      case "Under Review":
        return "bg-amber-100 text-amber-700";
      case "Deprecated":
        return "bg-rose-100 text-rose-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">TM2/ICD-11 Codes</h1>
          <p className="text-sm text-slate-500">
            Browse WHO ICD-11 classifications and TM2 pathways with curated mapping intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-green-300 hover:text-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-4 w-4" />
            WHO Portal
          </motion.button>
          <motion.button
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-4 w-4" />
            Import Codes
          </motion.button>
        </div>
      </div>

      <Card className="border-none bg-transparent">
        <CardContent className="flex flex-col space-y-4 rounded-lg bg-white border border-slate-200 p-6 shadow-sm sm:flex-row sm:space-y-0 sm:space-x-4">
          <motion.div
            className="relative flex-1"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.02 }}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
            <Input
              placeholder="Search ICD-11 codes, titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-2xl border-slate-200/70 bg-white/95 pl-10 text-sm shadow-sm shadow-amber-100/30"
            />
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600">
              {selectedChapter}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[220px] rounded-2xl border border-slate-200/70 bg-white/95 p-2 shadow-lg shadow-blue-100/40">
              <DropdownMenuLabel className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Chapters
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 h-px bg-slate-200/60" />
              {chapters.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setSelectedChapter(cat)}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition hover:bg-amber-50 hover:text-amber-600 ${
                    cat === selectedChapter ? "bg-amber-100/70 text-amber-700 font-semibold" : "text-slate-600"
                  }`}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.08 }}
          >
            <Button className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </motion.div>
        </CardContent>
      </Card>

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

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl border border-white/70 bg-gradient-to-br from-white via-[#f5f2ff]/85 to-[#fff4e6]/80 p-6 shadow-lg shadow-blue-100/35 backdrop-blur"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">ICD-11 Release Track</p>
            <p className="text-xs text-slate-500">Mortality & Morbidity Statistics · 2024 Edition</p>
          </div>
          <Badge className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            Latest Revision
          </Badge>
        </div>
        <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-sm shadow-amber-100/25">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Maintainer</p>
            <p className="mt-1">WHO Classification & Terminologies</p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-sm shadow-amber-100/25">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next sync window</p>
            <p className="mt-1">Tonight · 23:45 IST</p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white/95 px-4 py-3 shadow-sm shadow-amber-100/25">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Delta package</p>
            <p className="mt-1">12 new TM2 respiratory mappings</p>
          </div>
        </div>
      </motion.div>

      <Card className="border-none bg-transparent">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900">
              ICD-11 Codes ({filteredCodes.length} results)
            </CardTitle>
            <Button className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-amber-300 hover:text-amber-600">
              <Download className="h-4 w-4" />
              Export snapshot
            </Button>
          </div>
        </CardHeader>
        <CardContent className="rounded-3xl border border-white/70 bg-white/95 p-0 shadow-lg shadow-blue-100/30">
          <div className="overflow-x-auto rounded-3xl">
            <Table className="text-sm">
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
                  <TableRow key={code.id} className="align-top">
                    <TableCell className="font-mono text-slate-900">{code.code}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate text-slate-600" title={code.title}>
                        {code.title}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">{code.version}</p>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate text-slate-600" title={code.chapter}>
                        {code.chapter}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-slate-700">{code.parent}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(code.status)} rounded-full px-3 py-1 text-xs font-semibold`}>
                        {code.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full px-3 py-1 text-xs font-semibold">
                        {code.mappings}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
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