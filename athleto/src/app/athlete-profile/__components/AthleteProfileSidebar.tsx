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
} from "lucide-react";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useUser } from "@/context/UserContext";

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
  // const [ProfileImage, setProfileImage] = useState<string | null>(null);
  const [uploadedProfileImage, setUploadedProfileImage] = useState<string | null>(profileImage || null);

  const [uploading, setUploading] = useState(false);
  const {athlete} = useUser();
  const supabase = createClientComponentClient()
  const router = useRouter()
  
  const tabs = [
    { id: "public", label: "PUBLIC INFO", icon: User },
    { id: "private", label: "PRIVATE INFO", icon: Lock },
    { id: "payment", label: "PAYMENT HISTORY", icon: CreditCard },
    { id: "analytics", label: "ANALYTICS", icon: BarChart2 },
  ];
  useForceLightMode();
  console.log(athlete)
  const handleImageUpload = async (file: File) => {
    if (!file) {
      console.error("No file selected.");
      return;
    }
  
    setUploading(true);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${athlete?.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
  
    console.log("Uploading file:", fileName);
  
    try {
      // Upload image to Supabase Storage
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
  
      if (error) {
        console.error("Upload error:", error.message);
        alert("Upload failed: " + error.message);
        return;
      }
  
      console.log("Upload successful. Data:", data);
  
      // Get the public URL after successful upload
      const { data: publicURLData } = await supabase
        .storage
        .from("avatars")
        .getPublicUrl(filePath);
  
      console.log("Public URL Data:", publicURLData);
  
      const imageUrl = publicURLData.publicUrl;
  
      if (!imageUrl) {
        throw new Error("Failed to retrieve public URL.");
      }
  
      console.log("Public Image URL:", imageUrl);
  
      // Update profile picture in the database
      const { error: updateError } = await supabase
        .from("athletes")
        .update({ profile_picture: imageUrl })
        .eq("id", athlete?.id);
  
      if (updateError) {
        console.error("Database update error:", updateError.message);
        alert("Database update failed: " + updateError.message);
        return;
      }
  
      console.log("Profile image updated in DB.");
      setUploadedProfileImage(imageUrl);
      alert("Profile image updated successfully!");
  
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to upload and save profile picture.");
    } finally {
      setUploading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Clear localStorage & Supabase session
      localStorage.clear()
      sessionStorage.clear()

      // Refresh Supabase auth state (ensure user is logged out)
      router.refresh()

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }


  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-6">
      {/* Logo/Image Upload Section */}
      <div className="relative mb-8">
        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
{uploadedProfileImage ? (
  <img
    src={uploadedProfileImage}
    alt="Athlete Profile"
    className="w-full h-full object-cover"
  />
) : athlete?.profile_picture ? (
  <img
    src={athlete.profile_picture}
    alt="Athlete Profile"
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
            className="absolute bottom-3 right-3 p-2 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 border border-gray-100"
          >
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <input
              id="profile-image"
              type="file"
              className="hidden"
              accept="image/*"
              title="Upload Profile Image"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageUpload(e.target.files[0]);
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
          onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">LOG OUT</span>
        </button>
      </Tabs>
    </div>
  );
};