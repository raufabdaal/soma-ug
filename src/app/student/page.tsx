"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { sampleLessons, getLessonById } from "@/lib/lessons";
import type { StudentProfile } from "@/types";
import { formatStudyTime } from "@/lib/utils";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Record<string, { score: number; completed: boolean }>>({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const [studentSnap, progressSnap] = await Promise.all([
        getDoc(doc(db, "students", user.uid)),
        getDocs(collection(db, "students", user.uid, "lessonProgress")),
      ]);
      if (studentSnap.exists()) {
        setStudentData(studentSnap.data() as StudentProfile);
      }
      const progress: Record<string, { score: number; completed: boolean }> = {};
      progressSnap.forEach((doc) => {
        const data = doc.data();
        progress[doc.id] = { score: data.score || 0, completed: data.completed || false };
      });
      setCompletedLessons(progress);
    } catch (err) {
      console.error("Failed to fetch student data:", err);
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchData();
  }, [user, fetchData]);

  if (loading || dataLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
        <p style={{ color: "var(--ink-muted)" }}>Loading...</p>
      </div>
    );
  }

  const firstName = user?.displayName?.split(" ")[0] || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const predictedMaths = studentData?.predictedGrades?.["mathematics"] || "-";
  const lessonsCompleted = studentData?.lessonsCompleted || 0;
  const guaranteeProgress = studentData?.guaranteeProgress || 0;
  const totalStudySeconds = studentData?.totalStudySeconds || 0;
  const totalXP = studentData?.totalXP || 0;

  // Find the next lesson to continue (first uncompleted lesson)
  const nextLesson = sampleLessons.find((l) => !completedLessons[l.id]?.completed);
  const mathLessonsTotal = sampleLessons.filter((l) => l.subjectId === "mathematics").length;
  const mathLessonsDone = sampleLessons.filter((l) => l.subjectId === "mathematics" && completedLessons[l.id]?.completed).length;
  const mathProgress = mathLessonsTotal > 0 ? Math.round((mathLessonsDone / mathLessonsTotal) * 100) : 0;

  return (
    <div className="animate-fade">
      {/* Greeting */}
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 4 }}>
        {greeting}, {firstName}.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 32 }}>
        {studentData?.diagnosticCompleted
          ? "Here is where your grades stand right now."
          : "Take your diagnostic test to get your baseline grade."}
      </p>

      {!studentData?.diagnosticCompleted && (
        <Link href="/student/diagnostic" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, textDecoration: "none", borderLeft: "4px solid var(--terracotta)" }} className="card">
          <div>
            <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)" }}>First things first</div>
            <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, margin: "6px 0 4px" }}>
              Take the diagnostic test
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>5 questions to set your baseline. Takes 3 minutes.</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      )}

      {/* Stats grid */}
      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr", gap: 22 }}>
        {/* Left column: predicted grade + guarantee meter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div className="card">
            <div className="eyebrow" style={{ fontSize: 11 }}>Predicted - Mathematics</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14, margin: "14px 0 6px" }}>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 74, lineHeight: 0.85, color: "var(--terracotta)" }}>
                {predictedMaths}
              </span>
              <span style={{ color: "var(--sage-dk)", fontWeight: 600, fontSize: 14, paddingBottom: 6 }}>
                {studentData?.diagnosticCompleted ? "current level" : "not set"}
              </span>
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
              {studentData?.diagnosticCompleted
                ? "Keep practicing to push this grade higher."
                : "Complete the diagnostic to set your starting point."}
            </p>
          </div>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 26 }}>
                {guaranteeProgress}%
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>Target 80% - guarantee</span>
            </div>
            <div style={{ height: 10, background: "var(--cream-deep)", borderRadius: 999, position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(guaranteeProgress, 5)}%`,
                  background: "linear-gradient(90deg, var(--sage), var(--terracotta))",
                  borderRadius: 999,
                  transition: "width 0.6s ease",
                }}
              />
              <div style={{ position: "absolute", top: -6, left: "80%", width: 2, height: 22, background: "var(--charcoal)", borderRadius: 2 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: "11.5px", color: "var(--ink-muted)" }}>
              <span>Start</span>
              <span>80% target</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Right column: continue learning (now pulls real data) */}
        <div className="card grid-continue" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "0.85fr 1.15fr" }}>
          <div style={{ background: "var(--terracotta)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, position: "relative" }}>
            <span style={{ position: "absolute", top: 18, left: 22, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
              {nextLesson ? "Continue learning" : "All caught up"}
            </span>
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M42 18 C30 14 12 16 6 20 L6 64 C12 60 30 58 42 62 C54 58 72 60 78 64 L78 20 C72 16 54 14 42 18 Z" />
              <path d="M42 18 L42 62" /><path d="M16 30 L36 33 M16 40 L36 43 M48 33 L68 30" />
            </svg>
          </div>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {nextLesson ? (
              <>
                <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)" }}>Mathematics</div>
                <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, margin: "8px 0 6px" }}>
                  {nextLesson.title}
                </h3>
                <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
                  {nextLesson.estimatedMinutes} min - {nextLesson.blocks.filter(b => b.type === "question").length} practice questions
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
                  <div style={{ flex: 1, height: 6, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${mathProgress}%`, background: "var(--charcoal)" }} />
                  </div>
                  <span style={{ fontSize: 13, color: "var(--ink-muted)", fontWeight: 600 }}>{mathLessonsDone} of {mathLessonsTotal} done</span>
                </div>
                <Link href={`/student/learn/${nextLesson.id}`} className="btn btn-primary" style={{ marginTop: 20, alignSelf: "flex-start" }}>
                  {mathLessonsDone > 0 ? "Continue" : "Start lesson"}
                </Link>
              </>
            ) : (
              <>
                <div className="eyebrow" style={{ fontSize: 11, color: "var(--sage-dk)" }}>Complete</div>
                <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, margin: "8px 0 6px" }}>
                  You have finished all S1 Mathematics lessons.
                </h3>
                <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
                  Head to Practice mode to keep sharpening your skills.
                </p>
                <Link href="/student/practice" className="btn btn-primary" style={{ marginTop: 20, alignSelf: "flex-start" }}>
                  Go to practice
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subjects - real progress based on completed lessons */}
      <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, margin: "48px 0 20px" }}>
        Your subjects
      </h2>
      <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        <SubjectTile name="Mathematics" topics={`${mathLessonsTotal} lessons`} color="var(--terracotta)" progress={mathProgress} href="/student/learn" />
        <SubjectTile name="Biology" topics="Coming soon" color="var(--sage-dk)" progress={0} href="/student/learn" />
        <SubjectTile name="Chemistry" topics="Coming soon" color="var(--blue-dk)" progress={0} href="/student/learn" />
      </div>

      {/* Quick stats row - all real data */}
      <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 32 }}>
        <QuickStat icon="time" value={formatStudyTime(totalStudySeconds)} label="Study time" color="var(--sage-dk)" />
        <QuickStat icon="trophy" value={String(lessonsCompleted)} label="Lessons done" color="var(--terracotta)" />
        <QuickStat icon="bolt" value={String(totalXP)} label="Total XP" color="var(--blue-dk)" />
      </div>
    </div>
  );
}

function QuickStat({ icon, value, label, color }: { icon: string; value: string; label: string; color: string }) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "20px 12px" }}>
      <div style={{ marginBottom: 8, color }}>
        {icon === "time" && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
        )}
        {icon === "trophy" && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
        )}
        {icon === "bolt" && (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        )}
      </div>
      <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{label}</div>
    </div>
  );
}

function SubjectTile({ name, topics, color, progress, href }: { name: string; topics: string; color: string; progress: number; href: string }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className="card" style={{ position: "relative", overflow: "hidden", transition: "transform 0.2s ease, box-shadow 0.25s ease" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 48, background: color, borderRadius: "0 0 3px 0" }} />
        <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--charcoal)", marginBottom: 4 }}>
          {name}
        </h3>
        <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 14 }}>{topics}</p>
        <div style={{ height: 5, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: color, transition: "width 0.5s ease" }} />
        </div>
      </div>
    </Link>
  );
}
