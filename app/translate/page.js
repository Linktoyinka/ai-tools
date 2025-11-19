"use client";
import React, { useState, useRef } from "react";

export default function Translator() {
  const [input, setInput] = useState("");
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("spanish");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const languages = [
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "italian", label: "Italian" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
    { value: "hindi", label: "Hindi" }
  ];

  async function handleTranslate() {
    if (!input.trim()) return;

    setLoading(true);
    setTranslation(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, targetLanguage }),
      });

      if (!res.ok) throw new Error('Failed to translate');
      
      const data = await res.json();
      setTranslation(data);
    } catch (error) {
      console.error('Error:', error);
      setTranslation({ error: "Failed to translate text" });
    } finally {
      setLoading(false);
    }
  }

  const copyTranslation = async () => {
    if (translation?.translated) {
      await navigator.clipboard.writeText(translation.translated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-teal-50 to-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Text Translator</h1>
          <p className="text-lg text-gray-600">Translate text between multiple languages instantly</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Original Text</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translate to:
              </label>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full h-64 border border-gray-300 rounded-lg p-4 resize-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              onClick={handleTranslate}
              disabled={loading || !input.trim()}
              className="w-full mt-4 bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400"
            >
              {loading ? "Translating..." : "Translate Text"}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Translation</h2>
              {translation?.translated && (
                <button
                  onClick={copyTranslation}
                  className="px-3 py-1 text-sm bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 flex items-center gap-2"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              )}
            </div>

            <div
              ref={outputRef}
              className="h-64 border border-gray-300 rounded-lg p-4 overflow-y-auto bg-gray-50"
            >
              {translation ? (
                translation.error ? (
                  <div className="text-red-600">{translation.error}</div>
                ) : (
                  <div>
                    <p className="text-gray-700 whitespace-pre-wrap mb-4">
                      {translation.translated}
                    </p>
                    {/* <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                      <p className="text-sm text-teal-700">
                        Translated from {translation.sourceLanguage} to {translation.targetLanguage}
                      </p>
                    </div> */}
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  {loading ? (
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p>Translating your text...</p>
                    </div>
                  ) : (
                    <p>Your translation will appear here</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Grid */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Supported Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.value}
                className={`p-3 text-center rounded-lg border ${
                  targetLanguage === lang.value
                    ? "bg-teal-100 border-teal-300 text-teal-800"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                {lang.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}