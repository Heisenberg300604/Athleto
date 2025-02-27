// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// Type definitions for request and response
interface Message {
  text: string;
  sender: "user" | "assistant";
}

interface RequestData {
  message: string;
  history?: Message[];
}

interface ResponseData {
  text: string;
  error?: string;
}

interface CohereMessage {
  role: "USER" | "CHATBOT";
  message: string;
}

/**
 * API route handler for chat functionality
 * This keeps the Cohere API key secure on the server
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      text: '', 
      error: 'Method not allowed. Please use POST.' 
    });
  }

  // Validate API key
  const apiKey = process.env.NEXT_PUBLIC_COHERE_API_KEY;
  if (!apiKey) {
    console.error('COHERE_API_KEY is not defined in environment variables');
    return res.status(500).json({ 
      text: 'Server configuration error. Please contact the administrator.',
      error: 'API key not configured'
    });
  }

  try {
    const { message, history = [] } = req.body as RequestData;
    
    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        text: '', 
        error: 'Invalid message format. Please provide a text message.' 
      });
    }

    // Format conversation history for Cohere
    // Cohere expects a specific format with roles: USER or CHATBOT
    const formattedHistory: CohereMessage[] = history.map(msg => ({
      role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
      message: msg.text
    }));

    // Call Cohere API
    const cohereResponse = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06' // Update as needed
      },
      body: JSON.stringify({
        message: message,
        chat_history: formattedHistory,
        model: 'command', // Other options: command-light, command-nightly, etc.
        temperature: 0.7,  // Controls randomness: 0 = deterministic, 1 = creative
        max_tokens: 300,   // Maximum length of the response
        // Additional parameters if needed:
        // p: 0.75,        // Top-p sampling
        // frequency_penalty: 0, // Reduces repetition of tokens
        // presence_penalty: 0,  // Encourages talking about new topics
      }),
    });

    // Handle errors from Cohere API
    if (!cohereResponse.ok) {
      const errorData = await cohereResponse.json();
      console.error('Cohere API error:', errorData);
      
      return res.status(cohereResponse.status).json({ 
        text: 'The AI service encountered an error. Please try again later.',
        error: errorData.message || `Error ${cohereResponse.status} from Cohere API`
      });
    }

    // Process successful response
    const data = await cohereResponse.json();
    
    // Cohere may return response in different formats depending on the model
    // Handle both possibilities
    const responseText = data.text || data.generations?.[0]?.text || 'No response generated';
    
    return res.status(200).json({ text: responseText });
    
  } catch (error) {
    // Catch any other errors
    console.error('Error processing chat request:', error);
    
    return res.status(500).json({ 
      text: 'Something went wrong with the chat service. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}