"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import BrandNavbar from '@/components/BrandNavbar';
import Image from 'next/image';
import { FaFlag, FaBan, FaShare, FaDownload, FaHeart, FaRegHeart, FaComment, FaPaperPlane } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import { format } from 'date-fns';

// Define TypeScript interfaces
interface Campaign {
  id: string;
  title: string;
  description: string;
  funding_goal: number;
  application_deadline: string;
  post_image: string;
  skills_required: string;
  status: string;
  created_at: string;
 // brand_id: string;
  // Additional calculated fields
  current_funding: number;
  progress_percentage: number;
  athlete_name: string;
  athlete_image: string;
  athlete_email?: string;
  athlete_phone?: string;
  campaign_milestones?: Milestone[];
  campaign_updates?: CampaignUpdate[];
}

interface Supporter {
  id: string;
  brand_name: string;
  brand_image?: string;
  amount: number;
  created_at: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  completed: boolean;
}

interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  created_at: string;
  media_url?: string;
}

interface ChatMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_image?: string;
  content: string;
  created_at: string;
  is_brand_message: boolean;
}

export default function CampaignDetails() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [currentUser, setCurrentUser] = useState<{id: string, brand_name: string, brand_logo?: string} | null>(null);
  const [supportAmount, setSupportAmount] = useState<number>(0);
  //const [showSupportModal, setShowSupportModal] = useState(false);
  const [processingSupport, setProcessingSupport] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (id) {
      fetchCampaignDetails();
      fetchSupporters();
      fetchCurrentUser();
      fetchChatMessages();
      checkIfLiked();
    }
  }, [id]);
  
  useEffect(() => {
    // Scroll to bottom of chat when new messages come in
    if (chatEndRef.current && showChat) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, showChat]);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: brandData } = await supabase
          .from('brands')
          .select('id, brand_name, brand_logo')
          .eq('id', user.id)
          .single();
          
        if (brandData) {
          setCurrentUser(brandData);
        }
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchCampaignDetails = async () => {
    try {
      // Get campaign details
      const { data: campaignData, error } = await supabase
        .from('campaigns')
        .select(`
          id, 
          title, 
          description, 
          funding_goal, 
          application_deadline, 
          post_image, 
          skills_required,
          status,
          created_at
      
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      if (campaignData) {
        // Get brand info (using as athlete info)
        const { data: brandData } = await supabase
          .from('brands')
          .select('first_name, last_name, brand_logo, email, phone')
         // .eq('id', campaignData.brand_id)
          .single();

        // Get current funding
        const { data: paymentsData } = await supabase
          .from('payments')
          .select('amount')
          .eq('transaction_id', campaignData.id);

        const totalFunding = paymentsData ? 
          paymentsData.reduce((sum, payment) => sum + payment.amount, 0) : 0;
        
        const progressPercentage = campaignData.funding_goal > 0 ? 
          Math.min(100, (totalFunding / campaignData.funding_goal) * 100) : 0;

        // Fetch campaign milestones
        const { data: milestonesData } = await supabase
          .from('milestones')
          .select('*')
          .eq('campaign_id', campaignData.id)
          .order('target_amount', { ascending: true });

        // Fetch campaign updates
        const { data: updatesData } = await supabase
          .from('campaign_updates')
          .select('*')
          .eq('campaign_id', campaignData.id)
          .order('created_at', { ascending: false });

        setCampaign({
          ...campaignData,
          current_funding: totalFunding,
          progress_percentage: progressPercentage,
          athlete_name: brandData ? `${brandData.first_name} ${brandData.last_name}` : 'Unknown Athlete',
          athlete_image: brandData?.brand_logo || '/placeholder-athlete.jpg',
          athlete_email: brandData?.email,
          athlete_phone: brandData?.phone,
          campaign_milestones: milestonesData || [],
          campaign_updates: updatesData || []
        });
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSupporters = async () => {
    try {
      const { data: paymentsData, error } = await supabase
        .from('payments')
        .select('id, brand_id, amount, created_at')
        .eq('transaction_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (paymentsData) {
        // Get brand names and images for each payment
        const supportersWithDetails = await Promise.all(
          paymentsData.map(async (payment) => {
            const { data: brandData } = await supabase
              .from('brands')
              .select('brand_name, brand_logo')
              .eq('id', payment.brand_id)
              .single();

            return {
              id: payment.id,
              brand_name: brandData?.brand_name || 'Anonymous Supporter',
              brand_image: brandData?.brand_logo,
              amount: payment.amount,
              created_at: payment.created_at
            };
          })
        );

        setSupporters(supportersWithDetails);
      }
    } catch (error) {
      console.error('Error fetching supporters:', error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const { data: messagesData, error } = await supabase
        .from('chat_messages')
        .select('*')
        .or(`campaign_id.eq.${id}`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (messagesData) {
        // Get sender info for each message
        const messagesWithDetails = await Promise.all(
          messagesData.map(async (message) => {
            const { data: senderData } = await supabase
              .from('brands')
              .select('brand_name, brand_logo, id')
              .eq('id', message.sender_id)
              .single();
              
            const isBrandMessage = currentUser ? message.sender_id === currentUser.id : false;

            return {
              id: message.id,
              sender_id: message.sender_id,
              sender_name: senderData?.brand_name || 'Unknown User',
              sender_image: senderData?.brand_logo,
              content: message.content,
              created_at: message.created_at,
              is_brand_message: isBrandMessage
            };
          })
        );

        setChatMessages(messagesWithDetails);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const checkIfLiked = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data } = await supabase
          .from('campaign_likes')
          .select('*')
          .eq('campaign_id', id)
          .eq('user_id', user.id)
          .single();
        
        setIsLiked(!!data);
      }
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };
  
  const handleToggleLike = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to like campaigns');
        return;
      }
      
      if (isLiked) {
        // Unlike campaign
        await supabase
          .from('campaign_likes')
          .delete()
          .eq('campaign_id', id)
          .eq('user_id', user.id);
      } else {
        // Like campaign
        await supabase
          .from('campaign_likes')
          .insert([
            { campaign_id: id, user_id: user.id }
          ]);
      }
      
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to send messages');
        return;
      }
      
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          { 
            campaign_id: id, 
            sender_id: user.id,
            content: newMessage,
            //recipient_id: campaign?.brand_id
          }
        ])
        .select();
        
      if (error) throw error;
      
      if (data) {
        const newChatMessage: ChatMessage = {
          id: data[0].id,
          sender_id: user.id,
          sender_name: currentUser?.brand_name || 'You',
          sender_image: currentUser?.brand_logo,
          content: newMessage,
          created_at: new Date().toISOString(),
          is_brand_message: true
        };
        
        setChatMessages([...chatMessages, newChatMessage]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleReportCampaign = async () => {
    if (!reportReason) {
      alert('Please select a reason for reporting');
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to report campaigns');
        return;
      }
      
      const { error } = await supabase
        .from('reports')
        .insert([
          { 
            campaign_id: id, 
            reporter_id: user.id,
            reason: reportReason,
            description: reportDescription,
            status: 'pending'
          }
        ]);
        
      if (error) throw error;
      
      alert('Thank you for your report. Our team will review it shortly.');
      setShowReportModal(false);
      setReportReason('');
      setReportDescription('');
    } catch (error) {
      console.error('Error reporting campaign:', error);
    }
  };

  const handleBlockAthlete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || !campaign) {
        alert('You must be logged in to block users');
        return;
      }
      
      const { error } = await supabase
        .from('blocked_users')
        .insert([
          { 
            user_id: user.id, 
           // blocked_user_id: campaign.brand_id
          }
        ]);
        
      if (error) throw error;
      
      alert('You have blocked this athlete. You will no longer see their campaigns.');
      router.push('/brand/campaigns');
    } catch (error) {
      console.error('Error blocking athlete:', error);
    }
  };

  const handleShareCampaign = () => {
    if (navigator.share) {
      navigator.share({
        title: campaign?.title,
        text: `Check out this athlete campaign: ${campaign?.title}`,
        url: window.location.href,
      })
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Campaign link copied to clipboard!'))
        .catch((error) => console.error('Error copying link:', error));
    }
  };

  const handleSupportCampaign = async () => {
    if (supportAmount < 100) {
      alert('Minimum support amount is ₹100');
      return;
    }
    
    setProcessingSupport(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('You must be logged in to support campaigns');
        setProcessingSupport(false);
        return;
      }
      
      // Mock payment processing - in a real app, you'd integrate with a payment gateway
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create payment record
      const { error } = await supabase
        .from('payments')
        .insert([
          { 
            transaction_id: id, 
            brand_id: user.id,
            amount: supportAmount,
            payment_method: 'credit_card',
            status: 'completed'
          }
        ]);
        
      if (error) throw error;
      
      // Refresh campaign details and supporters
      fetchCampaignDetails();
      fetchSupporters();
      
      alert('Thank you for your support!');
      //setShowSupportModal(false);
      setSupportAmount(0);
    } catch (error) {
      console.error('Error supporting campaign:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setProcessingSupport(false);
    }
  };
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Function to format time for chat
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900">Campaign not found</h3>
            <p className="mt-2 text-gray-500">The campaign you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/brand-funding/crowdfunding')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Campaigns
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Campaign Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Campaign Image */}
              <div className="h-80 relative">
                {campaign.post_image ? (
                  <img 
                    src={campaign.post_image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button 
                    onClick={handleShareCampaign}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                    aria-label="Share campaign"
                  >
                    <FaShare className="text-indigo-600" />
                  </button>
                  <button 
                    onClick={handleToggleLike}
                    className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                    aria-label={isLiked ? "Unlike campaign" : "Like campaign"}
                  >
                    {isLiked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Campaign Info */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        {campaign.athlete_image ? (
                          <img 
                            src={campaign.athlete_image} 
                            alt={campaign.athlete_name}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-500 font-bold">
                              {campaign.athlete_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">{campaign.athlete_name}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setShowReportModal(true)}
                      className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                    >
                      <FaFlag />
                      <span className="text-sm">Report</span>
                    </button>
                    <button 
                      onClick={handleBlockAthlete}
                      className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                    >
                      <FaBan />
                      <span className="text-sm">Block</span>
                    </button>
                  </div>
                </div>
                
                {/* Campaign Progress */}
                <div className="my-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-lg">₹{campaign.current_funding.toLocaleString()} raised</span>
                    <span className="text-gray-500 text-lg">of ₹{campaign.funding_goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full" 
                      style={{ width: `${campaign.progress_percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-indigo-600 font-medium">{campaign.progress_percentage.toFixed(1)}% funded</span>
                    <span className="text-gray-500">Deadline: {formatDate(campaign.application_deadline)}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-4 mt-6">
                  <button 
                   onClick={() => router.push(`/brand/campaigns/${campaign.id}/support`)}
                    className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-bold"
                  >
                    Support This Athlete
                  </button>
                  <button 
                    onClick={() => setShowChat(true)}
                    className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaComment />
                      <span>Contact Athlete</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Campaign Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Campaign</h2>
              <p className="text-gray-700 whitespace-pre-line">{campaign.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Sport Category</h3>
                  <p className="text-indigo-600">{campaign.skills_required}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Campaign Status</h3>
                  <p className="text-green-600 capitalize">{campaign.status}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Campaign Started</h3>
                  <p className="text-gray-600">{formatDate(campaign.created_at)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900">Campaign Ends</h3>
                  <p className="text-gray-600">{formatDate(campaign.application_deadline)}</p>
                </div>
              </div>
            </div>
            
            {/* Campaign Milestones */}
            {campaign.campaign_milestones && campaign.campaign_milestones.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Funding Milestones</h2>
                <div className="space-y-4">
                  {campaign.campaign_milestones.map((milestone, index) => (
                    <div key={milestone.id} className="border-l-4 pl-4 py-2" style={{ borderColor: campaign.current_funding >= milestone.target_amount ? '#4F46E5' : '#E5E7EB' }}>
                      <h3 className="font-bold text-lg flex items-center">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${campaign.current_funding >= milestone.target_amount ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {index + 1}
                        </span>
                        {milestone.title}
                        {campaign.current_funding >= milestone.target_amount && (
                          <span className="ml-2 text-sm font-normal text-green-600">Achieved!</span>
                        )}
                      </h3>
                      <p className="text-gray-600 mt-1">{milestone.description}</p>
                      <p className="text-indigo-600 font-medium mt-1">₹{milestone.target_amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Campaign Updates */}
            {campaign.campaign_updates && campaign.campaign_updates.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Updates</h2>
                <div className="space-y-6">
                  {campaign.campaign_updates.map((update) => (
                    <div key={update.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="font-bold text-lg">{update.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{formatDate(update.created_at)}</p>
                      {update.media_url && (
                        <div className="my-3">
                          <img 
                            src={update.media_url} 
                            alt={update.title}
                            className="rounded-lg max-h-64 object-cover" 
                          />
                        </div>
                      )}
                      <p className="text-gray-700 whitespace-pre-line">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Athlete Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Athlete Information</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                  {campaign.athlete_image ? (
                    <img 
                      src={campaign.athlete_image} 
                      alt={campaign.athlete_name}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-500 font-bold text-2xl">
                        {campaign.athlete_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{campaign.athlete_name}</h3>
                  <p className="text-gray-500 text-sm">Athlete • {campaign.skills_required}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-4">
                {campaign.athlete_email && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Email:</span>
                    <a href={`mailto:${campaign.athlete_email}`} className="text-indigo-600 hover:text-indigo-800">
                      {campaign.athlete_email}
                    </a>
                  </div>
                )}
                {campaign.athlete_phone && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Phone:</span>
                    <a href={`tel:${campaign.athlete_phone}`} className="text-indigo-600 hover:text-indigo-800">
                      {campaign.athlete_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/* Recent Supporters */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Supporters</h2>
  {supporters.length > 0 ? (
    <div className="space-y-4">
      {supporters.slice(0, 5).map((supporter) => (
        <div key={supporter.id} className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
            {supporter.brand_image ? (
              <img 
                src={supporter.brand_image} 
                alt={supporter.brand_name}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-500 font-bold">
                  {supporter.brand_name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{supporter.brand_name}</h3>
            <p className="text-gray-500 text-sm">Supported ₹{supporter.amount.toLocaleString()}</p>
          </div>
        </div>
      ))}
      {supporters.length > 5 && (
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2">
          View all {supporters.length} supporters
        </button>
      )}
    </div>
  ) : (
    <div className="text-center py-6 text-gray-500">
      <p>Be the first to support this campaign!</p>
    </div>
  )}
</div>

{/* Share Campaign */}
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Share This Campaign</h2>
  <p className="text-gray-600 mb-4">Help spread the word and get this athlete funded!</p>
  <div className="flex space-x-2">
    <button 
      onClick={handleShareCampaign}
      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="flex items-center justify-center space-x-2">
        <FaShare />
        <span>Share</span>
      </div>
    </button>
    <button 
      onClick={() => {
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('Campaign link copied to clipboard!'))
          .catch(error => console.error('Error copying link:', error));
      }}
      className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      <div className="flex items-center justify-center space-x-2">
        <FaDownload />
        <span>Copy Link</span>
      </div>
    </button>
  </div>
</div>
</div>
</div>
</div>

{/* Chat Modal */}
{showChat && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
  <div className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full sm:max-w-lg h-[500px] sm:h-[600px] flex flex-col">
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-2">
          {campaign.athlete_image ? (
            <img 
              src={campaign.athlete_image} 
              alt={campaign.athlete_name}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-500 font-bold">
                {campaign.athlete_name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        {campaign.athlete_name}
      </h3>
      <button 
        onClick={() => setShowChat(false)}
        className="text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Close</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {chatMessages.length > 0 ? (
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.is_brand_message ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.is_brand_message ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200'} rounded-lg px-4 py-2 shadow-sm`}>
                <div className="flex items-center space-x-2 mb-1">
                  {!message.is_brand_message && (
                    <div className="h-6 w-6 rounded-full bg-gray-200 overflow-hidden">
                      {message.sender_image ? (
                        <img 
                          src={message.sender_image} 
                          alt={message.sender_name}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-500 font-bold text-xs">
                            {message.sender_name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <span className={`text-xs font-medium ${message.is_brand_message ? 'text-indigo-100' : 'text-gray-900'}`}>
                    {message.is_brand_message ? 'You' : message.sender_name}
                  </span>
                  <span className={`text-xs ${message.is_brand_message ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {formatTime(message.created_at)}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <FaComment className="h-12 w-12 mb-4 text-gray-300" />
          <p className="text-center">No messages yet. Start the conversation with {campaign.athlete_name}!</p>
        </div>
      )}
    </div>
    
    <div className="p-4 border-t bg-white">
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={`Message ${campaign.athlete_name}...`}
        />
        <button
          title = "Send Message"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <FaPaperPlane className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</div>
)}

{/* Report Modal */}
{showReportModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <IoMdAlert className="text-red-500 mr-2" /> Report Campaign
      </h3>
      <button 
        onClick={() => setShowReportModal(false)}
        className="text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Close</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason for reporting
        </label>
        <select
          aria-label="Reason for reporting"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a reason</option>
          <option value="inappropriate_content">Inappropriate content</option>
          <option value="misinformation">Misinformation</option>
          <option value="scam">Scam or fraud</option>
          <option value="impersonation">Impersonation</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional details (optional)
        </label>
        <textarea
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Please provide more details about your report..."
        ></textarea>
      </div>
      
      <div className="flex space-x-3 mt-6">
        <button
          onClick={() => setShowReportModal(false)}
          className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleReportCampaign}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Submit Report
        </button>
      </div>
    </div>
  </div>
</div>
)}

{/* Support Modal */}

{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-900">Support This Athlete</h3>
      <button 
        onClick={() => router.push(`/brand/campaigns/${campaign.id}/support`)}
        className="text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Close</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div className="space-y-4">
      <p className="text-gray-600">Your contribution helps {campaign.athlete_name} achieve their goals.</p>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Support Amount (₹)
        </label>
        <input
          type="number"
          min="100"
          value={supportAmount}
          onChange={(e) => setSupportAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter amount (minimum ₹100)"
        />
        <p className="text-sm text-gray-500 mt-1">Minimum support amount is ₹100.</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <button 
          onClick={() => setSupportAmount(500)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ₹500
        </button>
        <button 
          onClick={() => setSupportAmount(1000)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ₹1,000
        </button>
        <button 
          onClick={() => setSupportAmount(2500)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ₹2,500
        </button>
        <button 
          onClick={() => setSupportAmount(5000)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ₹5,000
        </button>
        <button 
          onClick={() => setSupportAmount(10000)}
          className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          ₹10,000
        </button>
      </div>
      
      <div className="mt-6">
        <button
          onClick={handleSupportCampaign}
          disabled={processingSupport || supportAmount < 100}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 font-bold"
        >
          {processingSupport ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            `Support with ₹${supportAmount.toLocaleString() || '0'}`
          )}
        </button>
      </div>
    </div>
  </div>
</div> */}

</div>
);
}