"use client"

import type React from "react"
import { useState } from "react"
import { Bell, User, Menu, HelpCircle, MessageSquare, X } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useRouter, usePathname } from "next/navigation"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

const AthleteNavbar: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const navLinks = [
    { name: "BRANDS", href: "/athlete-dashboard" },
    { name: "OPPORTUNITIES", href: "/athlete-opportunities" },
    { name: "APPLIED", href: "/athlete-applied" },
    { name: "NEWS FEED", href: "/athlete-dashboard/newsfeed" },
  ]

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
    setIsNotificationOpen(false)
    setIsFeedbackOpen(false)
    setIsHelpOpen(false)
  }

  const handleProfileClick = () => {
    router.push("/athlete-profile")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true)
      setTimeout(() => {
        setFeedbackSubmitted(false)
        setIsFeedbackOpen(false)
        setFeedbackText("")
      }, 2000)
    }
  }

  return (
    <header className="bg-white text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/athlete-dashboard"
            className={`text-3xl font-extrabold mr-6 text-indigo-600 ${montserrat.className} tracking-wider transition-colors duration-300 hover:text-indigo-800`}
          >
            Athleto
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative group transition-colors duration-300 text-sm font-medium ${montserrat.className}
                  ${pathname === link.href ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300
                  ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200 relative"
              title="Notifications"
              onClick={() => {
                setIsNotificationOpen(!isNotificationOpen)
                setIsUserMenuOpen(false)
                setIsFeedbackOpen(false)
                setIsHelpOpen(false)
              }}
            >
              <Bell className="h-6 w-6 text-grey-900" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            {isNotificationOpen && (
              <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none">
                <CardHeader>
                  <CardTitle className="text-center text-black p-4 border-b border-gray-400 bg-gray-100 font">
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-black bg-gray-100 p-4">No notifications yet</CardContent>
              </Card>
            )}
          </div>

          {/* Feedback Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200"
              title="Provide Feedback"
              onClick={() => {
                setIsFeedbackOpen(!isFeedbackOpen)
                setIsNotificationOpen(false)
                setIsUserMenuOpen(false)
                setIsHelpOpen(false)
              }}
            >
              <MessageSquare className="h-6 w-6" />
            </button>
            {isFeedbackOpen && (
              <Card className="absolute right-0 top-full mt-2 w-96 shadow-lg p-4 bg-gray-100 border-none">
                <CardHeader className="flex flex-row justify-between items-center text-black">
                  <CardTitle>Provide Feedback</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsFeedbackOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent>
                  {!feedbackSubmitted ? (
                    <>
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="mb-4 text-black"
                      />
                      <Button
                        variant="outline"
                        className="w-full bg-indigo-600 text-white hover:bg-indigo-800"
                        onClick={handleFeedbackSubmit}
                      >
                        Submit Feedback
                      </Button>
                    </>
                  ) : (
                    <div className="text-green-600 text-center">Your feedback has been submitted</div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Help Icon */}
          <div className="relative">
            <button
              className="text-gray-900 p-2 rounded-full transition-colors duration-200"
              title="Help"
              onClick={() => {
                setIsHelpOpen(!isHelpOpen)
                setIsNotificationOpen(false)
                setIsUserMenuOpen(false)
                setIsFeedbackOpen(false)
              }}
            >
              <HelpCircle className="h-6 w-6" />
            </button>
            {isHelpOpen && (
              <Card className="absolute right-0 top-full mt-2 w-80 shadow-lg bg-gray-100 border-none text-black">
                <CardHeader>
                  <CardTitle>Help Center</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/athlete-dashboard/athlete-faq" className="block hover:text-indigo-600">
                      Frequently Asked Questions
                    </Link>
                    <Link href="/athlete-dashboard/athlete-team" className="block hover:text-indigo-600">
                      Our team
                    </Link>
                    <Link href="/athlete-dashboard/athlete-guide" className="block hover:text-indigo-600">
                      User Guide
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User Menu */}
          <button
            onClick={handleProfileClick}
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            title="User Profile"
          >
            <User className="h-6 w-6" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-900 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
            onClick={toggleMobileMenu}
            title="Mobile Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="mt-4 md:hidden animate-fadeIn bg-white shadow-md">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setIsMobileMenuOpen(false)
              }}
              className={`block py-2 px-4 transition-colors duration-200 
                ${pathname === item.href 
                  ? 'text-indigo-600 bg-gray-50' 
                  : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}

export default AthleteNavbar