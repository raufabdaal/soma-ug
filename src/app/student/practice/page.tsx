"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getPracticeTopics, getQuestionsByTopic, type PracticeQuestion, getMasteryLevel } from "@/lib/practice-bank";
import { recordPracticeAnswer, getPracticeStats, type TopicPracticeStats } from "@/lib/practice";
import type { StudentProfile } from "@/types";

export default function PracticePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [practiceStats, setPracticeStats] = useState<Record<string, any>>({});
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  const loadData = useCallback(async () => {
    if (!user) return;
    try {
      const [studentSnap, stats] = await Promise.all([
        getDoc(doc(db, "students", user.uid)),
        getPracticeStats(user.uid),
      ]);
      if (studentSnap.exists()) setStudentData(studentSnap.data() as StudentProfile);
      setPracticeStats(stats);
    } catch (err) {
      console.error("Failed:", err);
    } finally {
      setDataLoading(false);
    }
  }, [user]);

  useEffect(() => { if (user) loadData(); }, [user, loadData]);

  if (loading || dataLoading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  // ===== PRACTICE SESSION (topic selected) =====
  if (activeTopic) {
    return (
      <PracticeSession
        topicId={activeTopic}
        user={user!}
        onExit={() => { setActiveTopic(null); loadData(); }}
      />
    );
  }

  // ===== TOPIC GRID =====
  const topics = getPracticeTopics();
  const totalXP = studentData?.totalXP || 0;
  const totalQuestions = studentData?.questionsAnswered || 0;
  const streak = studentData?.practiceStreak || 0;

  return (
    <div className="animate-fade">
      {/* Header with XP */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
        <div>
          <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>Practice mode</div>
          <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em" }}>
            Sharpen your skills.
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {streak > 0 && (
            <div className="card" style={{ padding: "12px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>🔥</div>
              <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--terracotta)" }}>{streak}</div>
              <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>day streak</div>
            </div>
          )}
          <div className="card" style={{ padding: "12px 18px", textAlign: "center" }}>
            <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--sage-dk)" }}>{totalXP}</div>
            <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>total XP</div>
          </div>
          <div className="card" style={{ padding: "12px 18px", textAlign: "center" }}>
            <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 18, color: "var(--blue-dk)" }}>{totalQuestions}</div>
            <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>answered</div>
          </div>
        </div>
      </div>

      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 28, lineHeight: 1.5 }}>
        Pick a topic. Answer questions, earn XP, build your streak. Every answer sharpens your predicted grade.
      </p>

      {/* Topic grid grouped by subject */}
      {(() => {
        const subjectGroups: Record<string, typeof topics> = {};
        for (const t of topics) {
          if (!subjectGroups[t.subject]) subjectGroups[t.subject] = [];
          subjectGroups[t.subject].push(t);
        }
        return Object.entries(subjectGroups).map(([subject, subTopics]) => (
          <div key={subject} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ width: 6, height: 20, borderRadius: 3, background: subTopics[0].color }} />
              <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, color: "var(--charcoal)" }}>{subject}</h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {subTopics.map((topic) => {
                const stats = practiceStats[topic.id] || { attempted: 0, correct: 0, accuracy: 0 };
                const mastery = getMasteryLevel(stats.accuracy);
                return (
                  <button key={topic.id} onClick={() => setActiveTopic(topic.id)} style={{ textAlign: "left", cursor: "pointer", background: "var(--white)", border: "1px solid var(--hairline)", borderRadius: "var(--r-md)", padding: 20, transition: "transform 0.15s ease", fontFamily: "inherit" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: mastery.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{mastery.level}</span>
                    </div>
                    <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{topic.name}</h4>
                    <p style={{ fontSize: 11, color: "var(--ink-muted)", marginBottom: 10 }}>{topic.questionCount} questions</p>
                    {stats.attempted > 0 ? (
                      <>
                        <div style={{ height: 4, background: "var(--cream-deep)", borderRadius: 999, overflow: "hidden", marginBottom: 4 }}>
                          <div style={{ height: "100%", width: `${stats.accuracy}%`, background: mastery.color, borderRadius: 999 }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--ink-muted)" }}>
                          <span>{stats.accuracy}%</span><span>{stats.attempted} done</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ fontSize: 12, color: topic.color, fontWeight: 600 }}>Start</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ));
      })()}
    </div>
  );
}

/* ============================================================
   PRACTICE SESSION - the question flow
   ============================================================ */
function PracticeSession({ topicId, user, onExit }: { topicId: string; user: any; onExit: () => void }) {
  // useMemo keeps these stable across renders so they don't trigger useEffect loops
  const topics = useMemo(() => getPracticeTopics(), []);
  const topic = topics.find((t) => t.id === topicId);
  const bankQuestions = useMemo(() => getQuestionsByTopic(topicId), [topicId]);

  const [questionQueue, setQuestionQueue] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [shortAnswer, setShortAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [aiMarking, setAiMarking] = useState<string | null>(null);
  const [markingLoading, setMarkingLoading] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0, xp: 0 });
  const [streak, setStreak] = useState(0);
  const [loadingNext, setLoadingNext] = useState(false);

  // Shuffle and set up initial questions ONLY when topicId changes
  useEffect(() => {
    const shuffled = [...bankQuestions].sort(() => Math.random() - 0.5);
    setQuestionQueue(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShortAnswer("");
    setRevealed(false);
    setAiMarking(null);
    setSessionStats({ correct: 0, total: 0, xp: 0 });
    setStreak(0);
  }, [topicId, bankQuestions]);

  const currentQuestion = questionQueue[currentIndex];

  async function handleCheckMCQ() {
    if (selectedAnswer === null) return;
    setRevealed(true);
    const correct = selectedAnswer === currentQuestion.correctIndex;
    setSessionStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
      xp: prev.xp + (correct ? (currentQuestion.difficulty === "easy" ? 10 : currentQuestion.difficulty === "medium" ? 15 : 20) : 2),
    }));
    setStreak(correct ? streak + 1 : 0);
    await recordPracticeAnswer(user, topicId, correct, currentQuestion.difficulty);
  }

  async function handleCheckShort() {
    if (!shortAnswer.trim()) return;
    setMarkingLoading(true);

    try {
      const res = await fetch("/api/ai/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          studentAnswer: shortAnswer,
          subject: "Mathematics",
          marks: 4,
          markingScheme: currentQuestion.explanation,
          requiredKeywords: currentQuestion.markingKey || [],
        }),
      });
      const data = await res.json();

      const isCorrect = (data.percentage || 0) >= 60;
      setAiMarking(data.feedback || "Marked. Check the explanation below.");
      setRevealed(true);
      setSessionStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        xp: prev.xp + (isCorrect ? (currentQuestion.difficulty === "easy" ? 10 : currentQuestion.difficulty === "medium" ? 15 : 20) : 2),
      }));
      setStreak(isCorrect ? streak + 1 : 0);
      await recordPracticeAnswer(user, topicId, isCorrect, currentQuestion.difficulty);
    } catch {
      setAiMarking("Could not connect to the marker. Check the model answer below.");
      setRevealed(true);
    } finally {
      setMarkingLoading(false);
    }
  }

  async function handleNext() {
    setSelectedAnswer(null);
    setShortAnswer("");
    setRevealed(false);
    setAiMarking(null);
    setLoadingNext(true);

    // If we're near the end of the bank, generate an AI question
    if (currentIndex + 1 >= questionQueue.length) {
      try {
        const res = await fetch("/api/ai/practice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicId,
            type: Math.random() > 0.5 ? "mcq" : "short_answer",
            difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
          }),
        });
        const aiQuestion = await res.json();
        setQuestionQueue((prev) => [...prev, aiQuestion]);
      } catch {
        // Fallback: reuse a random bank question
        const randomQ = bankQuestions[Math.floor(Math.random() * bankQuestions.length)];
        setQuestionQueue((prev) => [...prev, { ...randomQ, id: `repeat-${Date.now()}` }]);
      }
    }

    setCurrentIndex((prev) => prev + 1);
    setLoadingNext(false);
  }

  if (!currentQuestion) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading questions...</div>;
  }

  return (
    <div className="animate-fade">
      {/* Session header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onExit} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--ink-muted)", fontSize: 14, fontWeight: 500, fontFamily: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Exit
        </button>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {streak >= 2 && <span style={{ fontSize: 13, fontWeight: 600, color: "var(--terracotta)" }}>🔥 {streak} streak</span>}
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sage-dk)" }}>{sessionStats.correct}/{sessionStats.total} correct</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue-dk)" }}>+{sessionStats.xp} XP</span>
        </div>
      </div>

      {/* Topic title */}
      <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>{topic?.name}</div>

      {/* Question card */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999,
            background: currentQuestion.difficulty === "easy" ? "rgba(126,142,99,0.12)" : currentQuestion.difficulty === "medium" ? "rgba(192,106,75,0.1)" : "rgba(110,138,166,0.12)",
            color: currentQuestion.difficulty === "easy" ? "var(--sage-dk)" : currentQuestion.difficulty === "medium" ? "var(--terracotta)" : "var(--blue-dk)",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            {currentQuestion.difficulty}
          </span>
          <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>
            Q{currentIndex + 1}
          </span>
        </div>

        <h3 className="font-serif-display" style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.4, marginBottom: 20 }}>
          {currentQuestion.question}
        </h3>

        {/* MCQ options */}
        {currentQuestion.type === "mcq" && currentQuestion.options && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedAnswer === i;
              const isCorrect = i === currentQuestion.correctIndex;
              const showResult = revealed;
              let bg = "transparent", borderColor = "var(--hairline)", textColor = "var(--ink-soft)";
              if (showResult) {
                if (isCorrect) { bg = "rgba(126,142,99,0.12)"; borderColor = "var(--sage)"; textColor = "var(--sage-dk)"; }
                else if (isSelected) { bg = "rgba(192,106,75,0.1)"; borderColor = "var(--terracotta)"; textColor = "var(--terracotta-dk)"; }
              } else if (isSelected) { borderColor = "var(--terracotta)"; textColor = "var(--charcoal)"; }
              return (
                <button key={i} onClick={() => !revealed && setSelectedAnswer(i)} disabled={revealed}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: "var(--r-sm)", border: `1.5px solid ${borderColor}`, background: bg, cursor: revealed ? "default" : "pointer", fontSize: 15.5, color: textColor, fontWeight: isSelected || (showResult && isCorrect) ? 600 : 400, textAlign: "left", marginBottom: 8, width: "100%", fontFamily: "inherit", transition: "all 0.15s ease" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${showResult && isCorrect ? "var(--sage)" : isSelected ? "var(--terracotta)" : "var(--hairline)"}`, background: showResult && isCorrect ? "var(--sage)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {showResult && isCorrect && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {/* Short answer input */}
        {currentQuestion.type === "short_answer" && (
          <div>
            <textarea
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
              disabled={revealed}
              placeholder="Type your answer here. Show your working for full marks."
              style={{
                width: "100%", minHeight: 100, padding: "14px 16px", borderRadius: "var(--r-sm)",
                border: `1.5px solid ${revealed ? "var(--hairline)" : "var(--charcoal)"}`,
                background: "var(--cream)", fontSize: 15, fontFamily: "inherit", color: "var(--charcoal)",
                outline: "none", resize: "vertical", lineHeight: 1.5,
              }}
            />
          </div>
        )}
      </div>

      {/* Feedback */}
      {revealed && (
        <div className="card animate-fade" style={{ padding: 24, marginBottom: 20 }}>
          {aiMarking && (
            <div style={{ marginBottom: 16, padding: "14px 18px", background: "rgba(110,138,166,0.08)", borderRadius: "var(--r-sm)", fontSize: 14.5, color: "var(--blue-dk)", lineHeight: 1.55 }}>
              <strong>AI feedback: </strong>{aiMarking}
            </div>
          )}
          <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>Explanation</div>
          <p style={{ fontSize: 15, color: "var(--charcoal)", lineHeight: 1.6, marginBottom: 12 }}>{currentQuestion.explanation}</p>
          {currentQuestion.correctAnswer && (
            <div style={{ padding: "10px 14px", background: "rgba(126,142,99,0.1)", borderRadius: "var(--r-sm)", fontSize: 14, fontWeight: 600, color: "var(--sage-dk)" }}>
              Model answer: {currentQuestion.correctAnswer}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 12 }}>
        {!revealed ? (
          currentQuestion.type === "mcq" ? (
            <button onClick={handleCheckMCQ} disabled={selectedAnswer === null} className="btn btn-primary" style={{ flex: 1 }}>
              Check answer
            </button>
          ) : (
            <button onClick={handleCheckShort} disabled={!shortAnswer.trim() || markingLoading} className="btn btn-primary" style={{ flex: 1 }}>
              {markingLoading ? "AI is marking..." : "Submit for marking"}
            </button>
          )
        ) : (
          <button onClick={handleNext} disabled={loadingNext} className="btn btn-primary" style={{ flex: 1 }}>
            {loadingNext ? "Loading next..." : "Next question"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
