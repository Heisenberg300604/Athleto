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
      <DialogContent className="max-w-6xl p-6 overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl">Interact with {talent.name}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="flex w-full space-x-1 mb-4">
              <TabsTrigger value="fund" className="flex-shrink-0 px-3 py-1.5 text-sm">Fund Athlete</TabsTrigger>
              <TabsTrigger value="endorse" className="flex-shrink-0 px-3 py-1.5 text-sm">Offer Endorsement</TabsTrigger>
              <TabsTrigger value="train" className="flex-shrink-0 px-3 py-1.5 text-sm">Sponsor Training</TabsTrigger>
              <TabsTrigger value="equipment" className="flex-shrink-0 px-3 py-1.5 text-sm">Provide Equipment</TabsTrigger>
              <TabsTrigger value="trials" className="flex-shrink-0 px-3 py-1.5 text-sm">Invite to Trials</TabsTrigger>
              <TabsTrigger value="contract" className="flex-shrink-0 px-3 py-1.5 text-sm">Offer Contract</TabsTrigger>
              <TabsTrigger value="chat" className="flex-shrink-0 px-3 py-1.5 text-sm">Chat</TabsTrigger>
              <TabsTrigger value="follow" className="flex-shrink-0 px-3 py-1.5 text-sm">Follow</TabsTrigger>
              <TabsTrigger value="shortlist" className="flex-shrink-0 px-3 py-1.5 text-sm">Shortlist</TabsTrigger>
            </TabsList>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            <TabsContent value="fund" className="mt-0">
              <FundAthlete talent={talent} />
            </TabsContent>
            <TabsContent value="endorse" className="mt-0">
              <OfferEndorsement talent={talent} />
            </TabsContent>
            <TabsContent value="train" className="mt-0">
              <SponsorTraining talent={talent} />
            </TabsContent>
            <TabsContent value="equipment" className="mt-0">
              <ProvideEquipment talent={talent} />
            </TabsContent>
            <TabsContent value="trials" className="mt-0">
              <InviteToTrials talent={talent} />
            </TabsContent>
            <TabsContent value="contract" className="mt-0">
              <OfferContract talent={talent} />
            </TabsContent>
            <TabsContent value="chat" className="mt-0">
              <ChatWithAthlete talent={talent} />
            </TabsContent>
            <TabsContent value="follow" className="mt-0">
              <FollowAthlete talent={talent} />
            </TabsContent>
            <TabsContent value="shortlist" className="mt-0">
              <ShortlistAthlete talent={talent} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default BrandInteractionOptions