"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, configured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      if (message.includes("invalid-credential") || message.includes("wrong-password")) {
        setError("That email and password don't match. Try again.");
      } else if (message.includes("user-not-found")) {
        setError("No account found with that email. Would you like to sign up?");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h1 className="font-serif-display" style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>
        Welcome back.
      </h1>
      <p style={{ color: "var(--ink-muted)", fontSize: 15, marginBottom: 32 }}>
        Sign in to continue your learning streak.
      </p>

      {!configured && <SetupWarning />}

      {error && (
        <div style={{ background: "rgba(192,106,75,0.1)", borderLeft: "3px solid var(--terracotta)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 14.5, color: "var(--terracotta-dk)" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <label htmlFor="email" style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 8 }}>
            Email
          </label>
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
        </div>

        <div>
          <label htmlFor="password" style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 8 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
            className="input-clean"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading || !configured} className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: 28, fontSize: 15, color: "var(--ink-soft)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" style={{ color: "var(--terracotta)", fontWeight: 600 }}>
          Start free trial
        </Link>
      </p>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 28px", position: "relative", overflow: "hidden" }}>
      <div className="blob" style={{ width: 320, height: 320, background: "var(--terracotta)", top: -40, right: -60, opacity: 0.14 }} />
      <div className="blob" style={{ width: 260, height: 260, background: "var(--sage)", bottom: -40, left: -40, opacity: 0.14 }} />

      <div className="animate-fade" style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 2 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--charcoal)", marginBottom: 40, justifyContent: "center" }}>
          <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
            <path d="M20 11 L20 29" />
          </svg>
          <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 23 }}>Soma</span>
        </Link>

        <div className="card" style={{ padding: 32 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SetupWarning() {
  return (
    <div style={{ background: "var(--cream-deep)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
      <strong style={{ color: "var(--charcoal)" }}>Setup needed:</strong> Firebase keys are missing.
      Create <code style={{ background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: 4 }}>.env.local</code> from{" "}
      <code style={{ background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: 4 }}>.env.example</code> and add your keys.
      See <code style={{ background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: 4 }}>MANUAL_TASKS.md</code> MT-001.
    </div>
  );
}
