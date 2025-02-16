"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Github, Menu, X } from "lucide-react"
import Link from "next/link"
import { SparklesCore } from "./sparkles"
import { useEffect, useState } from "react"
import AthleteSignupModal from "@/components/Atheletesignup"
import BrandSignupModal from "@/components/Brandsignup"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"
import { useHomePageForcedTheme } from "@/hooks/useHomePageForcedTheme"
import Footer from "@/components/Footer"
import FeaturesSection from "@/components/Features"
import NumbersSection from "@/components/Numbersection"
import TestimonialsSection from "@/components/Testimonial"
import TeamSection from "@/components/Teamsection"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isBrandSignupModalOpen, setIsBrandSignupModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const setupAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setLoading(false)

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Auth error:", error)
        setLoading(false)
      }
    }

    setupAuth()
  }, [supabase.auth])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Logout error:", error)
  }

  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    e?.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleColor="#4A90E2"
          particleDensity={70}
          className="h-full w-full"
          minSize={0.9}
          maxSize={2.2}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Navigation - Desktop sticky, Mobile not sticky */}
        <header className="md:fixed md:top-0 md:z-50 w-full border-b border-gray-800/20 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className={`text-2xl font-extrabold text-white ${montserrat.className} tracking-wider transition-colors duration-300`}>
                Athleto
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link href="#features" className="text-sm text-gray-400 hover:text-white" onClick={(e) => scrollToSection('features', e)}>
                  Features
                </Link>
                <Link href="#testimonials" className="text-sm text-gray-400 hover:text-white" onClick={(e) => scrollToSection('testimonials', e)}>
                  Testimonials
                </Link>
                <Link href="#team" className="text-sm text-gray-400 hover:text-white" onClick={(e) => scrollToSection('team', e)}>
                  Team
                </Link>
              </nav>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="https://github.com/ArshTiwari2004/Athleto" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              {user ? (
                <Button variant="outline" className="bg-white/5 text-white hover:bg-white/10" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="outline" className="bg-white/5 text-white hover:bg-white/10">
                  Get a Demo now !
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-gray-800/20 backdrop-blur-sm">
              <nav className="flex flex-col p-4 space-y-4">
                <Link href="#features" className="text-gray-400 hover:text-white px-4 py-2" onClick={(e) => scrollToSection('features', e)}>
                  Features
                </Link>
                <Link href="#testimonials" className="text-gray-400 hover:text-white px-4 py-2" onClick={(e) => scrollToSection('testimonials', e)}>
                  Testimonials
                </Link>
                <Link href="#team" className="text-gray-400 hover:text-white px-4 py-2" onClick={(e) => scrollToSection('team', e)}>
                  Team
                </Link>
                <Link href="https://github.com/ArshTiwari2004/Athleto" className="text-gray-400 hover:text-white px-4 py-2 flex items-center gap-2">
                  <Github className="h-5 w-5" />
                  GitHub
                </Link>
                {user ? (
                  <Button variant="outline" className="bg-white/5 text-white hover:bg-white/10 w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" className="bg-white/5 text-white hover:bg-white/10 w-full">
                    Get a Demo now !
                  </Button>
                )}
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section  */}
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white">
            Empowering Dreams Overcoming Barriers with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ${montserrat.className}">
              Athleto
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-gray-400">
            Athleto bridges the gap for underprivileged athletes, providing financial support and mentorship to help
            them reach their full potential. Join us in shaping the future of Indian football.
          </p>
          <div className="mt-10 flex flex-col w-full sm:w-auto gap-4 sm:flex-row sm:gap-6 px-4">
            {user ? (
              <Button
                className="bg-white px-8 text-black hover:bg-gray-100 w-full sm:w-auto"
                onClick={() => router.push("/athlete-dashboard")}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  className="bg-white px-8 text-black hover:bg-gray-100 w-full sm:w-auto"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Athlete Sign up
                </Button>
                <Button
                  onClick={() => setIsBrandSignupModalOpen(true)}
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Brand Sign up
                </Button>
              </>
            )}
          </div>
        </main>

        {/* Numbers Sections */}
        <NumbersSection />
          
          {/* Features Section */}
        <div id="features">
          <FeaturesSection />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials">
          <TestimonialsSection />
        </div>

        {/* Team Section */}
        <div id="team">
          <TeamSection />
        </div>
      </div>

      <AthleteSignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
      <BrandSignupModal isOpen={isBrandSignupModalOpen} onClose={() => setIsBrandSignupModalOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  )
}