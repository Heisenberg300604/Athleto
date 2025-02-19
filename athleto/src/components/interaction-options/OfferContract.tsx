"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface OfferContractProps {
  talent: any
}

const OfferContract: React.FC<OfferContractProps> = ({ talent }) => {
  const [duration, setDuration] = useState("")
  const [compensation, setCompensation] = useState("")
  const [terms, setTerms] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the contract offer submission here
    console.log("Contract offer submitted:", { duration, compensation, terms })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="duration">Contract Duration (in months)</Label>
        <Input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter contract duration"
        />
      </div>
      <div>
        <Label htmlFor="compensation">Compensation</Label>
        <Input
          type="text"
          id="compensation"
          value={compensation}
          onChange={(e) => setCompensation(e.target.value)}
          placeholder="Enter compensation details"
        />
      </div>
      <div>
        <Label htmlFor="terms">Contract Terms</Label>
        <Textarea
          id="terms"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Enter contract terms, performance clauses, and additional benefits"
        />
      </div>
      <Button type="submit">Submit Contract Offer</Button>
    </form>
  )
}

export default OfferContract

