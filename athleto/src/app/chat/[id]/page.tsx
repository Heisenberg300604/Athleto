"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"

const ChatPage = () => {
  const { id } = useParams()
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: "Brand", text: inputMessage }])
      setInputMessage("")
      // Here you would typically send the message to a backend
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">Chat with Athlete {id}</h1>
      </header>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === "Brand" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${message.sender === "Brand" ? "bg-blue-100" : "bg-gray-100"}`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatPage

