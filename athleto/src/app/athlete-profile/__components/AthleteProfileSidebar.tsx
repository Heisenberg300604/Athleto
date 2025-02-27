import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Lock,
  CreditCard,
  BarChart2,
  LogOut,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  
  const tabs = [
    { id: "public", label: "PUBLIC INFO", icon: User },
    { id: "private", label: "PRIVATE INFO", icon: Lock },
    { id: "payment", label: "PAYMENT HISTORY", icon: CreditCard },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
  ];
  useForceLightMode();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      toast.loading('Logging out...', { id: 'logout' });
      
      // Small delay to ensure the toast is visible
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear localStorage & Supabase session
      localStorage.clear();
      sessionStorage.clear();

      // Success toast
      toast.success('Logged out successfully!', { id: 'logout' });
      
      // Small delay to show the success message
      await new Promise(resolve => setTimeout(resolve, 800));

      // Refresh Supabase auth state and redirect
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to log out. Please try again.', { id: 'logout' });
      setIsLoggingOut(false);
    }
  }

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
              <p className="text-sm font-medium">Athlete Profile Image</p>
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
              title="Upload Profile Image"
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
            onTabChange(value);
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
          disabled={isLoggingOut}
          className={cn(
            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mt-6",
            isLoggingOut 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "text-red-600 hover:bg-red-50"
          )}
          onClick={handleLogout}>
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span className="font-medium text-sm">
            {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
          </span>
        </button>
      </Tabs>
    </div>
  );
};