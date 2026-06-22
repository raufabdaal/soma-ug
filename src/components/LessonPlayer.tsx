"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson, LessonBlock } from "@/types";

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete?: (score: number) => void;
}

export function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  // Find all question blocks to track answers
  const questionBlocks = lesson.blocks
    .map((b, i) => ({ block: b, index: i }))
    .filter((x) => x.block.type === "question");

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const answeredCount = Object.keys(revealed).length;
  const correctCount = questionBlocks.filter((q) => {
    if (q.block.type !== "question") return false;
    return revealed[q.index] && answers[q.index] === q.block.correctIndex;
  }).length;
  const score = questionBlocks.length > 0
    ? Math.round((correctCount / questionBlocks.length) * 100)
    : 100;

  function handleAnswer(blockIndex: number, optionIndex: number) {
    if (revealed[blockIndex]) return;
    setAnswers((prev) => ({ ...prev, [blockIndex]: optionIndex }));
  }

  function handleReveal(blockIndex: number) {
    if (answers[blockIndex] === undefined) return;
    setRevealed((prev) => ({ ...prev, [blockIndex]: true }));
  }

  function handleFinish() {
    setCompleted(true);
    onComplete?.(score);
  }

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
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dk)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
          )}
        </div>
        <h2 className="font-serif-display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 8 }}>
          {passed ? "Lesson complete!" : "Almost there!"}
        </h2>
        <p style={{ color: "var(--ink-soft)", fontSize: 16, marginBottom: 8 }}>
          You scored {score}% ({correctCount} of {questionBlocks.length} correct)
        </p>
        <p style={{ color: "var(--ink-muted)", fontSize: 14, marginBottom: 28 }}>
          {passed
            ? `You passed the mastery gate (${lesson.passingScore}% required). Your predicted grade just ticked up.`
            : `You need ${lesson.passingScore}% to pass. Review the lesson and try again.`}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {!passed && (
            <button onClick={() => { setCompleted(false); setRevealed({}); setAnswers({}); }} className="btn btn-primary">
              Try again
            </button>
          )}
          <Link href="/student/learn" className="btn btn-ghost">
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      {questionBlocks.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: "var(--ink-muted)", fontWeight: 600 }}>
            <span>{answeredCount} of {questionBlocks.length} answered</span>
            <span>{Math.round((answeredCount / questionBlocks.length) * 100)}%</span>
          </div>
          <div style={{ height: 5, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${(answeredCount / questionBlocks.length) * 100}%`,
              background: "var(--terracotta)",
              borderRadius: 999,
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      )}

      {/* Render each block */}
      {lesson.blocks.map((block, index) => (
        <BlockRenderer
          key={index}
          block={block}
          index={index}
          selectedAnswer={answers[index]}
          revealed={revealed[index] || false}
          onAnswer={handleAnswer}
          onReveal={handleReveal}
        />
      ))}

      {/* Finish button */}
      {questionBlocks.length > 0 && answeredCount === questionBlocks.length && (
        <button onClick={handleFinish} className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
          Finish lesson
        </button>
      )}
    </div>
  );
}

/* ============================================================
   BLOCK RENDERER
   ============================================================ */
function BlockRenderer({
  block, index, selectedAnswer, revealed, onAnswer, onReveal,
}: {
  block: LessonBlock;
  index: number;
  selectedAnswer?: number;
  revealed: boolean;
  onAnswer: (blockIndex: number, optionIndex: number) => void;
  onReveal: (blockIndex: number) => void;
}) {
  switch (block.type) {
    case "text":
      return (
        <div style={{ marginBottom: 28 }}>
          {block.heading && (
            <h3 className="font-serif-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
              {block.heading}
            </h3>
          )}
          <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.75 }}>
            {block.content}
          </p>
        </div>
      );

    case "key_point":
      return (
        <div className="key-point-box" style={{
          background: "var(--cream-deep)",
          border: "1px solid var(--hairline)",
          borderLeft: "4px solid var(--terracotta)",
          borderRadius: "var(--r-sm)",
          padding: "20px 24px",
          marginBottom: 28,
        }}>
          <div className="eyebrow" style={{ color: "var(--terracotta)", fontSize: 11, marginBottom: 8 }}>
            Key point
          </div>
          <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
            {block.title}
          </h4>
          <p style={{ color: "var(--ink-soft)", fontSize: 15.5, lineHeight: 1.6 }}>
            {block.content}
          </p>
        </div>
      );

    case "worked_example":
      return (
        <div style={{
          background: "var(--white)",
          border: "1px solid var(--hairline)",
          borderLeft: "4px solid var(--sage)",
          borderRadius: "var(--r-sm)",
          padding: "20px 24px",
          marginBottom: 28,
        }}>
          <div className="eyebrow" style={{ color: "var(--sage-dk)", fontSize: 11, marginBottom: 8 }}>
            Worked example
          </div>
          <p className="font-serif-display" style={{ fontSize: 19, fontWeight: 500, marginBottom: 16 }}>
            {block.problem}
          </p>
          {block.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderTop: i > 0 ? "1px dashed var(--hairline)" : "none" }}>
              <span className="font-serif-display" style={{ fontWeight: 600, color: "var(--sage-dk)", fontSize: 17, minWidth: 24 }}>
                {i + 1}
              </span>
              <span style={{ fontSize: 15.5, color: "var(--charcoal)", lineHeight: 1.55 }}>
                {step}
              </span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(126,142,99,0.1)", borderRadius: "var(--r-sm)", fontSize: 15, fontWeight: 600, color: "var(--sage-dk)" }}>
            Answer: {block.answer}
          </div>
        </div>
      );

    case "question":
      return (
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ fontSize: 11, color: "var(--ink-muted)", marginBottom: 8 }}>
            Check your understanding
          </div>
          <p className="font-serif-display" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.4, marginBottom: 18 }}>
            {block.question}
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {block.options.map((option, optIndex) => {
              const isSelected = selectedAnswer === optIndex;
              const isCorrect = optIndex === block.correctIndex;
              const showResult = revealed;

              let bg = "transparent";
              let borderColor = "var(--hairline)";
              let textColor = "var(--ink-soft)";

              if (showResult) {
                if (isCorrect) {
                  bg = "rgba(126,142,99,0.12)";
                  borderColor = "var(--sage)";
                  textColor = "var(--sage-dk)";
                } else if (isSelected) {
                  bg = "rgba(192,106,75,0.1)";
                  borderColor = "var(--terracotta)";
                  textColor = "var(--terracotta-dk)";
                }
              } else if (isSelected) {
                borderColor = "var(--terracotta)";
                textColor = "var(--charcoal)";
              }

              return (
                <button
                  key={optIndex}
                  onClick={() => onAnswer(index, optIndex)}
                  disabled={revealed}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    borderRadius: "var(--r-sm)",
                    border: `1.5px solid ${borderColor}`,
                    background: bg,
                    cursor: revealed ? "default" : "pointer",
                    fontSize: 15.5,
                    color: textColor,
                    fontWeight: isSelected || (showResult && isCorrect) ? 600 : 400,
                    textAlign: "left",
                    marginBottom: 8,
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%",
                    border: `2px solid ${showResult && isCorrect ? "var(--sage)" : isSelected ? "var(--terracotta)" : "var(--hairline)"}`,
                    background: showResult && isCorrect ? "var(--sage)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {showResult && isCorrect && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                    {showResult && !isCorrect && isSelected && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Reveal button */}
          {!revealed && selectedAnswer !== undefined && (
            <button
              onClick={() => onReveal(index)}
              className="btn btn-ghost"
              style={{ marginTop: 4, fontSize: 14, padding: "10px 20px" }}
            >
              Check answer
            </button>
          )}

          {/* Explanation after reveal */}
          {revealed && (
            <div style={{
              marginTop: 12,
              padding: "14px 18px",
              borderRadius: "var(--r-sm)",
              background: selectedAnswer === block.correctIndex
                ? "rgba(126,142,99,0.1)"
                : "rgba(192,106,75,0.08)",
              borderLeft: `3px solid ${selectedAnswer === block.correctIndex ? "var(--sage)" : "var(--terracotta)"}`,
              fontSize: 14.5,
              color: "var(--ink-soft)",
              lineHeight: 1.55,
            }}>
              <strong style={{ color: selectedAnswer === block.correctIndex ? "var(--sage-dk)" : "var(--terracotta-dk)" }}>
                {selectedAnswer === block.correctIndex ? "Correct! " : "Not quite. "}
              </strong>
              {block.explanation}
            </div>
          )}
        </div>
      );

    case "image":
      return (
        <div style={{ marginBottom: 28 }}>
          <img src={block.url} alt={block.caption} style={{ width: "100%", borderRadius: "var(--r-md)" }} />
          <p style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 8, textAlign: "center" }}>
            {block.caption}
          </p>
        </div>
      );

    default:
      return null;
  }
}
