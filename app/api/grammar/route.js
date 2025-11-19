import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { text } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: `You are a professional editor. Analyze the text for:
          1. Grammar errors
          2. Spelling mistakes
          3. Punctuation issues
          4. Awkward phrasing
          
          Return a JSON array with each error containing:
          - type: "grammar" | "spelling" | "punctuation" | "style"
          - original: the incorrect text
          - suggestion: the corrected text
          - reason: brief explanation
          - position: {start: number, end: number}`
        },
        { 
          role: "user", 
          content: `Analyze this text:\n\n${text}` 
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    
    return new Response(
      JSON.stringify({ 
        corrected: text, 
        errors: result.errors || []
      }),
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