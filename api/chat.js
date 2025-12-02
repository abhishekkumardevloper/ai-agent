import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: "Server not configured",
      details: "OPENAI_API_KEY is missing",
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a friendly AI tutor helping college students with their course questions. " +
            "Explain concepts in simple language, step by step, and use short examples. " +
            "If the question is not related to studies or courses, answer briefly and bring the topic back to academics.",
        },
        ...messages,
      ],
      temperature: 0.4,
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "Sorry, I could not generate an answer. Please try again.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      error: "Something went wrong while talking to the AI.",
      details: error.message || "Unknown error",
    });
  }
}
