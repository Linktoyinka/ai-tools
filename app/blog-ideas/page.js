"use client";
import React, { useState } from "react";

export default function BlogIdeaGenerator() {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateIdeas() {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setIdeas([]);
    setError("");

    try {
      const res = await fetch("/api/blog-ideas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          topic: topic.trim(),
          count: parseInt(count)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      if (data.ideas && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
        if (data.ideas.length === 0) {
          setError("No ideas generated. Please try a different topic.");
        }
      } else {
        throw new Error("Invalid response format from server");
      }

    } catch (error) {
      console.error('Error generating ideas:', error);
      setError(error.message || "Failed to generate blog ideas. Please try again.");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  }

  const clearAll = () => {
    setTopic("");
    setIdeas([]);
    setError("");
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Blog Idea Generator</h1>
          <p className="text-lg text-gray-600">Overcome writer's block with creative blog post ideas</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic or Niche *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setError("");
                }}
                placeholder="e.g., digital marketing, healthy recipes, AI technology..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Ideas
              </label>
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value={3}>3 Ideas</option>
                <option value={5}>5 Ideas</option>
                <option value={10}>10 Ideas</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={generateIdeas}
              disabled={loading || !topic.trim()}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Ideas...
                </span>
              ) : (
                "Generate Blog Ideas"
              )}
            </button>
            
            <button
              onClick={clearAll}
              disabled={loading}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 disabled:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {ideas.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Generated Ideas ({ideas.length})
              </h2>
              <button
                onClick={() => navigator.clipboard.writeText(
                  ideas.map(idea => `• ${idea.title}\n  Angle: ${idea.angle}\n  Audience: ${idea.targetAudience}\n  Outline: ${idea.outline?.join(', ')}`).join('\n\n')
                )}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                Copy All
              </button>
            </div>
            
            {ideas.map((idea, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-purple-700 flex-1">
                    {idea.title || `Blog Idea ${index + 1}`}
                  </h3>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    #{index + 1}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-700 font-bold">Angle:</p>
                    <p className="text-gray-600 mt-1">{idea.angle || "No angle provided"}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-bold">Target Audience:</p>
                    <p className="text-gray-600 mt-1">{idea.targetAudience || "General audience"}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-bold">Outline:</p>
                    <ul className="mt-2 space-y-2">
                      {idea.outline && Array.isArray(idea.outline) ? (
                        idea.outline.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-gray-600 flex items-start">
                            <span className="text-purple-500 mr-3 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 italic">No outline provided</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && ideas.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">AI is brainstorming creative ideas about "{topic}"...</p>
            <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
          </div>
        )}

        {!loading && ideas.length === 0 && topic && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💡</div>
            <p className="text-gray-600 text-lg">Enter a topic above to generate blog ideas!</p>
          </div>
        )}
      </div>
    </main>
  );
}