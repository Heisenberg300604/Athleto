"use client"

import { useState } from "react"
import BrandNavbar from "@/components/BrandNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Medal, Trophy, Users } from "lucide-react"
import { useForceLightMode } from "@/hooks/useForcedLightTheme"

// Sample data
const SAMPLE_CAMPAIGNS = [
  { id: 1, athlete: "Priya Singh", title: "Training for Asian Games", goal: 500000, raised: 325000, sport: "Athletics" },
  { id: 2, athlete: "Rahul Kumar", title: "Olympic Qualification Journey", goal: 800000, raised: 420000, sport: "Swimming" },
  { id: 3, athlete: "Anita Patel", title: "National Championship Preparation", goal: 300000, raised: 180000, sport: "Boxing" },
]

const SAMPLE_ATHLETES = [
  { id: 1, name: "Vikram Singh", sport: "Wrestling", achievements: "National Gold Medalist", seeking: 1000000, equity: "5%" },
  { id: 2, name: "Maya Desai", sport: "Gymnastics", achievements: "Commonwealth Games Finalist", seeking: 1500000, equity: "7%" },
]

const SAMPLE_COLLABORATIONS = [
  { id: 1, type: "Workshop", athlete: "Deepak Kumar", sport: "Cricket", fee: 25000, duration: "2 hours" },
  { id: 2, type: "Product Demo", athlete: "Sania Roy", sport: "Badminton", fee: 15000, duration: "1 hour" },
]

export default function BrandFunding() {
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
    useForceLightMode(),
    <div className="min-h-screen bg-gray-100">
      <BrandNavbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Funding Opportunities</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full  ">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
            <TabsTrigger value="micro-investment">Micro-Investment</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="grants">Grants Portal</TabsTrigger>
          </TabsList>
          <TabsContent value="crowdfunding">
            <Card>
              <CardHeader>
                <CardTitle>Support Athlete Campaigns</CardTitle>
                <CardDescription>Browse and contribute to athlete crowdfunding campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-search">Search Campaigns</Label>
                  <Input id="campaign-search" placeholder="Search by athlete name or campaign title" />
                </div>

                {/* Add a list of athlete campaigns here */}
         



              </CardContent>
              <CardFooter>
                <Button
                className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >View All Campaigns</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="micro-investment">
            <Card>
              <CardHeader>
                <CardTitle>Performance-Based Micro-Investment</CardTitle>
                <CardDescription>Invest in promising athletes for a share of their future earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="investment-amount">Investment Amount (₹)</Label>
                  <Input id="investment-amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="athlete-search">Search Athletes</Label>
                  <Input id="athlete-search" placeholder="Search for athletes to invest in" />
                </div>
                {/* Add a list of athletes seeking investment here */}
              </CardContent>
              <CardFooter>
                <Button
                className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >View Investment Opportunities</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="scholarships">
            <Card>
              <CardHeader>
                <CardTitle>Offer Scholarships & Grants</CardTitle>
                <CardDescription>Create scholarship programs or one-time grants for athletes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scholarship-name">Scholarship/Grant Name</Label>
                  <Input id="scholarship-name" placeholder="Enter name of your program" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scholarship-amount">Amount (₹)</Label>
                  <Input id="scholarship-amount" type="number" placeholder="Enter amount" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scholarship-description">Description</Label>
                  <Textarea id="scholarship-description" placeholder="Describe your scholarship or grant program" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                   className ="bg-indigo-600 text-white hover:bg-indigo-800"
                >Create Scholarship/Grant</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>Athlete Marketplace</CardTitle>
                <CardDescription>Hire athletes for workshops, demos, and training sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SAMPLE_COLLABORATIONS.map((collab) => (
                    <Card key={collab.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{collab.type}</h3>
                            <p className="text-sm text-gray-500">{collab.athlete} - {collab.sport}</p>
                            <p className="text-sm mt-1">₹{collab.fee.toLocaleString()} • {collab.duration}</p>
                          </div>
                          <Button 
                           className=" bg-indigo-600 text-white hover:bg-indigo-800" 
                          onClick={() => handleSuccess("Collaboration request sent successfully!")}>Book Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className=" bg-indigo-600 text-white hover:bg-indigo-800" onClick={() => handleSuccess("Your collaboration has been posted!")}>
                  Post New Collaboration Opportunity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>


        </Tabs>
      </main>
    </div>
  )
}
