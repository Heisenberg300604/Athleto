"use client"

import type React from "react"
import { useState } from "react"
import { Heart, Search, Sliders, MoreVertical, MapPin, Building2 } from "lucide-react"
import AthleteNavbar from "@/components/AthleteNavbar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const AthleteDashboard: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [showActionModal, setShowActionModal] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const brandDetails = {
    "Yummy Chumz": {
      description:
        "Founder 6 year old daughter was diagnosedan and vegan communities.",
      industry: "Food & Beverage Retail",
      location: "United Kingdom, Online (UK)",
      image: "/photo1.jpeg",
      verified: true,
    },
    "TGI Fridays": {
      description:
        "An iconic restaurant chain that has been serving American-style cuisine since 1965. Our athlete partnership program includes special menu items, dedicated dietary options, and exclusive venue access for sports celebrations.",
      industry: "Restaurants & Catering",
      location: "Ireland, Dublin",
      image: "/download.png",
      verified: true,
    },
    "Shuz Group": {
      description:
        "Leading athletic footwear manufacturer combining cutting-edge technology with supreme comfort. Our innovative approach to sports footwear has made us a preferred choice among professional athletes worldwide.",
      industry: "Consumer Goods & Apparel",
      location: "Ireland, Cork",
      image: "/shuz.png",
      verified: false,
    },
  }

  const [countries, cities, industries] = [
    [
      "All countries",
      "India",
      "United Kingdom",
      "Ireland",
      "United States",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Spain",
      "Italy",
      "Japan",
      "Singapore",
      "UAE",
      "South Africa",
    ],
    [
      "All cities",
      "Mumbai",
      "Delhi",
      "London",
      "Dublin",
      "Cork",
      "New York",
      "Toronto",
      "Sydney",
      "Berlin",
      "Paris",
      "Madrid",
      "Rome",
      "Tokyo",
      "Dubai",
    ],
    [
      "All industries",
      "Food & Beverage Retail",
      "Restaurants & Catering",
      "Consumer Goods & Apparel",
      "Technology",
      "Sports Equipment",
      "Entertainment",
      "Healthcare",
      "Education",
      "Financial Services",
      "Media",
      "Automotive",
      "Travel & Tourism",
      "Fitness & Wellness",
      "Retail",
    ],
  ]

  const brands = Object.entries(brandDetails).map(([name, details]) => ({
    name,
    ...details,
  }))

  const toggleFavorite = (brandName: string, event: React.MouseEvent) => {
    event.stopPropagation() 
    setFavorites((prev) =>
      prev.includes(brandName) ? prev.filter((name) => name !== brandName) : [...prev, brandName],
    )
  }

  const handleMoreClick = (brandName: string, event: React.MouseEvent) => {
    event.stopPropagation() 
    setShowActionModal(brandName)
  }

  // Filter brands based on both active tab and search query
  const filteredBrands = brands
    .filter((brand) => activeTab === "all" || favorites.includes(brand.name))
    .filter((brand) => 
      searchQuery === "" || 
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const selectedBrandDetails = selectedBrand ? brandDetails[selectedBrand as keyof typeof brandDetails] : null

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AthleteNavbar />

      <div className="flex flex-1 p-6 gap-6">
        {/* Filters */}
        <div className="w-80">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <Sliders className="text-blue-600" size={24} />
            </div>

            <div className="space-y-6">
              {["Country", "City", "Industry"].map((filter, index) => (
                <div key={filter} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{filter}</span>
                    <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors">Clear</button>
                  </div>
                  <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out">
                    {(index === 0 ? countries : index === 1 ? cities : industries).map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="flex gap-3 mt-8">
                <button className="flex-1 py-3 px-4 border border-indigo-200 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out font-medium">
                  Clear All
                </button>
                <button className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-800 transition-all duration-200 ease-in-out font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Tabs */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search brands"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
              />
            </div>
            <div className="flex gap-6 mt-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-3 font-semibold transition-colors ${
                  activeTab === "all" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                All Brands
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-4 py-3 font-semibold transition-colors ${
                  activeTab === "favorites"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Favorites
              </button>
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-6 max-w-4xl">
            {filteredBrands.map((brand) => (
              <div
                key={brand.name}
                onClick={() => setSelectedBrand(brand.name)}
                className="bg-white border border-indigo-600 shadow-sm hover:shadow-md transition-shadow rounded-lg p-6 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img src={brand.image || "/placeholder.svg"} alt={brand.name} className="w-16 h-16 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-black">{brand.name}</h3>
                        {brand.verified && (
                          <Badge className="bg-green-100 text-green-900">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 mt-2">
                        <Building2 size={16} />
                        <p>{brand.industry}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <p>{brand.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleFavorite(brand.name, e)}
                      className={`transition-colors ${
                        favorites.includes(brand.name) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                      }`}
                    >
                      <Heart size={24} fill={favorites.includes(brand.name) ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={(e) => handleMoreClick(brand.name, e)}
                      className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50"
                    >
                      <MoreVertical size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      {/* Brand Details Modal */}
      <Dialog open={!!selectedBrand} onOpenChange={() => setSelectedBrand(null)}>
        <DialogContent className="max-w-3xl bg-white p-0 gap-0">
          <div className="flex h-[600px]">
            {/* Left side - Brand Info */}
            <div className="w-1/3 border-r border-gray-200 p-6">
              <div className="flex flex-col items-center">
                {selectedBrandDetails && (
                  <>
                    <img
                      src={selectedBrandDetails.image || "/placeholder.svg"}
                      alt={selectedBrand || ""}
                      className="w-48 h-48 rounded-full mb-8"
                    />
                    <div className="w-full space-y-2">
                      <button className="w-full text-center py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
                        Brand Info
                      </button>
                      <button className="w-full text-center py-2 text-gray-700 font-medium hover:bg-blue-50 rounded-md transition-colors">
                        Opportunities
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right side - Brand Details */}
            <div className="w-2/3 p-6 overflow-y-auto">
              <DialogHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DialogTitle className="text-2xl font-bold text-black">{selectedBrand}</DialogTitle>
                    {selectedBrandDetails?.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    onClick={(e) => toggleFavorite(selectedBrand || "", e)}
                    className={favorites.includes(selectedBrand || "") ? "text-red-500" : "text-gray-400"}
                  >
                    <Heart fill={favorites.includes(selectedBrand || "") ? "currentColor" : "none"} />
                  </Button>
                </div>
                {selectedBrandDetails && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      <span>{selectedBrandDetails.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>{selectedBrandDetails.location}</span>
                    </div>
                  </div>
                )}
              </DialogHeader>
              <Separator className="my-6" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">About</h3>
                <p className="text-gray-700 leading-relaxed w-auto">{selectedBrandDetails?.description}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Actions Modal */}
      <Dialog open={!!showActionModal} onOpenChange={() => setShowActionModal(null)}>
        <DialogContent className="sm:max-w-[200px] sm:max-h-[250px] bg-gray-50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-black">Brand Actions</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => setShowActionModal(null)}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Report brand
            </button>
            <button
              onClick={() => setShowActionModal(null)}
              className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Share brand
            </button>
            <button
              onClick={() => setShowActionModal(null)}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Block brand
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AthleteDashboard

