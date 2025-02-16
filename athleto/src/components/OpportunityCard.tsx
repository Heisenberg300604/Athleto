
"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Calendar, Users, DollarSign, MessageCircle } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { OpportunityType } from '@/context/OpportunityContext';

interface OpportunityCardProps {
  opportunity: OpportunityType;
  onApply: (opportunityId: string) => Promise<void>;
}


export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onApply }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const { athlete } = useUser();

  const handleApply = async () => {
    try {
      setIsApplying(true);
      await onApply(opportunity.id);
    } catch (error) {
      console.error('Failed to apply:', error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowDetails(true)}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={opportunity.brand_logo} alt={opportunity.brand_name} />
              <AvatarFallback>{opportunity.brand_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{opportunity.title}</h3>
              <p className="text-sm text-muted-foreground">{opportunity.brand_name}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {opportunity.type}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{opportunity.location.city}, {opportunity.location.country}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{opportunity.applications_count} applied</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              <span>€{opportunity.funding_amount.min.toLocaleString()} - €{opportunity.funding_amount.max.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{opportunity.title}</DialogTitle>
            <DialogDescription>
              Posted by {opportunity.brand_name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">
                  {opportunity.location.city}, {opportunity.location.country}
                  {opportunity.location.is_remote && " (Remote available)"}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Deadline</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(opportunity.deadline).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Spots Available</h4>
                <p className="text-sm text-muted-foreground">
                  {opportunity.spots_available}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Funding Amount</h4>
                <p className="text-sm text-muted-foreground">
                  €{opportunity.funding_amount.min.toLocaleString()} - €{opportunity.funding_amount.max.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{opportunity.description}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Eligibility Criteria</h4>
              <p className="text-sm text-muted-foreground">{opportunity.eligibility_criteria}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Selection Process</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {opportunity.selection_process.physical_trial && (
                  <li>• Physical trial required</li>
                )}
                {opportunity.selection_process.interview_required && (
                  <li>• Interview required</li>
                )}
                {opportunity.selection_process.auto_shortlist && (
                  <li>• Automatic shortlisting enabled</li>
                )}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Open chat functionality
                }}>
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Brand</span>
              </Button>
              
              <Button
              className="bg-indigo-600 text-white hover:bg-indigo-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply();
                }}
                disabled={isApplying}>
                {isApplying ? 'Applying...' : 'Apply Now'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
