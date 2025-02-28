/// File: utils/paymentUtils.ts
import { toast } from 'react-hot-toast';

// Define payment status types
export type PaymentStatus = 'Pending' | 'InEscrow' | 'Released' | 'Refunded' | 'Failed';

// Define payment transaction type
export type PaymentTransaction = {
  id: string;
  athleteId: string;
  brandId: string;
  requestId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  releasedAt?: string;
  platformFee: number;
  athletePayout: number;
};

// Function to initialize payment with Razorpay
export const initializePayment = async (
  requestId: string,
  athleteId: string,
  brandId: string,
  amount: number
): Promise<PaymentTransaction | null> => {
  try {
    // In a real implementation, this would make an API call to your backend
    // which would then initialize a Razorpay order
    
    // Mock successful payment
    toast.success('Payment initialized with Razorpay');
    
    // Calculate platform fee (10%)
    const platformFee = amount * 0.1;
    const athletePayout = amount - platformFee;
    
    // Create a mock payment transaction
    const paymentTransaction: PaymentTransaction = {
      id: `pay_${Math.random().toString(36).substring(2, 10)}`,
      athleteId,
      brandId,
      requestId,
      amount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      platformFee,
      athletePayout
    };
    
    return paymentTransaction;
  } catch (error) {
    toast.error('Payment initialization failed');
    return null;
  }
};

// Function to process payment and place in escrow
export const processPaymentToEscrow = async (
  paymentTransaction: PaymentTransaction
): Promise<PaymentTransaction> => {
  try {
    // In a real implementation, this would call your payment gateway
    
    // Mock successful payment to escrow
    toast.success('Payment processed. Funds in escrow until gig completion.');
    
    // Update transaction status
    const updatedTransaction: PaymentTransaction = {
      ...paymentTransaction,
      status: 'InEscrow'
    };
    
    return updatedTransaction;
  } catch (error) {
    toast.error('Payment to escrow failed');
    return {
      ...paymentTransaction,
      status: 'Failed'
    };
  }
};

// Function to release payment from escrow to athlete
export const releasePaymentToAthlete = async (
  paymentTransaction: PaymentTransaction
): Promise<PaymentTransaction> => {
  try {
    // In a real implementation, this would call your backend API
    
    // Mock successful payment release
    toast.success(`Payment of ₹${paymentTransaction.athletePayout.toLocaleString()} released to athlete.`);
    
    // Update transaction status
    const updatedTransaction: PaymentTransaction = {
      ...paymentTransaction,
      status: 'Released',
      releasedAt: new Date().toISOString()
    };
    
    return updatedTransaction;
  } catch (error) {
    toast.error('Payment release failed');
    return paymentTransaction;
  }
};

// Function to handle payment refunds
export const refundPayment = async (
  paymentTransaction: PaymentTransaction,
  refundPercentage: number = 100
): Promise<PaymentTransaction> => {
  try {
    // Calculate refund amount
    const refundAmount = (paymentTransaction.amount * refundPercentage) / 100;
    
    // In a real implementation, this would call your payment gateway API
    
    // Mock successful refund
    toast.success(`Refund of ₹${refundAmount.toLocaleString()} processed.`);
    
    // Update transaction status
    const updatedTransaction: PaymentTransaction = {
      ...paymentTransaction,
      status: 'Refunded',
      releasedAt: new Date().toISOString()
    };
    
    return updatedTransaction;
  } catch (error) {
    toast.error('Refund processing failed');
    return paymentTransaction;
  }
};

// Function to automatically release payment after 48 hours
export const scheduleAutoRelease = (
  paymentTransaction: PaymentTransaction,
  onRelease: (transaction: PaymentTransaction) => void
): void => {
  // In a real implementation, this would be handled by a backend job
  // Here we're just simulating it with a timeout
  
  toast.success('Payment will be auto-released in 48 hours if not confirmed.');
  
  // For demo purposes, we'll use a short timeout
  setTimeout(async () => {
    const updatedTransaction = await releasePaymentToAthlete(paymentTransaction);
    onRelease(updatedTransaction);
  }, 10000); // 10 seconds for demo, would be 48 hours in production
};

// Function to fetch payment transaction by ID
export const getPaymentTransactionById = async (
  transactionId: string
): Promise<PaymentTransaction | null> => {
  try {
    // In a real implementation, this would call your backend API
    
    // Mock fetch implementation for demo
    return {
      id: transactionId,
      athleteId: 'athlete_123',
      brandId: 'brand_456',
      requestId: 'req_789',
      amount: 10000,
      status: 'InEscrow',
      createdAt: new Date().toISOString(),
      platformFee: 1000,
      athletePayout: 9000
    };
  } catch (error) {
    toast.error('Failed to fetch transaction details');
    return null;
  }
};

// Function to get payment history for an athlete
export const getAthletePaymentHistory = async (
  athleteId: string
): Promise<PaymentTransaction[]> => {
  try {
    // In a real implementation, this would call your backend API
    
    // Mock payment history
    return [
      {
        id: `pay_${Math.random().toString(36).substring(2, 10)}`,
        athleteId,
        brandId: 'brand_456',
        requestId: 'req_123',
        amount: 15000,
        status: 'Released',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        releasedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        platformFee: 1500,
        athletePayout: 13500
      },
      {
        id: `pay_${Math.random().toString(36).substring(2, 10)}`,
        athleteId,
        brandId: 'brand_789',
        requestId: 'req_456',
        amount: 20000,
        status: 'InEscrow',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        platformFee: 2000,
        athletePayout: 18000
      }
    ];
  } catch (error) {
    toast.error('Failed to load payment history');
    return [];
  }
};

// Function to get payment history for a brand
export const getBrandPaymentHistory = async (
  brandId: string
): Promise<PaymentTransaction[]> => {
  try {
    // In a real implementation, this would call your backend API
    
    // Mock payment history
    return [
      {
        id: `pay_${Math.random().toString(36).substring(2, 10)}`,
        athleteId: 'athlete_123',
        brandId,
        requestId: 'req_123',
        amount: 15000,
        status: 'Released',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        releasedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        platformFee: 1500,
        athletePayout: 13500
      },
      {
        id: `pay_${Math.random().toString(36).substring(2, 10)}`,
        athleteId: 'athlete_456',
        brandId,
        requestId: 'req_456',
        amount: 20000,
        status: 'InEscrow',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        platformFee: 2000,
        athletePayout: 18000
      }
    ];
  } catch (error) {
    toast.error('Failed to load payment history');
    return [];
  }
};

// Calculate platform metrics
export const calculatePlatformMetrics = (transactions: PaymentTransaction[]) => {
  const totalTransactions = transactions.length;
  const totalProcessed = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalFees = transactions.reduce((sum, transaction) => sum + transaction.platformFee, 0);
  const pendingEscrow = transactions
    .filter(t => t.status === 'InEscrow')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  
  return {
    totalTransactions,
    totalProcessed,
    totalFees,
    pendingEscrow,
    averageTransactionSize: totalProcessed / (totalTransactions || 1)
  };
};

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Utility function to get appropriate status badge color
export const getStatusColor = (status: PaymentStatus): string => {
  switch (status) {
    case 'Pending': return 'yellow';
    case 'InEscrow': return 'blue';
    case 'Released': return 'green';
    case 'Refunded': return 'orange';
    case 'Failed': return 'red';
    default: return 'gray';
  }
};

// Utility to handle Razorpay checkout
export const openRazorpayCheckout = (
  orderId: string,
  amount: number,
  onSuccess: (paymentId: string) => void,
  onFailure: () => void
) => {
  // This would typically integrate with Razorpay's actual checkout
  // For mock purposes we'll just simulate a successful payment
  
  toast.success('Opening Razorpay checkout...');
  
  // Mock checkout process
  setTimeout(() => {
    const success = Math.random() > 0.2; // 80% success rate for demo
    
    if (success) {
      const mockPaymentId = `rzp_${Math.random().toString(36).substring(2, 10)}`;
      toast.success('Payment successful!');
      onSuccess(mockPaymentId);
    } else {
      toast.error('Payment failed or cancelled by user');
      onFailure();
    }
  }, 2000);
};