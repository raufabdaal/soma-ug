# Status

## Current phase

**Phase 1: Core app built. Content expansion + polish.**

## What is done

### Navigation (fully responsive)
- [x] Student: bottom nav on mobile (Home, Learn, Practice, Profile), top bar on desktop
- [x] Parent: bottom nav on mobile (Dashboard, Reports, Settings), top bar on desktop

### Student experience
- [x] Dashboard (predicted grade, guarantee meter, continue learning, subjects, quick stats)
- [x] Learn page (lesson list with 2 Mathematics lessons)
- [x] Lesson player (text, key points, worked examples, MCQs with instant feedback, mastery gate)
- [x] AI tutor chat in lessons
- [x] Profile/settings (account info, study code with copy, signout)

### Parent experience
- [x] Dashboard (study code linking, weekly stats, needs-attention alerts)
- [x] Reports (beautiful weekly report card, download, share)
- [x] Settings (profile, linked students, signout)

### Infrastructure
- [x] Firebase auth (Google + email/password)
- [x] Multi-step onboarding
- [x] Groq AI (tutor + marking routes)
- [x] Favicon

## What is next

1. Push new code, test on mobile.
2. Add more Mathematics lessons (factorisation, linear equations, inequalities).
3. Build the diagnostic test.
4. Wire lesson completion to Firestore (persist progress).
5. Add Biology and Chemistry content.
6. Connect parent dashboard + reports to real student data.
7. Landing page (when ready to launch publicly).
