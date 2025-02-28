import React from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

type CollaborationRequest = {
  id: string;
  athleteId: string;
  athleteName: string;
  athleteContact?: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Completed';
  gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
  dateTime: string;
  duration: string;
  paymentAmount: number;
  description: string;
};

type Props = {
  requests: CollaborationRequest[];
  onConfirmCompletion: (requestId: string) => void;
};

const PostedRequests: React.FC<Props> = ({ requests, onConfirmCompletion }) => {
  // Filter by status
  const pendingRequests = requests.filter(req => req.status === 'Pending');
  const acceptedRequests = requests.filter(req => req.status === 'Accepted');
  const completedRequests = requests.filter(req => req.status === 'Completed');
  
  const [activeTab, setActiveTab] = React.useState<'Pending' | 'Accepted' | 'Completed'>('Pending');
  
  // Handle payment processing
  const handleProcessPayment = (request: CollaborationRequest) => {
    toast.success('Payment processed via Razorpay. Funds placed in escrow.');
    // In a real implementation, this would trigger the payment gateway
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Posted Collaboration Requests
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
          <div key={request.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">
                  {request.gigType} with {request.athleteName}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
          </div>
        ))}
        
        {activeTab === 'Accepted' && acceptedRequests.map(request => (
          <div key={request.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">
                  {request.gigType} with {request.athleteName}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Accepted
              </span>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
            
            {request.athleteContact && (
              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Contact:</span> {request.athleteContact}
                </p>
              </div>
            )}
            
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleProcessPayment(request)}
                className="px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Process Payment (₹{request.paymentAmount.toLocaleString()})
              </button>
              
              <button
                onClick={() => onConfirmCompletion(request.id)}
                className="px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Confirm Completion
              </button>
            </div>
          </div>
        ))}
        
        {activeTab === 'Completed' && completedRequests.map(request => (
          <div key={request.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-medium text-gray-900">
                  {request.gigType} with {request.athleteName}
                </h4>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(request.dateTime), 'MMM dd, yyyy • h:mm a')} • {request.duration}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Completed
              </span>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
            
            <div className="mt-4 bg-green-50 p-3 rounded-md">
              <p className="text-sm text-green-800">
                Payment of ₹{request.paymentAmount.toLocaleString()} has been released to {request.athleteName}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostedRequests;