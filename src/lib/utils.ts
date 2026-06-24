import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes intelligently. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a short, human-friendly study code for linking parents to students.
 * Format: 6 uppercase alphanumeric characters (e.g. "K7M2QP").
 * Collision risk is negligible for our scale.
 */
export function generateStudyCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no confusing chars (0/O, 1/I)
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

/** Format seconds into a readable study-time string like "3h 20m". */
export function formatStudyTime(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds === 0) return "0m";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Convert a percentage to a UNEB-style letter grade.
 * Based on standard Ugandan O-level grade boundaries.
 */
export function percentageToGrade(pct: number): string {
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  if (pct >= 40) return "E";
  return "F";
}
