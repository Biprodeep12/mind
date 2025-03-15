import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { messages } = req.body;

    const API_KEY =
      "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";
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemma-3-1b-it:free",
        messages: [
          {
            role: "system",
            content:
              "You are Dr. AI, a compassionate and knowledgeable mental health professional...",
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch AI response");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
