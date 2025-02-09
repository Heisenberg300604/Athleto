"use client"

import { useState } from 'react';
import { BrandSidebar } from '@/components/BrandProfileSidebar';
import { BrandProfileView } from '@/components/BrandProfileView';
import BrandProfileForm from '@/components/BrandProfileEdit';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import BrandNavbar from '@/components/BrandNavbar';
import BrandProfileInfo from '@/components/BrandProfileInfo';

export default function BrandProfile() {
  const [currentView, setCurrentView] = useState('brand-info');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock profile data - replace with real data source
  const [profileData, setProfileData] = useState({
    status: 'declined',
    companyName: 'Delhi Sports Organization',
    industry: 'Technology',
    location: 'San Francisco, CA',
    about: 'The Mahindra Scorpio is a mid-size SUV (in the Indian market) and Compact SUV (in the Global market) manufactured by the Indian automaker Mahindra & Mahindra since 2002. It was Mahindras first model to be built for the global market.The Mahindra Scorpio N is a prime example of luxury on wheels at an affordable price point. Its a dream car for many, known as one of the most desired mafia cars in India. With its robust build quality, powerful and well-tuned engine, spacious interior, and premium looks, it stands out.'
  });

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleSave = (newData: any) => {
    setProfileData({ ...profileData, ...newData });
    setIsEditing(false);
  };

  const renderMainContent = () => {
    if (isEditing) {
      return (
        <BrandProfileForm  
          // existing props
        />
      );
    }
  
    switch (currentView) {
      case 'profile-info':
        return (
          <BrandProfileInfo 
            initialData={{
              firstName: 'John', // Replace with actual data
              lastName: 'Doe',
              email: 'john@gmail.com',
              phone: '+1 234 567 8900',
              // socialLinks: {
              //   instagram: 'username',
              //   twitter: 'username',
              //   linkedin: 'username',
              //   website: 'www.example.com'
              // }
            }}
            // onEdit={() => setIsEditing(true)}
          />
        );
      default:
        return (
          <BrandProfileView
            onEdit={() => setIsEditing(true)}
            profileData={profileData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profileData.status === 'declined' && (
          <Alert variant="destructive" className="mb-12 border-none">
           {/* <AlertTriangle className="h-4 w-4 mb-12" /> */}
            <AlertDescription>
              Verification request was declined. Please <a href="/support" className="underline font-medium">contact support</a> for assistance.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <BrandSidebar
              currentView={currentView}
              onViewChange={setCurrentView}
              isEditing={isEditing}
              profileImage={profileImage}
              onImageUpload={handleImageUpload}
            />
          </div>
          <div className="md:col-span-2">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  );
}