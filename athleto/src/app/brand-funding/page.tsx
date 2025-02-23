"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { Calendar, Medal, Trophy, Users, TrendingUp, CreditCard, Handshake, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import BrandNavbar from "@/components/BrandNavbar";
import FundingPreview from "@/components/FundingPreview";
const SAMPLE_CAMPAIGNS = [
  { 
    id: 1, 
    athlete: "Priya Singh", 
    title: "Training for Asian Games", 
    goal: 500000, 
    raised: 325000, 
    sport: "Athletics",
    description: "National champion seeking support for intensive training program",
    deadline: "2024-05-15" 
  },
  { 
    id: 2, 
    athlete: "Rahul Kumar", 
    title: "Olympic Qualification Journey", 
    goal: 800000, 
    raised: 420000, 
    sport: "Swimming",
    description: "Olympic hopeful preparing for qualification events",
    deadline: "2024-06-30"
  },
  { 
    id: 3, 
    athlete: "Anita Patel", 
    title: "National Championship Preparation", 
    goal: 300000, 
    raised: 180000, 
    sport: "Boxing",
    description: "Rising talent preparing for national championships",
    deadline: "2024-07-15"
  },
];

const SAMPLE_ATHLETES = [
  { 
    id: 1, 
    name: "Vikram Singh", 
    sport: "Wrestling", 
    achievements: "National Gold Medalist", 
    seeking: 1000000, 
    equity: "5%",
    description: "Looking for support to compete internationally",
    medals: 12
  },
  { 
    id: 2, 
    name: "Maya Desai", 
    sport: "Gymnastics", 
    achievements: "Commonwealth Games Finalist", 
    seeking: 1500000, 
    equity: "7%",
    description: "Aiming for Olympic qualification",
    medals: 8
  },
];

const SAMPLE_COLLABORATION_REQUESTS = [
  {
    id: 1,
    type: "Webinar",
    brand: "TechGenius",
    compensation: 30000,
    date: "2024-05-10",
    status: "Pending",
    description: "AI and ML trends webinar for developers",
  },
  {
    id: 2,
    type: "Product Review",
    brand: "Gadget Hub",
    compensation: 20000,
    date: "2024-06-05",
    status: "Accepted",
    description: "Unboxing and review of the latest smartwatch",
  },
  {
    id: 3,
    type: "YouTube Collaboration",
    brand: "Creative Studio",
    compensation: 40000,
    date: "2024-06-20",
    status: "Declined",
    description: "Sponsored video on digital art techniques",
  },
];


const TABS = [
  {
    value: "crowdfunding",
    label: "Crowdfunding",
    icon: Users,
  },
  {
    value: "micro-investment",
    label: "Micro-Investment",
    icon: TrendingUp,
  },
  {
    value: "scholarships",
    label: "Scholarships",
    icon: GraduationCap,
  },
  {
    value: "marketplace",
    label: "Marketplace",
    icon: Handshake,
  },
  {
    value: "grants",
    label: "Grants Portal",
    icon: Trophy,
  },
];

export default function BrandFunding() {
  const [activeTab, setActiveTab] = useState("crowdfunding");
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Form data states
  const [scholarshipData, setScholarshipData] = useState({
    name: "",
    amount: "",
    description: "",
  });

  useForceLightMode();

  const handleAction = async (message: string) => {
    setIsLoading(true);
    const toastPromise = new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.promise(
      toastPromise,
      {
        loading: 'Processing...',
        success: message,
        error: 'An error occurred. Please try again.',
      },
      {
        duration: 3000,
      }
    );

    try {
      await toastPromise;
      if (activeTab === "scholarships") {
        setScholarshipData({ name: "", amount: "", description: "" });
      }
      setShowPreview(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCrowdfundingContent = () => (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Browse Athlete Campaigns
        </CardTitle>
        <CardDescription>Support athletes in their journey to success</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {SAMPLE_CAMPAIGNS.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{campaign.title}</h3>
                      <Badge variant="secondary">{campaign.sport}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{campaign.athlete}</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm mt-1">
                        ₹{campaign.raised.toLocaleString()} raised of ₹{campaign.goal.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm mt-2">{campaign.description}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Deadline: {campaign.deadline}
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                    onClick={() => handleAction("Support pledged successfully!")}
                    disabled={isLoading}
                  >
                    Support Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderMicroInvestmentContent = () => (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Investment Opportunities
        </CardTitle>
        <CardDescription>Invest in promising athletes for returns on their success</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {SAMPLE_ATHLETES.map((athlete) => (
            <Card key={athlete.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{athlete.name}</h3>
                      <Badge variant="secondary">{athlete.sport}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Medal className="h-4 w-4" />
                      {athlete.achievements}
                    </p>
                    <p className="text-lg font-semibold mt-2">Seeking: ₹{athlete.seeking.toLocaleString()}</p>
                    <p className="text-sm">Equity Offered: {athlete.equity}</p>
                    <p className="text-sm mt-2">{athlete.description}</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                    onClick={() => handleAction("Investment proposal sent!")}
                    disabled={isLoading}
                  >
                    Invest Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderScholarshipContent = () => {
    if (showPreview) {
      return (
        <FundingPreview
          data={scholarshipData}
          type="crowdfunding"
          onSubmit={() => handleAction("Scholarship program created successfully!")}
          onBack={() => setShowPreview(false)}
          isLoading={isLoading}
        />
      );
    }

    return (
      <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Create Scholarship Program
          </CardTitle>
          <CardDescription>Establish a scholarship program to support athletes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scholarship-name">Program Name</Label>
            <Input
              id="scholarship-name"
              placeholder="Enter program name"
              value={scholarshipData.name}
              onChange={(e) => setScholarshipData({ ...scholarshipData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scholarship-amount">Amount (₹)</Label>
            <Input
              id="scholarship-amount"
              type="number"
              placeholder="Enter amount"
              value={scholarshipData.amount}
              onChange={(e) => setScholarshipData({ ...scholarshipData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scholarship-description">Program Description</Label>
            <Textarea
              id="scholarship-description"
              placeholder="Describe your scholarship program"
              value={scholarshipData.description}
              onChange={(e) => setScholarshipData({ ...scholarshipData, description: e.target.value })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
            onClick={() => setShowPreview(true)}
            disabled={isLoading || !scholarshipData.name || !scholarshipData.amount || !scholarshipData.description}
          >
            Preview Program
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <BrandNavbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Support Athletes</h1>
            <p className="text-gray-500">Discover opportunities to support and invest in promising athletes</p>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={(value) => {
              setActiveTab(value);
              setShowPreview(false);
            }} 
            className="w-full space-y-6"
          >
            <TabsList className="grid w-full grid-cols-5 gap-2 bg-gray-100/80 p-1">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    "data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="crowdfunding" className="space-y-4">
              {renderCrowdfundingContent()}
            </TabsContent>

            <TabsContent value="micro-investment" className="space-y-4">
              {renderMicroInvestmentContent()}
            </TabsContent>

            <TabsContent value="scholarships" className="space-y-4">
              {renderScholarshipContent()}
            </TabsContent>

          <TabsContent value="marketplace" className="space-y-4">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Collaboration Opportunities
                </CardTitle>
                <CardDescription>Manage your brand collaboration requests and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {SAMPLE_COLLABORATION_REQUESTS.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{request.type}</h3>
                              <Badge
                                variant={request.status === "Accepted" ? "default" : "secondary"}
                                className="animate-fade-in"
                              >
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{request.brand}</p>
                            <p className="text-sm mt-1">₹{request.compensation.toLocaleString()} • {request.date}</p>
                            <p className="text-sm text-gray-500 mt-2">{request.description}</p>
                          </div>
                          <div className="space-x-2">
                            {request.status === "Pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  onClick={() => handleAction("Collaboration request declined")}
                                  disabled={isLoading}
                                >
                                  Decline
                                </Button>
                                <Button
                                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                                  onClick={() => handleAction("Collaboration request accepted!")}
                                  disabled={isLoading}
                                >
                                  Accept
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md transition-all duration-200"
                  onClick={() => handleAction("Your availability has been updated!")}
                  disabled={isLoading}
                >
                  Update Collaboration Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

            <TabsContent value="grants" className="space-y-4">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Grants Portal
                  </CardTitle>
                  <CardDescription>Coming Soon - Create and manage grant programs for athletes</CardDescription>
                </CardHeader>
                <CardContent className="py-12 text-center text-gray-500">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Our grants portal is under development. Check back soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}