"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import Image from "next/image"
import { SparklesCore } from '@/app/sparkles'
import { Card, CardContent } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"

// Testimonial interface
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}

const sampleTestimonials: Testimonial[] = [
  {
    quote: "As a professional footballer, finding the right brand partnerships was always challenging. Through this platform, I've connected with brands that align perfectly with my values and career goals. It's given me opportunities I never thought possible.",
    author: "Sunil Chhetri",
    role: "FOOTBALL | INDIAN NATIONAL TEAM CAPTAIN",
    image: "/sunil.jpg",
    rating: 5,
  },
  {
    quote: "Our sports brand was looking to connect with authentic football talent in India. This platform helped us discover and collaborate with emerging athletes who truly represent the spirit of Indian football. The quality of talent and professionalism has been exceptional.",
    author: "Rajesh Kumar",
    role: "MARKETING DIRECTOR | SPORTS BRAND",
    image: "/rajesh.jpeg",
    rating: 4,
  },
  {
    quote: "The platform has been a game-changer for my career. Not only did it help me secure brand partnerships, but it also gave me the visibility I needed in the professional football circuit. It's more than just a platform - it's a career accelerator.",
    author: "Sandesh Jhingan",
    role: "FOOTBALL | PROFESSIONAL DEFENDER",
    image: "/sandesh.jpeg",
    rating: 5,
  },
  {
    quote: "Finding authentic football talent for our campaigns used to be a complex process. Now, we can directly connect with professional athletes who resonate with our brand values. The platform has streamlined our sports marketing initiatives significantly.",
    author: "Priya Mehta",
    role: "BRAND MANAGER | LIFESTYLE COMPANY",
    image: "/priya.jpg",
    rating: 4,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = sampleTestimonials

  const next = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 relative">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticles-numbers"
          background="transparent"
          particleColor="#4A90E2"
          particleDensity={70}
          className="h-full w-full"
          minSize={0.9}
          maxSize={2.2}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Quote className="h-8 w-8 text-indigo-500"/>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white">
            Voices of Success
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-4xl relative px-8">
          <div className="relative flex flex-col items-center text-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                fill
                className="object-cover"
              />
            </div>
            <blockquote className="text-base italic text-gray-300">
              {testimonials[currentIndex].quote}
            </blockquote>
            <cite className="font-semibold text-white">
              {testimonials[currentIndex].author}
            </cite>
            <p className="text-indigo-500">{testimonials[currentIndex].role}</p>
          </div>
          <button onClick={previous} className="absolute left-0 top-1/2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button onClick={next} className="absolute right-0 top-1/2">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}