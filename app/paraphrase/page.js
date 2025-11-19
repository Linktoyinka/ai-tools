"use client";
import React, { useState, useRef } from "react";

export default function Paraphrase() {
  const [input, setInput] = useState("");
  const [paraphrased, setParaphrased] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("formal");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  async function handleParaphrase() {
    if (!input.trim()) return;

    setLoading(true);
    setParaphrased("");

    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone }),
      });

      if (!res.ok) throw new Error('Failed to paraphrase');
      
      const data = await res.json();
      setParaphrased(data.paraphrased);
    } catch (error) {
      console.error('Error:', error);
      setParaphrased("Sorry, there was an error paraphrasing your text. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const copyText = async () => {
    if (paraphrased && outputRef.current) {
      await navigator.clipboard.writeText(paraphrased);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput("");
    setParaphrased("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto text-center mb-8 pt-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Paraphrasing Tool</h1>
        <p className="text-lg text-gray-600">Rewrite text in different tones while preserving meaning</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Original Text</h2>
            <button
              onClick={clearAll}
              className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Clear All
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tone:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="academic">Academic</option>
            </select>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to paraphrase..."
            className="w-full h-64 border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleParaphrase}
            disabled={loading || !input.trim()}
            className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Paraphrasing..." : "Paraphrase Text"}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Paraphrased Text</h2>
            {paraphrased && (
              <button
                onClick={copyText}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
            )}
          </div>

          <div
            ref={outputRef}
            className="h-64 border border-gray-300 rounded-lg p-4 overflow-y-auto bg-gray-50"
          >
            {paraphrased ? (
              <p className="text-gray-700 whitespace-pre-wrap">{paraphrased}</p>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                {loading ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p>Paraphrasing your text...</p>
                  </div>
                ) : (
                  <p>Your paraphrased text will appear here</p>
                )}
              </div>
            )}
          </div>

          {paraphrased && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                Text paraphrased in <span className="font-semibold">{tone}</span> tone
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}