import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { topic, count = 5 } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { 
          role: "system", 
          content: `You are a creative content strategist. Generate engaging blog post ideas.
          Return ONLY a valid JSON object with a key "ideas" that contains an array of blog ideas.
          Each idea should have:
          - title: catchy title
          - angle: unique perspective
          - outline: array of main points
          - targetAudience: who would read this
          
          Example response:
          {
            "ideas": [
              {
                "title": "10 Ways to...",
                "angle": "Practical approach for beginners",
                "outline": ["Introduction", "Point 1", "Point 2", "Conclusion"],
                "targetAudience": "Small business owners"
              }
            ]
          }`
        },
        { 
          role: "user", 
          content: `Generate ${count} blog post ideas about: ${topic}. Return only valid JSON.` 
        },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    

    let result;
    try {
      result = JSON.parse(completion.choices[0].message.content);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Fallback: try to extract JSON from the response
      const content = completion.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON response from AI");
      }
    }

    // Ensure the response has the expected structure
    if (!result.ideas || !Array.isArray(result.ideas)) {
      console.error("Unexpected response structure:", result);
      throw new Error("Invalid response structure from AI");
    }

    return new Response(
      JSON.stringify({ 
        ideas: result.ideas,
        count: result.ideas.length
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  } catch (error) {
    console.error("GROQ API ERROR:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to generate blog ideas",
        ideas: []
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}