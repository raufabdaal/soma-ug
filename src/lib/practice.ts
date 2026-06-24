import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { User } from "firebase/auth";
import { xpForDifficulty, type Difficulty } from "@/lib/practice-bank";

/**
 * Practice tracking.
 *
 * Records every practice answer in Firestore, updates XP, streaks,
 * and per-topic accuracy. This data drives grade prediction.
 *
 * Structure:
 *   students/{uid}/practiceStats/{topicId} = { attempted, correct, xp, lastPracticed }
 *   students/{uid} = { totalXP, practiceStreak, lastPracticeDate }
 */

export interface TopicPracticeStats {
  attempted: number;
  correct: number;
  xp: number;
  lastPracticed: ReturnType<typeof serverTimestamp>;
}

/** Record a single practice answer. Updates all stats. */
export async function recordPracticeAnswer(
  user: User,
  topicId: string,
  correct: boolean,
  difficulty: Difficulty
) {
  const uid = user.uid;
  const statsRef = doc(db, "students", uid, "practiceStats", topicId);
  const xpEarned = xpForDifficulty(difficulty) * (correct ? 1 : 0.2); // partial XP for wrong answers

  // Update topic stats
  await setDoc(statsRef, {
    attempted: increment(1),
    correct: increment(correct ? 1 : 0),
    xp: increment(Math.round(xpEarned)),
    lastPracticed: serverTimestamp(),
  }, { merge: true });

  // Update student summary
  await updateDoc(doc(db, "students", uid), {
    totalXP: increment(Math.round(xpEarned)),
    questionsAnswered: increment(1),
    lastActiveAt: serverTimestamp(),
  });

  // Update streak
  await updatePracticeStreak(uid);
}

/** Check and update the daily practice streak. */
async function updatePracticeStreak(uid: string) {
  try {
    const studentRef = doc(db, "students", uid);
    const snap = await getDoc(studentRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    const lastPractice = data.lastPracticeDate;
    const currentStreak = data.practiceStreak || 0;

    if (lastPractice === todayStr) return; // already counted today

    // Check if yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastPractice === yesterdayStr) {
      // Continue streak
      await updateDoc(studentRef, {
        practiceStreak: currentStreak + 1,
        lastPracticeDate: todayStr,
      });
    } else {
      // Reset streak
      await updateDoc(studentRef, {
        practiceStreak: 1,
        lastPracticeDate: todayStr,
      });
    }
  } catch (err) {
    console.error("Failed to update streak:", err);
  }
}

/** Get practice stats for all topics. Returns accuracy per topic. */
export async function getPracticeStats(uid: string): Promise<Record<string, { attempted: number; correct: number; xp: number; accuracy: number }>> {
  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "students", uid, "practiceStats"));
    const result: Record<string, { attempted: number; correct: number; xp: number; accuracy: number }> = {};
    snap.forEach((doc) => {
      const data = doc.data();
      const attempted = data.attempted || 0;
      const correct = data.correct || 0;
      result[doc.id] = {
        attempted,
        correct,
        xp: data.xp || 0,
        accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      };
    });
    return result;
  } catch {
    return {};
  }
}

/**
 * Calculate overall grade prediction based on practice accuracy.
 * This replaces the old lesson-completion-based prediction.
 * Weighted by number of attempts (more data = more confidence).
 */
export function predictGradeFromPractice(
  stats: Record<string, { attempted: number; correct: number; accuracy: number }>
): { overall: number; grade: string; perSubject: Record<string, string> } {
  const topics = Object.entries(stats).filter(([, s]) => s.attempted > 0);

  if (topics.length === 0) {
    return { overall: 0, grade: "-", perSubject: {} };
  }

  // Weighted average: topics with more attempts have more weight
  let totalWeighted = 0;
  let totalWeight = 0;
  const perSubject: Record<string, string> = {};

  for (const [topicId, s] of topics) {
    const weight = Math.min(s.attempted, 20); // cap weight at 20 attempts
    totalWeighted += s.accuracy * weight;
    totalWeight += weight;

    const grade = s.accuracy >= 80 ? "A" : s.accuracy >= 70 ? "B" : s.accuracy >= 60 ? "C" : s.accuracy >= 50 ? "D" : s.accuracy >= 40 ? "E" : "F";
    perSubject[topicId] = grade;
  }

  const overall = totalWeight > 0 ? Math.round(totalWeighted / totalWeight) : 0;
  const overallGrade = overall >= 80 ? "A" : overall >= 70 ? "B" : overall >= 60 ? "C" : overall >= 50 ? "D" : overall >= 40 ? "E" : "F";

  return { overall, grade: overallGrade, perSubject };
}
