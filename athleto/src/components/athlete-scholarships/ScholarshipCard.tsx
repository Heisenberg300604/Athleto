// app/athlete/scholarships/components/ScholarshipCard.tsx
import { FC } from 'react';
import { Scholarship } from  '@/types/sco';
import Image from 'next/image';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onApply: (scholarshipId: string) => void;
}

const ScholarshipCard: FC<ScholarshipCardProps> = ({ scholarship, onApply }) => {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ));
  
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getProviderBadgeColor = (type: string) => {
    switch(type) {
      case 'government': return 'bg-green-100 text-green-800';
      case 'brand': return 'bg-blue-100 text-blue-800';
      case 'ngo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getLevelBadge = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-gray-100 text-gray-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'national': return 'bg-red-100 text-red-800';
      case 'international': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {scholarship.providerLogo ? (
              <div className="w-10 h-10 relative mr-3">
                <Image
                  src={scholarship.providerLogo}
                  alt={scholarship.provider}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-500 font-medium">{scholarship.provider.substring(0, 2)}</span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{scholarship.name}</h3>
              <div className="flex items-center mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${getProviderBadgeColor(scholarship.providerType)}`}>
                  {scholarship.providerType.charAt(0).toUpperCase() + scholarship.providerType.slice(1)}
                </span>
                <span className="text-xs text-gray-500 ml-2">{scholarship.provider}</span>
              </div>
            </div>
          </div>
          {scholarship.isVerified && (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <div>
            <span className="text-gray-500 text-sm">Amount</span>
            <p className="font-bold text-xl">{formatAmount(scholarship.amount)}</p>
          </div>
          <div className="text-right">
            <span className="text-gray-500 text-sm">Deadline</span>
            <p className={`font-medium ${daysLeft < 7 ? 'text-red-600' : 'text-gray-800'}`}>
              {daysLeft === 0 ? 'Today' : `${daysLeft} days left`}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scholarship.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Eligibility</h4>
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getLevelBadge(scholarship.eligibilityCriteria.level)}`}>
              {scholarship.eligibilityCriteria.level.charAt(0).toUpperCase() + scholarship.eligibilityCriteria.level.slice(1)} Level
            </span>
            
            {scholarship.eligibilityCriteria.ageRange && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                {scholarship.eligibilityCriteria.ageRange.min}-{scholarship.eligibilityCriteria.ageRange.max} years
              </span>
            )}
            
            {scholarship.eligibilityCriteria.sportTypes && scholarship.eligibilityCriteria.sportTypes.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                {scholarship.eligibilityCriteria.sportTypes.length} sports
              </span>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>{scholarship.applicationCount} applicants</span>
            <span className="mx-1">•</span>
            <span>{scholarship.availablePositions} positions</span>
          </div>
          
          <button
            onClick={() => onApply(scholarship.id)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-sm transition-colors duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;