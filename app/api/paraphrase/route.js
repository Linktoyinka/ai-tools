import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { text, tone = "formal" } = await req.json();

    const toneInstructions = {
      formal: "Rewrite this text in a formal, professional tone",
      casual: "Rewrite this text in a casual, conversational tone",
      creative: "Rewrite this text in a creative, engaging tone",
      academic: "Rewrite this text in an academic, scholarly tone"
    };

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: "You are a professional writing assistant that paraphrases text while preserving the original meaning." 
        },
        { 
          role: "user", 
          content: `${toneInstructions[tone]}:\n\n${text}` 
        },
      ],
      temperature: 0.7,
    });

    return new Response(
      JSON.stringify({ paraphrased: completion.choices[0].message.content }),
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