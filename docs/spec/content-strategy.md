# Soma Content Strategy

> How we turn official NCDC curriculum documents into interactive lessons.
> This is the core of the product. The technology is just plumbing.

## The source material

NCDC (National Curriculum Development Centre) publishes official, free, downloadable syllabus PDFs for every subject at `ncdc.go.ug/resource/`.

These are the **ground truth**. They contain:
- The exact topic structure (Term > Theme > Topic)
- Learning outcomes (what the student must be able to DO)
- Suggested activities and contexts
- Assessment criteria (how UNEB marks)

Example: S1 Mathematics has 14 topics across 3 terms, organized into 5 themes (Numbers, Geometry & Measures, Patterns & Algebra, Data & Probability).

## The content pipeline

### Step 1: Extract
Download the NCDC syllabus PDF for a subject. Extract the topic structure, learning outcomes, and assessment criteria.

### Step 2: Draft lessons (AI-assisted)
For each topic, draft lessons that:
- State the learning outcome clearly (mapped to the syllabus)
- Teach the concept with worked examples
- Include practice questions with explanations
- Reference the curriculum strand and topic number

The AI helps draft, but every lesson is reviewed for accuracy before publishing.

### Step 3: Review and refine
A subject expert (or the founder) reviews each lesson for:
- Accuracy (is the math/science correct?)
- Curriculum alignment (does it match the NCDC learning outcome?)
- Quality (is it clear, does it use Ugandan contexts?)

### Step 4: Publish with traceability
Each lesson is tagged with:
- Subject, Level (S1), Term, Theme, Topic number
- The specific learning outcome it covers
- Source: NCDC syllabus [year]
- Version: so we can update when the curriculum changes

## The curriculum feed

A section of the app that tracks NCDC announcements and syllabus updates. When the curriculum changes:
1. We detect the change (manual monitoring of ncdc.go.ug)
2. We create an update note explaining what changed
3. Students see "What's new in your curriculum" with practical implications
4. Affected lessons are updated and marked with the new version

This makes Soma a living platform, not a static textbook.

## Subject priority order (S1 compulsory subjects)

1. Mathematics - we have the syllabus structure already
2. Biology
3. Chemistry
4. English
5. Physics
6. Geography
7. History and Political Education

## The competency-based difference

Every lesson must teach to the COMPETENCY, not just the knowledge. The NCDC syllabus says:

"The key change in the curriculum is a move from a knowledge-based curriculum to a competence and skill-based curriculum. It is no longer sufficient to accumulate large amounts of knowledge. Young people need to develop the ability to apply their learning with confidence in a range of situations."

So our lessons must:
- Start with a real-world context (why does this matter?)
- Teach the skill (not just the formula)
- Test application (not just recall)
- Show how UNEB marks competency-based answers

## S1 Mathematics curriculum (extracted from NCDC syllabus)

### Term 1
1. Number Bases (15 periods)
2. Working with Integers (15 periods)
3. Fractions, Percentages and Decimals (15 periods)
4. Rectangular Cartesian Coordinates in 2D (15 periods)

### Term 2
5. Geometric Constructions Skills (12 periods)
6. Sequences and Patterns (12 periods)
7. Bearings (12 periods)
8. General and Angle Properties of Geometric Figures (12 periods)
9. Data Collection and Presentation (12 periods)

### Term 3
10. Reflection (12 periods)
11. Equations of Lines and Curves (12 periods)
12. Algebra 1 (12 periods)
13. Business Arithmetic (12 periods)
14. Time and Time Tables (12 periods)

Total: 180 periods across the year.
