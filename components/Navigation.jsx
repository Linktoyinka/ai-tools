"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tools = [
    { name: "Text Summarizer", href: "/", icon: "📝" },
    { name: "Paraphrasing Tool", href: "/paraphrase", icon: "✍️" },
    { name: "Grammar Checker", href: "/grammar", icon: "✓" },
    { name: "Blog Idea Generator", href: "/blog-ideas", icon: "💡" },
    { name: "Code Explainer", href: "/explain-code", icon: "💻" },
    { name: "Text Translator", href: "/translate", icon: "🌐" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white border-b relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-xl text-gray-800">AI Tools</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === tool.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={closeMobileMenu}
                  className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    pathname === tool.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3 text-lg">{tool.icon}</span>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
