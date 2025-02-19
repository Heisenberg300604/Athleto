"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ShortlistAthleteProps {
  talent: any
}

const ShortlistAthlete: React.FC<ShortlistAthleteProps> = ({ talent }) => {
  const [isShortlisted, setIsShortlisted] = useState(false)
  const [reminderDate, setReminderDate] = useState("")
  const [notes, setNotes] = useState("")

  const handleShortlist = () => {
    setIsShortlisted(!isShortlisted)
    // Here you would typically update the shortlist status in the backend
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the shortlist submission here
    console.log("Shortlist submitted:", { isShortlisted, reminderDate, notes })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button onClick={handleShortlist} type="button">
        {isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
      </Button>
      {isShortlisted && (
        <>
          <div>
            <Label htmlFor="reminder-date">Reminder Date</Label>
            <Input
              type="date"
              id="reminder-date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Input
              type="text"
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes for future reference"
            />
          </div>
          <Button type="submit">Save Shortlist Details</Button>
        </>
      )}
    </form>
  )
}

export default ShortlistAthlete

