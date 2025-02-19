"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FundAthlete from "./interaction-options/FundAthlete"
import OfferEndorsement from "./interaction-options/OfferEndorsement"
import SponsorTraining from "./interaction-options/SponsorTraining"
import ProvideEquipment from "./interaction-options/ProvideEquipment"
import InviteToTrials from "./interaction-options/InviteToTrials"
import OfferContract from "./interaction-options/OfferContract"
import ChatWithAthlete from "./interaction-options/ChatWithAthlete"
import FollowAthlete from "./interaction-options/FollowAthlete"
import ShortlistAthlete from "./interaction-options/ShortlistAthlete"

interface BrandInteractionOptionsProps {
  talent: any
  onClose: () => void
}

const BrandInteractionOptions: React.FC<BrandInteractionOptionsProps> = ({ talent, onClose }) => {
  const [activeTab, setActiveTab] = useState("fund")

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl space-y-4 ">
        <DialogHeader>
          <DialogTitle>Interact with {talent.name}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 gap-4">
            <TabsTrigger value="fund">Fund Athlete</TabsTrigger>
            <TabsTrigger value="endorse">Offer Endorsement</TabsTrigger>
            <TabsTrigger value="train">Sponsor Training</TabsTrigger>
            <TabsTrigger value="equipment">Provide Equipment</TabsTrigger>
            <TabsTrigger value="trials">Invite to Trials</TabsTrigger>
            <TabsTrigger value="contract">Offer Contract</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="follow">Follow</TabsTrigger>
            <TabsTrigger value="shortlist">Shortlist</TabsTrigger>
          </TabsList>
          <TabsContent value="fund">
            <FundAthlete talent={talent} />
          </TabsContent>
          <TabsContent value="endorse">
            <OfferEndorsement talent={talent} />
          </TabsContent>
          <TabsContent value="train">
            <SponsorTraining talent={talent} />
          </TabsContent>
          <TabsContent value="equipment">
            <ProvideEquipment talent={talent} />
          </TabsContent>
          <TabsContent value="trials">
            <InviteToTrials talent={talent} />
          </TabsContent>
          <TabsContent value="contract">
            <OfferContract talent={talent} />
          </TabsContent>
          <TabsContent value="chat">
            <ChatWithAthlete talent={talent} />
          </TabsContent>
          <TabsContent value="follow">
            <FollowAthlete talent={talent} />
          </TabsContent>
          <TabsContent value="shortlist">
            <ShortlistAthlete talent={talent} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default BrandInteractionOptions
