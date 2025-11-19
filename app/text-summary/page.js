"use client";
import ReactMarkdown from "react-markdown";
import { useState, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const summaryRef = useRef(null);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  const clearInput = () => {
    setInput("");
    setWordCount(0);
    setCharCount(0);
    setSummary("");
    setCopied(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const copySummary = async () => {
    if (summary && summaryRef.current) {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = summaryRef.current.innerHTML;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        await navigator.clipboard.writeText(plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const clearSummary = () => {
    setSummary("");
    setCopied(false);
  };

  async function handleSummarize() {
    if (!input.trim()) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        throw new Error('Failed to summarize text');
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary("Sorry, there was an error generating the summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12 pt-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          AI Text Summarizer
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform lengthy articles, documents, and texts into concise summaries 
          with our advanced AI technology. Save time and grasp key insights instantly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Your Text</h2>
            <div className="flex gap-2">
              <button
                onClick={clearInput}
                disabled={!input.trim()}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mb-4 flex justify-between text-sm text-gray-500">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>

          <textarea
            ref={textareaRef}
            className="w-full border border-gray-300 p-4 rounded-xl h-80 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Paste your article, document, or any text you want to summarize here..."
            value={input}
            onChange={handleInputChange}
          />

          <button
            onClick={handleSummarize}
            disabled={loading || !input.trim()}
            className="w-full mt-4 bg-linear-to-br from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Summarizing...
              </div>
            ) : (
              "Generate Summary"
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">AI Summary</h2>
            <div className="flex gap-2">
              {summary && (
                <>
                  <button
                    onClick={copySummary}
                    className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearSummary}
                    className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          <div 
            ref={summaryRef}
            className="h-80 border border-gray-300 rounded-xl p-4 overflow-y-auto bg-gray-50"
          >
            {summary ? (
              <div className="prose max-w-none">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                {loading ? (
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p>AI is analyzing your text...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Your summary will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {summary && !loading && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Summary generated successfully
            </div>
          )}
        </div>
      </div>

      
    </main>
  );
}