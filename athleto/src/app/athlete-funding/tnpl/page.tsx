// pages/athlete/tnpl/apply.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import { createTNPLApplication } from '@/services/tnplService';
import { RepaymentPlan, PaymentMethod } from '@/types/types';
import AthleteNavbar from '@/components/AthleteNavbar';
import Image from 'next/image';
import { Calendar, School, Award, CreditCard, Upload, Send , IndianRupee} from 'lucide-react';
import { useUser } from "@/context/UserContext";

export default function TNPLApplicationPage() {
  const router = useRouter();
 // const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const { athlete, loading } = useUser();
  console.log(athlete);
  
  const [formData, setFormData] = useState({
    loan_amount: 0,
    loan_purpose: '',
    repayment_plan: '' as RepaymentPlan,
    training_duration: '',
    training_institution: '',
    existing_sponsors: '',
    proof_of_performance: [] as string[],
    repayment_method: '' as PaymentMethod,
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real application, you would upload files to storage first
      // and then get URLs to store in the database
      const fileUrls = files.map(file => URL.createObjectURL(file));
      
      await createTNPLApplication({
        ...formData,
        athlete_id: athlete?.id ?? '', // This would come from authentication
        proof_of_performance: fileUrls,
      });
      
    //   toast({
    //     title: 'Application Submitted!',
    //     description: 'Your loan application has been submitted for review.',
    //   });
      
      router.push('/athlete-funding/tnpl');
    } catch (error) {
      console.error('Error submitting application:', error);
    //   toast({
    //     title: 'Error',
    //     description: 'There was an error submitting your application. Please try again.',
    //     variant: 'destructive',
    //   });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-blue-600 text-white">
            <h1 className="text-2xl font-bold">Train Now, Pay Later Application</h1>
            <p className="mt-1 text-sm">
              Apply for a zero-interest loan to fund your athletic training.
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Loan Details</span>
              </div>
              <div className="w-full border-t border-gray-200 my-4 mx-2" />
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Training Info</span>
              </div>
              <div className="w-full border-t border-gray-200 my-4 mx-2" />
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-xs mt-1">Verification</span>
              </div>
              <div className="w-full border-t border-gray-200 my-4 mx-2" />
              <div className={`flex flex-col items-center ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  4
                </div>
                <span className="text-xs mt-1">Review</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Loan Details */}
            {step === 1 && (
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="loan_amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Amount (₹)
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IndianRupee className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="loan_amount"
                        id="loan_amount"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        min="1000"
                        required
                        value={formData.loan_amount || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Minimum ₹1,000. Maximum depends on your profile verification.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="loan_purpose" className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Purpose
                    </label>
                    <textarea
                      name="loan_purpose"
                      id="loan_purpose"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What will you use this loan for? Be specific."
                      required
                      value={formData.loan_purpose}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="repayment_plan" className="block text-sm font-medium text-gray-700 mb-1">
                      Repayment Plan
                    </label>
                    <select
                      name="repayment_plan"
                      id="repayment_plan"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                      value={formData.repayment_plan}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a repayment plan</option>
                      <option value="Lump Sum">Lump Sum (One-time payment)</option>
                      <option value="Installments">Equal Monthly Installments</option>
                      <option value="Percentage of Future Earnings">Percentage of Future Earnings</option>
                    </select>
                    <p className="mt-2 text-xs text-gray-500">
                      {formData.repayment_plan === 'Lump Sum' && 
                        'You will  repay the entire loan amount in a single payment after your training is complete.'}
                      {formData.repayment_plan === 'Installments' && 
                        'You will  repay the loan in equal monthly installments after your training is complete.'}
                      {formData.repayment_plan === 'Percentage of Future Earnings' && 
                        'You will repay the loan as a percentage of your future sponsorships or earnings.'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Training Information */}
            {step === 2 && (
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="training_duration" className="block text-sm font-medium text-gray-700 mb-1">
                      Training Duration
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="training_duration"
                        id="training_duration"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g. 3 months, 1 year"
                        required
                        value={formData.training_duration}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="training_institution" className="block text-sm font-medium text-gray-700 mb-1">
                      Training Institution/Coach
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <School className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="training_institution"
                        id="training_institution"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Name of academy or coach"
                        required
                        value={formData.training_institution}
                        onChange={handleInputChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      We may contact the institution to verify your application.
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="existing_sponsors" className="block text-sm font-medium text-gray-700 mb-1">
                      Existing Sponsors (If Any)
                    </label>
                    <input
                      type="text"
                      name="existing_sponsors"
                      id="existing_sponsors"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="List any current sponsors or financial supporters"
                      value={formData.existing_sponsors}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next Step
                  </button>
                  </div>
              </div>
            )}
            
            {/* Step 3: Verification */}
            {step === 3 && (
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="proof_of_performance" className="block text-sm font-medium text-gray-700 mb-1">
                      Proof of Athletic Performance
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, PDF up to 10MB
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Upload certificates, videos, news articles, or any other proof of your athletic achievements.
                    </p>
                    
                    {files.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                        <ul className="mt-2 divide-y divide-gray-200 border rounded-md">
                          {files.map((file, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500"
                                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="repayment_method" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Repayment Method
                    </label>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="repayment_method_bank"
                          name="repayment_method"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          value="Bank Transfer"
                          checked={formData.repayment_method === 'Bank Transfer'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="repayment_method_bank" className="ml-3 block text-sm font-medium text-gray-700">
                          Bank Transfer
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="repayment_method_upi"
                          name="repayment_method"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          value="UPI"
                          checked={formData.repayment_method === 'UPI'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="repayment_method_upi" className="ml-3 block text-sm font-medium text-gray-700">
                          UPI
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="repayment_method_paypal"
                          name="repayment_method"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          value="PayPal"
                          checked={formData.repayment_method === 'PayPal'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="repayment_method_paypal" className="ml-3 block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="repayment_method_crypto"
                          name="repayment_method"
                          type="radio"
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          value="Crypto"
                          checked={formData.repayment_method === 'Crypto'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="repayment_method_crypto" className="ml-3 block text-sm font-medium text-gray-700">
                          Crypto (Coming Soon)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Review Your Application</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Loan Details</h4>
                      <dl className="mt-2">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Amount</dt>
                          <dd className="text-sm text-gray-900 font-semibold">₹{formData.loan_amount.toLocaleString()}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Purpose</dt>
                          <dd className="text-sm text-gray-900">{formData.loan_purpose}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Repayment Plan</dt>
                          <dd className="text-sm text-gray-900">{formData.repayment_plan}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Repayment Method</dt>
                          <dd className="text-sm text-gray-900">{formData.repayment_method}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Training Information</h4>
                      <dl className="mt-2">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Duration</dt>
                          <dd className="text-sm text-gray-900">{formData.training_duration}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Institution</dt>
                          <dd className="text-sm text-gray-900">{formData.training_institution}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Existing Sponsors</dt>
                          <dd className="text-sm text-gray-900">{formData.existing_sponsors || 'None'}</dd>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <dt className="text-sm font-medium text-gray-700">Uploaded Documents</dt>
                          <dd className="text-sm text-gray-900">{files.length} files</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          By submitting this application, you confirm that all information provided is accurate. False information may result in application rejection or loan termination.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}