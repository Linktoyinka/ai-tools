"use client";
import React, { useState } from "react";

export default function GrammarChecker() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheckGrammar() {
    if (!input.trim()) return;

    setLoading(true);
    
    try {
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) throw new Error('Failed to check grammar');
      
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setResults({ errors: [], error: "Failed to check grammar" });
    } finally {
      setLoading(false);
    }
  }

  const getErrorColor = (type) => {
    const colors = {
      grammar: "bg-yellow-100 border-yellow-300",
      spelling: "bg-red-100 border-red-300",
      punctuation: "bg-blue-100 border-blue-300",
      style: "bg-purple-100 border-purple-300"
    };
    return colors[type] || "bg-gray-100 border-gray-300";
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Grammar Checker</h1>
          <p className="text-lg text-gray-600">Find and fix grammar, spelling, and punctuation errors</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here to check for grammar and spelling errors..."
            className="w-full h-48 border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-orange-500"
          />

          <button
            onClick={handleCheckGrammar}
            disabled={loading || !input.trim()}
            className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:bg-gray-400"
          >
            {loading ? "Checking..." : "Check Grammar & Spelling"}
          </button>
        </div>

        {results && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            
            {results.error ? (
              <div className="text-red-600">{results.error}</div>
            ) : results.errors.length === 0 ? (
              <div className="text-green-600 text-center py-8">
                <div className="text-6xl mb-4">✓</div>
                <p className="text-xl font-semibold">No errors found!</p>
                <p className="text-gray-600">Your text looks perfect.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    Found {results.errors.length} issue{results.errors.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {results.errors.map((error, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${getErrorColor(error.type)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold capitalize">{error.type} Error</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-red-600 line-through">{error.original}</span>
                      <span className="mx-2">→</span>
                      <span className="text-green-600 font-semibold">{error.suggestion}</span>
                    </div>
                    <p className="text-sm text-gray-600">{error.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}