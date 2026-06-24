# START HERE

> You are a new person (or a new agent session). Read this file first. It tells you exactly what this project is and how to get running in under 60 seconds.

## What is Soma?

Soma is a premium interactive learning platform for Uganda's new competency-based lower secondary curriculum (S1-S4). It teaches students the way UNEB actually marks them, tracks progress toward an 80% grade guarantee, and gives parents full visibility.

## Tech stack (in plain English)

- **Next.js** (React framework) with TypeScript. This is the app.
- **Tailwind CSS** for styling, plus a custom design system in `src/app/globals.css`.
- **Firebase** for login (auth) and data storage (Firestore). Free tier.
- **Groq** for AI marking and tutoring (Llama 3.3, free, no card). Pluggable for a paid upgrade later.
- **Vercel** for hosting. Free tier. Auto-deploys on every `git push`.

## How to run locally

```bash
npm install      # first time only, installs dependencies
npm run dev      # starts the dev server
```

Then open http://localhost:3000

Or just double-click `preview.html` to see the design system without installing anything.

## Folder map

```
soma/
├─ START_HERE.md        you are here
├─ preview.html         design system, double-click to view
├─ STATUS.md            what is done, what is next
├─ HANDOFF.md           snapshot for the next session
├─ CHANGELOG.md         dated history
├─ DECISIONS.md         design + architecture decisions log
├─ MANUAL_TASKS.md      things only a human can do
├─ .env.example         template for secrets (copy to .env.local)
│
├─ src/                 all code lives here
│  ├─ app/              pages and routes (Next.js App Router)
│  ├─ components/       reusable UI components
│  ├─ lib/              firebase config, AI config, utilities
│  ├─ context/          React contexts (auth state)
│  ├─ hooks/            custom React hooks
│  └─ types/            TypeScript type definitions
│
├─ content/             curriculum data, lesson content (separate from code)
├─ docs/                specs, ops guides, saved prompts
│  ├─ spec/             product requirements, design philosophy
│  ├─ ops/              deployment guides, secrets guide
│  └─ prompts/          reusable AI prompts
└─ uploads/             reference material (gitignored, not in repo)
```

## Before you start working

1. Read `STATUS.md` to see where we are.
2. Read `HANDOFF.md` for the immediate next step.
3. Check `MANUAL_TASKS.md` for anything blocked waiting on a human.
4. Read `DECISIONS.md` if you are about to change a design or architecture choice.
