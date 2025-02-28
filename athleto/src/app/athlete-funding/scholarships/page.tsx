// app/athlete/scholarships/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Scholarship, FilterOptions } from '@/types/sco';
import toast from 'react-hot-toast';
import ScholarshipCard from '@/components/athlete-scholarships/ScholarshipCard';
import GrantCard from '@/components/athlete-scholarships/GrantCard';
import FilterSection from '@/components/athlete-scholarships/FilterSection';
import ApplicationTracker from '@/components/athlete-scholarships/ApplicationTracker';
import AthleteNavbar from '@/components/AthleteNavbar';

// Mock data for demonstration
const mockScholarships: Scholarship[] = [
  {
    id: '1',
    name: 'Olympic Training Fund',
    provider: 'Ministry of Sports',
    providerType: 'government',
    providerLogo: '/athlete.jpeg',
    type: 'training',
    amount: 50000,
    description: 'Financial support for Olympic-level training programs and coaching.',
    eligibilityCriteria: {
      level: 'national',
      sportTypes: ['Athletics', 'Swimming', 'Wrestling'],
      otherRequirements: 'Must have participated in national championships'
    },
    deadline: new Date('2025-06-30'),
    applicationCount: 143,
    availablePositions: 20,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
    isVerified: true
  },
  {
    id: '2',
    name: 'Rising Stars Program',
    provider: 'Nike',
    providerType: 'brand',
    providerLogo: '/athlete.jpeg',
    type: 'sponsorship',
    amount: 75000,
    description: 'Sponsorship program for emerging athletes showing exceptional promise.',
    eligibilityCriteria: {
      ageRange: {
        min: 16,
        max: 21
      },
      level: 'state',
      sportTypes: ['Basketball', 'Football', 'Tennis']
    },
    deadline: new Date('2025-04-15'),
    applicationCount: 205,
    availablePositions: 15,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-20'),
    isVerified: true
  },
  {
    id: '3',
    name: 'Sports Excellence Scholarship',
    provider: 'Laureus Foundation',
    providerType: 'ngo',
    providerLogo: '/athlete.jpeg',
    type: 'education',
    amount: 100000,
    description: 'Academic scholarships for student athletes pursuing higher education.',
    eligibilityCriteria: {
      level: 'state',
      academicRequirements: 'Minimum 80% in previous academic year'
    },
    deadline: new Date('2025-05-31'),
    applicationCount: 89,
    availablePositions: 10,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05'),
    isVerified: true
  }
];

// Mock data for athlete's applications
const mockApplications = [
  {
    id: '1',
    scholarshipId: '1',
    scholarshipName: 'Olympic Training Fund',
    provider: 'Ministry of Sports',
    providerLogo: '/athlete.jpeg',
    amount: 50000,
    appliedDate: new Date('2025-02-10'),
    status: 'review' as 'review',
    nextStep: 'Waiting for review'
  },
  {
    id: '2',
    scholarshipId: '3',
    scholarshipName: 'Sports Excellence Scholarship',
    provider: 'Laureus Foundation',
    providerLogo: '/athlete.jpeg',
    amount: 100000,
    appliedDate: new Date('2025-01-20'),
    status: 'approved' as 'approved',
    nextStep: 'Document verification pending',
    milestones: [
      {
        id: 'm1',
        amount: 25000,
        description: 'Initial payment',
        status: 'completed' as 'completed',
        releaseDate: new Date('2025-02-01')
      },
      {
        id: 'm2',
        amount: 50000,
        description: 'Mid-term payment',
        status: 'pending' as 'pending',
        dueDate: new Date('2025-06-01')
      },
      {
        id: 'm3',
        amount: 25000,
        description: 'Final payment',
        status: 'pending' as 'pending',
        dueDate: new Date('2025-12-01')
      }
    ]
  }
];

export default function AthleteScholarshipsPage() {
  const [activeTab, setActiveTab] = useState<'scholarships' | 'grants' | 'applications'>('scholarships');
  const [scholarships, setScholarships] = useState<Scholarship[]>(mockScholarships);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch scholarships/grants
    setIsLoading(true);
    setTimeout(() => {
      // Apply filters and search query
      let filtered = [...mockScholarships];
      
      if (searchQuery) {
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.provider.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      if (filters.type && filters.type.length > 0) {
        filtered = filtered.filter(s => filters.type?.includes(s.type));
      }
      
      if (filters.providerType && filters.providerType.length > 0) {
        filtered = filtered.filter(s => filters.providerType?.includes(s.providerType));
      }
      
      if (filters.amountRange) {
        if (filters.amountRange.min) {
          filtered = filtered.filter(s => s.amount >= (filters.amountRange?.min || 0));
        }
        if (filters.amountRange.max) {
          filtered = filtered.filter(s => s.amount <= (filters.amountRange?.max || Infinity));
        }
      }
      
      setScholarships(filtered);
      setIsLoading(false);
    }, 500);
  }, [filters, searchQuery]);

  const handleApply = (scholarshipId: string) => {
    toast.success('Redirecting to application form');
    // Navigate to application form
    window.location.href = `/athlete/scholarships/${scholarshipId}`;
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Scholarships & Grants Portal</h1>
          <p className="text-gray-600 mb-6">
            Find financial support for your sports career and education through scholarships and grants from government agencies, brands, and NGOs.
          </p>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                className={`pb-4 px-1 ${activeTab === 'scholarships' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('scholarships')}
              >
                Scholarships
              </button>
              <button
                className={`pb-4 px-1 ${activeTab === 'grants' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('grants')}
              >
                Grants & Sponsorships
              </button>
              <button
                className={`pb-4 px-1 ${activeTab === 'applications' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
                onClick={() => setActiveTab('applications')}
              >
                My Applications
              </button>
            </div>
          </div>
          
          {/* Search and Filter Section */}
          {activeTab !== 'applications' && (
            <FilterSection 
              onFilterChange={handleFilterChange} 
              onSearch={handleSearch}
              activeTab={activeTab}
            />
          )}
          
          {/* Content based on active tab */}
          <div className="mt-8">
            {activeTab === 'scholarships' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
                  ))
                ) : scholarships.filter(s => s.type === 'education' || s.type === 'training').length > 0 ? (
                  scholarships
                    .filter(s => s.type === 'education' || s.type === 'training')
                    .map(scholarship => (
                      <ScholarshipCard 
                        key={scholarship.id}
                        scholarship={scholarship}
                        onApply={handleApply}
                      />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No scholarships found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'grants' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-lg"></div>
                  ))
                ) : scholarships.filter(s => s.type === 'sponsorship' || s.type === 'financial_aid' || s.type === 'equipment' || s.type === 'travel').length > 0 ? (
                  scholarships
                    .filter(s => s.type === 'sponsorship' || s.type === 'financial_aid' || s.type === 'equipment' || s.type === 'travel')
                    .map(grant => (
                      <GrantCard 
                        key={grant.id}
                        grant={grant}
                        onApply={handleApply}
                      />
                    ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No grants or sponsorships found matching your criteria.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'applications' && (
              <ApplicationTracker applications={mockApplications} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}