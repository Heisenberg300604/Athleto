"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SponsorTrainingProps {
  talent: any
}

const SponsorTraining: React.FC<SponsorTrainingProps> = ({ talent }) => {
  const [trainingCenter, setTrainingCenter] = useState("")
  const [duration, setDuration] = useState("")
  const [amount, setAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the training sponsorship submission here
    console.log("Training sponsorship submitted:", { trainingCenter, duration, amount })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="training-center">Training Center</Label>
        <Select value={trainingCenter} onValueChange={setTrainingCenter}>
          <SelectTrigger id="training-center">
            <SelectValue placeholder="Select a training center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="center1">Elite Sports Academy</SelectItem>
            <SelectItem value="center2">Pro Athlete Training Center</SelectItem>
            <SelectItem value="center3">Olympic Training Facility</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="duration">Duration (in months)</Label>
        <Input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter training duration"
        />
      </div>
      <div>
        <Label htmlFor="amount">Sponsorship Amount</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter sponsorship amount"
        />
      </div>
      <Button type="submit">Submit Training Sponsorship</Button>
    </form>
  )
}

export default SponsorTraining
