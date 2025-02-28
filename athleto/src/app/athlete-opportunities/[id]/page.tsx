"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, Clock, MapPin, Trophy, User, 
  CheckCircle, Award, Hourglass, Phone, Mail, FileText,
  Download, ChevronRight, AlertCircle, Edit3, Share2
} from "lucide-react";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import AthleteNavbar from "@/components/AthleteNavbar";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import Chatbot from "@/components/Chatbot";

// TypeScript Types (Same as in your applied page)
type SportCategory = 'Cricket' | 'Athletics' | 'Kabaddi' | 'Badminton' | 'Wrestling' | 'Basketball' | 'Football' | 'Hockey';
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
type FundingType = 'Full Scholarship' | 'Equipment + Coaching' | 'Travel + Accommodation' | 'Equipment + Training' | 'Monthly Stipend';
type CampaignStatus = 'open' | 'confirmed' | 'complete';

interface Company {
  name: string;
  description: string;
  logo: string;
}

interface Campaign {
  id: number;
  title: string;
  amount: number;
  location: string;
  dueDate: string;
  postedDate: string;
  sport: SportCategory;
  skillLevel: SkillLevel;
  company: Company;
  status: CampaignStatus;
  dateRange: string;
  timeRange: string;
  fundingType: FundingType;
  applicationProgress: number;
  feedback?: string;
  description?: string;
  requirements?: string[];
  eligibility?: string[];
  contactInfo?: {
    name: string;
    position: string;
    phone: string;
    email: string;
  }[];
  documents?: {
    required: {
      name: string;
      description: string;
      isUploaded: boolean;
    }[];
    optional: {
      name: string;
      description: string;
      isUploaded: boolean;
    }[];
  };
  timeline?: {
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
  nextSteps?: string[];
}

// Mock data for demonstration
const campaignsData: Campaign[] = [
    {
      id: 1,
      title: "All India Football Federation - Youth Development Program",
      amount: 30000,
      location: "Kolkata, West Bengal",
      dueDate: "20.03.25",
      postedDate: "15.01.25",
      sport: "Football",
      skillLevel: "Intermediate",
      company: {
        name: "All India Football Federation",
        description: "National governing body for football in India committed to developing young talent across the country.",
        logo: "/logos/aiff-logo.svg",
      },
      status: "open",
      dateRange: "01.04.25 - 30.06.25",
      timeRange: "06:30 AM - 11:30 AM",
      fundingType: "Full Scholarship",
      applicationProgress: 75,
      description: "The AIFF Youth Development Program aims to identify and nurture promising football talent from economically disadvantaged backgrounds. Selected participants will receive comprehensive training from licensed coaches, equipment, nutrition guidance, and potential pathways to state teams and the national youth setup.",
      requirements: [
        "Commitment to attend all training sessions",
        "Participation in fitness assessments",
        "Adherence to the code of conduct",
        "Regular progress evaluations"
      ],
      eligibility: [
        "Age: 13-18 years",
        "Skill level: Intermediate or above",
        "Financial background: Family income below ₹5 lakhs per annum",
        "Prior experience: At least 2 years of playing football at school/club level"
      ],
      contactInfo: [
        {
          name: "Sunil Das",
          position: "Program Coordinator",
          phone: "+91 98765 12345",
          email: "sunil.das@aiff.org.in"
        },
        {
          name: "Meera Khanna",
          position: "Technical Coach",
          phone: "+91 87654 23456",
          email: "meera.khanna@aiff.org.in"
        }
      ],
      documents: {
        required: [
          {
            name: "Income Certificate",
            description: "Family income certificate issued by a government authority",
            isUploaded: true
          },
          {
            name: "Football Performance Records",
            description: "Documentation of matches played and performance statistics",
            isUploaded: true
          },
          {
            name: "Medical Fitness Certificate",
            description: "Certificate from a registered medical practitioner",
            isUploaded: true
          },
          {
            name: "Recommendation Letter",
            description: "Letter from a coach or sports teacher",
            isUploaded: false
          }
        ],
        optional: [
          {
            name: "Previous Awards",
            description: "Certificates or proof of previous football achievements",
            isUploaded: true
          },
          {
            name: "Training Videos",
            description: "Short video clips demonstrating football skills",
            isUploaded: false
          }
        ]
      },
      timeline: [
        {
          date: "15.01.25",
          title: "Application Submitted",
          description: "Your application was successfully submitted for review",
          status: "completed"
        },
        {
          date: "01.02.25",
          title: "Initial Screening",
          description: "Your application passed the initial eligibility screening",
          status: "completed"
        },
        {
          date: "20.02.25",
          title: "Document Verification",
          description: "Your submitted documents are being verified",
          status: "current"
        },
        {
          date: "10.03.25",
          title: "Selection Trial",
          description: "Physical assessment and skills evaluation",
          status: "upcoming"
        },
        {
          date: "25.03.25",
          title: "Final Decision",
          description: "Final selection results announced",
          status: "upcoming"
        },
        {
          date: "01.04.25",
          title: "Program Start",
          description: "Begin training at the facility",
          status: "upcoming"
        }
      ],
      nextSteps: [
        "Upload your Recommendation Letter document",
        "Be prepared for document verification call from program officers",
        "Prepare for your upcoming selection trial"
      ]
    },
    {
      id: 2,
      title: "ISL Future Stars - Elite Football Training",
      amount: 45000,
      location: "Goa, India",
      dueDate: "15.03.25",
      postedDate: "10.01.25",
      sport: "Football",
      skillLevel: "Advanced",
      company: {
        name: "Indian Super League",
        description: "Premier football league in India providing professional pathways and development opportunities for talented players.",
        logo: "/logos/isl-logo.svg",
      },
      status: "confirmed",
      dateRange: "01.04.25 - 31.07.25",
      timeRange: "05:00 AM - 09:00 AM",
      fundingType: "Equipment + Coaching",
      applicationProgress: 100,
      description: "The ISL Future Stars program is a comprehensive elite football training initiative designed to prepare talented players for professional careers. The program provides professional coaching from ISL club staff, high-quality equipment, sports science support, and competitive matches against academy teams with potential scouting opportunities.",
      requirements: [
        "Full attendance at all training sessions",
        "Periodic fitness and performance assessments",
        "Participation in showcase matches and tournaments",
        "Adherence to nutrition and recovery protocols"
      ],
      eligibility: [
        "Age: 16-21 years",
        "Skill level: Advanced or Elite",
        "Performance metrics: Meeting specific technical standards",
        "Commitment to pursuing professional football"
      ],
      contactInfo: [
        {
          name: "Ravi Patel",
          position: "Head Coach",
          phone: "+91 97531 34567",
          email: "ravi.patel@isl.football"
        },
        {
          name: "Anita Fernandez",
          position: "Player Development Officer",
          phone: "+91 86420 45678",
          email: "anita.fernandez@isl.football"
        }
      ],
      timeline: [
        {
          date: "10.01.25",
          title: "Application Submitted",
          description: "Your application was successfully submitted for review",
          status: "completed"
        },
        {
          date: "25.01.25",
          title: "Initial Screening",
          description: "Your application passed the initial eligibility screening",
          status: "completed"
        },
        {
          date: "10.02.25",
          title: "Assessment Trial",
          description: "Physical assessment and skills evaluation",
          status: "completed"
        },
        {
          date: "25.02.25",
          title: "Interview Round",
          description: "Interview with coaching staff and program directors",
          status: "completed"
        },
        {
          date: "05.03.25",
          title: "Selection Announced",
          description: "Congratulations! You've been selected for the program",
          status: "completed"
        },
        {
          date: "01.04.25",
          title: "Program Start",
          description: "Begin your training journey",
          status: "current"
        }
      ],
      nextSteps: [
        "Attend orientation session on April 1st at 8:00 AM",
        "Complete medical examination at ISL Medical Center",
        "Collect your training kit and equipment",
        "Review and sign the player code of conduct"
      ]
    },
    {
      id: 3,
      title: "Grassroots Football Initiative - Basic Skills Camp",
      amount: 15000,
      location: "Shillong, Meghalaya",
      dueDate: "10.01.25",
      postedDate: "15.11.24",
      sport: "Football",
      skillLevel: "Beginner",
      company: {
        name: "Northeast United FC Foundation",
        description: "Community development arm of Northeast United FC focused on promoting football in India's northeastern region.",
        logo: "/logos/neufc-logo.svg",
      },
      status: "complete",
      dateRange: "20.01.25 - 20.02.25",
      timeRange: "07:00 AM - 10:00 AM",
      fundingType: "Equipment + Training",
      applicationProgress: 100,
      feedback: "Excellent attitude and quick learner. Recommended for intermediate program.",
      description: "The Grassroots Football Initiative aims to introduce and develop fundamental football skills in young enthusiasts. The program covers basic techniques, positioning, teamwork, and physical conditioning specifically designed for beginners in the sport.",
      timeline: [
        {
          date: "15.11.24",
          title: "Application Submitted",
          description: "Your application was successfully submitted",
          status: "completed"
        },
        {
          date: "01.12.24",
          title: "Application Review",
          description: "Your application was reviewed and approved",
          status: "completed"
        },
        {
          date: "20.12.24",
          title: "Selection Notification",
          description: "You were selected to participate in the program",
          status: "completed"
        },
        {
          date: "20.01.25",
          title: "Program Start",
          description: "Beginning of the training program",
          status: "completed"
        },
        {
          date: "20.02.25",
          title: "Program Completion",
          description: "Successfully completed all training modules",
          status: "completed"
        }
      ]
    },
    {
        id: 4,
        title: "Grassroots Football Initiative - Basic Skills Camp",
        amount: 15000,
        location: "Shillong, Meghalaya",
        dueDate: "10.01.25",
        postedDate: "15.11.24",
        sport: "Football",
        skillLevel: "Beginner",
        company: {
            name: "Northeast United FC Foundation",
            description: "Community development arm of Northeast United FC focused on promoting football in India's northeastern region.",
            logo: "/logos/neufc-logo.svg"
        },
        status: "complete",
        dateRange: "20.01.25 - 20.02.25",
        timeRange: "07:00 AM - 10:00 AM",
        fundingType: "Equipment + Training",
        applicationProgress: 100,
        description: "This camp is designed for young football enthusiasts who want to learn the basics of the game under expert guidance. The program covers fundamental skills, teamwork drills, and fitness routines to build a strong foundation.",
        requirements: [
            "Regular attendance throughout the camp duration",
            "Participation in all scheduled training sessions",
            "Adherence to the camp’s code of conduct"
        ],
        eligibility: [
            "Age: 10-16 years",
            "Skill level: Beginner",
            "Interest in learning football and participating in structured training sessions"
        ],
        contactInfo: [
            {
                name: "Rohan Thapa",
                position: "Youth Program Coordinator",
                phone: "+91 98234 56789",
                email: "rohan.thapa@neufcfoundation.org"
            }
        ],
        // documents: {
        //     required: [
        //         {
        //             name: "Birth Certificate",
        //             description: "Proof of age verification",
        //             isUploaded: true
        //         },
        //         {
        //             name: "Parental Consent Form",
        //             description: "Signed approval from a parent or guardian",
        //             isUploaded: true
        //         }
        //     ]
        // },
        timeline: [
            {
                date: "15.11.24",
                title: "Application Submitted",
                description: "Your application was successfully submitted",
                status: "completed"
            },
            {
                date: "01.12.24",
                title: "Document Review",
                description: "Your application documents have been reviewed",
                status: "completed"
            },
            {
                date: "20.12.24",
                title: "Selection Announcement",
                description: "Final list of selected candidates announced",
                status: "completed"
            },
            {
                date: "20.01.25",
                title: "Camp Start",
                description: "Football training begins at the designated facility",
                status: "completed"
            },
            {
                date: "20.02.25",
                title: "Camp Completion",
                description: "Successful completion of the training camp",
                status: "completed"
            }
        ],
        nextSteps: [],
        feedback: "Excellent attitude and quick learner. Recommended for intermediate program."
    },
    {
        id: 5,
        title: "Tata Football Academy - Residential Scholarship Program",
        amount: 35000,
        location: "Jamshedpur, Jharkhand",
        dueDate: "15.12.24",
        postedDate: "01.11.24",
        sport: "Football",
        skillLevel: "Advanced",
        company: {
            name: "Tata Football Academy",
            description: "Premier residential football academy known for producing numerous players for the Indian national team.",
            logo: "/logos/tfa-logo.svg"
        },
        status: "complete",
        dateRange: "05.01.25 - 05.02.25",
        timeRange: "06:00 AM - 11:00 AM",
        fundingType: "Full Scholarship",
        applicationProgress: 100,
        description: "Tata Football Academy's residential program is designed for advanced football players aspiring to play professionally. It offers technical training, tactical development, fitness enhancement, and career guidance under top-tier coaches.",
        requirements: [
            "Commitment to full-time residential training",
            "Participation in competitive matches and assessments",
            "Strict adherence to academy rules and discipline"
        ],
        eligibility: [
            "Age: 14-20 years",
            "Skill level: Advanced",
            "Prior experience: Minimum 3 years of competitive football experience",
            "Medical fitness clearance"
        ],
        contactInfo: [
            {
                name: "Arjun Mehta",
                position: "Academy Director",
                phone: "+91 91234 56789",
                email: "arjun.mehta@tfa.in"
            }
        ],
        // documents: {
        //     required: [
        //         {
        //             name: "Previous Performance Records",
        //             description: "Match statistics and tournament participation details",
        //             isUploaded: true
        //         },
        //         {
        //             name: "Medical Fitness Certificate",
        //             description: "Proof of physical fitness from a certified doctor",
        //             isUploaded: true
        //         },
        //         {
        //             name: "Recommendation Letter",
        //             description: "Letter from a certified coach",
        //             isUploaded: true
        //         }
        //     ]
        // },
        timeline: [
            {
                date: "01.11.24",
                title: "Application Submitted",
                description: "Your application was successfully submitted",
                status: "completed"
            },
            {
                date: "10.11.24",
                title: "Initial Screening",
                description: "Application review and eligibility check",
                status: "completed"
            },
            {
                date: "05.12.24",
                title: "Selection Trials",
                description: "Physical and technical assessment for final selection",
                status: "completed"
            },
            {
                date: "20.12.24",
                title: "Final Selection Announcement",
                description: "List of selected candidates published",
                status: "completed"
            },
            {
                date: "05.01.25",
                title: "Program Start",
                description: "Begin training at the academy",
                status: "completed"
            },
            {
                date: "05.02.25",
                title: "Program Completion",
                description: "Successfully completed the training program",
                status: "completed"
            }
        ],
        nextSteps: [],
        feedback: "Selected for academy placement. Continue with tactical training program provided."
    }
    
    
  ];

// Application Status Timeline Component
const ApplicationTimeline = ({ timeline }: { timeline: Campaign['timeline'] }) => {
  if (!timeline) return null;
  
  return (
    <div className="space-y-4 p-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-green-100 text-green-600' : 
                item.status === 'current' ? 'bg-blue-100 text-blue-600' : 
                'bg-gray-100 text-gray-400'
              }`}
            >
              {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : 
               item.status === 'current' ? <Hourglass className="w-5 h-5" /> : 
               <Clock className="w-5 h-5" />}
            </div>
            {index < timeline.length - 1 && (
              <div className={`w-0.5 h-full mt-1 ${
                item.status === 'completed' ? 'bg-green-300' : 
                item.status === 'current' ? 'bg-blue-300' : 
                'bg-gray-200'
              }`}></div>
            )}
          </div>
          <div className="pb-6">
            <p className="text-sm text-gray-500">{item.date}</p>
            <h4 className={`font-medium ${
              item.status === 'completed' ? 'text-green-700' : 
              item.status === 'current' ? 'text-blue-700' : 
              'text-gray-500'
            }`}>{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Document Upload Status Component
const DocumentStatus = ({ documents }: { documents: Campaign['documents'] }) => {
  if (!documents) return null;
  
  const requiredDocsUploaded = documents.required.filter(doc => doc.isUploaded).length;
  const requiredDocsTotal = documents.required.length;
  const optionalDocsUploaded = documents.optional.filter(doc => doc.isUploaded).length;
  const optionalDocsTotal = documents.optional.length;
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Required Documents</h3>
          <span className="text-sm text-gray-500">{requiredDocsUploaded}/{requiredDocsTotal} Uploaded</span>
        </div>
        <Progress value={(requiredDocsUploaded/requiredDocsTotal)*100} className="h-2 mb-3" />
        
        <div className="space-y-3">
          {documents.required.map((doc, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div>
                <p className="font-medium text-gray-800">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.description}</p>
              </div>
              {doc.isUploaded ? (
                <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Uploaded
                </Badge>
              ) : (
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                  <FileText className="h-4 w-4 mr-1" /> Upload
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {documents.optional.length > 0 && (
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Optional Documents</h3>
            <span className="text-sm text-gray-500">{optionalDocsUploaded}/{optionalDocsTotal} Uploaded</span>
          </div>
          
          <div className="space-y-3">
            {documents.optional.map((doc, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div>
                  <p className="font-medium text-gray-800">{doc.name}</p>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                </div>
                {doc.isUploaded ? (
                  <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Uploaded
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                    <FileText className="h-4 w-4 mr-1" /> Upload
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Certificate Component for completed programs
const CompletionCertificate = ({ campaign }: { campaign: Campaign }) => {
  return (
    <div className="p-6 border border-blue-200 rounded-xl bg-blue-50 flex flex-col items-center text-center">
      <Award className="w-16 h-16 text-blue-600 mb-4" />
      <h2 className="text-2xl font-bold text-blue-800">Program Completion Certificate</h2>
      <p className="text-blue-700 mb-4">For successfully completing the {campaign.title}</p>
      
      <div className="my-4 w-full max-w-lg border-t border-b border-blue-200 py-4 px-8">
        <p className="text-gray-700">This certifies that</p>
        <p className="text-xl font-bold my-2">Athlete Name</p>
        <p className="text-gray-700">has successfully completed all requirements of the</p>
        <p className="text-lg font-semibold my-2">{campaign.title}</p>
        <p className="text-gray-700">during {campaign.dateRange}</p>
      </div>
      
      <div className="flex gap-3 mt-4">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" /> Download Certificate
        </Button>
        <Button variant="outline" className="border-blue-300 text-blue-700">
          <Share2 className="h-4 w-4 mr-2" /> Share
        </Button>
      </div>
    </div>
  );
};

type ParamProps = {
  params: Promise<{ id: string }>;
}
// Opportunity Detail Page
const OpportunityDetailPage = ({ params }: ParamProps ) => {
    // For TypeScript to understand the type properly
    // const id = typeof params === 'object' && 'id' in params ? (params as { id: string }).id : use(params).id;
    // const id = params.id;
    // const id = params.id;
    const  {id}  = React.use(params);
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useForceLightMode();
    
    useEffect(() => {
      // In a real app, this would be a fetch call to your API/Supabase
      const campaignId = parseInt(id);
      const foundCampaign = campaignsData.find(c => c.id === campaignId);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      setLoading(false);
    }, [id]);
  
  
  if (loading) {
    return (
      <>
        <AthleteNavbar />
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading opportunity details...</p>
          </div>
        </div>
      </>
    );
  }
  
  if (!campaign) {
    return (
      <>
        <AthleteNavbar />
        <div className="bg-gray-50 min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Opportunity Not Found</h2>
              <p className="text-gray-600 mb-6">We couldn't find the opportunity you're looking for.</p>
              <Button onClick={() => router.push('/athlete-applied')} className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" /> Return to My Opportunities
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  const statusColors: Record<CampaignStatus, string> = {
    open: "bg-amber-100 text-amber-800 border-amber-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    complete: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const statusText: Record<CampaignStatus, string> = {
    open: "Application Under Review",
    confirmed: "Application Accepted",
    complete: "Program Completed"
  };

  const statusIcons: Record<CampaignStatus, React.ReactNode> = {
    open: <Clock className="h-4 w-4 mr-1" />,
    confirmed: <CheckCircle className="h-4 w-4 mr-1" />,
    complete: <Award className="h-4 w-4 mr-1" />
  };
  
  return (
    <>
      <AthleteNavbar />
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="bg-white border-b border-gray-200 mb-6">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/athlete-dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/athlete-applied">My Opportunities</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink>Opportunity Details</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
                  <div className="flex items-center mt-1">
                    <Badge className={`${statusColors[campaign.status]} flex items-center px-3 py-1 mr-3`}>
                      {statusIcons[campaign.status]} {statusText[campaign.status]}
                    </Badge>
                    <span className="text-gray-500 text-sm">Application ID: {campaign.id}</span>
                  </div>
                </div>
                
                <div>
                  <Button 
                    variant="outline" 
                    className="border-gray-300"
                    onClick={() => router.push('/athlete-applied')}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Opportunities
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Organization Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={campaign.company.logo} alt={campaign.company.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-800 font-bold text-xl">
                        {campaign.company.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{campaign.company.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.company.description}</p>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{campaign.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Program Dates</p>
                        <p className="text-gray-600">{campaign.dateRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Schedule</p>
                        <p className="text-gray-600">{campaign.timeRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Trophy className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Sport</p>
                        <p className="text-gray-600">{campaign.sport}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Skill Level</p>
                        <p className="text-gray-600">{campaign.skillLevel}</p>
                      </div>
                    </div>
                  </div>
                  
                  {campaign.contactInfo && (
                    <div className="mt-8">
                      <h3 className="font-medium mb-3">Contact Information</h3>
                      <div className="space-y-4">
                        {campaign.contactInfo.map((contact, index) => (
                          <div key={index} className="border-l-2 border-blue-500 pl-3 py-1">
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-600">{contact.position}</p>
                            <div className="flex items-center mt-1 text-sm">
                              <Phone className="h-3 w-3 mr-1 text-gray-500" />
                              <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                                {contact.phone}
                              </a>
                            </div>
                            <div className="flex items-center mt-1 text-sm">
                              <Mail className="h-3 w-3 mr-1 text-gray-500" />
                              <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                {contact.email}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Middle and Right Columns - Application Details */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Application Details</CardTitle>
                    <div className="text-right">
                    <p className="text-2xl font-bold text-blue-700">₹{campaign.amount.toLocaleString()}</p>
      <p className="text-sm text-gray-600">{campaign.fundingType}</p>
    </div>
  </div>
</CardHeader>
<CardContent>
  {campaign.status === 'open' && (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="font-medium">Application Progress</h3>
          <p className="text-sm text-gray-500">Complete remaining steps to improve your chances</p>
        </div>
        <span className="font-bold text-blue-700">{campaign.applicationProgress}%</span>
      </div>
      <Progress value={campaign.applicationProgress} className="h-2 mb-4" />
      
      {campaign.nextSteps && (
        <div className="mt-6">
          <h3 className="font-medium mb-3">Next Steps</h3>
          <div className="space-y-2">
            {campaign.nextSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start bg-blue-50 p-3 rounded-md border border-blue-100"
              >
                <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
  
  {campaign.status === 'confirmed' && (
    <div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800">Congratulations!</h3>
            <p className="text-green-700">
              Your application has been approved. Please review the next steps and be prepared
              to start the program on {campaign.dateRange.split(' - ')[0]}.
            </p>
          </div>
        </div>
      </div>
      
      {campaign.nextSteps && (
        <div>
          <h3 className="font-medium mb-3">Next Steps</h3>
          <div className="space-y-2">
            {campaign.nextSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start bg-blue-50 p-3 rounded-md border border-blue-100"
              >
                <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
  
  {campaign.status === 'complete' && campaign.feedback && (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Award className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800">Program Completed</h3>
            <p className="text-blue-700">
              You have successfully completed this program. Here's your feedback:
            </p>
            <p className="mt-2 italic text-gray-700">"{campaign.feedback}"</p>
          </div>
        </div>
      </div>
    </div>
  )}
</CardContent>
</Card>

<Tabs defaultValue="details" className="mb-6">
<TabsList className="grid grid-cols-3">
  <TabsTrigger value="details">Program Details</TabsTrigger>
  <TabsTrigger value="timeline">Application Timeline</TabsTrigger>
  <TabsTrigger value="documents">Documents</TabsTrigger>
</TabsList>

<TabsContent value="details" className="bg-white rounded-md border p-4">
  {campaign.description && (
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-2">Program Description</h3>
      <p className="text-gray-700">{campaign.description}</p>
    </div>
  )}
  
  {campaign.requirements && (
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-2">Program Requirements</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {campaign.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  )}
  
  {campaign.eligibility && (
    <div>
      <h3 className="font-medium text-lg mb-2">Eligibility Criteria</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {campaign.eligibility.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )}
</TabsContent>

<TabsContent value="timeline" className="bg-white rounded-md border">
  <ApplicationTimeline timeline={campaign.timeline} />
</TabsContent>

<TabsContent value="documents" className="bg-white rounded-md border p-6">
  <DocumentStatus documents={campaign.documents} />
</TabsContent>
</Tabs>

{campaign.status === 'complete' && (
  <CompletionCertificate campaign={campaign} />
)}

<Card className="mt-6">
  <CardHeader>
    <CardTitle>Need Assistance?</CardTitle>
  </CardHeader>
  <CardContent>
    <Chatbot />
  </CardContent>
</Card>
</div>
</div>
</div>
</div>
</>
);
};

export default OpportunityDetailPage;