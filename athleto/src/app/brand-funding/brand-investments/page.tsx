"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  FaMoneyBillWave, 
  FaCoins, 
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';

// Type definitions
type Investment = {
  id: string;
  title: string;
  athlete_name: string;
  investment_amount: number;
  investment_date: string;
  payout_percentage: number;
  microinvestment_id: string;
};

type Distribution = {
  id: string;
  microinvestment_id: string;
  microinvestment_title: string;
  athlete_name: string;
  earning_source: string;
  earning_amount: number;
  distribution_amount: number;
  earning_date: string;
  distribution_date: string;
  status: string;
};

export default function InvestorDistributions() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Fetch investor's investments on component mount
  useEffect(() => {
    fetchInvestments();
  }, []);
  
  // Fetch distributions when an investment is selected
  useEffect(() => {
    if (selectedInvestment) {
      fetchDistributions();
    } else {
      // If no investment is selected, fetch all distributions
      fetchAllDistributions();
    }
  }, [selectedInvestment]);
  
  // Fetch the investor's investments
  const fetchInvestments = async () => {
    setIsLoading(true);
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.session?.user) {
        router.push('/login');
        return;
      }
      
      // Get the investor's profile ID
      const { data: profileData, error: profileError } = await supabase
      .from('brands')
      .select('id')
      .eq('business_email', session.session.user.email)  // Corrected field
      .single();
    
      
      if (profileError || !profileData) {
        toast.error("Failed to fetch your profile");
        return;
      }
      
      // Fetch investments where investor_id matches the profile ID
      const { data, error } = await supabase
        .from('microinvestment_investments')
        .select(`
          id,
          microinvestment_id,
          microinvestments(title, athletes:athletes(email)),
          investment_amount,
          investment_date,
          contract_details
        `)
        .eq('investor_id', profileData.id)
        .eq('payment_status', 'completed');
      
      if (error) {
        console.error("Error fetching investments:", error);
        toast.error("Failed to load your investments");
        return;
      }
      
      // Transform the data to match the Investment type
      const investmentData = data.map(inv => ({
        id: inv.id,
        microinvestment_id: inv.microinvestment_id,
        title: inv.microinvestments[0].title,
        athlete_name: inv.microinvestments[0].athletes[0].email,
        investment_amount: inv.investment_amount,
        investment_date: inv.investment_date,
        payout_percentage: inv.contract_details?.payout_percentage || 0
      }));
      
      setInvestments(investmentData);
      
      // If there are investments, fetch all distributions by default
      if (investmentData.length > 0) {
        fetchAllDistributions();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch all distributions for the investor
  const fetchAllDistributions = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.user) {
        return;
      }
      
      // Get the investor's profile ID
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.session.user.id)
        .single();
      
      if (!profileData) return;
      
      // Fetch all distributions for this investor
      const { data, error } = await supabase
        .from('microinvestment_distributions')
        .select(`
          id,
          microinvestment_id,
          microinvestments(
            title,
            athletes:profiles(full_name)
          ),
          microinvestment_earning_id,
          microinvestment_earnings(
            earning_source,
            earning_amount,
            earning_date
          ),
          amount,
          created_at,
          status
        `)
        .eq('investor_id', profileData.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching distributions:", error);
        toast.error("Failed to load your earnings");
        return;
      }
      
      // Transform the data to match the Distribution type
      const distributionData = data.map(dist => ({
        id: dist.id,
        microinvestment_id: dist.microinvestment_id,
        microinvestment_title: dist.microinvestments[0].title,
        athlete_name: dist.microinvestments[0].athletes[0].full_name,
        earning_source: dist.microinvestment_earnings[0].earning_source,
        earning_amount: dist.microinvestment_earnings[0].earning_amount,
        distribution_amount: dist.amount,
        earning_date: dist.microinvestment_earnings[0].earning_date,
        distribution_date: dist.created_at,
        status: dist.status
      }));
      
      setDistributions(distributionData);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  
  // Fetch distributions for a specific investment
  const fetchDistributions = async () => {
    if (!selectedInvestment) return;
    
    try {
      // Fetch distributions for this specific investment
      const { data, error } = await supabase
        .from('microinvestment_distributions')
        .select(`
          id,
          microinvestment_id,
          microinvestments(
            title,
            athletes:profiles(full_name)
          ),
          microinvestment_earning_id,
          microinvestment_earnings(
            earning_source,
            earning_amount,
            earning_date
          ),
          amount,
          created_at,
          status
        `)
        .eq('microinvestment_id', selectedInvestment.microinvestment_id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching distributions:", error);
        toast.error("Failed to load earnings for this investment");
        return;
      }
      
      // Transform the data to match the Distribution type
      const distributionData = data.map(dist => ({
        id: dist.id,
        microinvestment_id: dist.microinvestment_id,
        microinvestment_title: dist.microinvestments[0].title,
        athlete_name: dist.microinvestments[0].athletes[0].full_name,
        earning_source: dist.microinvestment_earnings[0].earning_source,
        earning_amount: dist.microinvestment_earnings[0].earning_amount,
        distribution_amount: dist.amount,
        earning_date: dist.microinvestment_earnings[0].earning_date,
        distribution_date: dist.created_at,
        status: dist.status
      }));
      
      setDistributions(distributionData);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  
  // Calculate total earnings received
  const calculateTotalEarnings = () => {
    return distributions.reduce((sum, dist) => sum + dist.distribution_amount, 0);
  };
  
  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar  />
      <Toaster position="top-right" />
      
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Earnings</h1>
          
          {/* Investment Selector */}
          <div className="mt-4 sm:mt-0">
            <select 
              aria-label="Select Investment"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedInvestment?.id || ''}
              onChange={(e) => {
                if (e.target.value === '') {
                  setSelectedInvestment(null);
                } else {
                  const selected = investments.find(inv => inv.id === e.target.value);
                  setSelectedInvestment(selected || null);
                }
              }}
            >
              <option value="">All Investments</option>
              {investments.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.title} - {inv.athlete_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading your earnings data...</p>
            </div>
          </div>
        ) : investments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaCoins className="text-5xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Investments Pending Verification</h2>
            <p className="text-gray-600 mb-6">Your investments will be visible here once they are verified from our end. This process typically takes 1-2 days. Thank you for your patience!</p>
            <button 
              onClick={() => router.push('/brand-talent')}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Discover Athletes
            </button>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Investments */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
                  <div className="flex items-center">
                    <FaCoins className="text-white text-xl" />
                    <h3 className="ml-2 text-white font-medium">Total Investments</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-3xl font-bold text-gray-800">
                    {investments.length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Athletes you've invested in
                  </p>
                </div>
              </div>
              
              {/* Total Earnings */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-white text-xl" />
                    <h3 className="ml-2 text-white font-medium">Total Earnings</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{calculateTotalEarnings().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Total earnings from all investments
                  </p>
                </div>
              </div>
              
              {/* Total Distributions */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
                  <div className="flex items-center">
                    <FaTrophy className="text-white text-xl" />
                    <h3 className="ml-2 text-white font-medium">Total Distributions</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-3xl font-bold text-gray-800">
                    {distributions.length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Number of earning distributions received
                  </p>
                </div>
              </div>
            </div>
            
            {/* Distributions Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-bold text-gray-800">
                  {selectedInvestment 
                    ? `Earnings from ${selectedInvestment.title}` 
                    : "All Earnings"}
                </h2>
              </div>
              
              {distributions.length === 0 ? (
               <div className="p-8 text-center">
               <FaChartLine className="text-4xl text-gray-300 mx-auto mb-3" />
               <h3 className="text-lg font-medium text-gray-800 mb-1">No Earnings Received Yet</h3>
               <p className="text-gray-500">
                 {selectedInvestment 
                   ? `You haven't received any earnings from this investment yet.`
                   : `You haven't received any earnings from your investments yet.`}
               </p>
             </div>
           ) : (
             <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Athlete & Investment
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Earning Source
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Total Earned
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Your Share
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Dates
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Status
                     </th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {distributions.map((distribution) => (
                     <motion.tr 
                       key={distribution.id}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.3 }}
                       className="hover:bg-gray-50"
                     >
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="flex items-center">
                           <div>
                             <div className="text-sm font-medium text-gray-900">
                               {distribution.athlete_name}
                             </div>
                             <div className="text-sm text-gray-500">
                               {distribution.microinvestment_title}
                             </div>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm text-gray-900">{distribution.earning_source}</div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm text-gray-900">₹{distribution.earning_amount.toLocaleString()}</div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm font-medium text-green-600">₹{distribution.distribution_amount.toLocaleString()}</div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <div className="text-sm text-gray-900">
                           <div className="flex items-center mb-1">
                             <FaCalendarAlt className="text-gray-400 mr-1 text-xs" />
                             <span>Earned: {formatDate(distribution.earning_date)}</span>
                           </div>
                           <div className="flex items-center">
                             <FaCalendarAlt className="text-gray-400 mr-1 text-xs" />
                             <span>Distributed: {formatDate(distribution.distribution_date)}</span>
                           </div>
                         </div>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         {distribution.status === 'completed' ? (
                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                             <FaCheckCircle className="mr-1 mt-0.5" /> Paid
                           </span>
                         ) : distribution.status === 'pending' ? (
                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                             Pending
                           </span>
                         ) : (
                           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                             {distribution.status}
                           </span>
                         )}
                       </td>
                     </motion.tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
         </div>
         
         {/* Additional Information */}
         <div className="mt-8 bg-white rounded-xl shadow-md p-6">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Understanding Your Earnings</h2>
           <div className="space-y-4 text-gray-600">
             <p>
               As an investor, you receive a percentage of the athlete's earnings based on your investment contract. 
               Each time an athlete earns income from sponsorships, endorsements, prizes, or other sources, you receive 
               your share as a distribution.
             </p>
             <p>
               The "Total Earned" amount shows the full earning by the athlete for each event or income source.
               The "Your Share" amount shows your portion of that earning based on your investment percentage.
             </p>
             <p>
               Distributions are typically processed within 7-14 days after we receive the athlete's earnings.
               All payments are transferred directly to your connected bank account.
             </p>
           </div>
         </div>
       </>
     )}
   </div>
 </div>
);
}