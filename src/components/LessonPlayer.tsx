"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson, LessonBlock } from "@/types";

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete?: (score: number, timeSpentSeconds: number) => void;
}

/**
 * Paginated lesson player.
 * Each block is a "step." Student navigates with Next/Back.
 * Question blocks require an answer before advancing.
 * Progress bar at the top. This kills the PDF scroll feel.
 */
export function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [activityRevealed, setActivityRevealed] = useState<Record<number, boolean>>({});
  const [startTime] = useState(() => Date.now());
  const [isReading, setIsReading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSteps = lesson.blocks.length;
  const questionBlocks = lesson.blocks
    .map((b, i) => ({ block: b, index: i }))
    .filter((x) => x.block.type === "question");

  const correctCount = questionBlocks.filter((q) => {
    if (q.block.type !== "question") return false;
    return revealed[q.index] && answers[q.index] === q.block.correctIndex;
  }).length;
  const score = questionBlocks.length > 0
    ? Math.round((correctCount / questionBlocks.length) * 100)
    : 100;

  // Can advance from current step?
  const currentBlock = lesson.blocks[currentStep];
  const canAdvance = (() => {
    if (currentBlock.type === "question") {
      return revealed[currentStep] || false;
    }
    return true;
  })();

  function handleAnswer(blockIndex: number, optionIndex: number) {
    if (revealed[blockIndex]) return;
    setAnswers((prev) => ({ ...prev, [blockIndex]: optionIndex }));
  }
  function handleReveal(blockIndex: number) {
    if (answers[blockIndex] === undefined) return;
    setRevealed((prev) => ({ ...prev, [blockIndex]: true }));
  }
  function toggleActivity(blockIndex: number) {
    setActivityRevealed((prev) => ({ ...prev, [blockIndex]: !prev[blockIndex] }));
  }

  function next() {
    if (currentStep < totalSteps - 1) {
      stopReading();
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  }
  function back() {
    if (currentStep > 0) {
      stopReading();
      setCurrentStep(currentStep - 1);
    }
  }
  function handleFinish() {
    setCompleted(true);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
    onComplete?.(score, timeSpentSeconds);
  }

  // Audio narration
  function getBlockText(block: LessonBlock): string {
    switch (block.type) {
      case "competency": return `Competency. ${block.text}`;
      case "outcome": return `Learning outcome. ${block.text}`;
      case "context": return `${block.heading}. ${block.content}`;
      case "text": return `${block.heading ? block.heading + ". " : ""}${block.content}`;
      case "key_point": return `Key point. ${block.title}. ${block.content}`;
      case "worked_example": return `Worked example. ${block.problem}. ${block.steps.join(". ")}. Answer: ${block.answer}. ${block.reasoning || ""}`;
      case "exam_style": return `Exam style question. ${block.scenario}. ${block.question}. Worth ${block.marks} marks.`;
      case "marking_guide": return `Marking guide. Total marks ${block.totalMarks}. ${block.criteria.map(c => c.criterion + ", " + c.marks + " marks").join(". ")}.`;
      case "question": return `Question. ${block.question}. Options: ${block.options.join(", ")}.`;
      case "activity_of_integration": return `Activity of integration. ${block.title}. ${block.scenario}. ${block.task}`;
      default: return "";
    }
  }
  function stopReading() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsReading(false);
  }
  function toggleReading() {
    if (isReading) { stopReading(); return; }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio narration is not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    setIsReading(true);
    const utterance = new SpeechSynthesisUtterance(getBlockText(currentBlock));
    utterance.rate = 0.95;
    utterance.onend = () => setIsReading(false);
    window.speechSynthesis.speak(utterance);
  }

  // ===== COMPLETION SCREEN =====
  if (completed) {
    const passed = score >= lesson.passingScore;
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{
          width: 100, height: 100, margin: "0 auto 24px", borderRadius: "50%",
          background: passed ? "rgba(126,142,99,0.16)" : "rgba(192,106,75,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {passed ? (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dk)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          )}
        </div>
        <h2 className="font-serif-display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 8 }}>
          {passed ? "Lesson complete!" : "Almost there!"}
        </h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 16, marginBottom: 8 }}>
          You scored {score}% ({correctCount} of {questionBlocks.length} correct)
        </p>
        <p style={{ color: "var(--ink-muted)", fontSize: 14, marginBottom: 20 }}>
          {passed ? "Now test your skills in Practice mode." : "Review and try again, or head to Practice to build speed."}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {!passed && (
            <button onClick={() => { setCompleted(false); setRevealed({}); setAnswers({}); setCurrentStep(0); }} className="btn btn-primary">Try again</button>
          )}
          <Link href="/student/practice" className="btn btn-primary" style={passed ? {} : { background: "transparent", color: "var(--terracotta)", boxShadow: "inset 0 0 0 1.5px var(--terracotta)" }}>Practice now</Link>
          <Link href="/student/learn" className="btn btn-ghost">All lessons</Link>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "var(--ink-muted)", fontWeight: 600 }}>
            Step {currentStep + 1} of {totalSteps}
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={toggleReading} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999,
              border: `1.5px solid ${isReading ? "var(--terracotta)" : "var(--hairline)"}`,
              background: isReading ? "rgba(192,106,75,0.08)" : "transparent",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              color: isReading ? "var(--terracotta)" : "var(--ink-soft)",
              fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
              {isReading ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>Stop</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10v4M7 6l8 6-8 6V6zM18 8a5 5 0 0 1 0 8" /></svg>Listen</>
              )}
            </button>
            <span style={{ fontSize: 12, color: "var(--terracotta)", fontWeight: 600 }}>{Math.round(progress)}%</span>
          </div>
        </div>
        <div style={{ height: 6, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--sage), var(--terracotta))", borderRadius: 999, transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
      </div>

      {/* Current step content */}
      <div key={currentStep} className="animate-fade" style={{ minHeight: 200 }}>
        <BlockRenderer
          block={currentBlock}
          index={currentStep}
          selectedAnswer={answers[currentStep]}
          revealed={revealed[currentStep] || false}
          activityRevealed={activityRevealed[currentStep] || false}
          onAnswer={handleAnswer}
          onReveal={handleReveal}
          onToggleActivity={toggleActivity}
        />
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--hairline)" }}>
        {currentStep > 0 && (
          <button onClick={back} className="btn btn-ghost" style={{ flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        )}
        {currentBlock.type === "question" && !revealed[currentStep] ? (
          <button
            onClick={() => handleReveal(currentStep)}
            disabled={answers[currentStep] === undefined}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Check answer
          </button>
        ) : (
          <button onClick={next} className="btn btn-primary" style={{ flex: 1 }}>
            {currentStep === totalSteps - 1 ? "Finish lesson" : "Next"}
            {currentStep < totalSteps - 1 && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            )}
          </button>
        )}
      </div>

      {/* Step dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
        {lesson.blocks.map((_, i) => (
          <div key={i} style={{
            width: i === currentStep ? 20 : 6,
            height: 6,
            borderRadius: 999,
            background: i === currentStep ? "var(--terracotta)" : i < currentStep ? "var(--sage)" : "var(--hairline)",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   BLOCK RENDERER
   ============================================================ */
function BlockRenderer({
  block, index, selectedAnswer, revealed, activityRevealed, onAnswer, onReveal, onToggleActivity,
}: {
  block: LessonBlock;
  index: number;
  selectedAnswer?: number;
  revealed: boolean;
  activityRevealed: boolean;
  onAnswer: (blockIndex: number, optionIndex: number) => void;
  onReveal: (blockIndex: number) => void;
  onToggleActivity: (blockIndex: number) => void;
}) {
  switch (block.type) {
    case "competency":
      return (
        <div style={{ padding: "20px 24px", background: "var(--white)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z" /></svg>
            <span className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)" }}>Competency</span>
          </div>
          <p className="font-serif-display" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.5, color: "var(--charcoal)" }}>{block.text}</p>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 10 }}>Source: NCDC Mathematics Syllabus, S1</p>
        </div>
      );

    case "outcome":
      return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", background: "rgba(192,106,75,0.04)", borderRadius: "var(--r-sm)" }}>
          <span style={{ flexShrink: 0, padding: "2px 8px", borderRadius: 4, background: "var(--terracotta)", color: "white", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 3 }}>{block.tag}</span>
          <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.5, fontStyle: "italic" }}>{block.text}</p>
        </div>
      );

    case "context":
      return (
        <div>
          {block.heading && <h3 className="font-serif-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{block.heading}</h3>}
          <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.75 }}>{block.content}</p>
        </div>
      );

    case "text":
      return (
        <div>
          {block.heading && <h3 className="font-serif-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{block.heading}</h3>}
          <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.75 }}>{block.content}</p>
        </div>
      );

    case "key_point":
      return (
        <div style={{ background: "var(--cream-deep)", border: "1px solid var(--hairline)", borderLeft: "4px solid var(--terracotta)", borderRadius: "var(--r-sm)", padding: "20px 24px" }}>
          <div className="eyebrow" style={{ color: "var(--terracotta)", fontSize: 11, marginBottom: 8 }}>Key point</div>
          <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{block.title}</h4>
          <p style={{ color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.6 }}>{block.content}</p>
        </div>
      );

    case "worked_example":
      return (
        <div style={{ background: "var(--white)", border: "1px solid var(--hairline)", borderLeft: "4px solid var(--sage)", borderRadius: "var(--r-sm)", padding: "20px 24px" }}>
          <div className="eyebrow" style={{ color: "var(--sage-dk)", fontSize: 11, marginBottom: 8 }}>Worked example</div>
          <p className="font-serif-display" style={{ fontSize: 19, fontWeight: 500, marginBottom: 16 }}>{block.problem}</p>
          {block.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderTop: i > 0 ? "1px dashed var(--hairline)" : "none" }}>
              <span className="font-serif-display" style={{ fontWeight: 600, color: "var(--sage-dk)", fontSize: 17, minWidth: 24 }}>{i + 1}</span>
              <span style={{ fontSize: 15.5, color: "var(--charcoal)", lineHeight: 1.55 }}>{step}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(126,142,99,0.1)", borderRadius: "var(--r-sm)", fontSize: 15, fontWeight: 600, color: "var(--sage-dk)" }}>Answer: {block.answer}</div>
          {block.reasoning && (
            <div style={{ marginTop: 10, padding: "12px 14px", background: "rgba(110,138,166,0.08)", borderRadius: "var(--r-sm)", fontSize: 14, color: "var(--blue-dk)", lineHeight: 1.55, fontStyle: "italic" }}>
              <strong style={{ fontStyle: "normal" }}>Why this works: </strong>{block.reasoning}
            </div>
          )}
        </div>
      );

    case "exam_style":
      return (
        <div style={{ background: "var(--white)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)", padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div className="eyebrow" style={{ color: "var(--blue-dk)", fontSize: 11 }}>How UNEB asks this</div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--blue-dk)", background: "rgba(110,138,166,0.12)", padding: "3px 10px", borderRadius: 999 }}>{block.marks} marks</span>
          </div>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>{block.scenario}</p>
          <p className="font-serif-display" style={{ fontSize: 18, fontWeight: 500, color: "var(--charcoal)" }}>{block.question}</p>
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 12 }}>Try this on paper, then check the marking guide in the next step.</p>
        </div>
      );

    case "marking_guide":
      return (
        <div style={{ background: "var(--cream-deep)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)", padding: "20px 24px" }}>
          <div className="eyebrow" style={{ color: "var(--terracotta)", fontSize: 11, marginBottom: 12 }}>Marking guide</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {block.criteria.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 14px", background: "var(--white)", borderRadius: "var(--r-sm)" }}>
                <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-fraunces), serif", color: "white", background: c.type === "method" ? "var(--sage)" : c.type === "accuracy" ? "var(--terracotta)" : "var(--blue)" }}>{c.marks}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14.5, color: "var(--charcoal)", lineHeight: 1.5 }}>{c.criterion}</p>
                  <span style={{ fontSize: 11, color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{c.type} mark{c.marks > 1 ? "s" : ""}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: "rgba(192,106,75,0.08)", borderRadius: "var(--r-sm)", fontSize: 13, color: "var(--terracotta-dk)", lineHeight: 1.5 }}>
            <strong>Key insight:</strong> Method marks are awarded even if your final answer is wrong. Always show every step.
          </div>
        </div>
      );

    case "activity_of_integration":
      return (
        <div style={{ background: "var(--white)", border: "2px solid var(--terracotta)", borderRadius: "var(--r-md)", padding: "24px", position: "relative" }}>
          <span style={{ position: "absolute", top: -10, left: 20, background: "var(--terracotta)", color: "white", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 }}>Activity of integration</span>
          <div style={{ marginTop: 8 }}>
            <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, marginBottom: 12 }}>{block.title}</h4>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: 12 }}>{block.scenario}</p>
            <div style={{ padding: "14px 18px", background: "var(--cream-deep)", borderRadius: "var(--r-sm)", marginBottom: 16 }}>
              <p className="font-serif-display" style={{ fontSize: 17, fontWeight: 500, color: "var(--charcoal)" }}>{block.task}</p>
            </div>
            <p style={{ fontSize: 13, color: "var(--blue-dk)", fontStyle: "italic", marginBottom: 12 }}>Hint: {block.hint}</p>
            <button onClick={() => onToggleActivity(index)} style={{ background: "transparent", border: "none", color: "var(--terracotta)", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "inherit", borderBottom: "1.5px solid var(--terracotta)", paddingBottom: 2 }}>
              {activityRevealed ? "Hide solution" : "Reveal solution"}
            </button>
            {activityRevealed && (
              <div style={{ marginTop: 16, padding: "16px 18px", background: "rgba(126,142,99,0.08)", borderRadius: "var(--r-sm)" }}>
                <div className="eyebrow" style={{ color: "var(--sage-dk)", fontSize: 11, marginBottom: 8 }}>Solution</div>
                <p style={{ fontSize: 15, color: "var(--charcoal)", lineHeight: 1.6 }}>{block.answer}</p>
              </div>
            )}
          </div>
        </div>
      );

    case "question":
      return (
        <div>
          <div className="eyebrow" style={{ fontSize: 11, color: "var(--ink-muted)", marginBottom: 8 }}>Check your understanding</div>
          <p className="font-serif-display" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.4, marginBottom: 18 }}>{block.question}</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {block.options.map((option, optIndex) => {
              const isSelected = selectedAnswer === optIndex;
              const isCorrect = optIndex === block.correctIndex;
              const showResult = revealed;
              let bg = "transparent", borderColor = "var(--hairline)", textColor = "var(--ink-soft)";
              if (showResult) {
                if (isCorrect) { bg = "rgba(126,142,99,0.12)"; borderColor = "var(--sage)"; textColor = "var(--sage-dk)"; }
                else if (isSelected) { bg = "rgba(192,106,75,0.1)"; borderColor = "var(--terracotta)"; textColor = "var(--terracotta-dk)"; }
              } else if (isSelected) { borderColor = "var(--terracotta)"; textColor = "var(--charcoal)"; }
              return (
                <button key={optIndex} onClick={() => onAnswer(index, optIndex)} disabled={revealed}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: "var(--r-sm)", border: `1.5px solid ${borderColor}`, background: bg, cursor: revealed ? "default" : "pointer", fontSize: 15.5, color: textColor, fontWeight: isSelected || (showResult && isCorrect) ? 600 : 400, textAlign: "left", marginBottom: 8, transition: "all 0.15s ease", width: "100%", fontFamily: "inherit" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${showResult && isCorrect ? "var(--sage)" : isSelected ? "var(--terracotta)" : "var(--hairline)"}`, background: showResult && isCorrect ? "var(--sage)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {showResult && isCorrect && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
                    {showResult && !isCorrect && isSelected && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div style={{ marginTop: 12, padding: "14px 18px", borderRadius: "var(--r-sm)", background: selectedAnswer === block.correctIndex ? "rgba(126,142,99,0.1)" : "rgba(192,106,75,0.08)", borderLeft: `3px solid ${selectedAnswer === block.correctIndex ? "var(--sage)" : "var(--terracotta)"}`, fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>
              <strong style={{ color: selectedAnswer === block.correctIndex ? "var(--sage-dk)" : "var(--terracotta-dk)" }}>{selectedAnswer === block.correctIndex ? "Correct! " : "Not quite. "}</strong>
              {block.explanation}
            </div>
          )}
        </div>
      );

    case "image":
      return (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt={block.caption} style={{ width: "100%", borderRadius: "var(--r-md)" }} />
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 8, textAlign: "center" }}>{block.caption}</p>
        </div>
      );

    default:
      return null;
  }
}
