# Changelog

All notable changes to this project. Newest first.

## [0.7.0] - 2026-06-23

### Added
- Left sidebar navigation for desktop (both student and parent). Bottom nav stays for mobile.
- Diagnostic test (5 questions across Math, Biology, Chemistry) that sets the student's baseline grade.
- Progress tracking wired to Firestore: lesson completions are saved, predicted grades update automatically based on average scores.
- Student dashboard reads real data: lessons completed, guarantee progress, predicted grades.
- Parent dashboard reads real student data: lessons completed, maths grade, guarantee progress.
- 2 more Mathematics lessons: "Linear equations" and "Factorising expressions" (4 total now).
- Diagnostic banner on student dashboard (shows until completed).
- Results screen after diagnostic showing baseline grades per subject.

### Changed
- Navigation architecture rebuilt: app shell with sidebar + content area.
- Student dashboard quick stats now show real lesson count.
- Parent dashboard stats now show real student data.
- Updated Firestore rules (MT-002) to allow lesson progress subcollection writes.

## [0.6.0] - 2026-06-23

### Added
- Parent bottom nav, reports page, settings page.
- Student profile/settings page.

## [0.5.0] - 2026-06-22

### Added
- Lesson player, AI marking, AI tutor, mastery gate, mobile bottom nav.

## [0.4.0] - 2026-06-22

### Added
- Multi-step onboarding, favicon, responsive CSS, updated Firestore rules.

## [0.3.0] - 2026-06-22

### Added
- Google sign-in, shared auth UI, error translator.

## [0.2.0] - 2026-06-22

### Added
- All core pages, Firebase auth, Groq AI library.

## [0.1.0] - 2026-06-22

### Added
- Project structure, design system, config files, living docs.
