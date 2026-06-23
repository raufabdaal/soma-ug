import type { Lesson } from "@/types";

/**
 * Lesson content for Mathematics.
 *
 * This is embedded directly in the code so the lesson player works
 * immediately without any database seeding. Later we can move this
 * to Firestore.
 *
 * See DEC-006 in DECISIONS.md.
 */

export const sampleLessons: Lesson[] = [
  {
    id: "math-algebra-linear-1",
    topicId: "algebra",
    subjectId: "mathematics",
    title: "Linear equations",
    order: 1,
    estimatedMinutes: 13,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What is a linear equation?",
        content:
          "A linear equation has one unknown (usually x) and no powers higher than 1. Solving it means finding the value of x that makes the equation true. The rule is simple: whatever you do to one side, do to the other.",
      },
      {
        type: "key_point",
        title: "The balance method",
        content:
          "Think of an equation like a balance scale. To keep it balanced, whatever you do to one side you must do to the other. Add, subtract, multiply, or divide. The goal is to get x by itself on one side.",
      },
      {
        type: "worked_example",
        problem: "Solve: 3x + 7 = 22",
        steps: [
          "Subtract 7 from both sides: 3x = 22 - 7 = 15",
          "Divide both sides by 3: x = 15 / 3 = 5",
          "Answer: x = 5",
          "Check: 3(5) + 7 = 15 + 7 = 22. Correct!",
        ],
        answer: "x = 5",
      },
      {
        type: "worked_example",
        problem: "Solve: 2(x - 3) = 10",
        steps: [
          "First expand the bracket: 2x - 6 = 10",
          "Add 6 to both sides: 2x = 16",
          "Divide both sides by 2: x = 8",
          "Check: 2(8 - 3) = 2(5) = 10. Correct!",
        ],
        answer: "x = 8",
      },
      {
        type: "question",
        question: "Solve for x: x + 9 = 15",
        options: ["x = 4", "x = 5", "x = 6", "x = 7"],
        correctIndex: 2,
        explanation: "Subtract 9 from both sides: x = 15 - 9 = 6.",
      },
      {
        type: "question",
        question: "Solve for x: 4x = 24",
        options: ["x = 4", "x = 6", "x = 8", "x = 12"],
        correctIndex: 1,
        explanation: "Divide both sides by 4: x = 24 / 4 = 6.",
      },
      {
        type: "question",
        question: "Solve for x: 2x + 3 = 11",
        options: ["x = 3", "x = 4", "x = 5", "x = 7"],
        correctIndex: 1,
        explanation: "Subtract 3: 2x = 8. Divide by 2: x = 4.",
      },
      {
        type: "question",
        question: "Solve for x: 3(x + 2) = 18",
        options: ["x = 2", "x = 3", "x = 4", "x = 6"],
        correctIndex: 2,
        explanation: "Expand: 3x + 6 = 18. Subtract 6: 3x = 12. Divide by 3: x = 4.",
      },
    ],
  },
  {
    id: "math-algebra-expanding-1",
    topicId: "algebra",
    subjectId: "mathematics",
    title: "Expanding brackets",
    order: 2,
    estimatedMinutes: 12,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What does expanding mean?",
        content:
          "Expanding brackets means multiplying the term outside the bracket by every term inside. For example, 3(x + 4) becomes 3x + 12. UNEB tests this in nearly every algebra paper, often as the first step of a larger problem.",
      },
      {
        type: "worked_example",
        problem: "Expand: 2(3x + 5)",
        steps: [
          "Multiply 2 by 3x: you get 6x",
          "Multiply 2 by 5: you get 10",
          "Combine: 6x + 10",
        ],
        answer: "6x + 10",
      },
      {
        type: "worked_example",
        problem: "Expand: 4(2x - 3)",
        steps: [
          "Multiply 4 by 2x: you get 8x",
          "Multiply 4 by -3: you get -12 (mind the negative sign)",
          "Combine: 8x - 12",
        ],
        answer: "8x - 12",
      },
      {
        type: "question",
        question: "Expand: 5(x + 7)",
        options: ["5x + 7", "5x + 35", "x + 35", "5x + 12"],
        correctIndex: 1,
        explanation: "5 times x is 5x. 5 times 7 is 35. So the answer is 5x + 35.",
      },
      {
        type: "question",
        question: "Expand: 3(2x - 4)",
        options: ["6x - 4", "6x - 12", "5x - 12", "6x + 12"],
        correctIndex: 1,
        explanation: "3 times 2x is 6x. 3 times -4 is -12. So the answer is 6x - 12.",
      },
    ],
  },
  {
    id: "math-algebra-factorising-1",
    topicId: "algebra",
    subjectId: "mathematics",
    title: "Factorising expressions",
    order: 3,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What is factorising?",
        content:
          "Factorising is the reverse of expanding brackets. You take an expression like 6x + 12 and rewrite it as 6(x + 2). The goal is to find the highest common factor (HCF) of all the terms and pull it outside the bracket.",
      },
      {
        type: "key_point",
        title: "How to find the HCF",
        content:
          "Look at the numbers and the letters separately. For 6x + 12: the HCF of 6 and 12 is 6. There is only one x, so the HCF is 6. Pull out 6: 6(x + 2). Always check by expanding back: 6 times x is 6x, 6 times 2 is 12. Correct.",
      },
      {
        type: "worked_example",
        problem: "Factorise: 4x + 8",
        steps: [
          "Find the HCF of 4 and 8: it is 4",
          "Write 4 outside the bracket: 4(? + ?)",
          "Divide each term by 4: 4x / 4 = x, 8 / 4 = 2",
          "Result: 4(x + 2)",
          "Check by expanding: 4 times x = 4x, 4 times 2 = 8. Correct!",
        ],
        answer: "4(x + 2)",
      },
      {
        type: "worked_example",
        problem: "Factorise: 3x^2 + 6x",
        steps: [
          "Find the HCF of 3, x^2, and 6x. Numbers: HCF of 3 and 6 is 3. Letters: both have at least one x.",
          "The HCF is 3x",
          "Divide each term by 3x: 3x^2 / 3x = x, 6x / 3x = 2",
          "Result: 3x(x + 2)",
          "Check: 3x times x = 3x^2, 3x times 2 = 6x. Correct!",
        ],
        answer: "3x(x + 2)",
      },
      {
        type: "question",
        question: "Factorise: 5x + 15",
        options: ["5(x + 3)", "5(x + 15)", "x(5 + 15)", "5(x + 10)"],
        correctIndex: 0,
        explanation: "The HCF of 5x and 15 is 5. Divide each term by 5: 5x / 5 = x, 15 / 5 = 3. So 5(x + 3).",
      },
      {
        type: "question",
        question: "Factorise: 2x^2 + 4x",
        options: ["2(x^2 + 2x)", "2x(x + 2)", "x(2x + 4)", "2x(x + 4)"],
        correctIndex: 1,
        explanation: "The HCF is 2x. Divide each term: 2x^2 / 2x = x, 4x / 2x = 2. So 2x(x + 2).",
      },
      {
        type: "question",
        question: "Factorise: 6a + 9",
        options: ["3(2a + 3)", "2(3a + 4)", "6(a + 9)", "3(2a + 9)"],
        correctIndex: 0,
        explanation: "The HCF of 6 and 9 is 3. Divide each: 6a / 3 = 2a, 9 / 3 = 3. So 3(2a + 3).",
      },
      {
        type: "key_point",
        title: "Exam tip",
        content:
          "Factorising is worth easy marks in UNEB papers. Always look for the highest common factor first. A common mistake is pulling out a factor that is not the highest (like pulling 2 out of 4x + 8 instead of 4). Always check your answer by expanding back.",
      },
    ],
  },
  {
    id: "math-algebra-simultaneous-1",
    topicId: "algebra",
    subjectId: "mathematics",
    title: "Solving simultaneous equations",
    order: 4,
    estimatedMinutes: 15,
    passingScore: 70,
    isActive: true,
    blocks: [
      {
        type: "text",
        heading: "What are simultaneous equations?",
        content:
          "Simultaneous equations are two equations with two unknowns (usually x and y) that are both true at the same time. Your job is to find the values of x and y that satisfy both equations. UNEB awards method marks for showing your working clearly, even if your final answer is wrong.",
      },
      {
        type: "key_point",
        title: "The two methods",
        content:
          "There are two ways to solve simultaneous equations: ELIMINATION (make the coefficients of one variable equal, then add or subtract to cancel it out) and SUBSTITUTION (rearrange one equation to express one variable in terms of the other, then substitute). Elimination is usually faster for UNEB exam questions.",
      },
      {
        type: "worked_example",
        problem: "Solve: 3x + 2y = 12 and 2x + 3y = 13",
        steps: [
          "Label: (1) 3x + 2y = 12, (2) 2x + 3y = 13",
          "Eliminate y: multiply (1) by 3 and (2) by 2. You get 9x + 6y = 36 and 4x + 6y = 26",
          "Subtract: (9x + 6y) - (4x + 6y) = 36 - 26. This gives 5x = 10, so x = 2",
          "Substitute x = 2 into equation (1): 3(2) + 2y = 12, so 6 + 2y = 12, so 2y = 6, so y = 3",
          "Answer: x = 2, y = 3. Always check by substituting into equation (2): 2(2) + 3(3) = 4 + 9 = 13. Correct!",
        ],
        answer: "x = 2, y = 3",
      },
      {
        type: "question",
        question: "When using elimination, what is the first step?",
        options: [
          "Make the coefficients of one variable equal in both equations",
          "Add the two equations together as they are",
          "Solve for the final unknown immediately",
          "Substitute one value back into the other equation",
        ],
        correctIndex: 0,
        explanation:
          "Correct. You must equalise the coefficients of one variable first, so that when you add or subtract, that variable cancels out entirely.",
      },
      {
        type: "question",
        question: "Given 3x + 2y = 12 and 2x + 3y = 13, if you find x = 2, what is y?",
        options: ["y = 2", "y = 3", "y = 4", "y = 5"],
        correctIndex: 1,
        explanation:
          "Substitute x = 2 into 3x + 2y = 12: 3(2) + 2y = 12, so 6 + 2y = 12, so 2y = 6, so y = 3.",
      },
      {
        type: "key_point",
        title: "Exam tip",
        content:
          "UNEB awards method marks for each correct step. Even if your final answer is wrong, you can earn up to 3 out of 4 marks by showing the elimination and substitution steps clearly. Always label your equations (1) and (2), and always check your answer by substituting back.",
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return sampleLessons.find((l) => l.id === id);
}
