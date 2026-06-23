/**
 * Pre-written practice question bank.
 *
 * These are the first ~15 questions per topic. When a student exhausts
 * these, the AI generates fresh questions on demand (see /api/ai/practice).
 *
 * Questions are tagged with difficulty for XP calculation:
 * - easy = 10 XP
 * - medium = 15 XP
 * - hard = 20 XP
 */

export type QuestionType = "mcq" | "short_answer";
export type Difficulty = "easy" | "medium" | "hard";

export interface PracticeQuestion {
  id: string;
  topicId: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options?: string[]; // for MCQ
  correctIndex?: number; // for MCQ
  correctAnswer?: string; // for short answer (AI will mark)
  explanation: string;
  markingKey?: string[]; // keywords the AI looks for in short answers
}

export const practiceBank: PracticeQuestion[] = [

  // ===== NUMBER BASES =====
  { id: "nb-mcq-1", topicId: "number-bases", type: "mcq", difficulty: "easy", question: "Which digits are valid in base 6?", options: ["0 to 5", "0 to 6", "1 to 6", "0 to 9"], correctIndex: 0, explanation: "Base 6 uses digits 0 to 5. The highest digit is always one less than the base." },
  { id: "nb-mcq-2", topicId: "number-bases", type: "mcq", difficulty: "easy", question: "Convert 23 base 5 to base 10.", options: ["13", "15", "23", "8"], correctIndex: 0, explanation: "23 base 5 = 2x5 + 3 = 10 + 3 = 13." },
  { id: "nb-mcq-3", topicId: "number-bases", type: "mcq", difficulty: "easy", question: "Convert 101 base 2 to base 10.", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "101 base 2 = 1x4 + 0x2 + 1x1 = 5." },
  { id: "nb-mcq-4", topicId: "number-bases", type: "mcq", difficulty: "medium", question: "Convert 47 base 10 to base 5.", options: ["142", "143", "124", "134"], correctIndex: 0, explanation: "47/5=9 r2, 9/5=1 r4, 1/5=0 r1. Read bottom up: 142." },
  { id: "nb-mcq-5", topicId: "number-bases", type: "mcq", difficulty: "medium", question: "Convert 13 base 10 to base 2.", options: ["1011", "1101", "1110", "1010"], correctIndex: 1, explanation: "13/2=6 r1, 6/2=3 r0, 3/2=1 r1, 1/2=0 r1. Bottom up: 1101." },
  { id: "nb-mcq-6", topicId: "number-bases", type: "mcq", difficulty: "medium", question: "Add 12 base 5 + 13 base 5.", options: ["25 base 5", "30 base 5", "20 base 5", "31 base 5"], correctIndex: 1, explanation: "Units: 2+3=5, write 0 carry 1. Fives: 1+1+1=3. Answer: 30 base 5." },
  { id: "nb-mcq-7", topicId: "number-bases", type: "mcq", difficulty: "hard", question: "Convert 341 base 5 to base 10.", options: ["96", "86", "91", "76"], correctIndex: 0, explanation: "341 base 5 = 3x25 + 4x5 + 1 = 75 + 20 + 1 = 96." },
  { id: "nb-mcq-8", topicId: "number-bases", type: "mcq", difficulty: "hard", question: "What is the place value of digit 2 in 3214 base 5?", options: ["25", "5", "125", "10"], correctIndex: 0, explanation: "From right: 5^0=1, 5^1=5, 5^2=25. The 2 is in the third position from right, place value 25." },
  { id: "nb-sa-1", topicId: "number-bases", type: "short_answer", difficulty: "medium", question: "Convert 256 base 8 to base 10. Show your working.", correctAnswer: "174", markingKey: ["2x64", "5x8", "6x1", "128", "40", "6", "174"], explanation: "256 base 8 = 2x64 + 5x8 + 6x1 = 128 + 40 + 6 = 174." },
  { id: "nb-sa-2", topicId: "number-bases", type: "short_answer", difficulty: "hard", question: "Convert 100 base 10 to base 2.", correctAnswer: "1100100", markingKey: ["1100100", "64", "32", "4", "divide by 2"], explanation: "100/2=50 r0, 50/2=25 r0, 25/2=12 r1, 12/2=6 r0, 6/2=3 r0, 3/2=1 r1, 1/2=0 r1. Bottom up: 1100100." },

  // ===== INTEGERS =====
  { id: "in-mcq-1", topicId: "integers", type: "mcq", difficulty: "easy", question: "Calculate: -8 + 5", options: ["-3", "-13", "3", "13"], correctIndex: 0, explanation: "Start at -8, move 5 right: -8 + 5 = -3." },
  { id: "in-mcq-2", topicId: "integers", type: "mcq", difficulty: "easy", question: "Calculate: -6 x -7", options: ["-42", "42", "-13", "13"], correctIndex: 1, explanation: "Same signs give positive. 6 x 7 = 42." },
  { id: "in-mcq-3", topicId: "integers", type: "mcq", difficulty: "easy", question: "Calculate: 4 - 9", options: ["5", "-5", "13", "-13"], correctIndex: 1, explanation: "Start at 4, move 9 left: 4 - 9 = -5." },
  { id: "in-mcq-4", topicId: "integers", type: "mcq", difficulty: "medium", question: "Calculate: -3 + 2 x (-4)", options: ["-20", "-11", "-20", "5"], correctIndex: 1, explanation: "BODMAS: multiply first. 2 x (-4) = -8. Then -3 + (-8) = -11." },
  { id: "in-mcq-5", topicId: "integers", type: "mcq", difficulty: "medium", question: "Calculate: -20 / -4", options: ["-5", "5", "-16", "16"], correctIndex: 1, explanation: "Same signs give positive. 20 / 4 = 5." },
  { id: "in-mcq-6", topicId: "integers", type: "mcq", difficulty: "medium", question: "What is the prime factorisation of 24?", options: ["2^3 x 3", "2^2 x 6", "3 x 8", "2 x 12"], correctIndex: 0, explanation: "24 = 2 x 2 x 2 x 3 = 2^3 x 3." },
  { id: "in-mcq-7", topicId: "integers", type: "mcq", difficulty: "hard", question: "Find the HCF of 12 and 18.", options: ["2", "3", "6", "36"], correctIndex: 2, explanation: "12 = 2^2 x 3, 18 = 2 x 3^2. HCF = 2 x 3 = 6." },
  { id: "in-mcq-8", topicId: "integers", type: "mcq", difficulty: "hard", question: "Find the LCM of 8 and 12.", options: ["24", "48", "4", "96"], correctIndex: 0, explanation: "8 = 2^3, 12 = 2^2 x 3. LCM = 2^3 x 3 = 24." },
  { id: "in-sa-1", topicId: "integers", type: "short_answer", difficulty: "medium", question: "The temperature at night was -3 degrees. By morning it rose by 8 degrees. What is the morning temperature?", correctAnswer: "5 degrees", markingKey: ["-3", "+8", "5"], explanation: "-3 + 8 = 5 degrees." },
  { id: "in-sa-2", topicId: "integers", type: "short_answer", difficulty: "hard", question: "Find the prime factorisation of 942. Hence find the HCF of 942 and 357.", correctAnswer: "3", markingKey: ["942 = 2 x 3 x 157", "357 = 3 x 7 x 17", "HCF = 3"], explanation: "942 = 2 x 3 x 157. 357 = 3 x 7 x 17. The only common prime is 3, so HCF = 3." },

  // ===== FRACTIONS, PERCENTAGES, DECIMALS =====
  { id: "fr-mcq-1", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "easy", question: "Simplify 8/12.", options: ["2/3", "3/4", "4/6", "1/2"], correctIndex: 0, explanation: "HCF of 8 and 12 is 4. 8/4=2, 12/4=3. So 2/3." },
  { id: "fr-mcq-2", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "easy", question: "Convert 7/10 to a percentage.", options: ["7%", "70%", "0.7%", "14%"], correctIndex: 1, explanation: "7/10 = 0.7. Multiply by 100: 70%." },
  { id: "fr-mcq-3", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "easy", question: "Add 1/3 + 1/6.", options: ["2/9", "1/2", "2/6", "3/6"], correctIndex: 1, explanation: "Common denominator 6: 1/3 = 2/6. 2/6 + 1/6 = 3/6 = 1/2." },
  { id: "fr-mcq-4", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "medium", question: "What is 20% of 150,000 UGX?", options: ["15,000", "20,000", "30,000", "25,000"], correctIndex: 2, explanation: "0.20 x 150,000 = 30,000 UGX." },
  { id: "fr-mcq-5", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "medium", question: "Convert 0.025 to a fraction in simplest form.", options: ["25/1000", "1/40", "1/25", "25/100"], correctIndex: 1, explanation: "0.025 = 25/1000 = 1/40 (dividing both by 25)." },
  { id: "fr-mcq-6", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "medium", question: "Convert 2/5 to a decimal.", options: ["0.2", "0.4", "0.5", "2.5"], correctIndex: 1, explanation: "2 / 5 = 0.4." },
  { id: "fr-mcq-7", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "hard", question: "A shop buys at 10,000 and sells at 12,500. What is the percentage profit?", options: ["20%", "25%", "15%", "30%"], correctIndex: 1, explanation: "Profit = 2,500. Percentage = (2,500 / 10,000) x 100 = 25%." },
  { id: "fr-mcq-8", topicId: "fractions-percentages-decimals", type: "mcq", difficulty: "hard", question: "Multiply: 2/3 x 3/4", options: ["1/2", "6/12", "1/3", "6/7"], correctIndex: 0, explanation: "2/3 x 3/4 = 6/12 = 1/2." },
  { id: "fr-sa-1", topicId: "fractions-percentages-decimals", type: "short_answer", difficulty: "medium", question: "A shop prices an item at 80,000 UGX with a 15% discount. What does the customer pay?", correctAnswer: "68,000 UGX", markingKey: ["15%", "12,000", "80,000", "68,000"], explanation: "Discount = 0.15 x 80,000 = 12,000. Sale price = 80,000 - 12,000 = 68,000 UGX." },
  { id: "fr-sa-2", topicId: "fractions-percentages-decimals", type: "short_answer", difficulty: "hard", question: "Rose scored 21 out of 25 in Maths and 31 out of 40 in Physics. Which subject did she do better in? Show your working.", correctAnswer: "Mathematics (84% vs 77.5%)", markingKey: ["84%", "77.5%", "21/25", "31/40", "mathematics"], explanation: "Maths: 21/25 x 100 = 84%. Physics: 31/40 x 100 = 77.5%. Rose did better in Maths." },

  // ===== ALGEBRA =====
  { id: "al-mcq-1", topicId: "algebra-1", type: "mcq", difficulty: "easy", question: "Simplify: 4a + 3b - 2a + b", options: ["2a + 4b", "6a + 4b", "2a + 2b", "4ab"], correctIndex: 0, explanation: "Group: (4a - 2a) + (3b + b) = 2a + 4b." },
  { id: "al-mcq-2", topicId: "algebra-1", type: "mcq", difficulty: "easy", question: "Expand: 3(x + 4)", options: ["3x + 4", "3x + 12", "3x + 7", "x + 12"], correctIndex: 1, explanation: "3 times x is 3x. 3 times 4 is 12. Result: 3x + 12." },
  { id: "al-mcq-3", topicId: "algebra-1", type: "mcq", difficulty: "easy", question: "Solve: 2x + 5 = 17", options: ["x = 4", "x = 6", "x = 8", "x = 11"], correctIndex: 1, explanation: "Subtract 5: 2x = 12. Divide by 2: x = 6." },
  { id: "al-mcq-4", topicId: "algebra-1", type: "mcq", difficulty: "medium", question: "Factorise: 6x + 9", options: ["3(2x + 3)", "2(3x + 4)", "6(x + 9)", "3(2x + 9)"], correctIndex: 0, explanation: "HCF of 6 and 9 is 3. 6x/3=2x, 9/3=3. So 3(2x + 3)." },
  { id: "al-mcq-5", topicId: "algebra-1", type: "mcq", difficulty: "medium", question: "Solve: 5x - 3 = 2x + 6", options: ["x = 1", "x = 3", "x = 9", "x = 2"], correctIndex: 1, explanation: "Subtract 2x: 3x - 3 = 6. Add 3: 3x = 9. Divide by 3: x = 3." },
  { id: "al-mcq-6", topicId: "algebra-1", type: "mcq", difficulty: "medium", question: "Expand: 4(2x - 3)", options: ["6x - 4", "8x - 12", "5x - 12", "6x + 12"], correctIndex: 1, explanation: "4 times 2x is 8x. 4 times -3 is -12. Result: 8x - 12." },
  { id: "al-mcq-7", topicId: "algebra-1", type: "mcq", difficulty: "hard", question: "Solve: 3(x + 2) = 18", options: ["x = 2", "x = 3", "x = 4", "x = 6"], correctIndex: 2, explanation: "Expand: 3x + 6 = 18. Subtract 6: 3x = 12. Divide by 3: x = 4." },
  { id: "al-mcq-8", topicId: "algebra-1", type: "mcq", difficulty: "hard", question: "Factorise: 2x^2 + 4x", options: ["2(x^2 + 2x)", "2x(x + 2)", "x(2x + 4)", "2x(x + 4)"], correctIndex: 1, explanation: "HCF is 2x. 2x^2/2x = x, 4x/2x = 2. So 2x(x + 2)." },
  { id: "al-sa-1", topicId: "algebra-1", type: "short_answer", difficulty: "medium", question: "A father is 3 times as old as his son. The sum of their ages is 48. How old is the son?", correctAnswer: "12 years old", markingKey: ["x", "3x", "4x", "48", "x = 12"], explanation: "Let son = x. Father = 3x. x + 3x = 48. 4x = 48. x = 12." },
  { id: "al-sa-2", topicId: "algebra-1", type: "short_answer", difficulty: "hard", question: "Solve: 3x + 4 = 2x + 9. Check your answer.", correctAnswer: "x = 5", markingKey: ["x = 5", "subtract 2x", "subtract 4", "3(5) = 15", "2(5) = 10"], explanation: "Subtract 2x: x + 4 = 9. Subtract 4: x = 5. Check: 3(5)+4 = 19, 2(5)+9 = 19. Correct." },

  // ===== BUSINESS ARITHMETIC =====
  { id: "ba-mcq-1", topicId: "business-arithmetic", type: "mcq", difficulty: "easy", question: "A trader buys at 10,000 and sells at 12,000. What is the profit?", options: ["2,000", "22,000", "8,000", "12,000"], correctIndex: 0, explanation: "Profit = Selling Price - Cost Price = 12,000 - 10,000 = 2,000." },
  { id: "ba-mcq-2", topicId: "business-arithmetic", type: "mcq", difficulty: "easy", question: "Profit is calculated as...", options: ["Cost - Selling", "Selling - Cost", "Cost x Selling", "Cost / Selling"], correctIndex: 1, explanation: "Profit = Selling Price - Cost Price (when selling is higher)." },
  { id: "ba-mcq-3", topicId: "business-arithmetic", type: "mcq", difficulty: "medium", question: "A trader buys at 10,000 and sells at 12,000. Percentage profit?", options: ["16.7%", "20%", "25%", "12%"], correctIndex: 1, explanation: "Profit = 2,000. Percentage = (2,000 / 10,000) x 100 = 20%." },
  { id: "ba-mcq-4", topicId: "business-arithmetic", type: "mcq", difficulty: "medium", question: "An item costs 40,000 UGX with a 10% discount. Sale price?", options: ["30,000", "36,000", "34,000", "38,000"], correctIndex: 1, explanation: "Discount = 4,000. Sale price = 36,000. Or: 90% of 40,000 = 36,000." },
  { id: "ba-mcq-5", topicId: "business-arithmetic", type: "mcq", difficulty: "medium", question: "Simple interest on 100,000 at 5% for 2 years?", options: ["5,000", "10,000", "15,000", "20,000"], correctIndex: 1, explanation: "I = P x R x T / 100 = 100,000 x 5 x 2 / 100 = 10,000." },
  { id: "ba-mcq-6", topicId: "business-arithmetic", type: "mcq", difficulty: "hard", question: "A trader buys at 50,000 and sells at 45,000. Percentage loss?", options: ["5%", "10%", "15%", "20%"], correctIndex: 1, explanation: "Loss = 5,000. Percentage = (5,000 / 50,000) x 100 = 10%." },
  { id: "ba-mcq-7", topicId: "business-arithmetic", type: "mcq", difficulty: "hard", question: "A man invests 200,000 at 8% simple interest. Total after 3 years?", options: ["248,000", "244,000", "256,000", "232,000"], correctIndex: 0, explanation: "Interest = 200,000 x 8 x 3 / 100 = 48,000. Total = 200,000 + 48,000 = 248,000." },
  { id: "ba-sa-1", topicId: "business-arithmetic", type: "short_answer", difficulty: "medium", question: "A shopkeeper buys 50 bags at 60,000 each. She sells them all at 75,000 each. What is her total profit?", correctAnswer: "750,000 UGX", markingKey: ["50", "3,000,000", "3,750,000", "750,000"], explanation: "Cost = 50 x 60,000 = 3,000,000. Revenue = 50 x 75,000 = 3,750,000. Profit = 750,000." },
  { id: "ba-sa-2", topicId: "business-arithmetic", type: "short_answer", difficulty: "hard", question: "A trader buys a phone for 200,000 UGX and sells it for 250,000 UGX. Find the profit and the percentage profit.", correctAnswer: "Profit 50,000 UGX, 25%", markingKey: ["50,000", "25%", "200,000", "(50,000/200,000)"], explanation: "Profit = 250,000 - 200,000 = 50,000. Percentage = (50,000/200,000) x 100 = 25%." },
];

/** Get all questions for a topic. */
export function getQuestionsByTopic(topicId: string): PracticeQuestion[] {
  return practiceBank.filter((q) => q.topicId === topicId);
}

/** Get topic list for the practice page. */
export function getPracticeTopics() {
  const topics = [
    { id: "number-bases", name: "Number Bases", theme: "Numbers", color: "var(--terracotta)", lessonCount: 1 },
    { id: "integers", name: "Working with Integers", theme: "Numbers", color: "var(--terracotta)", lessonCount: 1 },
    { id: "fractions-percentages-decimals", name: "Fractions, Percentages, Decimals", theme: "Numbers", color: "var(--terracotta)", lessonCount: 1 },
    { id: "algebra-1", name: "Algebra 1", theme: "Patterns and Algebra", color: "var(--terracotta)", lessonCount: 1 },
    { id: "business-arithmetic", name: "Business Arithmetic", theme: "Geometry and Measures", color: "var(--terracotta)", lessonCount: 1 },
  ];
  return topics.map((t) => ({
    ...t,
    questionCount: getQuestionsByTopic(t.id).length,
  }));
}

/** XP awarded per difficulty. */
export function xpForDifficulty(d: Difficulty): number {
  return d === "easy" ? 10 : d === "medium" ? 15 : 20;
}

/** Mastery level based on practice accuracy. */
export function getMasteryLevel(accuracy: number): { level: string; color: string } {
  if (accuracy >= 90) return { level: "Mastered", color: "var(--sage-dk)" };
  if (accuracy >= 75) return { level: "Proficient", color: "var(--sage)" };
  if (accuracy >= 50) return { level: "Developing", color: "var(--terracotta)" };
  if (accuracy > 0) return { level: "Beginner", color: "var(--blue-dk)" };
  return { level: "Not started", color: "var(--ink-muted)" };
}
