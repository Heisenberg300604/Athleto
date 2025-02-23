"use client";

import { useState, use } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AthleteNavbar from "@/components/AthleteNavbar";
import { useForceLightMode } from "@/hooks/useForcedLightTheme";
import { ApplySponsorshipModal } from "./__components/ApplySponsorshipModal";
import { AthleteOpportunityCard } from "./__components/AthleteOpportunityCard";

type PageProps = {
  params: Promise<{ brandId: string }>;
};

// Sample sponsorship opportunities
const SAMPLE_OPPORTUNITIES = [
  {
    id: "1",
    title: "  Running Ambassador Program",
    brand_name: " ",
    type: "Brand Ambassador",
    description:
      "Join  's running ambassador program to inspire and motivate runners worldwide. Share your running journey and represent  's innovative running products.",
    requirements: [
      "Minimum 10k followers on Instagram",
      "Active participation in running events",
      "Consistent posting about running/fitness",
      "Previous experience in running competitions",
    ],
    budget: "50000",
    duration: "6 months",
    location: {
      city: "Mumbai",
      country: "India",
    },
    campaign_type: "ongoing",
    perks: [
      "Free   running gear",
      "Event participation sponsorship",
      "Training program access",
      "Exclusive product launches",
    ],
    application_deadline: "2024-04-30",
    spots_available: 5,
  },
  {
    id: "2",
    title: "  Football Youth Program",
    brand_name: " ",
    type: "Athlete Sponsorship",
    description:
      "  is looking for young football talents to support their journey in becoming professional players. This program includes equipment sponsorship and training support.",
    requirements: [
      "Age between 15-21 years",
      "Regular participation in state/national level competitions",
      "Strong academic record",
      "Demonstrated leadership qualities",
    ],
    budget: "100000",
    duration: "12 months",
    location: {
      city: "Delhi",
      country: "India",
    },
    campaign_type: "long-term",
    perks: [
      "Complete football kit",
      "Professional coaching",
      "Tournament expenses",
      "Education support",
    ],
    application_deadline: "2024-05-15",
    spots_available: 3,
  },
  {
    id: "3",
    title: "  Basketball Creator Program",
    brand_name: " ",
    type: "Content Creation",
    description:
      "Create engaging basketball content featuring   products. Looking for creative individuals who can showcase basketball culture and  's innovation.",
    requirements: [
      "Strong presence on social media",
      "Basketball playing experience",
      "Video editing skills",
      "Storytelling ability",
    ],
    budget: "75000",
    duration: "3 months",
    location: {
      city: "Bangalore",
      country: "India",
    },
    campaign_type: "project-based",
    perks: [
      "  basketball gear",
      "Content creation workshop",
      "Access to   events",
      "Networking opportunities",
    ],
    application_deadline: "2024-04-01",
    spots_available: 8,
  },
  {
    id: "4",
    title: "  Training Club Partnership",
    brand_name: " ",
    type: "Fitness Ambassador",
    description:
      "Join   Training Club as a fitness ambassador to inspire and guide people in their fitness journey while representing  's training products.",
    requirements: [
      "Certified fitness trainer",
      "Active social media presence",
      "Experience in conducting workshops",
      "Passion for fitness education",
    ],
    budget: "60000",
    duration: "9 months",
    location: {
      city: "Hyderabad",
      country: "India",
    },
    campaign_type: "ongoing",
    perks: [
      "  training gear",
      "Workshop opportunities",
      "App feature possibility",
      "Training certification",
    ],
    application_deadline: "2024-05-30",
    spots_available: 4,
  },
  {
    id: "5",
    title: "  Cricket Innovation Program",
    brand_name: " ",
    type: "Product Testing",
    description:
      "Be part of  's cricket innovation journey by testing and providing feedback on upcoming cricket products while representing the brand.",
    requirements: [
      "Professional cricket experience",
      "Regular match participation",
      "Detailed feedback ability",
      "Based in test location",
    ],
    budget: "80000",
    duration: "4 months",
    location: {
      city: "Chennai",
      country: "India",
    },
    campaign_type: "project-based",
    perks: [
      "Exclusive product access",
      "Training facilities",
      "Performance analysis",
      "Brand association",
    ],
    application_deadline: "2024-04-15",
    spots_available: 6,
  },
];

export default function SponsorshipsPage({ params }: PageProps) {
  useForceLightMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const  {brandId}  = use(params);
  console.log(params);
  // Filter opportunities based on search term
  const filteredOpportunities = SAMPLE_OPPORTUNITIES.filter((opp) => {
    return (
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <AthleteNavbar />
      <div className="container mx-auto px-4 py-8">
        {/* Brand Header */}
        <div className="mb-8 p-6 bg-white rounded-lg border shadow-sm">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-white rounded-lg flex items-center justify-center">
              {/* <img
                src={"/placeholder.svg"}
                alt={brandId.replaceAll("%20", " ")}
                className="h-16 w-16 object-contain"
              /> */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-2xl">
                {brandId[0]}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {brandId.replaceAll("%20", " ")} Sponsorships
              </h1>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                {brandId.replaceAll("%20", " ") +
                  "Inc. is an multinational corporation that designs, develops, manufactures, and markets footwear, apparel, equipment, accessories, and services."}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Content */}
        <div className="space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search opportunities by title, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-8 col-span-full">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No opportunities found
                </h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              filteredOpportunities.map((opportunity) => (
                <AthleteOpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onApply={() => setSelectedOpportunity(opportunity)}
                  brandId={brandId}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {selectedOpportunity && (
        <ApplySponsorshipModal
          isOpen={!!selectedOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          opportunity={selectedOpportunity}
        />
      )}
    </div>
  );
}
