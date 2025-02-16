"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useOpportunity } from '@/context/OpportunityContext';
import { useUser } from '@/context/UserContext';
import { useForceLightMode } from '@/hooks/useForcedLightTheme';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { OpportunityType } from '@/context/OpportunityContext';

const opportunityTypes = [
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'training_camp', label: 'Training Camp' },
  { value: 'endorsement_deal', label: 'Endorsement Deal' },
  { value: 'tournament', label: 'Tournament Participation' },
  { value: 'equipment_grant', label: 'Equipment Grant' },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'job_offer', label: 'Job Offer' },
  { value: 'internship', label: 'Internship' },
  { value: 'other', label: 'Other' }
];

const skillLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'pro', label: 'Professional' }
];

interface CreateOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateOpportunityModal: React.FC<CreateOpportunityModalProps> = ({ isOpen, onClose }) => {
  const { createOpportunity } = useOpportunity();
  const { brand } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    description: '',
    location: {
      city: '',
      state: '',
      country: '',
      is_remote: false
    },
    deadline: '',
    spots_available: 1,
    sport_category: '',
    skill_level: '',
    eligibility_criteria: '',
    funding_amount: {
      min: 0,
      max: 0,
      currency: 'EUR'
    },
    selection_process: {
      auto_shortlist: false,
      manual_review: true,
      physical_trial: false,
      interview_required: false
    }
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!brand?.id) {
      setError('Brand information is not available. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const opportunityData = {
        ...formData,
        brand_id: brand.id,
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createOpportunity(opportunityData);
      console.log('Opportunity created:', opportunityData);
    
      onClose();
    } catch (error) {
      setError('Failed to create opportunity. Please try again.');
      console.error('Failed to create opportunity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field:any, value:any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    useForceLightMode(),
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white text-black max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">Create New Opportunity</DialogTitle>
        </DialogHeader>
        
        {error && (
          <Alert variant="destructive" className="mx-6 mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <div className="grid gap-6">
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Opportunity Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter opportunity title"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Opportunity Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange('type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select opportunity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {opportunityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe the opportunity in detail"
                    className="mt-1 h-32"
                    required
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium">Location Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.location.city}
                    onChange={(e) => handleInputChange('location', {
                      ...formData.location,
                      city: e.target.value
                    })}
                    placeholder="City"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.location.country}
                    onChange={(e) => handleInputChange('location', {
                      ...formData.location,
                      country: e.target.value
                    })}
                    placeholder="Country"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="remote"
                  checked={formData.location.is_remote}
                  onCheckedChange={(checked) => handleInputChange('location', {
                    ...formData.location,
                    is_remote: checked
                  })}
                />
                <Label htmlFor="remote">Remote opportunity available</Label>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium">Requirements & Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spots">Available Spots</Label>
                  <Input
                    id="spots"
                    type="number"
                    min="1"
                    value={formData.spots_available}
                    onChange={(e) => handleInputChange('spots_available', parseInt(e.target.value))}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skill-level">Required Skill Level</Label>
                <Select
                  value={formData.skill_level}
                  onValueChange={(value) => handleInputChange('skill_level', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select required skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium">Funding Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-funding">Minimum Funding Amount</Label>
                  <Input
                    id="min-funding"
                    type="number"
                    value={formData.funding_amount.min}
                    onChange={(e) => handleInputChange('funding_amount', {
                      ...formData.funding_amount,
                      min: parseInt(e.target.value)
                    })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="max-funding">Maximum Funding Amount</Label>
                  <Input
                    id="max-funding"
                    type="number"
                    value={formData.funding_amount.max}
                    onChange={(e) => handleInputChange('funding_amount', {
                      ...formData.funding_amount,
                      max: parseInt(e.target.value)
                    })}
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium">Selection Process</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-shortlist"
                    checked={formData.selection_process.auto_shortlist}
                    onCheckedChange={(checked) => handleInputChange('selection_process', {
                      ...formData.selection_process,
                      auto_shortlist: checked
                    })}
                  />
                  <Label htmlFor="auto-shortlist">Automatic Shortlisting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="physical-trial"
                    checked={formData.selection_process.physical_trial}
                    onCheckedChange={(checked) => handleInputChange('selection_process', {
                      ...formData.selection_process,
                      physical_trial: checked
                    })}
                  />
                  <Label htmlFor="physical-trial">Physical Trial Required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="interview"
                    checked={formData.selection_process.interview_required}
                    onCheckedChange={(checked) => handleInputChange('selection_process', {
                      ...formData.selection_process,
                      interview_required: checked
                    })}
                  />
                  <Label htmlFor="interview">Interview Required</Label>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium">Eligibility</h3>
              <div>
                <Label htmlFor="eligibility">Eligibility Criteria</Label>
                <Textarea
                  id="eligibility"
                  value={formData.eligibility_criteria}
                  onChange={(e) => handleInputChange('eligibility_criteria', e.target.value)}
                  placeholder="Describe who can apply and any requirements"
                  className="mt-1 h-24"
                />
              </div>
            </section>
          </div>
        </form>

        <div className="px-6 py-4 border-t mt-auto flex justify-end space-x-3 bg-gray-50">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
          className="bg-indigo-600 text-white hover:bg-indigo-800"
          type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin  " />
                Creating...
              </>
            ) : (
              'Create Opportunity'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOpportunityModal;