"use client";

import Link from "next/link";

export default function LearnPage() {
  const subjects = [
    { name: "Mathematics", color: "var(--terracotta)", bg: "rgba(192,106,75,0.14)", desc: "Algebra, geometry, and problem-solving for UNEB." },
    { name: "Biology", color: "var(--sage-dk)", bg: "rgba(126,142,99,0.16)", desc: "Cells, systems, and answering for full marks." },
    { name: "Chemistry", color: "var(--blue-dk)", bg: "rgba(110,138,166,0.16)", desc: "Bonding, reactions, and structured answers." },
  ];

  return (
    <div className="animate-fade">
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        What are we learning today?
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 16, marginBottom: 36 }}>
        Pick a subject to see your topics and lessons.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
        {subjects.map((s) => (
          <div key={s.name} className="card" style={{ cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.25s ease" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-fraunces), serif", color: s.color }}>
                {s.name[0]}
              </span>
            </div>
            <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, marginBottom: 6 }}>{s.name}</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "14.5px", lineHeight: 1.5 }}>{s.desc}</p>
            <div style={{ marginTop: 16 }}>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>Lessons coming soon</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 40, textAlign: "center", padding: 40 }}>
        <div className="eyebrow" style={{ color: "var(--terracotta)", marginBottom: 12 }}>Coming in Phase 1</div>
        <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>
          Full curriculum content is being prepared.
        </h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
          The lesson player, AI marking, and worked examples are built. We are populating the UNEB
          curriculum content now.
        </p>
        <Link href="/student" className="btn btn-ghost" style={{ marginTop: 20 }}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
