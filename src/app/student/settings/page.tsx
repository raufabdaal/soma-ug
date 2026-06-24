"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { StudentProfile } from "@/types";

export default function StudentSettingsPage() {
  const router = useRouter();
  const { user, profile, loading, logout } = useAuth();
  const [studentData, setStudentData] = useState<StudentProfile | null>(null);
  const [copied, setCopied] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchStudent() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "students", user.uid));
        if (snap.exists()) setStudentData(snap.data() as StudentProfile);
      } catch (err) {
        console.error("Failed:", err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user) fetchStudent();
  }, [user]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  function copyCode() {
    if (!studentData?.studyCode) return;
    navigator.clipboard.writeText(studentData.studyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading || dataLoading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  const subjects = studentData?.enrolledSubjects?.length
    ? studentData.enrolledSubjects.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")
    : "Not selected";

  return (
    <div className="animate-fade" style={{ maxWidth: 560, margin: "0 auto" }}>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 32 }}>
        Profile.
      </h1>

      {/* Profile card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>Your account</div>
        <ProfileRow label="Name" value={profile?.displayName || user?.displayName || "Not set"} />
        <ProfileRow label="Email" value={user?.email || "Not set"} />
        <ProfileRow label="Level" value={studentData?.level || "S3"} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0" }}>
          <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>Subjects</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)", textAlign: "right", maxWidth: 220 }}>{subjects}</span>
        </div>
      </div>

      {/* Study code */}
      {studentData?.studyCode && (
        <div className="card" style={{ marginBottom: 24, textAlign: "center" }}>
          <div className="eyebrow" style={{ fontSize: 11, marginBottom: 12 }}>Your study code</div>
          <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
            Share this code with your parent so they can track your progress.
          </p>
          <div
            className="font-serif-display"
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--terracotta)",
              background: "var(--cream-deep)",
              padding: "16px 28px",
              borderRadius: "var(--r-md)",
              display: "inline-block",
              marginBottom: 16,
            }}
          >
            {studentData.studyCode}
          </div>
          <button onClick={copyCode} className="btn btn-ghost" style={{ fontSize: 14 }}>
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
      )}

      {/* Sign out */}
      <button onClick={handleLogout} className="btn btn-primary" style={{ width: "100%" }}>
        Sign out
      </button>

      <p style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "var(--ink-muted)" }}>
        Soma v0.5 · Made for Ugandan students
      </p>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--hairline)" }}>
      <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>{value}</span>
    </div>
  );
}
