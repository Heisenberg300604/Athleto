"use client"

import { useParams } from "next/navigation"
import TalentProfile from "@/components/talent/TalentProfile"

const TalentProfilePage = () => {
  const params = useParams()
  
  // Pass the params to TalentProfile component which handles the data fetching
  return <TalentProfile params={{ id: params.id as string }} />
}

export default TalentProfilePage