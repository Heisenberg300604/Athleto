"use client"
import { useState } from "react"
import { Heart, MapPin, Building2, Plus, Share2, ThumbsUp, Upload, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import AthleteNavbar from "./AthleteNavbar"
import React from "react"

const ANewsFeed = ({ brandDetails }: { brandDetails: any }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const [posts, setPosts] = useState([
    {
      id: 1,
      brand: "WHOOP",
      title: "January Jumpstart Campaign",
      price: "€165",
      location: "Ireland, Dublin",
      date: "26.12.24 - 01.02.25",
      type: "One-off product / company endorsement",
      description:
        "WHOOP, the human performance company, is looking to work with up to 20 athletes / creators based in Ireland for their upcoming January Jumpstart campaign.",
      image: "/api/placeholder/800/400",
      brandlogo: "/api/placeholder/40/40"
    },
    {
      id: 2,
      brand: "Sleek N Easy",
      title: "BA Sleek N Easy",
      price: "€85",
      location: "Ireland, Online (Ireland)",
      date: "05.02.25 - 27.02.25",
      type: "Strategic brand ambassador",
      description:
        "Are you an athlete passionate about top-quality products? We're launching our Brand Ambassador program and looking for athletes worldwide to join us!",
      image: "/api/placeholder/800/400",
      brandlogo: "/api/placeholder/40/40"
    },
  ])

  const [newPost, setNewPost] = useState({
    brand: "",
    title: "",
    price: "",
    location: "",
    description: "",
    image: "/api/placeholder/800/400",
    type: "",
    brandlogo: "/api/placeholder/40/40",
  })

  const brands = Object.entries(brandDetails || {}).map(([name, details]: [string, any]) => ({
    name,
    ...details,
    image: details.image || "/api/placeholder/40/40",
  }))

  const handleCreatePost = () => {
    setPosts([
      {
        id: posts.length + 1,
        ...newPost,
        date: new Date().toLocaleDateString(),
        type: "New Opportunity",
      },
      ...posts,
    ])
    setIsNewPostOpen(false)
    setNewPost({
      brand: "",
      title: "",
      price: "",
      location: "",
      description: "",
      image: "/api/placeholder/800/400",
      type: "",
      brandlogo: "/api/placeholder/40/40",
    })
  }

  const toggleFavorite = (postId: number) => {
    setFavorites((prev) =>
      prev.includes(postId.toString()) ? prev.filter((id) => id !== postId.toString()) : [...prev, postId.toString()],
    )
  }

  const handleLike = (postId: number) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (likedPosts.includes(postId) ? -1 : 1),
    }))
    setLikedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
  }

  const filteredPosts =
    activeTab === "favorites" ? posts.filter((post) => favorites.includes(post.id.toString())) : posts

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
      <AthleteNavbar />
      <div className="flex flex-1 gap-8 p-8">
        {/*tabs*/}
        <div className="flex-1 space-y-6">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex gap-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 transition-colors font-medium ${
                    activeTab === "all"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  ALL NEWS
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`px-4 py-2 transition-colors font-medium ${
                    activeTab === "favorites"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  NEWS FROM FAVOURITES
                </button>
              </div>
              
            </div>
            
          </div>

          {/*Post Cards*/}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-white shadow-md hover:shadow-lg transition-shadow w-full mx-auto border-none">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.brand}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className=" text-black text-xl font-bold">{post.brand}</h3>
                        <p className="text-sm text-muted-foreground">Posted {post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 font-medium">
                        {post.price}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(post.id)}
                        className={`${likedPosts.includes(post.id) ? "text-indigo-600" : "text-gray-400"}`}
                      >
                        <ThumbsUp className="h-5 w-5" />
                        <span className="ml-1 text-sm">{likes[post.id] || 0}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(post.id)}
                        className={`${favorites.includes(post.id.toString()) ? "text-red-500" : "text-gray-400"}`}
                      >
                        <Heart
                          className="h-5 w-5"
                          fill={favorites.includes(post.id.toString()) ? "currentColor" : "none"}
                        />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400">
                        <Share2 className="h-1 w-15" />
                      </Button>
                    </div>
                  </div>

                  <h2 className="text-md font-semibold mb-4 text-gray-900">{post.title}</h2>

                  <div className="flex items-center gap-6 mb-4 text-gray-600">
                    <div className="flex items-center gap-2 font-medium">
                      <Building2 className="h-5 w-5" />
                      <span className="text-md text-muted-foreground">{post.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span className="text-sm">{post.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-900 text-sm leading-relaxed">{post.description}</p>

                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
                {/*New Brands Card*/}
        <div className="w-80">
          <Card className="bg-white shadow-sm sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">NEW BRANDS</h2>
              <div className="space-y-6">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={brand.image || "/placeholder.svg"}
                      alt={brand.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{brand.name}</h3>
                      {brand.verified && (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                          Verified
                        </Badge>
                      )}
                      <p className="text-sm text-gray-500">{brand.industry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        
      </div>
    </div>
  )
}

export default ANewsFeed