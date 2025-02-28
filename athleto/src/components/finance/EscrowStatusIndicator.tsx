// File: components/finance/EscrowStatusIndicator.tsx
import React from 'react';
import { PaymentTransaction } from '@/utils/paymentUtils';

type Props = {
  transaction: PaymentTransaction;
};

const EscrowStatusIndicator: React.FC<Props> = ({ transaction }) => {
  // Determine status color and message
  let statusColor = 'gray';
  let statusMessage = 'Unknown Status';
  
  switch (transaction.status) {
    case 'Pending':
      statusColor = 'yellow';
      statusMessage = 'Payment Pending';
      break;
    case 'InEscrow':
      statusColor = 'blue';
      statusMessage = 'Funds in Escrow';
      break;
    case 'Released':
      statusColor = 'green';
      statusMessage = 'Payment Released';
      break;
    case 'Refunded':
      statusColor = 'orange';
      statusMessage = 'Payment Refunded';
      break;
    case 'Failed':
      statusColor = 'red';
      statusMessage = 'Payment Failed';
      break;
  }
  
  return (
    <div className={`bg-${statusColor}-50 p-3 rounded-md`}>
      <div className="flex items-center">
        <div className={`bg-${statusColor}-400 h-3 w-3 rounded-full mr-2`}></div>
        <p className={`text-sm font-medium text-${statusColor}-800`}>
          {statusMessage}
        </p>
      </div>
      
      <div className="mt-2 text-sm">
        {transaction.status === 'InEscrow' && (
          <p className={`text-${statusColor}-700`}>
            Funds will be released after work completion
          </p>
        )}
        
        {transaction.status === 'Released' && (
          <p className={`text-${statusColor}-700`}>
            Funds released on {new Date(transaction.releasedAt || '').toLocaleDateString()}
          </p>
        )}
        
        {transaction.status === 'Refunded' && (
          <p className={`text-${statusColor}-700`}>
            Refund processed on {new Date(transaction.releasedAt || '').toLocaleDateString()}
          </p>
        )}
        
        {transaction.status === 'Pending' && (
          <p className={`text-${statusColor}-700`}>
            Awaiting payment confirmation
          </p>
        )}
        
        {transaction.status === 'Failed' && (
          <p className={`text-${statusColor}-700`}>
            Payment processing failed. Please try again.
          </p>
        )}
      </div>
      
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>ID: {transaction.id.substring(0, 8)}...</span>
        <span>Created: {new Date(transaction.createdAt).toLocaleDateString()}</span>
      </div>
      
      {(transaction.status === 'InEscrow' || transaction.status === 'Released') && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Amount:</span>
            <span className="font-medium">₹{transaction.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Platform Fee:</span>
            <span className="font-medium">₹{transaction.platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Athlete Payout:</span>
            <span className="font-medium text-green-600">₹{transaction.athletePayout.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EscrowStatusIndicator;