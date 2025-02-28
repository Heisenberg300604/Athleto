// pages/brand/campaigns/[id]/crypto-payment.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';

export default function CryptoPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const amount = searchParams.get('amount') || '0';
  
  const [walletAddress, setWalletAddress] = useState('0xD8f24D419153E5D19681461D767C7BBc8150d6D3'); // Example address
  const [paymentAmount] = useState(amount || '0');
  const [campaignTitle, setCampaignTitle] = useState('');
  
  useEffect(() => {
    if (id) {
      fetchCampaignTitle();
    }
  }, [id]);
  
  const fetchCampaignTitle = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunity')
        .select('title')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setCampaignTitle(data.title);
      }
    } catch (error) {
      console.error('Error fetching campaign:', error);
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied to clipboard!');
  };
  
  const handlePaymentCompleted = async () => {
    try {
      // Get current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to complete this process');
        return;
      }
      
      // Record the crypto payment in the database
      const { error } = await supabase
        .from('payments')
        .insert([
          {
            brand_id: user.id,
            amount: parseFloat(paymentAmount),
            currency: 'USDC',
            status: 'pending', // In a real implementation, this would be updated when transaction is confirmed
            payment_method: 'crypto',
            transaction_id: id,
          }
        ]);
        
      if (error) throw error;
      
      // Success
      alert('Thank you for your contribution! Our team will verify the transaction.');
      router.push(`/brand-funding/crowdfunding`);
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('There was an error recording your payment. Please contact support.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Crypto Payment</h1>
          <p className="text-gray-600 mb-6">Support the campaign : {campaignTitle}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Important Note</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                    This feature is currently in beta. For large contributions, our team will manually verify the transaction before funds are released to the athlete.
                    </p>
                  </div>
                  </div>
              </div>
            </div>

          
          
          <div className="space-y-8">
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Instructions</h2>
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li>Send exactly <span className="font-semibold">{parseFloat(paymentAmount).toLocaleString('en-IN')} INR</span> worth of USDC on Polygon network to the wallet address below.</li>
                <li>Keep the transaction hash/ID for your records.</li>
                <li>Click "I've Completed the Payment" once you've sent the USDC.</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wallet Address (USDC on Polygon)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={walletAddress}
                    className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900 font-mono text-sm focus:outline-none"
                    title="Wallet Address"
                  />
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Only send USDC on the Polygon network to this address
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Send
                </label>
                <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md py-2 px-3">
                  <span className="text-gray-900 font-medium">{parseFloat(paymentAmount).toLocaleString('en-IN')} INR</span>
                  <span className="ml-2 text-gray-500">worth of USDC</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex flex-col sm:flex-row-reverse gap-3">
              <button
                type="button"
                onClick={handlePaymentCompleted}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                I've Completed the Payment
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go Back
              </button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Important</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      Please ensure you send the exact amount specified to avoid delays in processing your payment.
                    </p>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}