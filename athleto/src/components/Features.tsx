"use client"

import { UserCheck, Building2, Cpu, Compass, Newspaper, Trophy, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      icon: <UserCheck className="h-12 w-12 text-blue-400" />,
      title: "Personalized Profile & Verification",
      description:
        "Complete profile tracking system with verification to build credibility and trust within the sports community.",
    },
    {
      icon: <Building2 className="h-12 w-12 text-blue-400" />,
      title: "Explore Brands & Sponsorships",
      description:
        "Browse and connect with registered brands. Get personalized recommendations based on your athletic profile.",
    },
    {
      icon: <Cpu className="h-12 w-12 text-blue-400" />,
      title: "Smart Sponsorship Matching Engine",
      description: "AI-driven bidding system matching athletes with brands based on alignment and mutual potential.",
    },
    {
      icon: <Compass className="h-12 w-12 text-blue-400" />,
      title: "Opportunity Hub",
      description:
        "Central dashboard for sponsorships, trials, tournaments, and grants with easy application tracking.",
    },
    {
      icon: <Newspaper className="h-12 w-12 text-blue-400" />,
      title: "News Feed",
      description: "Stay updated with latest events, partnerships, and success stories from the athletic community.",
    },
    {
      icon: <Trophy className="h-12 w-12 text-blue-400" />,
      title: "AI-Powered Leaderboard",
      description: "Dynamic ranking system based on performance, engagement, and sponsorship interest.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6">
        {/* Features Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            OUR FEATURES
          </h2>
          <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Empowering athletes with cutting-edge tools and opportunities
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-black/50 border border-gray-800 p-6 hover:border-blue-400/50 transition-colors"
            >
              <div className="space-y-4">
                {feature.icon}
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
              
            </Card>
          ))}
        </div>

        
      </div>
    </section>
  )
}

