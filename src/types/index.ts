import type { Timestamp } from "firebase/firestore";

export type UserRole = "student" | "parent" | "admin";

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Timestamp;
}

export interface StudentProfile {
  userId: string;
  parentIds: string[];
  level: "S1" | "S2" | "S3" | "S4";
  school?: string;
  enrolledSubjects: string[];
  studyCode: string;
  subscriptionStatus: "trial" | "active" | "expired";
  trialStartDate: Timestamp;
  subscriptionExpiry: Timestamp | null;
  diagnosticCompleted: boolean;
  diagnosticScores: Record<string, number>;
  predictedGrades: Record<string, string>;
  lessonsCompleted?: number;
  totalStudySeconds?: number;
  guaranteeProgress?: number;
  lastActiveAt?: Timestamp | null;
  totalXP?: number;
  questionsAnswered?: number;
  practiceStreak?: number;
  lastPracticeDate?: string;
}

export interface ParentProfile {
  userId: string;
  studentIds: string[];
  phone?: string;
}

export interface Subject {
  id: string;
  name: string;
  level: string;
  description: string;
  accentColor: "terracotta" | "sage" | "blue";
  totalTopics: number;
  isActive: boolean;
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
  totalLessons: number;
  isActive: boolean;
}

/**
 * Enhanced lesson blocks for competency-based teaching.
 *
 * Each block type serves a specific pedagogical purpose:
 * - competency: the NCDC competency statement for the topic
 * - outcome: the specific learning outcome being covered
 * - context: real-world relevance (why this matters)
 * - text: explanatory content
 * - key_point: a critical takeaway
 * - worked_example: step-by-step solution WITH reasoning
 * - exam_style: how UNEB frames this type of question
 * - marking_guide: what earns marks (method vs accuracy)
 * - question: multiple choice practice
 * - activity_of_integration: a real NCDC-style contextual problem
 * - image: visual aid
 */
export type LessonBlock =
  | { type: "competency"; text: string }
  | { type: "outcome"; text: string; tag: string }
  | { type: "context"; heading: string; content: string }
  | { type: "text"; heading?: string; content: string }
  | { type: "key_point"; title: string; content: string }
  | { type: "worked_example"; problem: string; steps: string[]; answer: string; reasoning?: string }
  | { type: "exam_style"; scenario: string; question: string; marks: number }
  | { type: "marking_guide"; totalMarks: number; criteria: { criterion: string; marks: number; type: "method" | "accuracy" | "communication" }[] }
  | { type: "question"; question: string; options: string[]; correctIndex: number; explanation: string }
  | { type: "activity_of_integration"; title: string; scenario: string; task: string; hint: string; answer: string }
  | { type: "image"; url: string; caption: string };

export interface Lesson {
  id: string;
  topicId: string;
  subjectId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  passingScore: number;
  blocks: LessonBlock[];
  isActive: boolean;
  /** NCDC curriculum mapping */
  curriculum?: {
    subject: string;
    level: string;
    term: string;
    theme: string;
    topicNumber: number;
    topicName: string;
    competency: string;
  };
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  attempts: number;
  completedAt?: Timestamp;
}

export interface SubjectProgress {
  subjectId: string;
  predictedGrade: string;
  topicsStarted: number;
  topicsCompleted: number;
  totalStudySeconds: number;
  weeklyStudySeconds: number;
  guaranteeProgress: number;
}
