"use client";

import React, { useState } from "react";
import { AthleteProfileSidebar } from "./__components/AthleteProfileSidebar";
import AthleteNavbar from "@/components/AthleteNavbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { PrivateInfoPanel } from "./__components/PrivateInfoPanel";
import PaymentHistoryPanel from "./__components/PaymentHistoryPanel";
import AnalyticsPanel from "./__components/AnalyticsPanel";
import { PublicInfoPanel } from "./__components/PublicInfoPanel";

function Page() {
  const [isEditingPublicPanel, setIsEditingPublicPanel] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("public");

  const [profileData, setProfileData] = useState({
    status: "declined",
    companyName: "Acme Corp",
    industry: "Technology",
    location: "San Francisco, CA",
    about: "Leading technology solutions provider...",
  });

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "public":
        return <PublicInfoPanel isEditing={isEditingPublicPanel} onToggleEdit={setIsEditingPublicPanel} />;
      case "private":
        return <PrivateInfoPanel />;
      case "payment":
        return <PaymentHistoryPanel />;
      case "analytics":
        return <AnalyticsPanel />;
      default:
        return <PublicInfoPanel isEditing={isEditingPublicPanel} onToggleEdit={setIsEditingPublicPanel} />;
    }
        // return <PublicInfoPanel isEditing={isEditingPublicPanel} onToggleEdit={setIsEditingPublicPanel}/>;
        // return <PrivatePanel/>
    // return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profileData.status === 'declined' && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Verification request was declined. Please <a href="/support" className="underline font-medium">contact support</a> for assistance.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <AthleteProfileSidebar
              isEditing={isEditingPublicPanel}
              profileImage={profileImage}
              onImageUpload={handleImageUpload}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className="md:col-span-2">
            {renderActiveTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;