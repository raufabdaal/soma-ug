# Status

## Current phase

**Phase 2: Real curriculum content for S1. The content IS the product.**

## What is done (code + features)

### Navigation
- [x] Left sidebar (desktop), bottom bar (mobile) for both student and parent

### Student experience
- [x] Dashboard with REAL data (study time, lessons done, guarantee %)
- [x] Diagnostic test (sets baseline, saves to Firestore)
- [x] Lesson player with audio narration (Listen button, Web Speech API)
- [x] Study time tracking (timer records actual time spent per lesson)
- [x] AI tutor chat
- [x] 4 Mathematics lessons (sample, not yet curriculum-mapped)

### Parent experience
- [x] Dashboard with REAL student data (no more fake numbers)
- [x] Data-driven status card (shows weakest subject, or "diagnostic not taken")
- [x] Reports page
- [x] Settings page

### All metrics are now real
- Study time: tracked via lesson timer, stored in Firestore
- Lessons completed: counted from Firestore
- Predicted grade: calculated from actual scores
- Guarantee progress: real percentage
- No more placeholder numbers anywhere

## What is next (content + features)

### Content (the big focus)
1. Build S1 Mathematics lessons from the actual NCDC syllabus (14 topics)
2. Start with Term 1: Number Bases, Integers, Fractions, Coordinates
3. Expand to other subjects (Biology, Chemistry, English, etc.)
4. Build the curriculum feed

### Features
1. Practice mode (past papers with AI marking)
2. Curriculum feed (updates on NCDC changes)
3. Streak tracking (real daily login tracking)

## The content strategy

See `docs/spec/content-strategy.md` for the full plan.

The key: NCDC syllabi are free and downloadable. We extract the topic structure, draft lessons mapped to learning outcomes, review for accuracy, and publish with curriculum traceability.
