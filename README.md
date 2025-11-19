# Next.js App (AI Tools)

Small Next.js app with AI-assisted pages and utilities.

## Quick start

1. Install dependencies:
```sh
npm install
```

2. Run dev server:
```sh
npm run dev
```
(See scripts in [package.json](package.json).)

## Key files

- App entry/layout: [`app.layout`](app/layout.js) — [app/layout.js](app/layout.js)  
- Root page: [`app.page`](app/page.js) — [app/page.js](app/page.js)  
- Navigation component: [`Navigation`](components/Navigation.jsx) — [components/Navigation.jsx](components/Navigation.jsx)  
- API routes: [app/api](app/api)  
- Feature pages:
  - Blog ideas: [app/blog-ideas/page.js](app/blog-ideas/page.js)  
  - Explain code: [app/explain-code/page.js](app/explain-code/page.js)  
  - Grammar: [app/grammar/page.js](app/grammar/page.js)  
  - Paraphrase: [app/paraphrase/page.js](app/paraphrase/page.js)  
  - Text summary: [app/text-summary/page.js](app/text-summary/page.js)  
  - Translate: [app/translate/page.js](app/translate/page.js)

## Styling

Global CSS lives in [app/globals.css](app/globals.css).

## Build & Deploy

- Build: `npm run build` (configured in [package.json](package.json))
- Production preview: `npm start`

## Notes

- This project uses Next.js app router; see [app/layout.js](app/layout.js) and [app/page.js](app/page.js) for structure.
- Public assets: [public](public)

## Contributing

Open a PR, add tests, and ensure dev server builds.
