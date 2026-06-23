import type { Lesson } from "@/types";

/**
 * Soma Curriculum Content - S1 Mathematics
 *
 * Built from the official NCDC Lower Secondary Mathematics Syllabus.
 * Each lesson is mapped to a specific topic, term, and learning outcome.
 *
 * Source: NCDC Mathematics Syllabus (ncdc.go.ug)
 * Level: Senior 1
 *
 * See docs/spec/content-strategy.md for the full content pipeline.
 */

export const curriculumMeta = {
  subject: "Mathematics",
  level: "S1",
  source: "NCDC Lower Secondary Mathematics Syllabus",
  themes: ["Numbers", "Geometry and Measures", "Patterns and Algebra", "Data and Probability"],
};

export const sampleLessons: Lesson[] = [
  // ================================================================
  // TERM 1, TOPIC 1: NUMBER BASES (15 periods)
  // Theme: Numbers
  // ================================================================
  {
    id: "s1-math-t1-numbers-bases-intro",
    topicId: "number-bases",
    subjectId: "mathematics",
    title: "Understanding number bases",
    order: 1,
    estimatedMinutes: 12,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What is a number base?",
        content:
          "A number base (or radix) is the number of unique digits used to represent numbers. We normally count in base ten because we have ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. But other bases exist. Computers use base two (binary), which only has digits 0 and 1. Some cultures historically used base five, base twelve, or base twenty. In this topic, you will learn to work confidently with numbers in different bases.",
      },
      {
        type: "key_point",
        title: "The base tells you the digits",
        content:
          "Base 10 uses digits 0 to 9. Base 2 (binary) uses digits 0 and 1. Base 5 uses digits 0, 1, 2, 3, 4. Base 8 (octal) uses digits 0 to 7. The highest digit in any base is always one less than the base. So in base 5, the highest digit is 4.",
      },
      {
        type: "worked_example",
        problem: "What does 243 in base 5 actually mean?",
        steps: [
          "The number 243 base 5 has three digits: 2, 4, and 3.",
          "Each position has a value based on powers of 5 (from right to left): 5^0, 5^1, 5^2.",
          "So 243 base 5 = 2 x 5^2 + 4 x 5^1 + 3 x 5^0.",
          "Calculate: 2 x 25 + 4 x 5 + 3 x 1 = 50 + 20 + 3.",
          "Answer: 243 base 5 = 73 in base 10.",
        ],
        answer: "73 (base 10)",
      },
      {
        type: "worked_example",
        problem: "Convert 1011 base 2 to base 10",
        steps: [
          "Positions from right to left are powers of 2: 2^0, 2^1, 2^2, 2^3.",
          "1011 base 2 = 1 x 2^3 + 0 x 2^2 + 1 x 2^1 + 1 x 2^0.",
          "Calculate: 1 x 8 + 0 x 4 + 1 x 2 + 1 x 1 = 8 + 0 + 2 + 1.",
          "Answer: 1011 base 2 = 11 in base 10.",
        ],
        answer: "11 (base 10)",
      },
      {
        type: "question",
        question: "Which digits are valid in base 8?",
        options: ["0 to 7", "0 to 8", "1 to 8", "0 to 9"],
        correctIndex: 0,
        explanation: "Base 8 uses digits 0 to 7. The highest digit is always one less than the base.",
      },
      {
        type: "question",
        question: "Convert 34 base 5 to base 10.",
        options: ["19", "34", "17", "24"],
        correctIndex: 0,
        explanation: "34 base 5 = 3 x 5^1 + 4 x 5^0 = 3 x 5 + 4 x 1 = 15 + 4 = 19.",
      },
      {
        type: "question",
        question: "Convert 110 base 2 to base 10.",
        options: ["3", "4", "5", "6"],
        correctIndex: 3,
        explanation: "110 base 2 = 1 x 2^2 + 1 x 2^1 + 0 x 2^0 = 4 + 2 + 0 = 6.",
      },
      {
        type: "key_point",
        title: "Real world: why this matters",
        content:
          "Number bases are the foundation of all computing. Every phone, computer, and digital device processes information in binary (base 2). Understanding different bases builds the logical thinking that UNEB's competency-based curriculum rewards. It also helps with coding and digital literacy.",
      },
    ],
  },
  {
    id: "s1-math-t1-numbers-bases-convert-to",
    topicId: "number-bases",
    subjectId: "mathematics",
    title: "Converting base 10 to other bases",
    order: 2,
    estimatedMinutes: 13,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "Converting from base 10 to any base",
        content:
          "To convert a base 10 number to another base, you repeatedly divide by the target base and collect the remainders. Read the remainders from bottom to top. This is one of the most common exam questions in UNEB, so mastering the method earns easy marks.",
      },
      {
        type: "key_point",
        title: "The division method",
        content:
          "Step 1: Divide the number by the target base. Step 2: Write down the remainder. Step 3: Divide the result again. Step 4: Repeat until the result is 0. Step 5: Read the remainders from bottom to top. That is your answer.",
      },
      {
        type: "worked_example",
        problem: "Convert 47 (base 10) to base 5",
        steps: [
          "47 / 5 = 9 remainder 2",
          "9 / 5 = 1 remainder 4",
          "1 / 5 = 0 remainder 1",
          "Read remainders from bottom to top: 1, 4, 2.",
          "Answer: 47 (base 10) = 142 (base 5).",
        ],
        answer: "142 (base 5)",
      },
      {
        type: "worked_example",
        problem: "Convert 23 (base 10) to base 2",
        steps: [
          "23 / 2 = 11 remainder 1",
          "11 / 2 = 5 remainder 1",
          "5 / 2 = 2 remainder 1",
          "2 / 2 = 1 remainder 0",
          "1 / 2 = 0 remainder 1",
          "Read remainders from bottom to top: 1, 0, 1, 1, 1.",
          "Answer: 23 (base 10) = 10111 (base 2).",
        ],
        answer: "10111 (base 2)",
      },
      {
        type: "question",
        question: "Convert 13 (base 10) to base 2.",
        options: ["1011", "1101", "1110", "1010"],
        correctIndex: 1,
        explanation: "13/2=6 r1, 6/2=3 r0, 3/2=1 r1, 1/2=0 r1. Read bottom up: 1101.",
      },
      {
        type: "question",
        question: "Convert 28 (base 10) to base 5.",
        options: ["103", "104", "102", "113"],
        correctIndex: 0,
        explanation: "28/5=5 r3, 5/5=1 r0, 1/5=0 r1. Read bottom up: 103.",
      },
      {
        type: "question",
        question: "Convert 19 (base 10) to base 2.",
        options: ["10010", "10011", "11001", "10101"],
        correctIndex: 1,
        explanation: "19/2=9 r1, 9/2=4 r1, 4/2=2 r0, 2/2=1 r0, 1/2=0 r1. Read bottom up: 10011.",
      },
      {
        type: "key_point",
        title: "Exam tip",
        content:
          "Always check your answer by converting back to base 10. For example, 142 base 5 = 1x25 + 4x5 + 2x1 = 25 + 20 + 2 = 47. Matches! This double-check earns you the verification mark that many students miss.",
      },
    ],
  },
  {
    id: "s1-math-t1-numbers-bases-arithmetic",
    topicId: "number-bases",
    subjectId: "mathematics",
    title: "Addition in different bases",
    order: 3,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "Adding numbers in other bases",
        content:
          "Adding numbers in any base follows the same rules as base 10, but you carry over when the sum reaches the base (not 10). For example, in base 5, you carry when a column reaches 5 or more. The key skill is knowing when to carry and what to carry.",
      },
      {
        type: "key_point",
        title: "The carrying rule",
        content:
          "When adding in base N: if a column sums to N or more, subtract N and carry 1 to the next column. In base 5: if a column sums to 5, write 0 and carry 1. If it sums to 7, write 2 (that is 7 minus 5) and carry 1. The carry is always 1 unless the sum reaches 2N or more.",
      },
      {
        type: "worked_example",
        problem: "Add 23 base 5 + 14 base 5",
        steps: [
          "Add the units column: 3 + 4 = 7. Since 7 is 5 or more, subtract 5: 7 - 5 = 2. Carry 1.",
          "Add the fives column plus carry: 2 + 1 + 1 (carry) = 4.",
          "Answer: 23 base 5 + 14 base 5 = 42 base 5.",
          "Check in base 10: 23 base 5 = 13, 14 base 5 = 9, 13 + 9 = 22. And 42 base 5 = 4x5 + 2 = 22. Correct!",
        ],
        answer: "42 (base 5)",
      },
      {
        type: "worked_example",
        problem: "Add 1011 base 2 + 110 base 2",
        steps: [
          "Column 1 (rightmost): 1 + 0 = 1. Write 1.",
          "Column 2: 1 + 1 = 2. Since we are in base 2, 2 means carry. Write 0, carry 1.",
          "Column 3: 0 + 1 + 1 (carry) = 2. Again carry. Write 0, carry 1.",
          "Column 4: 1 + 0 + 1 (carry) = 2. Carry. Write 0, carry 1.",
          "Column 5: carry 1 comes down.",
          "Answer: 1011 base 2 + 110 base 2 = 10001 base 2.",
          "Check: 1011 base 2 = 11, 110 base 2 = 6, 11 + 6 = 17. And 10001 base 2 = 16 + 1 = 17. Correct!",
        ],
        answer: "10001 (base 2)",
      },
      {
        type: "question",
        question: "Add 12 base 5 + 13 base 5.",
        options: ["25 base 5", "30 base 5", "20 base 5", "31 base 5"],
        correctIndex: 1,
        explanation: "Units: 2 + 3 = 5. In base 5, that is 0 with carry 1. Fives: 1 + 1 + 1 (carry) = 3. Answer: 30 base 5. Check: 12 base 5 = 7, 13 base 5 = 8, 7 + 8 = 15. And 30 base 5 = 15. Correct!",
      },
      {
        type: "question",
        question: "Add 11 base 2 + 11 base 2.",
        options: ["22 base 2", "100 base 2", "110 base 2", "101 base 2"],
        correctIndex: 2,
        explanation: "Column 1: 1 + 1 = 2, write 0 carry 1. Column 2: 1 + 1 + 1 (carry) = 3, write 1 carry 1. Column 3: carry 1. Answer: 110 base 2. Check: 11 base 2 = 3, 3 + 3 = 6. And 110 base 2 = 6. Correct!",
      },
      {
        type: "key_point",
        title: "Competency check",
        content:
          "UNEB doesn't just want the right answer. They want to see your method clearly. Always show each column addition, state your carries, and verify by converting to base 10. This is what the competency-based curriculum means by applying knowledge.",
      },
    ],
  },
  // ================================================================
  // TERM 1, TOPIC 2: WORKING WITH INTEGERS (15 periods)
  // Theme: Numbers
  // ================================================================
  {
    id: "s1-math-t1-integers-intro",
    topicId: "integers",
    subjectId: "mathematics",
    title: "Working with integers",
    order: 4,
    estimatedMinutes: 13,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What are integers?",
        content:
          "Integers are whole numbers that include positive numbers, negative numbers, and zero. Examples: -5, -3, 0, 4, 12. You use integers every day: temperatures below zero, bank account overdrafts, floors below ground level in a building. Understanding how to add, subtract, multiply, and divide with negative numbers is essential for the rest of Mathematics.",
      },
      {
        type: "key_point",
        title: "The number line",
        content:
          "Picture a number line with zero in the middle. Positive numbers go right, negative numbers go left. Moving right means adding. Moving left means subtracting. This visual helps you get the sign right every time.",
      },
      {
        type: "worked_example",
        problem: "Calculate: -7 + 3",
        steps: [
          "Start at -7 on the number line.",
          "Adding 3 means moving 3 steps to the right.",
          "-7 + 3 = -4.",
        ],
        answer: "-4",
      },
      {
        type: "worked_example",
        problem: "Calculate: -5 x -4",
        steps: [
          "Two negative numbers multiplied give a positive result.",
          "Multiply the values: 5 x 4 = 20.",
          "Answer: -5 x -4 = +20.",
          "Memory rule: same signs give positive, different signs give negative.",
        ],
        answer: "+20",
      },
      {
        type: "worked_example",
        problem: "Calculate: -12 / 3",
        steps: [
          "Different signs (one negative, one positive) give a negative result.",
          "Divide the values: 12 / 3 = 4.",
          "Answer: -12 / 3 = -4.",
        ],
        answer: "-4",
      },
      {
        type: "question",
        question: "Calculate: -8 + 5",
        options: ["-3", "-13", "3", "13"],
        correctIndex: 0,
        explanation: "Start at -8, move 5 steps right: -8 + 5 = -3.",
      },
      {
        type: "question",
        question: "Calculate: -6 x -7",
        options: ["-42", "42", "-13", "13"],
        correctIndex: 1,
        explanation: "Same signs (both negative) give positive. 6 x 7 = 42. So -6 x -7 = 42.",
      },
      {
        type: "question",
        question: "Calculate: -20 / -4",
        options: ["-5", "5", "-16", "16"],
        correctIndex: 1,
        explanation: "Same signs give positive. 20 / 4 = 5. So -20 / -4 = 5.",
      },
      {
        type: "question",
        question: "Calculate: 4 - 9",
        options: ["5", "-5", "13", "-13"],
        correctIndex: 1,
        explanation: "Start at 4, subtract 9 (move 9 steps left): 4 - 9 = -5.",
      },
      {
        type: "key_point",
        title: "The sign rules",
        content:
          "Addition and subtraction: use the number line. Multiplication and division: same signs give positive (+), different signs give negative (-). Positive x Positive = Positive. Negative x Negative = Positive. Positive x Negative = Negative. Negative x Positive = Negative.",
      },
    ],
  },
  // ================================================================
  // TERM 1, TOPIC 3: FRACTIONS, PERCENTAGES AND DECIMALS (15 periods)
  // Theme: Numbers
  // ================================================================
  {
    id: "s1-math-t1-fractions-intro",
    topicId: "fractions-percentages-decimals",
    subjectId: "mathematics",
    title: "Fractions: the basics",
    order: 5,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What is a fraction?",
        content:
          "A fraction represents part of a whole. It has two parts: the numerator (top number, how many parts you have) and the denominator (bottom number, how many equal parts the whole is divided into). For example, 3/4 means three out of four equal parts. Fractions appear everywhere: sharing food, discounts, test scores, and probability.",
      },
      {
        type: "key_point",
        title: "Equivalent fractions",
        content:
          "Fractions that represent the same amount are called equivalent. 1/2 = 2/4 = 3/6 = 50/100. You create equivalent fractions by multiplying or dividing both the numerator and denominator by the same number. Simplifying a fraction means dividing both by their highest common factor (HCF).",
      },
      {
        type: "worked_example",
        problem: "Simplify 12/18",
        steps: [
          "Find the HCF of 12 and 18. The factors of 12 are 1,2,3,4,6,12. The factors of 18 are 1,2,3,6,9,18. The HCF is 6.",
          "Divide both by 6: 12 / 6 = 2, 18 / 6 = 3.",
          "Simplified: 12/18 = 2/3.",
        ],
        answer: "2/3",
      },
      {
        type: "worked_example",
        problem: "Add 1/4 + 2/3",
        steps: [
          "Find a common denominator. The LCM of 4 and 3 is 12.",
          "Convert: 1/4 = 3/12, and 2/3 = 8/12.",
          "Add: 3/12 + 8/12 = 11/12.",
          "11 and 12 share no common factors, so this is already simplified.",
        ],
        answer: "11/12",
      },
      {
        type: "worked_example",
        problem: "Convert 3/5 to a decimal and percentage",
        steps: [
          "To convert to decimal: divide 3 by 5. 3 / 5 = 0.6.",
          "To convert to percentage: multiply the decimal by 100. 0.6 x 100 = 60%.",
          "So 3/5 = 0.6 = 60%.",
        ],
        answer: "0.6 and 60%",
      },
      {
        type: "question",
        question: "Simplify 8/12.",
        options: ["2/3", "3/4", "4/6", "1/2"],
        correctIndex: 0,
        explanation: "HCF of 8 and 12 is 4. 8/4 = 2, 12/4 = 3. So 8/12 = 2/3.",
      },
      {
        type: "question",
        question: "Add 1/3 + 1/6.",
        options: ["2/9", "1/2", "2/6", "3/6"],
        correctIndex: 1,
        explanation: "Common denominator is 6. 1/3 = 2/6. 2/6 + 1/6 = 3/6 = 1/2.",
      },
      {
        type: "question",
        question: "Convert 7/10 to a percentage.",
        options: ["7%", "70%", "0.7%", "14%"],
        correctIndex: 1,
        explanation: "7/10 = 0.7. Multiply by 100: 0.7 x 100 = 70%.",
      },
      {
        type: "question",
        question: "A shop gives a discount of 1/4 off a 40,000 UGX item. How much is the discount?",
        options: ["8,000 UGX", "10,000 UGX", "12,000 UGX", "4,000 UGX"],
        correctIndex: 1,
        explanation: "1/4 of 40,000 = 40,000 / 4 = 10,000 UGX. The discount is 10,000 UGX.",
      },
      {
        type: "key_point",
        title: "Why this matters",
        content:
          "Fractions, decimals, and percentages are the same idea in three forms. Being able to switch between them quickly is essential for business math, data interpretation, and everyday decisions. UNEB tests this in nearly every paper. Master it now and it pays off for four years.",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return sampleLessons.find((l) => l.id === id);
}

/** Get lessons grouped by topic (for the learn page). */
export function getLessonsByTopic() {
  const topics: Record<string, { topicId: string; title: string; theme: string; lessons: Lesson[] }> = {};

  for (const lesson of sampleLessons) {
    if (!topics[lesson.topicId]) {
      const topicTitles: Record<string, { title: string; theme: string }> = {
        "number-bases": { title: "Number Bases", theme: "Numbers" },
        "integers": { title: "Working with Integers", theme: "Numbers" },
        "fractions-percentages-decimals": { title: "Fractions, Percentages and Decimals", theme: "Numbers" },
      };
      topics[lesson.topicId] = {
        topicId: lesson.topicId,
        title: topicTitles[lesson.topicId]?.title || lesson.topicId,
        theme: topicTitles[lesson.topicId]?.theme || "Numbers",
        lessons: [],
      };
    }
    topics[lesson.topicId].lessons.push(lesson);
  }

  return Object.values(topics);
}
