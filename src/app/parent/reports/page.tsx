"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ParentProfile, StudentProfile } from "@/types";

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

  const student = students[selectedStudent];
  const studentName = student?.userId ? `Student ${selectedStudent + 1}` : "Your child";
  const weekRange = "Week of 16 June";

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
        <div style={{
          background: "var(--cream-deep)",
          padding: "28px 32px",
          borderBottom: "1px solid var(--hairline)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
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
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 4 }}>S3 · Lower Secondary</p>
          </div>
        </div>

        {/* Study summary */}
        <div style={{ padding: "32px" }}>
          <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 32 }}>
            <ReportStat big="3h 20m" label="Study time" sub="Up 45m on last week" />
            <ReportStat big="8" label="Lessons done" sub="2 mastery gates passed" />
            <ReportStat big="6" label="Day streak" sub="Consistent this week" />
          </div>

          {/* Subject grades */}
          <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>Predicted grades</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
            <SubjectGradeRow name="Mathematics" grade="B" color="var(--terracotta)" change="up from C" progress={68} />
            <SubjectGradeRow name="Biology" grade="C" color="var(--sage-dk)" change="steady" progress={52} />
            <SubjectGradeRow name="Chemistry" grade="D" color="var(--blue-dk)" change="needs work" progress={44} />
          </div>

          {/* Guarantee status */}
          <div style={{
            background: "rgba(126,142,99,0.12)",
            borderRadius: "var(--r-md)",
            padding: "20px 24px",
            marginBottom: 32,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dk)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 17, color: "var(--sage-dk)" }}>
                On track for the 80% guarantee
              </span>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Your child is meeting the engagement required for the grade guarantee. Overall progress is at 68% toward the 80% target.
            </p>
          </div>

          {/* Needs attention */}
          <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 16 }}>Needs attention</div>
          <div style={{
            border: "1px solid var(--hairline)",
            borderLeft: "4px solid var(--terracotta)",
            borderRadius: "var(--r-sm)",
            padding: "18px 22px",
            marginBottom: 24,
          }}>
            <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
              Chemistry · Bonding
            </h4>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              Score dipped to 44%. A refresher on ionic and covalent bonds is ready. Encouraging a 15-minute review this week would help.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: "var(--cream-deep)",
          padding: "16px 32px",
          borderTop: "1px solid var(--hairline)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>
            Generated by Soma · Uganda&apos;s lower secondary curriculum platform
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

function SubjectGradeRow({ name, grade, color, change, progress }: { name: string; grade: string; color: string; change: string; progress: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <span style={{ fontWeight: 600, fontSize: 15, color: "var(--charcoal)", minWidth: 120 }}>{name}</span>
      <div style={{ flex: 1, minWidth: 100, height: 6, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: color }} />
      </div>
      <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, color, minWidth: 28, textAlign: "center" }}>{grade}</span>
      <span style={{ fontSize: 12, color: "var(--ink-muted)", minWidth: 80 }}>{change}</span>
    </div>
  );
}
