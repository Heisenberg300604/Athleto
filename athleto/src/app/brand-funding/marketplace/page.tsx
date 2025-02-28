// File: app/brand/marketplace/page.tsx
"use client"
import React from 'react';
import { toast } from 'react-hot-toast';
import AvailableAthletes from '@/components/brand-marketplace/AvailableAthletes';
import PostedRequests from '@/components/brand-marketplace/PostedRequests';
import CreateCollaborationModal from '@/components/brand-marketplace/CreateCollaborationModal';
import BrandNavbar from '@/components/BrandNavbar';

// Types definition
type Athlete = {
  id: string;
  name: string;
  sport: string;
  achievements: string[];
  followerCount: number;
  pricing: {
    workshop: number;
    demo: number;
    talk: number;
    training: number;
  };
  image: string;
};

type CollaborationRequest = {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteContact?: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed';
  gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
  dateTime: string;
  duration: string;
  paymentAmount: number;
  description: string;
};

export default function BrandMarketplace() {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [selectedAthlete, setSelectedAthlete] = React.useState<Athlete | null>(null);

  // Mock data for available athletes
  const [athletes, setAthletes] = React.useState<Athlete[]>([
    {
      id: '1',
      name: 'Virat Kohli',
      sport: 'Cricket',
      achievements: ['ICC World Cup Winner', '100+ International Centuries'],
      followerCount: 200000000,
      pricing: {
        workshop: 50000,
        demo: 40000,
        talk: 60000,
        training: 45000
      },
      image: '/athlete.jpeg'
    },
    {
      id: '2',
      name: 'PV Sindhu',
      sport: 'Badminton',
      achievements: ['Olympic Silver Medalist', 'World Champion'],
      followerCount: 15000000,
      pricing: {
        workshop: 25000,
        demo: 20000,
        talk: 30000,
        training: 22000
      },
     image: '/athlete.jpeg'
    },
    {
      id: '3',
      name: 'Neeraj Chopra',
      sport: 'Javelin Throw',
      achievements: ['Olympic Gold Medalist', 'Asian Games Gold Medalist'],
      followerCount: 10000000,
      pricing: {
        workshop: 30000,
        demo: 25000,
        talk: 35000,
        training: 28000
      },
         image: '/athlete.jpeg'
    }
  ]);

  // Mock data for posted collaboration requests
  const [postedRequests, setPostedRequests] = React.useState<CollaborationRequest[]>([
    {
      id: '1',
      athleteId: '1',
      athleteName: 'Virat Kohli',
      status: 'Pending',
      gigType: 'Workshop',
      dateTime: '2025-03-15T14:00:00',
      duration: '2 hours',
      paymentAmount: 50000,
      description: 'Host a cricket workshop for our corporate team building event.'
    },
    {
      id: '2',
      athleteId: '2',
      athleteName: 'PV Sindhu',
      status: 'Accepted',
      athleteContact: 'athlete@example.com',
      gigType: 'Talk',
      dateTime: '2025-03-20T16:30:00',
      duration: '1.5 hours',
      paymentAmount: 30000,
      description: 'Motivational talk about overcoming challenges and achieving excellence.'
    }
  ]);

  // Handle creating a new collaboration request
  const handleCreateRequest = (formData: {
    athleteId: string;
    gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
    dateTime: string;
    duration: string;
    paymentAmount: number;
    description: string;
  }) => {
    const athlete = athletes.find(a => a.id === formData.athleteId);
    
    if (!athlete) return;
    
    const newRequest: CollaborationRequest = {
      id: `${postedRequests.length + 1}`,
      athleteId: formData.athleteId,
      athleteName: athlete.name,
      status: 'Pending',
      gigType: formData.gigType,
      dateTime: formData.dateTime,
      duration: formData.duration,
      paymentAmount: formData.paymentAmount,
      description: formData.description
    };
    
    setPostedRequests(prev => [...prev, newRequest]);
    setIsCreateModalOpen(false);
    toast.success('Collaboration request sent to athlete!');
  };

  // Handle confirming completion of a gig
  const handleConfirmCompletion = (requestId: string) => {
    setPostedRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'Completed' } : req
      )
    );
    toast.success('Gig completion confirmed! Payment will be released to the athlete.');
  };

  const handleOpenModal = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setIsCreateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Brand Marketplace</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <AvailableAthletes 
              athletes={athletes} 
              onHire={handleOpenModal}
            />
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <PostedRequests 
              requests={postedRequests} 
              onConfirmCompletion={handleConfirmCompletion}
            />
          </div>
        </div>
      </div>

      {/* Create Collaboration Modal */}
      {isCreateModalOpen && selectedAthlete && (
        <CreateCollaborationModal
          athlete={selectedAthlete}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateRequest}
        />
      )}
    </div>
  );
}