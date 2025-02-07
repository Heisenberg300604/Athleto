import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Mock Talent Data (Replace with your actual data source)
const MOCK_TALENTS = [
  {
    id: '1',
    name: 'Ronaldo',
    sport: 'Football',
    position: 'Striker',
    location: 'New York, USA',
    performanceLevel: 'National',
    verificationStatus: 'Verified',
    sponsorshipStatus: 'Actively Seeking',
    profilePicture: '/ronaldo.jpg',
    isFavorite: false
  },
    {
        id: '2',
        name: 'LeBron James',
        sport: 'Basketball',
        position: 'Small Forward',
        location: 'Los Angeles, USA',
        performanceLevel: 'National',
        verificationStatus: 'Verified',
        sponsorshipStatus: 'Actively Seeking',
        profilePicture: '/ronaldo.jpg',
        isFavorite: false
    },
    {
        id: '3',
        name: 'Serena Williams',
        sport: 'Tennis',
        position: 'Singles',
        location: 'Miami, USA',
        performanceLevel: 'National',
        verificationStatus: 'Verified',
        sponsorshipStatus: 'Actively Seeking',
        profilePicture: '/ronaldo.jpg',
        isFavorite: false
    },
    {
        id: '4',
        name: 'Usain Bolt',
        sport: 'Athletics',
        position: 'Sprinter',
        location: 'Kingston, Jamaica',
        performanceLevel: 'National',
        verificationStatus: 'Verified',
        sponsorshipStatus: 'Actively Seeking',
        profilePicture: '/ronaldo.jpg',
        isFavorite: false
    },
    {
        id: '5',
        name: 'Simone Biles',
        sport: 'Gymnastics',
        position: 'Artistic',
        location: 'Houston, USA',
        performanceLevel: 'National',
        verificationStatus: 'Verified',
        sponsorshipStatus: 'Actively Seeking',
        profilePicture: '/ronaldo.jpg',
        isFavorite: false
    },
];

interface TalentGridProps {
  filters: any;
  searchTerm: string;
  activeTab: string;
  sortOption: string;
}

const TalentCard: React.FC<any> = ({ talent, onFavoriteToggle }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/components/talent/1`);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={talent.profilePicture} 
          alt={talent.name} 
          className="w-full h-48 object-cover"
        />
        <button 
          title="Toggle Favorite"
          className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(talent.id);
          }}
        >
          <HeartIcon 
            className={`h-6 w-6 transition-all duration-300 ${
              talent.isFavorite 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{talent.name}</h3>
          <span 
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              talent.verificationStatus === 'Verified' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {talent.verificationStatus}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1.5">
          <p className="font-medium">{talent.sport} | {talent.position}</p>
          <p>{talent.location}</p>
          <div className="flex items-center space-x-2">
            <span 
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                talent.sponsorshipStatus === 'Actively Seeking'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {talent.sponsorshipStatus}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
              {talent.performanceLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TalentGrid: React.FC<TalentGridProps> = ({ 
    filters, 
    searchTerm, 
    activeTab,
    sortOption 
  }) => {
    const [talents, setTalents] = useState(MOCK_TALENTS);
  
    const toggleFavorite = (id: string) => {
      setTalents(talents.map(talent => 
        talent.id === id 
          ? { ...talent, isFavorite: !talent.isFavorite } 
          : talent
      ));
    };
  
    // Comprehensive filtering logic
    const filteredTalents = talents.filter(talent => {
      const matchesSport = !filters.sportType || talent.sport === filters.sportType;
      const matchesPerformanceLevel = !filters.performanceLevel || talent.performanceLevel === filters.performanceLevel;
      const matchesVerificationStatus = !filters.verificationStatus || talent.verificationStatus === filters.verificationStatus;
      const matchesSponsorshipStatus = !filters.sponsorshipAvailability || talent.sponsorshipStatus === filters.sponsorshipAvailability;
      
      // Location filtering (basic implementation)
      const matchesCountry = !filters.location.country || 
        talent.location.toLowerCase().includes(filters.location.country.toLowerCase());
      const matchesCity = !filters.location.city || 
        talent.location.toLowerCase().includes(filters.location.city.toLowerCase());
      
      const matchesSearch = !searchTerm || 
        talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTab = activeTab === 'all' || (activeTab === 'favorites' && talent.isFavorite);
  
      return matchesSport && 
             matchesPerformanceLevel && 
             matchesVerificationStatus && 
             matchesSponsorshipStatus && 
             matchesCountry &&
             matchesCity &&
             matchesSearch && 
             matchesTab;
    });
  
    // Sorting logic
    const sortedTalents = [...filteredTalents].sort((a, b) => {
      switch(sortOption) {
        case 'popular':
          // Placeholder logic - you might want to add a popularity score
          return 0;
        case 'nearest':
          // Placeholder for geolocation-based sorting
          return 0;
        case 'feedback':
          // Placeholder for feedback-based sorting
          return 0;
        case 'freshest':
          // Placeholder for date-based sorting
          return 0;
        default:
          return 0;
      }
    });
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTalents.length > 0 ? (
          sortedTalents.map(talent => (
            <TalentCard 
              key={talent.id} 
              talent={talent} 
              onFavoriteToggle={toggleFavorite} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-xl font-medium mb-4">No talents found</p>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    );
  }
  
  export default TalentGrid;