'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CreateScholarshipForm from '@/components/brand-scholarships/CreateScholarshipForm';
import ApplicationsList from '@/components/brand-scholarships/ApplicationsList';
import DisbursementTracker from '@/components/brand-scholarships/DisbursementTracker';
import VerificationPanel from '@/components/brand-scholarships/VerificationPanel';
import { Tab } from '@headlessui/react';
import BrandNavbar from '@/components/BrandNavbar';

// TypeScript interfaces
export interface Scholarship {
  id: string;
  name: string;
  type: 'Scholarship' | 'Grant';
  amount: number;
  eligibilityCriteria: string[];
  deadline: string;
  purpose: string;
  requiredDocuments: string[];
  createdAt: string;
  status: 'Active' | 'Closed' | 'Draft';
  brandId: string;
}

export interface Application {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  athleteId: string;
  athleteName: string;
  athleteProfile: {
    sport: string;
    level: string;
    achievements: string[];
    profileImage: string;
  };
  submittedDocuments: {
    name: string;
    url: string;
    verified: boolean;
  }[];
  status: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed' | 'Completed';
  appliedDate: string;
  notes: string;
}

export interface Disbursement {
  id: string;
  applicationId: string;
  scholarshipId: string;
  athleteId: string;
  athleteName: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  milestoneDescription: string;
  disbursementDate: string | null;
  transactionId: string | null;
}

const BrandScholarshipsPage = () => {
  const [activeScholarships, setActiveScholarships] = useState<Scholarship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching from Supabase
    const fetchData = async () => {
      try {
        // Mock data - in a real app, this would be fetched from Supabase
        setActiveScholarships([
          {
            id: 'sch-1',
            name: 'Youth Cricket Development Program',
            type: 'Scholarship',
            amount: 50000,
            eligibilityCriteria: ['Under 18', 'State level player', 'Cricket'],
            deadline: '2025-05-30',
            purpose: 'Training and equipment support',
            requiredDocuments: ['Achievement certificates', 'Income proof', 'Coach recommendation'],
            createdAt: '2025-01-15',
            status: 'Active',
            brandId: 'brand-123',
          },
          {
            id: 'sch-2',
            name: 'Elite Athlete Sponsorship',
            type: 'Grant',
            amount: 100000,
            eligibilityCriteria: ['National level player', 'Any sport', 'Age 16-30'],
            deadline: '2025-04-15',
            purpose: 'International competition funding',
            requiredDocuments: ['National certificates', 'Training plan', 'Budget proposal'],
            createdAt: '2025-02-10',
            status: 'Active',
            brandId: 'brand-123',
          },
        ]);

        setApplications([
          {
            id: 'app-1',
            scholarshipId: 'sch-1',
            scholarshipName: 'Youth Cricket Development Program',
            athleteId: 'ath-1',
            athleteName: 'Rahul Sharma',
            athleteProfile: {
              sport: 'Cricket',
              level: 'State',
              achievements: ['Under-16 State Championship Winner', 'Best Bowler Award 2024'],
              profileImage: '/athlete.jpeg',
            },
            submittedDocuments: [
              { name: 'Achievement Certificate', url: '#', verified: true },
              { name: 'Income Statement', url: '#', verified: false },
              { name: 'Coach Recommendation', url: '#', verified: true },
            ],
            status: 'Pending',
            appliedDate: '2025-02-10',
            notes: '',
          },
          {
            id: 'app-2',
            scholarshipId: 'sch-2',
            scholarshipName: 'Elite Athlete Sponsorship',
            athleteId: 'ath-2',
            athleteName: 'Priya Patel',
            athleteProfile: {
              sport: 'Badminton',
              level: 'National',
              achievements: ['National Junior Champion 2024', 'International Tournament Bronze Medalist'],
              profileImage: '/athlete.jpeg',
            },
            submittedDocuments: [
              { name: 'National Certificate', url: '#', verified: true },
              { name: 'Training Plan', url: '#', verified: true },
              { name: 'Budget Proposal', url: '#', verified: true },
            ],
            status: 'Approved',
            appliedDate: '2025-02-05',
            notes: 'Exceptional talent with international potential',
          },
        ]);

        setDisbursements([
          {
            id: 'dis-1',
            applicationId: 'app-2',
            scholarshipId: 'sch-2',
            athleteId: 'ath-2',
            athleteName: 'Priya Patel',
            amount: 50000, // First milestone payment
            status: 'Completed',
            milestoneDescription: 'Initial training phase funding',
            disbursementDate: '2025-02-20',
            transactionId: 'txn-12345',
          },
          {
            id: 'dis-2',
            applicationId: 'app-2',
            scholarshipId: 'sch-2',
            athleteId: 'ath-2',
            athleteName: 'Priya Patel',
            amount: 50000, // Second milestone payment
            status: 'Pending',
            milestoneDescription: 'International competition preparation',
            disbursementDate: null,
            transactionId: null,
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="min-h-screen bg-gray-50">
      <BrandNavbar  />

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Scholarships & Grants Management</h1>
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
          <Tab className={({ selected }: { selected: boolean }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'}`
          }>
            Create New
          </Tab>
          <Tab className={({ selected }: { selected: boolean }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'}`
          }>
            Applications
          </Tab>
          <Tab className={({ selected }: { selected: boolean }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'}`
          }>
            Disbursements
          </Tab>
          <Tab className={({ selected }: { selected: boolean }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
            ${selected ? 'bg-white shadow' : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'}`
          }>
            Verification
          </Tab>
        </Tab.List>
        
        <Tab.Panels className="mt-2">
          <Tab.Panel className="rounded-xl bg-white p-3">
            <CreateScholarshipForm 
              onScholarshipCreated={(newScholarship: Scholarship) => {
                setActiveScholarships(prev => [...prev, newScholarship]);
                toast.success('Scholarship created successfully!');
              }}
            />
          </Tab.Panel>
          
          <Tab.Panel className="rounded-xl bg-white p-3">
            <ApplicationsList 
              applications={applications}
              onApplicationStatusUpdate={(id: string, newStatus: Application['status']) => {
                setApplications(prev => 
                  prev.map(app => app.id === id ? {...app, status: newStatus} : app)
                );
                
                if (newStatus === 'Approved') {
                  // Create initial disbursement for approved applications
                  const application = applications.find(app => app.id === id);
                  if (application) {
                    const scholarship = activeScholarships.find(s => s.id === application.scholarshipId);
                    if (scholarship) {
                      const newDisbursement: Disbursement = {
                        id: `dis-${Date.now()}`,
                        applicationId: application.id,
                        scholarshipId: application.scholarshipId,
                        athleteId: application.athleteId,
                        athleteName: application.athleteName,
                        amount: scholarship.amount / 2, // First milestone payment
                        status: 'Pending',
                        milestoneDescription: 'Initial funding milestone',
                        disbursementDate: null,
                        transactionId: null,
                      };
                      
                      setDisbursements(prev => [...prev, newDisbursement]);
                    }
                  }
                }
                
                toast.success(`Application ${newStatus.toLowerCase()}`);
              }}
            />
          </Tab.Panel>
          
          <Tab.Panel className="rounded-xl bg-white p-3">
            <DisbursementTracker 
              disbursements={disbursements}
              onDisbursementStatusUpdate={(id: string, newStatus: Disbursement['status']) => {
                setDisbursements(prev => 
                  prev.map(dis => {
                    if (dis.id === id) {
                      const updatedDis = {
                        ...dis, 
                        status: newStatus
                      };
                      
                      if (newStatus === 'Completed') {
                        updatedDis.disbursementDate = new Date().toISOString();
                        updatedDis.transactionId = `txn-${Math.floor(Math.random() * 100000)}`;
                      }
                      
                      return updatedDis;
                    }
                    return dis;
                  })
                );
                
                toast.success(`Payment ${newStatus === 'Completed' ? 'processed successfully' : 'status updated'}`);
              }}
            />
          </Tab.Panel>
          
          <Tab.Panel className="rounded-xl bg-white p-3">
            <VerificationPanel 
              applications={applications}
              onDocumentVerify={(applicationId: string, documentName: string, isVerified: boolean) => {
                setApplications(prev => 
                  prev.map(app => {
                    if (app.id === applicationId) {
                      const updatedDocs = app.submittedDocuments.map(doc => 
                        doc.name === documentName ? {...doc, verified: isVerified} : doc
                      );
                      return {...app, submittedDocuments: updatedDocs};
                    }
                    return app;
                  })
                );
                
                toast.success(`Document ${isVerified ? 'verified' : 'marked as unverified'}`);
              }}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
    </div>
  );
};

export default BrandScholarshipsPage;