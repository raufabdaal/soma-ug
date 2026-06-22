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

export type LessonBlock =
  | { type: "text"; heading?: string; content: string }
  | { type: "key_point"; title: string; content: string }
  | { type: "worked_example"; problem: string; steps: string[]; answer: string }
  | { type: "question"; question: string; options: string[]; correctIndex: number; explanation: string }
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
