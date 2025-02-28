import { useState } from 'react';
import { Application } from '@/app/brand-funding/scholarships/page';
import toast from 'react-hot-toast';

interface ApplicationsListProps {
  applications: Application[];
  onApplicationStatusUpdate: (applicationId: string, newStatus: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed' | 'Completed') => void;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications, onApplicationStatusUpdate }) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'sport'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => 
      (filterStatus === 'all' || app.status === filterStatus) &&
      (
        app.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.athleteProfile.sport.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
          : new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
      } else if (sortBy === 'name') {
        return sortDirection === 'asc'
          ? a.athleteName.localeCompare(b.athleteName)
          : b.athleteName.localeCompare(a.athleteName);
      } else { // sport
        return sortDirection === 'asc'
          ? a.athleteProfile.sport.localeCompare(b.athleteProfile.sport)
          : b.athleteProfile.sport.localeCompare(a.athleteProfile.sport);
      }
    });

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (applicationId: string, newStatus: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed' | 'Completed') => {
    setStatusUpdateLoading(applicationId);
    
    // Simulate API call to Supabase
    setTimeout(() => {
      onApplicationStatusUpdate(applicationId, newStatus);
      setStatusUpdateLoading(null);
      
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication({
          ...selectedApplication,
          status: newStatus
        });
      }
    }, 1000);
  };

  const toggleSort = (field: 'date' | 'name' | 'sport') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = '';
    switch (status) {
      case 'Pending':
        bgColor = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Approved':
        bgColor = 'bg-green-100 text-green-800';
        break;
      case 'Rejected':
        bgColor = 'bg-red-100 text-red-800';
        break;
      case 'Disbursed':
        bgColor = 'bg-blue-100 text-blue-800';
        break;
      case 'Completed':
        bgColor = 'bg-purple-100 text-purple-800';
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
        <h2 className="text-2xl font-semibold mb-4">Scholarship & Grant Applications</h2>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              aria-label="Filter by Status"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Applications</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Disbursed">Disbursed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div className="md:w-2/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Athletes or Scholarships
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search by athlete name, sport, or scholarship name..."
            />
          </div>
        </div>
        
        {/* Applications table */}
        {filteredApplications.length > 0 ? (
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('sport')}>
                    Sport {sortBy === 'sport' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scholarship/Grant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => toggleSort('date')}>
                    Applied Date {sortBy === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full"
                            src={application.athleteProfile.profileImage}
                            alt={application.athleteName}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.athleteName}</div>
                          <div className="text-sm text-gray-500">{application.athleteProfile.level} Level</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.athleteProfile.sport}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.scholarshipName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={application.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No applications found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Application Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                <button 
                  title="Close"
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Athlete Info */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Athlete Information</h4>
                  <div className="flex items-center mb-4">
                    <img 
                      src={selectedApplication.athleteProfile.profileImage} 
                      alt={selectedApplication.athleteName}
                      className="h-16 w-16 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-xl font-bold">{selectedApplication.athleteName}</p>
                      <p className="text-gray-600">{selectedApplication.athleteProfile.sport} - {selectedApplication.athleteProfile.level} Level</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Achievements</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedApplication.athleteProfile.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right column - Application Info */}
                <div>
                  <h4 className="text-lg font-medium mb-4">Application Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Scholarship/Grant</p>
                      <p className="text-gray-800 font-medium">{selectedApplication.scholarshipName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="text-gray-800">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Current Status</p>
                      <StatusBadge status={selectedApplication.status} />
                    </div>
                    
                    {selectedApplication.notes && (
                      <div>
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-gray-800">{selectedApplication.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="font-medium mb-2">Submitted Documents</h5>
                    <div className="space-y-2">
                      {selectedApplication.submittedDocuments.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between border p-2 rounded">
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-gray-700">{doc.name}</span>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${doc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {doc.verified ? 'Verified' : 'Pending Verification'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 border-t pt-6">
                <div className="flex flex-wrap gap-3 justify-end">
                  {selectedApplication.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(selectedApplication.id, 'Rejected')}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                        disabled={statusUpdateLoading === selectedApplication.id}
                      >
                        {statusUpdateLoading === selectedApplication.id ? 'Processing...' : 'Reject Application'}
                      </button>
                      
                      <button
                        onClick={() => handleUpdateStatus(selectedApplication.id, 'Approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        disabled={statusUpdateLoading === selectedApplication.id}
                      >
                        {statusUpdateLoading === selectedApplication.id ? 'Processing...' : 'Approve Application'}
                      </button>
                    </>
                  )}
                  
                  {selectedApplication.status === 'Approved' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'Disbursed')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      disabled={statusUpdateLoading === selectedApplication.id}
                    >
                      {statusUpdateLoading === selectedApplication.id ? 'Processing...' : 'Mark as Disbursed'}
                    </button>
                  )}
                  
                  {selectedApplication.status === 'Disbursed' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedApplication.id, 'Completed')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      disabled={statusUpdateLoading === selectedApplication.id}
                    >
                      {statusUpdateLoading === selectedApplication.id ? 'Processing...' : 'Mark as Completed'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsList;