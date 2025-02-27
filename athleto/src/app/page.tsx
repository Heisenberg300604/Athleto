"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
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
import { useUser } from "@/context/UserContext"
import LoginModal from "@/components/Loginmodal"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isBrandSignupModalOpen, setIsBrandSignupModalOpen] = useState(false)
  const [dashboardPath, setDashboardPath] = useState("");
  console.log(dashboardPath)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { user } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  console.log(user)

  const handleAthleteSignup = () => {
    setIsSignupModalOpen(false)
    router.push("/athlete-dashboard")
  }

  const handleBrandSignup = () => {
    setIsSignupModalOpen(false)
    router.push("/brand-dashboard")
  }
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) return;

      // Check if the user is in the athletes table
      const { data: athlete, error: athleteError } = await supabase
        .from("athletes")
        .select("*")
        .eq("email", user.email)
        .single();

      if (athlete) {
        setDashboardPath("/athlete-dashboard");
        return;
      }

      // Check if the user is in the brands table
      const { data: brand, error: brandError } = await supabase
        .from("brands")
        .select("*")
        .eq("business_email", user.email)
        .single();

      if (brand) {
        setDashboardPath("/brand-dashboard");
        return;
      }
    };

    fetchUserRole();
  }, [user]);

  const handleDashboardRedirect = () => {
    if (dashboardPath) {
      router.push(dashboardPath);
    }
  };
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear localStorage & Supabase session
      localStorage.clear();
      sessionStorage.clear();

      // Refresh the auth state immediately
      await router.replace("/"); // Ensures full reload
      router.refresh(); // Ensures state update
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useHomePageForcedTheme()

  // Add smooth scroll behavior
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTestimonials = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const testimonialsSection = document.getElementById("testimonials")
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTeam = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const teamSection = document.getElementById("team")
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sparkles Background */}
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

      {/* Content with background gradient */}
      <div className="relative z-10 min-h-screen">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full border-b border-gray-800/20">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className={`text-2xl font-extrabold mr-6 text-white ${montserrat.className} tracking-wider transition-colors duration-300 `} >
                Athleto
              </Link>
              <nav className="hidden space-x-6 md:block">
                <Link href="#features" className="text-sm text-gray-400 hover:text-white" onClick={scrollToFeatures}>
                  Features
                </Link>
              </nav>
              <nav className="hidden space-x-6 md:block">
                <Link href="#testimonials" className="text-sm text-gray-400 hover:text-white" onClick={scrollToTestimonials}>
                  Testimonials
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/ArshTiwari2004/Athleto" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white" onClick={scrollToTeam}>
                Team
              </Link>
              {user ? (
                <Button
                  variant="outline"
                  className="hidden bg-white/5 text-white hover:bg-white/10 md:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="hidden bg-white/5 text-white hover:bg-white/10 md:inline-flex"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </Button>
              )}

            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Dreams Overcoming Barriers with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ${montserrat.className} ">Athleto</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Athleto bridges the gap for underprivileged athletes, providing financial support and mentorship to help
            them reach their full potential. Join us in shaping the future of Indian football.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            {user ? (
              <Button
                className="bg-white px-8 text-black hover:bg-gray-100"
                onClick={handleDashboardRedirect}
                disabled={!dashboardPath}
              >
                Go to dashboard
              </Button>
            ) : (

              <>
                <Button
                  className="bg-white px-8 text-black hover:bg-gray-100"
                  onClick={() => setIsSignupModalOpen(true)}
                >
                  Athlete Sign up
                </Button>
                <Button
                  onClick={() => setIsBrandSignupModalOpen(true)}
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-white/10"
                >
                  Brand Sign up
                </Button>

                <AthleteSignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
                <BrandSignupModal isOpen={isBrandSignupModalOpen} onClose={() => setIsBrandSignupModalOpen(false)} />
              </>

            )}
            <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onOpenBrandSignup={() => {}}
          onOpenAthleteSignup={() => {}}
          />


          </div>
        </main>

        {/* Numbers Section */}
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

      {/* Footer */}
      <Footer />
    </div>
  )
}

