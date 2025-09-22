import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { 
  Download, 
  File, 
  Database, 
  Calendar, 
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  FileJson,
  FileText,
  Archive
} from 'lucide-react';

export function FHIRDownloads() {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days');
  const [includeNamaste, setIncludeNamaste] = useState(true);
  const [includeICD11, setIncludeICD11] = useState(true);
  const [includeMappings, setIncludeMappings] = useState(true);
  const [includePatients, setIncludePatients] = useState(false);

  // Mock data for download history
  const downloadHistory = [
    {
      id: 'DL-001',
      filename: 'fhir_export_2024_09_20.json',
      format: 'JSON',
      size: '45.2 MB',
      recordCount: 12847,
      status: 'Completed',
      createdAt: '2024-09-20 14:30',
      downloadedAt: '2024-09-20 14:32',
      expiresAt: '2024-10-20',
      includes: ['Namaste Codes', 'ICD-11 Codes', 'Mappings']
    },
    {
      id: 'DL-002',
      filename: 'code_mappings_2024_09_19.xml',
      format: 'XML',
      size: '23.7 MB',
      recordCount: 6234,
      status: 'Completed',
      createdAt: '2024-09-19 10:15',
      downloadedAt: '2024-09-19 10:17',
      expiresAt: '2024-10-19',
      includes: ['Mappings Only']
    },
    {
      id: 'DL-003',
      filename: 'patient_data_export.json',
      format: 'JSON',
      size: '12.4 MB',
      recordCount: 1456,
      status: 'Processing',
      createdAt: '2024-09-22 09:45',
      downloadedAt: null,
      expiresAt: '2024-10-22',
      includes: ['Patient Records', 'Clinical Notes']
    },
    {
      id: 'DL-004',
      filename: 'full_export_2024_09_15.json',
      format: 'JSON',
      size: '89.1 MB',
      recordCount: 28547,
      status: 'Failed',
      createdAt: '2024-09-15 16:20',
      downloadedAt: null,
      expiresAt: '2024-10-15',
      includes: ['All Data']
    }
  ];

  const datasetSizes = {
    namaste: { records: 12847, size: '15.2 MB' },
    icd11: { records: 8652, size: '12.8 MB' },
    mappings: { records: 6234, size: '8.9 MB' },
    patients: { records: 1456, size: '18.5 MB' }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Processing': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'json': return <FileJson className="w-4 h-4 text-blue-600" />;
      case 'xml': return <FileText className="w-4 h-4 text-green-600" />;
      case 'csv': return <File className="w-4 h-4 text-orange-600" />;
      default: return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  const calculateEstimatedSize = () => {
    let totalSize = 0;
    let totalRecords = 0;

    if (includeNamaste) {
      totalRecords += datasetSizes.namaste.records;
      totalSize += 15.2;
    }
    if (includeICD11) {
      totalRecords += datasetSizes.icd11.records;
      totalSize += 12.8;
    }
    if (includeMappings) {
      totalRecords += datasetSizes.mappings.records;
      totalSize += 8.9;
    }
    if (includePatients) {
      totalRecords += datasetSizes.patients.records;
      totalSize += 18.5;
    }

    return { records: totalRecords, size: totalSize.toFixed(1) };
  };

  const estimated = calculateEstimatedSize();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">FHIR Downloads</h1>
          <p className="text-muted-foreground">
            Export medical codes, mappings, and patient data in FHIR-compliant formats
          </p>
        </div>
      </div>

      {/* Export Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Export Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Selection */}
            <div className="space-y-4">
              <h3 className="font-medium">Select Data to Include</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includeNamaste}
                      onCheckedChange={setIncludeNamaste}
                    />
                    <label className="text-sm">Namaste Codes</label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {datasetSizes.namaste.records} records, {datasetSizes.namaste.size}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includeICD11}
                      onCheckedChange={setIncludeICD11}
                    />
                    <label className="text-sm">ICD-11/TM2 Codes</label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {datasetSizes.icd11.records} records, {datasetSizes.icd11.size}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includeMappings}
                      onCheckedChange={setIncludeMappings}
                    />
                    <label className="text-sm">Code Mappings</label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {datasetSizes.mappings.records} records, {datasetSizes.mappings.size}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      checked={includePatients}
                      onCheckedChange={setIncludePatients}
                    />
                    <label className="text-sm">Patient Records</label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {datasetSizes.patients.records} records, {datasetSizes.patients.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="font-medium">Export Format</h3>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON (FHIR R4)</SelectItem>
                  <SelectItem value="xml">XML (FHIR R4)</SelectItem>
                  <SelectItem value="csv">CSV (Simplified)</SelectItem>
                  <SelectItem value="ndjson">NDJSON (Bulk Data)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <h3 className="font-medium">Date Range</h3>
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Export Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Archive className="w-5 h-5" />
              <span>Export Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estimated Records</span>
                <span className="font-medium">{estimated.records.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estimated Size</span>
                <span className="font-medium">{estimated.size} MB</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Format</span>
                <span className="font-medium uppercase">{selectedFormat}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">FHIR Version</span>
                <span className="font-medium">R4</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Export Contents</h4>
              <div className="space-y-2">
                {includeNamaste && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Namaste Classification Codes</span>
                  </div>
                )}
                {includeICD11 && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>ICD-11/TM2 Codes</span>
                  </div>
                )}
                {includeMappings && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Code Mappings & Relationships</span>
                  </div>
                )}
                {includePatients && (
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Patient Records (Anonymized)</span>
                  </div>
                )}
              </div>
            </div>

            <Button 
              className="w-full flex items-center space-x-2" 
              size="lg"
              disabled={!includeNamaste && !includeICD11 && !includeMappings && !includePatients}
            >
              <Download className="w-4 h-4" />
              <span>Generate Export</span>
            </Button>

            <p className="text-xs text-muted-foreground">
              Export will be processed in the background. Large exports may take several minutes.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Download History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Download History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloadHistory.map((download) => (
              <div key={download.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFormatIcon(download.format)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{download.filename}</span>
                        <Badge className={getStatusColor(download.status)}>
                          {download.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{download.size}</span>
                        <span>{download.recordCount.toLocaleString()} records</span>
                        <span>Created {download.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(download.status)}
                    {download.status === 'Completed' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    {download.status === 'Processing' && (
                      <div className="flex items-center space-x-2">
                        <Progress value={65} className="w-24" />
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-sm text-muted-foreground">
                    Includes: {download.includes.join(', ')}
                  </div>
                  {download.status === 'Completed' && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Expires {download.expiresAt}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}