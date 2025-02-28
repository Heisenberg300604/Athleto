// File: components/brand/AvailableAthletes.tsx
import React from 'react';

type Athlete = {
  id: string;
  name: string;
  sport: string;
  achievements: string[];
  followerCount: number;
  pricing: {
    workshop: number;
    demo: number;
    talk: number;
    training: number;
  };
  image: string;
};

type Props = {
  athletes: Athlete[];
  onHire: (athlete: Athlete) => void;
};

const AvailableAthletes: React.FC<Props> = ({ athletes, onHire }) => {
  // Filter state
  const [filters, setFilters] = React.useState({
    sport: '',
    priceRange: '',
  });

  // Search state
  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter athletes based on search and filters
  const filteredAthletes = athletes.filter(athlete => {
    // Apply search query
    if (searchQuery && !athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !athlete.sport.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply sport filter
    if (filters.sport && athlete.sport !== filters.sport) {
      return false;
    }

    // Apply price range filter
    if (filters.priceRange) {
      const avgPrice = (athlete.pricing.workshop + athlete.pricing.demo + 
        athlete.pricing.talk + athlete.pricing.training) / 4;

      if (filters.priceRange === 'under-10k' && avgPrice >= 10000) {
        return false;
      } else if (filters.priceRange === '10k-25k' && (avgPrice < 10000 || avgPrice > 25000)) {
        return false;
      } else if (filters.priceRange === '25k-50k' && (avgPrice < 25000 || avgPrice > 50000)) {
        return false;
      } else if (filters.priceRange === 'over-50k' && avgPrice <= 50000) {
        return false;
      }
    }

    return true;
  });

  // Get unique sport options
  const sportOptions = [...new Set(athletes.map(athlete => athlete.sport))];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Available Athletes
        </h3>
      </div>
      
      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">Search athletes</label>
            <input
              type="text"
              id="search"
              placeholder="Search by name or sport..."
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div>
            <label htmlFor="sport-filter" className="sr-only">Filter by sport</label>
              <select
                id="sport-filter"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filters.sport}
                onChange={(e) => setFilters({...filters, sport: e.target.value})}
              >
                <option value="">All Sports</option>
                {sportOptions.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="price-filter" className="sr-only">Filter by price</label>
              <select
                id="price-filter"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              >
                <option value="">All Price Ranges</option>
                <option value="under-10k">Under ₹10,000</option>
                <option value="10k-25k">₹10,000 - ₹25,000</option>
                <option value="25k-50k">₹25,000 - ₹50,000</option>
                <option value="over-50k">Over ₹50,000</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Athletes Grid */}
      <div className="p-4 sm:p-6">
        {filteredAthletes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No athletes match your search criteria.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filteredAthletes.map((athlete) => (
              <div key={athlete.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={athlete.image} alt={athlete.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{athlete.name}</h4>
                    <p className="text-sm text-gray-500">{athlete.sport}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Achievements</h5>
                    <ul className="text-sm text-gray-600 ml-4">
                      {athlete.achievements.map((achievement, index) => (
                        <li key={index} className="mb-1">• {achievement}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Base Pricing</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Workshop:</span>
                        <span className="font-medium text-gray-800 ml-1">₹{athlete.pricing.workshop.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Demo:</span>
                        <span className="font-medium text-gray-800 ml-1">₹{athlete.pricing.demo.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Talk:</span>
                        <span className="font-medium text-gray-800 ml-1">₹{athlete.pricing.talk.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Training:</span>
                        <span className="font-medium text-gray-800 ml-1">₹{athlete.pricing.training.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">{athlete.followerCount.toLocaleString()}</span> followers
                  </div>
                  
                  <button
                    onClick={() => onHire(athlete)}
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Hire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableAthletes;