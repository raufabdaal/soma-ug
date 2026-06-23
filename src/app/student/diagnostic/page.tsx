"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { recordDiagnostic } from "@/lib/progress";
import type { StudentProfile } from "@/types";

interface Question {
  subject: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const diagnosticQuestions: Question[] = [
  {
    subject: "mathematics",
    question: "Solve for x: 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctIndex: 1,
    explanation: "Subtract 5 from both sides: 2x = 8. Divide by 2: x = 4.",
  },
  {
    subject: "mathematics",
    question: "Expand: 3(x + 4)",
    options: ["3x + 4", "3x + 7", "3x + 12", "x + 12"],
    correctIndex: 2,
    explanation: "3 times x is 3x. 3 times 4 is 12. So 3x + 12.",
  },
  {
    subject: "biology",
    question: "Which process do cells use to divide into two identical cells?",
    options: ["Meiosis", "Mitosis", "Fusion", "Diffusion"],
    correctIndex: 1,
    explanation: "Mitosis produces two genetically identical daughter cells.",
  },
  {
    subject: "chemistry",
    question: "What is the chemical symbol for water?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctIndex: 1,
    explanation: "Water is H2O: two hydrogen atoms and one oxygen atom.",
  },
  {
    subject: "biology",
    question: "Which gas do plants absorb for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correctIndex: 2,
    explanation: "Plants absorb carbon dioxide and release oxygen during photosynthesis.",
  },
];

export default function DiagnosticPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function checkDiagnostic() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "students", user.uid));
        if (snap.exists()) {
          const data = snap.data() as StudentProfile;
          if (data.diagnosticCompleted) setAlreadyDone(true);
        }
      } catch (err) {
        console.error("Failed:", err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user) checkDiagnostic();
  }, [user]);

  function handleSelect(index: number) {
    if (revealed) return;
    setSelected(index);
  }

  function handleReveal() {
    if (selected === null) return;
    setRevealed(true);
  }

  async function handleNext() {
    const newAnswers = [...answers, selected as number];
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);

    if (current < diagnosticQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate results
      const scores: Record<string, number> = {};
      const subjectTotals: Record<string, number> = {};
      const subjectCorrect: Record<string, number> = {};

      diagnosticQuestions.forEach((q, i) => {
        subjectTotals[q.subject] = (subjectTotals[q.subject] || 0) + 1;
        if (newAnswers[i] === q.correctIndex) {
          subjectCorrect[q.subject] = (subjectCorrect[q.subject] || 0) + 1;
        }
      });

      Object.keys(subjectTotals).forEach((subject) => {
        scores[subject] = Math.round((subjectCorrect[subject] || 0) / subjectTotals[subject] * 100);
      });

      setResults(scores);
      setCompleted(true);

      // Save to Firestore
      if (user) {
        setSaving(true);
        try {
          await recordDiagnostic(user.uid, scores);
        } catch (err) {
          console.error("Failed to save diagnostic:", err);
        } finally {
          setSaving(false);
        }
      }
    }
  }

  if (loading || dataLoading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  if (alreadyDone && !completed) {
    return (
      <div className="animate-fade" style={{ textAlign: "center", paddingTop: 60, maxWidth: 420, margin: "0 auto" }}>
        <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", background: "rgba(126,142,99,0.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dk)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h1 className="font-serif-display" style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>Diagnostic complete.</h1>
        <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 24 }}>You&apos;ve already taken the diagnostic. Your baseline is set.</p>
        <Link href="/student" className="btn btn-primary">Back to dashboard</Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="animate-fade" style={{ paddingTop: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500, marginBottom: 8 }}>
            Here&apos;s your baseline.
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: 15 }}>
            This is where you&apos;re starting. The only way from here is up.
          </p>
        </div>

        <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {Object.entries(results).map(([subject, score]) => {
            const color = subject === "mathematics" ? "var(--terracotta)" : subject === "biology" ? "var(--sage-dk)" : "var(--blue-dk)";
            const name = subject.charAt(0).toUpperCase() + subject.slice(1);
            const grade = score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : score >= 40 ? "E" : "F";
            return (
              <div key={subject} className="card" style={{ textAlign: "center", padding: "24px 16px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, margin: "0 auto 12px" }} />
                <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, marginBottom: 10 }}>{name}</h3>
                <div className="font-serif-display" style={{ fontSize: 40, fontWeight: 600, color, lineHeight: 1, marginBottom: 4 }}>{grade}</div>
                <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{score}%</div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: 24, textAlign: "center", background: "var(--cream-deep)" }}>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 20 }}>
            Now start a lesson to begin climbing toward your target. Every lesson you complete updates your predicted grade.
          </p>
          <Link href="/student/learn" className="btn btn-primary">Start learning</Link>
        </div>
      </div>
    );
  }

  const q = diagnosticQuestions[current];
  const progress = ((current) / diagnosticQuestions.length) * 100;

  return (
    <div className="animate-fade" style={{ maxWidth: 640, margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "var(--ink-muted)", fontWeight: 600 }}>
          <span>Question {current + 1} of {diagnosticQuestions.length}</span>
          <span>Diagnostic test</span>
        </div>
        <div style={{ height: 5, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "var(--terracotta)", transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question */}
      <div className="eyebrow" style={{ fontSize: 11, marginBottom: 10, color: "var(--terracotta)" }}>
        {q.subject.charAt(0).toUpperCase() + q.subject.slice(1)}
      </div>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500, lineHeight: 1.3, marginBottom: 28 }}>
        {q.question}
      </h1>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {q.options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correctIndex;
          let bg = "transparent";
          let borderColor = "var(--hairline)";
          let textColor = "var(--ink-soft)";

          if (revealed) {
            if (isCorrect) { bg = "rgba(126,142,99,0.12)"; borderColor = "var(--sage)"; textColor = "var(--sage-dk)"; }
            else if (isSelected) { bg = "rgba(192,106,75,0.1)"; borderColor = "var(--terracotta)"; textColor = "var(--terracotta-dk)"; }
          } else if (isSelected) {
            borderColor = "var(--terracotta)"; textColor = "var(--charcoal)";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px", borderRadius: "var(--r-sm)",
                border: `1.5px solid ${borderColor}`, background: bg,
                cursor: revealed ? "default" : "pointer",
                fontSize: 15.5, color: textColor,
                fontWeight: isSelected || (revealed && isCorrect) ? 600 : 400,
                textAlign: "left", marginBottom: 10, transition: "all 0.15s ease", width: "100%",
                fontFamily: "inherit",
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `2px solid ${revealed && isCorrect ? "var(--sage)" : isSelected ? "var(--terracotta)" : "var(--hairline)"}`,
                background: revealed && isCorrect ? "var(--sage)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {revealed && isCorrect && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                )}
                {revealed && !isCorrect && isSelected && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                )}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {/* Explanation after reveal */}
      {revealed && (
        <div style={{
          marginTop: 12, padding: "14px 18px", borderRadius: "var(--r-sm)",
          background: selected === q.correctIndex ? "rgba(126,142,99,0.1)" : "rgba(192,106,75,0.08)",
          borderLeft: `3px solid ${selected === q.correctIndex ? "var(--sage)" : "var(--terracotta)"}`,
          fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55,
        }}>
          <strong style={{ color: selected === q.correctIndex ? "var(--sage-dk)" : "var(--terracotta-dk)" }}>
            {selected === q.correctIndex ? "Correct. " : "Not quite. "}
          </strong>
          {q.explanation}
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        {!revealed ? (
          <button onClick={handleReveal} disabled={selected === null} className="btn btn-primary" style={{ flex: 1 }}>
            Check answer
          </button>
        ) : (
          <button onClick={handleNext} disabled={saving} className="btn btn-primary" style={{ flex: 1 }}>
            {saving ? "Saving..." : current < diagnosticQuestions.length - 1 ? "Next question" : "See my results"}
          </button>
        )}
      </div>

      {saving && <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--ink-muted)" }}>Saving your baseline...</p>}
    </div>
  );
}
