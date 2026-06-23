# Handoff

> Snapshot for the next session. Overwrite this each time.

## Where we are

The full learning loop now works end to end: student takes diagnostic (sets baseline), completes lessons (saves progress to Firestore, updates predicted grade), and parent sees real data on their dashboard. Navigation is a left sidebar on desktop and bottom bar on mobile.

## What changed this session

- Rebuilt navigation: left sidebar (desktop) + bottom bar (mobile) for both student and parent.
- Built diagnostic test (5 questions, sets baseline grade, saves to Firestore).
- Wired lesson completion to Firestore (progress persists, predicted grades auto-update).
- Student dashboard now shows real data (lessons completed, guarantee progress, predicted grade).
- Parent dashboard now shows real student data.
- Added 2 more Mathematics lessons (4 total: linear equations, expanding, factorising, simultaneous).
- Updated Firestore rules for lesson progress subcollection.

## What the founder needs to do

1. **Update Firestore rules (MT-002)**: the new rules include the lessonProgress subcollection. Paste the updated rules from MANUAL_TASKS.md.
2. Download workspace, replace `src/` + root `.md` files.
3. Push to GitHub.

## How to test after pushing

1. Sign in as student. Take the diagnostic test. See your baseline grades.
2. Complete a lesson. Check that your predicted grade updates.
3. Sign in as parent (different account). Link the student's code.
4. Check the parent dashboard shows real data (lessons done, maths grade, guarantee %).

## Immediate next steps

1. Add Biology and Chemistry lessons.
2. Connect parent reports to real data (currently uses sample data for the report card).
3. Add more Mathematics topics.
4. Build the landing page for public launch.
