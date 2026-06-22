"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getLessonById } from "@/lib/lessons";
import { LessonPlayer } from "@/components/LessonPlayer";

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const { user, loading } = useAuth();
  const [showTutor, setShowTutor] = useState(false);

  const lessonId = params?.lessonId as string;
  const lesson = getLessonById(lessonId);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  if (!lesson) {
    return (
      <div style={{ textAlign: "center", paddingTop: 60 }}>
        <h1 className="font-serif-display" style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>
          Lesson not found.
        </h1>
        <p style={{ color: "var(--ink-muted)", marginBottom: 24 }}>
          This lesson doesn&apos;t exist yet.
        </p>
        <Link href="/student/learn" className="btn btn-ghost">
          Back to lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade">
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 13, color: "var(--ink-muted)" }}>
        <Link href="/student/learn" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
          Learn
        </Link>
        <span style={{ opacity: 0.5 }}>/</span>
        <span style={{ color: "var(--terracotta)", fontWeight: 600 }}>{lesson.title}</span>
      </div>

      {/* Title */}
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 6 }}>
        {lesson.title}
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 14, marginBottom: 32 }}>
        About {lesson.estimatedMinutes} minutes
      </p>

      {/* Lesson content */}
      <div className="lesson-content">
        <LessonPlayer lesson={lesson} />
      </div>

      {/* Tutor toggle */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--hairline)" }}>
        {!showTutor ? (
          <button onClick={() => setShowTutor(true)} className="btn btn-ghost" style={{ fontSize: 14 }}>
            Ask the tutor a question
          </button>
        ) : (
          <TutorWidget subject={lesson.subjectId} topic={lesson.topicId} />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   TUTOR WIDGET (chat with AI)
   ============================================================ */
function TutorWidget({ subject, topic }: { subject: string; topic: string }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          subject,
          topic,
          history: messages,
        }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: "I couldn't connect just now. Please try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="eyebrow" style={{ fontSize: 11, marginBottom: 12 }}>AI Tutor</div>

      {/* Messages */}
      {messages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, maxHeight: 300, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: 14,
              background: m.role === "user" ? "var(--terracotta)" : "var(--cream-deep)",
              color: m.role === "user" ? "white" : "var(--charcoal)",
              fontSize: 14.5,
              lineHeight: 1.5,
            }}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: 14, background: "var(--cream-deep)", fontSize: 14, color: "var(--ink-muted)" }}>
              Thinking...
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="Ask about this lesson..."
          className="input-clean"
          style={{ flex: 1 }}
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="btn btn-primary"
          style={{ padding: "10px 18px", fontSize: 14, flexShrink: 0 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
