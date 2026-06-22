# Handoff

> Snapshot for the next session. Overwrite this each time.

## Where we are

The foundation is built and the production build passes. We have 9 routes that all compile and prerender: landing, login, signup, dashboard redirect, student dashboard, student learn, student practice, and parent dashboard. Firebase auth is wired (env-based). Groq AI lib is ready. The app cannot function yet because it needs real API keys in `.env.local`.

## Immediate next steps

1. **Deploy to Vercel** to get a live URL (the founder needs to create a GitHub repo and push).
2. **Founder completes MANUAL_TASKS.md**: MT-001 (env keys), MT-002 (Firestore rules), MT-003 (authorized domain).
3. **Build the first complete loop**: a Mathematics lesson with the lesson player, a practice question, and the AI marking endpoint wired to Groq.
4. **Populate curriculum content** in Firestore (subjects, topics, lessons, questions).

## How to run locally

```bash
npm install
npm run dev    # opens at http://localhost:3000
```

Or double-click `preview.html` to see the design system without installing anything.

## Key decisions to respect

- Design is V1 (warm cream, charcoal text, terracotta/sage/blue subject colors, Fraunces serif + Inter sans). See DECISIONS.md.
- Firebase config reads from env vars, never hardcoded. See DEC-004.
- AI provider is Groq, pluggable via env var. See DEC-003.
- No em dashes in user-facing copy. See DEC-005.
