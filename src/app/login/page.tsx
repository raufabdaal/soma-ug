"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { authErrorToMessage } from "@/lib/auth-errors";
import { GoogleButton } from "@/components/GoogleButton";
import { AuthShell, Field, Divider, ErrorBox, SetupWarning } from "@/components/AuthUI";

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
      setError(authErrorToMessage(err));
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

      {error && <ErrorBox message={error} />}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
            placeholder="Your password"
            required
            className="input-clean"
            autoComplete="current-password"
          />
        </Field>

        <button type="submit" disabled={loading || !configured} className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <Divider />

      <GoogleButton
        role="student"
        label="Continue with Google"
        onSuccess={() => router.push("/dashboard")}
        onError={setError}
      />

      <p style={{ textAlign: "center", marginTop: 28, fontSize: 15, color: "var(--ink-soft)" }}>
        Don&apos;t have an account?{" "}
        <Link href="/onboarding" style={{ color: "var(--terracotta)", fontWeight: 600 }}>
          Start free trial
        </Link>
      </p>
    </AuthShell>
  );
}
