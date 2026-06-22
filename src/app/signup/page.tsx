"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authErrorToMessage } from "@/lib/auth-errors";
import { GoogleButton } from "@/components/GoogleButton";
import { AuthShell, Field, Divider, ErrorBox, SetupWarning } from "@/components/AuthUI";
import type { UserRole } from "@/types";

export default function SignupPage() {
  const router = useRouter();
  const { signup, configured } = useAuth();
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name, role);
      router.push("/dashboard");
    } catch (err) {
      setError(authErrorToMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="font-serif-display" style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>
        Start learning today.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 32 }}>
        7 days free. No card needed.
      </p>

      {!configured && <SetupWarning />}

      {error && <ErrorBox message={error} />}

      {/* Role selector */}
      <div style={{ marginBottom: 28 }}>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 12 }}>
          I am a
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <RoleButton active={role === "student"} onClick={() => setRole("student")} label="Student" desc="Learning for exams" />
          <RoleButton active={role === "parent"} onClick={() => setRole("parent")} label="Parent" desc="Tracking progress" />
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={role === "student" ? "Aisha Nakato" : "Your name"}
            required
            className="input-clean"
            autoComplete="name"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="input-clean"
            autoComplete="email"
          />
        </Field>

        <Field label="Password" htmlFor="password">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            className="input-clean"
            autoComplete="new-password"
          />
        </Field>

        <button type="submit" disabled={loading || !configured} className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Creating account..." : "Start free trial"}
        </button>
      </form>

      <Divider />

      <GoogleButton
        role={role}
        label={`Sign up as ${role} with Google`}
        onSuccess={() => router.push("/dashboard")}
        onError={setError}
      />

      <p style={{ textAlign: "center", marginTop: 28, fontSize: 15, color: "var(--ink-soft)" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "var(--terracotta)", fontWeight: 600 }}>
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

function RoleButton({ active, onClick, label, desc }: { active: boolean; onClick: () => void; label: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "16px 14px",
        borderRadius: "var(--r-md)",
        border: active ? "1.5px solid var(--terracotta)" : "1.5px solid var(--hairline)",
        background: active ? "rgba(192,106,75,0.06)" : "var(--white)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: 15.5, color: active ? "var(--terracotta)" : "var(--charcoal)" }}>{label}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-muted)", marginTop: 2 }}>{desc}</div>
    </button>
  );
}
