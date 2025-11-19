import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { code, language } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: `You are a senior software engineer. Explain code in simple terms.
          Return a JSON object with:
          - explanation: plain English explanation
          - keyConcepts: array of programming concepts used
          - complexity: "beginner" | "intermediate" | "advanced"
          - improvements: array of suggested improvements (optional)`
        },
        { 
          role: "user", 
          content: `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\`` 
        },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content);
    
    return new Response(
      JSON.stringify(result),
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