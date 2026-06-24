"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { ParentProfile, StudentProfile, AppUser } from "@/types";

export default function ParentSettingsPage() {
  const router = useRouter();
  const { user, profile, loading, logout } = useAuth();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchStudents() {
      if (!user) return;
      try {
        const snap = await getDoc(doc(db, "parents", user.uid));
        if (snap.exists()) {
          const data = snap.data() as ParentProfile;
          if (data.studentIds?.length > 0) {
            const snaps = await Promise.all(data.studentIds.map((id) => getDoc(doc(db, "students", id))));
            const valid = snaps.filter((s) => s.exists()).map((s) => s.data() as StudentProfile);
            setStudents(valid);
          }
        }
      } catch (err) {
        console.error("Failed:", err);
      } finally {
        setDataLoading(false);
      }
    }
    if (user) fetchStudents();
  }, [user]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  if (loading || dataLoading) {
    return <div style={{ paddingTop: 80, textAlign: "center", color: "var(--ink-muted)" }}>Loading...</div>;
  }

  return (
    <div className="animate-fade" style={{ maxWidth: 560, margin: "0 auto" }}>
      <h1 className="font-serif-display" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.4rem)", fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 32 }}>
        Settings.
      </h1>

      {/* Profile card */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>Your account</div>
        <ProfileRow label="Name" value={profile?.displayName || user?.displayName || "Not set"} />
        <ProfileRow label="Email" value={user?.email || "Not set"} />
        <ProfileRow label="Account type" value="Parent" />
      </div>

      {/* Linked students */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ fontSize: 11, marginBottom: 16 }}>Linked students ({students.length})</div>
        {students.length === 0 ? (
          <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>No students linked yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {students.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < students.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Student {i + 1}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>Level: {s.level || "S3"}</div>
                </div>
                <Link href="/parent/reports" className="btn btn-ghost" style={{ fontSize: 13, padding: "8px 16px" }}>
                  View reports
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Link another */}
      <Link href="/parent" className="btn btn-ghost" style={{ width: "100%", marginBottom: 24 }}>
        Link another student
      </Link>

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
