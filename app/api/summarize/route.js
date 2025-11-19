import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { text } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You summarize text clearly and concisely." },
        { role: "user", content: `Summarize this:\n\n${text}` },
      ],
      temperature: 0.3,
    });

    return new Response(
      JSON.stringify({ summary: completion.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("GROQ API ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
