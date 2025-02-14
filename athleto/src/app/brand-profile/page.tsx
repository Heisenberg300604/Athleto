// pages/brand-profile.tsx
"use client"

import { useState } from 'react';
import { BrandSidebar } from '@/components/BrandProfileSidebar';
import { BrandProfileView } from '@/components/BrandProfileView';
import BrandProfileForm from '@/components/BrandProfileEdit';
import { Alert, AlertDescription } from "@/components/ui/alert";
import BrandNavbar from '@/components/BrandNavbar';
import BrandProfileInfo from '@/components/BrandProfileInfo';
import { useBrand } from '@/context/BrandContext';
import { Loader2 } from 'lucide-react';

export default function BrandProfile() {
  const [currentView, setCurrentView] = useState('brand-info');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const { brandProfile, loading } = useBrand();

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!brandProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>
            Profile not found. Please <a href="/" className="underline">login</a> again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const renderMainContent = () => {
    if (isEditing) {
      return (
        <BrandProfileForm
          initialData={brandProfile}
          onSave={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      );
    }
  
    switch (currentView) {
      case 'profile-info':
        return (
          <BrandProfileInfo 
            initialData={{
              firstName: brandProfile.first_name,
              lastName: brandProfile.last_name,
              email: brandProfile.business_email,
              phone: brandProfile.phone,
            }}
          />
        );
      default:
        return (
          <BrandProfileView
            onEdit={() => setIsEditing(true)}
            profileData={{
              status: brandProfile.status,
              companyName: brandProfile.brand_name,
              industry: brandProfile.industry || 'Not specified',
              location: brandProfile.city ? `${brandProfile.city}, ${brandProfile.country}` : 'Not specified',
              about: brandProfile.about || 'No description available',
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {brandProfile.status === 'declined' && (
          <Alert variant="destructive" className="mb-12">
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
              brandName={brandProfile.brand_name}
              brandCategory={brandProfile.brand_category}
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