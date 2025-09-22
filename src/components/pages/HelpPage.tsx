import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { 
  Search, 
  Book, 
  Code, 
  Map, 
  Download, 
  HelpCircle,
  ExternalLink,
  FileText,
  Video,
  MessageCircle,
  Mail,
  Phone,
  Users,
  Lightbulb
} from 'lucide-react';

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const quickGuides = [
    {
      title: 'Getting Started with Code Mapping',
      description: 'Learn the basics of mapping Namaste codes to ICD-11',
      icon: Map,
      time: '5 min read',
      tags: ['Beginner', 'Mapping']
    },
    {
      title: 'Understanding FHIR Exports',
      description: 'How to export data in FHIR-compliant formats',
      icon: Download,
      time: '3 min read',
      tags: ['FHIR', 'Export']
    },
    {
      title: 'Managing Patient Records',
      description: 'Best practices for patient data management',
      icon: Users,
      time: '7 min read',
      tags: ['Patients', 'Privacy']
    },
    {
      title: 'Code Validation Process',
      description: 'How our automated validation system works',
      icon: Code,
      time: '4 min read',
      tags: ['Validation', 'Quality']
    }
  ];

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is the Code Mapping Portal?',
          answer: 'The Code Mapping Portal is a comprehensive system designed to map Namaste traditional medicine codes to WHO ICD-11 and TM2 classifications. It enables healthcare professionals to maintain standardized medical coding across different classification systems.'
        },
        {
          question: 'Who can access the portal?',
          answer: 'Access is restricted to authorized healthcare professionals, researchers, and administrators. Different user roles have varying levels of permissions based on their responsibilities.'
        },
        {
          question: 'Is patient data secure?',
          answer: 'Yes, all patient data is encrypted, anonymized where possible, and stored in compliance with healthcare data protection regulations including HIPAA and GDPR.'
        }
      ]
    },
    {
      category: 'Code Mapping',
      questions: [
        {
          question: 'How accurate are the automated mappings?',
          answer: 'Our automated mapping system achieves an average confidence score of 89%. All mappings are reviewed by qualified healthcare professionals before approval.'
        },
        {
          question: 'Can I create custom mappings?',
          answer: 'Yes, authorized users can create, edit, and review custom mappings. All changes are logged in the audit system for traceability.'
        },
        {
          question: 'What happens if a mapping is disputed?',
          answer: 'Disputed mappings enter a review workflow where multiple clinicians can provide input. The final decision is made by senior clinical staff.'
        }
      ]
    },
    {
      category: 'FHIR Export',
      questions: [
        {
          question: 'What FHIR version is supported?',
          answer: 'We currently support FHIR R4, which is the most widely adopted version in healthcare interoperability.'
        },
        {
          question: 'How large can exports be?',
          answer: 'There is no strict limit on export size, but large exports (>100MB) are processed in the background and may take several minutes to complete.'
        },
        {
          question: 'Can I schedule automated exports?',
          answer: 'Automated exports are available for administrative users. Contact your system administrator to set up scheduled exports.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'Which browsers are supported?',
          answer: 'The portal supports modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. Internet Explorer is not supported.'
        },
        {
          question: 'Is there an API available?',
          answer: 'Yes, we provide a RESTful API built with FastAPI for programmatic access to the mapping data. API documentation is available in the developer section.'
        },
        {
          question: 'How often is the data updated?',
          answer: 'ICD-11 codes are synchronized with WHO updates quarterly. Namaste codes and mappings are updated in real-time as changes are made by users.'
        }
      ]
    }
  ];

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/namaste-codes',
      description: 'Retrieve all Namaste codes',
      parameters: ['page', 'limit', 'category', 'status']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/icd11-codes',
      description: 'Retrieve ICD-11 codes',
      parameters: ['page', 'limit', 'chapter', 'search']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/mappings',
      description: 'Retrieve code mappings',
      parameters: ['page', 'limit', 'status', 'confidence_min']
    },
    {
      method: 'POST',
      endpoint: '/api/v1/mappings',
      description: 'Create a new mapping',
      parameters: ['namaste_code', 'icd11_code', 'mapping_type']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/fhir/export',
      description: 'Export data in FHIR format',
      parameters: ['format', 'include', 'date_range']
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help & Documentation</h1>
          <p className="text-muted-foreground">
            Everything you need to know about using the Code Mapping Portal
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Contact Support</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>API Docs</span>
          </Button>
        </div>
      </div>

      {/* Quick Guides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5" />
            <span>Quick Start Guides</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickGuides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.time}</span>
                        <div className="flex space-x-1">
                          {guide.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq" className="flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center space-x-2">
            <Code className="w-4 h-4" />
            <span>API</span>
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center space-x-2">
            <Video className="w-4 h-4" />
            <span>Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Content */}
          <div className="space-y-6">
            {filteredFaqs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <p className="text-sm text-muted-foreground">
                RESTful API endpoints for programmatic access to the Code Mapping Portal
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Base URL</h3>
                    <code className="text-sm text-blue-600">https://api.codemapping.hospital.com</code>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">v1</Badge>
                </div>

                <div className="space-y-3">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge 
                          className={
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="font-mono text-sm">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <Badge key={paramIndex} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Full API Documentation</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>OpenAPI Spec</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Introduction to Code Mapping', duration: '10:23', level: 'Beginner' },
                  { title: 'Advanced Mapping Techniques', duration: '15:47', level: 'Advanced' },
                  { title: 'FHIR Export Best Practices', duration: '8:32', level: 'Intermediate' },
                  { title: 'Patient Data Management', duration: '12:15', level: 'Intermediate' }
                ].map((tutorial, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-red-50 rounded-lg">
                        <Video className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                          <Badge variant="outline" className="text-xs">
                            {tutorial.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@codemapping.hospital.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available Mon-Fri 9AM-5PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Portal Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Status</span>
                  <Badge className="bg-green-100 text-green-800">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-sm text-muted-foreground">2 min ago</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Status Page
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}