"use client"

import { useState } from "react"
import BrandNavbar from "@/components/BrandNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function BrandFunding() {
  const [activeTab, setActiveTab] = useState("crowdfunding")

  return (
    <div className="min-h-screen bg-gray-100">
      <BrandNavbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Funding Opportunities</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
            <TabsTrigger value="micro-investment">Micro-Investment</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships & Grants</TabsTrigger>
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
                {/* Add a list of campaigns here */}
              </CardContent>
              <CardFooter>
                <Button>View All Campaigns</Button>
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
                <Button>View Investment Opportunities</Button>
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
                <Button>Create Scholarship/Grant</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
