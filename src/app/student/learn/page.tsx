"use client";

import Link from "next/link";
import { getLessonsByTopic, curriculumMeta } from "@/lib/lessons";

export default function LearnPage() {
  const topics = getLessonsByTopic();
  const terms = ["Term 1", "Term 2", "Term 3"];
  const termColors: Record<string, string> = {
    "Term 1": "var(--terracotta)",
    "Term 2": "var(--sage-dk)",
    "Term 3": "var(--blue-dk)",
  };

  return (
    <div className="animate-fade">
      <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>
        {curriculumMeta.subject} · {curriculumMeta.level} · {curriculumMeta.totalTopics} topics
      </div>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        S1 Mathematics.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 36, lineHeight: 1.5 }}>
        The complete S1 curriculum, built from the NCDC syllabus. Each lesson teaches to the competency, shows exam-style questions, and includes marking guides.
      </p>

      {/* Terms */}
      {terms.map((term) => {
        const termTopics = topics.filter((t) => t.term === term);
        if (termTopics.length === 0) return null;
        const color = termColors[term];

        return (
          <div key={term} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ width: 6, height: 24, borderRadius: 3, background: color }} />
              <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 20, color: "var(--charcoal)" }}>{term}</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {termTopics.map((topic, topicIdx) => (
                <div key={topic.topicId}>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)", fontWeight: 600, marginBottom: 8, paddingLeft: 4 }}>
                    {topic.theme}
                  </div>
                  <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                    {topic.lessons.map((lesson, lessonIdx) => (
                      <Link key={lesson.id} href={`/student/learn/${lesson.id}`} style={{ textDecoration: "none" }}>
                        <div className="card" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 36, background: color, borderRadius: "0 0 3px 0" }} />
                          <div className="eyebrow" style={{ fontSize: 10, color }}>
                            Topic {topicIdx + 1} · {topic.term}
                          </div>
                          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 16, margin: "6px 0 6px", color: "var(--charcoal)", lineHeight: 1.3 }}>
                            {lesson.title}
                          </h3>
                          <p style={{ color: "var(--ink-muted)", fontSize: 12.5 }}>
                            {lesson.estimatedMinutes} min · {lesson.blocks.filter(b => b.type === "question").length} questions
                          </p>
                          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color }}>
                            Start
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* More subjects */}
      <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--hairline)" }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 12 }}>More subjects coming</div>
        <div className="grid-collapse-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {["Biology", "Chemistry", "English", "Physics", "Geography", "History"].map((s) => (
            <div key={s} className="card" style={{ opacity: 0.5, padding: "16px 14px" }}>
              <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 15 }}>{s}</h3>
              <p style={{ fontSize: 12, color: "var(--ink-muted)" }}>S1 content coming soon</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
