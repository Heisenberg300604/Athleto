"use client"
import { useState } from "react"
import { Heart, MapPin, Building2, Plus, Share2, ThumbsUp, Upload, X, ChevronLeft, ChevronRight, UserPlus } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import BrandNavbar from "./BrandNavbar"
import Chatbot from "./Chatbot"

const NewsFeed = ({ brandDetails }: { brandDetails: any }) => {
  const [activeTab, setActiveTab] = useState("all")
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [likes, setLikes] = useState<{ [key: number]: number }>({})
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [following, setFollowing] = useState<string[]>([])

  const [posts, setPosts] = useState([
    {
      id: 1,
      brand: "Puma India",
      title: "Puma Unveils High-Tech Goalkeeper Gloves with Gurpreet Singh Sandhu",
      price: "₹7,500",
      location: "India, Bengaluru",
      date: "10.03.2025",
      type: "Product Endorsement",
      description:
        "Puma India has launched advanced goalkeeper gloves in collaboration with Indian national team star Gurpreet Singh Sandhu. These gloves feature superior grip, shock absorption, and breathable fabric for maximum performance under pressure.",
      images: ["/n3.jpg?height=400&width=400", "/n4.png?height=400&width=600"],
      brandlogo: "/puma.png?height=40&width=40",
    },
    {
      id: 2,
      brand: "Adidas India",
      title: "Adidas Sponsors Indian Football Team",
      price: "Undisclosed",
      location: "India, Delhi",
      date: "20.07.2023",
      type: "Team Sponsorship",
      description:
        "Adidas India has announced a multi-year sponsorship deal with the Indian National Football Team. This partnership aims to boost the development of football in India.",
      image: "/n5.png?height=400&width=600",
      brandlogo: "/adidas.png?height=40&width=40",
    },
    {
      id: 3,
      brand: "PUMA India",
      title: "PUMA Signs Sunil Chhetri as Brand Ambassador",
      price: "₹5 Crore/Year",
      location: "India, Bangalore",
      date: "25.07.2023",
      type: "Brand Ambassador",
      description:
        "PUMA India has signed Indian football captain Sunil Chhetri as their new brand ambassador. Chhetri will be the face of PUMA's football category in India.",
      image: "/n6.png?height=400&width=600",
      brandlogo: "/puma.png?height=40&width=40",
    },
    {
      id: 4,
      brand: "Under Armour India",
      title: "Under Armour Unveils High-Performance Football Kits with Jeakson Singh",
      price: "₹5,000",
      location: "India, Imphal",
      date: "30.07.2023",
      type: "Product Endorsement",
      description:
        "Under Armour India teams up with midfield powerhouse Jeakson Singh to introduce a new line of breathable, moisture-wicking football kits. These kits promise enhanced performance and comfort for both training and match days.",
      images: ["/n10.png?height=400&width=600", "/n9.png?height=400&width=600"],
      brandlogo: "/ua.png?height=40&width=40",
    },
    {
      id: 5,
      brand: "Hero Motocorp",
      title: "Hero Motocorp Announces Football Academy Sponsorship",
      price: "₹10 Crore",
      location: "India, Gurgaon",
      date: "05.08.2023",
      type: "Academy Sponsorship",
      description:
        "Hero Motocorp has announced a significant sponsorship deal with a leading football academy in India. This move aims to nurture young football talent in the country.",
      image: "/n7.png?height=400&width=600",
      brandlogo: "/hero1.avif?height=40&width=40",
    },
  ])

  //  athletes data
  const athletes = [
    {
      id: "athlete1",
      name: "Sunil Chhetri",
      age: 39,
      sport: "Football",
      image: "/sunil1.png?height=400&width=400",
      verified: true
    },
    {
      id: "athlete2",
      name: "Gurpreet Singh Sandhu",
      age: 32,
      sport: "Football",
      image: "/gurpreet.jpeg?height=400&width=400",
      verified: true
    },
    {
      id: "athlete3",
      name: "Jeakson Singh",
      age: 23,
      sport: "Football",
      image: "/jeakson.png?height=400&width=400",
      verified: false
    },
    {
      id: "athlete4",
      name: "Sandesh Jhingan",
      age: 31,
      sport: "Football",
      image: "/sandesh.jpg?height=400&width=400",
      verified: true
    },
    {
      id: "athlete5",
      name: "Anirudh Thapa",
      age: 26,
      sport: "Football",
      image: "/anirudh.png?height=400&width=400",
      verified: false
    }
  ]

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

  const toggleFollow = (athleteId: string) => {
    setFollowing((prev) =>
      prev.includes(athleteId) ? prev.filter((id) => id !== athleteId) : [...prev, athleteId]
    )
  }

  const filteredPosts =
    activeTab === "favorites" ? posts.filter((post) => favorites.includes(post.id.toString())) : posts

  const ImageCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }

    return (
      <div className="relative">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-64 rounded-lg object-cover mt-4"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FB]">
      <BrandNavbar />
      <div className="flex flex-1 gap-8 p-8 h-[calc(100vh-64px)] overflow-hidden">
        {/*tabs and news feed section*/}
        <div className="flex-1 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
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
            <Button
              onClick={() => setIsNewPostOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 h-10"
            >
              <Plus className="h-5 w-5" />
              NEW POST
            </Button>
          </div>

          {/*Scrollable Post Cards*/}
          <div className="overflow-y-auto flex-1 pr-4 space-y-6">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow w-full mx-auto border-none"
              >
                <CardContent className="p-6 ">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={post.brandlogo || "/placeholder.svg"}
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

                  {post.images ? (
                    <ImageCarousel images={post.images} />
                  ) : post.image ? (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                    />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/*New Athletes Card*/}
        <div className="w-80">
          <Card className="bg-white shadow-sm sticky top-8 max-h-[calc(100vh-96px)] overflow-y-auto">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">TALENTS</h2>
              <div className="space-y-8">
                {athletes.map((athlete) => (
                  <div key={athlete.id} className="flex flex-col">
                    <div className="flex items-center gap-4 mb-2">
                      <img
                        src={athlete.image || "/placeholder.svg"}
                        alt={athlete.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{athlete.name}</h3>
                          {athlete.verified && (
                            <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{athlete.sport} • {athlete.age} years</p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => toggleFollow(athlete.id)}
                      className={`mt-2 w-full flex items-center justify-center gap-2 text-sm h-9 ${
                        following.includes(athlete.id) 
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300" 
                          : "bg-indigo-500 hover:bg-indigo-800 text-white"
                      }`}
                    >
                      {following.includes(athlete.id) ? (
                        "Following"
                      ) : (
                        <>
                          <UserPlus className="h-2 w-2" />
                          Follow
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
              
             
                
            </CardContent>
          </Card>
        </div>

        {/*Dialog for creating new post*/}
        <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
          <DialogContent className="max-w-[800px] h-[90vh] overflow-y-auto bg-white p-0">
            <div className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-900">Create New Post</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsNewPostOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-6 py-6 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title"
                      className="border-gray-200 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Brand Name</label>
                    <Input
                      value={newPost.brand}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, brand: e.target.value }))}
                      placeholder="Enter brand name"
                      className="border-gray-200 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <Input
                      value={newPost.type}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, type: e.target.value }))}
                      placeholder="Enter post type"
                      className="border-gray-200 h-11"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price</label>
                    <Input
                      value={newPost.price}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="Enter price"
                      className="border-gray-200 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Input
                      value={newPost.location}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                      className="border-gray-200 h-11"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter post description"
                  rows={4}
                  className="border-gray-200 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand Logo</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="relative flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-150 group">
                      {newPost.brandlogo === "/api/placeholder/40/40" ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white transition-colors duration-150">
                            <Upload className="w-8 h-8 text-gray-500" />
                          </div>
                          <p className="mt-4 text-sm text-gray-500">Click to upload brand logo</p>
                          <p className="mt-1 text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={newPost.brandlogo || "/placeholder.svg"}
                            alt="Brand logo preview"
                            className="absolute inset-0 w-full h-full object-contain p-4"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                            <p className="text-white text-sm">Change logo</p>
                          </div>
                        </div>
                      )}
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setNewPost((prev) => ({ ...prev, brandlogo: URL.createObjectURL(e.target.files![0]) }))
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Post Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="relative flex flex-col items-center justify-center w-full h-[200px] border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-150 group">
                      {newPost.image === "/api/placeholder/800/400" ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <div className="p-4 rounded-full bg-gray-100 group-hover:bg-white transition-colors duration-150">
                            <Upload className="w-8 h-8 text-gray-500" />
                          </div>
                          <p className="mt-4 text-sm text-gray-500">Click to upload post image</p>
                          <p className="mt-1 text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <img
                            src={newPost.image || "/placeholder.svg"}
                            alt="Post image preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg">
                            <p className="text-white text-sm">Change image</p>
                          </div>
                        </div>
                      )}
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setNewPost((prev) => ({ ...prev, image: URL.createObjectURL(e.target.files![0]) }))
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 z-50 bg-white border-t px-6 py-4 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsNewPostOpen(false)}
                className="h-11 px-6 text-black bg-white hover:bg-gray-50 border-gray-200 hover:text-gray-800"
              >
                Cancel
              </Button>
              <Button onClick={handleCreatePost} className="h-11 px-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                Create Post
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Chatbot/>
    </div>
  )
}

export default NewsFeed

