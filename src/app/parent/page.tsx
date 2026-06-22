"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { collection, doc, getDoc, getDocs, query, setDoc, arrayUnion, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { authErrorToMessage } from "@/lib/auth-errors";
import type { ParentProfile, StudentProfile } from "@/types";

export default function ParentDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [parentData, setParentData] = useState<ParentProfile | null>(null);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [linkCode, setLinkCode] = useState("");
  const [linkStatus, setLinkStatus] = useState<"idle" | "searching" | "linked" | "error">("idle");
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchParent() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "parents", user.uid));
        if (snap.exists()) {
          const data = snap.data() as ParentProfile;
          setParentData(data);

          // Fetch linked student profiles
          if (data.studentIds?.length > 0) {
            const studentSnaps = await Promise.all(
              data.studentIds.map((id) => getDoc(doc(db, "students", id)))
            );
            const valid = studentSnaps
              .filter((s) => s.exists())
              .map((s) => s.data() as StudentProfile);
            setStudents(valid);
          }
        }
      } catch (err) {
        console.error("Failed to fetch parent data:", err);
      }
    }
    if (user) fetchParent();
  }, [user]);

  async function handleLink() {
    if (!user || !linkCode.trim()) return;
    setLinkStatus("searching");
    setLinkError("");

    try {
      // Find the student by study code
      const q = query(collection(db, "students"), where("studyCode", "==", linkCode.trim().toUpperCase()));
      const snap = await getDocs(q);

      if (snap.empty) {
        setLinkStatus("error");
        setLinkError("No student found with that code. Check the code and try again.");
        return;
      }

      const studentDoc = snap.docs[0];
      const studentId = studentDoc.id;

      // Add student to parent's list (setDoc with merge handles missing parent doc)
      await setDoc(doc(db, "parents", user.uid), {
        userId: user.uid,
        studentIds: arrayUnion(studentId),
      }, { merge: true });

      // Add parent to student's list (setDoc with merge handles missing student doc)
      await setDoc(doc(db, "students", studentId), {
        parentIds: arrayUnion(user.uid),
      }, { merge: true });

      setStudents((prev) => [...prev, studentDoc.data() as StudentProfile]);
      setLinkStatus("linked");
      setLinkCode("");
    } catch (err) {
      console.error("Link failed:", err);
      setLinkStatus("error");
      setLinkError(authErrorToMessage(err));
    }
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
        <p style={{ color: "var(--ink-muted)" }}>Loading...</p>
      </div>
    );
  }

  // No students linked yet: show the linking interface
  if (students.length === 0) {
    return (
      <div className="animate-fade" style={{ maxWidth: 520, margin: "0 auto", paddingTop: 40 }}>
        <div className="blob" style={{ width: 300, height: 300, background: "var(--sage)", top: -40, right: -80, opacity: 0.12 }} />

        <h1 className="font-serif-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
          Link your child.
        </h1>
        <p style={{ color: "var(--ink-muted)", fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>
          Enter the study code your child sees on their dashboard. Once linked, you will see their
          study time, predicted grades, and progress toward the 80% guarantee.
        </p>

        <div className="card" style={{ padding: 32 }}>
          <label htmlFor="code" style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>
            Study code
          </label>
          <input
            id="code"
            type="text"
            value={linkCode}
            onChange={(e) => { setLinkCode(e.target.value); setLinkStatus("idle"); }}
            placeholder="e.g. K7M2QP"
            maxLength={6}
            className="input-clean"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 24, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", borderBottomWidth: 2 }}
          />

          {linkStatus === "error" && (
            <div style={{ marginTop: 16, fontSize: 14, color: "var(--terracotta-dk)" }}>{linkError}</div>
          )}
          {linkStatus === "linked" && (
            <div style={{ marginTop: 16, fontSize: 14, color: "var(--sage-dk)", fontWeight: 600 }}>
              Linked successfully!
            </div>
          )}

          <button onClick={handleLink} disabled={!linkCode.trim() || linkStatus === "searching"} className="btn btn-primary" style={{ width: "100%", marginTop: 24 }}>
            {linkStatus === "searching" ? "Linking..." : "Link student"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 13.5, color: "var(--ink-muted)" }}>
          Ask your child to open Soma and share their study code from the dashboard.
        </p>
      </div>
    );
  }

  // Has linked students: show the dashboard
  return (
    <div className="animate-fade">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 38 }}>
        <h1 className="font-serif-display" style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.6rem)", fontWeight: 500, letterSpacing: "-0.015em" }}>
          {students[0]?.userId ? "This week." : "Overview."}
        </h1>
        <span style={{ fontSize: 13, color: "var(--ink-muted)", borderBottom: "1.5px solid var(--charcoal)", paddingBottom: 4, cursor: "pointer" }}>
          Week of 16 June
        </span>
      </div>

      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 26, alignItems: "start" }}>
        {/* Stats card */}
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
          <div className="blob" style={{ width: 160, height: 160, background: "var(--sage)", top: -40, right: -30, opacity: 0.14 }} />
          <div className="eyebrow" style={{ fontSize: 11 }}>Study time this week</div>
          <div className="font-serif-display" style={{ fontWeight: 500, fontSize: "clamp(2.4rem, 4.6vw, 3.2rem)", lineHeight: 1, margin: "12px 0 8px", letterSpacing: "-0.02em" }}>
            3<span style={{ fontSize: "0.4em", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}>h</span> 20<span style={{ fontSize: "0.4em", color: "var(--ink-muted)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 500 }}>m</span>
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>
            Across Maths, Biology and Chemistry. Up 45 minutes on last week.
          </p>

          <div className="stat-row-mobile" style={{ display: "flex", gap: 28, marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--hairline)" }}>
            <StatItem num="8" label="Lessons completed" />
            <StatItem num="B" label="Predicted - Maths" />
            <StatItem num="6" label="Day streak" />
          </div>

          <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12, background: "rgba(126,142,99,0.12)", borderRadius: 12, padding: "14px 18px", color: "var(--sage-dk)", fontWeight: 600, fontSize: "14.5px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            On track for the 80% guarantee this term.
          </div>
        </div>

        {/* Needs attention alert */}
        <div className="card" style={{ boxShadow: "var(--shadow-float)", transform: "rotate(-1.6deg)", position: "relative" }}>
          <span style={{ position: "absolute", top: -10, left: 24, background: "var(--terracotta)", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 999 }}>
            Needs attention
          </span>
          <div className="eyebrow" style={{ color: "var(--terracotta)", fontSize: 11, marginTop: 8 }}>Biology - Cell division</div>
          <h3 className="font-serif-display" style={{ fontWeight: 600, fontSize: 19, margin: "10px 0 8px", lineHeight: 1.3 }}>
            Score dipped to 58% here.
          </h3>
          <p style={{ fontSize: "14.5px", color: "var(--ink-soft)", lineHeight: 1.55 }}>
            The topic covers mitosis keywords that are being missed in answers. A short refresher is
            ready and waiting.
          </p>
          <span style={{ marginTop: 16, display: "inline-block", fontSize: 14, fontWeight: 600, color: "var(--terracotta)", borderBottom: "1.5px solid var(--terracotta)", paddingBottom: 2, cursor: "pointer" }}>
            Send the refresher
          </span>
        </div>
      </div>

      {/* Link another student */}
      <div className="card" style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <p style={{ color: "var(--ink-soft)", fontSize: 15 }}>
          Have another child using Soma?
        </p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="text"
            value={linkCode}
            onChange={(e) => setLinkCode(e.target.value)}
            placeholder="Study code"
            maxLength={6}
            className="input-clean"
            style={{ width: 140, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 18 }}
          />
          <button onClick={handleLink} disabled={!linkCode.trim()} className="btn btn-ghost" style={{ padding: "10px 20px", fontSize: 14 }}>
            Link
          </button>
        </div>
      </div>
    </div>
  );
}

function StatItem({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-serif-display" style={{ fontWeight: 600, fontSize: 24 }}>{num}</div>
      <div style={{ fontSize: "12.5px", color: "var(--ink-muted)" }}>{label}</div>
    </div>
  );
}
