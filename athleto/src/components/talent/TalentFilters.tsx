import React from 'react';

const SPORT_TYPES = ['Football', 'Cricket', 'Athletics', 'Boxing', 'Tennis'];
const PERFORMANCE_LEVELS = ['Beginner', 'Club', 'State', 'National', 'International'];
const SPONSORSHIP_STATUS = ['Actively Seeking', 'Not Looking'];
const VERIFICATION_STATUS = ['Verified', 'Not Verified'];
const GENDERS = ['Male', 'Female', 'Other'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular Now' },
  { value: 'nearest', label: 'Nearest' },
  { value: 'feedback', label: 'Top Feedback' },
  { value: 'freshest', label: 'Freshest' }
];

interface TalentFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
}

const TalentFilters: React.FC<TalentFiltersProps> = ({ 
  filters, 
  onFilterChange, 
  sortOption, 
  onSortChange 
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-3">
          Refine Talents
        </h2>
        
        {/* Filters with enhanced styling */}
        <div className="space-y-4">
          {/* Sport Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sport Type</label>
            <select 
              aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.sportType}
              onChange={(e) => handleFilterChange('sportType', e.target.value)}
            >
              <option value="">All Sports</option>
              {SPORT_TYPES.map(sport => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input 
              type="text" 
              placeholder="Country" 
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.location.country}
              onChange={(e) => handleFilterChange('location', { ...filters.location, country: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="City" 
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.location.city}
              onChange={(e) => handleFilterChange('location', { ...filters.location, city: e.target.value })}
            />
          </div>

          {/* Performance Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Performance Level</label>
            <select 
             aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.performanceLevel}
              onChange={(e) => handleFilterChange('performanceLevel', e.target.value)}
            >
              <option value="">All Levels</option>
              {PERFORMANCE_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Verification Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
            <select 
             aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.verificationStatus}
              onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
            >
              <option value="">All Status</option>
              {VERIFICATION_STATUS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Sponsorship Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sponsorship</label>
            <select 
             aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.sponsorshipAvailability}
              onChange={(e) => handleFilterChange('sponsorshipAvailability', e.target.value)}
            >
              <option value="">All Types</option>
              {SPONSORSHIP_STATUS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select 
             aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value="">All Genders</option>
              {GENDERS.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select 
             aria-label="Sport Type"
              className="w-full  border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-gray-50 text-gray-700 rounded-6 p-3"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TalentFilters;