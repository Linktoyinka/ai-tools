import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const languages = {
  english: "English",
  spanish: "Spanish", 
  french: "French",
  german: "German",
  italian: "Italian",
  portuguese: "Portuguese",
  russian: "Russian",
  japanese: "Japanese",
  korean: "Korean",
  chinese: "Chinese (Simplified)",
  arabic: "Arabic",
  hindi: "Hindi"
};

export async function POST(req) {
  try {
    const { text, targetLanguage } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: `You are a professional translator. Translate text accurately while preserving meaning, tone, and context.` 
        },
        { 
          role: "user", 
          content: `Translate this text to ${languages[targetLanguage] || targetLanguage}:\n\n${text}` 
        },
      ],
      temperature: 0.3,
    });

    return new Response(
      JSON.stringify({ 
        translated: completion.choices[0].message.content,
        sourceLanguage: "auto",
        targetLanguage: languages[targetLanguage] || targetLanguage
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