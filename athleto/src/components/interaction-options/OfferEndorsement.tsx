"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface OfferEndorsementProps {
  talent: any
}

const OfferEndorsement: React.FC<OfferEndorsementProps> = ({ talent }) => {
  const [endorsementType, setEndorsementType] = useState("social-media")
  const [details, setDetails] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the endorsement offer submission here
    console.log("Endorsement offer submitted:", { endorsementType, details })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Endorsement Type</Label>
        <RadioGroup value={endorsementType} onValueChange={setEndorsementType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="social-media" id="social-media" />
            <Label htmlFor="social-media">Social Media Promotions</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="brand-ambassador" id="brand-ambassador" />
            <Label htmlFor="brand-ambassador">Brand Ambassador Role</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ad-campaign" id="ad-campaign" />
            <Label htmlFor="ad-campaign">Ad Campaign</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="details">Endorsement Details</Label>
        <Textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter endorsement details, requirements, and compensation"
        />
      </div>
      <Button type="submit">Submit Endorsement Offer</Button>
    </form>
  )
}

export default OfferEndorsement
