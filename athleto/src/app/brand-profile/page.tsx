"use client"

import { useState } from 'react';
import { BrandSidebar } from '@/components/BrandProfileSidebar';
import { BrandProfileView } from '@/components/BrandProfileView';
import BrandProfileForm from '@/components/BrandProfileEdit';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import BrandNavbar from '@/components/BrandNavbar';

export default function BrandProfile() {
  const [currentView, setCurrentView] = useState('brand-info');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Mock profile data - replace with real data source
  const [profileData, setProfileData] = useState({
    status: 'declined',
    companyName: 'Acme Corp',
    industry: 'Technology',
    location: 'San Francisco, CA',
    about: 'Leading technology solutions provider...'
  });

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };


  const renderMainContent = () => {
    if (isEditing) {
      return (
        <BrandProfileForm  
       //   onSave={handleSave}
        //  onCancel={() => setIsEditing(false)}
       //   initialData={profileData}
        />
      );
    }

    return (
      <BrandProfileView
        onEdit={() => setIsEditing(true)}
        profileData={profileData}
      />
    );
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