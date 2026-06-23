# Status

## Current phase

**Phase 3: Practice engine built. Testing + gamification refinement.**

## What is done

### Lesson experience
- [x] Lesson stepper (paginated, one step at a time, progress bar, step dots)
- [x] Complete S1 Mathematics curriculum (14 topics, NCDC mapped)
- [x] Competency-based blocks (competency, outcomes, context, worked examples with reasoning, exam questions, marking guides, activities of integration)
- [x] Audio narration

### Practice engine
- [x] Topic grid with mastery levels and accuracy bars
- [x] Pre-written question banks (MCQ + short answer) for 5 topics
- [x] AI question generation when bank exhausted (endless practice)
- [x] XP tracking (Firestore)
- [x] Daily practice streaks (Firestore)
- [x] Per-topic accuracy tracking
- [x] AI marking for short-answer questions

### Gamification
- [x] XP awarded per question (10/15/20 by difficulty)
- [x] Streak counter (daily)
- [x] Mastery levels per topic (Not Started through Mastered)
- [x] Session stats (correct/total, XP earned, streak)

### Grade prediction
- [x] Practice-based prediction function (`predictGradeFromPractice`)
- [x] Weighted by number of attempts (more data = more confidence)

### Parent experience
- [x] Dashboard with real data
- [x] Reports (weekly card, download, share)
- [x] Settings (profile, linked students)

## What is next

1. Push and test: lesson stepper + practice engine.
2. Connect practice accuracy to dashboard predicted grade.
3. Add remaining topics to practice banks.
4. Daily practice goal + notifications.
5. End-of-topic full assessment (all question types).
6. Biology, Chemistry, English content.
