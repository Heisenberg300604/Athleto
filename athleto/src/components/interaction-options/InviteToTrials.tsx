"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface InviteToTrialsProps {
  talent: any
}

const InviteToTrials: React.FC<InviteToTrialsProps> = ({ talent }) => {
  const [trialDate, setTrialDate] = useState("")
  const [location, setLocation] = useState("")
  const [requirements, setRequirements] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the trial invitation submission here
    console.log("Trial invitation submitted:", { trialDate, location, requirements })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="trial-date">Trial Date</Label>
        <Input type="date" id="trial-date" value={trialDate} onChange={(e) => setTrialDate(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter trial location"
        />
      </div>
      <div>
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Enter trial requirements, documents needed, etc."
        />
      </div>
      <Button type="submit">Send Trial Invitation</Button>
    </form>
  )
}

export default InviteToTrials