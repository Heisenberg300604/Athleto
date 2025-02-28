import { FC } from 'react';

type StatusType = 'pending' | 'approved' | 'rejected' | 'review';

interface ApplicationStatusProps {
  status: StatusType;
}

export const ApplicationStatus: FC<ApplicationStatusProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Pending Review'
        };
      case 'approved':
        return {
          color: 'bg-green-100 text-green-800',
          label: 'Approved'
        };
      case 'rejected':
        return {
          color: 'bg-red-100 text-red-800',
          label: 'Rejected'
        };
      case 'review':
        return {
          color: 'bg-blue-100 text-blue-800',
          label: 'Under Review'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          label: 'Unknown Status'
        };
    }
  };

  const { color, label } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};