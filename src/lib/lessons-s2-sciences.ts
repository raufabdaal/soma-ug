import type { Lesson } from "@/types";

const S2 = (subject: string, term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject, level: "S2", term, theme, topicNumber, topicName, competency,
});

// ===== S2 BIOLOGY =====
export const s2BiologyLessons: Lesson[] = [
  {
    id: "s2-bio-soil", topicId: "s2-soil", subjectId: "biology",
    title: "Soil and its importance", order: 1, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Biology", "Term 1", "Soil", 1, "Soil Composition", "The learner understands soil composition and its importance to plant growth."),
    blocks: [
      { type: "competency", text: "The learner should understand the composition of soil and its importance to plant growth." },
      { type: "outcome", text: "Describe the components of soil.", tag: "k" },
      { type: "outcome", text: "Explain the importance of soil to plants.", tag: "u" },
      { type: "context", heading: "Soil sustains life", content: "Without soil, there would be no plants, no animals, no food. In Uganda, agriculture depends on healthy soil. Understanding what soil is made of helps farmers grow better crops and prevent erosion." },
      { type: "key_point", title: "Soil composition", content: "Soil contains: mineral particles (sand, silt, clay), organic matter (humus from decomposed plants/animals), water, air, and living organisms (worms, bacteria). The proportions determine soil type and fertility." },
      { type: "key_point", title: "Types of soil particles", content: "SAND: large particles, drains fast, holds little water. CLAY: tiny particles, holds lots of water, drains slowly. SILT: medium particles. LOAM: a mixture of all three - ideal for farming because it balances drainage and water retention." },
      { type: "question", question: "Which soil type is best for farming?", options: ["Pure sand", "Pure clay", "Loam", "Pure silt"], correctIndex: 2, explanation: "Loam is a balanced mixture that drains well but retains enough water and nutrients." },
      { type: "question", question: "Humus is made from?", options: ["Rocks", "Decomposed organic matter", "Sand", "Minerals"], correctIndex: 1, explanation: "Humus is decomposed plant and animal material. It makes soil dark and fertile." },
      { type: "question", question: "Which soil drains water fastest?", options: ["Clay", "Silt", "Sand", "Loam"], correctIndex: 2, explanation: "Sand has large particles with big gaps, so water drains through quickly." },
      { type: "activity_of_integration", title: "Ugandan farming", scenario: "A farmer in Mbale notices her crops are dying despite enough rain.", task: "What could be wrong with her soil? Suggest three tests she could do.", answer: "Could be: too much clay (waterlogged roots), too sandy (dries too fast), lacking humus (poor nutrients), wrong pH. Tests: 1. Feel test (squeeze soil: sandy falls apart, clay holds shape). 2. Drainage test (how fast water passes). 3. pH test (acidic or alkaline). Understanding soil type guides what crops to plant and how to improve it." },
    ],
  },
  {
    id: "s2-bio-nutrition", topicId: "s2-nutrition", subjectId: "biology",
    title: "Nutrition in plants and animals", order: 2, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Biology", "Term 2", "Nutrition", 2, "Nutrition", "The learner understands nutrition in plants and animals."),
    blocks: [
      { type: "competency", text: "The learner should understand the processes of nutrition in green plants and animals." },
      { type: "outcome", text: "Describe photosynthesis.", tag: "k,u" },
      { type: "outcome", text: "Describe the human digestive system.", tag: "k,u" },
      { type: "key_point", title: "Photosynthesis", content: "Plants make their own food. Equation: carbon dioxide + water + sunlight -> glucose + oxygen. Takes place in chloroplasts (leaves). Chlorophyll captures sunlight. Plants are the basis of all food chains." },
      { type: "key_point", title: "Human digestion", content: "Food is broken down step by step: Mouth (chewing, saliva starts breaking starch). Stomach (acid and enzymes break proteins). Small intestine (enzymes break fats, carbohydrates; nutrients absorbed). Large intestine (water absorbed, waste formed)." },
      { type: "question", question: "What gas do plants take in for photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], correctIndex: 1, explanation: "Plants absorb CO2 and release O2 during photosynthesis." },
      { type: "question", question: "Where does most nutrient absorption happen?", options: ["Mouth", "Stomach", "Small intestine", "Large intestine"], correctIndex: 2, explanation: "The small intestine has villi (finger-like projections) that absorb nutrients into the blood." },
      { type: "question", question: "Photosynthesis produces which gas?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"], correctIndex: 1, explanation: "Oxygen is released as a by-product of photosynthesis." },
      { type: "activity_of_integration", title: "Why we need plants", scenario: "Deforestation is a major environmental issue in Uganda.", task: "Explain two reasons why cutting down forests affects our oxygen and food supply.", answer: "1. Fewer plants means less photosynthesis, so less oxygen is produced and less CO2 is absorbed (worsening climate change). 2. Plants are the start of every food chain. Without them, animals and humans lose their food source. Protecting forests is protecting our own survival." },
    ],
  },
  {
    id: "s2-bio-transport", topicId: "s2-transport", subjectId: "biology",
    title: "Transport in plants and animals", order: 3, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S2("Biology", "Term 3", "Transport", 3, "Transport", "The learner understands transport systems in organisms."),
    blocks: [
      { type: "competency", text: "The learner should understand how materials are transported in plants and animals." },
      { type: "outcome", text: "Describe the human circulatory system.", tag: "k,u" },
      { type: "outcome", text: "Describe transport in plants (xylem and phloem).", tag: "k,u" },
      { type: "key_point", title: "Human circulatory system", content: "HEART: pumps blood. ARTERIES: carry blood away from the heart (usually oxygenated). VEINS: carry blood to the heart (usually deoxygenated). CAPILLARIES: tiny vessels where gas and nutrient exchange happens. BLOOD: red blood cells (carry oxygen), white blood cells (fight infection), platelets (clotting), plasma (liquid)." },
      { type: "key_point", title: "Plant transport", content: "XYLEM: carries water and minerals UP from roots to leaves. PHLOEM: carries food (glucose) DOWN from leaves to the rest of the plant. Together they form the vascular system." },
      { type: "question", question: "Which blood vessels carry blood AWAY from the heart?", options: ["Veins", "Arteries", "Capillaries", "All"], correctIndex: 1, explanation: "Arteries carry blood away from the heart (thick walls to withstand pressure)." },
      { type: "question", question: "What carries water up a plant?", options: ["Phloem", "Xylem", "Roots", "Leaves"], correctIndex: 1, explanation: "Xylem carries water and minerals from roots to leaves." },
      { type: "question", question: "Red blood cells are specialised for?", options: ["Fighting infection", "Carrying oxygen", "Clotting", "Digestion"], correctIndex: 1, explanation: "Red blood cells contain haemoglobin which binds oxygen." },
      { type: "question", question: "Phloem transports?", options: ["Water", "Food (glucose)", "Minerals", "Oxygen"], correctIndex: 1, explanation: "Phloem carries food made by photosynthesis from leaves to the rest of the plant." },
      { type: "activity_of_integration", title: "Heart health", scenario: "Heart disease is increasing in Uganda due to diet and lifestyle changes.", task: "Using your knowledge of the circulatory system, explain why blocked arteries are dangerous. Suggest two ways to keep arteries healthy.", answer: "Blocked arteries restrict blood flow, starving organs of oxygen. This causes heart attacks (heart muscle dies). Prevention: eat less saturated fat, exercise regularly, avoid smoking. Understanding the circulatory system explains why lifestyle affects heart health." },
    ],
  },
];

// ===== S2 CHEMISTRY =====
export const s2ChemistryLessons: Lesson[] = [
  {
    id: "s2-chem-atomic-structure", topicId: "s2-atomic-structure", subjectId: "chemistry",
    title: "Atomic structure", order: 1, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Chemistry", "Term 1", "Atomic Structure", 1, "Atomic Structure", "The learner understands the structure of the atom."),
    blocks: [
      { type: "competency", text: "The learner should understand the structure of the atom and the arrangement of subatomic particles." },
      { type: "outcome", text: "Describe protons, neutrons, and electrons.", tag: "k" },
      { type: "outcome", text: "Determine atomic number and mass number.", tag: "u,s" },
      { type: "key_point", title: "Subatomic particles", content: "PROTON: positive charge (+1), in nucleus, mass = 1. NEUTRON: no charge (0), in nucleus, mass = 1. ELECTRON: negative charge (-1), orbits nucleus, mass negligible. Atoms are neutral because protons = electrons." },
      { type: "key_point", title: "Key numbers", content: "ATOMIC NUMBER: number of protons (defines the element). MASS NUMBER: protons + neutrons. Number of neutrons = mass number - atomic number. In a neutral atom: electrons = protons = atomic number." },
      { type: "worked_example", problem: "Carbon has atomic number 6, mass number 12. How many protons, neutrons, electrons?", steps: ["Protons = atomic number = 6.", "Electrons = protons = 6 (neutral atom).", "Neutrons = mass - atomic = 12 - 6 = 6."], answer: "6 protons, 6 neutrons, 6 electrons", reasoning: "Carbon-12 is the most common form of carbon. The numbers 6-6-6 are easy to remember. Different isotopes of carbon (like carbon-14) have more neutrons but the same number of protons." },
      { type: "question", question: "Which particle has a positive charge?", options: ["Electron", "Proton", "Neutron", "Atom"], correctIndex: 1, explanation: "Protons are positive (+1)." },
      { type: "question", question: "Atomic number = number of?", options: ["Neutrons", "Protons", "Electrons + neutrons", "Mass"], correctIndex: 1, explanation: "Atomic number = protons. This defines the element." },
      { type: "question", question: "Oxygen: atomic number 8, mass 16. How many neutrons?", options: ["8", "16", "24", "0"], correctIndex: 0, explanation: "Neutrons = 16 - 8 = 8." },
      { type: "question", question: "Which particle orbits the nucleus?", options: ["Proton", "Neutron", "Electron", "All three"], correctIndex: 2, explanation: "Electrons orbit the nucleus in shells." },
      { type: "activity_of_integration", title: "Isotopes", scenario: "Carbon-12 and Carbon-14 are both carbon. Carbon-14 is used to date ancient objects.", task: "Both have atomic number 6. What makes them different? Why does this matter for archaeology?", answer: "Carbon-12 has 6 neutrons. Carbon-14 has 8 neutrons. Same element, different mass (isotopes). Carbon-14 is radioactive and decays at a known rate. By measuring how much C-14 remains in ancient bones or wood, archaeologists can calculate their age. This is atomic structure applied to history." },
    ],
  },
  {
    id: "s2-chem-periodic-table", topicId: "s2-periodic-table", subjectId: "chemistry",
    title: "The periodic table", order: 2, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Chemistry", "Term 1", "Periodic Table", 2, "Periodic Table", "The learner uses the periodic table to understand element properties."),
    blocks: [
      { type: "competency", text: "The learner should be able to use the periodic table to understand trends in element properties." },
      { type: "outcome", text: "Describe the arrangement of the periodic table.", tag: "k" },
      { type: "outcome", text: "Distinguish between metals and non-metals.", tag: "u" },
      { type: "key_point", title: "How the periodic table is organised", content: "Periods = rows (left to right). Groups = columns (top to bottom). Group number = number of outer electrons. Elements in the same group have similar chemical properties because they have the same number of outer electrons." },
      { type: "key_point", title: "Metals vs non-metals", content: "METALS: left side. Shiny, conduct electricity, malleable, form positive ions. Examples: iron, copper, sodium. NON-METALS: right side. Dull (mostly), poor conductors, brittle. Examples: oxygen, chlorine, carbon." },
      { type: "question", question: "Elements in the same group have the same number of?", options: ["Neutrons", "Protons", "Outer electrons", "Shells"], correctIndex: 2, explanation: "Group number = outer electrons. This is why they have similar properties." },
      { type: "question", question: "Which is a metal?", options: ["Oxygen", "Chlorine", "Sodium", "Neon"], correctIndex: 2, explanation: "Sodium is a metal (left side, reactive). The others are non-metals." },
      { type: "question", question: "Metals are generally?", options: ["Dull and brittle", "Shiny and conductive", "Gases at room temperature", "Poor conductors"], correctIndex: 1, explanation: "Metals are shiny, malleable, and good conductors." },
      { type: "activity_of_integration", title: "Elements in your phone", scenario: "A smartphone contains over 30 different elements from the periodic table.", task: "Name three metals in a phone and state what each is used for.", answer: "1. Copper (wiring, conducts electricity). 2. Gold (connectors, doesn't corrode). 3. Lithium (battery). 4. Aluminium (casing, lightweight). The periodic table is not abstract - it is literally in your pocket." },
    ],
  },
  {
    id: "s2-chem-bonding", topicId: "s2-chemical-bonding", subjectId: "chemistry",
    title: "Chemical bonding", order: 3, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Chemistry", "Term 2", "Chemical Bonding", 3, "Chemical Bonding", "The learner understands how atoms bond to form compounds."),
    blocks: [
      { type: "competency", text: "The learner should understand how atoms combine through ionic and covalent bonding." },
      { type: "outcome", text: "Describe ionic bonding.", tag: "k,u" },
      { type: "outcome", text: "Describe covalent bonding.", tag: "k,u" },
      { type: "key_point", title: "Why atoms bond", content: "Atoms bond to achieve a full outer shell (stable, like noble gases). They do this by gaining, losing, or sharing electrons." },
      { type: "key_point", title: "Two types of bonding", content: "IONIC: metal + non-metal. Metal LOSES electrons (becomes positive ion). Non-metal GAINS them (becomes negative ion). Opposite charges attract. Example: NaCl (sodium chloride = table salt). COVALENT: non-metal + non-metal. They SHARE electrons. Example: H2O (water), CO2." },
      { type: "worked_example", problem: "How does sodium (Na) bond with chlorine (Cl) to form NaCl?", steps: ["Sodium has 1 outer electron. Chlorine has 7.", "Sodium gives its 1 electron to chlorine.", "Sodium becomes Na+ (lost 1 electron = positive).", "Chlorine becomes Cl- (gained 1 electron = negative).", "Opposite charges attract: Na+ Cl- = NaCl."], answer: "Ionic bond: Na transfers an electron to Cl", reasoning: "Sodium wanted to lose 1 electron (to have a full shell). Chlorine wanted to gain 1 (to fill its shell). The transfer satisfies both. The resulting electrical attraction holds them together." },
      { type: "question", question: "Which type of bond forms between a metal and a non-metal?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], correctIndex: 1, explanation: "Ionic: metal loses electrons, non-metal gains them." },
      { type: "question", question: "Which type of bond involves sharing electrons?", options: ["Ionic", "Covalent", "Metallic", "Magnetic"], correctIndex: 1, explanation: "Covalent: non-metals share electrons." },
      { type: "question", question: "NaCl (table salt) is an example of a ___ bond?", options: ["Covalent", "Ionic", "Metallic", "Hydrogen"], correctIndex: 1, explanation: "Na (metal) + Cl (non-metal) = ionic bond." },
      { type: "question", question: "Water (H2O) has which type of bond?", options: ["Ionic", "Covalent", "Metallic", "None"], correctIndex: 1, explanation: "Two non-metals (H and O) share electrons = covalent." },
      { type: "activity_of_integration", title: "Salt in Ugandan cooking", scenario: "Salt (NaCl) is used in almost every Ugandan dish.", task: "Describe the ionic bond in NaCl. Why does salt dissolve in water but not in oil?", answer: "NaCl is an ionic bond (Na gives Cl an electron). It dissolves in water because water is polar (slightly charged) and can pull the Na+ and Cl- ions apart. Oil is non-polar, so it cannot separate the ions - salt does not dissolve in oil. This is bonding theory explaining everyday cooking." },
    ],
  },
];

// ===== S2 PHYSICS =====
export const s2PhysicsLessons: Lesson[] = [
  {
    id: "s2-phys-work-energy", topicId: "s2-work-energy", subjectId: "physics",
    title: "Work, energy and power", order: 1, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Physics", "Term 1", "Mechanics", 1, "Work, Energy and Power", "The learner understands work, energy and power."),
    blocks: [
      { type: "competency", text: "The learner should understand the concepts of work, energy, and power and their relationships." },
      { type: "outcome", text: "Define work and calculate it.", tag: "k,u,s" },
      { type: "outcome", text: "Distinguish between kinetic and potential energy.", tag: "u" },
      { type: "key_point", title: "Work", content: "Work = Force x Distance. Unit: Joules (J). Work is done when a force moves an object. If you push a wall and it doesn't move, you've done zero work (scientifically speaking)." },
      { type: "key_point", title: "Energy types", content: "KINETIC ENERGY: energy of motion (a moving car, flowing water). POTENTIAL ENERGY: stored energy (a book on a shelf, a stretched spring). Energy cannot be created or destroyed, only transformed." },
      { type: "key_point", title: "Power", content: "Power = Work / Time. Unit: Watts (W). Power measures how fast work is done. A 100W bulb uses energy faster than a 60W bulb. 1 Watt = 1 Joule per second." },
      { type: "worked_example", problem: "Calculate the work done when a force of 50 N moves an object 3 m.", steps: ["Work = Force x Distance.", "W = 50 x 3 = 150 J."], answer: "150 Joules", reasoning: "Work requires both force AND movement in the direction of the force." },
      { type: "question", question: "Work = ?", options: ["Force x Time", "Force x Distance", "Mass x Velocity", "Power x Time"], correctIndex: 1, explanation: "Work = Force x Distance." },
      { type: "question", question: "A book on a shelf has ___ energy?", options: ["Kinetic", "Potential", "No", "Heat"], correctIndex: 1, explanation: "Stored energy due to height = gravitational potential energy." },
      { type: "question", question: "Work 200 J in 4 seconds. Power = ?", options: ["50 W", "800 W", "196 W", "204 W"], correctIndex: 0, explanation: "Power = 200/4 = 50 W." },
      { type: "question", question: "A moving ball has ___ energy?", options: ["Potential", "Kinetic", "Chemical", "No"], correctIndex: 1, explanation: "Energy of motion = kinetic energy." },
      { type: "activity_of_integration", title: "Owen Falls Dam", scenario: "Owen Falls Dam in Jinja generates electricity for Uganda.", task: "Trace the energy transformations: from water to electricity in your home.", answer: "1. Water behind the dam has potential energy (height). 2. Water flows down: potential transforms to kinetic energy. 3. Water hits turbine blades: kinetic energy spins the turbine. 4. Turbine turns generator: mechanical energy transforms to electrical energy. 5. Electricity reaches your home: powers lights, phone, etc. Energy is never created or destroyed, just transformed. This is the law of conservation of energy in action." },
    ],
  },
  {
    id: "s2-phys-pressure", topicId: "s2-pressure", subjectId: "physics",
    title: "Pressure in fluids", order: 2, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S2("Physics", "Term 2", "Mechanics", 2, "Pressure", "The learner understands pressure in solids and fluids."),
    blocks: [
      { type: "competency", text: "The learner should understand pressure in fluids and its applications." },
      { type: "outcome", text: "Calculate pressure in liquids.", tag: "u,s" },
      { type: "outcome", text: "Explain atmospheric pressure.", tag: "u" },
      { type: "key_point", title: "Liquid pressure", content: "Pressure in a liquid increases with depth. Formula: P = density x gravity x height. This is why dams are thicker at the bottom. The deeper you go underwater, the more pressure you feel." },
      { type: "key_point", title: "Atmospheric pressure", content: "Air has weight and exerts pressure on everything. At sea level, atmospheric pressure is about 101,000 Pa. It decreases with altitude (why your ears pop on a mountain). We don't feel it because pressure acts equally in all directions." },
      { type: "question", question: "Liquid pressure increases with?", options: ["Temperature", "Depth", "Width", "Colour"], correctIndex: 1, explanation: "The deeper you go, the more water is above you pushing down." },
      { type: "question", question: "Why are dam walls thicker at the bottom?", options: ["Looks better", "Water pressure is higher at depth", "Cheaper", "Stronger material"], correctIndex: 1, explanation: "Higher pressure at the bottom requires thicker walls to withstand the force." },
      { type: "question", question: "Atmospheric pressure ___ with altitude.", options: ["Increases", "Decreases", "Stays constant", "Doubles"], correctIndex: 1, explanation: "Less air above you at high altitude means lower pressure." },
      { type: "activity_of_integration", title: "Why ears pop", scenario: "When driving up a mountain, your ears pop.", task: "Explain this using atmospheric pressure.", answer: "At high altitude, atmospheric pressure outside your ear drops. The air inside your middle ear is at ground-level pressure, pushing your eardrum outward. The pop is air escaping through the Eustachian tube to equalise the pressure. This is fluid pressure in action inside your own body." },
    ],
  },
  {
    id: "s2-phys-magnetism", topicId: "s2-magnetism", subjectId: "physics",
    title: "Magnets and magnetic fields", order: 3, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S2("Physics", "Term 3", "Magnetism", 3, "Magnetism", "The learner understands magnets and magnetic fields."),
    blocks: [
      { type: "competency", text: "The learner should understand the properties of magnets and magnetic fields." },
      { type: "outcome", text: "Describe the properties of magnets.", tag: "k" },
      { type: "outcome", text: "Explain magnetic fields.", tag: "u" },
      { type: "key_point", title: "Properties of magnets", content: "Magnets have two poles: North and South. Like poles repel (N-N, S-S). Unlike poles attract (N-S). Magnetic materials: iron, steel, nickel, cobalt. Non-magnetic: wood, plastic, copper, aluminium." },
      { type: "key_point", title: "Magnetic field", content: "The region around a magnet where magnetic force acts. Field lines go from North to South (outside the magnet). The closer the lines, the stronger the field. Earth itself is a giant magnet (which is why compasses work)." },
      { type: "question", question: "Like poles of two magnets?", options: ["Attract", "Repel", "Nothing", "Connect"], correctIndex: 1, explanation: "Like poles repel (N repels N, S repels S)." },
      { type: "question", question: "Which material is magnetic?", options: ["Wood", "Plastic", "Iron", "Copper"], correctIndex: 2, explanation: "Iron is magnetic. Wood, plastic, and copper are not." },
      { type: "question", question: "Magnetic field lines go from?", options: ["S to N", "N to S", "In circles", "Random"], correctIndex: 1, explanation: "Field lines go from North pole to South pole (outside the magnet)." },
      { type: "question", question: "A compass points North because?", options: ["The needle is heavy", "Earth is a giant magnet", "It is programmed", "Sun pulls it"], correctIndex: 1, explanation: "Earth's magnetic field aligns the compass needle." },
      { type: "activity_of_integration", title: "Make a compass", scenario: "You are lost and need to find North.", task: "Describe how to make a simple compass using a magnetised needle, a leaf, and water.", answer: "1. Magnetise a needle by stroking it with a magnet 20 times in one direction. 2. Float a leaf on still water. 3. Place the needle on the leaf. 4. The needle will align itself North-South along Earth's magnetic field. This is how early navigators found their way - magnetism saving lives." },
    ],
  },
];

// ===== S3 MATHEMATICS =====
export const s3MathLessons: Lesson[] = [
  {
    id: "s3-math-trigonometry", topicId: "s3-trigonometry", subjectId: "mathematics",
    title: "Trigonometry: sin, cos, tan", order: 1, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S2("Mathematics", "Term 1", "Geometry", 1, "Trigonometry", "The learner applies trigonometric ratios."),
    blocks: [
      { type: "competency", text: "The learner should be able to apply trigonometric ratios to solve right-angled triangles." },
      { type: "outcome", text: "Use sine, cosine, and tangent ratios.", tag: "k,s" },
      { type: "outcome", text: "Solve problems involving angles and sides.", tag: "u,s" },
      { type: "key_point", title: "SOH CAH TOA", content: "sin = Opposite / Hypotenuse. cos = Adjacent / Hypotenuse. tan = Opposite / Adjacent. Only works for right-angled triangles. Hypotenuse is always opposite the right angle (longest side)." },
      { type: "worked_example", problem: "A right triangle has an angle of 30 degrees. The hypotenuse is 10 cm. Find the opposite side.", steps: ["We need the opposite side and have the hypotenuse.", "Use sin: sin(30) = opposite / hypotenuse.", "sin(30) = 0.5.", "0.5 = opposite / 10.", "Opposite = 5 cm."], answer: "5 cm", reasoning: "Choosing the right ratio depends on what you know and what you need. Opposite + Hypotenuse = use sin." },
      { type: "question", question: "sin = ?", options: ["A/H", "O/H", "O/A", "A/O"], correctIndex: 1, explanation: "sin = Opposite / Hypotenuse (SOH)." },
      { type: "question", question: "tan = ?", options: ["O/H", "A/H", "O/A", "H/O"], correctIndex: 2, explanation: "tan = Opposite / Adjacent (TOA)." },
      { type: "question", question: "sin(30) = ?", options: ["0.5", "0.87", "0.71", "1"], correctIndex: 0, explanation: "sin(30) = 0.5." },
      { type: "activity_of_integration", title: "Height of a building", scenario: "You stand 30 m from a building. The angle to the top is 45 degrees.", task: "Calculate the height of the building.", answer: "tan(45) = height / distance. tan(45) = 1. Height = 1 x 30 = 30 m. Trigonometry lets you measure tall structures without climbing them." },
    ],
  },
  {
    id: "s3-math-matrices", topicId: "s3-matrices", subjectId: "mathematics",
    title: "Matrices", order: 2, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Mathematics", "Term 2", "Data", 2, "Matrices", "The learner performs operations on matrices."),
    blocks: [
      { type: "competency", text: "The learner should be able to add, subtract, and multiply matrices." },
      { type: "outcome", text: "Add and subtract matrices.", tag: "k,s" },
      { type: "outcome", text: "Multiply a matrix by a scalar.", tag: "u,s" },
      { type: "key_point", title: "What is a matrix?", content: "A matrix is a grid of numbers in rows and columns. Dimensions: rows x columns. A 2x2 matrix has 2 rows and 2 columns. Only matrices of the SAME dimensions can be added or subtracted." },
      { type: "worked_example", problem: "Add matrices A = [1 2; 3 4] and B = [5 6; 7 8].", steps: ["Add corresponding elements.", "Top-left: 1 + 5 = 6.", "Top-right: 2 + 6 = 8.", "Bottom-left: 3 + 7 = 10.", "Bottom-right: 4 + 8 = 12.", "Result: [6 8; 10 12]."], answer: "[6 8; 10 12]", reasoning: "Matrix addition is element by element. Each number adds to the number in the same position." },
      { type: "question", question: "A 3x2 matrix has how many elements?", options: ["3", "2", "5", "6"], correctIndex: 3, explanation: "3 rows x 2 columns = 6 elements." },
      { type: "question", question: "Can you add a 2x3 matrix to a 3x2 matrix?", options: ["Yes", "No", "Sometimes", "Only if same numbers"], correctIndex: 1, explanation: "Matrices must have the same dimensions to add or subtract." },
      { type: "question", question: "Multiply [2 4; 6 8] by 3.", options: ["[5 7; 9 11]", "[6 12; 18 24]", "[2/3 4/3; 6/3 8/3]", "[2 4; 6 8]"], correctIndex: 1, explanation: "Multiply each element by 3: [6 12; 18 24]." },
      { type: "activity_of_integration", title: "Shops and prices", scenario: "Two shops sell different quantities of sugar and rice.", task: "Represent the stocks as matrices. Add them to find total inventory.", answer: "Shop A: [50 30] (sugar, rice). Shop B: [40 60]. Total: [50+40 30+60] = [90 90]. This is matrix addition used for inventory management." },
    ],
  },
  {
    id: "s3-math-ratios-proportions", topicId: "s3-ratios-proportions", subjectId: "mathematics",
    title: "Ratios and proportions", order: 3, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S2("Mathematics", "Term 2", "Numbers", 3, "Ratios and Proportions", "The learner uses ratios and proportions."),
    blocks: [
      { type: "competency", text: "The learner should be able to apply ratios and proportions to solve problems." },
      { type: "outcome", text: "Simplify and compare ratios.", tag: "k,s" },
      { type: "outcome", text: "Solve problems involving direct and inverse proportion.", tag: "u,s" },
      { type: "key_point", title: "Direct proportion", content: "When one quantity increases, the other increases by the same factor. If 2 pens cost 1,000 UGX, 6 pens cost 3,000 UGX. Ratio stays constant: pens/cost = 2/1000 = 6/3000." },
      { type: "key_point", title: "Inverse proportion", content: "When one quantity increases, the other decreases. More workers = less time to finish a job. If 4 workers take 6 days, 8 workers take 3 days (half the time). Product stays constant: 4 x 6 = 8 x 3 = 24." },
      { type: "worked_example", problem: "Share 120,000 UGX between Aisha and Joan in the ratio 3:2.", steps: ["Total parts: 3 + 2 = 5.", "Each part = 120,000 / 5 = 24,000.", "Aisha: 3 x 24,000 = 72,000.", "Joan: 2 x 24,000 = 48,000."], answer: "Aisha 72,000, Joan 48,000", reasoning: "Divide the total by the sum of the ratio parts, then multiply each share by its ratio number." },
      { type: "question", question: "Share 50,000 in ratio 1:4.", options: ["10,000 and 40,000", "25,000 and 25,000", "5,000 and 45,000", "20,000 and 30,000"], correctIndex: 0, explanation: "5 parts. 50,000/5 = 10,000 per part. 1x10,000 = 10,000. 4x10,000 = 40,000." },
      { type: "question", question: "If 3 workers take 8 days, how long for 6 workers?", options: ["16 days", "8 days", "4 days", "2 days"], correctIndex: 2, explanation: "Double the workers = half the time (inverse proportion). 3x8 = 24. 24/6 = 4 days." },
      { type: "question", question: "Simplify ratio 15:25.", options: ["3:5", "5:3", "15:25", "1:2"], correctIndex: 0, explanation: "Divide both by 5: 3:5." },
      { type: "activity_of_integration", title: "Recipe scaling", scenario: "A recipe for 4 people needs 200g of flour. You are cooking for 10 people.", task: "How much flour do you need? What type of proportion is this?", answer: "Direct proportion: 200/4 = 50g per person. For 10 people: 10 x 50 = 500g. This is ratios applied to cooking - the ratio flour:people stays constant." },
    ],
  },
];

// ===== S4 MATHEMATICS =====
export const s4MathLessons: Lesson[] = [
  {
    id: "s4-math-functions", topicId: "s4-functions", subjectId: "mathematics",
    title: "Composite functions", order: 1, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S2("Mathematics", "Term 1", "Algebra", 1, "Composite Functions", "The learner evaluates composite functions."),
    blocks: [
      { type: "competency", text: "The learner should be able to evaluate composite functions and find inverse functions." },
      { type: "outcome", text: "Find composite functions fg(x).", tag: "u,s" },
      { type: "outcome", text: "Find the inverse of a function.", tag: "u,s" },
      { type: "key_point", title: "Composite functions", content: "fg(x) means do g first, then put the result into f. Like a factory assembly line: the output of one machine becomes the input of the next. fg(x) = f(g(x))." },
      { type: "worked_example", problem: "f(x) = 2x + 1, g(x) = x^2. Find fg(3).", steps: ["First find g(3): g(3) = 3^2 = 9.", "Then put 9 into f: f(9) = 2(9) + 1 = 19.", "fg(3) = 19."], answer: "19", reasoning: "Composite functions work inside-out. Calculate the inner function first, then feed its result into the outer function." },
      { type: "key_point", title: "Inverse function", content: "The inverse f^(-1)(x) undoes what f(x) does. If f turns x into y, the inverse turns y back into x. Swap x and y, then make y the subject." },
      { type: "question", question: "f(x) = 3x - 2. Find f(4).", options: ["10", "12", "14", "7"], correctIndex: 1, explanation: "f(4) = 3(4) - 2 = 10. Wait: 12-2=10. Answer: 10.", },
      { type: "question", question: "f(x) = x + 5, g(x) = 2x. Find fg(3).", options: ["11", "16", "8", "13"], correctIndex: 0, explanation: "g(3)=6. f(6)=6+5=11." },
      { type: "activity_of_integration", title: "Temperature conversion", scenario: "Celsius to Fahrenheit: F = 1.8C + 32.", task: "Find the inverse function (Fahrenheit to Celsius). Verify: if C=20 gives F=68, does F=68 give C=20?", answer: "Inverse: swap C and F. C = (F-32)/1.8. Check: (68-32)/1.8 = 36/1.8 = 20. Correct! The inverse reverses the conversion." },
    ],
  },
  {
    id: "s4-math-linear-programming", topicId: "s4-linear-programming", subjectId: "mathematics",
    title: "Linear programming", order: 2, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S2("Mathematics", "Term 1", "Algebra", 2, "Linear Programming", "The learner uses linear programming to optimise."),
    blocks: [
      { type: "competency", text: "The learner should be able to formulate and solve linear programming problems." },
      { type: "outcome", text: "Write constraints as inequalities.", tag: "u" },
      { type: "outcome", text: "Find the optimal solution graphically.", tag: "u,s" },
      { type: "context", heading: "Optimising with maths", content: "Linear programming helps businesses maximise profit or minimise cost. A bakery deciding how many cakes and bread loaves to bake, given limited flour and time. This is maths applied directly to business decisions." },
      { type: "key_point", title: "The method", content: "1. Define variables. 2. Write constraints as inequalities. 3. Draw the feasible region (shaded area satisfying all constraints). 4. Find the objective function (what you want to maximise/minimise). 5. Check the corners of the feasible region." },
      { type: "worked_example", problem: "A baker makes cakes (profit 2,000 each) and bread (profit 1,000 each). Flour constraint: 3 cakes + 1 bread <= 300. Time constraint: 1 cake + 2 bread <= 200. Maximise profit.", steps: ["Let x = cakes, y = bread.", "Constraints: 3x + y <= 300, x + 2y <= 200, x >= 0, y >= 0.", "Profit P = 2000x + 1000y.", "Graph the constraints and find the feasible region corners.", "Test each corner in the profit equation.", "The corner giving the highest profit is the answer."], answer: "Solve by testing corners of the feasible region", reasoning: "The optimal solution is always at a corner of the feasible region. You don't need to check every point, just the corners." },
      { type: "question", question: "In linear programming, the optimal solution is found at?", options: ["The centre of the region", "A corner of the feasible region", "The origin", "Anywhere"], correctIndex: 1, explanation: "The maximum or minimum is always at a vertex (corner) of the feasible region." },
      { type: "activity_of_integration", title: "Bakery business", scenario: "You run a small bakery. Cakes need 500g flour, bread needs 200g. You have 5,000g flour. Cakes take 1 hour, bread takes 30 minutes. You have 8 hours.", task: "Write the two constraints as inequalities. If cakes give 5,000 UGX profit and bread gives 2,000 UGX, what should you maximise?", answer: "Let x = cakes, y = bread. Constraints: 500x + 200y <= 5000 (flour), 60x + 30y <= 480 (time in minutes). Profit = 5000x + 2000y. Graph these, find the corners, test in the profit equation. This is real business maths." },
    ],
  },
];
