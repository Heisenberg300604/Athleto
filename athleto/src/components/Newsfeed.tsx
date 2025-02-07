"use client"
import React, { useState } from "react";
import { Heart, MapPin, Building2, Plus, Share2, ThumbsUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AthleteNavbar from "./AthleteNavbar";

const NewsFeed = ({ brandDetails }: { brandDetails: any }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      brand: "WHOOP",
      title: "January Jumpstart Campaign",
      price: "€165",
      location: "Ireland, Dublin",
      date: "26.12.24 - 01.02.25",
      type: "One-off product / company endorsement",
      description: "WHOOP, the human performance company, is looking to work with up to 20 athletes / creators based in Ireland for their upcoming January Jumpstart campaign.",
      image: "/api/placeholder/800/400"
    },
    {
      id: 2,
      brand: "Sleek N Easy",
      title: "BA Sleek N Easy",
      price: "€85",
      location: "Ireland, Online (Ireland)",
      date: "05.02.25 - 27.02.25",
      type: "Strategic brand ambassador",
      description: "Are you an athlete passionate about top-quality products? We're launching our Brand Ambassador program and looking for athletes worldwide to join us!",
      image: "/api/placeholder/800/400"
    }
  ]);

  const [newPost, setNewPost] = useState({
    brand: "",
    title: "",
    price: "",
    location: "",
    description: "",
    image: "/api/placeholder/800/400",
    type: "",
    brandlogo:"/api/placeholder/40/40"
  });

  const brands = Object.entries(brandDetails || {}).map(([name, details]: [string, any]) => ({
    name,
    ...details,
    image: details.image || "/api/placeholder/40/40"
  }));

  const handleCreatePost = () => {
    setPosts([
      {
        id: posts.length + 1,
        ...newPost,
        date: new Date().toLocaleDateString(),
        type: "New Opportunity"
      },
      ...posts
    ]);
    setIsNewPostOpen(false);
    setNewPost({
      brand: "",
      title: "",
      price: "",
      location: "",
      description: "",
      image: "/api/placeholder/800/400",
      type: "",
      brandlogo:"/api/placeholder/40/40"
    });
  };

  const toggleFavorite = (postId: number) => {
    setFavorites(prev => 
      prev.includes(postId.toString()) 
        ? prev.filter(id => id !== postId.toString())
        : [...prev, postId.toString()]
    );
  };

  const handleLike = (postId: number) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + (likedPosts.includes(postId) ? -1 : 1)
    }));
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const filteredPosts = activeTab === "favorites" 
    ? posts.filter(post => favorites.includes(post.id.toString()))
    : posts;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AthleteNavbar />
      <div className="flex flex-1 gap-6 p-6">
        {/*tabs*/}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-3 transition-colors ${
                  activeTab === "all" 
                    ? "text-blue-600 border-b-2 border-blue-600" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                ALL NEWS
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-4 py-3 transition-colors ${
                  activeTab === "favorites"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                NEWS FROM FAVOURITES
              </button>
            </div>
            <Button 
              onClick={() => setIsNewPostOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              NEW POST
            </Button>
          </div>

         {/*Post Cards*/}
          {filteredPosts.map(post => (
            <Card key={post.id} className="bg-white mx-auto w-full md:w-2/3">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={post.image}
                      alt={post.brand}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{post.brand}</h3>
                      <p className="text-sm text-gray-500">Posted {post.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      {post.price}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleLike(post.id)}
                      className={`${likedPosts.includes(post.id) ? "text-blue-500" : "text-gray-400"}`}
                    >
                      <ThumbsUp size={40} />
                      <span className="ml-1 text-sm">{likes[post.id] || 0}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(post.id)}
                      className={`${favorites.includes(post.id.toString()) ? "text-red-500" : "text-gray-400"} hover:bg-transparent`}
                    >
                      <Heart 
                        size={40} 
                        fill={favorites.includes(post.id.toString()) ? "currentColor" : "none"}
                      />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-transparent">
                      <Share2 size={40} />
                    </Button>
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-4 text-gray-600">{post.title}</h2>
                
                <div className="flex items-center gap-6 mb-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building2 size={20} />
                    <span>{post.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={20} />
                    <span>{post.location}</span>
                  </div>
                </div>

                <p className="text-gray-700">{post.description}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg mt-4"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        {/*New Brands Card*/}
        <div className="w-80 mt-16">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">NEW BRANDS</h2>
              <div className="space-y-4">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{brand.name}</h3>
                      {brand.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
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

       {/*Dialog for creating new post*/}
       <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
       <DialogContent className="sm:max-w-[425px] bg-gray-50">
        <DialogHeader>
            <DialogTitle className="text-gray-900">Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Title</label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Type</label>
              <Input
                value={newPost.type}
                onChange={(e) => setNewPost(prev => ({ ...prev, industry: e.target.value }))}
                placeholder="Enter type"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Price</label>
              <Input
                value={newPost.price}
                onChange={(e) => setNewPost(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Enter price"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Location</label>
              <Input
                value={newPost.location}
                onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Brand Name</label>
            <Input
              value={newPost.brand}
              onChange={(e) => setNewPost(prev => ({ ...prev, brand: e.target.value }))}
              placeholder="Enter brand name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Description</label>
            <Textarea
              value={newPost.description}
              onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Brand Logo</label>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewPost(prev => ({ ...prev, brandlogo: URL.createObjectURL(e.target.files![0]) }));
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Image</label>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewPost(prev => ({ ...prev, image: URL.createObjectURL(e.target.files![0]) }));
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setIsNewPostOpen(false)} className="bg-white shadow text-gray-900">
            Cancel
            </Button>
            <Button onClick={handleCreatePost} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Create Post
            </Button>
        </div>
      </DialogContent>
    </Dialog>
      </div>
    </div>
  );
};

export default NewsFeed;