// app/athlete/scholarships/components/GrantCard.tsx
import { FC } from 'react';
import { Scholarship } from '@/types/sco';
import Image from 'next/image';

interface GrantCardProps {
  grant: Scholarship;
  onApply: (grantId: string) => void;
}

const GrantCard: FC<GrantCardProps> = ({ grant, onApply }) => {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(grant.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ));
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getGrantTypeBadge = (type: string) => {
    switch(type) {
      case 'sponsorship': return 'bg-purple-100 text-purple-800';
      case 'financial_aid': return 'bg-green-100 text-green-800';
      case 'equipment': return 'bg-yellow-100 text-yellow-800';
      case 'travel': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getGrantTypeLabel = (type: string) => {
    switch(type) {
      case 'sponsorship': return 'Sponsorship';
      case 'financial_aid': return 'Financial Aid';
      case 'equipment': return 'Equipment Support';
      case 'travel': return 'Travel Grant';
      default: return type;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-white line-clamp-1">{grant.name}</h3>
            {grant.isVerified && (
              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
            )}
          </div>
        </div>
        <div className="absolute top-4 left-4 flex items-center">
          <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
            {grant.providerLogo ? (
              <Image
                src={grant.providerLogo}
                alt={grant.provider}
                width={36}
                height={36}
                objectFit="contain"
              />
            ) : (
              <span className="text-blue-600 font-medium">{grant.provider.substring(0, 2)}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${getGrantTypeBadge(grant.type)}`}>
                {getGrantTypeLabel(grant.type)}
              </span>
              <span className="ml-2 text-sm text-gray-500">{grant.provider}</span>
            </div>
            <div className="mt-3">
              <span className="text-gray-500 text-sm">Grant Amount</span>
              <p className="font-bold text-xl">{formatAmount(grant.amount)}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-gray-500 text-sm">Deadline</span>
            <p className={`font-medium ${daysLeft < 7 ? 'text-red-600' : 'text-gray-800'}`}>
              {daysLeft === 0 ? 'Today' : `${daysLeft} days left`}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{grant.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Eligibility</h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
              {grant.eligibilityCriteria.level.charAt(0).toUpperCase() + grant.eligibilityCriteria.level.slice(1)} Level
            </span>
            
            {grant.eligibilityCriteria.ageRange && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                {grant.eligibilityCriteria.ageRange.min}-{grant.eligibilityCriteria.ageRange.max} years
              </span>
            )}
            
            {grant.eligibilityCriteria.sportTypes && grant.eligibilityCriteria.sportTypes.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                {grant.eligibilityCriteria.sportTypes.length} sports
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>{grant.applicationCount} applicants</span>
            <span className="mx-1">•</span>
            <span>{grant.availablePositions} positions</span>
          </div>
          
          <button
            onClick={() => onApply(grant.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md text-sm transition-all duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrantCard;