# Handoff

> Snapshot for the next session. Overwrite this each time.

## Where we are

The app is functionally complete for testing: real metrics (no fakes), audio narration in lessons, study time tracking, diagnostic test, parent dashboard reads real student data. The next phase is building REAL curriculum content for S1, mapped to the actual NCDC syllabus.

## What changed this session

- Removed ALL fake/placeholder numbers from student and parent dashboards.
- Added study time tracking: lesson player records actual time spent, stored in Firestore.
- Added audio narration: "Listen" button in lesson player reads content aloud (Web Speech API, free).
- Parent dashboard status card now data-driven (shows weakest subject from real scores, or prompts diagnostic).
- Researched and documented the content strategy (docs/spec/content-strategy.md).
- Extracted the complete S1 Mathematics curriculum structure from the NCDC syllabus.

## The content strategy (the big picture)

NCDC publishes free, official syllabus PDFs at ncdc.go.ug/resource/. The pipeline:
1. Download the syllabus for a subject
2. Extract topic structure, learning outcomes, assessment criteria
3. Draft lessons mapped to specific competencies (AI-assisted, human-reviewed)
4. Publish with curriculum traceability (subject, level, term, topic, learning outcome)
5. Build a curriculum feed that tracks NCDC updates

S1 Mathematics has 14 topics across 3 terms. We should rebuild the lessons from the actual syllabus, starting with Term 1.

## What the founder needs to decide

1. Which subject to build first (Mathematics recommended since we have the syllabus structure)
2. Whether to involve a teacher/tutor for content review, or self-review
3. Whether to start the curriculum feed now or after more content exists

## What the founder needs to do (code)

1. Download workspace, replace `src/` + root `.md` files.
2. Push to GitHub.
3. Test: audio narration, real metrics on both dashboards.
