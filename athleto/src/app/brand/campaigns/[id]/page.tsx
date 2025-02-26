// pages/brand/campaigns/[id]/support.tsx
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';
import Script from 'next/script';

// Define TypeScript interfaces
interface Campaign {
  id: string;
  title: string;
  description: string;
  funding_amount: number;
  current_funding: number;
  progress_percentage: number;
  athlete_name: string;
  brand_id: string;
}

// Create a type for the Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SupportCampaign() {
  const router = useRouter();
  const { id } = router.query;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<number>(1000);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showCryptoOption, setShowCryptoOption] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCampaignDetails();
    }
  }, [id]);

  useEffect(() => {
    // Show crypto option if amount is ≥ ₹250,000 (equivalent to ~$5000)
    setShowCryptoOption(amount >= 250000);
  }, [amount]);

  const fetchCampaignDetails = async () => {
    try {
      // Get campaign details
      const { data: campaignData, error } = await supabase
        .from('opportunity')
        .select('id, title, description, funding_amount, brand_id')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (campaignData) {
        // Get brand info (using as athlete info)
        const { data: brandData } = await supabase
          .from('brands')
          .select('first_name, last_name')
          .eq('id', campaignData.brand_id)
          .single();

        // Get current funding
        const { data: paymentsData } = await supabase
          .from('payments')
          .select('amount')
          .eq('transaction_id', campaignData.id);

        const totalFunding = paymentsData ? 
          paymentsData.reduce((sum, payment) => sum + payment.amount, 0) : 0;
        
        const progressPercentage = campaignData.funding_amount > 0 ? 
          Math.min(100, (totalFunding / campaignData.funding_amount) * 100) : 0;

        setCampaign({
          ...campaignData,
          current_funding: totalFunding,
          progress_percentage: progressPercentage,
          athlete_name: brandData ? `${brandData.first_name} ${brandData.last_name}` : 'Unknown Athlete',
        });

        // Get current user info
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: userData } = await supabase
            .from('brands')
            .select('first_name, last_name, business_email')
            .eq('id', user.id)
            .single();

          if (userData) {
            setName(`${userData.first_name} ${userData.last_name}`);
            setEmail(userData.business_email || '');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!campaign) return;
    
    setProcessingPayment(true);
    
    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to support a campaign');
        setProcessingPayment(false);
        return;
      }

      if (paymentMethod === 'razorpay') {
        // Create a Razorpay order
        const response = await fetch('/api/create-razorpay-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `campaign-${campaign.id}`,
          }),
        });

        const order = await response.json();

        if (!order.id) {
          throw new Error('Failed to create payment order');
        }

        // Initialize Razorpay payment
        const razorpay = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: 'INR',
          name: 'Athlete Crowdfunding',
          description: `Support for ${campaign.title}`,
          order_id: order.id,
          handler: async function(response: any) {
            // Create a record in the payments table
            const { error } = await supabase
              .from('payments')
              .insert([
                {
                  brand_id: user.id,
                  athlete_id: campaign.brand_id, // Using the athlete's ID
                  amount: amount,
                  currency: 'INR',
                  status: 'completed',
                  payment_method: 'razorpay',
                  transaction_id: campaign.id, // Link to campaign ID
                }
              ]);
              
            if (error) {
              console.error('Error recording payment:', error);
              alert('Payment was processed but there was an error recording it. Please contact support.');
            } else {
              // Success - show confirmation and redirect
              alert('Thank you for supporting this athlete!');
              router.push(`/brand/campaigns/${campaign.id}`);
            }
          },
          prefill: {
            name: name,
            email: email,
          },
          theme: {
            color: '#4F46E5',
          },
        });

        razorpay.open();
      } else if (paymentMethod === 'crypto') {
        // For now, just redirect to a placeholder crypto payment page
        router.push(`/brand/campaigns/${campaign.id}/crypto-payment?amount=${amount}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">Campaign not found</h3>
            <p className="mt-2 text-gray-500">The campaign you're looking for doesn't exist or has ended.</p>
            <button
              onClick={() => router.push('/brand/campaigns')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Campaigns
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8 bg-indigo-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Details</h2>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                <p className="text-sm text-gray-500">by {campaign.athlete_name}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">₹{campaign.current_funding.toLocaleString()} raised</span>
                  <span className="text-gray-500">of ₹{campaign.funding_amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${campaign.progress_percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="prose prose-sm text-gray-700">
                <p>{campaign.description}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Support This Athlete</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Contribution Amount (₹)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="100"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="1000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="razorpay"
                          name="payment-method"
                          type="radio"
                          checked={paymentMethod === 'razorpay'}
                          onChange={() => setPaymentMethod('razorpay')}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="razorpay" className="font-medium text-gray-700">
                          UPI / Card / Net Banking
                        </label>
                        <p className="text-gray-500">Pay using Razorpay (Recommended)</p>
                      </div>
                    </div>
                    
                    {showCryptoOption && (
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="crypto"
                            name="payment-method"
                            type="radio"
                            checked={paymentMethod === 'crypto'}
                            onChange={() => setPaymentMethod('crypto')}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="crypto" className="font-medium text-gray-700">
                            Pay with Crypto
                          </label>
                          <p className="text-gray-500">Available for donations ≥ ₹2,50,000</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={processingPayment || amount < 100}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {processingPayment ? 'Processing...' : `Support with ₹${amount.toLocaleString()}`}
                  </button>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    By clicking this button, you agree to our terms and conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}