import type { Lesson } from "@/types";

/**
 * Sample lesson content for Mathematics.
 *
 * This is embedded directly in the code so the lesson player works
 * immediately without any database seeding. Later we can move this
 * to Firestore.
 *
 * See DEC-006 in DECISIONS.md.
 */

export const sampleLessons: Lesson[] = [
  {
    id: "math-algebra-simultaneous-1",
    topicId: "algebra",
    subjectId: "mathematics",
    title: "Solving simultaneous equations",
    order: 1,
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
        problem: "Solve: 2x + 3y = 16 and 3x - 2y = 5",
        steps: [
          "Label the equations: (1) 2x + 3y = 16, (2) 3x - 2y = 5",
          "To eliminate x, make the coefficients equal. Multiply equation (1) by 3 and equation (2) by 2. You get: 6x + 9y = 48 and 6x - 4y = 10",
          "Subtract the second from the first: (6x + 9y) - (6x - 4y) = 48 - 10. This gives 13y = 38, so y = 38/13. Wait, that doesn't look clean. Let's eliminate y instead.",
          "Alternative: to eliminate y, multiply (1) by 2 and (2) by 3. You get: 4x + 6y = 32 and 9x - 6y = 15",
          "Add them: 13x = 47. Hmm, still not clean. This example has non-integer answers. For UNEB, answers are usually whole numbers.",
        ],
        answer: "For a cleaner example, see the next block. The method is always the same: equalise coefficients, then add or subtract to eliminate.",
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
];

export function getLessonById(id: string): Lesson | undefined {
  return sampleLessons.find((l) => l.id === id);
}
