import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Lock,
  CreditCard,
  BarChart2,
  LogOut,
  Image as ImageIcon,
} from "lucide-react";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";

interface AthleteSidebarProps {
  isEditing?: boolean;
  profileImage?: string | null;
  onImageUpload?: (file: File) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AthleteProfileSidebar: React.FC<AthleteSidebarProps> = ({
  isEditing = false,
  profileImage,
  onImageUpload,
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "public", label: "PUBLIC INFO", icon: User },
    { id: "private", label: "PRIVATE INFO", icon: Lock },
    { id: "payment", label: "PAYMENT HISTORY", icon: CreditCard },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
  ];
  useForceLightMode();
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6">
      {/* Logo/Image Upload Section */}
      <div className="relative mb-8">
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Brand Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-blue-400">
              <ImageIcon className="w-12 h-12 mb-2" />
              <p className="text-sm font-medium">Company Logo</p>
            </div>
          )}
        </div>
        {isEditing && (
          <label
            htmlFor="profile-image"
            className="absolute bottom-3 right-3 p-2 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-100">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <input
              id="profile-image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0] && onImageUpload) {
                  onImageUpload(e.target.files[0]);
                }
              }}
            />
          </label>
        )}
      </div>

      {/* Navigation Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={(value)=>{
            onTabChange(value)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }} 
        orientation="vertical" 
        className="w-full"
      >
        <TabsList className="flex flex-col h-auto bg-transparent space-y-2 w-full p-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 justify-start",
                "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600",
                "hover:bg-gray-50 text-gray-600"
              )}>
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Logout Button */}
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 mt-6"
          onClick={() => console.log("Logout clicked")}>
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">LOG OUT</span>
        </button>
      </Tabs>
    </div>
  );
};