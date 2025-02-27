"use client"

import React, { useState, useEffect } from 'react';
import TalentFilters from '@/components/talent/TalentFilters';
import TalentSearch from '@/components/talent/TalentSearch';
import TalentGrid from '@/components/talent/TalentGrid';
import BrandNavbar from '@/components/BrandNavbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function TalentPage() {
  const [filters, setFilters] = useState({
    sportType: '',
    location: {
      country: '',
      city: ''
    },
    performanceLevel: '',
    verificationStatus: '',
    sponsorshipAvailability: '',
    gender: '',
    tags: []
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [sortOption, setSortOption] = useState('popular');

  return (
    <div className="bg-gray-50 min-h-screen">
      <BrandNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Talents</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Filters Section */}
          <div className="md:w-1/4">
            <TalentFilters 
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          
          {/* Right Content Section */}
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="w-full sm:w-2/3">
                  <TalentSearch 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
                
                <div className="flex gap-4 w-full sm:w-auto">
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-700'}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${activeTab === 'favorites' ? 'bg-indigo-50 text-indigo-700' : 'bg-white text-gray-700'}`}
                      onClick={() => setActiveTab('favorites')}
                    >
                      Favorites
                    </button>
                  </div>
                  
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 bg-white"
                  >
                    <option value="popular">Popular</option>
                    <option value="nearest">Nearest</option>
                    <option value="feedback">Best Feedback</option>
                    <option value="freshest">Freshest</option>
                  </select>
                </div>
              </div>
              
              <TalentGrid 
                filters={filters}
                searchTerm={searchTerm}
                activeTab={activeTab}
                sortOption={sortOption}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}