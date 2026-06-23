# Status

## Current phase

**Phase 1: Core learning loop working. Content + polish.**

## What is done

### Navigation
- [x] Desktop: left sidebar (student + parent)
- [x] Mobile: bottom nav (student + parent)

### Student experience
- [x] Dashboard (real data: predicted grade, guarantee progress, lessons completed, quick stats)
- [x] Diagnostic test (5 questions, sets baseline, saves to Firestore)
- [x] Learn page (4 Mathematics lessons)
- [x] Lesson player (interactive blocks, instant feedback, mastery gate, saves progress to Firestore)
- [x] AI tutor chat in lessons
- [x] Profile/settings (account, study code, signout)

### Parent experience
- [x] Dashboard (study code linking, real student data)
- [x] Reports (weekly report card, download, share)
- [x] Settings (profile, linked students, signout)

### Infrastructure
- [x] Firebase auth (Google + email/password)
- [x] Multi-step onboarding
- [x] Groq AI (tutor + marking routes)
- [x] Progress tracking (Firestore: lesson completion, predicted grades, guarantee progress)
- [x] Favicon

## What is next

1. Push, test the full loop (diagnostic + lessons + parent sees data).
2. Add Biology and Chemistry lessons.
3. Connect parent reports to real student data.
4. Add more Mathematics topics (geometry, statistics).
5. Landing page (for public launch).
