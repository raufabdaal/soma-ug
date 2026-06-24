# Changelog

All notable changes. Newest first.

## [0.9.0] - 2026-06-23

### Added
- **Lesson stepper**: paginated one-block-at-a-time navigation with progress bar, step dots, and Next/Back buttons. Kills the PDF scroll feel. Questions must be answered before advancing.
- **Practice engine**: dedicated practice mode with topic grid, pre-written question banks (MCQ + AI-marked short answers), endless AI question generation when bank is exhausted, XP tracking, streak tracking, per-topic accuracy, and mastery levels.
- **XP system**: 10 XP (easy), 15 XP (medium), 20 XP (hard) per correct answer. Tracked in Firestore.
- **Practice streaks**: daily consecutive practice tracking with streak display.
- **Mastery levels**: Not Started, Beginner, Developing, Proficient, Mastered based on practice accuracy.
- **AI practice generator** (`/api/ai/practice`): generates fresh practice questions per topic when the pre-written bank is exhausted.
- **Grade prediction from practice**: `predictGradeFromPractice()` calculates weighted accuracy across all practiced topics. This replaces lesson-completion-based prediction and is more robust for the guarantee.
- Practice question banks for 5 topics (Number Bases, Integers, Fractions, Algebra 1, Business Arithmetic).

### Changed
- LessonPlayer completely rewritten as a stepper (was a long scroll).
- Practice page completely rebuilt (was a placeholder).
- StudentProfile type extended with totalXP, questionsAnswered, practiceStreak.

## [0.8.0] - 2026-06-23
- Complete S1 Mathematics curriculum (14 topics). Competency-based lesson blocks.

## [0.7.0] - 2026-06-23
- Left sidebar nav, diagnostic test, progress tracking, audio narration, real metrics.

## [0.6.0] - 2026-06-23
- Parent reports, settings pages, student settings.

## [0.5.0] - 2026-06-22
- Lesson player, AI marking, AI tutor, mastery gate, mobile nav.

## [0.4.0] - 2026-06-22
- Multi-step onboarding, favicon, responsive CSS, Firestore rules.

## [0.3.0] - 2026-06-22
- Google sign-in, shared auth UI, error translator.

## [0.2.0] - 2026-06-22
- Core pages, Firebase auth, Groq AI library.

## [0.1.0] - 2026-06-22
- Project structure, design system, config files, living docs.
