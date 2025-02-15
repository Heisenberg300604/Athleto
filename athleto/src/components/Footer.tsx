"use client"

import { useState } from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    setEmail("")
    // Reset submission state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const scrollToSection = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative w-full bg-gradient-to-b from-black/95 to-black text-gray-300 py-12 mt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Athleto
            </h3>
            <p className="text-sm text-gray-400">
              Bridging the gap for underprivileged athletes, providing financial support and mentorship to help them
              reach their full potential.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="group">
                <Facebook className="h-5 w-5 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="group">
                <Twitter className="h-5 w-5 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="group">
                <Instagram className="h-5 w-5 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="group">
                <Linkedin className="h-5 w-5 transition-all duration-300 group-hover:text-blue-400 group-hover:scale-110" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#features" 
                  onClick={scrollToSection('features')} 
                  className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Features</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="#testimonials" 
                  onClick={scrollToSection('testimonials')} 
                  className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Testimonials</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Help Center</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm group flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm text-gray-400">Subscribe to our newsletter for the latest updates and stories.</p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-black/50 border-gray-800 focus:border-blue-400 transition-all duration-300 hover:border-gray-700"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="outline" 
                  className="border-gray-800 hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300"
                >
                  <Send className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
            {isSubmitted && (
              <p className="text-sm text-blue-400 animate-fade-in">
                Thanks for subscribing! 🎉
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} Athleto. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px]">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px]">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-y-[-2px]">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}