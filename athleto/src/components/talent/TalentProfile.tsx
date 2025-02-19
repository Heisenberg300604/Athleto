"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import BrandNavbar from "../BrandNavbar"
import BrandInteractionOptions from "../BrandInteractionOptions"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface TalentProfileProps {
  talent: any // You can create a proper type based on your MOCK_TALENTS structure
}

const TalentProfile: React.FC<TalentProfileProps> = ({ talent }) => {
  const router = useRouter()
  const [showInteractionOptions, setShowInteractionOptions] = useState(false)

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <BrandNavbar />
      <Button
        onClick={handleBack}
        variant="ghost"
        className="mb-6 text-blue-500 hover:text-blue-600 flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Talents
      </Button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <div className="relative h-80 md:h-full">
              <Image
                src={talent.profilePicture || "/placeholder.svg"}
                alt={talent.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{talent.name}</h1>
                <p className="text-gray-600">
                  {talent.sport} | {talent.position}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  talent.verificationStatus === "Verified" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {talent.verificationStatus}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">Performance Stats</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {Object.entries(talent.performanceStats).map(([key, value]) => (
                    <div key={key} className="flex justify-between mb-2 last:mb-0">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <span className="font-medium">{value as React.ReactNode}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Rankings</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>{talent.ranking}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Affiliations</h2>
              <div className="flex flex-wrap gap-2">
                {talent.affiliations.map((affiliation: string, index: number) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {affiliation}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Sponsorship Status</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-4">Current Status: {talent.fundingRequestStatus}</p>
                <h3 className="font-medium mb-2">Sponsorship Needs:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {talent.sponsorshipNeeds.map((need: string, index: number) => (
                    <li key={index}>{need}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              onClick={() => setShowInteractionOptions(true)}
              className="bg-indigo-600 text-white hover:bg-indigo-800 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Interact with Athlete
            </Button>
          </div>
        </div>
      </div>

      {showInteractionOptions && (
        <BrandInteractionOptions talent={talent} onClose={() => setShowInteractionOptions(false)} />
      )}
    </div>
  )
}

export default TalentProfile
