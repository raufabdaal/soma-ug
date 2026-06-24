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
    order: 1,
    estimatedMinutes: 14,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Introduction", 1, "Introduction to Physics",
      "The learner understands the importance of Physics and safe laboratory practice."),
    blocks: [
      { type: "competency", text: "The learner should be able to understand the importance of Physics and safe laboratory practice." },
      { type: "outcome", text: "Understand the meaning of Physics and its branches.", tag: "u" },
      { type: "outcome", text: "Appreciate the importance of studying Physics.", tag: "u,v/a" },
      { type: "outcome", text: "Understand laboratory rules and safety.", tag: "u,v/a" },

      { type: "context", heading: "Physics explains the world", content: "Physics is the study of matter, energy, and how they interact. It explains why a ball falls, how electricity powers your phone, how sound travels, and why the sky is blue. Every technology you use, from a bicycle to a satellite, is built on physics principles. In Uganda, physics is behind hydroelectric power (Owen Falls Dam), mobile networks, and solar panels." },

      { type: "key_point", title: "Branches of Physics", content: "Mechanics (motion and forces), Heat/Thermodynamics (energy transfer), Light/Optics (how light behaves), Sound/Acoustics (waves), Electricity and Magnetism, Nuclear Physics (atoms and radiation), and Astrophysics (stars and space). These branches overlap and together explain the physical universe." },

      { type: "key_point", title: "Why study Physics?", content: "Physics develops problem-solving and logical thinking skills. It opens careers in engineering, medicine (radiology), technology, aviation, architecture, and energy. Understanding physics helps you make informed decisions about technology, safety, and the environment. Uganda needs physicists and engineers for infrastructure development." },

      { type: "question", question: "Physics is the study of...?", options: ["Living things", "Matter and energy", "Chemicals", "Numbers"], correctIndex: 1, explanation: "Physics studies matter, energy, and their interactions." },
      { type: "question", question: "Which branch of Physics deals with motion and forces?", options: ["Optics", "Mechanics", "Acoustics", "Nuclear"], correctIndex: 1, explanation: "Mechanics is the study of motion, forces, and the properties of matter." },
      { type: "question", question: "Which is NOT a branch of Physics?", options: ["Mechanics", "Botany", "Optics", "Thermodynamics"], correctIndex: 1, explanation: "Botany is the study of plants (a branch of Biology). The others are all branches of Physics." },
      { type: "question", question: "Which technology relies on thermodynamics (heat)?", options: ["Solar panels", "Bicycles", "Telescopes", "Radios"], correctIndex: 0, explanation: "Solar panels convert heat and light energy into electricity. This involves thermodynamics." },

      { type: "activity_of_integration", title: "Physics in your day", scenario: "From the moment you wake up, physics is at work around you.", task: "List five examples of physics in your daily life. State which branch each relates to.", hint: "Think about cooking, transport, light, sound, electricity.", answer: "1. Boiling water for tea: heat/thermodynamics (energy transfer). 2. Riding a boda boda: mechanics (motion, forces). 3. Switching on a light: electricity (current, circuits). 4. Hearing the adhan or church bells: acoustics (sound waves). 5. Seeing your reflection: optics (light reflection). 6. Using a phone: electromagnetism (signals, circuits). Physics is not abstract. It is happening every moment of every day." },
    ],
  },

  // ===== TOPIC 2: MEASUREMENTS IN PHYSICS =====
  {
    id: "s1-phys-measurements",
    topicId: "phys-measurements",
    subjectId: "physics",
    title: "Measurements in Physics",
    order: 2,
    estimatedMinutes: 18,
    passingScore: 70,
    isActive: true,
    curriculum: S1("Term 1", "Mechanics and Properties of Matter", 2, "Measurements in Physics",
      "The learner should be able to estimate and measure physical quantities and express them in correct SI units."),
    blocks: [
      { type: "competency", text: "The learner should be able to estimate and measure length, area, volume, mass, density, and time and express them in correct SI units." },
      { type: "outcome", text: "Identify physical quantities and their SI units.", tag: "k,u" },
      { type: "outcome", text: "Measure length, mass, volume, and time accurately.", tag: "k,s" },
      { type: "outcome", text: "Calculate density and understand its significance.", tag: "u,s" },

      { type: "context", heading: "Measurement is the foundation of science", content: "Every scientific experiment, every engineering project, and every medical diagnosis depends on accurate measurement. A carpenter measures wood. A nurse measures temperature. A pilot measures altitude. In physics, we measure length, mass, time, temperature, and many other quantities. Without measurement, there is no science." },

      { type: "key_point", title: "The SI units you must know", content: "Length: metre (m). Mass: kilogram (kg). Time: second (s). Temperature: Kelvin (K) or degrees Celsius. Electric current: ampere (A). Area: square metre (m2). Volume: cubic metre (m3) or litre (L). Density: kilogram per cubic metre (kg/m3). Force: Newton (N). These are the standard units used by scientists worldwide." },

      { type: "worked_example", problem: "A wooden block measures 10 cm long, 5 cm wide, and 3 cm high. Calculate its volume and density if its mass is 120 g.", steps: ["Volume = length x width x height.", "Volume = 10 cm x 5 cm x 3 cm = 150 cm3.", "Density = mass / volume.", "Density = 120 g / 150 cm3 = 0.8 g/cm3."], answer: "Volume = 150 cm3, Density = 0.8 g/cm3", reasoning: "Volume is the space an object occupies. For a rectangular block, it is length times width times height. Density tells you how tightly packed the matter is. This block has a density of 0.8 g/cm3, which is less than water (1.0 g/cm3), so it would float." },

      { type: "key_point", title: "The density test: float or sink?", content: "An object floats if its density is less than the liquid it is in. It sinks if its density is greater. Water has a density of 1.0 g/cm3 (or 1000 kg/m3). Ice (0.92 g/cm3) floats. Iron (7.8 g/cm3) sinks. Wood varies but most types float. This principle explains why ships made of steel can float (they contain air-filled spaces that lower their average density)." },

      { type: "exam_style", scenario: "UNEB frequently tests unit conversion and density calculations.", question: "A stone has a mass of 500 g and a volume of 200 cm3. Calculate its density in g/cm3. Will it float or sink in water? Give a reason.", marks: 4 },

      { type: "marking_guide", totalMarks: 4, criteria: [
        { criterion: "Correct formula: density = mass / volume", marks: 1, type: "method" },
        { criterion: "Correct substitution: 500 / 200", marks: 1, type: "method" },
        { criterion: "Correct density: 2.5 g/cm3", marks: 1, type: "accuracy" },
        { criterion: "Correct conclusion: it sinks because 2.5 > 1.0 (density of water)", marks: 1, type: "communication" },
      ] },

      { type: "question", question: "What is the SI unit of mass?", options: ["Gram", "Kilogram", "Newton", "Litre"], correctIndex: 1, explanation: "The kilogram (kg) is the SI unit of mass. The gram is a smaller unit (1000 g = 1 kg)." },
      { type: "question", question: "What is the SI unit of length?", options: ["Centimetre", "Kilometre", "Metre", "Millimetre"], correctIndex: 2, explanation: "The metre (m) is the SI unit of length. Others are multiples or fractions of a metre." },
      { type: "question", question: "Calculate the density of an object with mass 240 g and volume 80 cm3.", options: ["2 g/cm3", "3 g/cm3", "4 g/cm3", "0.33 g/cm3"], correctIndex: 1, explanation: "Density = mass / volume = 240 / 80 = 3 g/cm3." },
      { type: "question", question: "An object with density 0.8 g/cm3 is placed in water (density 1.0 g/cm3). It will...?", options: ["Sink", "Float", "Dissolve", "Float at the middle"], correctIndex: 1, explanation: "0.8 is less than 1.0, so the object is less dense than water. It will float." },
      { type: "question", question: "Calculate the volume of a box measuring 4 m x 3 m x 2 m.", options: ["9 m3", "12 m3", "24 m3", "6 m3"], correctIndex: 2, explanation: "Volume = length x width x height = 4 x 3 x 2 = 24 m3." },

      { type: "activity_of_integration", title: "Why do ships float?", scenario: "A steel bolt sinks in water. But a ship made of thousands of tonnes of steel floats. How is this possible?", task: "Explain using the concept of density why a steel ship can float while a steel bolt sinks.", hint: "Think about what is inside the ship besides steel.", answer: "Steel has a density of about 7.8 g/cm3, much higher than water (1.0 g/cm3), so a solid piece sinks. But a ship is not solid steel. It is mostly hollow, filled with air. Air has a very low density. The overall (average) density of the ship - steel plus the air inside - is less than 1.0 g/cm3. This is why it floats. If the ship gets a hole and fills with water, the average density increases above 1.0 and it sinks. This is the principle of buoyancy, first described by Archimedes." },
    ],
  },
];
