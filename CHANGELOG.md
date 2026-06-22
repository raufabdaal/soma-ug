# Changelog

All notable changes to this project. Newest first.

## [0.4.0] - 2026-06-22

### Added
- Multi-step onboarding flow (`/onboarding`): role selection, auth (Google or email), details (level + subjects for students, study code for parents), welcome screen.
- Favicon (SVG book mark in Soma brand colors).
- Responsive CSS overrides in globals.css for all screen sizes.
- Updated Firestore rules (MT-002) that fix parent signup and student code linking.

### Changed
- Root URL (`/`) now redirects to `/login` instead of showing the landing page.
- Login page links to `/onboarding` instead of `/signup`.
- Student nav shows icons on mobile (text hidden on small screens).
- Parent dashboard study code linking now uses proper Firestore imports and readable error messages.

### Fixed
- Parent signup: was failing because Firestore rules had no rule for the `parents/` collection. Fixed in MT-002.
- Student code linking: was failing because rules blocked parents from reading student documents. Fixed in MT-002.
- Mobile responsiveness: grid layouts now collapse to single column on mobile, padding reduced, stat rows stack vertically.

## [0.3.0] - 2026-06-22

### Added
- Google sign-in / sign-up on both login and signup pages.
- Shared auth UI components (AuthShell, Field, Divider, ErrorBox, SetupWarning).
- `GoogleButton` component with proper Google branding.
- `authErrorToMessage()` translator that surfaces readable error messages for all known Firebase errors.
- MT-004: manual task for enabling Email/Password and Google sign-in methods in Firebase Console.

### Fixed
- Signup/login errors now show the actual cause (was hidden behind "Something went wrong").

## [0.2.0] - 2026-06-22

### Added
- Landing page, login, signup, dashboard redirect, student dashboard, parent dashboard, learn page, practice page.
- Firebase config (env-based), auth context, Groq AI library, prompt templates.

## [0.1.0] - 2026-06-22

### Added
- Project structure, design system, config files, living docs.
