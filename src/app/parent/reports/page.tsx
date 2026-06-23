"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ParentProfile, StudentProfile } from "@/types";
import { formatStudyTime } from "@/lib/utils";

interface SubjectGrade {
  name: string;
  grade: string;
  score: number;
  color: string;
}

export default function ParentReportsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchStudents() {
      if (!user) return;
      try {
        const parentSnap = await getDoc(doc(db, "parents", user.uid));
        if (parentSnap.exists()) {
          const parentData = parentSnap.data() as ParentProfile;
          if (parentData.studentIds?.length > 0) {
            const snaps = await Promise.all(
              parentData.studentIds.map((id) => getDoc(doc(db, "students", id)))
            );
            const valid = snaps.filter((s) => s.exists()).map((s) => s.data() as StudentProfile);
            setStudents(valid);
          }
        }
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user) fetchStudents();
  }, [user]);

  if (loading || dataLoading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="animate-fade" style={{ textAlign: "center", paddingTop: 60, maxWidth: 400, margin: "0 auto" }}>
        <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "var(--cream-deep)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
          </svg>
        </div>
        <h1 className="font-serif-display" style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>No reports yet.</h1>
        <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 24 }}>
          Link your child&apos;s account first to see their weekly reports.
        </p>
      </div>
    );
  }

  // Pull real data from the student document
  const student = students[selectedStudent];
  const studyTime = formatStudyTime(student?.totalStudySeconds || 0);
  const lessonsDone = student?.lessonsCompleted || 0;
  const dayStreak = student?.practiceStreak || 0;
  const guaranteeProgress = student?.guaranteeProgress || 0;
  const level = student?.level || "S1";

  // Build subject grades from real diagnostic/practice scores
  const subjectGrades: SubjectGrade[] = [];
  const scores = student?.diagnosticScores || {};
  const grades = student?.predictedGrades || {};

  if (scores["mathematics"] !== undefined) {
    subjectGrades.push({ name: "Mathematics", grade: grades["mathematics"] || "-", score: scores["mathematics"], color: "var(--terracotta)" });
  }
  if (scores["biology"] !== undefined) {
    subjectGrades.push({ name: "Biology", grade: grades["biology"] || "-", score: scores["biology"], color: "var(--sage-dk)" });
  }
  if (scores["chemistry"] !== undefined) {
    subjectGrades.push({ name: "Chemistry", grade: grades["chemistry"] || "-", score: scores["chemistry"], color: "var(--blue-dk)" });
  }

  // Find weakest subject for "needs attention" (only if any data exists)
  const weakestSubject = subjectGrades.length > 0
    ? subjectGrades.reduce((min, curr) => curr.score < min.score ? curr : min)
    : null;

  // Calculate current date range
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const formatDate = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
  const weekRange = `Week of ${formatDate(weekStart)}`;

  return (
    <div className="animate-fade">
      {/* Header with student switcher */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
        <div>
          <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 4 }}>
            Weekly report.
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>{weekRange}</p>
        </div>

        {students.length > 1 && (
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(Number(e.target.value))}
            style={{
              padding: "10px 16px",
              borderRadius: "var(--r-md)",
              border: "1.5px solid var(--hairline)",
              background: "var(--white)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--charcoal)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {students.map((s, i) => (
              <option key={i} value={i}>Student {i + 1}</option>
            ))}
          </select>
        )}
      </div>

      {/* Report Card */}
      <div className="report-card card" id="report-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Header strip */}
        <div style={{ background: "var(--cream-deep)", padding: "28px 32px", borderBottom: "1px solid var(--hairline)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" stroke="var(--terracotta)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
                <path d="M20 11 L20 29" />
              </svg>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 20 }}>Soma</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>Weekly Progress Report</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="eyebrow" style={{ fontSize: 11 }}>{weekRange}</div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>{level} - Lower Secondary</p>
          </div>
        </div>

        {/* Study summary - all real data */}
        <div style={{ padding: "32px" }}>
          <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
            <ReportStat big={studyTime} label="Study time" sub={studyTime === "0m" ? "Not started yet" : "Total time on Soma"} />
            <ReportStat big={String(lessonsDone)} label="Lessons done" sub={lessonsDone === 0 ? "No lessons yet" : "Lessons completed"} />
            <ReportStat big={String(dayStreak)} label="Day streak" sub={dayStreak === 0 ? "Practice today to start" : "Days of practice"} />
          </div>

          {/* Subject grades - real data */}
          <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>Predicted grades</div>
          {subjectGrades.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {subjectGrades.map((s) => (
                <SubjectGradeRow key={s.name} name={s.name} grade={s.grade} color={s.color} score={s.score} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "20px", background: "var(--cream-deep)", borderRadius: "var(--r-sm)", marginBottom: 32, textAlign: "center" }}>
              <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>No grades yet. Ask your child to take the diagnostic test.</p>
            </div>
          )}

          {/* Guarantee status - real data */}
          <div style={{
            background: guaranteeProgress >= 50 ? "rgba(126,142,99,0.12)" : "var(--cream-deep)",
            borderRadius: "var(--r-md)",
            padding: "20px 24px",
            marginBottom: 32,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={guaranteeProgress >= 50 ? "var(--sage-dk)" : "var(--ink-muted)"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 17, color: guaranteeProgress >= 50 ? "var(--sage-dk)" : "var(--ink-soft)" }}>
                {student?.diagnosticCompleted
                  ? guaranteeProgress >= 50
                    ? "On track for the 80% guarantee"
                    : `${guaranteeProgress}% toward the 80% target`
                  : "Diagnostic test not yet taken"}
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              {student?.diagnosticCompleted
                ? `Overall progress is at ${guaranteeProgress}% toward the 80% target. Encourage daily practice to keep climbing.`
                : "Once your child takes the diagnostic test, progress toward the guarantee will appear here."}
            </p>
          </div>

          {/* Needs attention - real data from weakest subject */}
          {weakestSubject && weakestSubject.score < 70 ? (
            <>
              <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 16 }}>Needs attention</div>
              <div style={{ border: "1px solid var(--hairline)", borderLeft: "4px solid var(--terracotta)", borderRadius: "var(--r-sm)", padding: "18px 22px", marginBottom: 24 }}>
                <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                  {weakestSubject.name} - Current score: {weakestSubject.score}%
                </h4>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                  This is the weakest subject. Extra practice here will lift the overall grade. Encourage your child to use Practice mode for {weakestSubject.name.toLowerCase()}.
                </p>
              </div>
            </>
          ) : student?.diagnosticCompleted ? (
            <div style={{ padding: "18px 22px", background: "rgba(126,142,99,0.08)", borderRadius: "var(--r-sm)", marginBottom: 24 }}>
              <div className="eyebrow" style={{ fontSize: 11, color: "var(--sage-dk)", marginBottom: 8 }}>All good</div>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                All subjects are above 70%. Encourage your child to keep the momentum going.
              </p>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div style={{ background: "var(--cream-deep)", padding: "16px 32px", borderTop: "1px solid var(--hairline)", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>
            Generated by Soma - Uganda&apos;s lower secondary curriculum platform
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
        <button onClick={() => window.print()} className="btn btn-primary" style={{ width: "100%" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
          </svg>
          Download report
        </button>
        <button
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({ title: "Soma Weekly Report", text: "Check out this week's progress report from Soma.", url: window.location.href });
              } catch {}
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copied to clipboard. Share it with your family.");
            }
          }}
          className="btn btn-ghost"
          style={{ width: "100%" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
          </svg>
          Share report
        </button>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .nav-desktop, .nav-mobile, .report-card + div { display: none !important; }
          .report-card { box-shadow: none !important; border: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}

function ReportStat({ big, label, sub }: { big: string; label: string; sub: string }) {
  return (
    <div>
      <div className="font-serif-display" style={{ fontWeight: 600, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1, marginBottom: 6 }}>
        {big}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-muted)" }}>{sub}</div>
    </div>
  );
}

function SubjectGradeRow({ name, grade, color, score }: { name: string; grade: string; color: string; score: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ fontWeight: 600, fontSize: 15, color: "var(--charcoal)", minWidth: 120 }}>{name}</span>
      <div style={{ flex: 1, minWidth: 100, height: 6, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: color }} />
      </div>
      <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, color, minWidth: 28, textAlign: "center" }}>{grade}</span>
      <span style={{ fontSize: 12, color: "var(--ink-muted)", minWidth: 50 }}>{score}%</span>
    </div>
  );
}
