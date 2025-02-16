"use client"

import { UserCheck, Building2, Cpu, Compass, Newspaper, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SparklesCore } from '@/app/sparkles'

export default function FeaturesSection() {
  const features = [
    {
      icon: <UserCheck className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "Personalized Profile & Verification",
      description:
        "Complete profile tracking system with verification to build credibility and trust within the sports community.",
    },
    {
      icon: <Building2 className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "Explore Brands & Sponsorships",
      description:
        "Browse and connect with registered brands. Get personalized recommendations based on your athletic profile.",
    },
    {
      icon: <Cpu className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "Smart Sponsorship Matching Engine",
      description: "AI-driven bidding system matching athletes with brands based on alignment and mutual potential.",
    },
    {
      icon: <Compass className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "Opportunity Hub",
      description:
        "Central dashboard for sponsorships, trials, tournaments, and grants with easy application tracking.",
    },
    {
      icon: <Newspaper className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "News Feed",
      description: "Stay updated with latest events, partnerships, and success stories from the athletic community.",
    },
    {
      icon: <Trophy className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-400" />,
      title: "AI-Powered Leaderboard",
      description: "Dynamic ranking system based on performance, engagement, and sponsorship interest.",
    },
  ]

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 relative">
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticles-features"
          background="transparent"
          particleColor="#4A90E2"
          particleDensity={70}
          className="h-full w-full"
          minSize={0.9}
          maxSize={2.2}
        />
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        {/* Features Header */}
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4 text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            OUR FEATURES
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 px-4">
            Empowering athletes with cutting-edge tools and opportunities
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-black/50 border border-gray-800 p-4 sm:p-5 md:p-6 hover:border-blue-400/50 transition-colors backdrop-blur-sm"
            >
              <div className="space-y-3 sm:space-y-4">
                {feature.icon}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}