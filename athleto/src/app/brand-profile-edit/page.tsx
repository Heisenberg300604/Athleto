"use client"

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BrandNavbar from '@/components/BrandNavbar';


interface BrandProfileEditProps {
  onClose: () => void;
}

const BrandProfileEdit: React.FC<BrandProfileEditProps> = ({ onClose }) => {
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
        <BrandNavbar    />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Image Upload */}
            <div className="col-span-1">
              <div className="relative">
                <div className="w-full aspect-square bg-red-200 rounded-full flex items-center justify-center overflow-hidden mb-6">
                  {image ? (
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <p>Field is required</p>
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="image-upload" 
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-6 h-6 text-gray-600" />
                </label>
                <input 
                  id="image-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                  title="Upload Image"
                />
              </div>

              {/* Sidebar Navigation */}
              <nav className="space-y-2">
                <button className="w-full text-left px-4 py-3 text-blue-600 bg-blue-50 rounded-md font-medium transition-colors">
                  BRAND INFO
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                  PROFILE INFO
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                  PAYMENT HISTORY
                </button>
                <button className="w-full text-left px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md font-medium transition-colors">
                  ANALYTICS
                </button>
                <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-md font-medium transition-colors mt-8">
                  LOG OUT
                </button>
              </nav>
            </div>

            {/* Right Column - Form Fields */}
            <div className="col-span-2 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <Select defaultValue="private">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500">Your profile currently invisible to Talent</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company name *
                  </label>
                  <Input 
                    type="text" 
                    className="w-full"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry *
                  </label>
                  <Select defaultValue="other">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="sf">San Francisco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About
                  </label>
                  <Textarea 
                    placeholder="Enter company description"
                    className="w-full"
                    rows={4}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  PRIVATE INFO FOR ADMIN
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street
                      </label>
                      <Input type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal code
                      </label>
                      <Input type="text" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VAT number
                      </label>
                      <Input type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IBAN
                      </label>
                      <Input type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank account number
                    </label>
                    <Input type="text" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  CANCEL
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandProfileEdit;