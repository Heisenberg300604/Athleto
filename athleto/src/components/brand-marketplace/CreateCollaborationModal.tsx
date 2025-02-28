import React from 'react';
import { toast } from 'react-hot-toast';

type Athlete = {
  id: string;
  name: string;
  sport: string;
  achievements: string[];
  followerCount: number;
  pricing: {
    workshop: number;
    demo: number;
    talk: number;
    training: number;
  };
  image: string;
};

type Props = {
  athlete: Athlete;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    athleteId: string;
    gigType: 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other';
    dateTime: string;
    duration: string;
    paymentAmount: number;
    description: string;
  }) => void;
};

const CreateCollaborationModal: React.FC<Props> = ({ athlete, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    athleteId: athlete.id,
    gigType: 'Workshop' as 'Workshop' | 'Demo' | 'Talk' | 'Training' | 'Other',
    dateTime: '',
    duration: '1 hour',
    paymentAmount: athlete.pricing.workshop,
    description: '',
  });

  // Update payment amount when gig type changes
  React.useEffect(() => {
    if (formData.gigType === 'Workshop') {
      setFormData(prev => ({ ...prev, paymentAmount: athlete.pricing.workshop }));
    } else if (formData.gigType === 'Demo') {
      setFormData(prev => ({ ...prev, paymentAmount: athlete.pricing.demo }));
    } else if (formData.gigType === 'Talk') {
      setFormData(prev => ({ ...prev, paymentAmount: athlete.pricing.talk }));
    } else if (formData.gigType === 'Training') {
      setFormData(prev => ({ ...prev, paymentAmount: athlete.pricing.training }));
    }
  }, [formData.gigType, athlete.pricing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'paymentAmount') {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.dateTime) {
      toast.error('Please select a date and time');
      return;
    }
    
    if (!formData.description) {
      toast.error('Please add a description');
      return;
    }
    
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Create Collaboration with {athlete.name}
                </h3>
                
                <div className="mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="gigType" className="block text-sm font-medium text-gray-700">
                        Collaboration Type
                      </label>
                      <select
                        id="gigType"
                        name="gigType"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={formData.gigType}
                        onChange={handleChange}
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Demo">Product Demo</option>
                        <option value="Talk">Motivational Talk</option>
                        <option value="Training">Training Session</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="dateTime"
                        name="dateTime"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.dateTime}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={formData.duration}
                        onChange={handleChange}
                      >
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="1.5 hours">1.5 hours</option>
                        <option value="2 hours">2 hours</option>
                        <option value="3 hours">3 hours</option>
                        <option value="4 hours">4 hours</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                        Payment Amount (₹)
                      </label>
                      <input
                        type="number"
                        id="paymentAmount"
                        name="paymentAmount"
                        min="1000"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.paymentAmount}
                        onChange={handleChange}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Base rate for {formData.gigType}: ₹{athlete.pricing[formData.gigType.toLowerCase() as keyof typeof athlete.pricing].toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description & Requirements
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="Describe what you expect from the athlete..."
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Send Request
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollaborationModal;