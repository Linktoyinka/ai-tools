"use client";
import React, { useState } from "react";

export default function CodeExplainer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleExplainCode() {
    if (!code.trim()) return;

    setLoading(true);
    setExplanation(null);

    try {
      const res = await fetch("/api/explain-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!res.ok) throw new Error('Failed to explain code');
      
      const data = await res.json();
      setExplanation(data);
    } catch (error) {
      console.error('Error:', error);
      setExplanation({ error: "Failed to explain code" });
    } finally {
      setLoading(false);
    }
  }

  const getComplexityColor = (complexity) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-yellow-100 text-yellow-800",
      advanced: "bg-red-100 text-red-800"
    };
    return colors[complexity] || "bg-gray-100 text-gray-800";
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Code Explainer</h1>
          <p className="text-lg text-gray-600">Understand any code in plain English</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Code</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programming Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="php">PHP</option>
                <option value="ruby">Ruby</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`Paste your ${language} code here...`}
              className="w-full h-80 font-mono text-sm border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleExplainCode}
              disabled={loading || !code.trim()}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Analyzing Code..." : "Explain This Code"}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Explanation</h2>
            
            {explanation ? (
              explanation.error ? (
                <div className="text-red-600">{explanation.error}</div>
              ) : (
                <div className="space-y-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getComplexityColor(explanation.complexity)}`}>
                    {explanation.complexity} level
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Explanation:</h3>
                    <p className="text-gray-700 leading-relaxed">{explanation.explanation}</p>
                  </div>

                  {explanation.keyConcepts && explanation.keyConcepts.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Key Concepts:</h3>
                      <div className="flex flex-wrap gap-2">
                        {explanation.keyConcepts.map((concept, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {explanation.improvements && explanation.improvements.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Suggested Improvements:</h3>
                      <ul className="space-y-2">
                        {explanation.improvements.map((improvement, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-400">
                {loading ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p>AI is analyzing your code...</p>
                  </div>
                ) : (
                  <p>Code explanation will appear here</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}