AI Tools Suite - Next.js Application
=====================================

A comprehensive collection of AI-powered tools built with Next.js, designed to enhance productivity and simplify complex tasks using artificial intelligence.

✨ FEATURES
===========

Available AI Tools:
-------------------
1. 📝 Text Summarizer - Convert lengthy articles and documents into concise summaries
2. ✍️ Paraphrasing Tool - Rewrite text in different tones (formal, casual, creative, academic)
3. ✓ Grammar Checker - Detect and correct grammar, spelling, and punctuation errors
4. 💡 Blog Idea Generator - Overcome writer's block with creative blog post ideas and outlines
5. 💻 Code Explainer - Understand any code in plain English with complexity analysis
6. 🌐 Text Translator - Translate text between multiple languages with context preservation

Key Features:
-------------
- Modern UI/UX with Tailwind CSS
- Real-time AI processing
- Copy & export functionality
- Mobile-friendly responsive design
- Comprehensive error handling
- Beautiful loading states

🏗️ PROJECT STRUCTURE
=====================
```
ai-tools-suite/
├── app/
│   ├── api/
│   │   ├── summarize/route.js
│   │   ├── paraphrase/route.js
│   │   ├── grammar/route.js
│   │   ├── blog-ideas/route.js
│   │   ├── explain-code/route.js
│   │   └── translate/route.js
│   ├── (pages)/
│   │   ├── page.js (Text Summarizer)
│   │   ├── paraphrase/page.js
│   │   ├── grammar/page.js
│   │   ├── blog-ideas/page.js
│   │   ├── explain-code/page.js
│   │   └── translate/page.js
│   ├── layout.js
│   └── globals.css
├── components/
│   └── Navigation.jsx
├── public/
└── package.json
```

🚀 QUICK START
===============

Prerequisites:
--------------
- Node.js 18+
- npm or yarn
- Groq API key (get from https://console.groq.com/)

Installation:
-------------
1. Clone and install dependencies:
   git clone <your-repo-url>
   cd ai-tools-suite
   npm install

2. Set up environment variables:
   Create .env.local file and add:
   GROQ_API_KEY=your_groq_api_key_here

3. Run development server:
   npm run dev

4. Open browser: http://localhost:3000

🛠️ DEVELOPMENT
===============

Available Scripts:
------------------
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint

File Overview:
--------------
- app/layout.js - Root layout with navigation
- app/page.js - Text summarizer tool (homepage)
- app/paraphrase/page.js - Paraphrasing tool
- app/grammar/page.js - Grammar checker
- app/blog-ideas/page.js - Blog idea generator
- app/explain-code/page.js - Code explanation tool
- app/translate/page.js - Text translator
- components/Navigation.jsx - Responsive navigation

API Routes:
-----------
Each tool has corresponding API route:
- app/api/summarize/route.js - Text summarization
- app/api/paraphrase/route.js - Text paraphrasing
- app/api/grammar/route.js - Grammar checking
- app/api/blog-ideas/route.js - Blog idea generation
- app/api/explain-code/route.js - Code explanation
- app/api/translate/route.js - Text translation

🔧 CONFIGURATION
================

Groq AI Integration:
--------------------
Each API route follows this pattern:
```
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { input } = await req.json();
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "Your system prompt" },
        { role: "user", content: `Process: ${input}` },
      ],
      temperature: 0.7,
    });
    return Response.json({ result: completion.choices[0].message.content });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```
Supported AI Models:
--------------------
- Llama 3.1 8B Instant - Fast, efficient for most tasks
- Llama 3.1 70B Versatile - Higher quality
- Mixtral 8x7B - Complex reasoning tasks

🎨 UI COMPONENTS
================

Navigation:
-----------
- Desktop menu with hover states
- Mobile hamburger menu with overlay
- Active state indicators
- Smooth transitions

Tool Interfaces:
----------------
- Clean input/output areas
- Loading states with spinners
- Error handling with user-friendly messages
- Copy-to-clipboard functionality
- Responsive grid layouts

🌐 DEPLOYMENT
=============

Vercel (Recommended):
---------------------
1. Push code to GitHub
2. Connect repo to Vercel (https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Other Platforms:
----------------
npm run build  # Build application
npm start     # Start production server

Supported platforms:
- Vercel
- Netlify
- Railway
- Digital Ocean App Platform
- Any Node.js hosting service

🔒 ENVIRONMENT VARIABLES
========================

GROQ_API_KEY        - Your Groq API key (Required)
NEXT_PUBLIC_APP_URL - Your app's URL for CORS (Optional)

📱 BROWSER SUPPORT
==================

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

🤝 CONTRIBUTING
===============

How to contribute:
------------------
1. Fork the repository
2. Create feature branch: git checkout -b feature/amazing-tool
3. Commit changes: git commit -m 'Add amazing tool'
4. Push branch: git push origin feature/amazing-tool
5. Open Pull Request

Adding New Tools:
-----------------
1. Create API route: app/api/new-tool/route.js
2. Create page: app/new-tool/page.js
3. Update navigation in components/Navigation.jsx

🐛 TROUBLESHOOTING
==================

Common Issues:
--------------
1. API Key Errors:
   - Verify Groq API key is correct
   - Check environment variables in .env.local

2. Build Errors:
   - Clear Next.js cache: rm -rf .next
   - Reinstall dependencies: npm install

3. CORS Issues:
   - Ensure environment variables are properly set
   - Check API route configurations


Getting Help:
-------------
- Open issue on GitHub for bug reports
- Check existing issues for solutions
- Review Next.js documentation: https://nextjs.org/docs

📄 LICENSE
==========

This project is licensed under the MIT License.

🙏 ACKNOWLEDGMENTS
==================

- Groq (https://groq.com) for lightning-fast AI inference
- Next.js (https://nextjs.org) for React framework
- Tailwind CSS (https://tailwindcss.com) for utility-first CSS

📞 SUPPORT
==========

If you need help:
1. Check this documentation
2. Open issue on GitHub
3. Review code examples in each tool

---

Built with ❤️ using Next.js and Grok AI