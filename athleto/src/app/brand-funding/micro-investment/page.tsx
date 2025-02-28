// pages/brand/invest.tsx
"use client"
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  FaCoins, 
  FaPercentage, 
  FaCalendarAlt, 
  FaRunning, 
  FaTrophy, 
  FaInfoCircle, 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown,
  FaArrowUp,
  FaMoneyBillWave,
  FaWallet,
  FaBitcoin
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Type definitions
type AthleteProfile = {
  id: string;
  full_name: string;
  avatar_url: string | null;
};

type MicroInvestment = {
  id: string;
  athlete_id: string;
  title: string;
  sport_category: string;
  funding_amount: number;
  earnings_percentage: number;
  investment_duration: number;
  achievements: string;
  investment_reason: string;
  current_amount_raised: number;
  created_at: string;
  athlete: AthleteProfile;
};

type InvestmentModalProps = {
  investment: MicroInvestment;
  onClose: () => void;
  onSuccess: () => void;
};

// Investment Modal Component
const InvestmentModal = ({ investment, onClose, onSuccess }: InvestmentModalProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'crypto'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const router = useRouter();
  
  // Quick amount buttons
  const quickAmounts = [
    { label: '₹10,000', value: 10000 },
    { label: '₹25,000', value: 25000 },
    { label: '₹50,000', value: 50000 },
    { label: '₹1,00,000', value: 100000 },
  ];
  
  const handleInvest = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current user session
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.session?.user) {
        toast.error("You must be logged in to invest");
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
      
      if (paymentMethod === 'upi') {
        // For UPI, we're proceeding directly (in a real app, would integrate with payment gateway)
        setStep(2);
        
        // Create the investment record
        const { data, error } = await supabase
          .from('microinvestment_investments')
          .insert({
            microinvestment_id: investment.id,
            investor_id: profileData.id,
            investment_amount: amount,
            payment_method: 'upi',
            payment_status: 'completed',
            contract_details: {
              earnings_percentage: investment.earnings_percentage,
              investment_duration: investment.investment_duration,
              investor_share: (amount / investment.funding_amount) * investment.earnings_percentage
            }
          });
        
        if (error) {
          console.error("Error creating investment:", error);
          toast.error("Failed to process investment");
          return;
        }
        
        // Update the amount raised in the microinvestment
        const { error: updateError } = await supabase
          .from('microinvestments')
          .update({ 
            current_amount_raised: investment.current_amount_raised + amount 
          })
          .eq('id', investment.id);
        
        if (updateError) {
          console.error("Error updating amount raised:", updateError);
        }
        
        toast.success("Investment successful!");
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        // For crypto, just show a success message
        toast.success("Smart contract creation initiated!");
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render payment confirmation step
  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
        >
          <div className="bg-green-500 p-6 text-white text-center">
            <div className="rounded-full bg-white w-16 h-16 mx-auto flex items-center justify-center">
              <FaCoins className="text-green-500 text-2xl" />
            </div>
            <h2 className="text-xl font-bold mt-4">Investment Confirmed!</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600">You have successfully invested</p>
                <p className="text-3xl font-bold text-gray-800">₹{amount.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">in {investment.title}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Investment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Share</span>
                    <span className="font-medium">{((amount / investment.funding_amount) * investment.earnings_percentage).toFixed(2)}% of earnings</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{investment.investment_duration} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">{paymentMethod.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                A smart contract has been generated for this investment. You will receive your share of the athlete's earnings according to the terms.
              </p>
              
              <button 
                onClick={() => router.push('/brand-funding/brand-investments')}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View My Investments
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Render investment modal (step 1)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
          <h2 className="text-xl font-bold">Invest in {investment.title}</h2>
          <p className="text-sm opacity-90">{investment.sport_category} • {investment.athlete?.full_name || 'Athlete'}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Investment Amount</h3>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter amount"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount.value}
                  onClick={() => setAmount(quickAmount.value)}
                  className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors text-sm"
                >
                  {quickAmount.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaWallet className="text-2xl" />
                <span className="font-medium">UPI Payment</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                  paymentMethod === 'crypto'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaBitcoin className="text-2xl" />
                <span className="font-medium">Crypto</span>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Investment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Amount</span>
                <span className="font-medium">₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Earnings Percentage</span>
                <span className="font-medium">{investment.earnings_percentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Share</span>
                <span className="font-medium">{amount > 0 ? ((amount / investment.funding_amount) * investment.earnings_percentage).toFixed(2) : '0'}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment Duration</span>
                <span className="font-medium">{investment.investment_duration} years</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={handleInvest}
              disabled={isSubmitting || amount <= 0}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isSubmitting ? "Processing..." : "Invest Now"}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            By investing, you agree to the terms and conditions of the micro-investment platform.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Investment card component
const InvestmentCard = ({ investment, onClick }: { investment: MicroInvestment; onClick: () => void }) => {
  const progressPercentage = (investment.current_amount_raised / investment.funding_amount) * 100;
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <h3 className="text-lg font-bold">{investment.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <FaRunning className="text-white opacity-80" />
          <p className="text-sm">{investment.sport_category}</p>
        </div>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {investment.athlete?.avatar_url ? (
              <Image 
                src={investment.athlete.avatar_url} 
                alt={investment.athlete.full_name} 
                width={48} 
                height={48} 
              />
            ) : (
              <span className="text-gray-400 text-xl">{investment.athlete?.full_name.charAt(0) || 'A'}</span>
            )}
          </div>
          <div>
            <p className="font-medium">{investment.athlete?.full_name || 'Athlete'}</p>
            <p className="text-sm text-gray-500">{new Date(investment.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <FaCoins className="text-blue-500" />
              <span>Funding Required</span>
            </div>
            <p className="font-bold text-gray-800 mt-1">₹{investment.funding_amount.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <FaPercentage className="text-green-500" />
              <span>Earnings Percentage</span>
            </div>
            <p className="font-bold text-gray-800 mt-1">{investment.earnings_percentage}% for {investment.investment_duration} yrs</p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">₹{investment.current_amount_raised.toLocaleString()} of ₹{investment.funding_amount.toLocaleString()} raised</p>
        </div>
        
        <div className="text-sm text-gray-700 line-clamp-2">
          <FaTrophy className="inline-block mr-1 text-amber-500" /> 
          {investment.achievements}
        </div>
        
        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          View Details & Invest
        </button>
      </div>
    </motion.div>
  );
};

// Main component
export default function BrandInvest() {
  const [investments, setInvestments] = useState<MicroInvestment[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<MicroInvestment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('');
  const [selectedInvestment, setSelectedInvestment] = useState<MicroInvestment | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'funding' | 'progress'>('newest');
  const router = useRouter();
  
  // Available sport categories for filtering
  const sportCategories = [
    'Athletics', 'Badminton', 'Basketball', 'Boxing', 'Cricket', 
    'Football', 'Hockey', 'Swimming', 'Tennis', 'Wrestling', 'Other'
  ];
  
  // Fetch investments on component mount
  useEffect(() => {
    fetchInvestments();
  }, []);
  
  // Apply filters and search when dependencies change
  useEffect(() => {
    if (!investments.length) return;
    
    let filtered = [...investments];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(inv => 
        inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.sport_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.athlete?.full_name && inv.athlete.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply sport filter
    if (sportFilter) {
      filtered = filtered.filter(inv => inv.sport_category === sportFilter);
    }
    
    // Apply sorting
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortOrder === 'funding') {
      filtered.sort((a, b) => b.funding_amount - a.funding_amount);
    } else if (sortOrder === 'progress') {
      filtered.sort((a, b) => {
        const progressA = (a.current_amount_raised / a.funding_amount) * 100;
        const progressB = (b.current_amount_raised / b.funding_amount) * 100;
        return progressB - progressA;
      });
    }
    
    setFilteredInvestments(filtered);
  }, [investments, searchTerm, sportFilter, sortOrder]);
  
  const fetchInvestments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('microinvestments')
        .select(`
          *,
          athletes:athlete_id (
            id,
            first_name,
            last_name,
            profile_picture
          )
        `)
        .eq('status', 'active');
  
      if (error) {
        console.error("Error fetching investments:", error);
        toast.error("Failed to load investment opportunities");
        return;
      }
  
      setInvestments(data as MicroInvestment[]);
      setFilteredInvestments(data as MicroInvestment[]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  // Handle successful investment
  const handleInvestmentSuccess = () => {
    fetchInvestments();
    setSelectedInvestment(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <Toaster position="top-center" />
      
      {selectedInvestment && (
        <InvestmentModal 
          investment={selectedInvestment} 
          onClose={() => setSelectedInvestment(null)} 
          onSuccess={handleInvestmentSuccess}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Athlete Investment Opportunities</h1>
            <p className="text-gray-600 mt-2">
              Support promising athletes and earn returns based on their future success
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by athlete name, sport or keywords"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:w-48">
                <select
                  aria-label="Sport Category"
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">All Sports</option>
                  {sportCategories.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:w-48">
                <select
                  aria-label="Sort Order"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'newest' | 'funding' | 'progress')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="funding">Highest Funding</option>
                  <option value="progress">Most Funded %</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Investment Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-md h-80"></div>
              ))}
            </div>
          ) : filteredInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestments.map(investment => (
                <InvestmentCard 
                  key={investment.id} 
                  investment={investment} 
                  onClick={() => setSelectedInvestment(investment)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaInfoCircle className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Investment Opportunities Found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}