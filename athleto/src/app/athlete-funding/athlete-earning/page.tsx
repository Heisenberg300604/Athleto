// pages/athlete/earnings.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AthleteNavbar from '@/components/AthleteNavbar';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  FaCoins, 
  FaPercentage, 
  FaMoneyBillWave, 
  FaInfoCircle, 
  FaTrophy,
  FaPlus,
  FaChartLine,
  FaHandHoldingUsd,
  FaRegCalendarAlt,
  FaCheckCircle
} from 'react-icons/fa';

// Type definitions
type MicroInvestment = {
  id: string;
  title: string;
  sport_category: string;
  funding_amount: number;
  earnings_percentage: number;
  investment_duration: number;
  current_amount_raised: number;
  status: string;
  created_at: string;
};

type Investor = {
  id: string;
  full_name: string;
  investment_amount: number;
  investment_date: string;
  payout_percentage: number;
};

type Earning = {
  id: string;
  microinvestment_id: string;
  earning_source: string;
  earning_amount: number;
  earning_date: string;
  distribution_status: string;
};

// Create Earning Modal Component
const CreateEarningModal = ({ 
  investment, 
  onClose, 
  onSuccess 
}: { 
  investment: MicroInvestment; 
  onClose: () => void; 
  onSuccess: () => void; 
}) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Common earning sources
  const commonSources = [
    'Prize Money', 'Sponsorship', 'Exhibition Match', 'Tournament Winnings', 
    'Endorsement Deal', 'Appearance Fee', 'Media Rights'
  ];
  
  const handleSubmit = async () => {
    if (!source || amount <= 0) {
      toast.error("Please fill all fields with valid values");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the earning record
      const { data, error } = await supabase
        .from('microinvestment_earnings')
        .insert({
          microinvestment_id: investment.id,
          earning_source: source,
          earning_amount: amount,
          earning_date: new Date(date).toISOString(),
          distribution_status: 'pending'
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error creating earning:", error);
        toast.error("Failed to record earning");
        return;
      }
      
      // Now distribute this earning to investors
      await distributeEarningToInvestors(data);
      
      toast.success("Earning recorded successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to distribute earnings to investors
  const distributeEarningToInvestors = async (earning: Earning) => {
    try {
      // Get all investors for this investment
      const { data: investments, error: investmentsError } = await supabase
        .from('microinvestment_investments')
        .select(`
          id,
          investor_id,
          investment_amount,
          contract_details
        `)
        .eq('microinvestment_id', investment.id)
        .eq('payment_status', 'completed');
      
      if (investmentsError || !investments?.length) {
        console.error("Error fetching investors:", investmentsError);
        return;
      }
      
      // Calculate distributions
      const distributions = investments.map(inv => {
        const investorShare = (inv.investment_amount / investment.funding_amount) * investment.earnings_percentage;
        const distributionAmount = Math.round((earning.earning_amount * investorShare) / 100);
        
        return {
          microinvestment_id: investment.id,
          microinvestment_earning_id: earning.id,
          investor_id: inv.investor_id,
          amount: distributionAmount,
          status: 'completed'
        };
      });
      
      // Insert all distributions
      const { error: distributionError } = await supabase
        .from('microinvestment_distributions')
        .insert(distributions);
      
      if (distributionError) {
        console.error("Error creating distributions:", distributionError);
      }
      
      // Update the earning status
      const { error: updateError } = await supabase
        .from('microinvestment_earnings')
        .update({ distribution_status: 'distributed' })
        .eq('id', earning.id);
      
      if (updateError) {
        console.error("Error updating earning status:", updateError);
      }
    } catch (error) {
      console.error("Error distributing earnings:", error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 text-white">
          <h2 className="text-xl font-bold">Record New Earning</h2>
          <p className="text-sm opacity-90">For {investment.title}</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Earning Source</label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="E.g., Tournament Prize"
              />
              
              <div className="flex flex-wrap gap-2 mt-2">
                {commonSources.map(src => (
                  <button
                    key={src}
                    onClick={() => setSource(src)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-gray-700 transition-colors"
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                title="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
              <div className="flex items-start gap-2">
                <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Investor Distribution</p>
                  <p className="mt-1">
                    Based on your investment agreement, ₹{((amount * investment.earnings_percentage) / 100).toLocaleString()} ({investment.earnings_percentage}%) 
                    will be distributed to your investors automatically.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !source || amount <= 0}
                className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-green-400"
              >
                {isSubmitting ? "Processing..." : "Record Earning"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main component
export default function AthleteEarnings() {
  const [investments, setInvestments] = useState<MicroInvestment[]>([]);
  const [selectedInvestment, setSelectedInvestment] = useState<MicroInvestment | null>(null);
  const [showNewEarningModal, setShowNewEarningModal] = useState(false);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Fetch athlete's investments on component mount
  useEffect(() => {
    fetchInvestments();
  }, []);
  
  // Fetch investors and earnings when an investment is selected
  useEffect(() => {
    if (selectedInvestment) {
      fetchInvestorsAndEarnings();
    }
  }, [selectedInvestment]);
  
  // Fetch the athlete's investments
  const fetchInvestments = async () => {
    setIsLoading(true);
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.session?.user) {
        router.push('/login');
        return;
      }
      
      // Get the athlete's profile ID
      const { data: profileData, error: profileError } = await supabase
      .from('athletes')
      .select('id')
      .eq('email', session.session.user.email)  // Use 'email' instead of 'user_id'
      .maybeSingle();
    
      if (profileError || !profileData) {
        toast.error("Failed to fetch your profile");
        return;
      }
      
      // Fetch investments where athlete_id matches the profile ID
      const { data, error } = await supabase
        .from('microinvestments')
        .select('*')
        .eq('athlete_id', profileData.id);
      
      if (error) {
        console.error("Error fetching investments:", error);
        toast.error("Failed to load your investments");
        return;
      }
      
      setInvestments(data as MicroInvestment[]);
      
      // Select the first investment by default if available
      if (data.length > 0) {
        setSelectedInvestment(data[0] as MicroInvestment);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };


  // Fetch investors and earnings for the selected investment
  const fetchInvestorsAndEarnings = async () => {
    if (!selectedInvestment) return;
    
    try {
      // Fetch investors for this investment
      const { data: investmentData, error: investmentError } = await supabase
        .from('microinvestment_investments')
        .select(`
          id,
          investor_id,
          brands:brands(id, brand_name),
          investment_amount,
          investment_date,
          contract_details
        `)
        .eq('microinvestment_id', selectedInvestment.id)
        .eq('payment_status', 'completed');
      
      if (investmentError) {
        console.error("Error fetching investors:", investmentError);
        toast.error("Failed to load investors");
        return;
      }
      
      // Transform the data to match the Investor type
      const investorData = investmentData.map(inv => ({
        id: inv.investor_id,
        full_name: inv.brands?.[0]?.brand_name || 'Unknown',
        investment_amount: inv.investment_amount,
        investment_date: inv.investment_date,
        payout_percentage: (inv.investment_amount / selectedInvestment.funding_amount) * selectedInvestment.earnings_percentage
      }));
      
      setInvestors(investorData);
      
      // Fetch earnings for this investment
      const { data: earningsData, error: earningsError } = await supabase
        .from('microinvestment_earnings')
        .select('*')
        .eq('microinvestment_id', selectedInvestment.id)
        .order('earning_date', { ascending: false });
      
      if (earningsError) {
        console.error("Error fetching earnings:", earningsError);
        toast.error("Failed to load earnings data");
        return;
      }
      
      setEarnings(earningsData);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };
  
  // Calculate total earnings amount
  const calculateTotalEarnings = () => {
    return earnings.reduce((sum, earning) => sum + earning.earning_amount, 0);
  };
  
  // Calculate total amount distributed to investors
  const calculateTotalDistributed = () => {
    if (!selectedInvestment) return 0;
    return Math.round((calculateTotalEarnings() * selectedInvestment.earnings_percentage) / 100);
  };
  
  // Calculate athlete's earnings after distributions
  const calculateAthleteEarnings = () => {
    return calculateTotalEarnings() - calculateTotalDistributed();
  };
  
  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle refresh after adding new earning
  const handleEarningAdded = () => {
    setShowNewEarningModal(false);
    fetchInvestorsAndEarnings();
    toast.success("Earning recorded and distributed to investors");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AthleteNavbar />
      <Toaster position="top-right" />
      
      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h1>
          
          {/* Investment Selector */}
          <div className="mt-4 sm:mt-0">
            <select 
              aria-label="Select Investment"
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={selectedInvestment?.id || ''}
              onChange={(e) => {
                const selected = investments.find(inv => inv.id === e.target.value);
                setSelectedInvestment(selected || null);
              }}
            >
              {investments.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.title} - {inv.sport_category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
              <p className="mt-3 text-gray-600">Loading your investment data...</p>
            </div>
          </div>
        ) : investments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FaCoins className="text-5xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Investments Found</h2>
            <p className="text-gray-600 mb-6">You haven't created any microinvestment campaigns yet.</p>
            <button 
              onClick={() => router.push('/athlete-funding/micro-investment')}
              className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <FaPlus className="inline mr-2" />
              Create Microinvestment
            </button>
          </div>
        ) : !selectedInvestment ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">Please select an investment to view earnings details.</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    Lifetime earnings from this investment
                  </p>
                </div>
              </div>
              
              {/* Investor Distributions */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
                  <div className="flex items-center">
                    <FaHandHoldingUsd className="text-white text-xl" />
                    <h3 className="ml-2 text-white font-medium">Investor Share</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{calculateTotalDistributed().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedInvestment.earnings_percentage}% of earnings distributed to investors
                  </p>
                </div>
              </div>
              
              {/* Your Earnings */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
                  <div className="flex items-center">
                    <FaTrophy className="text-white text-xl" />
                    <h3 className="ml-2 text-white font-medium">Your Earnings</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-3xl font-bold text-gray-800">
                    ₹{calculateAthleteEarnings().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your earnings after investor distributions
                  </p>
                </div>
              </div>
            </div>
            
            {/* Earnings Table and Investor List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Earnings Table - Takes up 2/3 of the width on large screens */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">Earnings History</h2>
                    <button
                      onClick={() => setShowNewEarningModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
                    >
                      <FaPlus className="mr-2" />
                      Record New Earning
                    </button>
                  </div>
                  
                  {earnings.length === 0 ? (
                    <div className="p-8 text-center">
                      <FaChartLine className="text-4xl text-gray-300 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-800 mb-1">No Earnings Recorded Yet</h3>
                      <p className="text-gray-500 mb-4">
                        Record your first earning to distribute funds to your investors.
                      </p>
                      <button
                        onClick={() => setShowNewEarningModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Record Earning
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Source
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {earnings.map((earning) => (
                            <tr key={earning.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900">{earning.earning_source}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-gray-900 font-medium">₹{earning.earning_amount.toLocaleString()}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-gray-500">{formatDate(earning.earning_date)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {earning.distribution_status === 'distributed' ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <FaCheckCircle className="mr-1" />
                                    Distributed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <FaRegCalendarAlt className="mr-1" />
                                    Pending
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Investors List - Takes up 1/3 of the width on large screens */}
              <div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-bold text-gray-800">Investors</h2>
                  </div>
                  
                  {investors.length === 0 ? (
                    <div className="p-8 text-center">
                      <p className="text-gray-500">
                        No investors have contributed to this investment yet.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-96">
                      <ul className="divide-y divide-gray-200">
                        {investors.map((investor) => (
                          <li key={investor.id} className="px-6 py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{investor.full_name}</p>
                                <p className="text-sm text-gray-500">Invested: ₹{investor.investment_amount.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">{formatDate(investor.investment_date)}</p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  <FaPercentage className="mr-1" />
                                  {investor.payout_percentage.toFixed(2)}%
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Create Earning Modal */}
      {showNewEarningModal && selectedInvestment && (
        <CreateEarningModal
          investment={selectedInvestment}
          onClose={() => setShowNewEarningModal(false)}
          onSuccess={handleEarningAdded}
        />
      )}
    </div>
  );
}