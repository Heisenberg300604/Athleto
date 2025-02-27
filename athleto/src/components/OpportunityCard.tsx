import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import EmojiPicker from "emoji-picker-react";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Send,
  Smile,
  Paperclip,
  CheckCircle,
  Building,
  Trophy,
  Target,
  FileText,
  MessageCircle,
  XCircle,
  Phone,
  Mail,
  Info
} from 'lucide-react';
import { OpportunityType } from '@/context/OpportunityContext';

interface OpportunityCardProps {
  opportunity: OpportunityType;
  onApply: (id: string) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onApply }) => {
  console.log(opportunity)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState([
    // Adding sample messages for visibility
    {
      id: 1,
      text: "Hello! I'm interested in this opportunity.",
      sender: 'athlete',
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Great! Let me know if you have any questions.",
      sender: 'brand',
      timestamp: new Date(),
    }
  ]);
  const [isApplying, setIsApplying] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log("File Uploaded:", event.target.files[0]);
    }
  };


  const handleApply = async () => {
    try {
      setIsApplying(true);
      await onApply(opportunity.id);
      setShowConfirmDialog(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Failed to apply:', error);
    } finally {
      setIsApplying(false);
    }
  };

  const handleEmojiClick = (emojiObject:any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: message,
        sender: 'athlete',
        timestamp: new Date(),
      }
    ]);
    setMessage('');
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 ring-2 ring-blue-100">
              {/* <AvatarImage src={opportunity.brand_logo} alt={opportunity.brand_name} /> */}
              <AvatarFallback>{opportunity.brand_name?.[0] || 'B'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{opportunity.title}</h3>
              <p className="text-sm text-gray-600">{opportunity.brand_name}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm font-medium">
            {opportunity.type}
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{opportunity.location?.city}, {opportunity.location?.country}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(opportunity.deadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{opportunity.applications_count || 0} applied</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-900">
              <DollarSign className="h-4 w-4" />
              <span>€{opportunity.funding_amount?.min?.toLocaleString()} - €{opportunity.funding_amount?.max?.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 line-clamp-2">{opportunity.description}</p>
        </CardContent>

        <CardFooter className="justify-between pt-4">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => setShowDetailsDialog(true)}>
            <MessageCircle className="h-4 w-4" />
            <span>View Details</span>
          </Button>

          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowConfirmDialog(true)}>
            Apply Now
          </Button>
        </CardFooter>
      </Card>

      {/* Confirm Application Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Application</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to apply to this opportunity?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              No, Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={isApplying}
              className="bg-blue-600 text-white hover:bg-blue-700">
              {isApplying ? 'Applying...' : 'Yes, Apply'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Application Submitted!</h3>
            <p className="text-gray-600">
              You have successfully applied to this opportunity. Please wait while the brand reviews your profile.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Updated Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <DialogHeader className="px-6 py-4 border-b shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                    {/* <AvatarImage src={opportunity.brand_logo} alt={opportunity.brand_name} /> */}
                    <AvatarFallback>{opportunity.brand_name?.[0] || 'B'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl font-semibold">{opportunity.title}</DialogTitle>
                    <p className="text-sm text-gray-600">{opportunity.brand_name}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-sm font-medium">
                  {opportunity.type}
                </Badge>
              </div>
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
            </DialogHeader>

            <TabsContent value="details" className="flex-1 relative h-full">
              <ScrollArea className="h-[calc(80vh-140px)] w-full">
                <div className="p-6 space-y-8">
                  {/* Summary Section */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-600">
                          {opportunity.location?.city}, {opportunity.location?.country}
                          {opportunity.location?.is_remote && " (Remote available)"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Application Deadline</p>
                        <p className="text-sm text-gray-600">
                          {new Date(opportunity.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Available Spots</p>
                        <p className="text-sm text-gray-600">{opportunity.spots_available || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Funding Amount</p>
                        <p className="text-sm text-gray-600">
                          €{opportunity.funding_amount?.min?.toLocaleString()} -
                          €{opportunity.funding_amount?.max?.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Trophy className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Sport Category</p>
                        <p className="text-sm text-gray-600">{opportunity.sport_category || 'All Sports'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Required Skill Level</p>
                        <p className="text-sm text-gray-600">{opportunity.skill_level || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{opportunity.description}</p>
                  </section>

                  {/* Eligibility */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Eligibility Criteria</h3>
                    <p className="text-gray-700">{opportunity.eligibility_criteria || 'No specific eligibility criteria provided.'}</p>
                  </section>

                  {/* Selection Process */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Selection Process</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {opportunity.selection_process?.physical_trial && (
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Physical trial required</span>
                          </li>
                        )}
                        {opportunity.selection_process?.interview_required && (
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Interview required</span>
                          </li>
                        )}
                        {opportunity.selection_process?.auto_shortlist && (
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Automatic shortlisting enabled</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </section>

                  {/* Brand Contact */}
                  <section>
                    <h3 className="text-lg font-semibold mb-3">Brand Representative</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {/* {opportunity.brand_representative ? (
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={opportunity.brand_representative.avatar} />
                            <AvatarFallback>{opportunity.brand_representative.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{opportunity.brand_representative.name}</p>
                            <div className="flex space-x-4 mt-2">
                              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>Call</span>
                              </Button>
                              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>Email</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Info className="h-5 w-5" />
                          <span>Contact information will be provided after application</span>
                        </div>
                      )} */}
                    </div>
                  </section>

                  {opportunity.required_documents && (
                    <section>
                      <h3 className="text-lg font-semibold mb-3">Required Documents</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {opportunity.required_documents.map((doc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 h-full flex flex-col">
              <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-4 min-h-full">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'athlete' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'athlete'
                            ? 'bg-blue-500 text-white ml-auto'
                            : 'bg-gray-100 text-gray-900'
                          }`}
                      >
                        <p className="break-words">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4 bg-white mt-auto">
                <div className="flex items-center space-x-2">
                {showEmojiPicker && (
          <div className="absolute bottom-16 left-4 bg-white shadow-md rounded-lg">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
                <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile className="h-5 w-5 text-gray-500" />
          </Button>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} title="Upload File" />
                  </label>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

