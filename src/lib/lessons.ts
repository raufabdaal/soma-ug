import type { Lesson } from "@/types";
import { biologyLessons } from "@/lib/lessons-biology";
import { chemistryLessons } from "@/lib/lessons-chemistry";
import { physicsLessons } from "@/lib/lessons-physics";

/**
 * SOMA CURRICULUM CONTENT - S1 All Subjects
 *
 * Built from official NCDC Lower Secondary syllabi.
 * Source: ncdc.go.ug/resource/
 *
 * Each lesson teaches to the competency, not just the knowledge.
 */

export const curriculumMeta = {
  level: "S1",
  source: "NCDC Lower Secondary Syllabi",
};

// ============================================================
// MATHEMATICS - complete 14 topics (from previous build)
// ============================================================

const S1M = (term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject: "Mathematics", level: "S1", term, theme, topicNumber, topicName, competency,
});

export const mathLessons: Lesson[] = [
  {
    id: "s1-math-numbers-bases",
    topicId: "number-bases",
    subjectId: "mathematics",
    title: "Number bases and place value",
    order: 1,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1M("Term 1", "Numbers", 1, "Number Bases", "The learner uses decimal place value to develop understanding of numbers written in other bases."),
    blocks: [
      { type: "competency", text: "The learner uses decimal place value to develop understanding of numbers written in other bases." },
      { type: "outcome", text: "Identify numbers in any base.", tag: "k" },
      { type: "outcome", text: "Convert numbers from one base to another.", tag: "u" },
      { type: "context", heading: "Why number bases matter", content: "You count in base ten because you have ten fingers. But computers use base two (binary). Different bases are the foundation of all digital technology." },
      { type: "key_point", title: "Place value changes with the base", content: "In base 10, positions are 1, 10, 100. In base 5, positions are 1, 5, 25. In base 2, positions are 1, 2, 4, 8. The highest digit in any base is one less than the base." },
      { type: "worked_example", problem: "Convert 243 base 5 to base 10.", steps: ["Positions: 5^0=1, 5^1=5, 5^2=25.", "243 base 5 = 2x25 + 4x5 + 3x1 = 50 + 20 + 3 = 73."], answer: "73", reasoning: "Each digit is multiplied by its positional value (powers of 5)." },
      { type: "worked_example", problem: "Convert 47 base 10 to base 5.", steps: ["47/5 = 9 r2", "9/5 = 1 r4", "1/5 = 0 r1", "Read bottom-up: 142"], answer: "142 base 5", reasoning: "Each division strips off one digit. Remainders read bottom-up give the answer." },
      { type: "question", question: "Convert 34 base 5 to base 10.", options: ["19", "34", "17", "24"], correctIndex: 0, explanation: "3x5 + 4 = 19." },
      { type: "question", question: "Convert 110 base 2 to base 10.", options: ["3", "4", "5", "6"], correctIndex: 3, explanation: "4 + 2 + 0 = 6." },
      { type: "question", question: "Convert 28 base 10 to base 5.", options: ["103", "104", "102", "113"], correctIndex: 0, explanation: "28/5=5 r3, 5/5=1 r0, 1/5=0 r1. Bottom-up: 103." },
      { type: "activity_of_integration", title: "Living in base 8", scenario: "Imagine a world where people have 8 fingers.", task: "If a price is 45 in base 8, what is it in base 10?", hint: "Use positional values for base 8.", answer: "45 base 8 = 4x8 + 5 = 37 in base 10." },
    ],
  },
  {
    id: "s1-math-integers",
    topicId: "integers",
    subjectId: "mathematics",
    title: "Working with integers",
    order: 2, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S1M("Term 1", "Numbers", 2, "Working with Integers", "The learner carries out calculations with positive and negative integers."),
    blocks: [
      { type: "competency", text: "The learner carries out calculations with positive and negative integers." },
      { type: "outcome", text: "Use directed numbers in real life situations.", tag: "u,s" },
      { type: "outcome", text: "Carry out the four operations on integers.", tag: "u" },
      { type: "context", heading: "Integers are everywhere", content: "Temperature below zero. Bank overdrafts. Floors below ground level. Integers describe real situations." },
      { type: "key_point", title: "Sign rules", content: "Same signs give positive. Different signs give negative. Positive x Negative = Negative." },
      { type: "worked_example", problem: "Calculate -5 x -4", steps: ["Two negatives = positive.", "5 x 4 = 20."], answer: "+20", reasoning: "Double negation, like 'not unhappy' = happy." },
      { type: "question", question: "Calculate: -8 + 5", options: ["-3", "-13", "3", "13"], correctIndex: 0, explanation: "Start at -8, move 5 right: -3." },
      { type: "question", question: "Calculate: -6 x -7", options: ["-42", "42", "-13", "13"], correctIndex: 1, explanation: "Same signs give positive. 6x7=42." },
      { type: "question", question: "Find the HCF of 12 and 18.", options: ["2", "3", "6", "36"], correctIndex: 2, explanation: "12=2^2x3, 18=2x3^2. HCF=2x3=6." },
      { type: "activity_of_integration", title: "Bank balance", scenario: "Your account is -15,000 UGX. You deposit 50,000 and withdraw 20,000.", task: "What is your final balance?", hint: "Track the running total with positive and negative numbers.", answer: "-15,000 + 50,000 = 35,000. 35,000 - 20,000 = 15,000 UGX." },
    ],
  },
  {
    id: "s1-math-fractions",
    topicId: "fractions-percentages-decimals",
    subjectId: "mathematics",
    title: "Fractions, percentages and decimals",
    order: 3, estimatedMinutes: 20, passingScore: 70, isActive: true,
    curriculum: S1M("Term 1", "Numbers", 3, "Fractions, Percentages and Decimals", "The learner understands and uses fractions, decimals and percentages."),
    blocks: [
      { type: "competency", text: "The learner understands and uses fractions, decimals and percentages." },
      { type: "outcome", text: "Convert between fractions, decimals and percentages.", tag: "u,s" },
      { type: "outcome", text: "Solve real-life problems involving percentages.", tag: "u,s" },
      { type: "context", heading: "Fractions in daily life", content: "Discounts, test scores, sharing food. 1/2 = 0.5 = 50%. Three forms of the same idea." },
      { type: "worked_example", problem: "An item costs 80,000 UGX with a 15% discount. What do you pay?", steps: ["Discount = 0.15 x 80,000 = 12,000.", "Price = 80,000 - 12,000 = 68,000."], answer: "68,000 UGX", reasoning: "Or calculate 85% of 80,000 directly." },
      { type: "question", question: "Simplify 8/12.", options: ["2/3", "3/4", "4/6", "1/2"], correctIndex: 0, explanation: "HCF=4. 8/4=2, 12/4=3." },
      { type: "question", question: "Convert 7/10 to a percentage.", options: ["7%", "70%", "0.7%", "14%"], correctIndex: 1, explanation: "0.7 x 100 = 70%." },
      { type: "question", question: "What is 20% of 150,000 UGX?", options: ["15,000", "20,000", "30,000", "25,000"], correctIndex: 2, explanation: "0.20 x 150,000 = 30,000." },
      { type: "activity_of_integration", title: "Comparing scores", scenario: "Rose scored 21/25 in Maths and 31/40 in Physics. (NCDC sample.)", task: "Which subject did she do better in?", hint: "Convert both to percentages.", answer: "Maths: 84%. Physics: 77.5%. Rose did better in Maths." },
    ],
  },
  {
    id: "s1-math-coordinates",
    topicId: "cartesian-coordinates",
    subjectId: "mathematics",
    title: "Cartesian coordinates in 2D",
    order: 4, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 1", "Numbers", 4, "Rectangular Cartesian Coordinates in 2D", "The learner plots and interprets points in a range of contexts."),
    blocks: [
      { type: "competency", text: "The learner plots and interprets points in a range of contexts." },
      { type: "outcome", text: "Read and plot points on the Cartesian plane.", tag: "k,s" },
      { type: "context", heading: "Coordinates in real life", content: "GPS uses coordinates. Maps use grid references. (x, y) means x across, y up." },
      { type: "key_point", title: "Always x first, then y", content: "Think 'along the corridor, then up the stairs.'" },
      { type: "question", question: "The point (0, 0) is called the...?", options: ["Centre", "Origin", "Base", "Start"], correctIndex: 1, explanation: "Where the x-axis and y-axis cross." },
      { type: "question", question: "Points (1, 2) and (1, 5) are on the same...?", options: ["Horizontal line", "Vertical line", "Diagonal", "Neither"], correctIndex: 1, explanation: "Same x-coordinate = vertical alignment." },
      { type: "activity_of_integration", title: "Scatter graph", scenario: "Dembe is at (9, 130) on a height-age graph. Joan is at (11, 125).", task: "Who is taller? Who is older?", hint: "x = age, y = height.", answer: "Dembe is taller (130 vs 125). Joan is older (11 vs 9)." },
    ],
  },
  {
    id: "s1-math-construction",
    topicId: "geometric-construction", subjectId: "mathematics",
    title: "Geometric construction skills",
    order: 5, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 2", "Geometry and Measures", 5, "Geometric Construction Skills", "The learner uses the angle properties of lines and shapes to solve problems."),
    blocks: [
      { type: "competency", text: "The learner uses the angle properties of lines and shapes to solve problems." },
      { type: "outcome", text: "Construct special angles: 60 and 45 degrees.", tag: "u,s" },
      { type: "key_point", title: "Construction vs drawing", content: "Construction uses compass and ruler only. NOT a protractor. Leave arcs visible - they earn marks." },
      { type: "question", question: "Which tools do you need for geometric construction?", options: ["Protractor and ruler", "Compasses and ruler only", "Set square", "Calculator"], correctIndex: 1, explanation: "Construction uses compasses and a ruler." },
      { type: "question", question: "What angle do you get from an equilateral triangle construction?", options: ["45", "60", "90", "30"], correctIndex: 1, explanation: "All angles in an equilateral triangle are 60 degrees." },
      { type: "activity_of_integration", title: "Hexagon", scenario: "A regular hexagon can be constructed with compass and ruler.", task: "Why does marking 6 arcs around a circle create a hexagon?", hint: "Think about equilateral triangles.", answer: "A regular hexagon is made of 6 equilateral triangles, each with side = radius. 360/6 = 60 degrees." },
    ],
  },
  {
    id: "s1-math-sequences", topicId: "sequences-patterns", subjectId: "mathematics",
    title: "Sequences and patterns",
    order: 6, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 2", "Patterns and Algebra", 6, "Sequences and Patterns", "The learners explore number patterns and sequences."),
    blocks: [
      { type: "competency", text: "The learners explore number patterns and sequences." },
      { type: "outcome", text: "Find the nth term of a sequence.", tag: "u,s" },
      { type: "key_point", title: "Finding the nth term", content: "Find the common difference. The nth term = difference x n + adjustment." },
      { type: "worked_example", problem: "Find the nth term of: 5, 8, 11, 14...", steps: ["Difference = 3, so rule involves 3n.", "3(1)=3 but first term is 5, so add 2.", "nth term = 3n + 2."], answer: "3n + 2", reasoning: "Verify: 3(1)+2=5, 3(2)+2=8. Correct." },
      { type: "question", question: "What is the nth term of 4, 8, 12, 16?", options: ["4n", "n+4", "4n+4", "2n"], correctIndex: 0, explanation: "Difference is 4, first term is 4, so 4n." },
      { type: "activity_of_integration", title: "Multiple continuations", scenario: "The sequence begins 2, 4, ... (NCDC sample)", task: "How many ways can you continue this? Explain each.", answer: "2,4,6 (add 2). 2,4,8 (x2). 2,4,7 (add 2,3,4). Each rule is valid." },
    ],
  },
  {
    id: "s1-math-bearings", topicId: "bearings", subjectId: "mathematics",
    title: "Bearings and direction",
    order: 7, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 2", "Geometry and Measures", 7, "Bearings", "The learner uses compass points, bearings and scale drawings."),
    blocks: [
      { type: "competency", text: "The learner uses compass points, bearings and scale drawings." },
      { type: "outcome", text: "Describe the bearing of a place from a given point.", tag: "k,s" },
      { type: "key_point", title: "Three rules of bearings", content: "Measured from North. Measured clockwise. Written as three digits (045, not 45)." },
      { type: "question", question: "What is the bearing of East?", options: ["045", "090", "135", "180"], correctIndex: 1, explanation: "East is 90 degrees clockwise from North." },
      { type: "activity_of_integration", title: "Ships from Port Bell", scenario: "Two ships leave Port Bell. One sails 80km at 030 degrees. Other sails 160km at 110 degrees. (NCDC sample)", task: "Using a scale drawing, find the distance between the ships.", hint: "1cm = 20km, draw both from the same point.", answer: "Approximately 170km (varies with drawing accuracy)." },
    ],
  },
  {
    id: "s1-math-angles", topicId: "angle-properties", subjectId: "mathematics",
    title: "Angle properties of geometric figures",
    order: 8, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 2", "Geometry and Measures", 8, "Angle Properties", "The learner uses angle properties to solve problems involving lines and shapes."),
    blocks: [
      { type: "competency", text: "The learner uses angle properties to solve problems involving lines and shapes." },
      { type: "key_point", title: "The fundamental rules", content: "Angles in a triangle = 180. Angles in a quadrilateral = 360. Angles on a line = 180. Angles around a point = 360." },
      { type: "question", question: "Angles in a triangle add up to...?", options: ["90", "180", "270", "360"], correctIndex: 1, explanation: "Always 180 degrees." },
      { type: "question", question: "Each angle in an equilateral triangle is...?", options: ["45", "60", "90", "120"], correctIndex: 1, explanation: "180/3 = 60." },
      { type: "activity_of_integration", title: "Prove it", scenario: "Prove that angles in a triangle = 180.", task: "Describe two methods.", answer: "1. Cut off corners and place them on a line = 180. 2. Draw a line parallel to one side, use alternate angles." },
    ],
  },
  {
    id: "s1-math-data", topicId: "data-collection", subjectId: "mathematics",
    title: "Data collection and presentation",
    order: 9, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 2", "Data and Probability", 9, "Data Collection", "The learner collects, organises and presents data."),
    blocks: [
      { type: "competency", text: "The learner collects, organises and presents data." },
      { type: "key_point", title: "Choosing the right chart", content: "Bar charts compare categories. Pie charts show proportions. Line graphs show change over time." },
      { type: "worked_example", problem: "In a class of 30: 12 like Maths, 8 English, 6 Science, 4 History. Present as pie chart angles.", steps: ["360/30 = 12 degrees per student.", "Maths: 12x12=144, English: 8x12=96, Science: 6x12=72, History: 4x12=48.", "Total: 144+96+72+48 = 360. Correct!"], answer: "144, 96, 72, 48 degrees", reasoning: "Each category's angle is proportional to its share of the total." },
      { type: "question", question: "Which chart shows proportions of a whole?", options: ["Bar chart", "Pie chart", "Line graph", "Table"], correctIndex: 1, explanation: "Pie charts show parts of a whole." },
      { type: "activity_of_integration", title: "Survey your class", scenario: "Find out which subjects classmates find most interesting.", task: "Design the question, recording method, and presentation.", answer: "Question: 'Which subject do you find most interesting?' Record with tally chart. Present as bar chart." },
    ],
  },
  {
    id: "s1-math-reflection", topicId: "reflection", subjectId: "mathematics",
    title: "Reflection",
    order: 10, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S1M("Term 3", "Geometry and Measures", 10, "Reflection", "The learner carries out reflections and identifies properties of reflected figures."),
    blocks: [
      { type: "competency", text: "The learner carries out reflections and identifies properties of reflected figures." },
      { type: "key_point", title: "Rules of reflection", content: "Every point and its image are equidistant from the mirror line. The connecting line is perpendicular to the mirror. Reflection preserves length and angle but reverses orientation." },
      { type: "question", question: "Reflecting (5, 3) in the y-axis gives...?", options: ["(-5, 3)", "(5, -3)", "(-5, -3)", "(3, 5)"], correctIndex: 0, explanation: "y-axis reflection changes x sign only." },
      { type: "activity_of_integration", title: "Alphabet symmetry", scenario: "Which capital letters have reflection symmetry?", task: "Identify letters with vertical and horizontal mirror lines.", answer: "Vertical: A, H, I, M, O, T, U, V, W, X, Y. Horizontal: B, C, D, E, H, I, K, O, X. Both: H, I, O, X." },
    ],
  },
  {
    id: "s1-math-lines", topicId: "equations-lines", subjectId: "mathematics",
    title: "Equations of lines and curves",
    order: 11, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 3", "Patterns and Algebra", 11, "Equations of Lines", "The learner represents linear relationships using equations and graphs."),
    blocks: [
      { type: "competency", text: "The learner represents linear relationships using equations and graphs." },
      { type: "key_point", title: "y = mx + c", content: "m = gradient (steepness). c = y-intercept (where it crosses y-axis)." },
      { type: "worked_example", problem: "A boda charges 1,000 UGX flag fall + 500/km. Write the equation.", steps: ["Fixed charge = y-intercept = 1000.", "Rate = gradient = 500.", "y = 500x + 1000."], answer: "y = 500x + 1000", reasoning: "Gradient = rate per km. Intercept = starting charge." },
      { type: "question", question: "In y = 3x + 5, what is the gradient?", options: ["3", "5", "8", "15"], correctIndex: 0, explanation: "m = 3 in y = mx + c." },
      { type: "activity_of_integration", title: "Boda fare", scenario: "1000 UGX flag fall + 500/km.", task: "How much for a 7km journey?", answer: "y = 500(7) + 1000 = 4500 UGX." },
    ],
  },
  {
    id: "s1-math-algebra1", topicId: "algebra-1", subjectId: "mathematics",
    title: "Algebra 1: equations and expressions",
    order: 12, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S1M("Term 3", "Patterns and Algebra", 12, "Algebra 1", "The learner simplifies algebraic expressions and solves linear equations."),
    blocks: [
      { type: "competency", text: "The learner simplifies algebraic expressions and solves linear equations." },
      { type: "key_point", title: "Like terms", content: "Only combine terms with the same variable. 3x + 5x = 8x. But 3x + 3x^2 cannot simplify." },
      { type: "worked_example", problem: "Solve: 3x + 4 = 2x + 9", steps: ["Subtract 2x: x + 4 = 9.", "Subtract 4: x = 5.", "Check: 3(5)+4 = 19, 2(5)+9 = 19. Correct!"], answer: "x = 5", reasoning: "Collect x terms on one side, then isolate." },
      { type: "question", question: "Simplify: 4a + 3b - 2a + b", options: ["2a + 4b", "6a + 4b", "2a + 2b", "4ab"], correctIndex: 0, explanation: "(4a-2a) + (3b+b) = 2a + 4b." },
      { type: "question", question: "Solve: 2x + 5 = 17", options: ["4", "6", "8", "11"], correctIndex: 1, explanation: "2x=12, x=6." },
      { type: "question", question: "Factorise: 6x + 9", options: ["3(2x+3)", "2(3x+4)", "6(x+9)", "3(2x+9)"], correctIndex: 0, explanation: "HCF=3. 6x/3=2x, 9/3=3." },
      { type: "activity_of_integration", title: "Father and son", scenario: "A father is 3 times as old as his son. Sum of ages is 48.", task: "How old is the son?", answer: "Let son = x. Father = 3x. x + 3x = 48. 4x = 48. x = 12." },
    ],
  },
  {
    id: "s1-math-business", topicId: "business-arithmetic", subjectId: "mathematics",
    title: "Business arithmetic",
    order: 13, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1M("Term 3", "Geometry and Measures", 13, "Business Arithmetic", "The learner applies mathematical skills to solve business and financial problems."),
    blocks: [
      { type: "competency", text: "The learner applies mathematical skills to solve business and financial problems." },
      { type: "key_point", title: "Profit and loss", content: "Profit = Selling - Cost. Percentage profit = (Profit / Cost) x 100. Always divide by the COST price." },
      { type: "worked_example", problem: "Buy at 200,000, sell at 250,000. Find % profit.", steps: ["Profit = 50,000.", "% = (50,000/200,000) x 100 = 25%."], answer: "25%", reasoning: "Always relative to cost price." },
      { type: "question", question: "Buy at 10,000, sell at 12,000. % profit?", options: ["16.7%", "20%", "25%", "12%"], correctIndex: 1, explanation: "2000/10000 x 100 = 20%." },
      { type: "question", question: "Simple interest on 100,000 at 5% for 2 years?", options: ["5,000", "10,000", "15,000", "20,000"], correctIndex: 1, explanation: "I = PRT/100 = 100000x5x2/100 = 10,000." },
      { type: "activity_of_integration", title: "Nakasero trader", scenario: "Mama Sarah buys tomatoes at 2,000/kg, sells at 3,000/kg. Transport 10,000/day, rent 5,000/day. Sells 50kg/day.", task: "Calculate daily profit.", answer: "Cost: 100,000+10,000+5,000=115,000. Revenue: 150,000. Profit: 35,000 UGX/day." },
    ],
  },
  {
    id: "s1-math-time", topicId: "time-tables", subjectId: "mathematics",
    title: "Time and time tables",
    order: 14, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S1M("Term 3", "Geometry and Measures", 14, "Time and Time Tables", "The learner reads, interprets and calculates with time and timetables."),
    blocks: [
      { type: "competency", text: "The learner reads, interprets and calculates with time and timetables." },
      { type: "key_point", title: "12-hour vs 24-hour clock", content: "PM times: add 12 to hours. 3:00 PM = 15:00. AM times stay the same." },
      { type: "question", question: "Convert 7:30 PM to 24-hour format.", options: ["0730", "1730", "1930", "2030"], correctIndex: 2, explanation: "7 + 12 = 19. So 1930." },
      { type: "question", question: "A lesson starts at 0900 and ends at 0945. How long?", options: ["35 min", "40 min", "45 min", "50 min"], correctIndex: 2, explanation: "45 minutes." },
      { type: "activity_of_integration", title: "Plan a journey", scenario: "Meeting at 1400. Buses: 0800 (arr 1215), 0930 (arr 1345), 1100 (arr 1445). Venue 15 min from station.", task: "Which bus do you take?", answer: "The 0800 bus arrives at 1215, giving 1h45m buffer. Safest choice." },
    ],
  },
];

// ============================================================
// ALL SUBJECTS COMBINED
// ============================================================

export const sampleLessons: Lesson[] = [
  ...mathLessons,
  ...biologyLessons,
  ...chemistryLessons,
  ...physicsLessons,
];

export function getLessonById(id: string): Lesson | undefined {
  return sampleLessons.find((l) => l.id === id);
}

export function getLessonsBySubject(subjectId: string): Lesson[] {
  return sampleLessons.filter((l) => l.subjectId === subjectId);
}

export function getLessonsByTopic() {
  const topics: Record<string, { topicId: string; title: string; theme: string; term: string; subjectId: string; lessons: Lesson[] }> = {};

  for (const lesson of sampleLessons) {
    const key = `${lesson.subjectId}-${lesson.topicId}`;
    if (!topics[key]) {
      topics[key] = {
        topicId: lesson.topicId,
        subjectId: lesson.subjectId,
        title: lesson.curriculum?.topicName || lesson.topicId,
        theme: lesson.curriculum?.theme || "",
        term: lesson.curriculum?.term || "Term 1",
        lessons: [],
      };
    }
    topics[key].lessons.push(lesson);
  }

  return Object.values(topics);
}
