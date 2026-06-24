import type { Lesson } from "@/types";

const S1 = (term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject: "Chemistry", level: "S1", term, theme, topicNumber, topicName, competency,
});

export const chemistryLessons: Lesson[] = [

  // ===== TOPIC 1: INTRODUCTION TO CHEMISTRY =====
  {
    id: "s1-chem-introduction",
    topicId: "chem-introduction",
    subjectId: "chemistry",
    title: "Introduction to Chemistry",
    order: 1, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Chemistry and Society", 1, "Introduction to Chemistry", "The learner appreciates the role of chemistry in society and safe laboratory practice."),
    blocks: [
      { type: "competency", text: "The learner should appreciate the role of chemistry in society and understand safe laboratory practice." },
      { type: "outcome", text: "Understand the meaning of chemistry and why it is important.", tag: "u" },
      { type: "outcome", text: "Know laboratory rules and safety procedures.", tag: "k,u" },
      { type: "context", heading: "Chemistry is everywhere", content: "The food you eat, the soap you use, the petrol in a boda boda - all involve chemistry. It studies matter: what things are made of and how they change. In Uganda, chemistry is behind agriculture (fertilisers), health (medicines), and industry (cement, plastics)." },
      { type: "key_point", title: "The scientific method", content: "1. Observation. 2. Hypothesis. 3. Experiment. 4. Record data. 5. Conclude. This ensures conclusions are based on evidence." },
      { type: "key_point", title: "Laboratory safety", content: "Wear goggles. Never taste chemicals. Add acid to water (never reverse). Know where the fire extinguisher is. Report breakages. Wash hands after handling chemicals." },
      { type: "exam_style", scenario: "A student wants to dilute concentrated sulphuric acid.", question: "Explain the correct procedure and why the wrong method is dangerous.", marks: 4 },
      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly states: add acid to water", marks: 1, type: "accuracy" },
        { criterion: "Explains: adding water to acid is violent", marks: 1, type: "method" },
        { criterion: "Mentions heat is released (exothermic)", marks: 1, type: "method" },
        { criterion: "Danger: acid splashes causing burns", marks: 1, type: "communication" },
      ] },
      { type: "question", question: "Chemistry is the study of?", options: ["Living things", "Matter and its changes", "Forces", "Numbers"], correctIndex: 1, explanation: "Chemistry studies matter and changes." },
      { type: "question", question: "When diluting acid, always?", options: ["Add water to acid", "Add acid to water", "Mix simultaneously", "Heat them"], correctIndex: 1, explanation: "Always add acid to water." },
      { type: "question", question: "First step of the scientific method?", options: ["Experiment", "Hypothesis", "Observation", "Conclusion"], correctIndex: 2, explanation: "Observe first." },
      { type: "activity_of_integration", title: "Chemistry in Uganda", scenario: "Uganda's economy depends on chemistry-based industries.", task: "Name three industries in Uganda that rely on chemistry.", hint: "Think farming, health, construction.", answer: "1. Agriculture (fertilisers). 2. Health (medicines). 3. Construction (cement). 4. Energy (biogas)." },
    ],
  },

  // ===== TOPIC 2: STATES OF MATTER =====
  {
    id: "s1-chem-states-matter",
    topicId: "chem-states-matter",
    subjectId: "chemistry",
    title: "States of matter",
    order: 2, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 2, "States of Matter", "The learner understands the three states of matter and changes of state."),
    blocks: [
      { type: "competency", text: "The learner should understand the three states of matter and explain changes of state using the kinetic theory." },
      { type: "outcome", text: "Describe the properties of solids, liquids, and gases.", tag: "k,u" },
      { type: "outcome", text: "Explain the kinetic theory of matter.", tag: "u" },
      { type: "context", heading: "Ice, water, steam", content: "The same substance (H2O) exists as ice, water, and steam. The difference is how particles are arranged and how much energy they have." },
      { type: "key_point", title: "Properties of each state", content: "SOLIDS: fixed shape and volume, particles vibrate in place. LIQUIDS: take container shape, fixed volume, particles slide past each other. GASES: fill any container, particles move freely at high speed." },
      { type: "key_point", title: "Kinetic theory", content: "All matter is made of particles that are always moving. Heating gives them more energy (solid to liquid to gas). Cooling takes energy away (gas to liquid to solid)." },
      { type: "worked_example", problem: "Explain what happens to particles when ice is heated to become steam.", steps: ["In ice: particles vibrate in fixed positions.", "Heating breaks bonds: particles slide = liquid (water).", "More heating: particles move fast and spread = gas (steam)."], answer: "Heating increases energy: solid to liquid to gas", reasoning: "Energy overcomes the forces holding particles together." },
      { type: "key_point", title: "Changes of state", content: "Melting (solid to liquid). Evaporation (liquid to gas). Condensation (gas to liquid). Freezing (liquid to solid). Sublimation (solid directly to gas). Melting/boiling absorb heat. Freezing/condensation release heat." },
      { type: "question", question: "Which state has fixed shape and volume?", options: ["Solid", "Liquid", "Gas", "All"], correctIndex: 0, explanation: "Solids." },
      { type: "question", question: "Liquid to gas is called?", options: ["Freezing", "Melting", "Evaporation", "Condensation"], correctIndex: 2, explanation: "Evaporation." },
      { type: "question", question: "In which state do particles move fastest?", options: ["Solid", "Liquid", "Gas", "Same speed"], correctIndex: 2, explanation: "Gas particles have the most energy." },
      { type: "question", question: "Which change absorbs heat?", options: ["Condensation", "Freezing", "Melting", "None"], correctIndex: 2, explanation: "Melting absorbs heat." },
      { type: "activity_of_integration", title: "The water cycle", scenario: "Rain in Uganda depends on changes of state.", task: "Identify three changes of state in the water cycle. State if heat is absorbed or released.", hint: "Evaporation, condensation, freezing.", answer: "Evaporation (absorbs heat). Condensation (releases heat). Freezing (releases heat). The sun drives evaporation; high altitude causes cooling and condensation." },
    ],
  },

  // ===== TOPIC 3: SEPARATING MIXTURES =====
  {
    id: "s1-chem-separating-mixtures",
    topicId: "chem-separating-mixtures",
    subjectId: "chemistry",
    title: "Separating mixtures",
    order: 3, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 3, "Separating Mixtures", "The learner applies methods to separate mixtures."),
    blocks: [
      { type: "competency", text: "The learner should be able to apply different methods to separate mixtures based on the properties of their components." },
      { type: "outcome", text: "Distinguish between elements, compounds, and mixtures.", tag: "k,u" },
      { type: "outcome", text: "Choose the correct separation method for a given mixture.", tag: "u,s" },
      { type: "context", heading: "Separation in daily life", content: "Filtering tea leaves. Extracting salt from Lake Katwe. Washing rice. Separation methods are used in cooking, mining, water treatment, and medicine." },
      { type: "key_point", title: "Elements, compounds, mixtures", content: "ELEMENT: one type of atom (iron, oxygen). COMPOUND: elements chemically joined (water H2O, salt NaCl). MIXTURE: substances mixed but not chemically joined (air, salt water, sand and soil)." },
      { type: "key_point", title: "Separation methods", content: "Filtration (insoluble solid from liquid). Evaporation (dissolved solid from liquid). Distillation (liquid from solution, collected). Chromatography (separate dissolved dyes). Magnetic (iron from sulfur). Decanting (pour liquid off settled solid)." },
      { type: "worked_example", problem: "Separate a mixture of salt, sand, and water.", steps: ["Filter: sand stays on filter, salt water passes through.", "Wash and dry the sand.", "Evaporate the salt water: water leaves, salt remains."], answer: "Filter for sand, evaporate for salt", reasoning: "Sand is insoluble (filtration). Salt is soluble (evaporation). The key is solubility differences." },
      { type: "exam_style", scenario: "A farmer wants clean water from muddy river water.", question: "Describe a method and explain why it works.", marks: 4 },
      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Suggests filtration (cloth, sand filter)", marks: 1, type: "method" },
        { criterion: "Explains: removes insoluble particles", marks: 1, type: "method" },
        { criterion: "Suggests boiling to kill germs", marks: 1, type: "accuracy" },
        { criterion: "Clear explanation", marks: 1, type: "communication" },
      ] },
      { type: "question", question: "Method to separate sand from water?", options: ["Evaporation", "Filtration", "Chromatography", "Distillation"], correctIndex: 1, explanation: "Filtration separates insoluble solids." },
      { type: "question", question: "Recover salt from salt water?", options: ["Filtration", "Evaporation", "Magnetic", "Decanting"], correctIndex: 1, explanation: "Evaporate water, salt remains." },
      { type: "question", question: "Air is a?", options: ["Element", "Compound", "Mixture", "Molecule"], correctIndex: 2, explanation: "Air is a mixture of gases." },
      { type: "question", question: "Water (H2O) is a?", options: ["Element", "Compound", "Mixture", "Solution"], correctIndex: 1, explanation: "Hydrogen and oxygen chemically joined = compound." },
      { type: "activity_of_integration", title: "Salt from Lake Katwe", scenario: "Lake Katwe in Uganda contains very salty water. Salt is harvested commercially.", task: "Describe how salt is obtained. Which method is used?", hint: "The salt is dissolved.", answer: "Evaporation. Salty water goes into shallow ponds. Sun heats the water, it evaporates, salt remains. The sun provides energy for free." },
    ],
  },

  // ===== TOPIC 4: ATOMS AND MOLECULES =====
  {
    id: "s1-chem-atoms-molecules",
    topicId: "chem-atoms-molecules",
    subjectId: "chemistry",
    title: "Atoms, elements and molecules",
    order: 4, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 4, "Atoms, Elements and Molecules", "The learner understands that all matter is made of atoms."),
    blocks: [
      { type: "competency", text: "The learner should understand that all matter is made of tiny particles called atoms, and that atoms combine to form molecules." },
      { type: "outcome", text: "Define atom, element, and molecule.", tag: "k" },
      { type: "outcome", text: "Write chemical symbols for common elements.", tag: "k,s" },
      { type: "outcome", text: "Determine the number of atoms in a molecule.", tag: "u,s" },
      { type: "context", heading: "The building blocks of everything", content: "Everything you can see, touch, and breathe is made of atoms. An atom is so small that a single drop of water contains more atoms than there are people on Earth. Atoms combine in different ways to make everything around us." },
      { type: "key_point", title: "Key definitions", content: "ATOM: the smallest particle of an element that can take part in a chemical reaction. ELEMENT: a substance made of only one type of atom (iron, oxygen, gold). MOLECULE: two or more atoms chemically joined together (O2, H2O, CO2)." },
      { type: "worked_example", problem: "How many atoms are in a molecule of H2SO4 (sulphuric acid)?", steps: ["H2 means 2 hydrogen atoms.", "S means 1 sulphur atom (no number = 1).", "O4 means 4 oxygen atoms.", "Total: 2 + 1 + 4 = 7 atoms."], answer: "7 atoms", reasoning: "The subscript number after each element symbol tells you how many atoms of that element are present. No number means one atom." },
      { type: "key_point", title: "Common chemical symbols", content: "H = Hydrogen, O = Oxygen, C = Carbon, N = Nitrogen, Na = Sodium, Cl = Chlorine, Fe = Iron, Cu = Copper, Au = Gold, Zn = Zinc. Some symbols come from Latin names (Fe from ferrum, Au from aurum)." },
      { type: "question", question: "What is the smallest particle of an element?", options: ["Molecule", "Atom", "Compound", "Mixture"], correctIndex: 1, explanation: "An atom is the smallest particle of an element." },
      { type: "question", question: "How many atoms are in H2O?", options: ["1", "2", "3", "4"], correctIndex: 2, explanation: "2 hydrogen + 1 oxygen = 3 atoms." },
      { type: "question", question: "What is the chemical symbol for oxygen?", options: ["O", "Ox", "Og", "Ou"], correctIndex: 0, explanation: "Oxygen is O." },
      { type: "question", question: "Fe is the symbol for?", options: ["Fluorine", "Iron", "Francium", "Phosphorus"], correctIndex: 1, explanation: "Fe = iron (from Latin ferrum)." },
      { type: "question", question: "How many atoms are in CO2?", options: ["1", "2", "3", "4"], correctIndex: 2, explanation: "1 carbon + 2 oxygen = 3 atoms." },
      { type: "activity_of_integration", title: "Atoms in everyday objects", scenario: "A water molecule (H2O) has 3 atoms. A sugar molecule (C12H22O11) has 45 atoms.", task: "A spoonful of sugar contains about 1,000,000,000,000,000,000 molecules. How many atoms is that? What does this tell you about the size of atoms?", hint: "Multiply molecules by atoms per molecule.", answer: "45 atoms per molecule x 1,000,000,000,000,000,000 molecules = 45,000,000,000,000,000,000 atoms in one spoonful. This tells us atoms are unimaginably small. This is why we cannot see individual atoms, even with a normal microscope." },
    ],
  },

  // ===== TOPIC 5: PHYSICAL AND CHEMICAL CHANGES =====
  {
    id: "s1-chem-physical-chemical",
    topicId: "chem-physical-chemical",
    subjectId: "chemistry",
    title: "Physical and chemical changes",
    order: 5, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 5, "Physical and Chemical Changes", "The learner distinguishes between physical and chemical changes."),
    blocks: [
      { type: "competency", text: "The learner should be able to distinguish between physical and chemical changes and classify given changes." },
      { type: "outcome", text: "Define physical and chemical changes.", tag: "k" },
      { type: "outcome", text: "Classify changes as physical or chemical.", tag: "u,s" },
      { type: "context", heading: "Changes happen all around us", content: "When ice melts, that is a physical change. When wood burns, that is a chemical change. Knowing the difference helps you understand cooking, rusting, digestion, and manufacturing." },
      { type: "key_point", title: "Physical vs Chemical", content: "PHYSICAL CHANGE: no new substance is formed. Reversible. Examples: melting, freezing, dissolving, boiling. CHEMICAL CHANGE: a new substance is formed. Usually irreversible. Signs include colour change, gas produced, heat/light released, precipitate formed. Examples: burning, rusting, cooking." },
      { type: "worked_example", problem: "Classify each as physical or chemical: melting ice, burning paper, dissolving salt in water, rusting iron.", steps: ["Melting ice: no new substance, reversible = PHYSICAL.", "Burning paper: new substances (ash, smoke, gases), irreversible = CHEMICAL.", "Dissolving salt: salt still salt, reversible by evaporation = PHYSICAL.", "Rusting iron: new substance (rust/iron oxide) formed = CHEMICAL."], answer: "Physical, Chemical, Physical, Chemical", reasoning: "The key question: is a new substance formed? If yes, it is chemical. If no (same substance, different state or mixed), it is physical." },
      { type: "question", question: "Burning wood is a ___ change?", options: ["Physical", "Chemical", "Reversible", "Nuclear"], correctIndex: 1, explanation: "Burning creates new substances (ash, smoke, gases). It is a chemical change." },
      { type: "question", question: "Dissolving sugar in tea is a ___ change?", options: ["Physical", "Chemical", "Irreversible", "Permanent"], correctIndex: 0, explanation: "No new substance. The sugar is still sugar, just dissolved. Reversible by evaporation." },
      { type: "question", question: "Which is a sign of a chemical change?", options: ["Change of shape", "Colour change and gas produced", "Change of state", "Dissolving"], correctIndex: 1, explanation: "Colour change, gas bubbles, heat released, and new substances forming are signs of chemical change." },
      { type: "question", question: "Rusting is a ___ change?", options: ["Physical", "Chemical", "Reversible", "Temporary"], correctIndex: 1, explanation: "Rust is a new substance (iron oxide). Chemical change." },
      { type: "activity_of_integration", title: "Cooking an egg", scenario: "When you cook an egg, the clear liquid becomes white and solid. You cannot un-cook it.", task: "Is cooking an egg a physical or chemical change? Give two reasons.", hint: "Is the cooked egg the same substance as the raw egg?", answer: "Cooking an egg is a CHEMICAL change. Reasons: 1. A new substance is formed (the proteins have permanently changed shape, called denaturation). 2. It is irreversible - you cannot turn a cooked egg back to raw. 3. Heat causes the change. This is why cooking is a chemical process, not just a physical one." },
    ],
  },
];
