"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface FollowAthleteProps {
  talent: any
}

const FollowAthlete: React.FC<FollowAthleteProps> = ({ talent }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [notifications, setNotifications] = useState({
    achievements: false,
    sponsorshipNeeds: false,
    upcomingTournaments: false,
  })

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // Here you would typically update the follow status in the backend
  }

  const handleNotificationChange = (notificationType: keyof typeof notifications) => {
    setNotifications({ ...notifications, [notificationType]: !notifications[notificationType] })
    // Here you would typically update the notification preferences in the backend
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleFollow}>{isFollowing ? "Unfollow Athlete" : "Follow Athlete"}</Button>
      {isFollowing && (
        <div className="space-y-2">
          <Label>Notification Preferences</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="achievements"
              checked={notifications.achievements}
              onCheckedChange={() => handleNotificationChange("achievements")}
            />
            <Label htmlFor="achievements">New Achievements</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="sponsorshipNeeds"
              checked={notifications.sponsorshipNeeds}
              onCheckedChange={() => handleNotificationChange("sponsorshipNeeds")}
            />
            <Label htmlFor="sponsorshipNeeds">Sponsorship Needs</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="upcomingTournaments"
              checked={notifications.upcomingTournaments}
              onCheckedChange={() => handleNotificationChange("upcomingTournaments")}
            />
            <Label htmlFor="upcomingTournaments">Upcoming Tournaments</Label>
          </div>
        </div>
      )}
    </div>
  )
}

export default FollowAthlete
