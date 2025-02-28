import { useState } from 'react';
import { Application } from '@/app/brand-funding/scholarships/page';
import { toast } from 'react-hot-toast';

interface VerificationPanelProps {
  applications: Application[];
  onDocumentVerify: (applicationId: string, documentName: string, isVerified: boolean) => void;
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({ applications, onDocumentVerify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationInProgress, setVerificationInProgress] = useState<{applicationId: string, documentName: string} | null>(null);

  // Filter applications that have documents pending verification
  const applicationsWithPendingDocs = applications
    .map(app => ({
      ...app,
      pendingDocs: app.submittedDocuments.filter(doc => !doc.verified)
    }))
    .filter(app => 
      app.pendingDocs.length > 0 && (
        app.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const handleVerifyDocument = (applicationId: string, documentName: string, verify: boolean) => {
    setVerificationInProgress({ applicationId, documentName });
    
    // Simulate API call to Supabase
    setTimeout(() => {
      onDocumentVerify(applicationId, documentName, verify);
      setVerificationInProgress(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Document Verification Panel</h2>
        
        {/* Search bar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Applications
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search by athlete name or scholarship name..."
          />
        </div>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Pending Documents</p>
            <p className="text-2xl font-bold text-yellow-600">
              {applications.reduce((sum, app) => 
                sum + app.submittedDocuments.filter(doc => !doc.verified).length, 0
              )}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Verified Documents</p>
            <p className="text-2xl font-bold text-green-600">
              {applications.reduce((sum, app) => 
                sum + app.submittedDocuments.filter(doc => doc.verified).length, 0
              )}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Applications with Pending Verification</p>
            <p className="text-2xl font-bold text-blue-600">
              {applicationsWithPendingDocs.length}
            </p>
          </div>
        </div>
        
        {/* Pending Documents List */}
        {applicationsWithPendingDocs.length > 0 ? (
          <div className="space-y-6">
            {applicationsWithPendingDocs.map((application) => (
              <div key={application.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{application.athleteName}</h3>
                      <p className="text-sm text-gray-500">{application.scholarshipName}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Applied: {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-md font-medium mb-3">Pending Documents ({application.pendingDocs.length})</h4>
                  
                  <div className="space-y-3">
                    {application.pendingDocs.map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between bg-yellow-50 p-3 rounded-md border border-yellow-200">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <div>
                            <p className="text-gray-800 font-medium">{doc.name}</p>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                              View Document
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerifyDocument(application.id, doc.name, false)}
                            className="px-3 py-1 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                            disabled={verificationInProgress?.applicationId === application.id && verificationInProgress?.documentName === doc.name}
                          >
                            {verificationInProgress?.applicationId === application.id && verificationInProgress?.documentName === doc.name ? 
                              'Processing...' : 'Reject'}
                          </button>
                          
                          <button
                            onClick={() => handleVerifyDocument(application.id, doc.name, true)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                            disabled={verificationInProgress?.applicationId === application.id && verificationInProgress?.documentName === doc.name}
                          >
                            {verificationInProgress?.applicationId === application.id && verificationInProgress?.documentName === doc.name ? 
                              'Processing...' : 'Verify'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No documents pending verification.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationPanel;