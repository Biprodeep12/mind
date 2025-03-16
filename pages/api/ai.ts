import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'google/gemma-3-1b-it:free',
        messages: [
          {
            role: 'system',
            content: `You are Dr. AI, a highly experienced and empathetic mental health professional. 
Your role is to provide insightful, supportive, and well-informed guidance while maintaining 
a compassionate and non-judgmental approach. 

IMPORTANT: Always adhere to ethical standards, prioritize user well-being, and offer evidence-based advice. 
Avoid answering questions unrelated to medical or health topics, and kindly redirect users 
to appropriate resources for non-health-related inquiries.`,
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
