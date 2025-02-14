"use client"

import React, { useState } from 'react'
import { Search, Sliders, Heart, MoreHorizontal, MapPin, Building2, Globe, Users, Badge, Clock } from 'lucide-react'
import AthleteNavbar from "@/components/AthleteNavbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useForceLightMode } from '@/hooks/useForcedLightTheme'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Brand {
  id: string
  name: string
  logo: string
  coverImage: string
  industry: string
  location: string
  verified: boolean
  active: boolean
  website: string
  description: string
  sponsorshipTypes: string[]
  totalSponsored: number
  socialLinks: {
    instagram?: string
    linkedin?: string
    facebook?: string
  }
}

const SAMPLE_BRANDS: Brand[] = [
  {
    id: "1",
    name: "SportsTech Pro",
    logo: "Shuz.png",
    coverImage: "Shuz.png",
    industry: "Sports Equipment",
    location: "London, United Kingdom",
    verified: true,
    active: true,
    website: "https://sportstechpro.com",
    description: "Leading provider of high-performance sports equipment",
    sponsorshipTypes: ["Gear", "Training", "Financial"],
    totalSponsored: 156,
    socialLinks: {
      instagram: "sportstechpro",
      linkedin: "sportstechpro",
      facebook: "sportstechpro"
    }
  },
  {
    id: "2",
    name: "Elite Athletics",
    logo: "Shuz.png",
    coverImage: "Shuz.png",
    industry: "Training & Coaching",
    location: "New York, United States",
    verified: true,
    active: true,
    website: "https://eliteathletics.com",
    description: "Premier athletic training and development center",
    sponsorshipTypes: ["Training", "Financial", "Nutrition"],
    totalSponsored: 89,
    socialLinks: {
      instagram: "eliteathletics",
      linkedin: "eliteathletics"
    }
  }
]

export default function AthleteDashboard() {
  useForceLightMode()
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    industry: "",
    verificationStatus: "",
    sponsorshipType: ""
  })

  const filteredBrands = SAMPLE_BRANDS.filter(brand => {
    if (activeTab === "favorites" && !favorites.includes(brand.id)) return false
    
    const searchLower = searchQuery.toLowerCase()
    if (searchQuery && !brand.name.toLowerCase().includes(searchLower) && 
        !brand.industry.toLowerCase().includes(searchLower) &&
        !brand.location.toLowerCase().includes(searchLower)) return false
        
    if (filters.country && !brand.location.toLowerCase().includes(filters.country.toLowerCase())) return false
    if (filters.city && !brand.location.toLowerCase().includes(filters.city.toLowerCase())) return false
    if (filters.industry && brand.industry !== filters.industry) return false
    if (filters.verificationStatus && brand.verified !== (filters.verificationStatus === "Verified")) return false
    
    return true
  })

  const toggleFavorite = (brandId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setFavorites(prev => 
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    )
  }

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AthleteNavbar />

      <div className="flex flex-1  gap-6 mt-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Panel */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Refine Brands</h2>
              <Sliders className="text-gray-400" size={20} />
            </div>

            <div className="space-y-4">
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <select
                    aria-label={key}
                    value={value}
                    onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  >
                    <option value="">All</option>
                    {/* Add relevant options based on filter type */}
                  </select>
                </div>
              ))}

              <div className="flex gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    country: "",
                    city: "",
                    industry: "",
                    verificationStatus: "",
                    sponsorshipType: ""
                  })}
                  className="flex-1"
                >
                  Clear All
                </Button>
                <Button className="flex-1  bg-indigo-600 text-white hover:bg-indigo-800">Apply</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1 mt-5">
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'all' 
              ? 'bg-white shadow-sm text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Talents
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
            activeTab === 'favorites' 
              ? 'bg-white shadow-sm text-indigo-700' 
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorite Talents
        </button>
      </div>
          </div>

          {/* Brand Cards */}
          <div className="grid grid-cols-1 gap-6">
            {filteredBrands.map(brand => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <img src={brand.logo} alt={brand.name} className="w-20 h-20 rounded-lg object-cover" />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">{brand.name}</h3>
                          {brand.verified && (
                            <UIBadge variant="secondary" className="bg-green-100 text-green-800">
                              Verified
                            </UIBadge>
                          )}
                          {brand.active && (
                            <UIBadge variant="secondary" className="bg-blue-100 text-blue-800">
                              Active
                            </UIBadge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 size={16} />
                            <span>{brand.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{brand.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{brand.totalSponsored} sponsored athletes</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => toggleFavorite(brand.id, e)}
                          className={favorites.includes(brand.id) ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart fill={favorites.includes(brand.id) ? "currentColor" : "none"} />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.location.href = `/report/${brand.id}`}>
                              Report brand
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => window.location.href = `/share/${brand.id}`}>
                              Share brand
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => window.location.href = `/block/${brand.id}`}>
                              Block brand
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {brand.sponsorshipTypes.map(type => (
                        <UIBadge key={type} variant="outline">
                          {type}
                        </UIBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Details Modal */}
      <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
  <DialogContent className="max-w-4xl p-0">
    <DialogTitle asChild>
      <VisuallyHidden>{selectedBrand?.name || "Brand Details"}</VisuallyHidden>
    </DialogTitle>
    
    {selectedBrand && (
      <div className="h-[80vh] overflow-y-auto">
        {/* Cover Image */}
        <div className="relative h-48">
          <img
            src={selectedBrand.coverImage}
            alt={`${selectedBrand.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-6 -mt-12 relative">
            <img
              src={selectedBrand.logo}
              alt={selectedBrand.name}
              className="w-24 h-24 rounded-xl border-4 border-white shadow-lg"
            />
            <div className="flex-1 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedBrand.name}</h2>
                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Building2 size={16} />
                      <span>{selectedBrand.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{selectedBrand.location}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedBrand.website, "_blank")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Sections */}
          <div className="space-y-8">
            {/* About */}
            <section>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{selectedBrand.description}</p>
            </section>

            {/* Sponsorship Opportunities */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Sponsorship Opportunities</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedBrand.sponsorshipTypes.map((type) => (
                  <div key={type} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">{type}</h4>
                    <p className="text-sm text-gray-600">
                      Details about {type.toLowerCase()} sponsorship opportunity...
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Contact & Social Media</h3>
              <div className="flex gap-4">
                {Object.entries(selectedBrand.socialLinks).map(([platform, handle]) => (
                  <Button
                    key={platform}
                    variant="outline"
                    onClick={() => window.open(`https://${platform}.com/${handle}`, "_blank")}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
     </div>
   )
 }
 
 // Add type definitions for props
 interface SponsorshipRequirement {
   title: string
   description: string
 }
 
 interface SponsorshipPerk {
   title: string
   description: string
 }
 
 interface FundingOpportunity {
   title: string
   amount: string
   deadline: string
   criteria: string[]
 }
 
 interface PastSponsor {
   name: string
   sport: string
   image: string
   testimonial?: string
 }
 
 // These would typically come from your API/database
 const SAMPLE_REQUIREMENTS: SponsorshipRequirement[] = [
   {
     title: "Age Requirement",
     description: "Athletes must be between 16-35 years old"
   },
   {
     title: "Skill Level",
     description: "Competing at national or international level"
   },
   {
     title: "Club Affiliation",
     description: "Must be affiliated with a recognized sports club"
   }
 ]
 
 const SAMPLE_PERKS: SponsorshipPerk[] = [
   {
     title: "Equipment Support",
     description: "Full gear package including competition and training equipment"
   },
   {
     title: "Professional Coaching",
     description: "Access to certified professional coaches and training programs"
   },
   {
     title: "Competition Support",
     description: "Travel and accommodation support for major competitions"
   }
 ]
 
 const SAMPLE_FUNDING: FundingOpportunity[] = [
   {
     title: "Elite Athlete Grant",
     amount: "$5,000 - $50,000",
     deadline: "December 31, 2024",
     criteria: [
       "Proven track record in national competitions",
       "Clear development plan",
       "Financial need assessment"
     ]
   }
 ]
 
 const SAMPLE_PAST_SPONSORS: PastSponsor[] = [
   {
     name: "John Smith",
     sport: "Swimming",
     image: "/api/placeholder/100/100",
     testimonial: "The support I received was instrumental in achieving my goals."
   },
   {
     name: "Sarah Johnson",
     sport: "Athletics",
     image: "/api/placeholder/100/100",
     testimonial: "An amazing partnership that helped me reach new heights."
   }
 ]
 
 // Export additional components if needed
 export type { Brand, SponsorshipRequirement, SponsorshipPerk, FundingOpportunity, PastSponsor }