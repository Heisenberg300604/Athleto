import { useState } from 'react';
import { Disbursement } from '@/app/brand-funding/scholarships/page';
import { toast } from 'react-hot-toast';

interface DisbursementTrackerProps {
  disbursements: Disbursement[];
  onDisbursementStatusUpdate: (disbursementId: string, newStatus: 'Pending' | 'Processing' | 'Completed' | 'Failed') => void;
}

const DisbursementTracker: React.FC<DisbursementTrackerProps> = ({ disbursements, onDisbursementStatusUpdate }) => {
  const [selectedDisbursement, setSelectedDisbursement] = useState<Disbursement | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter disbursements
  const filteredDisbursements = disbursements
    .filter(dis => 
      (filterStatus === 'all' || dis.status === filterStatus) &&
      (
        dis.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dis.milestoneDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const handleProcessPayment = (disbursement: Disbursement) => {
    setSelectedDisbursement(disbursement);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedDisbursement) return;
    
    setIsProcessing(true);
    
    // Simulate integration with Razorpay and API call to Supabase
    try {
      // Mock payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onDisbursementStatusUpdate(selectedDisbursement.id, 'Completed');
      toast.success('Payment processed successfully!');
      setShowPaymentModal(false);
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    let bgColor = '';
    switch (status) {
      case 'Pending':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Processing':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'Completed':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Failed':
        bgColor = 'bg-red-100 text-red-800';
        break;
      default:
        bgColor = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Disbursement Tracker</h2>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              aria-label="Filter by status"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Disbursements</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          
          <div className="md:w-2/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Athletes or Milestones
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search by athlete name or milestone description..."
            />
          </div>
        </div>
        
        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Disbursed</p>
            <p className="text-2xl font-bold">
              ₹{disbursements
                .filter(d => d.status === 'Completed')
                .reduce((sum, d) => sum + d.amount, 0)
                .toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending Amount</p>
            <p className="text-2xl font-bold text-yellow-600">
              ₹{disbursements
                .filter(d => d.status === 'Pending')
                .reduce((sum, d) => sum + d.amount, 0)
                .toLocaleString()}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Completed Payments</p>
            <p className="text-2xl font-bold text-green-600">
              {disbursements.filter(d => d.status === 'Completed').length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending Payments</p>
            <p className="text-2xl font-bold text-yellow-600">
              {disbursements.filter(d => d.status === 'Pending').length}
            </p>
          </div>
        </div>
        
        {/* Disbursements table */}
        {filteredDisbursements.length > 0 ? (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Milestone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDisbursements.map((disbursement) => (
                  <tr key={disbursement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{disbursement.athleteName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{disbursement.milestoneDescription}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{disbursement.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(disbursement.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {disbursement.disbursementDate 
                          ? new Date(disbursement.disbursementDate).toLocaleDateString() 
                          : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {disbursement.status === 'Pending' && (
                        <button
                          onClick={() => handleProcessPayment(disbursement)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Process Payment
                        </button>
                      )}
                      
                      {disbursement.status === 'Completed' && disbursement.transactionId && (
                        <span className="text-gray-500">
                          Txn: {disbursement.transactionId}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No disbursements found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Payment Processing Modal */}
      {showPaymentModal && selectedDisbursement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Process Payment</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Athlete</p>
                <p className="text-gray-800 font-medium">{selectedDisbursement.athleteName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Milestone</p>
                <p className="text-gray-800">{selectedDisbursement.milestoneDescription}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-gray-800 font-medium">₹{selectedDisbursement.amount.toLocaleString()}</p>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  Once processed, the amount will be transferred directly to the athlete's registered bank account.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isProcessing}
              >
                Cancel
              </button>
              
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisbursementTracker;