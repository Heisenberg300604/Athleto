"use client"

import type React from "react"
import { HeartIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
// import Image from "next/image"
import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Define the Athlete type based on the database schema
interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  video_link: string;
  verified: boolean;
  skills: string[];
  location: string;
  gender: string;
  date_of_birth: string;
  status: string;
  social_links: { [key: string]: string };
  talent_level: string;
  affiliations: string[];
  achievements: string[];
  sponsorship_status: string;
  funding_request_status: string;
  sponsorship_needs: string[];
  created_at: string;
  updated_at: string;
  phone: string;
  bank_account_name: string;
  iban: string;
  currency: string;
  profile_picture: string;
  // UI specific properties
  isFavorite?: boolean;
}

// Define the TalentGridProps type
interface TalentGridProps {
  filters: {
    sportType?: string;
    performanceLevel?: string;
    verificationStatus?: string;
    sponsorshipAvailability?: string;
    gender?: string;
    location: {
      country?: string;
      city?: string;
    };
  };
  searchTerm?: string;
  activeTab: string;
  sortOption: string;
}

const TalentCard: React.FC<{
  talent: Athlete;
  onFavoriteToggle: (id: string) => void;
}> = ({ talent, onFavoriteToggle }) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/talent/${talent.id}`)
  }

  // Format athlete data for display
  const name = `${talent.first_name} ${talent.last_name}`;
  const verificationStatus = talent.verified ? "Verified" : "Unverified";
  const sponsorshipStatus = talent.sponsorship_status || "Open to Offers";
  const performanceLevel = talent.talent_level || "Amateur";
  
  // Hardcoded fields for demonstration
  const position = talent.skills?.length > 0 ? talent.skills[0] : "Player";
  const sport = talent.skills?.length > 1 ? talent.skills[1] : "Football";
  const currentSponsorships = talent.affiliations || ["None"];
  const achievementSummary = talent.achievements?.length > 0 
    ? talent.achievements[0] 
    : "Rising athlete with potential";

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={talent.profile_picture || "/placeholder.svg"}
          alt={name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <button
          title="Toggle Favorite"
          className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation()
            onFavoriteToggle(talent.id)
          }}
        >
          <HeartIcon
            className={`h-6 w-6 transition-all duration-300 ${
              talent.isFavorite ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              verificationStatus === "Verified" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {verificationStatus}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1.5">
          <p className="font-medium">
            {sport} | {position}
          </p>
          <p>{talent.location}</p>
          <p>Talent Level: {talent.talent_level || "Amateur"}</p>
          <p>Achievement: {achievementSummary}</p>
          <p>Current Sponsorships: {currentSponsorships.join(", ")}</p>
          <div className="flex items-center space-x-2">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                sponsorshipStatus === "Actively Seeking"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {sponsorshipStatus}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium">
              {performanceLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TalentGrid: React.FC<TalentGridProps> = ({ 
  filters, 
  searchTerm, 
  activeTab,
  sortOption 
}) => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  
  // Fetch athletes from Supabase
  useEffect(() => {
    const fetchAthletes = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('athletes')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Add UI-specific properties
          const athletesWithFavorite = data.map(athlete => ({
            ...athlete,
            isFavorite: false,
          }));
          
          setAthletes(athletesWithFavorite);
        }
      } catch (error) {
        console.error('Error fetching athletes:', error);
        setError('Failed to load athletes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAthletes();
  }, [supabase]);
  
  const toggleFavorite = (id: string) => {
    setAthletes(athletes.map(athlete => 
      athlete.id === id 
        ? { ...athlete, isFavorite: !athlete.isFavorite } 
        : athlete
    ));
  };
  
  // Comprehensive filtering logic
  const filteredAthletes = athletes.filter(athlete => {
    const sports = athlete.skills && athlete.skills.length > 1 ? athlete.skills[1] : "";
    
    const matchesSport = !filters.sportType || sports === filters.sportType;
    const matchesPerformanceLevel = !filters.performanceLevel || athlete.talent_level === filters.performanceLevel;
    const matchesVerificationStatus = !filters.verificationStatus || 
      (filters.verificationStatus === "Verified" ? athlete.verified : !athlete.verified);
    const matchesSponsorshipStatus = !filters.sponsorshipAvailability || 
      athlete.sponsorship_status === filters.sponsorshipAvailability;
    const matchesGender = !filters.gender || athlete.gender === filters.gender;
    
    // Location filtering (basic implementation)
    const matchesCountry = !filters.location.country || 
      athlete.location.toLowerCase().includes(filters.location.country.toLowerCase());
    const matchesCity = !filters.location.city || 
      athlete.location.toLowerCase().includes(filters.location.city.toLowerCase());
    
    const name = `${athlete.first_name} ${athlete.last_name}`;
    const matchesSearch = !searchTerm || 
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (athlete.skills?.join(' ').toLowerCase().includes(searchTerm.toLowerCase())) ||
      athlete.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || (activeTab === 'favorites' && athlete.isFavorite);

    return matchesSport && 
           matchesPerformanceLevel && 
           matchesVerificationStatus && 
           matchesSponsorshipStatus && 
           matchesGender &&
           matchesCountry &&
           matchesCity &&
           matchesSearch && 
           matchesTab;
  });

  // Sorting logic
  const sortedAthletes = [...filteredAthletes].sort((a, b) => {
    switch(sortOption) {
      case 'popular':
        // Sort by achievement count as a proxy for popularity
        return (b.achievements?.length || 0) - (a.achievements?.length || 0);
      case 'nearest':
        // Placeholder for geolocation-based sorting
        return 0;
      case 'feedback':
        // Placeholder for feedback-based sorting
        return 0;
      case 'freshest':
        // Sort by created_at date
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="col-span-full text-center py-12 text-gray-500">
        <p className="text-xl font-medium">Loading talents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12 text-red-500">
        <p className="text-xl font-medium mb-4">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAthletes.length > 0 ? (
        sortedAthletes.map(athlete => (
          <TalentCard 
            key={athlete.id} 
            talent={athlete} 
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