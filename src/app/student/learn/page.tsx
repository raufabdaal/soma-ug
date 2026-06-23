"use client";

import Link from "next/link";
import { getLessonsByTopic, curriculumMeta } from "@/lib/lessons";

export default function LearnPage() {
  const topics = getLessonsByTopic();

  return (
    <div className="animate-fade">
      <div className="eyebrow" style={{ fontSize: 11, color: "var(--terracotta)", marginBottom: 8 }}>
        {curriculumMeta.subject} · {curriculumMeta.level} · Term 1
      </div>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
        Numbers.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 36 }}>
        The first theme of S1 Mathematics. Master these foundations and the rest becomes easier.
      </p>

      {/* Topics */}
      {topics.map((topic, topicIdx) => (
        <div key={topic.topicId} style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(192,106,75,0.12)",
              color: "var(--terracotta)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700,
              fontFamily: "var(--font-fraunces), serif",
              flexShrink: 0,
            }}>
              {topicIdx + 1}
            </span>
            <div>
              <h2 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, color: "var(--charcoal)" }}>
                {topic.title}
              </h2>
              <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>{topic.theme}</span>
            </div>
          </div>

          <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {topic.lessons.map((lesson, lessonIdx) => (
              <Link key={lesson.id} href={`/student/learn/${lesson.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ position: "relative", overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: 36, background: "var(--terracotta)", borderRadius: "0 0 3px 0" }} />
                  <div className="eyebrow" style={{ fontSize: 10, color: "var(--terracotta)" }}>
                    Lesson {topicIdx + 1}.{lessonIdx + 1}
                  </div>
                  <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 17, margin: "6px 0 6px", color: "var(--charcoal)" }}>
                    {lesson.title}
                  </h3>
                  <p style={{ color: "var(--ink-muted)", fontSize: 13 }}>
                    {lesson.estimatedMinutes} min · {lesson.blocks.filter(b => b.type === "question").length} questions
                  </p>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--terracotta)" }}>
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
      ))}

      {/* More subjects coming */}
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
