"use client";

import Link from "next/link";
import { sampleLessons } from "@/lib/lessons";

export default function LearnPage() {
  const subjects = [
    { id: "mathematics", name: "Mathematics", color: "var(--terracotta)", bg: "rgba(192,106,75,0.14)", desc: "Algebra, geometry, and problem-solving for UNEB." },
    { id: "biology", name: "Biology", color: "var(--sage-dk)", bg: "rgba(126,142,99,0.16)", desc: "Cells, systems, and answering for full marks." },
    { id: "chemistry", name: "Chemistry", color: "var(--blue-dk)", bg: "rgba(110,138,166,0.16)", desc: "Bonding, reactions, and structured answers." },
  ];

  // Group lessons by subject
  const mathLessons = sampleLessons.filter((l) => l.subjectId === "mathematics");

  return (
    <div className="animate-fade">
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        What are we learning today?
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 36 }}>
        Pick a lesson to start. Each one takes about 10 to 15 minutes.
      </p>

      {/* Mathematics lessons (available now) */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--terracotta)" }} />
          <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, color: "var(--charcoal)" }}>
            Mathematics - Algebra
          </h2>
        </div>

        <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {mathLessons.map((lesson, i) => (
            <Link key={lesson.id} href={`/student/learn/${lesson.id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 40, background: "var(--terracotta)", borderRadius: "0 0 3px 0" }} />
                <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)" }}>
                  Lesson {i + 1}
                </div>
                <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, margin: "8px 0 6px", color: "var(--charcoal)" }}>
                  {lesson.title}
                </h3>
                <p style={{ color: "var(--ink-muted)", fontSize: 13 }}>
                  {lesson.estimatedMinutes} min
                </p>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--terracotta)" }}>
                  Start lesson
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Other subjects (coming soon) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="grid-collapse">
        <div className="card" style={{ opacity: 0.6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(126,142,99,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <span className="font-serif-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--sage-dk)" }}>B</span>
          </div>
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Biology</h3>
          <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>Lessons coming soon</p>
        </div>
        <div className="card" style={{ opacity: 0.6 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(110,138,166,0.16)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <span className="font-serif-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--blue-dk)" }}>C</span>
          </div>
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Chemistry</h3>
          <p style={{ fontSize: 13, color: "var(--ink-muted)" }}>Lessons coming soon</p>
        </div>
      </div>
    </div>
  );
}
