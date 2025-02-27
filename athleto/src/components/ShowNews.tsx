import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, Share2, MapPin, Building2 } from "lucide-react";

interface Post {
  brand: string;
  title: string;
  price?: string;
  location: string;
  date: string;
  type: string;
  description: string;
  images?: string[];
  image?: string;
  brandlogo?: string;
  byBrand?: boolean;
  isFavorite?: boolean;
  isLiked?: boolean;
}

const PostCardNews: React.FC<{ post: Post }> = ({ post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked || false);
  const [isFavorite, setIsFavorite] = useState<boolean>(
    post.isFavorite || false
  );
  // handle like and like count
  //
  const handleLike = () => setIsLiked((prev) => !prev);
  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow w-full mx-auto border-none">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <img
              src={post.brandlogo || "/placeholder.svg"}
              alt={post.brand}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-black text-xl font-bold">{post.brand}</h3>
              <p className="text-sm text-muted-foreground">
                Posted {post.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {post.price && (
              <Badge
                variant="secondary"
                className="bg-indigo-50 text-indigo-700 font-medium">
                {post.price}
              </Badge>
            )
            }

            {/* Like Button */}
            {/* {post.byBrand ?? ( */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLike}
                className={isLiked ? "text-indigo-600" : "text-gray-400"}>
                <ThumbsUp className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500" : "text-gray-400"}>
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>

            {/* Share Button */}
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <h2 className="text-md font-semibold mb-4 text-gray-900">
          {post.title}
        </h2>

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

        <p className="text-gray-900 text-sm leading-relaxed">
          {post.description}
        </p>

        {/* Image Handling */}
        {post.images ? (
          <div className="mt-4">
            {/* Image carousel (replace with actual carousel if needed) */}
            <img
              src={post.images[0]}
              alt="Post image"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ) : post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mt-4"
          />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PostCardNews;
