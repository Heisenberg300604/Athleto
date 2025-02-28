// File: app/athlete/marketplace/page.tsx
"use client"
import React from 'react';
import { toast } from 'react-hot-toast';
import CollaborationRequests from '@/components/athlete-marketplace/CollaborationRequests';
import EarningsSummary from '@/components/athlete-marketplace/EarningsSummary';
import AthleteNavbar from '@/components/AthleteNavbar';

// Types definition
type CollaborationRequest = {
  id: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed';
  companyName: string;
  paymentAmount: number;
  duration: string;
  dateTime: string;
  description: string;
  gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
};

type Earnings = {
  totalEarned: number;
  pendingPayouts: number;
  completedGigs: number;
  payoutHistory: {
    id: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Processing' | 'Failed';
    gigType: string;
    brandName: string;
  }[];
};

export default function AthleteMarketplace() {
  // Mock data for collaboration requests
  const [collaborationRequests, setCollaborationRequests] = React.useState<CollaborationRequest[]>([
    {
      id: '1',
      status: 'Pending',
      companyName: 'Nike',
      paymentAmount: 15000,
      duration: '2 hours',
      dateTime: '2025-03-15T14:00:00',
      description: 'Host a running workshop for our new shoe launch. Share techniques and tips with attendees.',
      gigType: 'Workshop'
    },
    {
      id: '2',
      status: 'Accepted',
      companyName: 'Adidas',
      paymentAmount: 12000,
      duration: '1.5 hours',
      dateTime: '2025-03-20T16:30:00',
      description: 'Provide a product demo for our new training gear. Demonstrate exercises that showcase the features.',
      gigType: 'Demo'
    },
    {
      id: '3',
      status: 'Completed',
      companyName: 'Puma',
      paymentAmount: 18000,
      duration: '2 hours',
      dateTime: '2025-03-01T10:00:00',
      description: 'Motivational talk for our corporate team about perseverance and achieving goals.',
      gigType: 'Talk'
    }
  ]);

  // Mock data for earnings
  const [earnings, setEarnings] = React.useState<Earnings>({
    totalEarned: 45000,
    pendingPayouts: 12000,
    completedGigs: 5,
    payoutHistory: [
      {
        id: '1',
        amount: 18000,
        date: '2025-03-02',
        status: 'Completed',
        gigType: 'Talk',
        brandName: 'Puma'
      },
      {
        id: '2',
        amount: 15000,
        date: '2025-02-15',
        status: 'Completed',
        gigType: 'Training',
        brandName: 'Reebok'
      },
      {
        id: '3',
        amount: 12000,
        date: '2025-01-25',
        status: 'Completed',
        gigType: 'Workshop',
        brandName: 'Under Armour'
      }
    ]
  });

  // Handle accepting a collaboration request
  const handleAcceptRequest = (requestId: string) => {
    setCollaborationRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'Accepted' } : req
      )
    );
    toast.success('Collaboration request accepted! Brand has been notified.');
  };

  // Handle declining a collaboration request
  const handleDeclineRequest = (requestId: string) => {
    setCollaborationRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: 'Declined' } : req
      )
    );
    toast.success('Collaboration request declined. Brand has been notified.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Athlete Marketplace</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2">
            <CollaborationRequests 
              requests={collaborationRequests} 
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            <EarningsSummary earnings={earnings} />
          </div>
        </div>
      </div>
    </div>
  );
}