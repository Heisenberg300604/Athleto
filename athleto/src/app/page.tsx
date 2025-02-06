"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { SparklesCore } from "./sparkles";
import { useMousePosition } from "./use-mouse-position";
import { useEffect, useState } from "react";
import AthleteSignupModal from "@/components/Atheletesignup";
import BrandSignupModal from "@/components/Brandsignup";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isBrandSignupModalOpen, setIsBrandSignupModalOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session Data:", session); // Log the actual session data
      setUser(session?.user || null);
    };

    getSession();
    console.log(getSession())
    console.log(user)
  }, []);

  const handleAthleteSignup = () => {
    setIsSignupModalOpen(false);
    router.push("/athlete-dashboard");
  };

  const handleBrandSignup = () => {
    setIsSignupModalOpen(false);
    router.push("/brand-dashboard");
  };

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
      <div className="relative z-10 min-h-screen ">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full border-b border-gray-800/20  ">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-xl font-semibold text-white">
                Athleto
              </Link>
              <nav className="hidden space-x-6 md:block">
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/ArshTiwari2004/Athleto"
                className="text-gray-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-white"
              >
                Contact
              </Link>
              {user ? (
                <Button
                  variant="outline"
                  className="bg-white/5 text-white hover:bg-white/10"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.refresh();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="hidden bg-white/5 text-white hover:bg-white/10 md:inline-flex"
                >
                  Get a Demo now !
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Dreams Overcoming Barriers with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Athleto
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
            Athleto bridges the gap for underprivileged athletes, providing
            financial support and mentorship to help them reach their full
            potential. Join us in shaping the future of Indian football.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            {user ? (
              <Button
                className="bg-white px-8 text-black hover:bg-gray-100"
                onClick={() => router.push("/athlete-dashboard")}
              >
                Go to Dashboard
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

                <AthleteSignupModal
                  isOpen={isSignupModalOpen}
                  onClose={() => setIsSignupModalOpen(false)}
                />

                <BrandSignupModal
                  isOpen={isBrandSignupModalOpen}
                  onClose={() => setIsBrandSignupModalOpen(false)}
                  onSubmit={handleBrandSignup}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
