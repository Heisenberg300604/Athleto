"use client";

import React, { useState } from 'react';
import { LayoutDashboard, User, CreditCard, BarChart2, LogOut, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

interface BrandSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isEditing?: boolean;
  profileImage?: string | null; // Allow null as well
  onImageUpload?: (file: File) => void;
}

export const BrandSidebar: React.FC<BrandSidebarProps> = ({
  currentView,
  onViewChange,
  isEditing = false,
  profileImage,
  onImageUpload,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuItems = [
    { id: "brand-info", label: "BRAND INFO", icon: LayoutDashboard },
    { id: "profile-info", label: "PROFILE INFO", icon: User },
    { id: "payment-history", label: "PAYMENT HISTORY", icon: CreditCard },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
  ];
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      toast.loading('Logging out...', { id: 'logout' });
      
      // Small delay to ensure the toast is visible
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
  
      // Clear localStorage & Supabase session
      localStorage.clear();
      sessionStorage.clear();
      
      // Success toast
      toast.success('Logged out successfully!', { id: 'logout' });
      
      // Small delay to show the success message
      await new Promise(resolve => setTimeout(resolve, 800));
  
      // Redirect to home page and refresh auth state
      await router.replace("/"); // Ensures full reload
      router.refresh(); // Ensures state update
    } catch (error) {
      console.error("Logout error:", error);
      toast.error('Failed to log out. Please try again.', { id: 'logout' });
      setIsLoggingOut(false);
    }
  };
  
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6">
      <div className="relative mb-8 flex justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Brand Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-blue-400">
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

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                currentView === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              )}>
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
        
        <button 
          onClick={handleLogout} 
          disabled={isLoggingOut}
          className={cn(
            "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 mt-6",
            isLoggingOut 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "text-red-600 hover:bg-red-50"
          )}>
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span className="font-medium text-sm">
            {isLoggingOut ? "LOGGING OUT..." : "LOG OUT"}
          </span>
        </button>
      </nav>
    </div>
  );
};