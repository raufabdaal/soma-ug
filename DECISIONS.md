# Decisions

> Append-only log of design and architecture decisions. Never edit historical entries. If a decision is reversed, write a new entry that supersedes it.

---

## DEC-001 · 2026-06-22 · Fresh start over evolving soma-edu

**Decision:** Start a new project from scratch rather than refactoring the existing `soma-edu` repo.

**Reasoning:** The old repo had a broken AI integration (env var name mismatch that made every AI request fail silently), generic default design (shadcn indigo/violet + glassmorphism that reads as "AI-made"), and unseeded content. Untangling these was riskier than a clean build. We keep the good bones: the data model concept, the Firebase project, and the free-tier philosophy.

**Files affected:** Entire new project structure.

---

## DEC-002 · 2026-06-22 · Design system: V1 editorial minimalist

**Decision:** The design language is "editorial minimalism." Warm cream foundation (#FBF8F3), deep charcoal text (#2B2926, never pure black), earthy accents used sparingly as subject identity (terracotta = Math, sage = Biology, dusty blue = Chemistry). Serif headlines (Fraunces) paired with clean sans body (Inter). Large rounded corners, soft shadows, continuous-line SVG art.

**Reasoning:** The founder's inspiration references pointed to calm, premium, editorial design (think print magazine meets modern tech). This is the opposite of the default AI-generated look (indigo gradients, glassmorphism). V1 is intentionally simple; we can add sophistication (interactive workspaces, mixed-media headers, architectural photography) in later iterations.

**Supersedes:** The soma-edu indigo/violet glassmorphism system (that was never formally logged).

**Files affected:** `preview.html`, `src/app/globals.css`, `tailwind.config.ts`, all page components.

---

## DEC-003 · 2026-06-22 · AI provider: Groq (free, pluggable)

**Decision:** Use Groq (Llama 3.3 70B, free tier, no card) as the AI provider for marking and tutoring. The provider is abstracted behind a single config module so swapping to a paid provider (Claude, GPT) later is a one-env-var change, not a refactor.

**Reasoning:** The founder has a tight budget. Free-tier AI is sufficient for the citation-following marking feedback. The old repo's fatal flaw was a broken AI integration; this time the provider is correctly wired and documented.

**Supersedes:** soma-edu's Gemini/Nvidia confusion (code used Gemini, docs said Nvidia, neither worked).

**Files affected:** `src/lib/ai/`, `.env.example`, API routes.

---

## DEC-004 · 2026-06-22 · Firebase config via env vars (not hardcoded)

**Decision:** Firebase configuration reads from `NEXT_PUBLIC_FIREBASE_*` environment variables. Never hardcoded in source.

**Reasoning:** The old repo had Firebase keys hardcoded in `src/lib/firebase/config.ts`. While Firebase web keys are designed to be public (security comes from Firestore rules, not key secrecy), hardcoding them makes it impossible to switch projects and is bad practice. Env vars are the standard approach.

**Files affected:** `src/lib/firebase/config.ts`, `.env.example`.

---

## DEC-005 · 2026-06-22 · No em dashes in user-facing copy

**Decision:** Em dashes (the long dashes) are banned in all user-visible text. Use regular hyphens, parentheses, or restructure the sentence.

**Reasoning:** In 2026, em dashes are a strong "AI-generated" signal to readers. The founder's dev journal explicitly flags this. Internal docs (CHANGELOG, etc.) can keep them since users never see those.

**Files affected:** All page components, lesson content, AI prompt templates (for output guidance).
