import { FC, useState, useEffect } from 'react';
import { 
  FilterOptions, 
  ScholarshipType, 
  GrantType, 
  FundingSource, 
  ApplicationStatus 
} from '@/types/sco';

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
  activeTab: 'scholarships' | 'grants' | 'applications';
}

const FilterSection: FC<FilterSectionProps> = ({ onFilterChange, onSearch, activeTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  
  const handleFilterChange = (filterKey: string, value: any) => {
    const updatedFilters = { ...filters };
    
    // Handle array type filters (checkboxes)
    if (Array.isArray(updatedFilters[filterKey as keyof FilterOptions])) {
      const array = updatedFilters[filterKey as keyof FilterOptions] as any[];
      
      if (array.includes(value)) {
        updatedFilters[filterKey as keyof FilterOptions] = array.filter(v => v !== value) as any;
      } else {
        updatedFilters[filterKey as keyof FilterOptions] = [...array, value] as any;
      }
    } 
    // Handle range filters
    else if (filterKey === 'amountRange.min' || filterKey === 'amountRange.max') {
      if (!updatedFilters.amountRange) {
        updatedFilters.amountRange = {};
      }
      
      if (filterKey === 'amountRange.min') {
        updatedFilters.amountRange.min = value === '' ? undefined : parseInt(value);
      } else {
        updatedFilters.amountRange.max = value === '' ? undefined : parseInt(value);
      }
    }
    // Handle date filters
    else if (filterKey === 'deadline') {
      if (value === '') {
        updatedFilters.deadline = undefined;
      } else {
        // Convert string value to Date object or use predefined period
        updatedFilters.deadline = value;
      }
    }
    // Handle simple value filters
    else {
      updatedFilters[filterKey as keyof FilterOptions] = value === '' ? undefined : value;
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  
  const handleReset = () => {
    setFilters({});
    setSearchQuery('');
    onFilterChange({});
    onSearch('');
  };

  useEffect(() => {
    // Reset filters when tab changes
    setFilters({});
    setSearchQuery('');
  }, [activeTab]);
  
  // Define scholarship types based on actual enum values
  const scholarshipTypes: ScholarshipType[] = ["education", "training"];
  
  // Define grant types based on actual enum values
  const grantTypes: GrantType[] = ["sponsorship", "financial_aid", "equipment", "travel"];
  
  // Define funding sources based on actual enum values
  const fundingSources: FundingSource[] = ["government", "brand", "ngo"];
  
  // Define application statuses based on actual enum values
  const applicationStatuses: ApplicationStatus[] = ["pending", "approved", "rejected", "completed"];
  
  // Render different filter options based on the active tab
  const renderFilterOptions = () => {
    switch (activeTab) {
      case 'scholarships':
        return (
          <div className="space-y-6">
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Scholarship Type</h3>
              <div className="space-y-2">
                {scholarshipTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={filters.type?.includes(type) || false}
                      onChange={() => {
                        const newType = [...(filters.type || [])];
                        if (newType.includes(type)) {
                          handleFilterChange('type', newType.filter(t => t !== type));
                        } else {
                          handleFilterChange('type', [...newType, type]);
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Provider Type</h3>
              <div className="space-y-2">
                {fundingSources.map((source) => (
                  <div key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`provider-${source}`}
                      checked={filters.providerType?.includes(source) || false}
                      onChange={() => {
                        const newProviderType = [...(filters.providerType || [])];
                        if (newProviderType.includes(source)) {
                          handleFilterChange('providerType', newProviderType.filter(s => s !== source));
                        } else {
                          handleFilterChange('providerType', [...newProviderType, source]);
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`provider-${source}`} className="ml-2 text-sm text-gray-700">
                      {source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Sport</h3>
              <select
                aria-label="Sport"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.sport ? filters.sport[0] : ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    handleFilterChange('sport', undefined);
                  } else {
                    handleFilterChange('sport', [e.target.value]);
                  }
                }}
              >
                <option value="">All Sports</option>
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="volleyball">Volleyball</option>
                <option value="soccer">Soccer</option>
                <option value="tennis">Tennis</option>
                <option value="hockey">Hockey</option>
                <option value="swimming">Swimming</option>
                <option value="athletics">Athletics</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Level</h3>
              <select
                aria-label="Level"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.level ? filters.level[0] : ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    handleFilterChange('level', undefined);
                  } else {
                    handleFilterChange('level', [e.target.value]);
                  }
                }}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="state">State</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Amount Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="min-amount" className="sr-only">Minimum Amount</label>
                  <input
                    type="number"
                    id="min-amount"
                    placeholder="Min ₹"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={filters.amountRange?.min || ''}
                    onChange={(e) => handleFilterChange('amountRange.min', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="max-amount" className="sr-only">Maximum Amount</label>
                  <input
                    type="number"
                    id="max-amount"
                    placeholder="Max ₹"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={filters.amountRange?.max || ''}
                    onChange={(e) => handleFilterChange('amountRange.max', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Deadline</h3>
              <select
                aria-label="Deadline"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.deadline ? filters.deadline.toString() : ''}
                onChange={(e) => handleFilterChange('deadline', e.target.value)}
              >
                <option value="">Any Deadline</option>
                <option value="1week">Next Week</option>
                <option value="1month">Next Month</option>
                <option value="3months">Next 3 Months</option>
                <option value="6months">Next 6 Months</option>
              </select>
            </div>
          </div>
        );
        
      case 'grants':
        return (
          <div className="space-y-6">
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Grant Type</h3>
              <div className="space-y-2">
                {grantTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`grant-type-${type}`}
                      checked={filters.type?.includes(type) || false}
                      onChange={() => {
                        const newType = [...(filters.type || [])];
                        if (newType.includes(type)) {
                          handleFilterChange('type', newType.filter(t => t !== type));
                        } else {
                          handleFilterChange('type', [...newType, type]);
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`grant-type-${type}`} className="ml-2 text-sm text-gray-700">
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Funding Source</h3>
              <div className="space-y-2">
                {fundingSources.map((source) => (
                  <div key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`source-${source}`}
                      checked={filters.providerType?.includes(source) || false}
                      onChange={() => {
                        const newProviderType = [...(filters.providerType || [])];
                        if (newProviderType.includes(source)) {
                          handleFilterChange('providerType', newProviderType.filter(s => s !== source));
                        } else {
                          handleFilterChange('providerType', [...newProviderType, source]);
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`source-${source}`} className="ml-2 text-sm text-gray-700">
                      {source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Level</h3>
              <select
                aria-label="Level"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.level ? filters.level[0] : ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    handleFilterChange('level', undefined);
                  } else {
                    handleFilterChange('level', [e.target.value]);
                  }
                }}
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="state">State</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Amount Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="min-amount-grant" className="sr-only">Minimum Amount</label>
                  <input
                    type="number"
                    id="min-amount-grant"
                    placeholder="Min ₹"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={filters.amountRange?.min || ''}
                    onChange={(e) => handleFilterChange('amountRange.min', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="max-amount-grant" className="sr-only">Maximum Amount</label>
                  <input
                    type="number"
                    id="max-amount-grant"
                    placeholder="Max ₹"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={filters.amountRange?.max || ''}
                    onChange={(e) => handleFilterChange('amountRange.max', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Deadline</h3>
              <select
                aria-label="Deadline"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.deadline ? filters.deadline.toString() : ''}
                onChange={(e) => handleFilterChange('deadline', e.target.value)}
              >
                <option value="">Any Deadline</option>
                <option value="1week">Next Week</option>
                <option value="1month">Next Month</option>
                <option value="3months">Next 3 Months</option>
                <option value="6months">Next 6 Months</option>
              </select>
            </div>
          </div>
        );
        
      case 'applications':
        return (
          <div className="space-y-6">
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <select
                aria-label="Status"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                {applicationStatuses.map(status => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Type</h3>
              <select
                aria-label="Type"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.applicationType || ''}
                onChange={(e) => handleFilterChange('applicationType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="scholarship">Scholarship</option>
                <option value="grant">Grant</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Date Applied</h3>
              <select
                aria-label="Date Applied"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={filters.dateApplied || ''}
                onChange={(e) => handleFilterChange('dateApplied', e.target.value)}
              >
                <option value="">Any Time</option>
                <option value="lastWeek">Last Week</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
                <option value="last6Months">Last 6 Months</option>
                <option value="lastYear">Last Year</option>
              </select>
            </div>
            
            <div className="filter-group">
              <h3 className="text-sm font-medium mb-2">Provider Type</h3>
              <div className="space-y-2">
                {fundingSources.map((source) => (
                  <div key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`app-source-${source}`}
                      checked={filters.providerType?.includes(source) || false}
                      onChange={() => {
                        const newProviderType = [...(filters.providerType || [])];
                        if (newProviderType.includes(source)) {
                          handleFilterChange('providerType', newProviderType.filter(s => s !== source));
                        } else {
                          handleFilterChange('providerType', [...newProviderType, source]);
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`app-source-${source}`} className="ml-2 text-sm text-gray-700">
                      {source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="filter-section bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      
      <div className="filter-controls mb-4">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        
        {Object.keys(filters).length > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="ml-4 text-sm font-medium text-gray-600 hover:text-gray-500"
          >
            Reset Filters
          </button>
        )}
      </div>
      
      {showFilters && (
        <div className="filters-container border-t border-gray-200 pt-4">
          {renderFilterOptions()}
        </div>
      )}
    </div>
  );
};

export default FilterSection;