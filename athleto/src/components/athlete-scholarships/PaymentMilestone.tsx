import { FC } from 'react';
import { format } from 'date-fns';

interface Milestone {
  id: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  releaseDate?: Date;
  dueDate?: Date;
}

interface PaymentMilestoneProps {
  milestone: Milestone;
}

export const PaymentMilestone: FC<PaymentMilestoneProps> = ({ milestone }) => {
  const getStatusConfig = () => {
    switch (milestone.status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: (
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
          label: 'Completed',
          date: milestone.releaseDate ? `Released on ${format(milestone.releaseDate, 'MMM dd, yyyy')}` : null
        };
      case 'pending':
        return {
          color: 'bg-gray-50 text-gray-800 border-gray-200',
          icon: (
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: 'Pending',
          date: milestone.dueDate ? `Expected by ${format(milestone.dueDate, 'MMM dd, yyyy')}` : null
        };
      case 'rejected':
        return {
          color: 'bg-red-50 text-red-800 border-red-200',
          icon: (
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
          label: 'Rejected',
          date: null
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-800 border-gray-200',
          icon: null,
          label: 'Unknown',
          date: null
        };
    }
  };

  const { color, icon, label, date } = getStatusConfig();

  return (
    <div className={`p-4 rounded-md border ${color} flex items-center justify-between`}>
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <div>
          <p className="font-medium">{milestone.description}</p>
          <p className="text-sm mt-1">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold">${milestone.amount.toLocaleString()}</div>
        <div className="text-sm mt-1">{label}</div>
      </div>
    </div>
  );
};