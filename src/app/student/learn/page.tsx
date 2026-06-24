"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getLessonsBySubject, curriculumMeta } from "@/lib/lessons";
import { subjects, getSubjectById } from "@/lib/curriculum";

export default function LearnPage() {
  const [selectedLevel, setSelectedLevel] = useState("S1");
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const levels = ["S1", "S2", "S3", "S4"];

  const availableSubjects = subjects.filter((s) => s.status === "available");
  const comingSoonSubjects = subjects.filter((s) => s.status === "coming-soon");
  const subject = getSubjectById(selectedSubject)!;

  const allLessons = useMemo(() => getLessonsBySubject(selectedSubject), [selectedSubject]);
  const lessons = allLessons.filter((l) => l.curriculum?.level === selectedLevel);
  const hasLessons = lessons.length > 0;

  const terms = ["Term 1", "Term 2", "Term 3"];
  const lessonsByTerm = terms.map((term) => ({
    term,
    lessons: lessons.filter((l) => l.curriculum?.term === term),
  })).filter((t) => t.lessons.length > 0);

  return (
    <div className="animate-fade">
      <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>
        Built from the NCDC syllabus
      </div>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        Learn.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 24, lineHeight: 1.5 }}>
        Each lesson teaches to the competency, shows exam-style questions, and includes marking guides.
      </p>

      {/* Level selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {levels.map((level) => {
          const isActive = level === selectedLevel;
          return (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              style={{
                padding: "10px 20px", borderRadius: 999, border: "none",
                background: isActive ? "var(--charcoal)" : "var(--cream-deep)",
                color: isActive ? "var(--cream)" : "var(--ink-soft)",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: 14, fontWeight: 600,
                transition: "all 0.15s ease",
              }}
            >
              {level}
            </button>
          );
        })}
      </div>

      {/* Subject selector */}
      <div style={{ display: "flex", gap: 10, marginBottom: 32, overflowX: "auto", paddingBottom: 4, flexWrap: "wrap" }}>
        {availableSubjects.map((s) => {
          const isActive = s.id === selectedSubject;
          const levelLessons = getLessonsBySubject(s.id).filter((l) => l.curriculum?.level === selectedLevel);
          return (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 18px", borderRadius: 999,
                border: isActive ? `2px solid ${s.accentColor}` : "2px solid var(--hairline)",
                background: isActive ? s.softBg : "var(--white)",
                cursor: "pointer", fontFamily: "inherit",
                fontSize: 14, fontWeight: isActive ? 600 : 500,
                color: isActive ? s.accentColorDk : "var(--ink-soft)",
                transition: "all 0.15s ease", whiteSpace: "nowrap",
                opacity: levelLessons.length === 0 ? 0.5 : 1,
              }}
            >
              <span style={{
                width: 26, height: 26, borderRadius: 8,
                background: s.accentColor, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, fontFamily: "var(--font-fraunces), serif",
              }}>
                {s.icon}
              </span>
              {s.name}
              <span style={{ fontSize: 11, color: "var(--ink-muted)", fontWeight: 500 }}>
                {levelLessons.length > 0 ? `${levelLessons.length}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subject header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: subject.accentColor, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, fontFamily: "var(--font-fraunces), serif",
        }}>
          {subject.icon}
        </div>
        <div>
          <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 22, color: "var(--charcoal)" }}>
            {subject.name} · {selectedLevel}
          </h2>
          <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>
            {hasLessons ? `${lessons.length} lessons available` : "No lessons yet for this level"}
          </span>
        </div>
      </div>

      {/* Lessons by term */}
      {hasLessons ? (
        lessonsByTerm.map((termGroup) => (
          <div key={termGroup.term} style={{ marginBottom: 36 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 6, height: 24, borderRadius: 3, background: subject.accentColor }} />
              <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 18 }}>{termGroup.term}</h3>
            </div>

            <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {termGroup.lessons.map((lesson, idx) => (
                <Link key={lesson.id} href={`/student/learn/${lesson.id}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 36, background: subject.accentColor, borderRadius: "0 0 3px 0" }} />
                    <div className="eyebrow" style={{ fontSize: 10, color: subject.accentColorDk }}>
                      {lesson.curriculum?.theme}
                    </div>
                    <h4 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, margin: "6px 0 6px", color: "var(--charcoal)", lineHeight: 1.3 }}>
                      {lesson.title}
                    </h4>
                    <p style={{ color: "var(--ink-muted)", fontSize: 12.5 }}>
                      {lesson.estimatedMinutes} min · {lesson.blocks.filter(b => b.type === "question").length} questions
                    </p>
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: subject.accentColorDk }}>
                      Start
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="card" style={{ textAlign: "center", padding: 48 }}>
          <h3 className="font-serif-display" style={{ fontWeight: 500, fontSize: 20, marginBottom: 8 }}>
            {selectedLevel} {subject.name} coming soon.
          </h3>
          <p style={{ color: "var(--ink-muted)", fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
            We are building this content from the NCDC syllabus. Check back soon, or try another level or subject.
          </p>
        </div>
      )}

      {/* Coming soon subjects */}
      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--hairline)" }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 12 }}>More subjects coming</div>
        <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14 }}>
          {comingSoonSubjects.map((s) => (
            <div key={s.id} className="card" style={{ opacity: 0.5, padding: "16px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: s.accentColor, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-fraunces), serif" }}>{s.icon}</span>
                <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</h3>
              </div>
              <p style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 6 }}>Content coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
