"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import BrandNavbar from "../BrandNavbar"
import BrandInteractionOptions from "../BrandInteractionOptions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, MapPin, Trophy, Users, Calendar, Video, Mail, Phone, ExternalLink } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Spinner from "../spinner"

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  about: string;
  video_link: string;
  verified: boolean;
  skills: string[];
  location: string;
  gender: string;
  date_of_birth: string;
  status: string;
  social_links: { [key: string]: string };
  talent_level: string;
  affiliations: string[];
  achievements: string[];
  sponsorship_status: string;
  funding_request_status: string;
  sponsorship_needs: string[];
  created_at: string;
  updated_at: string;
  phone: string;
  bank_account_name: string;
  iban: string;
  currency: string;
  profile_picture: string;
  
  // Computed fields for display
  name?: string;
  sport?: string;
  position?: string;
  verificationStatus?: string;
  performanceStats?: { [key: string]: any };
  ranking?: string;
}

interface TalentProfileProps {
  params: { id: string }
}

const TalentProfile: React.FC<TalentProfileProps> = ({ params }) => {
  const router = useRouter()
  const [showInteractionOptions, setShowInteractionOptions] = useState(false)
  const [athlete, setAthlete] = useState<Athlete | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchAthlete = async () => {
      try {
        const { data, error } = await supabase
          .from('athletes')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          // Process data and add computed fields for display
          const processedAthlete: Athlete = {
            ...data,
            name: `${data.first_name || ''} ${data.last_name || ''}`,
            verificationStatus: data.verified ? "Verified" : "Unverified",
            // Assuming skills[0] is position and skills[1] is sport
            position: data.skills?.length > 0 ? data.skills[0] : "Player",
            sport: data.skills?.length > 1 ? data.skills[1] : "Football",
            // Mock performance stats based on available data
            performanceStats: {
              gamesPlayed: Math.floor(Math.random() * 100) + 20,
              goalsScored: Math.floor(Math.random() * 50),
              assists: Math.floor(Math.random() * 30),
              minutesPlayed: Math.floor(Math.random() * 5000) + 1000
            },
            // Mock ranking with safe location access
            ranking: `${Math.floor(Math.random() * 20) + 1}th in ${data.location && data.location.includes(',') ? data.location.split(',')[1].trim() : 'Region'}`
          };
          
          setAthlete(processedAthlete);
        }
      } catch (error) {
        console.error('Error fetching athlete:', error);
        setError('Failed to load athlete profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (params.id) {
      fetchAthlete();
    }
  }, [params.id, supabase]);

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BrandNavbar />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12 text-red-500">
            <p className="text-xl font-medium mb-4">Error</p>
            <p>{error || 'Athlete not found'}</p>
            <Button
              onClick={handleBack}
              variant="outline"
              className="mt-6"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BrandNavbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 text-blue-600 hover:text-blue-800 hover:bg-blue-50 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Talents
        </Button>

        {/* Profile Header */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 lg:w-1/4 relative">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <img
                  src={athlete.profile_picture || "/placeholder.svg"}
                  alt={athlete.name || "Athlete"}
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{athlete.name}</h1>
                  <div className="flex items-center gap-3 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {athlete.sport}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                    <span>{athlete.position}</span>
                    {athlete.location && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {athlete.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <Badge 
                  className={`px-3 py-1 text-sm ${
                    athlete.verificationStatus === "Verified" 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }`}
                >
                  {athlete.verificationStatus}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-600 font-medium">Games</p>
                  <p className="text-2xl font-bold text-blue-700">{athlete.performanceStats?.gamesPlayed || 0}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-600 font-medium">Goals</p>
                  <p className="text-2xl font-bold text-green-700">{athlete.performanceStats?.goalsScored || 0}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-purple-600 font-medium">Assists</p>
                  <p className="text-2xl font-bold text-purple-700">{athlete.performanceStats?.assists || 0}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-amber-600 font-medium">Ranking</p>
                  <p className="text-xl font-bold text-amber-700">{athlete.ranking?.split(' ')[0] || "N/A"}</p>
                </div>
              </div>

              <Button
                onClick={() => setShowInteractionOptions(true)}
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2.5 rounded-lg transition-colors font-medium"
              >
                Interact with Athlete
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{athlete.about || "No information available"}</p>
              </CardContent>
            </Card>

            {/* Performance Stats Section */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {athlete.performanceStats && Object.entries(athlete.performanceStats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section */}
            {athlete.achievements && athlete.achievements.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {athlete.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 min-w-4 min-h-4 rounded-full bg-green-500"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Sponsorship Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Sponsorship Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Current Status:</p>
                    <p className="font-medium">{athlete.funding_request_status || "Not currently seeking"}</p>
                  </div>
                  
                  {athlete.sponsorship_needs && athlete.sponsorship_needs.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2 text-gray-700">Sponsorship Needs:</h3>
                      <ul className="space-y-1">
                        {athlete.sponsorship_needs.map((need, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            {need}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Affiliations */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Affiliations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {athlete.affiliations && athlete.affiliations.length > 0 ? (
                    athlete.affiliations.map((affiliation, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                        {affiliation}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No affiliations listed</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rankings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-amber-50 rounded-lg flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <p className="font-medium text-amber-800">{athlete.ranking}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {athlete.email && (
                    <li className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <a href={`mailto:${athlete.email}`} className="text-blue-600 hover:underline">{athlete.email}</a>
                    </li>
                  )}
                  {athlete.phone && (
                    <li className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <a href={`tel:${athlete.phone}`} className="text-blue-600 hover:underline">{athlete.phone}</a>
                    </li>
                  )}
                  {athlete.video_link && (
                    <li className="flex items-center gap-3">
                      <Video className="h-5 w-5 text-gray-400" />
                      <a href={athlete.video_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        Watch Video <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showInteractionOptions && (
        <BrandInteractionOptions talent={athlete} onClose={() => setShowInteractionOptions(false)} />
      )}
    </div>
  )
}

export default TalentProfile