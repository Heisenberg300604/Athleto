"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FundAthleteProps {
  talent: any
}

const FundAthlete: React.FC<FundAthleteProps> = ({ talent }) => {
  const [fundingType, setFundingType] = useState("one-time")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the funding submission here
    console.log("Funding submitted:", { fundingType, amount })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Funding Type</Label>
        <RadioGroup value={fundingType} onValueChange={setFundingType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time" />
            <Label htmlFor="one-time">One-Time Sponsorship</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly">Monthly Stipend</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="training" id="training" />
            <Label htmlFor="training">Training & Facilities Support</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="equipment" id="equipment" />
            <Label htmlFor="equipment">Equipment Sponsorship</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="tournament" id="tournament" />
            <Label htmlFor="tournament">Tournament Sponsorship</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter funding amount"
        />
      </div>
      <Button type="submit">Submit Funding Request</Button>
    </form>
  )
}

export default FundAthlete
