# Desert Pulse

**Community business intelligence for Al Qua'a.**
Desert Pulse turns anonymous resident feedback into evidence-backed business
opportunities — so entrepreneurs in rural communities stop guessing and start
building what's actually needed.

Built for the **Tatweer Hackathon · Challenge 3: The Data Gap for Local Entrepreneurs.**

---

## What it does

1. **Listen** — Residents answer a few short, anonymous questions about what their community is missing.
2. **Analyze** — Responses are clustered into ranked, scored business opportunities, each traceable to real input.
3. **Launch** — Entrepreneurs get a full business plan: costs, customers, marketing, and a 30-day roadmap.

Key features:

- **Bilingual (English / العربية)** with full right-to-left layout.
- **Accessibility built in** — high-contrast mode, adjustable text size, and page narration (text-to-speech), all in a single settings panel.
- **Pulse AI coach** — an in-app assistant scoped strictly to entrepreneurship and getting-started questions.
- **Evidence dashboard, demand heatmap, opportunity marketplace, and a launch-roadmap generator.**

---

## Tech stack

- **React 18** + **Vite 5**
- **recharts** (data visualisation)
- **lucide-react** (icons)
- The **Pulse** AI coach calls Anthropic's Messages API (via a proxy or a direct dev call).

No CSS framework — the design system (colors, typography, components) ships inside `src/App.jsx`.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (for the Pulse AI coach)
cp .env.example .env
#    then open .env and fill in the values

# 3. Run the dev server
npm run dev

# 4. Build for production
npm run build
npm run preview
```

The app runs fully without any API key — only the **Pulse AI coach** needs one.

---

## Environment & the Pulse AI coach

The coach needs access to Anthropic's API. You have two options (see `.env.example`):

- **Recommended — a proxy (`VITE_API_PROXY_URL`).** Point this at your own
  serverless function that holds the key **server-side** and forwards the
  request to `https://api.anthropic.com/v1/messages`. This keeps your key secret.
- **Local dev only — a direct key (`VITE_ANTHROPIC_API_KEY`).** Anything in a
  `VITE_`-prefixed variable is **bundled into the browser bundle and is publicly
  visible.** Use this only on your own machine, and never deploy with it.

> ⚠️ **Never commit a real `.env`.** It is already in `.gitignore`. If a key is
> ever exposed, rotate it immediately.

A minimal proxy (e.g. a Vercel/Netlify function) just needs to read the JSON
body, add the `x-api-key` and `anthropic-version` headers, POST it to Anthropic,
and return the response.

---

## Project structure

```
desert-pulse/
├── README.md
├── index.html              # Vite entry HTML
├── package.json
├── vite.config.js
├── .env.example            # copy to .env (never commit the real one)
├── .gitignore
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx            # React entry
│   ├── App.jsx             # the full integrated app (bilingual + accessible)
│   ├── index.css           # minimal global base styles
│   └── components/         # standalone, reusable versions of the core features
│       ├── FeedbackForm.jsx
│       ├── Heatmap.jsx
│       └── RoadmapGenerator.jsx
└── docs/                   # judged documentation
    ├── user-testing.md
    ├── simulation-results.md
    ├── roadmap-validation.md
    ├── lighthouse.png
    └── screenshots/
        ├── form.png
        ├── heatmap.png
        └── roadmap.png
```

**A note on `src/components/`:** `App.jsx` is the complete, production app and is
self-contained. The files under `components/` are clean, standalone
implementations of the three flagship features (feedback, heatmap, roadmap) kept
separate so they can be embedded, unit-tested, or demoed in isolation. Import
them anywhere, e.g. `import FeedbackForm from "./components/FeedbackForm.jsx"`.

---

## Documentation

The `docs/` folder contains the materials judged for the 10-point documentation
criterion. **Replace the bracketed placeholders and the placeholder images with
your real results and screenshots before submission.**

- [`docs/user-testing.md`](docs/user-testing.md) — how the app was tested with users and what was learned.
- [`docs/simulation-results.md`](docs/simulation-results.md) — how community responses become scored opportunities.
- [`docs/roadmap-validation.md`](docs/roadmap-validation.md) — how the generated roadmaps were checked against reality.
- `docs/lighthouse.png` — your Lighthouse audit screenshot.
- `docs/screenshots/` — UI screenshots of the form, heatmap, and roadmap.

---

## License

Prepared for the Tatweer Hackathon. Add a license of your choice (e.g. MIT) before publishing.
