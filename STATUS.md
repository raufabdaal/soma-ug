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

- **MT-002 (CRITICAL)**: Replace old Firestore rules with the updated ones. Fixes parent signup AND student code linking. The founder needs to paste the new rules into Firebase Console.
- **MT-004**: Enable Email/Password AND Google in Firebase Auth (likely done).
- **MT-001**: `.env.local` keys (done, site is live).
- **MT-003**: Vercel domain authorized in Firebase Auth (likely done).

## What is next

1. Founder replaces Firestore rules (MT-002).
2. Push new code to GitHub (onboarding, mobile fixes, favicon).
3. Test the full flow on mobile and desktop.
4. Build the Mathematics lesson player + AI marking.
