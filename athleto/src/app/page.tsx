import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black to-[#0A1A2F]">
      {/* Navigation */}
      <header className="fixed top-0 w-full border-b border-gray-800/20 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-semibold text-white">
              Athleto
            </Link>
            <nav className="hidden space-x-6 md:block">
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Solutions
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                Features
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white">
                About Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
              Contact
            </Link>
            <Button variant="outline" className="hidden bg-white/5 text-white hover:bg-white/10 md:inline-flex">
              Get a Demo now !
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Empower Athletes with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Athleto</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl">
          Supporting underprivileged athletes in India through AI-powered scouting, virtual training, and innovative
          crowdfunding solutions. We're shaping the future of sports talent.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Button className="bg-white px-8 text-black hover:bg-gray-100">Explore Solutions</Button>
          <Button variant="outline" className="border-gray-600 bg-transparent text-white hover:bg-white/10">
            Schedule a Demo
          </Button>
        </div>
      </main>
    </div>
    </>
  );
}
