import React from 'react';
import { format } from 'date-fns';

type Earnings = {
  totalEarned: number;
  pendingPayouts: number;
  completedGigs: number;
  payoutHistory: {
    id: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Processing' | 'Failed';
    gigType: string;
    brandName: string;
  }[];
};

type Props = {
  earnings: Earnings;
};

const EarningsSummary: React.FC<Props> = ({ earnings }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Earnings Summary
        </h3>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-indigo-50 px-4 py-5 rounded-lg overflow-hidden">
            <dt className="text-sm font-medium text-indigo-600 truncate">Total Earned</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-800">₹{earnings.totalEarned.toLocaleString()}</dd>
          </div>
          
          <div className="bg-indigo-50 px-4 py-5 rounded-lg overflow-hidden">
            <dt className="text-sm font-medium text-indigo-600 truncate">Pending Payouts</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-800">₹{earnings.pendingPayouts.toLocaleString()}</dd>
          </div>
          
          <div className="bg-indigo-50 px-4 py-5 rounded-lg overflow-hidden">
            <dt className="text-sm font-medium text-indigo-600 truncate">Completed Gigs</dt>
            <dd className="mt-1 text-3xl font-semibold text-indigo-800">{earnings.completedGigs}</dd>
          </div>
        </dl>
        
        <div className="mt-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">Payout History</h4>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Brand</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {earnings.payoutHistory.map((payout) => (
                  <tr key={payout.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {format(new Date(payout.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payout.brandName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{payout.gigType}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">₹{payout.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;