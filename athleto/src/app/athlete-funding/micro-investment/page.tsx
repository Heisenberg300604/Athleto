// pages/athlete/create-proposal.tsx
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import AthleteNavbar from '@/components/AthleteNavbar';
import { toast, Toaster } from 'react-hot-toast';
import { FaCoins, FaPercentage, FaCalendarAlt, FaRunning, FaTrophy, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Form input types
type ProposalInput = {
  title: string;
  funding_amount: number;
  earnings_percentage: number;
  investment_duration: number;
  sport_category: string;
  achievements: string;
  investment_reason: string;
};

// Preview card component
const ProposalPreviewCard = ({ data }: { data: ProposalInput }) => {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <h3 className="text-xl font-bold">{data.title || "Your Proposal Title"}</h3>
        <p className="text-sm">{data.sport_category || "Your Sport"}</p>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <FaCoins className="text-yellow-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Funding Required</p>
            <p className="font-bold">₹{data.funding_amount?.toLocaleString() || "0"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <FaPercentage className="text-green-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Earnings Percentage</p>
            <p className="font-bold">{data.earnings_percentage || "0"}%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-purple-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Investment Duration</p>
            <p className="font-bold">{data.investment_duration || "0"} years</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <FaTrophy className="text-amber-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Key Achievements</p>
            <p className="font-medium text-sm line-clamp-2">{data.achievements || "Your achievements will appear here"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <FaInfoCircle className="text-blue-500 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Investment Reason</p>
            <p className="font-medium text-sm line-clamp-2">{data.investment_reason || "Your reason will appear here"}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full w-0"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">₹0 of ₹{data.funding_amount?.toLocaleString() || "0"} raised</p>
        </div>
        
        <button disabled className="w-full py-2 bg-gray-200 text-gray-500 rounded-lg font-medium mt-4">
          Invest Now (Preview)
        </button>
      </div>
    </div>
  );
};

export default function CreateProposal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewActive, setPreviewActive] = useState(false);
  const router = useRouter();
  
  // Form setup with react-hook-form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProposalInput>();
  
  // Current form values for preview
  const currentValues = watch();
  
  // Handle form submission
  const onSubmit: SubmitHandler<ProposalInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.session?.user) {
        toast.error("You must be logged in to create a proposal");
        return;
      }
      
      // Get the athlete's profile ID
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (profileError || !profileData) {
        toast.error("Failed to fetch your profile");
        return;
      }
      
      // Insert the new proposal
      const { data: proposal, error } = await supabase
        .from('microinvestments')
        .insert({
          athlete_id: profileData.id,
          title: data.title,
          sport_category: data.sport_category,
          funding_amount: data.funding_amount,
          earnings_percentage: data.earnings_percentage,
          investment_duration: data.investment_duration,
          achievements: data.achievements,
          investment_reason: data.investment_reason
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error creating proposal:", error);
        toast.error("Failed to create proposal");
        return;
      }
      
      toast.success("Proposal created successfully!");
      
      // Redirect to the athlete dashboard
      setTimeout(() => {
        router.push('/athlete/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Create Investment Proposal</h1>
            <p className="text-gray-600 mt-2">Tokenize your future earnings and get funding for your sports career</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form Section */}
            <div className="flex-1 bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-4 h-4 rounded-full ${!previewActive ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <h2 className="text-lg font-semibold">Fill Details</h2>
                <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                <div className={`w-4 h-4 rounded-full ${previewActive ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <h2 className="text-lg font-semibold">Preview</h2>
              </div>
              
              {!previewActive ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Proposal Title</label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="E.g., Support My Olympic Journey"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Funding Amount (₹)</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          {...register("funding_amount", { 
                            required: "Funding amount is required",
                            min: { value: 10000, message: "Minimum funding is ₹10,000" } 
                          })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="500000"
                        />
                      </div>
                      {errors.funding_amount && <p className="mt-1 text-sm text-red-600">{errors.funding_amount.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Earnings Percentage (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          {...register("earnings_percentage", { 
                            required: "Percentage is required",
                            min: { value: 1, message: "Minimum 1%" },
                            max: { value: 30, message: "Maximum 30%" }
                          })}
                          className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="10"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                      </div>
                      {errors.earnings_percentage && <p className="mt-1 text-sm text-red-600">{errors.earnings_percentage.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Investment Duration (Years)</label>
                      <input
                        type="number"
                        {...register("investment_duration", { 
                          required: "Duration is required",
                          min: { value: 1, message: "Minimum 1 year" },
                          max: { value: 10, message: "Maximum 10 years" }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="5"
                      />
                      {errors.investment_duration && <p className="mt-1 text-sm text-red-600">{errors.investment_duration.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sport Category</label>
                      <select
                        {...register("sport_category", { required: "Sport category is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Sport</option>
                        <option value="Athletics">Athletics</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Boxing">Boxing</option>
                        <option value="Cricket">Cricket</option>
                        <option value="Football">Football</option>
                        <option value="Hockey">Hockey</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Wrestling">Wrestling</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.sport_category && <p className="mt-1 text-sm text-red-600">{errors.sport_category.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
                    <textarea
                      {...register("achievements", { required: "Achievements are required" })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="List your key achievements, medals, rankings, etc."
                    ></textarea>
                    {errors.achievements && <p className="mt-1 text-sm text-red-600">{errors.achievements.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why You Need Investment</label>
                    <textarea
                      {...register("investment_reason", { required: "Investment reason is required" })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Explain why you need funding and how you will use it"
                    ></textarea>
                    {errors.investment_reason && <p className="mt-1 text-sm text-red-600">{errors.investment_reason.message}</p>}
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPreviewActive(true)}
                      className="flex-1 px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      Preview <FaArrowRight />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <p className="text-gray-700">Review your proposal below. If everything looks correct, you can submit it.</p>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPreviewActive(false)}
                      className="flex-1 px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                    >
                      Edit Details
                    </button>
                    
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Proposal"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Preview Section */}
            <div className="lg:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Investor Preview</h3>
              <p className="text-sm text-gray-600 mb-6">This is how your proposal will appear to potential investors</p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProposalPreviewCard data={currentValues} />
              </motion.div>
              
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h4 className="text-blue-800 font-medium flex items-center gap-2">
                  <FaInfoCircle /> How It Works
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">1</span>
                    <span>Your proposal goes live after submission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">2</span>
                    <span>Investors can choose to fund your proposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">3</span>
                    <span>Once funded, you'll receive the money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center mt-0.5">4</span>
                    <span>When you earn, investors receive their share</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}