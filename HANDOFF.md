# Handoff

> Snapshot for the next session.

## Where we are

The lesson experience is now paginated (stepper, not scroll). The practice engine is fully built: topic grid with mastery levels, pre-written question banks for 5 topics, AI question generation for endless practice, MCQ + AI-marked short answers, XP tracking, streaks, and per-topic accuracy. Grade prediction has shifted to be practice-based.

## What changed this session

- Rewrote LessonPlayer as a paginated stepper (kills PDF feel).
- Built complete practice engine: topic grid, question flow, XP, streaks, mastery.
- Created pre-written practice banks (40+ questions across 5 topics).
- Built AI practice question generator (`/api/ai/practice`).
- Built practice tracking library (XP, streaks, accuracy in Firestore).
- Built grade prediction from practice accuracy (weighted, replaces lesson-based prediction).

## What the founder needs to do

1. Download workspace, replace `src/` + root `.md` files, push to GitHub.
2. Update Firestore rules to allow `practiceStats` subcollection writes (same as lessonProgress).
3. Test: lesson stepper navigation, practice mode, XP earning, short-answer AI marking.

## The Firestore rules need this addition

The `practiceStats` subcollection needs the same rule as `lessonProgress`. In the rules under `students/{studentId}`:

```
match /practiceStats/{statId} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.uid == studentId;
}
```

## Immediate next steps

1. Connect practice accuracy to the dashboard predicted grade (replace lesson-based prediction).
2. Add remaining 9 topics to practice banks.
3. Daily practice goal + streak freeze.
4. End-of-topic full assessment.
5. Biology, Chemistry, English content.
