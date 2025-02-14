"use client"
import { useState } from "react"
import AthleteNavbar from "@/components/AthleteNavbar"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Athleto and how does it work?",
    answer:
      "Athleto is a virtual platform that connects underprivileged athletes in India with resources, training, and financial backing. We provide a comprehensive ecosystem where athletes can create profiles, connect with sponsors, access training resources, and participate in various opportunities to advance their sports careers.",
  },
  {
    question: "How do I create and verify my athlete profile?",
    answer:
      "Creating a profile is simple: Sign up on our platform, complete your athlete profile with details about your sports achievements, training history, and goals. Our verification process involves reviewing your submitted documents and sports credentials to ensure authenticity and build trust with potential sponsors.",
  },
  {
    question: "How does the sponsorship matching system work?",
    answer:
      "Our Smart Sponsorship Matching Engine uses AI-driven algorithms to match athletes with potential sponsors based on various factors including sport type, achievement level, location, and brand alignment. The system provides personalized recommendations and automatically notifies you of relevant sponsorship opportunities.",
  },
  {
    question: "What types of resources and support does Athleto provide?",
    answer:
      "Athleto provides multiple resources including: • Access to professional training videos and sessions • Direct communication channels with brands and sponsors • Mentorship programs with experienced athletes • Financial support through sponsorships • Community networking opportunities • Performance tracking and analytics tools",
  },
  {
    question: "How can brands and sponsors get involved with Athleto?",
    answer:
      "Brands can create a profile on our platform, browse through verified athlete profiles, and create sponsorship opportunities. We provide detailed analytics and a portfolio management system to track sponsorship performance and impact. Our platform facilitates direct communication with athletes and helps manage sponsorship agreements efficiently.",
  },
  {
    question: "What makes Athleto's verification system trustworthy?",
    answer:
      "Our verification system involves a thorough review of athletes' credentials, including sports certificates, competition results, and references. We work with sports associations and verified coaches to validate achievements and ensure the authenticity of all profiles on our platform.",
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-background">
      <AthleteNavbar />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-primary">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-xl">
              Find answers to common questions about Athleto's platform and services
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-6 py-5 text-left font-medium text-lg hover:text-indigo-700 focus:outline-none transition-colors duration-200"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180 text-indigo-700" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-600 text-lg leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}




