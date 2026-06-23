import type { Lesson } from "@/types";

/**
 * SOMA CURRICULUM CONTENT - S1 Mathematics
 *
 * Built from the official NCDC Lower Secondary Mathematics Syllabus.
 * Source: ncdc.go.ug/resource/
 *
 * Each lesson teaches to the competency, not just the knowledge:
 * - States the NCDC competency statement
 * - Maps to specific learning outcomes (tagged k/u/s)
 * - Uses real-world Ugandan contexts
 * - Shows worked examples WITH reasoning
 * - Demonstrates exam-style questions with marking guides
 * - Includes activities of integration (NCDC assessment format)
 */

export const curriculumMeta = {
  subject: "Mathematics",
  level: "S1",
  source: "NCDC Lower Secondary Mathematics Syllabus",
  totalTopics: 14,
};

// Helper for curriculum mapping
const S1 = (term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject: "Mathematics",
  level: "S1",
  term,
  theme,
  topicNumber,
  topicName,
  competency,
});

export const sampleLessons: Lesson[] = [

  // ====================================================================
  // TERM 1, TOPIC 1: NUMBER BASES
  // ====================================================================
  {
    id: "s1-math-numbers-bases",
    topicId: "number-bases",
    subjectId: "mathematics",
    title: "Number bases and place value",
    order: 1,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Numbers", 1, "Number Bases",
      "The learner uses decimal place value to develop understanding of numbers written in other bases."),
    blocks: [
      { type: "competency", text: "The learner uses decimal place value to develop understanding of numbers written in other bases." },
      { type: "outcome", text: "Identify numbers in any base using abacus.", tag: "k" },
      { type: "outcome", text: "Convert numbers from one base to another.", tag: "u" },
      { type: "outcome", text: "Manipulate numbers in different bases with respect to all four operations.", tag: "u,s" },
      { type: "outcome", text: "Identify place value in different bases.", tag: "u" },

      { type: "context", heading: "Why number bases matter", content: "You count in base ten because you have ten fingers. But what if humans had eight fingers? Or only two? Different number bases are not abstract maths. They are the foundation of every computer, phone, and digital device. Binary (base 2) is how machines think. Understanding bases builds the logical reasoning that UNEB's new curriculum rewards." },

      { type: "text", heading: "What is a number base?", content: "A number base (or radix) is the number of unique digits used to represent numbers. Base 10 uses digits 0 to 9. Base 2 uses only 0 and 1. Base 5 uses 0, 1, 2, 3, 4. The rule is simple: the highest digit in any base is always one less than the base itself." },

      { type: "key_point", title: "Place value changes with the base", content: "In base 10, positions from right to left are 1, 10, 100, 1000 (powers of 10). In base 5, positions are 1, 5, 25, 125 (powers of 5). In base 2, positions are 1, 2, 4, 8 (powers of 2). The position value is always the base raised to a power, starting from 0 on the right." },

      { type: "worked_example", problem: "What does 243 in base 5 mean in base 10?", steps: ["Each position has a value based on powers of 5: 5^0 = 1, 5^1 = 5, 5^2 = 25.", "So 243 base 5 = 2 x 25 + 4 x 5 + 3 x 1.", "Calculate: 2 x 25 = 50, 4 x 5 = 20, 3 x 1 = 3.", "Total: 50 + 20 + 3 = 73."], answer: "73 (base 10)", reasoning: "We are converting each digit by multiplying it by its positional value. The rightmost digit multiplies by 1, the next by 5, the next by 25. This is the same principle as base 10, just with different place values." },

      { type: "worked_example", problem: "Convert 1011 base 2 to base 10", steps: ["Positions from right to left: 2^0 = 1, 2^1 = 2, 2^2 = 4, 2^3 = 8.", "1011 base 2 = 1 x 8 + 0 x 4 + 1 x 2 + 1 x 1.", "Calculate: 8 + 0 + 2 + 1 = 11."], answer: "11 (base 10)", reasoning: "Each digit is multiplied by the power of 2 for its position. The zeros still take up a position but contribute nothing to the sum." },

      { type: "key_point", title: "Converting base 10 to any other base", content: "Divide the number by the target base repeatedly. Write down each remainder. Read the remainders from bottom to top. That sequence of remainders is your answer in the new base." },

      { type: "worked_example", problem: "Convert 47 (base 10) to base 5", steps: ["47 divided by 5 = 9 remainder 2", "9 divided by 5 = 1 remainder 4", "1 divided by 5 = 0 remainder 1", "Read remainders from bottom to top: 1, 4, 2."], answer: "142 (base 5)", reasoning: "Each division strips off one digit of the answer. The first remainder is the units digit, the next is the fives digit, and so on. Reading bottom-up gives the correct order." },

      { type: "exam_style", scenario: "A computer stores data in binary (base 2). A particular piece of data is stored as 1101.", question: "Convert 1101 base 2 to base 10.", marks: 3 },

      { type: "marking_guide", totalMarks: 3, criteria: [
        { criterion: "Correct positional values identified (8, 4, 2, 1)", marks: 1, type: "method" },
        { criterion: "Correct multiplication: 1x8 + 1x4 + 0x2 + 1x1", marks: 1, type: "method" },
        { criterion: "Final answer: 13", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "Which digits are valid in base 8?", options: ["0 to 7", "0 to 8", "1 to 8", "0 to 9"], correctIndex: 0, explanation: "Base 8 uses digits 0 to 7. The highest digit is always one less than the base." },
      { type: "question", question: "Convert 34 base 5 to base 10.", options: ["19", "34", "17", "24"], correctIndex: 0, explanation: "34 base 5 = 3 x 5 + 4 = 15 + 4 = 19." },
      { type: "question", question: "Convert 28 base 10 to base 5.", options: ["103", "104", "102", "113"], correctIndex: 0, explanation: "28/5=5 r3, 5/5=1 r0, 1/5=0 r1. Read bottom-up: 103." },
      { type: "question", question: "Convert 110 base 2 to base 10.", options: ["3", "4", "5", "6"], correctIndex: 3, explanation: "110 base 2 = 1x4 + 1x2 + 0x1 = 4 + 2 + 0 = 6." },

      { type: "activity_of_integration", title: "Living in a base-8 world", scenario: "Imagine living in a cartoon world where people have only 8 digits instead of 10. Their counting system would be base 8.", task: "A shopkeeper in this world writes the price of an item as 45 (in their base 8 system). What would this price be in our base 10 system?", hint: "Use positional values for base 8: 8^0 and 8^1.", answer: "45 base 8 = 4 x 8 + 5 x 1 = 32 + 5 = 37 in base 10. The item costs 37 in our money." },
    ],
  },

  // ====================================================================
  // TERM 1, TOPIC 2: WORKING WITH INTEGERS
  // ====================================================================
  {
    id: "s1-math-numbers-integers",
    topicId: "integers",
    subjectId: "mathematics",
    title: "Working with integers",
    order: 2,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Numbers", 2, "Working with Integers",
      "The learner carries out calculations with positive and negative integers."),
    blocks: [
      { type: "competency", text: "The learner carries out calculations with positive and negative integers." },
      { type: "outcome", text: "Identify directed numbers (positive and negative).", tag: "k" },
      { type: "outcome", text: "Use directed numbers in real life situations.", tag: "u,s" },
      { type: "outcome", text: "Use the hierarchy of operations to carry out the four mathematical operations on integers.", tag: "u" },
      { type: "outcome", text: "Find the prime factorisation of any number.", tag: "k,u,s" },
      { type: "outcome", text: "Relate common factors with HCF and multiples with LCM.", tag: "k,u" },

      { type: "context", heading: "Integers are everywhere", content: "Temperature below zero. A bank overdraft. The basement floor of a building. The depth of a valley below sea level. Integers (positive numbers, negative numbers, and zero) describe real situations you encounter every day. The competency-based curriculum expects you to not just calculate with them, but to use them to solve real problems." },

      { type: "text", heading: "The number line", content: "Picture a horizontal line with zero in the middle. Positive numbers extend to the right. Negative numbers extend to the left. Adding means moving right. Subtracting means moving left. This visual tool helps you get the sign right every single time." },

      { type: "key_point", title: "Rules for multiplying and dividing", content: "Same signs give positive. Different signs give negative. Positive x Positive = Positive. Negative x Negative = Positive. Positive x Negative = Negative. This rule applies to both multiplication and division." },

      { type: "worked_example", problem: "Calculate -7 + 3", steps: ["Start at -7 on the number line.", "Adding 3 means moving 3 steps to the right.", "-7 + 3 = -4."], answer: "-4", reasoning: "When adding a positive number to a negative number, move right on the number line. Since 7 is larger than 3, you end up still in negative territory." },

      { type: "worked_example", problem: "Calculate -5 x -4", steps: ["Two negative numbers multiplied give a positive result.", "Multiply the values: 5 x 4 = 20.", "Answer: +20."], answer: "+20", reasoning: "Think of it as double negation in language. 'I will not fail' and 'I will not not pass' mean the same thing. Two negatives make a positive." },

      { type: "worked_example", problem: "Calculate: -3 + 2 x (-4)", steps: ["Apply BODMAS: multiplication first.", "2 x (-4) = -8.", "Now add: -3 + (-8) = -11."], answer: "-11", reasoning: "The order of operations (BODMAS) still applies with negative numbers. You must multiply before you add, even when negatives are involved." },

      { type: "exam_style", scenario: "Rose's bank account shows a balance of -15,000 UGX (an overdraft). She deposits 50,000 UGX, then withdraws 20,000 UGX for school fees.", question: "What is her final balance? Show your working.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Starting balance correctly stated: -15,000", marks: 1, type: "method" },
        { criterion: "Deposit calculation: -15,000 + 50,000 = 35,000", marks: 1, type: "method" },
        { criterion: "Withdrawal calculation: 35,000 - 20,000", marks: 1, type: "method" },
        { criterion: "Final answer: 15,000 UGX", marks: 1, type: "accuracy" },
      ] },

      { type: "key_point", title: "Prime factorisation, HCF and LCM", content: "A prime number has exactly two factors: 1 and itself. The first primes are 2, 3, 5, 7, 11, 13. To find the prime factorisation of a number, keep dividing by the smallest prime until you reach 1. The HCF is found by taking the lowest power of each common prime. The LCM uses the highest power of each prime that appears." },

      { type: "worked_example", problem: "Find the prime factorisation of 60, then find the HCF and LCM of 60 and 72.", steps: ["60 = 2 x 2 x 3 x 5 = 2^2 x 3 x 5", "72 = 2 x 2 x 2 x 3 x 3 = 2^3 x 3^2", "HCF: take lowest powers of common primes: 2^2 x 3 = 12", "LCM: take highest powers of all primes: 2^3 x 3^2 x 5 = 360"], answer: "HCF = 12, LCM = 360", reasoning: "The HCF uses the smallest power of primes that appear in both numbers. The LCM uses the largest power of every prime that appears in either. This guarantees HCF divides both numbers exactly, and LCM is divisible by both." },

      { type: "question", question: "Calculate: -8 + 5", options: ["-3", "-13", "3", "13"], correctIndex: 0, explanation: "Start at -8, move 5 right: -8 + 5 = -3." },
      { type: "question", question: "Calculate: -6 x -7", options: ["-42", "42", "-13", "13"], correctIndex: 1, explanation: "Same signs give positive. 6 x 7 = 42." },
      { type: "question", question: "Calculate: 4 - 9", options: ["5", "-5", "13", "-13"], correctIndex: 1, explanation: "Start at 4, move 9 left: 4 - 9 = -5." },
      { type: "question", question: "What is the prime factorisation of 24?", options: ["2^3 x 3", "2^2 x 6", "3 x 8", "2 x 12"], correctIndex: 0, explanation: "24 = 2 x 2 x 2 x 3 = 2^3 x 3." },
      { type: "question", question: "Find the HCF of 12 and 18.", options: ["2", "3", "6", "36"], correctIndex: 2, explanation: "12 = 2^2 x 3, 18 = 2 x 3^2. HCF = 2 x 3 = 6." },

      { type: "activity_of_integration", title: "Comparing test scores", scenario: "Rose achieved a score of 21 out of 25 in a mathematics test, and a score of 31 out of 40 in a physics test. (This is an actual NCDC sample assessment question.)", task: "Did Rose do better in mathematics or in physics? Justify your answer with calculations.", hint: "Convert both scores to percentages so you can compare them fairly.", answer: "Maths: 21/25 x 100 = 84%. Physics: 31/40 x 100 = 77.5%. Rose did better in mathematics (84% vs 77.5%). This question tests the competency of using fractions and percentages to make comparisons in real situations." },
    ],
  },

  // ====================================================================
  // TERM 1, TOPIC 3: FRACTIONS, PERCENTAGES AND DECIMALS
  // ====================================================================
  {
    id: "s1-math-numbers-fractions",
    topicId: "fractions-percentages-decimals",
    subjectId: "mathematics",
    title: "Fractions, percentages and decimals",
    order: 3,
    estimatedMinutes: 20,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Numbers", 3, "Fractions, Percentages and Decimals",
      "The learner understands and uses fractions, decimals and percentages."),
    blocks: [
      { type: "competency", text: "The learner understands and uses fractions, decimals and percentages." },
      { type: "outcome", text: "Describe different types of fractions.", tag: "k" },
      { type: "outcome", text: "Convert improper fractions to mixed numbers and vice versa.", tag: "k,s" },
      { type: "outcome", text: "Add, subtract, divide and multiply decimals.", tag: "u,s" },
      { type: "outcome", text: "Convert fractions to decimals and vice versa.", tag: "u,s" },
      { type: "outcome", text: "Convert fractions and decimals into percentages and vice versa.", tag: "u,s" },
      { type: "outcome", text: "Work out real-life problems involving percentages.", tag: "u,s,v/a" },

      { type: "context", heading: "Fractions in daily life", content: "When a shop offers a 25% discount, when you share a Rolex (chapati wrap) among friends, when you check your test score as a percentage. Fractions, decimals and percentages are three ways of expressing the same idea. Being able to switch between them fluently is essential for business, banking, and everyday decisions in Uganda." },

      { type: "key_point", title: "The three forms", content: "1/2 = 0.5 = 50%. These three representations mean exactly the same thing. The fraction shows parts of a whole. The decimal extends the place value system beyond units. The percentage compares to 100. Mastering conversions between all three is critical for UNEB." },

      { type: "worked_example", problem: "Simplify 12/18 and convert to a decimal and percentage.", steps: ["Find the HCF of 12 and 18: it is 6.", "Divide both by 6: 12/6 = 2, 18/6 = 3. Simplified: 2/3.", "Convert to decimal: 2 divided by 3 = 0.666... (recurring).", "Convert to percentage: 0.667 x 100 = 66.7%."], answer: "2/3 = 0.667 (recurring) = 66.7%", reasoning: "Simplifying first makes every other calculation easier. 2/3 produces a recurring decimal because 3 does not divide evenly into any power of 10." },

      { type: "worked_example", problem: "Add 1/4 + 2/3", steps: ["Find a common denominator. The LCM of 4 and 3 is 12.", "Convert each fraction: 1/4 = 3/12, and 2/3 = 8/12.", "Add the numerators: 3 + 8 = 11.", "Result: 11/12. This cannot be simplified further."], answer: "11/12", reasoning: "You cannot add fractions with different denominators directly. Converting to a common denominator lets you add the numerators while keeping the denominator the same." },

      { type: "worked_example", problem: "A shop prices an item at 80,000 UGX and offers a 15% discount. What is the sale price?", steps: ["Calculate the discount: 15% of 80,000 = 0.15 x 80,000 = 12,000 UGX.", "Subtract from the original price: 80,000 - 12,000 = 68,000 UGX."], answer: "68,000 UGX", reasoning: "Alternatively, you can calculate 85% of 80,000 directly (100% minus 15%). Both methods give the same answer. Showing either method earns full marks." },

      { type: "exam_style", scenario: "Moses has the number cards 3, 4, 0, 7 and a decimal point. (This is an actual NCDC sample assessment.)", question: "What is the least number Moses can form using all five of his cards?", marks: 3 },

      { type: "marking_guide", totalMarks: 3, criteria: [
        { criterion: "Recognises that the smallest digit goes first after decimal: 0.xxx format", marks: 1, type: "method" },
        { criterion: "Arranges remaining digits in ascending order: 3, 4, 7", marks: 1, type: "method" },
        { criterion: "Correct answer: 0.347", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "Simplify 8/12.", options: ["2/3", "3/4", "4/6", "1/2"], correctIndex: 0, explanation: "HCF of 8 and 12 is 4. 8/4 = 2, 12/4 = 3. So 8/12 = 2/3." },
      { type: "question", question: "Convert 7/10 to a percentage.", options: ["7%", "70%", "0.7%", "14%"], correctIndex: 1, explanation: "7/10 = 0.7, then 0.7 x 100 = 70%." },
      { type: "question", question: "Add 1/3 + 1/6.", options: ["2/9", "1/2", "2/6", "3/6"], correctIndex: 1, explanation: "Common denominator 6: 1/3 = 2/6. 2/6 + 1/6 = 3/6 = 1/2." },
      { type: "question", question: "Convert 0.025 to a fraction in its simplest form.", options: ["25/1000", "1/40", "1/25", "25/100"], correctIndex: 1, explanation: "0.025 = 25/1000 = 1/40 (dividing both by 25)." },
      { type: "question", question: "What is 20% of 150,000 UGX?", options: ["15,000", "20,000", "30,000", "25,000"], correctIndex: 2, explanation: "0.20 x 150,000 = 30,000 UGX." },

      { type: "activity_of_integration", title: "Comparing achievements fairly", scenario: "In a class of 40 students, 28 passed mathematics. In another class of 50 students, 33 passed mathematics.", task: "Which class had a better pass rate? Justify your answer.", hint: "Convert both to percentages to compare fairly, since the class sizes are different.", answer: "Class 1: 28/40 x 100 = 70%. Class 2: 33/50 x 100 = 66%. Class 1 had a better pass rate (70% vs 66%). This is why percentages matter: they let you compare groups of different sizes fairly." },
    ],
  },

  // ====================================================================
  // TERM 1, TOPIC 4: RECTANGULAR CARTESIAN COORDINATES
  // ====================================================================
  {
    id: "s1-math-numbers-coordinates",
    topicId: "cartesian-coordinates",
    subjectId: "mathematics",
    title: "Cartesian coordinates in 2D",
    order: 4,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Numbers", 4, "Rectangular Cartesian Coordinates in 2D",
      "The learner plots and interprets points in a range of contexts."),
    blocks: [
      { type: "competency", text: "The learner plots and interprets points in a range of contexts." },
      { type: "outcome", text: "Draw and label the Cartesian plane.", tag: "k,s" },
      { type: "outcome", text: "Identify the x-axis and y-axis.", tag: "k" },
      { type: "outcome", text: "Read and plot points on the Cartesian plane.", tag: "k,s" },
      { type: "outcome", text: "Complete shapes on a coordinate grid.", tag: "k,u,s" },
      { type: "outcome", text: "Choose and use appropriate scale for a data set.", tag: "u,s,v/a" },

      { type: "context", heading: "Coordinates in real life", content: "GPS navigation uses coordinates to find your location. Maps use grid references. Architects use coordinates to design buildings. The Cartesian plane is a way to describe exact positions using two numbers: how far across (x) and how far up (y)." },

      { type: "text", heading: "The Cartesian plane", content: "The Cartesian plane has two perpendicular lines: the horizontal x-axis and the vertical y-axis. They cross at the origin (0,0). Every point on the plane is described by a pair of numbers (x, y) called coordinates. The x-coordinate tells you how far right (positive) or left (negative). The y-coordinate tells you how far up (positive) or down (negative)." },

      { type: "key_point", title: "Always x first, then y", content: "Coordinates are always written as (x, y). Think 'along the corridor, then up the stairs.' First move horizontally (x), then vertically (y). The point (3, 5) means 3 steps right and 5 steps up from the origin." },

      { type: "worked_example", problem: "Plot the points A(2, 3), B(5, 3), C(5, 6) and D(2, 6). What shape do they form?", steps: ["Point A: 2 right, 3 up.", "Point B: 5 right, 3 up (same height as A, further right).", "Point C: 5 right, 6 up (directly above B).", "Point D: 2 right, 6 up (directly above A).", "Connecting A to B to C to D to A forms a rectangle."], answer: "A rectangle with width 3 and height 3 (actually a square since width = 5-2 = 3 and height = 6-3 = 3)", reasoning: "When two points share the same x-coordinate, they are vertically aligned. When they share the same y-coordinate, they are horizontally aligned. Recognising this pattern helps you complete shapes." },

      { type: "exam_style", scenario: "Two vertices of a square are at the points (2, 1) and (6, 3). (This is an actual NCDC sample assessment.)", question: "What are the coordinates of the other two vertices? There are multiple possible answers.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly identifies the distance between the two given points or the side properties", marks: 1, type: "method" },
        { criterion: "Finds at least one valid pair of remaining vertices", marks: 1, type: "method" },
        { criterion: "Finds a second valid pair showing understanding of multiple solutions", marks: 1, type: "method" },
        { criterion: "Clearly labels and justifies the answers", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Which axis is horizontal?", options: ["x-axis", "y-axis", "Both", "Neither"], correctIndex: 0, explanation: "The x-axis runs horizontally (left-right). The y-axis runs vertically (up-down)." },
      { type: "question", question: "The point (0, 0) is called the...?", options: ["Centre", "Origin", "Base", "Start"], correctIndex: 1, explanation: "The point where the x-axis and y-axis cross is called the origin, with coordinates (0, 0)." },
      { type: "question", question: "Which quadrant is the point (-3, 4) in?", options: ["Top right", "Top left", "Bottom right", "Bottom left"], correctIndex: 1, explanation: "Negative x (left) and positive y (up) puts the point in the top-left quadrant (Quadrant 2)." },
      { type: "question", question: "Points (1, 2) and (1, 5) are on the same...?", options: ["Horizontal line", "Vertical line", "Diagonal", "Neither"], correctIndex: 1, explanation: "Same x-coordinate means they are vertically aligned. They are on the same vertical line." },

      { type: "activity_of_integration", title: "Scatter graph interpretation", scenario: "The heights and ages of five girls have been plotted on a scatter graph. Dembe is at point (9, 130) meaning age 9 and height 130cm. Joan is at (11, 125). (Based on NCDC sample assessment.)", task: "Who is taller, Dembe or Joan? By how much? Who is older?", hint: "The x-coordinate is age, the y-coordinate is height. Compare the y-values for height, x-values for age.", answer: "Dembe is taller: 130cm vs Joan's 125cm, so Dembe is taller by 5cm. Joan is older: 11 years vs Dembe's 9 years. This tests the competency of interpreting plotted data in real contexts." },
    ],
  },

  // ====================================================================
  // TERM 2, TOPIC 1: GEOMETRIC CONSTRUCTION SKILLS
  // ====================================================================
  {
    id: "s1-math-geometry-construction",
    topicId: "geometric-construction",
    subjectId: "mathematics",
    title: "Geometric construction skills",
    order: 5,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 2", "Geometry and Measures", 1, "Geometric Construction Skills",
      "The learner uses the angle properties of lines and shapes to solve problems."),
    blocks: [
      { type: "competency", text: "The learner uses the angle properties of lines and shapes to solve problems." },
      { type: "outcome", text: "Draw perpendicular and parallel lines.", tag: "k,s" },
      { type: "outcome", text: "Construct perpendiculars, angle bisectors, mediators and parallel lines.", tag: "u,s" },
      { type: "outcome", text: "Use a pair of compasses and a ruler to construct special angles: 60 degrees, 45 degrees.", tag: "u,s" },
      { type: "outcome", text: "Construct geometrical figures: triangle, square, rectangle, rhombus.", tag: "u,s,v/a" },

      { type: "context", heading: "Construction vs drawing", content: "There is a critical difference between drawing and constructing. Drawing uses a protractor to measure an angle. Constructing uses only a compass and ruler to create exact angles through geometric principles. NCDC specifically tests whether you can CONSTRUCT, not just draw. This is because construction demonstrates understanding of geometric properties, not just measurement." },

      { type: "key_point", title: "The essential tools", content: "For construction you need: a pair of compasses, a straight ruler, and a sharp pencil. Not a protractor. The compass maintains equal distances. The ruler draws straight lines. Together they create exact geometric figures from first principles." },

      { type: "worked_example", problem: "Construct a 60 degree angle using only a compass and ruler.", steps: ["Draw a base line segment AB.", "Place the compass point at A and draw an arc above the line.", "Keep the same radius. Place the compass at the point where the arc crosses AB.", "Draw another arc that intersects the first arc.", "Draw a line from A through the intersection point.", "The angle between AB and this new line is exactly 60 degrees."], answer: "A 60 degree angle constructed geometrically", reasoning: "The two arcs are the same radius, creating an equilateral triangle (all sides equal, all angles 60 degrees). This is why the construction works: it relies on a fundamental property of equilateral triangles, not on measurement." },

      { type: "worked_example", problem: "From 60 degrees, construct a 30 degree angle.", steps: ["You already have a 60 degree angle from the previous construction.", "Bisect the 60 degree angle: place the compass at each endpoint of the arc and draw intersecting arcs.", "Draw a line from A through the new intersection.", "This bisects 60 degrees into exactly 30 degrees."], answer: "A 30 degree angle", reasoning: "Angle bisection splits any angle exactly in half. Starting from 60 degrees, bisection gives 30. Bisecting again gives 15. From 90 degrees (a perpendicular), bisection gives 45. All standard angles can be built from these constructions." },

      { type: "exam_style", scenario: "In your exercise book, using a pair of compasses, ruler and pencil only. (Actual NCDC assessment instruction.)", question: "Construct the following angles: 30, 45, 60, 75, 90, 105 degrees.", marks: 6 },

      { type: "marking_guide", totalMarks: 6, criteria: [
        { criterion: "Construction arcs visible and correct for 60 and 90 degrees (the base angles)", marks: 2, type: "method" },
        { criterion: "Correct bisection to produce 30 and 45 degrees", marks: 2, type: "method" },
        { criterion: "Correct combination to produce 75 and 105 degrees", marks: 1, type: "method" },
        { criterion: "All construction lines visible (not erased), neat and accurate", marks: 1, type: "communication" },
      ] },

      { type: "key_point", title: "Leave construction arcs visible", content: "NCDC awards marks for seeing your construction arcs. Do NOT erase them. The arcs show the examiner that you used geometric construction, not measurement. Erasing them loses you method marks even if the final figure is correct." },

      { type: "question", question: "Which tools do you need for geometric construction?", options: ["Protractor and ruler", "Compasses and ruler only", "Set square and protractor", "Calculator and ruler"], correctIndex: 1, explanation: "Construction uses only compasses and a ruler. A protractor is for drawing (measuring), not constructing." },
      { type: "question", question: "What angle do you get from constructing an equilateral triangle?", options: ["45 degrees", "60 degrees", "90 degrees", "30 degrees"], correctIndex: 1, explanation: "An equilateral triangle has all angles equal to 60 degrees. The basic construction creates 60 degrees." },
      { type: "question", question: "What do you get by bisecting a 90 degree angle?", options: ["30 degrees", "45 degrees", "60 degrees", "15 degrees"], correctIndex: 1, explanation: "Bisecting splits an angle in half: 90 / 2 = 45 degrees." },
      { type: "question", question: "Should you erase construction arcs after completing a figure?", options: ["Yes, always", "No, they earn marks", "Only if messy", "Only the ones inside"], correctIndex: 1, explanation: "Construction arcs must remain visible. They demonstrate your method and earn method marks." },

      { type: "activity_of_integration", title: "Constructing a regular hexagon", scenario: "A regular hexagon has six equal sides and six equal angles of 120 degrees. It can be constructed using only a compass and ruler.", task: "Explain the steps to construct a regular hexagon inscribed in a circle. Why does this construction work?", hint: "The radius of the circle equals the side length of the hexagon.", answer: "Draw a circle. Keep the compass at the same radius. Starting from any point on the circle, mark off six arcs around the circumference. Connect the six points. This works because a regular hexagon is made of six equilateral triangles, each with side length equal to the radius of the circle. The total angle at the centre is 360 degrees, divided into six gives 60 degrees per triangle." },
    ],
  },

  // ====================================================================
  // TERM 2, TOPIC 2: SEQUENCES AND PATTERNS
  // ====================================================================
  {
    id: "s1-math-algebra-sequences",
    topicId: "sequences-patterns",
    subjectId: "mathematics",
    title: "Sequences and patterns",
    order: 6,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 2", "Patterns and Algebra", 2, "Sequence and Patterns",
      "The learners explore number patterns and sequences."),
    blocks: [
      { type: "competency", text: "The learners explore number patterns and sequences." },
      { type: "outcome", text: "Recognise and generate number patterns.", tag: "k,u" },
      { type: "outcome", text: "Explain how to generate a sequence.", tag: "u" },
      { type: "outcome", text: "Use number machines to generate a sequence.", tag: "k,s" },
      { type: "outcome", text: "Describe a general rule when a pattern is given.", tag: "k,u,s" },
      { type: "outcome", text: "Determine terms in a sequence.", tag: "u,s" },

      { type: "context", heading: "Patterns are everywhere", content: "The arrangement of seeds in a sunflower. The spiral of a snail shell. The rhythm of a drum. Number patterns are how mathematics describes the world. Recognising patterns is a core competency because it develops logical thinking and prediction skills that UNEB now actively tests." },

      { type: "text", heading: "What is a sequence?", content: "A sequence is an ordered list of numbers following a rule. For example: 2, 4, 6, 8, 10 is a sequence where each term increases by 2. The rule is 'multiply the position by 2' or 'add 2 to the previous term.' Understanding both types of rules (position-based and difference-based) is key." },

      { type: "key_point", title: "Two ways to describe a sequence", content: "1. TERM-TO-RULE: what you do to get from one term to the next (e.g., 'add 3'). 2. POSITION-TO-TERM RULE: a formula that gives the nth term directly (e.g., '3n' for 3, 6, 9, 12). The position-to-term rule is more powerful because it lets you find any term without calculating all the previous ones." },

      { type: "worked_example", problem: "Find the nth term of the sequence: 5, 8, 11, 14, 17...", steps: ["Find the difference between terms: 8 - 5 = 3, 11 - 8 = 3, 14 - 11 = 3.", "The common difference is 3, so the rule involves 3n.", "Check: if the rule is 3n, the first term would be 3 x 1 = 3. But the first term is 5.", "The difference is 5 - 3 = 2, so we add 2.", "The nth term rule is 3n + 2.", "Verify: 3(1)+2=5, 3(2)+2=8, 3(3)+2=11. All correct!"], answer: "nth term = 3n + 2", reasoning: "The coefficient of n always equals the common difference. The constant is found by checking what adjustment makes the formula match the first term. This method works for any arithmetic (constant difference) sequence." },

      { type: "worked_example", problem: "The first four terms of a sequence are 1, 4, 9, 16. Find the 10th term.", steps: ["Recognise the pattern: these are perfect squares: 1^2, 2^2, 3^2, 4^2.", "The nth term rule is n^2.", "The 10th term is 10^2 = 100."], answer: "100", reasoning: "Not all sequences have a constant difference. These square numbers have differences that increase: 3, 5, 7, 9. Recognising the pattern type (squares, cubes, primes) comes from familiarity and practice." },

      { type: "exam_style", scenario: "Sharon wants to shade multiples on a 1 to 100 square to make a pattern of horizontal lines. (NCDC sample assessment.)", question: "Can she do this? Explain your answer.", marks: 3 },

      { type: "marking_guide", totalMarks: 3, criteria: [
        { criterion: "Understands that horizontal lines require consecutive numbers in the same row", marks: 1, type: "method" },
        { criterion: "Recognises that multiples skip numbers (e.g., multiples of 3: 3, 6, 9 are not consecutive)", marks: 1, type: "method" },
        { criterion: "Concludes that multiples cannot form horizontal lines because they are not consecutive numbers, with clear justification", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "What is the next term in: 3, 7, 11, 15, ...?", options: ["16", "18", "19", "20"], correctIndex: 2, explanation: "The pattern adds 4 each time. 15 + 4 = 19." },
      { type: "question", question: "What is the nth term of: 4, 8, 12, 16, ...?", options: ["4n", "n + 4", "4n + 4", "2n"], correctIndex: 0, explanation: "Common difference is 4. First term is 4. So 4n gives 4, 8, 12, 16." },
      { type: "question", question: "Find the 5th term of the sequence with rule 2n + 1.", options: ["9", "10", "11", "12"], correctIndex: 2, explanation: "2(5) + 1 = 10 + 1 = 11." },
      { type: "question", question: "What is the 6th term of: 1, 4, 9, 16, 25, ...?", options: ["30", "36", "42", "49"], correctIndex: 1, explanation: "These are square numbers: 1, 4, 9, 16, 25, 36. The 6th term is 6^2 = 36." },

      { type: "activity_of_integration", title: "How many ways to continue?", scenario: "The sequence begins 2, 4, ... (NCDC sample assessment.)", task: "How many different ways can you continue this sequence? Explain how each sequence is generated.", hint: "Think of different rules that produce 2 and 4 as the first two terms.", answer: "Several possibilities: 2, 4, 6, 8 (add 2 each time, rule 2n). 2, 4, 8, 16 (multiply by 2 each time). 2, 4, 7, 11 (add 2, then 3, then 4). 2, 4, 9, 16 (squares plus 1). Each rule generates a valid continuation. This question tests the competency of describing general rules, not just finding one answer." },
    ],
  },

  // ====================================================================
  // TERM 2, TOPIC 3: BEARINGS
  // ====================================================================
  {
    id: "s1-math-geometry-bearings",
    topicId: "bearings",
    subjectId: "mathematics",
    title: "Bearings and direction",
    order: 7,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 2", "Geometry and Measures", 3, "Bearings",
      "The learner uses compass points, bearings and scale drawings."),
    blocks: [
      { type: "competency", text: "The learner uses compass points, bearings and scale drawings." },
      { type: "outcome", text: "Know the compass points.", tag: "k" },
      { type: "outcome", text: "Describe the direction of a place from a given point using compass points.", tag: "u,s" },
      { type: "outcome", text: "Describe the bearing of a place from a given point.", tag: "k,s" },
      { type: "outcome", text: "Apply bearings in real life situations.", tag: "u,s" },
      { type: "outcome", text: "Differentiate between a sketch and a scale drawing.", tag: "u,v" },

      { type: "context", heading: "Bearings in navigation", content: "Pilots use bearings to fly planes. Sailors use bearings to navigate ships. Even Google Maps uses bearings to give you directions. A bearing is simply a way to describe direction using angles, measured clockwise from North. Understanding bearings is a practical skill with direct real-world applications." },

      { type: "key_point", title: "The three rules of bearings", content: "1. Always measured from North (0 degrees). 2. Always measured clockwise. 3. Always written as three digits (e.g., 045 degrees, not 45 degrees). North is 000, East is 090, South is 180, West is 270." },

      { type: "worked_example", problem: "Henry's school is 4km from home on a bearing of 070 degrees. (NCDC sample assessment.) Describe what this means.", steps: ["Stand at Henry's home, facing North.", "Turn clockwise through 70 degrees.", "Walk 4km in that direction.", "You arrive at the school."], answer: "The school is 70 degrees clockwise from North, 4km away", reasoning: "The bearing tells you the direction. The distance tells you how far. Together they describe a precise location relative to a starting point. This is exactly how GPS and navigation systems work." },

      { type: "worked_example", problem: "Alex is facing North. He turns clockwise to face West. What angle has he turned through?", steps: ["North is 000 degrees.", "West is 270 degrees.", "Turning clockwise from North to West: 270 degrees.", "Alex turned through 270 degrees."], answer: "270 degrees", reasoning: "Bearings are always measured clockwise. From North (000) to West (270) going clockwise covers three-quarters of a full turn." },

      { type: "exam_style", scenario: "Henry's school is 4km away on a bearing of 070. The market is 1km from the school on a bearing of 250. The hospital is 6km from the market on a bearing of 310. (NCDC sample assessment.)", question: "Using a scale drawing, find the distance and bearing of the hospital from Henry's home.", marks: 6 },

      { type: "marking_guide", totalMarks: 6, criteria: [
        { criterion: "Appropriate scale chosen and stated (e.g., 1cm = 1km)", marks: 1, type: "method" },
        { criterion: "Home to school drawn correctly: 4km at 070 degrees", marks: 1, type: "method" },
        { criterion: "School to market drawn correctly: 1km at 250 degrees", marks: 1, type: "method" },
        { criterion: "Market to hospital drawn correctly: 6km at 310 degrees", marks: 1, type: "method" },
        { criterion: "Distance measured correctly from the scale drawing", marks: 1, type: "accuracy" },
        { criterion: "Bearing measured correctly from North at home to hospital", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "What is the bearing of East?", options: ["045", "090", "135", "180"], correctIndex: 1, explanation: "East is 90 degrees clockwise from North, written as 090." },
      { type: "question", question: "What is the bearing of South?", options: ["090", "180", "270", "360"], correctIndex: 1, explanation: "South is 180 degrees clockwise from North." },
      { type: "question", question: "How should the bearing 45 degrees be written?", options: ["45", "045", "45 degrees", "45.0"], correctIndex: 1, explanation: "Bearings are always written as three digits: 045." },
      { type: "question", question: "If you face North and turn 180 degrees clockwise, which direction do you face?", options: ["East", "South", "West", "North"], correctIndex: 1, explanation: "180 degrees clockwise from North puts you facing South." },

      { type: "activity_of_integration", title: "Two ships leave port", scenario: "Two ships leave Port Bell at the same time. One sails 80km on a bearing of 030 degrees to position A. The other sails 160km on a bearing of 110 degrees to position B. (NCDC sample assessment.)", task: "Using a scale drawing, find the distance between the two ships.", hint: "Choose a sensible scale (e.g., 1cm = 20km), draw both journeys from the same starting point, then measure the distance between A and B.", answer: "Draw Port Bell as a point. Draw ship 1: 80km at 030 degrees. Draw ship 2: 160km at 110 degrees. Measure the distance between A and B on your drawing and convert using your scale. The answer should be approximately 170km (answers vary with drawing accuracy). This tests the competency of applying bearings and scale drawings to solve real navigation problems." },
    ],
  },

  // ====================================================================
  // TERM 2, TOPIC 4: ANGLE PROPERTIES
  // ====================================================================
  {
    id: "s1-math-geometry-angles",
    topicId: "angle-properties",
    subjectId: "mathematics",
    title: "Angle properties of geometric figures",
    order: 8,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 2", "Geometry and Measures", 4, "Angle Properties of Geometric Figures",
      "The learner uses angle properties to solve problems involving lines and shapes."),
    blocks: [
      { type: "competency", text: "The learner uses angle properties to solve problems involving lines and shapes." },
      { type: "outcome", text: "Identify and use angle properties of triangles.", tag: "k,u" },
      { type: "outcome", text: "Identify and use angle properties of quadrilaterals.", tag: "k,u" },
      { type: "outcome", text: "Apply angle properties of intersecting and parallel lines.", tag: "u,s" },
      { type: "outcome", text: "Solve problems using angle sums.", tag: "u,s" },

      { type: "context", heading: "Angles in the world around us", content: "Every building relies on angle properties for stability. The corners of your classroom are 90 degrees. The angles in any triangle add up to 180 degrees, whether it is a tiny triangle on paper or a massive triangular structure on a bridge. These properties are constant and reliable, which is why engineers trust them." },

      { type: "key_point", title: "The fundamental rules", content: "Angles on a straight line add up to 180 degrees. Angles around a point add up to 360 degrees. Angles in a triangle add up to 180 degrees. Angles in a quadrilateral add up to 360 degrees. Vertically opposite angles are equal. These four rules solve the majority of angle problems in UNEB exams." },

      { type: "worked_example", problem: "A triangle has angles of 50 degrees and 60 degrees. Find the third angle.", steps: ["The angles in a triangle add to 180 degrees.", "Known angles: 50 + 60 = 110 degrees.", "Third angle: 180 - 110 = 70 degrees."], answer: "70 degrees", reasoning: "This property holds for EVERY triangle, no matter its shape. It is a consequence of the parallel postulate in geometry. Knowing this one rule lets you find any missing angle in any triangle." },

      { type: "worked_example", problem: "Two angles in a quadrilateral are 90 degrees and 110 degrees. The other two angles are equal. Find them.", steps: ["Angles in a quadrilateral add to 360 degrees.", "Known: 90 + 110 = 200 degrees.", "Remaining: 360 - 200 = 160 degrees.", "The two remaining angles are equal, so each is 160 / 2 = 80 degrees."], answer: "Each is 80 degrees", reasoning: "Any four-sided shape has internal angles summing to 360 degrees. You can verify this by dividing any quadrilateral into two triangles (each 180 degrees), giving 360 total." },

      { type: "exam_style", scenario: "In a triangle, angle A is 35 degrees and angle B is twice angle A.", question: "Find angle C and state the type of triangle.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly calculates angle B: 2 x 35 = 70 degrees", marks: 1, type: "method" },
        { criterion: "Applies angle sum: 35 + 70 = 105 degrees used", marks: 1, type: "method" },
        { criterion: "Calculates angle C: 180 - 105 = 75 degrees", marks: 1, type: "accuracy" },
        { criterion: "Correctly identifies the triangle type: scalene (all angles different)", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Angles in a triangle add up to...?", options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"], correctIndex: 1, explanation: "The interior angles of any triangle always sum to 180 degrees." },
      { type: "question", question: "Angles in a quadrilateral add up to...?", options: ["180 degrees", "270 degrees", "360 degrees", "450 degrees"], correctIndex: 2, explanation: "Any four-sided shape has interior angles summing to 360 degrees." },
      { type: "question", question: "Two angles on a straight line are x and 110 degrees. Find x.", options: ["60", "70", "80", "90"], correctIndex: 1, explanation: "Angles on a straight line add to 180: x = 180 - 110 = 70 degrees." },
      { type: "question", question: "Each angle in an equilateral triangle is...?", options: ["45 degrees", "60 degrees", "90 degrees", "120 degrees"], correctIndex: 1, explanation: "All three angles are equal and sum to 180: 180 / 3 = 60 degrees each." },

      { type: "activity_of_integration", title: "Proving the angle sum", scenario: "You are told that angles in a triangle add up to 180 degrees, but you want to prove it yourself.", task: "Describe two different methods to demonstrate that the angles in a triangle sum to 180 degrees.", hint: "One method uses cutting. Another uses parallel lines.", answer: "Method 1: Draw a triangle on paper. Cut off all three corners. Place the three corners together along a straight edge. They form a straight line (180 degrees). Method 2: Draw a triangle. Draw a line parallel to one side through the opposite vertex. The two new angles formed equal the other two angles of the triangle (alternate angles). The three angles on the straight line add to 180, proving the triangle angle sum." },
    ],
  },

  // ====================================================================
  // TERM 2, TOPIC 5: DATA COLLECTION AND PRESENTATION
  // ====================================================================
  {
    id: "s1-math-data-collection",
    topicId: "data-collection",
    subjectId: "mathematics",
    title: "Data collection and presentation",
    order: 9,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 2", "Data and Probability", 5, "Data Collection and Presentation",
      "The learner collects, organises and presents data."),
    blocks: [
      { type: "competency", text: "The learner collects, organises and presents data." },
      { type: "outcome", text: "Collect data from real-life situations.", tag: "u,s" },
      { type: "outcome", text: "Organise data using frequency tables.", tag: "k,s" },
      { type: "outcome", text: "Present data using bar charts, pie charts and line graphs.", tag: "k,s" },
      { type: "outcome", text: "Interpret data presented in various forms.", tag: "u,s" },

      { type: "context", heading: "Data drives decisions", content: "When the government decides how many schools to build, it uses data. When a business decides what products to stock, it uses data. When a doctor tracks a patient's recovery, they use data. The ability to collect, organise and present data is a life skill. UNEB tests this competency because data literacy matters in every career." },

      { type: "text", heading: "Types of data", content: "Data can be qualitative (descriptive, like colours or names) or quantitative (numerical, like heights or scores). Quantitative data can be discrete (countable, like number of students) or continuous (measurable, like height or time). Knowing the type of data helps you choose the right way to present it." },

      { type: "key_point", title: "Choosing the right chart", content: "Bar charts compare categories. Pie charts show proportions of a whole. Line graphs show change over time. Pictograms use symbols to make data accessible. Choosing the wrong chart can mislead the reader. Always match the chart type to the purpose of your data." },

      { type: "worked_example", problem: "In a class of 30 students, 12 prefer Maths, 8 prefer English, 6 prefer Science, and 4 prefer History. Present this as a pie chart.", steps: ["Total students: 30. A full circle is 360 degrees.", "Each student represents: 360 / 30 = 12 degrees.", "Maths: 12 students x 12 degrees = 144 degrees.", "English: 8 x 12 = 96 degrees.", "Science: 6 x 12 = 72 degrees.", "History: 4 x 12 = 48 degrees.", "Check: 144 + 96 + 72 + 48 = 360 degrees. Correct!"], answer: "Maths: 144, English: 96, Science: 72, History: 48 degrees", reasoning: "A pie chart shows parts of a whole. Each category's angle is proportional to its frequency. Dividing 360 by the total gives the degrees per unit, which you multiply by each category's count." },

      { type: "exam_style", scenario: "A school collected data on how 40 students travel to school: 16 walk, 10 take a bus, 8 cycle, and 6 come by car.", question: "Draw a bar chart to represent this data and state which is the most common mode of transport.", marks: 5 },

      { type: "marking_guide", totalMarks: 5, criteria: [
        { criterion: "Correct axes labelled (mode of transport and frequency)", marks: 1, type: "method" },
        { criterion: "Appropriate and consistent scale chosen", marks: 1, type: "method" },
        { criterion: "All four bars drawn at correct heights", marks: 1, type: "method" },
        { criterion: "Bars correctly labelled", marks: 1, type: "communication" },
        { criterion: "Correctly identifies walking as the most common (16 students)", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "Which chart is best for showing proportions of a whole?", options: ["Bar chart", "Pie chart", "Line graph", "Pictogram"], correctIndex: 1, explanation: "Pie charts show how a whole is divided into parts. Each slice is proportional to its share of the total." },
      { type: "question", question: "Which chart is best for showing change over time?", options: ["Bar chart", "Pie chart", "Line graph", "Pictogram"], correctIndex: 2, explanation: "Line graphs connect data points in order, making trends over time visible." },
      { type: "question", question: "In a pie chart of 60 students, what angle represents 15 students?", options: ["45 degrees", "60 degrees", "90 degrees", "120 degrees"], correctIndex: 2, explanation: "360 / 60 = 6 degrees per student. 15 x 6 = 90 degrees." },
      { type: "question", question: "Which type of data is 'number of goals scored in a match'?", options: ["Qualitative", "Discrete quantitative", "Continuous quantitative", "Categorical"], correctIndex: 1, explanation: "Goals are counted in whole numbers, making this discrete quantitative data." },

      { type: "activity_of_integration", title: "Survey your class", scenario: "You want to find out which subjects your classmates find most interesting.", task: "Design a data collection process. What question will you ask? How will you record responses? How will you present the results?", hint: "Think about the question wording, recording method (tally chart), and presentation (bar chart or pie chart).", answer: "Question: 'Which subject do you find most interesting?' (clear, single-answer). Recording: tally chart with subjects as categories. Presentation: bar chart (easy to compare) or pie chart (shows proportions). A good survey has a clear question, consistent recording, and a presentation that matches the purpose. This is the full data cycle that NCDC assesses." },
    ],
  },

  // ====================================================================
  // TERM 3, TOPIC 1: REFLECTION
  // ====================================================================
  {
    id: "s1-math-geometry-reflection",
    topicId: "reflection",
    subjectId: "mathematics",
    title: "Reflection",
    order: 10,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 3", "Geometry and Measures", 10, "Reflection",
      "The learner carries out reflections and identifies properties of reflected figures."),
    blocks: [
      { type: "competency", text: "The learner carries out reflections and identifies properties of reflected figures." },
      { type: "outcome", text: "Reflect points and shapes in a mirror line.", tag: "k,s" },
      { type: "outcome", text: "Identify the mirror line given an object and its image.", tag: "u" },
      { type: "outcome", text: "Recognise that reflection preserves length and angle but reverses orientation.", tag: "u" },

      { type: "context", heading: "Reflections in nature and design", content: "When you look in a mirror, you see a reflection. Water surfaces create natural reflections. Symmetric patterns in art and architecture use reflection. Understanding reflection helps with design, engineering, and understanding symmetry in nature." },

      { type: "key_point", title: "The rules of reflection", content: "1. Every point and its reflected image are the same distance from the mirror line. 2. The line connecting a point to its image is perpendicular to the mirror line. 3. Reflection preserves lengths and angles but reverses the image (left becomes right)." },

      { type: "worked_example", problem: "Reflect the point (3, 4) in the y-axis. What are the coordinates of the image?", steps: ["The y-axis is the mirror line (x = 0).", "The point is 3 units to the right of the y-axis.", "The reflected image must be 3 units to the left.", "So the x-coordinate changes sign: from 3 to -3.", "The y-coordinate stays the same: 4."], answer: "(-3, 4)", reasoning: "Reflecting in the y-axis changes the sign of the x-coordinate only. Reflecting in the x-axis changes the sign of the y-coordinate only. Reflecting in the line y = x swaps the coordinates." },

      { type: "exam_style", scenario: "Triangle A has vertices at (1, 2), (4, 2), and (1, 5).", question: "Reflect triangle A in the y-axis. Give the coordinates of the reflected triangle and describe one property that stays the same.", marks: 5 },

      { type: "marking_guide", totalMarks: 5, criteria: [
        { criterion: "Correctly reflects all three vertices (x-coordinates change sign)", marks: 2, type: "method" },
        { criterion: "Correct coordinates: (-1, 2), (-4, 2), (-1, 5)", marks: 1, type: "accuracy" },
        { criterion: "Identifies a preserved property: side lengths, angles, or area", marks: 1, type: "method" },
        { criterion: "Clear description with correct mathematical language", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Reflecting (5, 3) in the y-axis gives...?", options: ["(-5, 3)", "(5, -3)", "(-5, -3)", "(3, 5)"], correctIndex: 0, explanation: "Reflecting in the y-axis changes the sign of the x-coordinate: (5, 3) becomes (-5, 3)." },
      { type: "question", question: "Reflecting (2, 7) in the x-axis gives...?", options: ["(-2, 7)", "(2, -7)", "(-2, -7)", "(7, 2)"], correctIndex: 1, explanation: "Reflecting in the x-axis changes the sign of the y-coordinate: (2, 7) becomes (2, -7)." },
      { type: "question", question: "What does reflection preserve?", options: ["Orientation only", "Length and angle only", "Position only", "Nothing"], correctIndex: 1, explanation: "Reflection preserves lengths and angles. It reverses orientation (left becomes right)." },
      { type: "question", question: "The mirror line is always... to the line connecting a point to its image.", options: ["Parallel", "Perpendicular", "At 45 degrees", "Unrelated"], correctIndex: 1, explanation: "The mirror line is perpendicular to the line joining any point to its reflected image." },

      { type: "activity_of_integration", title: "Symmetry hunt", scenario: "Many letters of the alphabet have reflection symmetry.", task: "Which capital letters have reflection symmetry? Identify the mirror line for each.", hint: "A letter has line symmetry if you can draw a line through it and both halves match.", answer: "Vertical mirror line: A, H, I, M, O, T, U, V, W, X, Y. Horizontal mirror line: B, C, D, E, H, I, K, O, X. Letters with both: H, I, O, X. Letters with none: F, G, J, L, N, P, Q, R, S, Z. This builds spatial reasoning and understanding of symmetry properties." },
    ],
  },

  // ====================================================================
  // TERM 3, TOPIC 2: EQUATIONS OF LINES AND CURVES
  // ====================================================================
  {
    id: "s1-math-algebra-lines",
    topicId: "equations-lines",
    subjectId: "mathematics",
    title: "Equations of lines and curves",
    order: 11,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 3", "Patterns and Algebra", 11, "Equations of Lines and Curves",
      "The learner represents linear relationships using equations and graphs."),
    blocks: [
      { type: "competency", text: "The learner represents linear relationships using equations and graphs." },
      { type: "outcome", text: "Plot points from a rule to generate a straight line.", tag: "k,s" },
      { type: "outcome", text: "Recognise the equation of a straight line in the form y = mx + c.", tag: "k,u" },
      { type: "outcome", text: "Identify gradient and y-intercept from an equation.", tag: "u" },
      { type: "outcome", text: "Draw a line given its equation.", tag: "u,s" },

      { type: "context", heading: "Lines describe relationships", content: "If a boda boda charges 1,000 UGX flag fall plus 500 UGX per kilometre, that is a linear relationship. The equation y = 500x + 1000 describes the total fare for any distance. Linear equations describe rates, costs, speeds and any relationship with a constant rate of change. They are the foundation of understanding how quantities relate." },

      { type: "key_point", title: "y = mx + c", content: "Every straight line can be written as y = mx + c. m is the gradient (steepness). c is the y-intercept (where the line crosses the y-axis). Positive m means the line goes up-right. Negative m means it goes down-right. Larger m means steeper." },

      { type: "worked_example", problem: "Draw the line y = 2x + 1 by plotting points.", steps: ["Choose values of x: 0, 1, 2, 3.", "When x = 0: y = 2(0) + 1 = 1. Point: (0, 1).", "When x = 1: y = 2(1) + 1 = 3. Point: (1, 3).", "When x = 2: y = 2(2) + 1 = 5. Point: (2, 5).", "When x = 3: y = 2(3) + 1 = 7. Point: (3, 7).", "Plot these points and connect them with a straight line."], answer: "A straight line passing through (0, 1), (1, 3), (2, 5), (3, 7)", reasoning: "Every point on the line satisfies the equation y = 2x + 1. The gradient 2 means y increases by 2 for every 1 increase in x. The y-intercept 1 means the line crosses the y-axis at y = 1." },

      { type: "exam_style", scenario: "A water tank is being filled. The depth of water is given by y = 3x + 2, where y is depth in cm and x is time in minutes.", question: "What is the depth after 5 minutes? What does the 3 represent in this context?", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly substitutes x = 5 into the equation", marks: 1, type: "method" },
        { criterion: "Correct calculation: y = 3(5) + 2 = 17 cm", marks: 1, type: "accuracy" },
        { criterion: "Identifies that 3 represents the rate of filling (3 cm per minute)", marks: 1, type: "method" },
        { criterion: "Clear explanation using correct units and context", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "In y = 3x + 5, what is the gradient?", options: ["3", "5", "8", "15"], correctIndex: 0, explanation: "In y = mx + c, m is the gradient. Here m = 3." },
      { type: "question", question: "In y = 3x + 5, what is the y-intercept?", options: ["3", "5", "8", "0"], correctIndex: 1, explanation: "In y = mx + c, c is the y-intercept. Here c = 5." },
      { type: "question", question: "What does a gradient of 0 mean?", options: ["Vertical line", "Horizontal line", "Steep upward line", "Steep downward line"], correctIndex: 1, explanation: "A gradient of 0 means no vertical change: a horizontal line." },
      { type: "question", question: "When x = 2, what is y in the equation y = 4x - 3?", options: ["3", "5", "8", "11"], correctIndex: 1, explanation: "y = 4(2) - 3 = 8 - 3 = 5." },

      { type: "activity_of_integration", title: "The boda boda fare", scenario: "A boda boda rider charges 1,000 UGX to start the journey (flag fall) plus 500 UGX for each kilometre travelled.", task: "Write an equation for the total fare y for a journey of x kilometres. How much does a 7km journey cost?", hint: "The fixed charge is the y-intercept. The per-kilometre charge is the gradient.", answer: "y = 500x + 1000. For 7km: y = 500(7) + 1000 = 3500 + 1000 = 4500 UGX. The gradient (500) is the rate per kilometre. The y-intercept (1000) is the starting fare. This is how linear equations model real-world costs." },
    ],
  },

  // ====================================================================
  // TERM 3, TOPIC 3: ALGEBRA 1
  // ====================================================================
  {
    id: "s1-math-algebra-algebra1",
    topicId: "algebra-1",
    subjectId: "mathematics",
    title: "Algebra 1: equations and expressions",
    order: 12,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 3", "Patterns and Algebra", 12, "Algebra 1",
      "The learner simplifies algebraic expressions and solves linear equations."),
    blocks: [
      { type: "competency", text: "The learner simplifies algebraic expressions and solves linear equations." },
      { type: "outcome", text: "Form algebraic expressions from word problems.", tag: "u,s" },
      { type: "outcome", text: "Simplify expressions by collecting like terms.", tag: "k,s" },
      { type: "outcome", text: "Expand brackets in algebraic expressions.", tag: "u,s" },
      { type: "outcome", text: "Factorise simple algebraic expressions.", tag: "u,s" },
      { type: "outcome", text: "Solve linear equations with unknowns on both sides.", tag: "u,s" },

      { type: "context", heading: "Algebra is a language", content: "Algebra is how mathematics describes the world in general terms. Instead of saying '3 plus 5 is 8,' algebra says 'a plus b is c,' which works for any numbers. This generality is what makes algebra powerful. When a shopkeeper calculates profit for any number of items sold, they are using algebra." },

      { type: "key_point", title: "Like terms", content: "Like terms have the same variable raised to the same power. 3x and 5x are like terms (both have x). 3x and 3x^2 are NOT like terms (different powers). You can only add or subtract like terms. 3x + 5x = 8x. But 3x + 3x^2 cannot be simplified further." },

      { type: "worked_example", problem: "Simplify: 3x + 2y + 5x - y", steps: ["Group like terms together: (3x + 5x) + (2y - y).", "Combine x terms: 3x + 5x = 8x.", "Combine y terms: 2y - y = y.", "Result: 8x + y."], answer: "8x + y", reasoning: "You can only combine terms with the same variable. The x terms combine with x terms. The y terms combine with y terms. The result cannot be simplified further because x and y are different variables." },

      { type: "worked_example", problem: "Solve: 3x + 4 = 2x + 9", steps: ["Get x terms on one side: subtract 2x from both sides.", "3x - 2x + 4 = 9, which simplifies to x + 4 = 9.", "Subtract 4 from both sides: x = 9 - 4.", "x = 5.", "Check: 3(5) + 4 = 19. 2(5) + 9 = 19. Both sides equal. Correct!"], answer: "x = 5", reasoning: "When x appears on both sides, your first step is to collect x terms on one side. Then you can isolate x using the balance method. Always check by substituting your answer back into the original equation." },

      { type: "worked_example", problem: "A father is 3 times as old as his son. In 10 years, the father will be twice the son's age. How old is the son now?", steps: ["Let the son's age be x. Then the father's age is 3x.", "In 10 years: son will be x + 10, father will be 3x + 10.", "The equation: 3x + 10 = 2(x + 10).", "Expand: 3x + 10 = 2x + 20.", "Subtract 2x: x + 10 = 20.", "Subtract 10: x = 10. The son is 10 years old."], answer: "The son is 10 years old", reasoning: "Word problems become manageable when you let a letter represent the unknown, then translate each sentence into an equation. The key skill is setting up the equation correctly from the English words." },

      { type: "exam_style", scenario: "Nambi has four number cards: 3, 4, 0, 7. She arranges them to form different numbers. (NCDC sample assessment.)", question: "What is the greatest even number Nambi can form using all four cards? What is the least odd number?", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Recognises the number must end in an even digit (0 or 4) for the even number", marks: 1, type: "method" },
        { criterion: "Correct greatest even number: 7430", marks: 1, type: "accuracy" },
        { criterion: "Recognises the number must end in 3 or 7 for the odd number", marks: 1, type: "method" },
        { criterion: "Correct least odd number: 3047", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "Simplify: 4a + 3b - 2a + b", options: ["2a + 4b", "6a + 4b", "2a + 2b", "4ab"], correctIndex: 0, explanation: "Group: (4a - 2a) + (3b + b) = 2a + 4b." },
      { type: "question", question: "Expand: 3(x + 4)", options: ["3x + 4", "3x + 12", "3x + 7", "x + 12"], correctIndex: 1, explanation: "3 times x is 3x. 3 times 4 is 12. Result: 3x + 12." },
      { type: "question", question: "Solve: 2x + 5 = 17", options: ["x = 4", "x = 6", "x = 8", "x = 11"], correctIndex: 1, explanation: "Subtract 5: 2x = 12. Divide by 2: x = 6." },
      { type: "question", question: "Factorise: 6x + 9", options: ["3(2x + 3)", "2(3x + 4)", "6(x + 9)", "3(2x + 9)"], correctIndex: 0, explanation: "HCF of 6 and 9 is 3. 6x/3 = 2x, 9/3 = 3. So 3(2x + 3)." },
      { type: "question", question: "Solve: 5x - 3 = 2x + 6", options: ["x = 1", "x = 3", "x = 9", "x = 2"], correctIndex: 1, explanation: "Subtract 2x: 3x - 3 = 6. Add 3: 3x = 9. Divide by 3: x = 3." },

      { type: "activity_of_integration", title: "The number card puzzle", scenario: "Nambi has four number cards: 3, 4, 0, 7. (NCDC sample.) She can arrange them to form different numbers. For example, she can form 3407.", task: "How many hundreds are there in one million? Find the prime factorisations of 942 and 357. Hence find the HCF and LCM.", hint: "For the first part, think about place value. For the second, use prime factorisation.", answer: "One million is 1,000,000. One hundred is 100. So there are 1,000,000 / 100 = 10,000 hundreds in a million. 942 = 2 x 3 x 157. 357 = 3 x 7 x 17. HCF = 3 (the only common prime). LCM = 2 x 3 x 7 x 17 x 157 = 111,954. This integrates multiple number concepts from the topic." },
    ],
  },

  // ====================================================================
  // TERM 3, TOPIC 4: BUSINESS ARITHMETIC
  // ====================================================================
  {
    id: "s1-math-geometry-business",
    topicId: "business-arithmetic",
    subjectId: "mathematics",
    title: "Business arithmetic",
    order: 13,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 3", "Geometry and Measures", 13, "Business Arithmetic",
      "The learner applies mathematical skills to solve business and financial problems."),
    blocks: [
      { type: "competency", text: "The learner applies mathematical skills to solve business and financial problems." },
      { type: "outcome", text: "Calculate profit, loss and percentage profit.", tag: "u,s" },
      { type: "outcome", text: "Calculate discounts and selling prices.", tag: "u,s" },
      { type: "outcome", text: "Calculate simple interest.", tag: "u,s" },
      { type: "outcome", text: "Calculate hire purchase prices.", tag: "u,s" },
      { type: "outcome", text: "Solve real-life problems involving money.", tag: "u,s,v/a" },

      { type: "context", heading: "Money maths you will use forever", content: "Whether you are running a business, managing a household budget, or deciding whether a loan is fair, business arithmetic is the maths you will use most in daily life. In Uganda, understanding profit margins, discounts, and interest rates helps you avoid being cheated and make smart financial decisions." },

      { type: "key_point", title: "Profit and loss", content: "Profit = Selling Price - Cost Price (when selling price is higher). Loss = Cost Price - Selling Price (when cost price is higher). Percentage profit = (Profit / Cost Price) x 100. Always divide by the COST price, not the selling price. This is the most common mistake students make." },

      { type: "worked_example", problem: "A trader buys a phone for 200,000 UGX and sells it for 250,000 UGX. Find the profit and percentage profit.", steps: ["Profit = Selling Price - Cost Price = 250,000 - 200,000 = 50,000 UGX.", "Percentage profit = (Profit / Cost Price) x 100.", "= (50,000 / 200,000) x 100.", "= 0.25 x 100 = 25%."], answer: "Profit: 50,000 UGX. Percentage profit: 25%", reasoning: "Percentage profit is always calculated relative to the cost price (the amount invested), not the selling price. This is because the profit is measured against what you put in, not what you got back." },

      { type: "worked_example", problem: "A shop offers a 15% discount on an item priced at 80,000 UGX. A customer buys it with the discount. What does the customer pay?", steps: ["Discount = 15% of 80,000 = 0.15 x 80,000 = 12,000 UGX.", "Sale price = 80,000 - 12,000 = 68,000 UGX.", "Alternatively: customer pays 85% of 80,000 = 0.85 x 80,000 = 68,000 UGX."], answer: "68,000 UGX", reasoning: "Both methods give the same answer. You can subtract the discount from the original price, or calculate the percentage the customer actually pays (100% - 15% = 85%) directly." },

      { type: "worked_example", problem: "Calculate the simple interest on 500,000 UGX invested at 8% per year for 3 years.", steps: ["Simple interest formula: I = P x R x T / 100.", "P = 500,000 (principal), R = 8 (rate), T = 3 (time in years).", "I = 500,000 x 8 x 3 / 100.", "I = 12,000,000 / 100 = 120,000 UGX.", "Total amount after 3 years: 500,000 + 120,000 = 620,000 UGX."], answer: "Interest: 120,000 UGX. Total: 620,000 UGX", reasoning: "Simple interest is calculated only on the original amount (principal). Each year earns the same interest: 8% of 500,000 = 40,000. Over 3 years: 3 x 40,000 = 120,000. This differs from compound interest, where interest earns interest." },

      { type: "exam_style", scenario: "A shopkeeper buys 50 bags of rice at 60,000 UGX each. She sells 40 bags at 75,000 UGX each and the remaining 10 bags at 50,000 UGX each (a clearance sale).", question: "Calculate her total profit or loss and the percentage profit or loss.", marks: 6 },

      { type: "marking_guide", totalMarks: 6, criteria: [
        { criterion: "Total cost price: 50 x 60,000 = 3,000,000 UGX", marks: 1, type: "method" },
        { criterion: "Revenue from first 40 bags: 40 x 75,000 = 3,000,000 UGX", marks: 1, type: "method" },
        { criterion: "Revenue from remaining 10 bags: 10 x 50,000 = 500,000 UGX", marks: 1, type: "method" },
        { criterion: "Total revenue: 3,000,000 + 500,000 = 3,500,000 UGX", marks: 1, type: "method" },
        { criterion: "Profit: 3,500,000 - 3,000,000 = 500,000 UGX", marks: 1, type: "accuracy" },
        { criterion: "Percentage profit: (500,000 / 3,000,000) x 100 = 16.7%", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "A trader buys at 10,000 and sells at 12,000. What is the percentage profit?", options: ["16.7%", "20%", "25%", "12%"], correctIndex: 1, explanation: "Profit = 2,000. Percentage = (2,000 / 10,000) x 100 = 20%." },
      { type: "question", question: "An item costs 40,000 UGX with a 10% discount. What is the sale price?", options: ["30,000", "36,000", "34,000", "38,000"], correctIndex: 1, explanation: "Discount = 4,000. Sale price = 40,000 - 4,000 = 36,000. Or: 90% of 40,000 = 36,000." },
      { type: "question", question: "Simple interest on 100,000 at 5% for 2 years is...?", options: ["5,000", "10,000", "15,000", "20,000"], correctIndex: 1, explanation: "I = 100,000 x 5 x 2 / 100 = 10,000 UGX." },
      { type: "question", question: "A trader buys at 50,000 and sells at 45,000. What is the percentage loss?", options: ["5%", "10%", "15%", "20%"], correctIndex: 1, explanation: "Loss = 5,000. Percentage = (5,000 / 50,000) x 100 = 10%." },

      { type: "activity_of_integration", title: "The market trader", scenario: "Mama Sarah runs a produce stall in Nakasero Market. She buys tomatoes at 2,000 UGX per kg and sells them at 3,000 UGX per kg. Transport costs her 10,000 UGX per day and stall rent is 5,000 UGX per day. She sells 50 kg of tomatoes per day.", task: "Calculate her daily profit and her percentage profit on the cost of goods sold.", hint: "Remember to include all costs (tomatoes + transport + rent) in the total cost.", answer: "Cost of tomatoes: 50 x 2,000 = 100,000. Transport: 10,000. Rent: 5,000. Total cost: 115,000. Revenue: 50 x 3,000 = 150,000. Profit: 150,000 - 115,000 = 35,000 UGX per day. Percentage profit on cost of goods: (35,000 / 115,000) x 100 = 30.4%. This integrates multiple arithmetic operations in a realistic Ugandan business context." },
    ],
  },

  // ====================================================================
  // TERM 3, TOPIC 5: TIME AND TIME TABLES
  // ====================================================================
  {
    id: "s1-math-geometry-time",
    topicId: "time-tables",
    subjectId: "mathematics",
    title: "Time and time tables",
    order: 14,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 3", "Geometry and Measures", 14, "Time and Time Tables",
      "The learner reads, interprets and calculates with time and timetables."),
    blocks: [
      { type: "competency", text: "The learner reads, interprets and calculates with time and timetables." },
      { type: "outcome", text: "Convert between 12-hour and 24-hour clock.", tag: "k,s" },
      { type: "outcome", text: "Read and interpret travel timetables.", tag: "u,s" },
      { type: "outcome", text: "Calculate time intervals and durations.", tag: "u,s" },
      { type: "outcome", text: "Convert between units of time.", tag: "k,s" },

      { type: "context", heading: "Time is money", content: "Buses, flights, school bells, meetings, exams. Everything runs on schedules. Being able to read timetables and calculate time durations is a practical skill you use every day. Missing a bus because you misread a timetable has real consequences. UNEB tests this because time management is a life competency." },

      { type: "key_point", title: "12-hour vs 24-hour clock", content: "The 12-hour clock uses AM (morning) and PM (afternoon). The 24-hour clock runs from 00:00 (midnight) to 23:59. To convert PM to 24-hour: add 12. So 3:00 PM becomes 15:00. Morning times stay the same: 9:00 AM is 09:00 in 24-hour format." },

      { type: "worked_example", problem: "A bus departs Kampala at 0830 hours and arrives in Jinja at 1030 hours. How long is the journey?", steps: ["Departure: 0830. Arrival: 1030.", "Subtract: 1030 - 0830.", "Hours: 10 - 8 = 2 hours.", "Minutes: 30 - 30 = 0 minutes.", "Journey time: 2 hours."], answer: "2 hours", reasoning: "When both times are in the same format and on the same day, you can subtract directly. If the journey crosses midday or midnight, or uses different formats, you need to convert first." },

      { type: "worked_example", problem: "Convert 3:45 PM to 24-hour format.", steps: ["3:45 PM is in the afternoon, so add 12 to the hours.", "3 + 12 = 15.", "The minutes stay the same: 45.", "Result: 1545 hours."], answer: "1545 hours", reasoning: "Only PM times need conversion. AM times stay the same (just add a leading zero if needed). The minutes never change when converting between 12-hour and 24-hour format." },

      { type: "exam_style", scenario: "A train timetable shows: Entebbe depart 0715, Kampala arrive 0845. The return journey departs Kampala at 1645 and arrives Entebbe at 1815.", question: "How long is each journey? What is the total time between the morning departure and evening arrival?", marks: 5 },

      { type: "marking_guide", totalMarks: 5, criteria: [
        { criterion: "Morning journey: 0845 - 0715 = 1 hour 30 minutes", marks: 1, type: "method" },
        { criterion: "Evening journey: 1815 - 1645 = 1 hour 30 minutes", marks: 1, type: "method" },
        { criterion: "Correctly identifies both journeys are the same duration", marks: 1, type: "accuracy" },
        { criterion: "Total time: from 0715 to 1815 = 11 hours", marks: 1, type: "method" },
        { criterion: "Clear working with correct time format", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Convert 7:30 PM to 24-hour format.", options: ["0730", "1730", "1930", "2030"], correctIndex: 2, explanation: "PM means add 12 to hours: 7 + 12 = 19. So 1930 hours." },
      { type: "question", question: "A lesson starts at 0900 and ends at 0945. How long is it?", options: ["35 minutes", "40 minutes", "45 minutes", "50 minutes"], correctIndex: 2, explanation: "0945 - 0900 = 45 minutes." },
      { type: "question", question: "How many minutes are in 2.5 hours?", options: ["120", "150", "180", "250"], correctIndex: 1, explanation: "2 hours = 120 minutes. Half an hour = 30 minutes. Total: 150 minutes." },
      { type: "question", question: "Convert 1430 to 12-hour format.", options: ["2:30 AM", "2:30 PM", "4:30 PM", "12:30 PM"], correctIndex: 1, explanation: "1430 is in the afternoon. Subtract 12: 14 - 12 = 2. So 2:30 PM." },

      { type: "activity_of_integration", title: "Plan a journey", scenario: "You need to travel from Kampala to Mbarara for a meeting at 1400 hours. A bus company offers three departures: 0800 (arrives 1215), 0930 (arrives 1345), and 1100 (arrives 1445). The meeting venue is 15 minutes from the bus station.", task: "Which bus should you take? Explain your reasoning.", hint: "Consider arrival time plus travel from the bus station to the venue. Also consider the risk of delays.", answer: "The 0800 bus arrives at 1215, giving you 1 hour 45 minutes before the meeting. Plenty of time for the 15-minute trip from the station, plus a buffer for delays. The 0930 arrives at 1345, leaving only 15 minutes, which is risky. The 1100 arrives at 1445, which is after the meeting starts. The 0800 bus is the safe choice. This tests the competency of interpreting timetables and making practical decisions." },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return sampleLessons.find((l) => l.id === id);
}

export function getLessonsByTopic() {
  const topics: Record<string, { topicId: string; title: string; theme: string; term: string; lessons: Lesson[] }> = {};

  for (const lesson of sampleLessons) {
    if (!topics[lesson.topicId]) {
      const topicInfo: Record<string, { title: string; theme: string; term: string }> = {
        "number-bases": { title: "Number Bases", theme: "Numbers", term: "Term 1" },
        "integers": { title: "Working with Integers", theme: "Numbers", term: "Term 1" },
        "fractions-percentages-decimals": { title: "Fractions, Percentages and Decimals", theme: "Numbers", term: "Term 1" },
        "cartesian-coordinates": { title: "Cartesian Coordinates in 2D", theme: "Numbers", term: "Term 1" },
        "geometric-construction": { title: "Geometric Construction Skills", theme: "Geometry and Measures", term: "Term 2" },
        "sequences-patterns": { title: "Sequences and Patterns", theme: "Patterns and Algebra", term: "Term 2" },
        "bearings": { title: "Bearings", theme: "Geometry and Measures", term: "Term 2" },
        "angle-properties": { title: "Angle Properties of Geometric Figures", theme: "Geometry and Measures", term: "Term 2" },
        "data-collection": { title: "Data Collection and Presentation", theme: "Data and Probability", term: "Term 2" },
        "reflection": { title: "Reflection", theme: "Geometry and Measures", term: "Term 3" },
        "equations-lines": { title: "Equations of Lines and Curves", theme: "Patterns and Algebra", term: "Term 3" },
        "algebra-1": { title: "Algebra 1", theme: "Patterns and Algebra", term: "Term 3" },
        "business-arithmetic": { title: "Business Arithmetic", theme: "Geometry and Measures", term: "Term 3" },
        "time-tables": { title: "Time and Time Tables", theme: "Geometry and Measures", term: "Term 3" },
      };
      const info = topicInfo[lesson.topicId];
      topics[lesson.topicId] = {
        topicId: lesson.topicId,
        title: info?.title || lesson.topicId,
        theme: info?.theme || "Numbers",
        term: info?.term || "Term 1",
        lessons: [],
      };
    }
    topics[lesson.topicId].lessons.push(lesson);
  }

  return Object.values(topics);
}
