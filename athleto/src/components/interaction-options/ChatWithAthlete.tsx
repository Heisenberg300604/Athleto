"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatWithAthleteProps {
  talent: any
}

const ChatWithAthlete: React.FC<ChatWithAthleteProps> = ({ talent }) => {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ sender: string; text: string }>>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "Brand", text: message }])
      setMessage("")
      // Here you would typically send the message to a backend
    }
  }

  return (
    <div className="space-y-4">
      <div className="h-64 overflow-y-auto border rounded p-2">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "Brand" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === "Brand" ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}

export default ChatWithAthlete

