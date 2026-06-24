import type { Lesson } from "@/types";

const S1 = (term: string, theme: string, topicNumber: number, topicName: string, competency: string) => ({
  subject: "Physics", level: "S1", term, theme, topicNumber, topicName, competency,
});

export const physicsLessons: Lesson[] = [

  // ===== TOPIC 1: INTRODUCTION TO PHYSICS =====
  {
    id: "s1-phys-introduction",
    topicId: "phys-introduction",
    subjectId: "physics",
    title: "Introduction to Physics",
    order: 1, estimatedMinutes: 14, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Introduction", 1, "Introduction to Physics", "The learner understands the importance of Physics and safe laboratory practice."),
    blocks: [
      { type: "competency", text: "The learner should be able to understand the importance of Physics and safe laboratory practice." },
      { type: "outcome", text: "Understand the meaning of Physics and its branches.", tag: "u" },
      { type: "outcome", text: "Appreciate the importance of studying Physics.", tag: "u" },
      { type: "context", heading: "Physics explains the world", content: "Physics is the study of matter, energy, and their interactions. It explains why a ball falls, how electricity powers your phone, and how sound travels. Every technology, from a bicycle to a satellite, is built on physics." },
      { type: "key_point", title: "Branches of Physics", content: "Mechanics (motion, forces), Heat/Thermodynamics, Light/Optics, Sound/Acoustics, Electricity and Magnetism, Nuclear Physics, Astrophysics." },
      { type: "question", question: "Physics is the study of?", options: ["Living things", "Matter and energy", "Chemicals", "Numbers"], correctIndex: 1, explanation: "Matter, energy, and interactions." },
      { type: "question", question: "Which branch deals with motion and forces?", options: ["Optics", "Mechanics", "Acoustics", "Nuclear"], correctIndex: 1, explanation: "Mechanics." },
      { type: "question", question: "Which is NOT a branch of Physics?", options: ["Mechanics", "Botany", "Optics", "Thermodynamics"], correctIndex: 1, explanation: "Botany is Biology." },
      { type: "activity_of_integration", title: "Physics in your day", scenario: "From the moment you wake up, physics is at work.", task: "List five examples of physics in daily life with their branch.", hint: "Cooking, transport, light, sound, electricity.", answer: "1. Boiling water: thermodynamics. 2. Boda boda: mechanics. 3. Light switch: electricity. 4. Hearing bells: acoustics. 5. Phone signals: electromagnetism." },
    ],
  },

  // ===== TOPIC 2: MEASUREMENTS =====
  {
    id: "s1-phys-measurements",
    topicId: "phys-measurements",
    subjectId: "physics",
    title: "Measurements in Physics",
    order: 2, estimatedMinutes: 18, passingScore: 70, isActive: true,
    curriculum: S1("Term 1", "Mechanics and Properties of Matter", 2, "Measurements in Physics", "The learner estimates and measures physical quantities in correct SI units."),
    blocks: [
      { type: "competency", text: "The learner should be able to estimate and measure length, area, volume, mass, density, and time and express them in correct SI units." },
      { type: "outcome", text: "Identify physical quantities and their SI units.", tag: "k,u" },
      { type: "outcome", text: "Calculate density.", tag: "u,s" },
      { type: "context", heading: "Measurement is the foundation of science", content: "Every experiment, every engineering project, every medical diagnosis depends on accurate measurement. A carpenter measures wood. A nurse measures temperature. Without measurement, there is no science." },
      { type: "key_point", title: "SI units", content: "Length: metre (m). Mass: kilogram (kg). Time: second (s). Temperature: Kelvin (K). Current: ampere (A). Area: m2. Volume: m3 or litre. Density: kg/m3. Force: Newton (N)." },
      { type: "worked_example", problem: "A block measures 10cm x 5cm x 3cm, mass 120g. Find volume and density.", steps: ["Volume = 10 x 5 x 3 = 150 cm3.", "Density = mass/volume = 120/150 = 0.8 g/cm3."], answer: "Volume 150 cm3, Density 0.8 g/cm3", reasoning: "0.8 is less than water (1.0), so this block would float." },
      { type: "key_point", title: "Float or sink", content: "An object floats if its density is less than the liquid. Water = 1.0 g/cm3. Ice (0.92) floats. Iron (7.8) sinks. Ships float because they contain air, lowering their average density." },
      { type: "exam_style", scenario: "A stone has mass 500g, volume 200cm3.", question: "Calculate density. Will it float or sink in water? Give a reason.", marks: 4 },
      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correct formula: density = mass/volume", marks: 1, type: "method" },
        { criterion: "Substitution: 500/200", marks: 1, type: "method" },
        { criterion: "Answer: 2.5 g/cm3", marks: 1, type: "accuracy" },
        { criterion: "Sinks because 2.5 > 1.0", marks: 1, type: "communication" },
      ] },
      { type: "question", question: "SI unit of mass?", options: ["Gram", "Kilogram", "Newton", "Litre"], correctIndex: 1, explanation: "Kilogram (kg)." },
      { type: "question", question: "SI unit of length?", options: ["Centimetre", "Metre", "Kilometre", "Foot"], correctIndex: 1, explanation: "Metre (m)." },
      { type: "question", question: "Density: mass 240g, volume 80cm3?", options: ["2", "3", "4", "0.33"], correctIndex: 1, explanation: "240/80 = 3 g/cm3." },
      { type: "question", question: "Object density 0.8 in water (1.0). It will?", options: ["Sink", "Float", "Dissolve", "Float middle"], correctIndex: 1, explanation: "0.8 < 1.0 so floats." },
      { type: "activity_of_integration", title: "Why do ships float?", scenario: "A steel bolt sinks. A ship made of steel floats.", task: "Explain using density.", hint: "What is inside the ship?", answer: "A ship is mostly hollow (air). Average density of steel + air < 1.0 g/cm3. If it fills with water, density increases above 1.0 and it sinks." },
    ],
  },

  // ===== TOPIC 3: EFFECTS OF FORCES =====
  {
    id: "s1-phys-forces",
    topicId: "phys-forces",
    subjectId: "physics",
    title: "Effects of forces",
    order: 3, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1("Term 2", "Mechanics and Properties of Matter", 3, "Effects of Forces", "The learner understands forces and their effects on objects."),
    blocks: [
      { type: "competency", text: "The learner should be able to explain the effects of forces on objects and distinguish between different types of forces." },
      { type: "outcome", text: "Define force and state its SI unit.", tag: "k" },
      { type: "outcome", text: "Describe the effects of forces on objects.", tag: "u" },
      { type: "outcome", text: "Distinguish between mass and weight.", tag: "u" },
      { type: "context", heading: "Forces are everywhere", content: "When you push a door, kick a ball, or feel the wind, you are experiencing forces. Gravity is a force that keeps you on the ground. Friction is a force that helps you walk. Understanding forces explains how everything moves." },
      { type: "key_point", title: "What is a force?", content: "A force is a push or a pull. The SI unit is the Newton (N). Forces can: change the shape of an object, change its speed (start, stop, speed up, slow down), or change its direction. A force has both magnitude (size) and direction." },
      { type: "key_point", title: "Types of forces", content: "GRAVITY/WEIGHT: pulls objects toward Earth. FRICTION: opposes motion when surfaces rub. TENSION: pulling force in a rope or string. NORMAL FORCE: support force from a surface. MAGNETIC: attraction/repulsion between magnets. ELECTROSTATIC: force between electric charges." },
      { type: "key_point", title: "Mass vs Weight", content: "MASS: the amount of matter in an object. Measured in kilograms (kg). Same everywhere in the universe. WEIGHT: the force of gravity on an object. Measured in Newtons (N). Changes depending on gravity (you weigh less on the Moon). Formula: Weight = mass x gravity (W = mg). On Earth, g = 10 N/kg." },
      { type: "worked_example", problem: "A student has a mass of 50 kg. Calculate their weight on Earth.", steps: ["Weight = mass x gravity.", "W = 50 x 10 (gravity on Earth = 10 N/kg).", "W = 500 N."], answer: "500 Newtons", reasoning: "Mass is constant (50 kg anywhere). Weight depends on gravity. On the Moon (g = 1.6 N/kg), the same student would weigh only 80 N. This is why astronauts can jump high on the Moon." },
      { type: "exam_style", scenario: "UNEB frequently tests the difference between mass and weight.", question: "Distinguish between mass and weight. A box has mass 20 kg. Calculate its weight on Earth (g = 10 N/kg).", marks: 4 },
      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Mass: amount of matter, in kg, constant", marks: 1, type: "method" },
        { criterion: "Weight: force of gravity, in Newtons, varies", marks: 1, type: "method" },
        { criterion: "Formula: W = mg", marks: 1, type: "method" },
        { criterion: "Answer: 20 x 10 = 200 N", marks: 1, type: "accuracy" },
      ] },
      { type: "question", question: "The SI unit of force is?", options: ["Kilogram", "Newton", "Joule", "Watt"], correctIndex: 1, explanation: "Force is measured in Newtons (N)." },
      { type: "question", question: "Mass is measured in?", options: ["Newtons", "Kilograms", "Metres", "Seconds"], correctIndex: 1, explanation: "Mass is in kilograms (kg)." },
      { type: "question", question: "Calculate weight: mass 30 kg, g = 10 N/kg.", options: ["3 N", "30 N", "300 N", "3000 N"], correctIndex: 2, explanation: "W = 30 x 10 = 300 N." },
      { type: "question", question: "Which is a contact force?", options: ["Magnetic force", "Gravity", "Friction", "Electrostatic"], correctIndex: 2, explanation: "Friction requires surfaces to touch. Magnetic and electrostatic act at a distance." },
      { type: "question", question: "Friction always opposes...?", options: ["Gravity", "Motion", "Weight", "Mass"], correctIndex: 1, explanation: "Friction acts in the opposite direction to motion." },
      { type: "activity_of_integration", title: "Why friction matters", scenario: "When roads are wet after rain in Kampala, accidents increase. Friction is reduced.", task: "Explain why wet roads are dangerous using the concept of friction. Suggest two ways drivers can stay safe.", hint: "Think about tyres and braking distance.", answer: "Water reduces friction between tyres and the road. This means: 1. Braking takes longer (car slides). 2. Turning is harder (less grip). Safety tips: drive slower, use tyres with good tread (channels water away), keep more distance from other vehicles. This is real physics applied to daily safety." },
    ],
  },

  // ===== TOPIC 4: LIGHT AND REFLECTION =====
  {
    id: "s1-phys-light-reflection",
    topicId: "phys-light-reflection",
    subjectId: "physics",
    title: "Light and reflection",
    order: 4, estimatedMinutes: 16, passingScore: 70, isActive: true,
    curriculum: S1("Term 3", "Light", 4, "Nature of Light and Reflection", "The learner understands the nature of light and the laws of reflection."),
    blocks: [
      { type: "competency", text: "The learner should be able to explain the nature of light and apply the laws of reflection at plane surfaces." },
      { type: "outcome", text: "Describe the nature of light.", tag: "k,u" },
      { type: "outcome", text: "State and apply the laws of reflection.", tag: "u,s" },
      { type: "outcome", text: "Draw ray diagrams showing reflection.", tag: "u,s" },
      { type: "context", heading: "Light makes vision possible", content: "Without light, we cannot see. Light travels incredibly fast (300,000 km per second). When light hits a mirror, it bounces back. This is reflection. Understanding reflection explains how mirrors, periscopes, and even how we see objects work." },
      { type: "key_point", title: "The nature of light", content: "Light is a form of energy. It travels in straight lines (called rays). It can be reflected (bounced off surfaces), refracted (bent when passing through different materials), absorbed, or transmitted. Light can travel through a vacuum (space), unlike sound." },
      { type: "key_point", title: "The laws of reflection", content: "Law 1: The angle of incidence equals the angle of reflection (i = r). Law 2: The incident ray, reflected ray, and normal all lie in the same plane. The NORMAL is an imaginary line perpendicular (90 degrees) to the mirror surface at the point where the ray hits." },
      { type: "worked_example", problem: "A light ray hits a mirror at an angle of 35 degrees to the normal. What is the angle of reflection?", steps: ["By the first law of reflection: angle of incidence = angle of reflection.", "Angle of incidence = 35 degrees.", "Therefore angle of reflection = 35 degrees."], answer: "35 degrees", reasoning: "The angles are always measured from the NORMAL (not from the mirror surface). The law i = r is one of the most fundamental rules in optics. It applies to all reflective surfaces, from bathroom mirrors to the reflectors on a bicycle." },
      { type: "key_point", title: "Regular vs Diffuse reflection", content: "REGULAR reflection: occurs on smooth, shiny surfaces (mirrors). Light rays reflect in the same direction, forming a clear image. DIFFUSE reflection: occurs on rough surfaces (paper, walls). Light scatters in all directions. This is why you can see a wall from any angle but a mirror only reflects in one direction." },
      { type: "exam_style", scenario: "A ray of light strikes a plane mirror at an angle of incidence of 40 degrees.", question: "Draw a ray diagram showing the incident ray, normal, reflected ray, and state the angle of reflection.", marks: 4 },
      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correctly draws normal at 90 degrees to mirror surface", marks: 1, type: "method" },
        { criterion: "Incident ray at 40 degrees from normal", marks: 1, type: "method" },
        { criterion: "Reflected ray at 40 degrees from normal (other side)", marks: 1, type: "accuracy" },
        { criterion: "Labels: incident ray, reflected ray, normal, angles i and r", marks: 1, type: "communication" },
      ] },
      { type: "question", question: "Light travels in...?", options: ["Curves", "Straight lines", "Circles", "Random paths"], correctIndex: 1, explanation: "Light travels in straight lines (rays)." },
      { type: "question", question: "The angle of incidence equals the...?", options: ["Angle of the mirror", "Angle of reflection", "Angle of refraction", "Angle of the normal"], correctIndex: 1, explanation: "Law of reflection: i = r." },
      { type: "question", question: "The normal is drawn at ___ to the mirror surface.", options: ["45 degrees", "60 degrees", "90 degrees", "180 degrees"], correctIndex: 2, explanation: "The normal is perpendicular (90 degrees) to the surface." },
      { type: "question", question: "If angle of incidence is 30 degrees, angle of reflection is?", options: ["15", "30", "60", "90"], correctIndex: 1, explanation: "By the law of reflection, i = r = 30 degrees." },
      { type: "question", question: "Diffuse reflection occurs on?", options: ["Mirrors", "Smooth surfaces", "Rough surfaces", "Water"], correctIndex: 2, explanation: "Rough surfaces scatter light in all directions (diffuse reflection)." },
      { type: "activity_of_integration", title: "How a periscope works", scenario: "A periscope uses two mirrors to let you see over obstacles. Soldiers and submarine crews use them.", task: "Using the laws of reflection, explain how a periscope allows you to see an object that is not in your direct line of sight.", hint: "Think about two mirrors placed at 45 degrees.", answer: "A periscope has two parallel mirrors, each angled at 45 degrees. Light from the object hits the top mirror at 45 degrees, reflects downward at 45 degrees (by the law i = r). It then hits the bottom mirror at 45 degrees and reflects toward your eye at 45 degrees. The two reflections redirect the light path, allowing you to see objects above or around obstacles. This is reflection applied to real technology." },
    ],
  },
];
