import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Search, Filter, Plus, Eye, Edit, FileText } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock data
  const patientsData = [
    { id: 'PAT-001', patientId: 'P001234', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-09-20', status: 'Active', diagnoses: ['NAM001', 'NAM002'], notes: 'Patient shows improvement.', totalNotes: 5, createdBy: 'Dr. Smith' },
    { id: 'PAT-002', patientId: 'P001235', name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2024-09-19', status: 'Active', diagnoses: ['NAM003'], notes: 'Regular monitoring required.', totalNotes: 3, createdBy: 'Dr. Johnson' },
    { id: 'PAT-003', patientId: 'P001236', name: 'Robert Wilson', age: 67, gender: 'Male', lastVisit: '2024-09-18', status: 'Under Care', diagnoses: ['NAM004', 'NAM005'], notes: 'Multiple chronic conditions.', totalNotes: 8, createdBy: 'Dr. Davis' },
    { id: 'PAT-004', patientId: 'P001237', name: 'Maria Garcia', age: 28, gender: 'Female', lastVisit: '2024-09-15', status: 'Discharged', diagnoses: ['NAM001'], notes: 'Treatment completed.', totalNotes: 2, createdBy: 'Dr. Wilson' }
  ];

  const statuses = ['all', 'Active', 'Under Care', 'Discharged', 'Inactive'];

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diagnoses.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Under Care': return 'bg-blue-100 text-blue-800';
      case 'Discharged': return 'bg-gray-100 text-gray-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddNote = (patient: any) => {
    setSelectedPatient(patient);
    setShowNoteDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Records</h1>
          <p className="text-muted-foreground">
            Manage patient profiles and clinical notes for code mapping cases
          </p>
        </div>
        <motion.button
          className="flex items-center space-x-2 rounded-lg bg-green-600 px-4 py-2 text-white shadow-sm transition hover:bg-green-700"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Plus className="w-4 h-4" />
          <span>New Patient Record</span>
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex-1 relative"
              whileHover={{ scale: 1.02 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients, IDs, diagnoses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </motion.div>

            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-green-300 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {selectedStatus === 'all' ? 'All Statuses' : selectedStatus}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[180px] bg-white border border-slate-200 rounded-lg shadow-lg p-2">
                  <DropdownMenuLabel className="px-2 py-1 text-gray-700 font-medium">
                    Categories
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
                  {statuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-50 hover:text-green-600 ${
                        status === selectedStatus
                          ? "bg-green-100 text-green-700 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {status === 'all' ? 'All Statuses' : status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <motion.button
                className="flex items-center space-x-2 border border-slate-200 rounded-lg px-3 py-2 bg-white hover:border-green-300 hover:text-green-600 shadow-sm"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: "1,456", color: "text-foreground" },
          { label: "Active Cases", value: "892", color: "text-green-600" },
          { label: "Under Care", value: "234", color: "text-blue-600" },
          { label: "Total Notes", value: "3,247", color: "text-purple-600" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Patients Table */}
      <Card className='bg-white/50'>
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length} results)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Diagnoses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient, idx) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-sm text-muted-foreground">
                          by {patient.createdBy}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{patient.patientId}</TableCell>
                    <TableCell>{patient.age}y, {patient.gender}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {patient.diagnoses.map((diagnosis, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {diagnosis}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{patient.totalNotes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {patient.lastVisit}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleAddNote(patient)}>
                          <FileText className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Note Dialog */}
      <AnimatePresence>
        {showNoteDialog && selectedPatient && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full max-w-md mx-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Add Note for {selectedPatient.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Clinical Note</label>
                    <Textarea placeholder="Enter clinical note..." rows={4} className="mt-1" />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowNoteDialog(false)}>Save Note</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
