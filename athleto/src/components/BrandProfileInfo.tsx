"use client"

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Save, 
  X 
} from 'lucide-react';
import { Edit } from 'lucide-react';

interface ProfileInfoProps {
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
  };
  onSave?: (data: any) => void;
}

export const BrandProfileInfo: React.FC<ProfileInfoProps> = ({ 
  initialData = {},
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',

  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <User className="w-8 h-8 text-white" />
          <h2 className="text-xl font-semibold text-white">Personal Information</h2>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <button 
            title = "Edit"
              onClick={() => setIsEditing(true)}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all whitespace-nowrap"
            >
              <Edit className="w-5 h-5" />
               Edit

            </button>
          ) : (
            <>
              <button 
              title = "Cancel"
                onClick={handleCancel}
                className="bg-red-500/20 hover:bg-red-500/30 text-white p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              <button 
                title = "Save"
                onClick={handleSave}
                className="bg-green-500/20 hover:bg-green-500/30 text-white p-2 rounded-full transition-all"
              >
                <Save className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6 text-black">
        <div className="grid md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">First Name</label>
            {!isEditing ? (
              <div className="bg-gray-50 p-3 rounded-lg">
                {formData.firstName || 'Not provided'}
              </div>
            ) : (
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
                placeholder="Enter first name"
              />
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Last Name</label>
            {!isEditing ? (
              <div className="bg-gray-50 p-3 rounded-lg">
                {formData.lastName || 'Not provided'}
              </div>
            ) : (
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter last name"
              />
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Email</label>
            {!isEditing ? (
              <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500" />
                {formData.email || 'Not provided'}
              </div>
            ) : (
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter email"
              />
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Phone</label>
            {!isEditing ? (
              <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gray-500" />
                {formData.phone || 'Not provided'}
              </div>
            ) : (
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter phone number"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfileInfo;