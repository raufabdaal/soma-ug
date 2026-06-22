# Changelog

All notable changes to this project. Newest first.

## [0.2.0] - 2026-06-22

### Added
- Landing page with hero, guarantee band, and subject identity cards.
- Login page with clean underline-style inputs and error handling.
- Signup page with student/parent role selector.
- Role-based dashboard redirect (`/dashboard`).
- Student dashboard: predicted grade, guarantee meter (with 80% target), continue learning card, subject tiles, and study code display for parent linking.
- Student learn page (subject list) and practice page (placeholder).
- Parent dashboard: study code linking interface, weekly stats card, needs-attention alert.
- Firebase config (env-based, with graceful fallback when keys are missing).
- Auth context (signup creates user + student/parent profiles, login, logout).
- Parent-student linking via 6-character study codes.
- Groq AI library (pluggable, with marking response parser).
- AI prompt templates (tutor + marking).
- Utility functions (study code generation, time formatting, grade conversion).
- TypeScript type definitions for all data models.

### Changed
- Design system ported from `preview.html` to production Tailwind/CSS (`globals.css`).

## [0.1.0] - 2026-06-22

### Added
- Project structure created (Next.js 14 + TypeScript + Tailwind).
- Design system locked at V1 (editorial minimalist: warm cream, charcoal, earthy accents).
- Config files: package.json, tailwind.config.ts, tsconfig.json, next.config.mjs, postcss.
- Living docs: START_HERE.md, STATUS.md, HANDOFF.md, CHANGELOG.md, DECISIONS.md, MANUAL_TASKS.md.
- `.env.example` template (Firebase, Groq, Resend, internal secrets).
- `preview.html` - self-contained design preview (double-click to view).

### Context
This is a fresh start, replacing the earlier `soma-edu` repo which had a broken AI integration, generic design, and unseeded content. We kept the data model concept and Firebase project but started over for a clean, intentional build.
