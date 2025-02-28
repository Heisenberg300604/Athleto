import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Scholarship } from '@/app/brand-funding/scholarships/page';

interface CreateScholarshipFormProps {
  onScholarshipCreated: (scholarship: Scholarship) => void;
}

const CreateScholarshipForm: React.FC<CreateScholarshipFormProps> = ({ onScholarshipCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Scholarship' as 'Scholarship' | 'Grant',
    amount: 0,
    eligibilityCriteriaText: '',
    deadline: '',
    purpose: '',
    requiredDocumentsText: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.amount || !formData.deadline || !formData.purpose) {
      toast.error('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Process the eligibility criteria and required documents from text to arrays
    const eligibilityCriteria = formData.eligibilityCriteriaText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
      
    const requiredDocuments = formData.requiredDocumentsText
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Create new scholarship object
    const newScholarship: Scholarship = {
      id: `sch-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      amount: Number(formData.amount),
      eligibilityCriteria,
      deadline: formData.deadline,
      purpose: formData.purpose,
      requiredDocuments,
      createdAt: new Date().toISOString(),
      status: 'Active',
      brandId: 'brand-123', // In a real app, this would come from the authenticated user
    };
    
    // Simulate API call to Supabase
    setTimeout(() => {
      onScholarshipCreated(newScholarship);
      
      // Reset form
      setFormData({
        name: '',
        type: 'Scholarship',
        amount: 0,
        eligibilityCriteriaText: '',
        deadline: '',
        purpose: '',
        requiredDocumentsText: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create New Scholarship or Grant</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Youth Sports Development Program"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              aria-label="Scholarship or Grant"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Scholarship">Scholarship (Education & Training)</option>
              <option value="Grant">Grant (Sponsorship & Financial Aid)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              min="1000"
              placeholder="e.g., 50000"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline <span className="text-red-500">*</span>
            </label>
            <input
              title="Application Deadline"
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose <span className="text-red-500">*</span>
            </label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="e.g., Funding for international competition, Equipment support, etc."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eligibility Criteria <span className="text-red-500">*</span>
            </label>
            <textarea
              name="eligibilityCriteriaText"
              value={formData.eligibilityCriteriaText}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter each criterion on a new line. e.g.,
Under 18
State level athlete
Must be participating in national tournaments"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter each criterion on a new line</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Documents <span className="text-red-500">*</span>
            </label>
            <textarea
              name="requiredDocumentsText"
              value={formData.requiredDocumentsText}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Enter each document on a new line. e.g.,
Achievement certificates
Income proof
Coach recommendation"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter each document on a new line</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                setFormData({
                  name: '',
                  type: 'Scholarship',
                  amount: 0,
                  eligibilityCriteriaText: '',
                  deadline: '',
                  purpose: '',
                  requiredDocumentsText: '',
                });
              }}
            >
              Reset
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Scholarship/Grant'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateScholarshipForm;