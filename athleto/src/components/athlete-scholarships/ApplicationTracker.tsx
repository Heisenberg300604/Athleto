import { FC } from 'react';
import { PaymentMilestone } from './PaymentMilestone';
import { ApplicationStatus } from './ApplicationStatus';
import { format } from 'date-fns';

interface Milestone {
  id: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  releaseDate?: Date;
  dueDate?: Date;
}

interface Application {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  provider: string;
  providerLogo: string;
  amount: number;
  appliedDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  nextStep?: string;
  milestones?: Milestone[];
}

interface ApplicationTrackerProps {
  applications: Application[];
}

const ApplicationTracker: FC<ApplicationTrackerProps> = ({ applications }) => {
  if (applications.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No applications yet</h3>
          <p className="text-gray-600 mb-6">You haven't applied to any scholarships or grants.</p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => document.getElementById('scholarships-tab')?.click()}
          >
            Browse scholarships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Applications</h2>
        <div className="text-gray-600">
          Total applications: {applications.length}
        </div>
      </div>

      {applications.map((application) => (
        <div key={application.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {application.providerLogo && (
                  <div className="mr-4 flex-shrink-0">
                    <img 
                      src={application.providerLogo} 
                      alt={application.provider} 
                      className="h-12 w-12 object-contain" 
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{application.scholarshipName}</h3>
                  <p className="text-gray-600">{application.provider}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Applied on {format(application.appliedDate, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">${application.amount.toLocaleString()}</div>
                <ApplicationStatus status={application.status} />
              </div>
            </div>

            {application.nextStep && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium mb-1">Next Step</p>
                  <p className="text-sm">{application.nextStep}</p>
                </div>
              </div>
            )}
            
            {application.milestones && application.milestones.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Milestones</h4>
                <div className="space-y-4">
                  {application.milestones.map(milestone => (
                    <PaymentMilestone 
                      key={milestone.id}
                      milestone={milestone}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-between">
              <div>
                <button 
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                  onClick={() => window.location.href = `/athlete/scholarships/applications/${application.id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
              </div>
              <div className="space-x-2">
                <button 
                  className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
                  onClick={() => {
                    // Implement report functionality
                    window.confirm('Do you want to report an issue with this application?');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationTracker;