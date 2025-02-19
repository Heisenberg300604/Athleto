"use client"

import { useParams } from "next/navigation"
import TalentProfile from "@/components/talent/TalentProfile"
import { MOCK_TALENTS } from "@/components/talent/TalentGrid"

const TalentProfilePage = () => {
  const params = useParams()
  const talent = MOCK_TALENTS.find(t => t.id === params.id)

  if (!talent) {
    return <div>Talent not found</div>
  }

  return <TalentProfile talent={talent} />
}

export default TalentProfilePage