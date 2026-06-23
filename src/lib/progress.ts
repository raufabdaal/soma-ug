import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { User } from "firebase/auth";

/**
 * Progress tracking.
 *
 * When a student completes a lesson, we save their score to Firestore.
 * This makes the data real: parent dashboards and reports read from this.
 *
 * Structure:
 *   students/{uid}/lessonProgress/{lessonId} = { score, completed, completedAt, attempts }
 *   students/{uid} = { ...predictedGrades, lessonsCompleted count }
 */

export interface LessonProgressRecord {
  lessonId: string;
  subjectId: string;
  score: number;
  completed: boolean;
  attempts: number;
  completedAt: ReturnType<typeof serverTimestamp>;
}

/** Record a lesson completion. Updates the progress doc and the student summary. */
export async function recordLessonCompletion(
  user: User,
  lessonId: string,
  subjectId: string,
  score: number
) {
  const uid = user.uid;
  const progressRef = doc(db, "students", uid, "lessonProgress", lessonId);

  // Check existing
  const existing = await getDoc(progressRef);
  const prevAttempts = existing.exists() ? (existing.data().attempts || 0) : 0;

  await setDoc(progressRef, {
    lessonId,
    subjectId,
    score,
    completed: true,
    attempts: prevAttempts + 1,
    completedAt: serverTimestamp(),
  }, { merge: true });

  // Update student summary (only count as new completion if not previously completed)
  const wasCompleted = existing.exists() && existing.data().completed;

  if (!wasCompleted) {
    await updateDoc(doc(db, "students", uid), {
      lessonsCompleted: increment(1),
      lastActiveAt: serverTimestamp(),
    });

    // Update predicted grade for this subject based on average score
    await updatePredictedGrade(uid, subjectId);
  }
}

/** Calculate average score across completed lessons for a subject and set predicted grade. */
async function updatePredictedGrade(uid: string, subjectId: string) {
  try {
    const { collection, getDocs, query, where } = await import("firebase/firestore");
    const q = query(
      collection(db, "students", uid, "lessonProgress"),
      where("subjectId", "==", subjectId),
      where("completed", "==", true)
    );
    const snap = await getDocs(q);

    if (snap.empty) return;

    const scores = snap.docs.map((d) => d.data().score as number);
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    const grade = avg >= 80 ? "A" : avg >= 70 ? "B" : avg >= 60 ? "C" : avg >= 50 ? "D" : avg >= 40 ? "E" : "F";

    await updateDoc(doc(db, "students", uid), {
      [`predictedGrades.${subjectId}`]: grade,
      [`diagnosticScores.${subjectId}`]: avg,
      [`guaranteeProgress`]: avg,
    });
  } catch (err) {
    console.error("Failed to update predicted grade:", err);
  }
}

/** Get all completed lessons for a student. */
export async function getCompletedLessons(uid: string): Promise<Record<string, { score: number; completed: boolean }>> {
  try {
    const { collection, getDocs } = await import("firebase/firestore");
    const snap = await getDocs(collection(db, "students", uid, "lessonProgress"));
    const result: Record<string, { score: number; completed: boolean }> = {};
    snap.forEach((doc) => {
      const data = doc.data();
      result[doc.id] = { score: data.score || 0, completed: data.completed || false };
    });
    return result;
  } catch {
    return {};
  }
}

/** Record diagnostic test results. Sets the baseline grade. */
export async function recordDiagnostic(
  uid: string,
  results: Record<string, number>
) {
  const grades: Record<string, string> = {};
  for (const [subject, score] of Object.entries(results)) {
    grades[subject] = score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : score >= 40 ? "E" : "F";
  }

  // Calculate overall progress
  const scores = Object.values(results);
  const overall = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  await updateDoc(doc(db, "students", uid), {
    diagnosticCompleted: true,
    diagnosticScores: results,
    predictedGrades: grades,
    guaranteeProgress: overall,
    lastActiveAt: serverTimestamp(),
  });
}
