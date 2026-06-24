import type { Lesson } from "@/types";

const S1 = (term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject: "Biology", level: "S1", term, theme, topicNumber, topicName, competency,
});

export const biologyLessons: Lesson[] = [

  // ===== TOPIC 1: INTRODUCTION TO BIOLOGY =====
  {
    id: "s1-bio-introduction",
    topicId: "bio-introduction",
    subjectId: "biology",
    title: "Introduction to Biology",
    order: 1,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Diversity of Living Things", 1, "Introduction to Biology",
      "The learner understands biology as a study of life and that all living organisms experience common life processes."),
    blocks: [
      { type: "competency", text: "The learner should understand that biology is the study of life and that all living organisms experience common life processes." },
      { type: "outcome", text: "Appreciate that biology is the study of life.", tag: "k" },
      { type: "outcome", text: "Understand that life processes are common to all living things but manifested differently in different organisms.", tag: "u" },

      { type: "context", heading: "What is Biology?", content: "Biology is the study of living things. The word comes from Greek: 'bios' meaning life, and 'logos' meaning study. Everything around you that is alive, from the grass outside your classroom to the person sitting next to you, is studied in biology. Understanding biology helps us make decisions about health, farming, and the environment." },

      { type: "key_point", title: "The seven characteristics of life (MRS GREN)", content: "All living organisms share seven characteristics, remembered by MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition. If something has all seven, it is living. If it lacks even one, it is not alive." },

      { type: "worked_example", problem: "Is a car a living organism? Use MRS GREN to decide.", steps: ["Movement: Yes, a car moves.", "Respiration: No, a car does not respire (release energy from food).", "Sensitivity: Partially, but not true biological response.", "Growth: No, a car does not grow.", "Reproduction: No.", "Excretion: No.", "Nutrition: It uses fuel, but not biological nutrition.", "Conclusion: A car is NOT living because it lacks respiration, growth, reproduction, excretion, and true nutrition."], answer: "A car is not living", reasoning: "Movement alone does not make something alive. All seven characteristics must be present. This is why MRS GREN is a complete test, not a single-feature test." },

      { type: "exam_style", scenario: "UNEB often asks you to explain the difference between living and non-living things.", question: "Explain why a growing plant is considered living but a stone is not. Use at least four characteristics of living things.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Identifies at least 4 correct characteristics of living things", marks: 2, type: "method" },
        { criterion: "Explains how the plant shows each characteristic", marks: 1, type: "method" },
        { criterion: "States that the stone lacks these characteristics", marks: 1, type: "communication" },
      ] },

      { type: "key_point", title: "Branches of Biology", content: "Biology has several branches: Botany (study of plants), Zoology (study of animals), Microbiology (study of microorganisms), Ecology (study of organisms and their environment), Genetics (study of heredity), Anatomy (study of internal structure), and Physiology (study of how bodies work)." },

      { type: "question", question: "What does the 'M' in MRS GREN stand for?", options: ["Movement", "Metabolism", "Memory", "Multiplication"], correctIndex: 0, explanation: "M stands for Movement - the ability to change position." },
      { type: "question", question: "Which of the following is NOT a characteristic of living things?", options: ["Respiration", "Photosynthesis", "Growth", "Excretion"], correctIndex: 1, explanation: "Photosynthesis is a process some organisms do, but it is not one of the seven universal characteristics of life." },
      { type: "question", question: "The study of plants is called...?", options: ["Zoology", "Botany", "Ecology", "Genetics"], correctIndex: 1, explanation: "Botany is the study of plants. Zoology is animals." },
      { type: "question", question: "Excretion refers to...?", options: ["Taking in food", "Removing waste", "Growing bigger", "Responding to light"], correctIndex: 1, explanation: "Excretion is the removal of waste products from the body." },

      { type: "activity_of_integration", title: "Is fire alive?", scenario: "Fire moves, grows, reproduces (spreads), and uses fuel (nutrition). Some people argue fire is alive.", task: "Use MRS GREN to determine whether fire is a living organism. Justify your answer.", hint: "Check all seven characteristics, not just some.", answer: "Fire shows movement, growth, and uses fuel. But it does not respire (no chemical release of energy from food), does not show sensitivity (true biological response), does not excrete waste products, and does not reproduce in the biological sense. Therefore fire is NOT living. It lacks the key characteristics of respiration and excretion." },
    ],
  },

  // ===== TOPIC 2: CELLS =====
  {
    id: "s1-bio-cells",
    topicId: "bio-cells",
    subjectId: "biology",
    title: "Cells: The building blocks of life",
    order: 2,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Diversity of Living Things", 2, "Cells",
      "The learner appreciates the cell as the basic unit of living organisms and how cell structures relate to their functions."),
    blocks: [
      { type: "competency", text: "The learner should appreciate that a cell is the basic unit of living organisms, and how the structures of different specialised cells are related to their functions." },
      { type: "outcome", text: "Know that the basic unit of living organisms is a cell.", tag: "k" },
      { type: "outcome", text: "Know and understand the structure and functions of a typical animal cell and plant cell.", tag: "k,u,s" },
      { type: "outcome", text: "Understand levels of organisation in organisms.", tag: "u" },

      { type: "context", heading: "Everything alive is made of cells", content: "Your body is made of billions of cells. A leaf is made of cells. Even the smallest bacterium is a single cell. The cell is the basic unit of life, just like a brick is the basic unit of a wall. Understanding cells is the foundation of all biology." },

      { type: "key_point", title: "Plant cells vs Animal cells", content: "Both have: nucleus (controls the cell), cytoplasm (jelly where reactions happen), cell membrane (controls what enters and leaves). PLANT cells also have: cell wall (rigid support, made of cellulose), chloroplasts (for photosynthesis), large vacuole (stores water and nutrients). Animal cells have: small or no vacuoles, no cell wall, no chloroplasts." },

      { type: "worked_example", problem: "Label and describe the function of three parts found in a plant cell but not in an animal cell.", steps: ["Cell wall: made of cellulose, provides rigidity and support. Gives plant cells their rectangular shape.", "Chloroplasts: contain chlorophyll, the site of photosynthesis where plants make food.", "Large vacuole: stores water, nutrients, and waste. Helps maintain the cell's shape through turgor pressure."], answer: "Cell wall, chloroplasts, large vacuole", reasoning: "These three structures are what make plant cells unique. They reflect the differences in how plants and animals survive: plants need rigid support (no skeleton), make their own food (photosynthesis), and store water (cannot move to find it)." },

      { type: "key_point", title: "Levels of organisation", content: "Cells are the smallest unit. Cells form tissues (groups of similar cells doing the same job). Tissues form organs (structures made of different tissues working together, like the heart or a leaf). Organs form systems (like the digestive system). Systems form the whole organism." },

      { type: "exam_style", scenario: "UNEB frequently tests your ability to identify cell parts and their functions.", question: "State three structural differences between a plant cell and an animal cell. For each, explain why the plant cell needs it.", marks: 6 },

      { type: "marking_guide", totalMarks: 6, criteria: [
        { criterion: "Identifies cell wall, chloroplasts, large vacuole as plant-only structures", marks: 3, type: "method" },
        { criterion: "Cell wall: for support/rigidity", marks: 1, type: "method" },
        { criterion: "Chloroplasts: for photosynthesis/making food", marks: 1, type: "accuracy" },
        { criterion: "Vacuole: for storage of water and maintaining shape", marks: 1, type: "accuracy" },
      ] },

      { type: "question", question: "Which part controls what enters and leaves the cell?", options: ["Nucleus", "Cell membrane", "Cytoplasm", "Vacuole"], correctIndex: 1, explanation: "The cell membrane is selectively permeable. It controls what substances enter and leave the cell." },
      { type: "question", question: "Which structure is found in plant cells but NOT in animal cells?", options: ["Nucleus", "Cytoplasm", "Cell wall", "Cell membrane"], correctIndex: 2, explanation: "The cell wall is made of cellulose and is found only in plant cells. It provides rigid support." },
      { type: "question", question: "Where does photosynthesis take place in a plant cell?", options: ["Nucleus", "Chloroplasts", "Vacuole", "Cell wall"], correctIndex: 1, explanation: "Chloroplasts contain chlorophyll which captures sunlight for photosynthesis." },
      { type: "question", question: "Which sequence shows the correct order of organisation?", options: ["Organ, tissue, cell, system", "Cell, tissue, organ, system", "Tissue, cell, organ, system", "Cell, organ, tissue, system"], correctIndex: 1, explanation: "Cells form tissues, tissues form organs, organs form systems. Correct order: cell, tissue, organ, system." },
      { type: "question", question: "What is the function of the nucleus?", options: ["Stores water", "Controls cell activities", "Makes food", "Provides support"], correctIndex: 1, explanation: "The nucleus contains genetic material (DNA) and controls all activities of the cell." },

      { type: "activity_of_integration", title: "Specialised cells", scenario: "Not all cells look the same. A red blood cell is different from a nerve cell, which is different from a root hair cell.", task: "Explain why a root hair cell has a long, thin extension. How does its structure relate to its function?", hint: "Think about what root hair cells do - they absorb water and minerals from the soil.", answer: "The root hair cell has a long, thin extension that greatly increases its surface area. This allows it to absorb more water and mineral ions from the soil. This is an example of structure matching function, a key principle in biology. Specialised cells have shapes that are adapted to do their specific job efficiently." },
    ],
  },

  // ===== TOPIC 3: CLASSIFICATION =====
  {
    id: "s1-bio-classification",
    topicId: "bio-classification",
    subjectId: "biology",
    title: "Classification of living things",
    order: 3,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Diversity of Living Things", 3, "Classification",
      "The learner understands that classification is the sorting out of living things based on their similarities and differences."),
    blocks: [
      { type: "competency", text: "The learner should understand that classification is the sorting out of living things based on their similarities and differences." },
      { type: "outcome", text: "Understand why living things are classified.", tag: "u" },
      { type: "outcome", text: "Know the five kingdoms of living organisms.", tag: "k" },
      { type: "outcome", text: "Classify organisms into their correct kingdoms.", tag: "u,s" },

      { type: "context", heading: "Why do we classify?", content: "Imagine a library with thousands of books and no system. You could never find anything. Classification is how biologists organise living things into groups based on similarities. It makes it easier to study, identify, and understand the relationships between organisms. When you know an animal is a mammal, you immediately know it has hair, gives birth to live young, and produces milk." },

      { type: "key_point", title: "The five kingdoms", content: "All living things are classified into five kingdoms: 1. Animals (Animalia) - multicellular, no cell walls, eat other organisms. 2. Plants (Plantae) - multicellular, have cell walls and chlorophyll, make their own food. 3. Fungi - have cell walls (not cellulose), feed on dead matter, example: mushrooms. 4. Protoctista - simple, mostly unicellular, example: amoeba. 5. Prokaryotes (Bacteria) - unicellular, no true nucleus." },

      { type: "worked_example", problem: "Classify the following into their kingdoms: mushroom, mango tree, housefly, amoeba, bacterium.", steps: ["Mushroom: feeds on dead matter, has cell walls but no chlorophyll. Kingdom: Fungi.", "Mango tree: multicellular, has cell walls and chlorophyll, makes own food. Kingdom: Plantae (Plants).", "Housefly: multicellular, no cell wall, eats other organisms. Kingdom: Animalia (Animals).", "Amoeba: unicellular, has a nucleus. Kingdom: Protoctista.", "Bacterium: unicellular, no true nucleus. Kingdom: Prokaryotes."], answer: "Fungi, Plantae, Animalia, Protoctista, Prokaryotes", reasoning: "Classification starts with the most obvious features: does it have cell walls? Does it make its own food? Is it unicellular or multicellular? These questions sort organisms into their kingdoms." },

      { type: "key_point", title: "The vertebrate groups", content: "Within the animal kingdom, vertebrates (animals with backbones) are divided into five groups: Fish (gills, scales, cold-blooded), Amphibians (moist skin, lay eggs in water, example: frog), Reptiles (dry scaly skin, cold-blooded, example: lizard), Birds (feathers, beak, warm-blooded, lay eggs), Mammals (hair, produce milk, warm-blooded, live birth)." },

      { type: "exam_style", scenario: "UNEB tests classification by asking you to sort organisms and justify your choices.", question: "A student finds an organism with feathers, a beak, and it lays eggs. To which vertebrate group does it belong? Give two reasons for your answer.", marks: 3 },

      { type: "marking_guide", totalMarks: 3, criteria: [
        { criterion: "Correctly identifies the group as Birds (Aves)", marks: 1, type: "accuracy" },
        { criterion: "Reason 1: has feathers (characteristic of birds)", marks: 1, type: "method" },
        { criterion: "Reason 2: has a beak (birds have beaks, not teeth)", marks: 1, type: "method" },
      ] },

      { type: "question", question: "Which kingdom do mushrooms belong to?", options: ["Plantae", "Animalia", "Fungi", "Protoctista"], correctIndex: 2, explanation: "Mushrooms are fungi. They have cell walls but no chlorophyll, and feed on dead matter." },
      { type: "question", question: "Which feature distinguishes mammals from other vertebrates?", options: ["Lay eggs", "Have scales", "Produce milk", "Cold-blooded"], correctIndex: 2, explanation: "Mammals produce milk to feed their young. They also have hair and are warm-blooded." },
      { type: "question", question: "A frog belongs to which vertebrate group?", options: ["Reptile", "Amphibian", "Fish", "Bird"], correctIndex: 1, explanation: "Frogs are amphibians. They have moist skin, lay eggs in water, and live on both land and water." },
      { type: "question", question: "Which kingdom consists of organisms with no true nucleus?", options: ["Plantae", "Animalia", "Prokaryotes", "Fungi"], correctIndex: 2, explanation: "Prokaryotes (bacteria) have no true nucleus. Their genetic material floats freely in the cell." },
      { type: "question", question: "Bacteria belong to which kingdom?", options: ["Protoctista", "Prokaryotes", "Fungi", "Plantae"], correctIndex: 1, explanation: "Bacteria are prokaryotes - unicellular organisms with no true nucleus." },

      { type: "activity_of_integration", title: "Design a classification key", scenario: "You are given five animals: a cat, a snake, a tilapia fish, a eagle, and a frog.", task: "Create a simple classification key (using yes/no questions) that would allow someone to identify each animal. Start with a broad question.", hint: "Think about the most obvious differences first: has legs or not? Has feathers or not? Lives in water or on land?", answer: "A possible key: 1. Has feathers? Yes = Eagle. No = go to 2. 2. Has legs? No = Tilapia (fish). Yes = go to 3. 3. Has dry scaly skin? Yes = Snake (reptile). No = go to 4. 4. Has moist skin and lives near water? Yes = Frog (amphibian). No = Cat (mammal). This is a dichotomous key - the tool biologists use to identify organisms." },
    ],
  },
];
