"use client";

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

export const CreateOpportunityModal = ({ isOpen, onClose }) => {
  const { createOpportunity } = useOpportunity();
  const { brand } = useUser();
  console.log(brand);
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!brand || !brand.id) {
//       console.error("Brand is not available yet");
//       return;
//     }
    
    try {
      await createOpportunity({
        ...formData,
        brand_id: brand.id, 
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to create opportunity:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    useForceLightMode(),
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white text-black">
        <DialogHeader>
          <DialogTitle>Create New Opportunity</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-2 bg-white p-6 rounded-lg shadow-sm text-black ">
          <div className="space-y-">
            <div>
              <Label htmlFor="title">Opportunity Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter opportunity title"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Opportunity Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
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
                required
                className="h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
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
                <SelectTrigger>
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

            <div className="grid grid-cols-2 gap-4">
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
                />
              </div>
            </div>

            <div>
              <Label>Selection Process</Label>
              <div className="space-y-2">
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
            </div>

            <div>
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Textarea
                id="eligibility"
                value={formData.eligibility_criteria}
                onChange={(e) => handleInputChange('eligibility_criteria', e.target.value)}
                placeholder="Describe who can apply and any requirements"
                className="h-24"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Opportunity
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOpportunityModal;
                