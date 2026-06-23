/**
 * Pre-written practice question bank.
 *
 * Covers Mathematics, Biology, Chemistry, and Physics.
 * When a student exhausts these, the AI generates fresh questions.
 *
 * XP per difficulty: easy = 10, medium = 15, hard = 20
 */

export type QuestionType = "mcq" | "short_answer";
export type Difficulty = "easy" | "medium" | "hard";

export interface PracticeQuestion {
  id: string;
  topicId: string;
  subjectId?: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  markingKey?: string[];
}

export const practiceBank: PracticeQuestion[] = [

  // ===== MATHEMATICS: NUMBER BASES =====
  { id: "nb-mcq-1", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Which digits are valid in base 6?", options: ["0 to 5", "0 to 6", "1 to 6", "0 to 9"], correctIndex: 0, explanation: "Base 6 uses digits 0 to 5." },
  { id: "nb-mcq-2", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Convert 23 base 5 to base 10.", options: ["13", "15", "23", "8"], correctIndex: 0, explanation: "2x5 + 3 = 13." },
  { id: "nb-mcq-3", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Convert 101 base 2 to base 10.", options: ["3", "4", "5", "6"], correctIndex: 2, explanation: "4 + 0 + 1 = 5." },
  { id: "nb-mcq-4", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "Convert 47 base 10 to base 5.", options: ["142", "143", "124", "134"], correctIndex: 0, explanation: "47/5=9 r2, 9/5=1 r4, 1/5=0 r1. Bottom up: 142." },
  { id: "nb-mcq-5", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "Convert 13 base 10 to base 2.", options: ["1011", "1101", "1110", "1010"], correctIndex: 1, explanation: "Remainders bottom up: 1101." },
  { id: "nb-mcq-6", topicId: "number-bases", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Convert 341 base 5 to base 10.", options: ["96", "86", "91", "76"], correctIndex: 0, explanation: "3x25 + 4x5 + 1 = 96." },

  // ===== MATHEMATICS: INTEGERS =====
  { id: "in-mcq-1", topicId: "integers", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Calculate: -8 + 5", options: ["-3", "-13", "3", "13"], correctIndex: 0, explanation: "-8 + 5 = -3." },
  { id: "in-mcq-2", topicId: "integers", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Calculate: -6 x -7", options: ["-42", "42", "-13", "13"], correctIndex: 1, explanation: "Same signs = positive. 6x7 = 42." },
  { id: "in-mcq-3", topicId: "integers", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "Calculate: -3 + 2 x (-4)", options: ["-20", "-11", "5", "-14"], correctIndex: 1, explanation: "BODMAS: 2x(-4)=-8, then -3+(-8)=-11." },
  { id: "in-mcq-4", topicId: "integers", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Find the HCF of 12 and 18.", options: ["2", "3", "6", "36"], correctIndex: 2, explanation: "12=2^2x3, 18=2x3^2. HCF=2x3=6." },
  { id: "in-mcq-5", topicId: "integers", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Find the LCM of 8 and 12.", options: ["24", "48", "4", "96"], correctIndex: 0, explanation: "8=2^3, 12=2^2x3. LCM=2^3x3=24." },

  // ===== MATHEMATICS: FRACTIONS =====
  { id: "fr-mcq-1", topicId: "fractions-percentages-decimals", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Simplify 8/12.", options: ["2/3", "3/4", "4/6", "1/2"], correctIndex: 0, explanation: "HCF=4. 8/4=2, 12/4=3." },
  { id: "fr-mcq-2", topicId: "fractions-percentages-decimals", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Convert 7/10 to a percentage.", options: ["7%", "70%", "0.7%", "14%"], correctIndex: 1, explanation: "0.7 x 100 = 70%." },
  { id: "fr-mcq-3", topicId: "fractions-percentages-decimals", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "What is 20% of 150,000 UGX?", options: ["15,000", "20,000", "30,000", "25,000"], correctIndex: 2, explanation: "0.20 x 150,000 = 30,000." },
  { id: "fr-mcq-4", topicId: "fractions-percentages-decimals", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Buy at 10,000, sell at 12,500. % profit?", options: ["20%", "25%", "15%", "30%"], correctIndex: 1, explanation: "2500/10000 x 100 = 25%." },

  // ===== MATHEMATICS: ALGEBRA =====
  { id: "al-mcq-1", topicId: "algebra-1", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Simplify: 4a + 3b - 2a + b", options: ["2a + 4b", "6a + 4b", "2a + 2b", "4ab"], correctIndex: 0, explanation: "(4a-2a)+(3b+b)=2a+4b." },
  { id: "al-mcq-2", topicId: "algebra-1", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Solve: 2x + 5 = 17", options: ["4", "6", "8", "11"], correctIndex: 1, explanation: "2x=12, x=6." },
  { id: "al-mcq-3", topicId: "algebra-1", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "Factorise: 6x + 9", options: ["3(2x+3)", "2(3x+4)", "6(x+9)", "3(2x+9)"], correctIndex: 0, explanation: "HCF=3. 6x/3=2x, 9/3=3." },
  { id: "al-mcq-4", topicId: "algebra-1", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Solve: 3(x + 2) = 18", options: ["2", "3", "4", "6"], correctIndex: 2, explanation: "3x+6=18, 3x=12, x=4." },

  // ===== MATHEMATICS: BUSINESS =====
  { id: "ba-mcq-1", topicId: "business-arithmetic", subjectId: "mathematics", type: "mcq", difficulty: "easy", question: "Buy at 10,000, sell at 12,000. Profit?", options: ["2,000", "22,000", "8,000", "12,000"], correctIndex: 0, explanation: "12,000-10,000=2,000." },
  { id: "ba-mcq-2", topicId: "business-arithmetic", subjectId: "mathematics", type: "mcq", difficulty: "medium", question: "Buy at 10,000, sell at 12,000. % profit?", options: ["16.7%", "20%", "25%", "12%"], correctIndex: 1, explanation: "2000/10000 x 100 = 20%." },
  { id: "ba-mcq-3", topicId: "business-arithmetic", subjectId: "mathematics", type: "mcq", difficulty: "hard", question: "Invest 200,000 at 8% for 3 years. Total?", options: ["248,000", "244,000", "256,000", "232,000"], correctIndex: 0, explanation: "Interest=48,000. Total=248,000." },

  // ===== BIOLOGY: INTRODUCTION =====
  { id: "bi-mcq-1", topicId: "bio-introduction", subjectId: "biology", type: "mcq", difficulty: "easy", question: "What does the M in MRS GREN stand for?", options: ["Movement", "Metabolism", "Memory", "Multiplication"], correctIndex: 0, explanation: "M = Movement." },
  { id: "bi-mcq-2", topicId: "bio-introduction", subjectId: "biology", type: "mcq", difficulty: "easy", question: "Which is NOT a characteristic of living things?", options: ["Respiration", "Photosynthesis", "Growth", "Excretion"], correctIndex: 1, explanation: "Photosynthesis is a process, not one of the seven characteristics." },
  { id: "bi-mcq-3", topicId: "bio-introduction", subjectId: "biology", type: "mcq", difficulty: "medium", question: "The study of plants is called?", options: ["Zoology", "Botany", "Ecology", "Genetics"], correctIndex: 1, explanation: "Botany = plants. Zoology = animals." },
  { id: "bi-mcq-4", topicId: "bio-introduction", subjectId: "biology", type: "mcq", difficulty: "medium", question: "Excretion refers to?", options: ["Taking in food", "Removing waste", "Growing", "Responding to light"], correctIndex: 1, explanation: "Excretion = removal of waste products." },

  // ===== BIOLOGY: CELLS =====
  { id: "ce-mcq-1", topicId: "bio-cells", subjectId: "biology", type: "mcq", difficulty: "easy", question: "Which part controls what enters and leaves the cell?", options: ["Nucleus", "Cell membrane", "Cytoplasm", "Vacuole"], correctIndex: 1, explanation: "The cell membrane is selectively permeable." },
  { id: "ce-mcq-2", topicId: "bio-cells", subjectId: "biology", type: "mcq", difficulty: "easy", question: "Which structure is in plant cells but NOT animal cells?", options: ["Nucleus", "Cytoplasm", "Cell wall", "Cell membrane"], correctIndex: 2, explanation: "Cell wall = cellulose, plants only." },
  { id: "ce-mcq-3", topicId: "bio-cells", subjectId: "biology", type: "mcq", difficulty: "medium", question: "Where does photosynthesis happen?", options: ["Nucleus", "Chloroplasts", "Vacuole", "Cell wall"], correctIndex: 1, explanation: "Chloroplasts contain chlorophyll." },
  { id: "ce-mcq-4", topicId: "bio-cells", subjectId: "biology", type: "mcq", difficulty: "hard", question: "Correct order of organisation?", options: ["Organ, tissue, cell", "Cell, tissue, organ", "Tissue, cell, organ", "Cell, organ, tissue"], correctIndex: 1, explanation: "Cells form tissues, tissues form organs." },

  // ===== BIOLOGY: CLASSIFICATION =====
  { id: "cl-mcq-1", topicId: "bio-classification", subjectId: "biology", type: "mcq", difficulty: "easy", question: "Which kingdom do mushrooms belong to?", options: ["Plantae", "Animalia", "Fungi", "Protoctista"], correctIndex: 2, explanation: "Mushrooms = fungi." },
  { id: "cl-mcq-2", topicId: "bio-classification", subjectId: "biology", type: "mcq", difficulty: "medium", question: "Which feature distinguishes mammals?", options: ["Lay eggs", "Have scales", "Produce milk", "Cold-blooded"], correctIndex: 2, explanation: "Mammals produce milk." },
  { id: "cl-mcq-3", topicId: "bio-classification", subjectId: "biology", type: "mcq", difficulty: "hard", question: "Which kingdom has no true nucleus?", options: ["Plantae", "Prokaryotes", "Fungi", "Protoctista"], correctIndex: 1, explanation: "Prokaryotes (bacteria) have no nucleus." },

  // ===== CHEMISTRY: INTRODUCTION =====
  { id: "ci-mcq-1", topicId: "chem-introduction", subjectId: "chemistry", type: "mcq", difficulty: "easy", question: "Chemistry is the study of?", options: ["Living things", "Matter and its changes", "Forces", "Numbers"], correctIndex: 1, explanation: "Chemistry = matter and changes." },
  { id: "ci-mcq-2", topicId: "chem-introduction", subjectId: "chemistry", type: "mcq", difficulty: "medium", question: "When diluting acid, always?", options: ["Add water to acid", "Add acid to water", "Mix simultaneously", "Heat them"], correctIndex: 1, explanation: "Acid to water, never the reverse." },
  { id: "ci-mcq-3", topicId: "chem-introduction", subjectId: "chemistry", type: "mcq", difficulty: "medium", question: "First step of the scientific method?", options: ["Experiment", "Hypothesis", "Observation", "Conclusion"], correctIndex: 2, explanation: "Observe first, then hypothesise." },

  // ===== CHEMISTRY: STATES OF MATTER =====
  { id: "sm-mcq-1", topicId: "chem-states-matter", subjectId: "chemistry", type: "mcq", difficulty: "easy", question: "Which state has fixed shape and volume?", options: ["Solid", "Liquid", "Gas", "All"], correctIndex: 0, explanation: "Solids have fixed shape and volume." },
  { id: "sm-mcq-2", topicId: "chem-states-matter", subjectId: "chemistry", type: "mcq", difficulty: "easy", question: "Liquid to gas is called?", options: ["Freezing", "Melting", "Evaporation", "Condensation"], correctIndex: 2, explanation: "Evaporation = liquid to gas." },
  { id: "sm-mcq-3", topicId: "chem-states-matter", subjectId: "chemistry", type: "mcq", difficulty: "medium", question: "In which state do particles move fastest?", options: ["Solid", "Liquid", "Gas", "Same speed"], correctIndex: 2, explanation: "Gas particles have most energy." },
  { id: "sm-mcq-4", topicId: "chem-states-matter", subjectId: "chemistry", type: "mcq", difficulty: "hard", question: "Which change absorbs heat?", options: ["Condensation", "Freezing", "Melting", "None"], correctIndex: 2, explanation: "Melting absorbs heat (endothermic)." },

  // ===== CHEMISTRY: SEPARATING MIXTURES =====
  { id: "mx-mcq-1", topicId: "chem-separating-mixtures", subjectId: "chemistry", type: "mcq", difficulty: "easy", question: "Method to separate sand from water?", options: ["Evaporation", "Filtration", "Chromatography", "Distillation"], correctIndex: 1, explanation: "Filtration separates insoluble solids." },
  { id: "mx-mcq-2", topicId: "chem-separating-mixtures", subjectId: "chemistry", type: "mcq", difficulty: "medium", question: "Recover salt from salt water?", options: ["Filtration", "Evaporation", "Magnetic", "Decanting"], correctIndex: 1, explanation: "Evaporate water, salt remains." },
  { id: "mx-mcq-3", topicId: "chem-separating-mixtures", subjectId: "chemistry", type: "mcq", difficulty: "hard", question: "Air is an example of a?", options: ["Element", "Compound", "Mixture", "Molecule"], correctIndex: 2, explanation: "Air = mixture of gases, not chemically combined." },

  // ===== PHYSICS: INTRODUCTION =====
  { id: "pi-mcq-1", topicId: "phys-introduction", subjectId: "physics", type: "mcq", difficulty: "easy", question: "Physics is the study of?", options: ["Living things", "Matter and energy", "Chemicals", "Numbers"], correctIndex: 1, explanation: "Physics = matter, energy, interactions." },
  { id: "pi-mcq-2", topicId: "phys-introduction", subjectId: "physics", type: "mcq", difficulty: "medium", question: "Which branch deals with motion and forces?", options: ["Optics", "Mechanics", "Acoustics", "Nuclear"], correctIndex: 1, explanation: "Mechanics = motion, forces." },

  // ===== PHYSICS: MEASUREMENTS =====
  { id: "pm-mcq-1", topicId: "phys-measurements", subjectId: "physics", type: "mcq", difficulty: "easy", question: "SI unit of mass?", options: ["Gram", "Kilogram", "Newton", "Litre"], correctIndex: 1, explanation: "Kilogram (kg) is the SI unit." },
  { id: "pm-mcq-2", topicId: "phys-measurements", subjectId: "physics", type: "mcq", difficulty: "easy", question: "SI unit of length?", options: ["Centimetre", "Metre", "Kilometre", "Foot"], correctIndex: 1, explanation: "Metre (m)." },
  { id: "pm-mcq-3", topicId: "phys-measurements", subjectId: "physics", type: "mcq", difficulty: "medium", question: "Density of object: mass 240g, volume 80cm3?", options: ["2 g/cm3", "3 g/cm3", "4 g/cm3", "0.33 g/cm3"], correctIndex: 1, explanation: "240/80 = 3 g/cm3." },
  { id: "pm-mcq-4", topicId: "phys-measurements", subjectId: "physics", type: "mcq", difficulty: "hard", question: "Object density 0.8 g/cm3 in water (1.0). It will?", options: ["Sink", "Float", "Dissolve", "Float middle"], correctIndex: 1, explanation: "0.8 < 1.0 so it floats." },
];

/** Get all questions for a topic. */
export function getQuestionsByTopic(topicId: string): PracticeQuestion[] {
  return practiceBank.filter((q) => q.topicId === topicId);
}

/** Get all practice topics across all subjects. */
export function getPracticeTopics() {
  const topicMeta: Record<string, { name: string; subject: string; color: string }> = {
    "number-bases": { name: "Number Bases", subject: "Mathematics", color: "#C06A4B" },
    "integers": { name: "Integers", subject: "Mathematics", color: "#C06A4B" },
    "fractions-percentages-decimals": { name: "Fractions & Percentages", subject: "Mathematics", color: "#C06A4B" },
    "algebra-1": { name: "Algebra 1", subject: "Mathematics", color: "#C06A4B" },
    "business-arithmetic": { name: "Business Arithmetic", subject: "Mathematics", color: "#C06A4B" },
    "bio-introduction": { name: "Introduction to Biology", subject: "Biology", color: "#7E8E63" },
    "bio-cells": { name: "Cells", subject: "Biology", color: "#7E8E63" },
    "bio-classification": { name: "Classification", subject: "Biology", color: "#7E8E63" },
    "chem-introduction": { name: "Introduction to Chemistry", subject: "Chemistry", color: "#6E8AA6" },
    "chem-states-matter": { name: "States of Matter", subject: "Chemistry", color: "#6E8AA6" },
    "chem-separating-mixtures": { name: "Separating Mixtures", subject: "Chemistry", color: "#6E8AA6" },
    "phys-introduction": { name: "Introduction to Physics", subject: "Physics", color: "#9B7BB8" },
    "phys-measurements": { name: "Measurements", subject: "Physics", color: "#9B7BB8" },
  };

  const topicIds = Array.from(new Set(practiceBank.map((q) => q.topicId)));

  return topicIds.map((id) => ({
    id,
    name: topicMeta[id]?.name || id,
    subject: topicMeta[id]?.subject || "General",
    color: topicMeta[id]?.color || "#C06A4B",
    questionCount: getQuestionsByTopic(id).length,
  }));
}

/** XP awarded per difficulty. */
export function xpForDifficulty(d: Difficulty): number {
  return d === "easy" ? 10 : d === "medium" ? 15 : 20;
}

/** Mastery level based on practice accuracy. */
export function getMasteryLevel(accuracy: number): { level: string; color: string } {
  if (accuracy >= 90) return { level: "Mastered", color: "#5F6C46" };
  if (accuracy >= 75) return { level: "Proficient", color: "#7E8E63" };
  if (accuracy >= 50) return { level: "Developing", color: "#C06A4B" };
  if (accuracy > 0) return { level: "Beginner", color: "#536E89" };
  return { level: "Not started", color: "#8C857A" };
}
