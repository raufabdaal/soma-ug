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
    order: 1,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Chemistry and Society", 1, "Introduction to Chemistry",
      "The learner appreciates the role of chemistry in society and understands safe laboratory practice."),
    blocks: [
      { type: "competency", text: "The learner should appreciate the role of chemistry in society and understand safe laboratory practice." },
      { type: "outcome", text: "Understand the meaning of chemistry and why it is important.", tag: "u,v/a" },
      { type: "outcome", text: "Know laboratory rules and safety procedures.", tag: "k,u" },
      { type: "outcome", text: "Identify common laboratory apparatus and their uses.", tag: "k,s" },

      { type: "context", heading: "Chemistry is everywhere", content: "The food you eat, the soap you wash with, the medicine that cures you, the petrol in a boda boda - all involve chemistry. Chemistry is the study of matter: what things are made of, how they change, and the properties of substances. In Uganda, chemistry is behind agriculture (fertilisers), health (medicines), industry (plastics, cement), and energy (biogas, solar cells)." },

      { type: "key_point", title: "The scientific method", content: "Chemists follow a structured process: 1. Observation (notice something). 2. Hypothesis (propose an explanation). 3. Experiment (test the hypothesis). 4. Record data (collect results). 5. Conclude (accept or reject the hypothesis). This method ensures conclusions are based on evidence, not guesswork." },

      { type: "key_point", title: "Laboratory safety rules", content: "1. Wear safety goggles and lab coat. 2. Never taste chemicals. 3. Do not run in the lab. 4. Report breakages immediately. 5. Add acid to water, never water to acid. 6. Know where the fire extinguisher and first aid kit are. 7. Do not mix chemicals without instructions. 8. Wash hands after handling chemicals." },

      { type: "worked_example", problem: "You need to heat a liquid in a test tube. What apparatus do you need and what safety precautions apply?", steps: ["Apparatus: Bunsen burner, test tube, test tube holder, tripod stand (if needed).", "Hold the test tube with a holder, not your fingers.", "Point the mouth of the test tube away from yourself and others.", "Heat gently, moving the tube in and out of the flame.", "Never look directly down into the test tube while heating."], answer: "Bunsen burner, test tube, holder. Point away from people, heat gently.", reasoning: "Heating liquids can cause splashing or bumping. The safety precautions prevent burns from hot liquid or shattered glass. Never pointing the tube at anyone is the most important rule because hot liquid can shoot out unexpectedly." },

      { type: "exam_style", scenario: "A student wants to dilute concentrated sulphuric acid. They have a beaker of water and a bottle of acid.", question: "Explain the correct procedure for diluting the acid and why the wrong method is dangerous.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly states: add acid to water (not water to acid)", marks: 1, type: "accuracy" },
        { criterion: "Explains: adding water to acid causes violent reaction", marks: 1, type: "method" },
        { criterion: "Mentions heat is released (exothermic)", marks: 1, type: "method" },
        { criterion: "Explains danger: acid can splash and cause burns", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Chemistry is the study of...?", options: ["Living things", "Matter and its changes", "Forces and motion", "Numbers and shapes"], correctIndex: 1, explanation: "Chemistry studies matter - what things are made of, how they behave, and how they change." },
      { type: "question", question: "When diluting acid, you should always...?", options: ["Add water to acid", "Add acid to water", "Mix them simultaneously", "Heat them together"], correctIndex: 1, explanation: "Always add acid to water. Adding water to acid causes a violent, exothermic reaction that can splash acid." },
      { type: "question", question: "Which is the first step in the scientific method?", options: ["Experiment", "Hypothesis", "Observation", "Conclusion"], correctIndex: 2, explanation: "Observation comes first. You notice something, then form a hypothesis to explain it." },
      { type: "question", question: "Which apparatus is used to measure exact volumes of liquid?", options: ["Beaker", "Pipette", "Test tube", "Crucible"], correctIndex: 1, explanation: "A pipette measures exact volumes. Beakers give rough estimates only." },

      { type: "activity_of_integration", title: "Chemistry in Ugandan society", scenario: "Uganda's economy depends on several industries that involve chemistry.", task: "Name three industries in Uganda that rely on chemistry. For each, describe one chemical process or product.", hint: "Think about farming, health, manufacturing, and energy.", answer: "1. Agriculture: fertilisers are chemical compounds that provide nitrogen, phosphorus, and potassium to crops. 2. Health/pharmaceuticals: medicines like antimalarial drugs are chemical compounds designed to kill parasites. 3. Construction: cement is made by chemical reactions heating limestone and clay. 4. Energy: biogas is produced when bacteria break down organic waste (a biochemical process). Chemistry is embedded in every sector of Uganda's economy." },
    ],
  },

  // ===== TOPIC 2: STATES OF MATTER =====
  {
    id: "s1-chem-states-matter",
    topicId: "chem-states-matter",
    subjectId: "chemistry",
    title: "States of matter",
    order: 2,
    estimatedMinutes: 16,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 2, "States of Matter",
      "The learner understands the three states of matter and can explain changes of state using the kinetic theory."),
    blocks: [
      { type: "competency", text: "The learner should understand the three states of matter and explain changes of state using the kinetic theory." },
      { type: "outcome", text: "Describe the properties of solids, liquids, and gases.", tag: "k,u" },
      { type: "outcome", text: "Explain the kinetic theory of matter.", tag: "u" },
      { type: "outcome", text: "Describe changes of state and the energy changes involved.", tag: "u,s" },

      { type: "context", heading: "The three states around you", content: "Ice, water, and steam are the same substance (H2O) in three different states. The difference is not what they are made of, but how the particles inside them are arranged and how they move. Understanding states of matter explains why ice melts, why water boils, and why steam can power engines." },

      { type: "key_point", title: "Properties of each state", content: "SOLIDS: fixed shape, fixed volume, particles close together and only vibrate. LIQUIDS: take the shape of their container, fixed volume, particles close but can move past each other. GASES: fill any container, no fixed volume, particles far apart and move freely at high speed." },

      { type: "key_point", title: "The kinetic theory", content: "All matter is made of tiny particles that are always moving. The energy of the particles determines the state. In solids, particles have low energy and stay in fixed positions. In liquids, they have more energy and can slide past each other. In gases, they have high energy and move rapidly in all directions. Heating gives particles more energy; cooling takes it away." },

      { type: "worked_example", problem: "Explain what happens to the particles in ice when it is heated and becomes water, then steam.", steps: ["In ice (solid): particles vibrate in fixed positions, held by strong forces.", "Heating gives particles energy. They vibrate more vigorously until the forces break.", "The solid melts into water (liquid): particles can now slide past each other but stay close together.", "More heating gives more energy. Particles move faster and spread apart.", "The liquid boils into steam (gas): particles are far apart, moving rapidly in all directions."], answer: "Heating increases particle energy: solid to liquid (melting), liquid to gas (boiling)", reasoning: "The states of matter are all about energy. Adding heat gives particles more kinetic energy. This overcomes the forces holding them together, allowing them to move more freely. Removing heat reverses the process." },

      { type: "key_point", title: "Changes of state vocabulary", content: "Solid to liquid = MELTING. Liquid to gas = EVAPORATION/BOILING. Gas to liquid = CONDENSATION. Liquid to solid = FREEZING. Solid directly to gas = SUBLIMATION (example: dry ice, mothballs). Melting and boiling absorb heat. Freezing and condensation release heat." },

      { type: "exam_style", scenario: "UNEB frequently tests understanding of particle arrangement in different states.", question: "Describe the arrangement and movement of particles in a solid, a liquid, and a gas. Use the kinetic theory.", marks: 6 },

      { type: "marking_guide", totalMarks: 6, criteria: [
        { criterion: "Solid: particles close, regular arrangement, vibrate only", marks: 2, type: "method" },
        { criterion: "Liquid: particles close, irregular arrangement, move/slide past each other", marks: 2, type: "method" },
        { criterion: "Gas: particles far apart, move rapidly in all directions", marks: 2, type: "accuracy" },
      ] },

      { type: "question", question: "Which state of matter has a fixed shape and fixed volume?", options: ["Solid", "Liquid", "Gas", "All states"], correctIndex: 0, explanation: "Solids have both fixed shape and fixed volume. Particles are locked in position." },
      { type: "question", question: "What is the process called when a liquid turns into a gas?", options: ["Freezing", "Melting", "Evaporation", "Condensation"], correctIndex: 2, explanation: "Evaporation (or boiling) is the change from liquid to gas." },
      { type: "question", question: "When a gas turns into a liquid, the process is called...?", options: ["Melting", "Condensation", "Sublimation", "Evaporation"], correctIndex: 1, explanation: "Condensation is gas to liquid. Example: water droplets forming on a cold glass." },
      { type: "question", question: "According to kinetic theory, particles in which state move fastest?", options: ["Solid", "Liquid", "Gas", "They move at the same speed"], correctIndex: 2, explanation: "Gas particles have the most energy and move at high speed in all directions." },
      { type: "question", question: "Which change of state absorbs heat energy?", options: ["Condensation", "Freezing", "Melting", "None"], correctIndex: 2, explanation: "Melting absorbs heat (endothermic). The energy is used to break the bonds holding particles in the solid." },

      { type: "activity_of_integration", title: "The water cycle", scenario: "The water cycle that brings rain to Uganda's farms involves changes of state.", task: "Identify three changes of state in the water cycle. For each, state whether heat is absorbed or released.", hint: "Think about evaporation from lakes, condensation in clouds, and freezing on mountains.", answer: "1. Evaporation: water from lakes/rivers turns to vapour. Heat absorbed. 2. Condensation: water vapour in clouds turns to liquid droplets. Heat released. 3. Freezing: water in clouds on cold mountains turns to ice/snow. Heat released. 4. Melting: ice on mountains melts to water. Heat absorbed. The water cycle is driven by energy from the sun causing evaporation, and cooling at high altitude causing condensation. Understanding states of matter explains our weather." },
    ],
  },

  // ===== TOPIC 3: SEPARATING MIXTURES =====
  {
    id: "s1-chem-separating-mixtures",
    topicId: "chem-separating-mixtures",
    subjectId: "chemistry",
    title: "Separating mixtures",
    order: 3,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Particulate Nature of Matter", 3, "Separating Mixtures",
      "The learner applies different methods to separate mixtures based on the properties of their components."),
    blocks: [
      { type: "competency", text: "The learner should be able to apply different methods to separate mixtures based on the properties of their components." },
      { type: "outcome", text: "Distinguish between elements, compounds, and mixtures.", tag: "k,u" },
      { type: "outcome", text: "Describe methods of separating mixtures.", tag: "k,s" },
      { type: "outcome", text: "Choose the correct separation method for a given mixture.", tag: "u,s" },

      { type: "context", heading: "Separation in daily life", content: "When you make tea, you filter out the leaves. When salt is extracted from Lake Katwe in Uganda, the water is evaporated. When you wash rice, decanting removes the dirty water. Separation methods are practical skills used in cooking, mining, water treatment, and medicine." },

      { type: "key_point", title: "Elements, compounds, and mixtures", content: "ELEMENT: a substance made of only one type of atom (example: iron, oxygen). COMPOUND: two or more elements chemically joined (example: water H2O, salt NaCl). MIXTURE: two or more substances mixed but NOT chemically joined (example: salt water, air, sand and soil). Mixtures can be separated by physical methods. Compounds need chemical reactions to separate." },

      { type: "key_point", title: "Separation methods and when to use them", content: "Filtration: separate an insoluble solid from a liquid (sand from water). Evaporation: recover a dissolved solid from a liquid (salt from water). Distillation: separate a liquid from a solution AND collect the liquid (water from salt water). Simple distillation = one liquid. Fractional distillation = multiple liquids with different boiling points (crude oil refining). Chromatography: separate dissolved substances like dyes. Magnetic separation: separate magnetic materials (iron from sulfur). Decanting: pour off a liquid from a settled solid." },

      { type: "worked_example", problem: "You have a mixture of salt, sand, and water. Describe how to separate all three components.", steps: ["Step 1: Filter the mixture. The sand is insoluble and stays on the filter paper. The salt water passes through as filtrate.", "Step 2: Wash the sand on the filter paper with a little water and dry it. You now have pure sand.", "Step 3: Evaporate or distil the salt water filtrate. The water evaporates (or is collected by distillation), leaving salt behind.", "Result: sand (on filter), salt (in evaporating dish), water (as vapour or collected by distillation)."], answer: "Filter for sand, evaporate for salt, distil to collect water", reasoning: "The key is that sand is INSOLUBLE (does not dissolve) while salt IS SOLUBLE. Filtration separates insoluble solids from liquids. Evaporation separates dissolved solids from liquids. If you want to keep the water too, use distillation instead of evaporation." },

      { type: "exam_style", scenario: "A farmer in Uganda wants to obtain pure water from muddy river water for drinking.", question: "Describe a method the farmer could use to obtain clean water. Explain why this method works.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Suggests filtration (using cloth, sand filter, or filter paper)", marks: 1, type: "method" },
        { criterion: "Explains: filtration removes insoluble solid particles (mud)", marks: 1, type: "method" },
        { criterion: "Suggests boiling or distillation to kill germs / separate dissolved impurities", marks: 1, type: "accuracy" },
        { criterion: "Clear explanation using correct terminology", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "Which method would separate sand from water?", options: ["Evaporation", "Filtration", "Chromatography", "Distillation"], correctIndex: 1, explanation: "Filtration separates an insoluble solid (sand) from a liquid (water)." },
      { type: "question", question: "Which method recovers salt from salt water?", options: ["Filtration", "Evaporation", "Magnetic separation", "Decanting"], correctIndex: 1, explanation: "Evaporation removes the water, leaving the dissolved salt behind." },
      { type: "question", question: "Air is an example of a...?", options: ["Element", "Compound", "Mixture", "Molecule"], correctIndex: 2, explanation: "Air is a mixture of nitrogen, oxygen, carbon dioxide, and other gases. They are not chemically combined." },
      { type: "question", question: "Water (H2O) is an example of a...?", options: ["Element", "Compound", "Mixture", "Solution"], correctIndex: 1, explanation: "Water is a compound: hydrogen and oxygen are chemically joined in a fixed ratio (2:1)." },
      { type: "question", question: "Which separation method uses a difference in boiling points?", options: ["Filtration", "Distillation", "Chromatography", "Magnetic separation"], correctIndex: 1, explanation: "Distillation (especially fractional distillation) separates liquids based on their different boiling points." },

      { type: "activity_of_integration", title: "Salt from Lake Katwe", scenario: "Lake Katwe in western Uganda contains very salty water. Salt is harvested commercially from this lake.", task: "Describe how salt can be obtained from the lake water. Which separation method is used and why?", hint: "The salt is dissolved in the water. You need to remove the water to get the salt.", answer: "The traditional method uses evaporation. The salty lake water is directed into shallow ponds. The sun heats the water, causing it to evaporate. The salt, which was dissolved, is left behind as solid crystals. This works because salt has a much higher boiling point than water. The sun provides the energy for free, making it an economical method for large-scale salt production. This is chemistry applied to Ugandan industry." },
    ],
  },
];
