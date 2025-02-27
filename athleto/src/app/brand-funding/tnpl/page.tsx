"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getApprovedApplications, fundApplication , getAthleteApplications } from '@/services/tnplService';
import { TNPLApplication, PaymentMethod } from '@/types/types';
import BrandNavbar from '@/components/BrandNavbar';
import { 
  IndianRupee, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Medal, 
  Calendar,
  School,
  CreditCard,
  ArrowRight,
  User,
  Eye,
  Share2,
  Flag,
  UserX,
  ChevronDown,
  X
} from 'lucide-react';
import Image from 'next/image';

export default function BrandTNPLDashboard() {
  const router = useRouter();
  //const { toast } = useToast();
  const [applications, setApplications] = useState<TNPLApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<TNPLApplication | null>(null);
  const [fundAmount, setFundAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSupporters, setShowSupporters] = useState(false);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAthleteApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        toast({
          title: 'Error',
          description: 'There was an error loading athlete applications.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, [toast]);

  console.log(applications);
  
  const handleFundClick = (application: TNPLApplication) => {
    setSelectedApplication(application);
    // Set default fund amount to the remaining amount needed
    const remainingAmount = application.loan_amount - application.funding_progress;
    setFundAmount(remainingAmount);
    setShowFundModal(true);
  };
  
  const handleViewDetails = (application: TNPLApplication) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };
  
  const handleSubmitFunding = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedApplication) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real application, this would integrate with Razorpay or other payment gateways
      await fundApplication({
        tnpl_id: selectedApplication.id,
        brand_id: 'current-brand-id', // This would come from authentication
        amount: fundAmount,
        payment_method: paymentMethod,
      });
      
      toast({
        title: 'Funding Successful!',
        description: 'You have successfully funded the athlete.',
      });
      
      // Refresh the applications
      const updatedApplications = await getApprovedApplications();
      setApplications(updatedApplications);
      
      // Close the modal
      setShowFundModal(false);
    } catch (error) {
      console.error('Error submitting funding:', error);
      toast({
        title: 'Error',
        description: 'There was an error processing your funding. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleShareAthlete = () => {
    if (!selectedApplication?.athlete) return;
    
    // Create share URL
    const shareUrl = `${window.location.origin}/athletes/${selectedApplication.athlete.id}`;
    
    // Check if navigator.share is available (mobile devices primarily)
    if (navigator.share) {
      navigator.share({
        title: `Support ${selectedApplication.athlete.first_name} ${selectedApplication.athlete.last_name}`,
        text: `Check out this athlete looking for training support!`,
        url: shareUrl,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for desktop - copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
          title: 'Link Copied!',
          description: 'Athlete profile link copied to clipboard.',
        });
      });
    }
  };
  
  const handleReportAthlete = () => {
    if (!selectedApplication?.athlete) return;
    
    // In a real app, this would open a report form
    toast({
      title: 'Report Submitted',
      description: 'Thank you for your feedback. Our team will review this profile.',
    });
  };
  
  const handleBlockAthlete = () => {
    if (!selectedApplication?.athlete) return;
    
    // In a real app, this would call an API to block the athlete
    toast({
      title: 'Athlete Blocked',
      description: 'You will no longer see content from this athlete.',
    });
    
    setShowDetailsModal(false);
  };
  
  const closeAllModals = () => {
    setShowFundModal(false);
    setShowDetailsModal(false);
    setShowSupporters(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Train Now, Pay Later - Investment Opportunities
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Invest in athletes training and receive zero-interest repayments.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => router.push('/brand/tnpl/investments')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              My Investments
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No athlete applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no approved athlete loan applications at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white overflow-hidden shadow rounded-lg transition hover:shadow-md"
              >
                <div className="relative h-36 bg-blue-500">
                  {application.athlete?.video_link && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center">
                    <div className="h-16 w-16 rounded-full border-2 border-white bg-white overflow-hidden">
                      {application.athlete?.id ? (
                        <Image
                          src={`/athletes/${application.athlete.id}.jpg`}
                          alt={`${application.athlete?.first_name} ${application.athlete?.last_name}`}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-full w-full p-2 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white truncate">
                        {application.athlete?.first_name} {application.athlete?.last_name}
                      </h3>
                      <p className="text-sm text-white opacity-80">
                        {application.athlete?.skills && application.athlete.skills.length > 0
                          ? application.athlete.skills.join(', ')
                          : 'Athlete'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-5 sm:p-6">
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-500">Loan Amount</span>
                      <span className="font-semibold text-gray-900">₹{application.loan_amount.toLocaleString()}</span>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-500">Funded</span>
                        <span className="font-medium text-gray-900">
                          {Math.round((application.funding_progress / application.loan_amount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(application.funding_progress / application.loan_amount) * 100}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 text-right">
                        ₹{application.funding_progress.toLocaleString()} of ₹{application.loan_amount.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start">
                        <School className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{application.training_institution}</p>
                          <p className="text-xs text-gray-500">Training Institution</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{application.training_duration}</p>
                          <p className="text-xs text-gray-500">Training Duration</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{application.repayment_plan}</p>
                          <p className="text-xs text-gray-500">Repayment Plan</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Loan Purpose</h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{application.loan_purpose}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(application)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Eye className="mr-1.5 h-4 w-4 text-gray-500" />
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFundClick(application)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Fund Athlete
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Funding Modal */}
        {showFundModal && selectedApplication && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeAllModals}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <button
                  title="Close Modal"
                  type="button"
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowFundModal(false)}
                >
                  <X className="h-6 w-6" />
                </button>
                
                <form onSubmit={handleSubmitFunding}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <IndianRupee className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                          Fund Athlete: {selectedApplication.athlete?.first_name} {selectedApplication.athlete?.last_name}
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You're about to fund this athlete's training. Your contribution will help them achieve their goals.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-6">
                      <div>
                        <label htmlFor="fund_amount" className="block text-sm font-medium text-gray-700">
                          Funding Amount (₹)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IndianRupee className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="number"
                            name="fund_amount"
                            id="fund_amount"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            min="1000"
                            max={selectedApplication.loan_amount - selectedApplication.funding_progress}
                            required
                            value={fundAmount || ''}
                            onChange={(e) => setFundAmount(Number(e.target.value))}
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Remaining needed: ₹{(selectedApplication.loan_amount - selectedApplication.funding_progress).toLocaleString()}
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700">
                          Payment Method
                        </label>
                        <select
                          id="payment_method"
                          name="payment_method"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                        >
                          <option value="UPI">UPI</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Crypto">Cryptocurrency</option>
                        </select>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-start">
                          <div>
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          </div>
                          <div className="text-sm text-gray-500">
                            <p className="font-medium text-gray-700">Zero Interest Returns</p>
                            <p>You'll receive 100% of your investment back according to the repayment plan.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Funding'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowFundModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Athlete Details Modal */}
        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeAllModals}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <button
                  title = "Close Modal"
                  type="button"
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <X className="h-6 w-6" />
                </button>
                
                <div className="bg-white">
                  <div className="relative h-48 bg-blue-600">
                    {selectedApplication.athlete?.video_link && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer">
                        <div className="rounded-full bg-white bg-opacity-80 p-3">
                          <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative px-4 sm:px-6 -mt-16">
                    <div className="flex justify-between">
                      <div className="flex items-end">
                        <div className="h-20 w-20 rounded-full border-4 border-white bg-white overflow-hidden">
                          {selectedApplication.athlete?.id ? (
                            <Image
                              src={`/athletes/${selectedApplication.athlete.id}.jpg`}
                              alt={`${selectedApplication.athlete?.first_name} ${selectedApplication.athlete?.last_name}`}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-full w-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4 mb-1">
                          <h2 className="text-xl font-bold text-gray-900">
                            {selectedApplication.athlete?.first_name} {selectedApplication.athlete?.last_name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {selectedApplication.athlete?.skills && selectedApplication.athlete.skills.length > 0
                              ? selectedApplication.athlete.skills.join(', ')
                              : 'Athlete'}
                            {selectedApplication.athlete?.location && ` • ${selectedApplication.athlete.location}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <button
                          title="Share Athlete"
                          type="button"
                          onClick={handleShareAthlete}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button
                          title="Report Athlete"
                          type="button"
                          onClick={handleReportAthlete}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Flag className="h-4 w-4" />
                        </button>
                        <button
                          title="Block Athlete"
                          type="button"
                          onClick={handleBlockAthlete}
                          className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <UserX className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">TNPL Application Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Loan Amount</p>
                            <p className="text-base font-semibold">₹{selectedApplication.loan_amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Funding Progress</p>
                            <div className="flex items-center">
                              <div className="flex-grow mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${(selectedApplication.funding_progress / selectedApplication.loan_amount) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-sm font-medium">
                                {Math.round((selectedApplication.funding_progress / selectedApplication.loan_amount) * 100)}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Training Institution</p>
                            <p className="text-base">{selectedApplication.training_institution}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Training Duration</p>
                            <p className="text-base">{selectedApplication.training_duration}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Repayment Plan</p>
                            <p className="text-base">{selectedApplication.repayment_plan}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Repayment Method</p>
                            <p className="text-base">{selectedApplication.repayment_method}</p>
                          </div>
                          {selectedApplication.existing_sponsors && (
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Existing Sponsors</p>
                              <p className="text-base">{selectedApplication.existing_sponsors}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Loan Purpose</h3>
                        <p className="text-base text-gray-700">{selectedApplication.loan_purpose}</p>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">Current Supporters</h3>
                          <button
                            type="button"
                            onClick={() => setShowSupporters(!showSupporters)}
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                          >
                            {showSupporters ? 'Hide' : 'Show'} 
                            <ChevronDown className={`ml-1 h-4 w-4 transform ${showSupporters ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        
                        {showSupporters && (
                          <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
                            {selectedApplication.supporters && selectedApplication.supporters.length > 0 ? (
                              <ul className="divide-y divide-gray-200">
                                {selectedApplication.supporters.map((supporter, index) => (
                                  <li key={index} className="px-4 py-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        {supporter.logo ? (
                                          <Image
                                            src={supporter.logo}
                                            alt={supporter.name}
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 rounded-full"
                                          />
                                        ) : (
                                          <User className="h-4 w-4 text-gray-500" />
                                        )}
                                      </div>
                                      <span className="ml-2 text-sm font-medium">{supporter.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">₹{supporter.amount.toLocaleString()}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="px-4 py-3 text-sm text-gray-500">
                                No supporters yet. Be the first to support this athlete!
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Athlete Background</h3>
                        <p className="text-base text-gray-700">
                          {selectedApplication.athlete?.background || 
                            "This athlete hasn't provided a detailed background yet."}
                        </p>
                      </div>
                      
                      {selectedApplication.athlete?.achievements && selectedApplication.athlete.achievements.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Achievements</h3>
                          <ul className="space-y-2">
                            {selectedApplication.athlete.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start">
                                <Medal className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-base text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedApplication.athlete?.goals && (
                        <div className="mb-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Future Goals</h3>
                          <p className="text-base text-gray-700">{selectedApplication.athlete.goals}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleFundClick(selectedApplication);
                      }}
                    >
                      Fund Athlete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}