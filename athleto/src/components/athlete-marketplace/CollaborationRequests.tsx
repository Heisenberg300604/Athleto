import React from 'react';
import { format } from 'date-fns';

type CollaborationRequest = {
  id: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed';
  companyName: string;
  paymentAmount: number;
  duration: string;
  dateTime: string;
  description: string;
  gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
};

type Props = {
  requests: CollaborationRequest[];
  onAccept: (requestId: string) => void;
  onDecline: (requestId: string) => void;
};

const CollaborationRequests: React.FC<Props> = ({ requests, onAccept, onDecline }) => {
  // Filter requests by status
  const pendingRequests = requests.filter(req => req.status === 'Pending');
  const acceptedRequests = requests.filter(req => req.status === 'Accepted');
  const completedRequests = requests.filter(req => req.status === 'Completed');
  
  const [activeTab, setActiveTab] = React.useState<'Pending' | 'Accepted' | 'Completed'>('Pending');

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Collaboration Opportunities
        </h3>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`${
              activeTab === 'Pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex-1 text-center`}
          >
            Pending ({pendingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('Accepted')}
            className={`${
              activeTab === 'Accepted'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex-1 text-center`}
          >
            Accepted ({acceptedRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('Completed')}
            className={`${
              activeTab === 'Completed'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex-1 text-center`}
          >
            Completed ({completedRequests.length})
          </button>
        </nav>
      </div>
      
      {/* Request List */}
      <div className="divide-y divide-gray-200">
        {activeTab === 'Pending' && pendingRequests.length === 0 && (
          <p className="p-6 text-center text-gray-500">No pending requests.</p>
        )}
        
        {activeTab === 'Accepted' && acceptedRequests.length === 0 && (
          <p className="p-6 text-center text-gray-500">No accepted requests.</p>
        )}
        
        {activeTab === 'Completed' && completedRequests.length === 0 && (
          <p className="p-6 text-center text-gray-500">No completed requests.</p>
        )}
        
        {activeTab === 'Pending' && pendingRequests.map(request => (
          <div key={request.id} className="p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div>
                <h4 className="text-lg font-medium text-gray-900">
                  {request.gigType} with {request.companyName}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <div className="ml-4 mt-2 sm:mt-0 flex-shrink-0">
                <p className="text-lg font-medium text-gray-900">₹{request.paymentAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
            
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => onDecline(request.id)}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Decline
              </button>
              <button
                onClick={() => onAccept(request.id)}
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'Accepted' && acceptedRequests.map(request => (
          <div key={request.id} className="p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div>
                <div className="flex items-center">
                  <h4 className="text-lg font-medium text-gray-900">
                    {request.gigType} with {request.companyName}
                  </h4>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Accepted
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <div className="ml-4 mt-2 sm:mt-0 flex-shrink-0">
                <p className="text-lg font-medium text-gray-900">₹{request.paymentAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <h5 className="text-sm font-medium text-gray-900">Next Steps</h5>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>• Brand will contact you with further details</li>
                <li>• Prepare for the {request.gigType.toLowerCase()} as per the description</li>
                <li>• Complete the gig to receive payment</li>
              </ul>
            </div>
          </div>
        ))}
        
        {activeTab === 'Completed' && completedRequests.map(request => (
          <div key={request.id} className="p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div>
                <div className="flex items-center">
                  <h4 className="text-lg font-medium text-gray-900">
                    {request.gigType} with {request.companyName}
                  </h4>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Completed
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <div className="ml-4 mt-2 sm:mt-0 flex-shrink-0">
                <p className="text-lg font-medium text-gray-900">₹{request.paymentAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
            
            <div className="mt-6 bg-green-50 p-4 rounded-md text-green-800">
              <p className="text-sm font-medium">Payment of ₹{request.paymentAmount.toLocaleString()} has been processed to your account.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationRequests;
