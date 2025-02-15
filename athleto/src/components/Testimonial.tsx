"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "As a professional footballer, finding the right brand partnerships was always challenging. Through this platform, I've connected with brands that align perfectly with my values and career goals. It's given me opportunities I never thought possible.",
    author: "Sunil Chhetri",
    role: "FOOTBALL | INDIAN NATIONAL TEAM CAPTAIN",
    image: "/sunil.jpg",
  },
  {
    quote:
      "Our sports brand was looking to connect with authentic football talent in India. This platform helped us discover and collaborate with emerging athletes who truly represent the spirit of Indian football. The quality of talent and professionalism has been exceptional.",
    author: "Rajesh Kumar",
    role: "MARKETING DIRECTOR | SPORTS BRAND",
    image: "/rajesh.jpeg",
  },
  {
    quote:
      "The platform has been a game-changer for my career. Not only did it help me secure brand partnerships, but it also gave me the visibility I needed in the professional football circuit. It's more than just a platform - it's a career accelerator.",
    author: "Sandesh Jhingan",
    role: "FOOTBALL | PROFESSIONAL DEFENDER",
    image: "/sandesh.jpeg",
  },
  {
    quote:
      "Finding authentic football talent for our campaigns used to be a complex process. Now, we can directly connect with professional athletes who resonate with our brand values. The platform has streamlined our sports marketing initiatives significantly.",
    author: "Priya Mehta",
    role: "BRAND MANAGER | LIFESTYLE COMPANY",
    image: "/priya.jpg",
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((currentIndex + 1) % testimonials.length)
  }

  const previous = () => {
    setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-indigo-500"/>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            Voices of Success
          </h2>
          <p className="max-w-[900px] text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            Bridging the gap between exceptional talent and leading brands. Discover how we're transforming the landscape of sports partnerships in India.
          </p>
        </div>
        <div className="mx-auto mt-8 sm:mt-12 md:mt-16 max-w-4xl">
          <div className="relative px-8 sm:px-12">
            <div className="relative h-full w-full">
              <div className="relative flex flex-col items-center space-y-4 text-center">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 overflow-hidden rounded-full">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="max-w-2xl text-base sm:text-lg md:text-xl italic text-gray-300">
                  {testimonials[currentIndex].quote}
                </blockquote>
                <div className="mt-4">
                  <cite className="not-italic font-semibold text-sm sm:text-base md:text-lg text-white">
                    {testimonials[currentIndex].author}
                  </cite>
                  <p className="mt-1 text-xs sm:text-sm text-indigo-500">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={previous}
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-orange-500/10 p-1 sm:p-2 text-white hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-orange-500/10 p-1 sm:p-2 text-white hover:bg-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </button>
          </div>
          <div className="mt-6 sm:mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-orange-500" : "bg-gray-500/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}