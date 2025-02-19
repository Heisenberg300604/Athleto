"use client"

import { useState } from "react"
import AthleteNavbar from "@/components/AthleteNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Calendar, Medal, Trophy } from "lucide-react"

// Sample scholarship data
const SAMPLE_SCHOLARSHIPS = [
  {
    id: 1,
    name: "Champions Development Program",
    provider: "SportsTech Bank",
    amount: 500000,
    deadline: "2024-05-15",
    eligibility: "National level athletes under 21",
  },
  {
    id: 2,
    name: "Elite Athlete Grant",
    provider: "Ministry of Sports",
    amount: 1000000,
    deadline: "2024-06-30",
    eligibility: "International medal winners",
  },
]

const SAMPLE_COLLABORATION_REQUESTS = [
  {
    id: 1,
    type: "Workshop",
    brand: "FitLife Nutrition",
    compensation: 25000,
    date: "2024-03-25",
    status: "Pending",
  },
  {
    id: 2,
    type: "Product Demo",
    brand: "SportsFit Gear",
    compensation: 15000,
    date: "2024-04-01",
    status: "Accepted",
  },
]

export default function AthleteFunding() {
  const [activeTab, setActiveTab] = useState("crowdfunding")
  const { toast } = useToast();  // Destructure toast properly

  const handleSuccess = (message: string) => {
    toast({
      title: "Success!",
      description: message,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AthleteNavbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Funding Options</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
            <TabsTrigger value="micro-investment">Micro-Investment</TabsTrigger>
            <TabsTrigger value="train-now-pay-later">Train Now, Pay Later</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>
          <TabsContent value="crowdfunding">
            <Card>
              <CardHeader>
                <CardTitle>Create a Crowdfunding Campaign</CardTitle>
                <CardDescription>Set up a campaign to fund your specific needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-title">Campaign Title</Label>
                  <Input id="campaign-title" placeholder="Enter campaign title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="funding-goal">Funding Goal (₹)</Label>
                  <Input id="funding-goal" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-description">Campaign Description</Label>
                  <Textarea id="campaign-description" placeholder="Describe your funding needs" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >Create Campaign</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="micro-investment">
            <Card>
              <CardHeader>
                <CardTitle>Performance-Based Micro-Investment</CardTitle>
                <CardDescription>Get funding in exchange for a percentage of future earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="funding-amount">Funding Amount (₹)</Label>
                  <Input id="funding-amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="earnings-percentage">Earnings Percentage (%)</Label>
                  <Input id="earnings-percentage" type="number" placeholder="Enter percentage" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="investment-duration">Investment Duration (years)</Label>
                  <Input id="investment-duration" type="number" placeholder="Enter duration" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                   className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >Submit Proposal</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="train-now-pay-later">
            <Card>
              <CardHeader>
                <CardTitle>Train Now, Pay Later</CardTitle>
                <CardDescription>Apply for a zero-interest loan for your training needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                  <Input id="loan-amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-purpose">Loan Purpose</Label>
                  <Textarea id="loan-purpose" placeholder="Describe how you'll use the loan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repayment-plan">Repayment Plan</Label>
                  <Textarea id="repayment-plan" placeholder="Describe your repayment plan" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                   className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >Apply for Loan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>Collaboration Opportunities</CardTitle>
                <CardDescription>Manage your brand collaboration requests and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {SAMPLE_COLLABORATION_REQUESTS.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{request.type}</h3>
                              <Badge variant={request.status === "Accepted" ? "default" : "secondary"}>
                                {request.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{request.brand}</p>
                            <p className="text-sm mt-1">₹{request.compensation.toLocaleString()} • {request.date}</p>
                          </div>
                          <div className="space-x-2">
                            {request.status === "Pending" && (
                              <>
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleSuccess("Collaboration request declined")}
                                >
                                  Decline
                                </Button>
                                <Button 
                                  className ="bg-indigo-600 text-white hover:bg-indigo-800"
                                  onClick={() => handleSuccess("Collaboration request accepted!")}
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
                  className=" bg-indigo-600 text-white hover:bg-indigo-800" 
                  onClick={() => handleSuccess("Your availability has been updated!")}
                >
                  Update Collaboration Availability
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="scholarships">
            <Card>
              <CardHeader>
                <CardTitle>Available Scholarships</CardTitle>
                <CardDescription>Browse and apply for sports scholarships and grants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {SAMPLE_SCHOLARSHIPS.map((scholarship) => (
                    <Card key={scholarship.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{scholarship.name}</h3>
                            <p className="text-sm text-gray-500">{scholarship.provider}</p>
                            <p className="text-sm mt-1">₹{scholarship.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Deadline: {scholarship.deadline}</p>
                            <p className="text-sm text-gray-500">Eligibility: {scholarship.eligibility}</p>
                          </div>
                          <Button 
                           className=" bg-indigo-600 text-white hover:bg-indigo-800" 
                          onClick={() => handleSuccess("Scholarship application submitted successfully!")}>
                            Apply Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
