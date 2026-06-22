"use client";

import Link from "next/link";

export default function PracticePage() {
  return (
    <div className="animate-fade">
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        Practice past papers.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 16, marginBottom: 36 }}>
        Answer real UNEB questions and get AI feedback on every response.
      </p>

      <div className="card" style={{ textAlign: "center", padding: 48 }}>
        <div className="eyebrow" style={{ color: "var(--terracotta)", marginBottom: 12 }}>Coming soon</div>
        <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, marginBottom: 8 }}>
          Past paper practice with AI marking.
        </h3>
        <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
          Answer a question, submit your answer, and the AI marks it against the UNEB scheme. You
          get a score, feedback on what you missed, and a model answer.
        </p>
        <Link href="/student" className="btn btn-ghost" style={{ marginTop: 20 }}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
