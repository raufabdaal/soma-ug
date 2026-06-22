# Status

## Current phase

**Phase 1: Foundation complete. Ready to deploy + connect keys.**

## What is done

### Foundation
- [x] Design system locked (V1, editorial minimalist). See `preview.html` and `DECISIONS.md`.
- [x] Project structure created (Next.js 14 + TypeScript + Tailwind).
- [x] Config files in place (package.json, tailwind, tsconfig, env template).
- [x] Living docs set up (START_HERE, STATUS, HANDOFF, CHANGELOG, DECISIONS, MANUAL_TASKS).
- [x] Design system coded as real CSS (`src/app/globals.css`).

### Pages (all build and prerender)
- [x] Landing page (hero, guarantee, subjects) - `/`
- [x] Login page - `/login`
- [x] Signup page (with student/parent role selection) - `/signup`
- [x] Role-based dashboard redirect - `/dashboard`
- [x] Student dashboard (predicted grade, guarantee meter, continue learning, subjects, study code) - `/student`
- [x] Student learn page (subject list) - `/student/learn`
- [x] Student practice page (placeholder) - `/student/practice`
- [x] Parent dashboard (study code linking, stats, alerts) - `/parent`

### Infrastructure
- [x] Firebase config (env-based, not hardcoded). See DEC-004.
- [x] Auth context (signup, login, logout, profile creation).
- [x] Student profile auto-created on signup (with study code).
- [x] Parent-student linking via study code.
- [x] Groq AI lib (pluggable, env-based). See DEC-003.
- [x] AI prompt templates (tutor + marking).

## What is blocked

- **MT-001**: `.env.local` needs real Firebase + Groq keys. Without these, login and AI will not work.
- **MT-002**: Firestore security rules need to be applied.
- **MT-003**: Domain needs to be authorized in Firebase Auth (after first deploy).

## What is next

1. Deploy to Vercel (get a live URL).
2. Founder completes MT-001, MT-002, MT-003.
3. Build the first complete learning loop (Mathematics lesson + AI marking).
4. Populate curriculum content.
