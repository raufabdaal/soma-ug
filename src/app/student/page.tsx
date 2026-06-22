"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { StudentProfile } from "@/types";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchStudent() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "students", user.uid));
        if (snap.exists()) {
          setStudentData(snap.data() as StudentProfile);
        }
      } catch (err) {
        console.error("Failed to fetch student data:", err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user) fetchStudent();
  }, [user]);

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
  const predictedMaths = studentData?.predictedGrades?.["mathematics"] || "C";

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
                your baseline
              </span>
            </div>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
              {studentData?.diagnosticCompleted
                ? "On track. Keep the weekly hours up and this will climb."
                : "Complete the diagnostic to set your starting point."}
            </p>
          </div>

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 26 }}>
                {studentData?.diagnosticCompleted ? "68%" : "0%"}
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>Target 80% - guarantee</span>
            </div>
            <div style={{ height: 10, background: "var(--cream-deep)", borderRadius: 999, position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  width: studentData?.diagnosticCompleted ? "68%" : "5%",
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

        {/* Right column: continue learning */}
        <div className="card grid-continue" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "0.85fr 1.15fr" }}>
          <div style={{ background: "var(--terracotta)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, position: "relative" }}>
            <span style={{ position: "absolute", top: 18, left: 22, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
              Continue learning
            </span>
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M42 18 C30 14 12 16 6 20 L6 64 C12 60 30 58 42 62 C54 58 72 60 78 64 L78 20 C72 16 54 14 42 18 Z" />
              <path d="M42 18 L42 62" /><path d="M16 30 L36 33 M16 40 L36 43 M48 33 L68 30" />
            </svg>
          </div>
          <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)" }}>Mathematics - Algebra</div>
            <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, margin: "8px 0 6px" }}>
              Solving simultaneous equations
            </h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px" }}>
              The elimination method UNEB examiners look for, with worked steps.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18 }}>
              <div style={{ flex: 1, height: 6, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "50%", background: "var(--charcoal)" }} />
              </div>
              <span style={{ fontSize: 13, color: "var(--ink-muted)", fontWeight: 600 }}>3 of 6</span>
            </div>
            <Link href="/student/learn" className="btn btn-primary" style={{ marginTop: 20, alignSelf: "flex-start" }}>
              Resume lesson
            </Link>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, margin: "48px 0 20px" }}>
        Your subjects
      </h2>
      <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        <SubjectTile name="Mathematics" topics="12 topics" color="var(--terracotta)" progress={68} href="/student/learn" />
        <SubjectTile name="Biology" topics="8 topics" color="var(--sage-dk)" progress={0} href="/student/learn" />
        <SubjectTile name="Chemistry" topics="10 topics" color="var(--blue-dk)" progress={0} href="/student/learn" />
      </div>

      {/* Study code for parent linking */}
      {studentData?.studyCode && (
        <div className="card" style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="eyebrow" style={{ fontSize: 11 }}>Your study code</div>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px", marginTop: 6 }}>
              Share this with your parent so they can track your progress.
            </p>
          </div>
          <div
            className="font-serif-display"
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--terracotta)",
              background: "var(--cream-deep)",
              padding: "12px 24px",
              borderRadius: "var(--r-md)",
            }}
          >
            {studentData.studyCode}
          </div>
        </div>
      )}
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
