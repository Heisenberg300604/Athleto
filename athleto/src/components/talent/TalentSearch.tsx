import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TalentSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TalentSearch: React.FC<TalentSearchProps> = ({
  searchTerm, 
  onSearchChange, 
  activeTab, 
  onTabChange
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type="text"
          placeholder="Search talents..."
          className="pl-10 pr-4 py-2.5 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white text-black"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'all' 
              ? 'bg-white shadow-sm text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onTabChange('all')}
        >
          All Talents
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'favorites' 
              ? 'bg-white shadow-sm text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => onTabChange('favorites')}
        >
          Favorite Talents
        </button>
      </div>
    </div>
  );
}

export default TalentSearch;