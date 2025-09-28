import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Search, Filter, Plus, Eye, Edit, FileText, Calendar, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export function ProfileList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Mock data for patient profiles
  const patientsData = [
    {
      id: 'PAT-001',
      patientId: 'P001234',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      lastVisit: '2024-09-20',
      status: 'Active',
      diagnoses: ['NAM001', 'NAM002'],
      notes: 'Patient shows improvement with current treatment plan.',
      totalNotes: 5,
      createdBy: 'Dr. Smith'
    },
    {
      id: 'PAT-002',
      patientId: 'P001235',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      lastVisit: '2024-09-19',
      status: 'Active',
      diagnoses: ['NAM003'],
      notes: 'Regular monitoring required for diabetes management.',
      totalNotes: 3,
      createdBy: 'Dr. Johnson'
    },
    {
      id: 'PAT-003',
      patientId: 'P001236',
      name: 'Robert Wilson',
      age: 67,
      gender: 'Male',
      lastVisit: '2024-09-18',
      status: 'Under Care',
      diagnoses: ['NAM004', 'NAM005'],
      notes: 'Multiple chronic conditions require coordinated care.',
      totalNotes: 8,
      createdBy: 'Dr. Davis'
    },
    {
      id: 'PAT-004',
      patientId: 'P001237',
      name: 'Maria Garcia',
      age: 28,
      gender: 'Female',
      lastVisit: '2024-09-15',
      status: 'Discharged',
      diagnoses: ['NAM001'],
      notes: 'Treatment completed successfully.',
      totalNotes: 2,
      createdBy: 'Dr. Wilson'
    }
  ];

  const statuses = ['all', 'Active', 'Under Care', 'Discharged', 'Inactive'];

  const filteredPatients = patientsData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Patient Records</h1>
          <p className="text-muted-foreground">
            Manage patient profiles and clinical notes for code mapping cases
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Patient Record</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients, IDs, diagnoses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2">
              {/* Dropdown Menu replacing the select */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {selectedStatus === 'all' ? 'All Statuses' : selectedStatus}
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="min-w-[180px] bg-white border rounded-md shadow-lg p-2"
                >
                  <DropdownMenuLabel className="px-2 py-1 text-gray-700 font-medium">
                    Categories
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />

                  {statuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 ${status === selectedStatus
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-700"
                        }`}
                    >
                      {status === 'all' ? 'All Statuses' : status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Filters Button */}
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
          <CardContent className="p-4 bg-[#d2edd9] rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Patients</p>
              <p className="text-2xl font-bold">1,456</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 bg-[#d2edd9] rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Cases</p>
              <p className="text-2xl font-bold text-green-600">892</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 bg-[#d2edd9] rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Under Care</p>
              <p className="text-2xl font-bold text-blue-600">234</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 bg-[#d2edd9] rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Notes</p>
              <p className="text-2xl font-bold text-purple-600">3,247</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New note added for John Doe (P001234)</p>
                  <p className="text-xs text-muted-foreground">2 hours ago by Dr. Smith</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div className="flex items-center space-x-3">
                <Plus className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">New patient record created: Maria Garcia</p>
                  <p className="text-xs text-muted-foreground">5 hours ago by Dr. Wilson</p>
                </div>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
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
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
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
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleAddNote(patient)}
                        >
                          <FileText className="w-4 h-4" />
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

      {/* Add Note Dialog (Simple version) */}
      {showNoteDialog && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add Note for {selectedPatient.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Clinical Note</label>
                <Textarea
                  placeholder="Enter clinical note..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowNoteDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setShowNoteDialog(false)}>
                  Save Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}