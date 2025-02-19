"use client"

import { useState } from "react"
import AthleteNavbar from "@/components/AthleteNavbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function AthleteFunding() {
  const [activeTab, setActiveTab] = useState("crowdfunding")

  return (
    <div className="min-h-screen bg-gray-100">
      <AthleteNavbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Funding Options</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crowdfunding">Crowdfunding</TabsTrigger>
            <TabsTrigger value="micro-investment">Micro-Investment</TabsTrigger>
            <TabsTrigger value="train-now-pay-later">Train Now, Pay Later</TabsTrigger>
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
                <Button>Create Campaign</Button>
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
                <Button>Submit Proposal</Button>
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
                <Button>Apply for Loan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
