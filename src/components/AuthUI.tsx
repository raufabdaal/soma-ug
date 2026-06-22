"use client";

import Link from "next/link";

/**
 * Shared auth UI components used by both /login and /signup pages.
 * Kept here (not in a page.tsx) because Next.js pages can only export
 * the page component itself.
 */

export function AuthShell({ children }: { children: React.ReactNode }) {
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

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} style={{ display: "block", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "28px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
      <span style={{ fontSize: 12, color: "var(--ink-muted)", fontWeight: 500 }}>or</span>
      <div style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div style={{ background: "rgba(192,106,75,0.1)", borderLeft: "3px solid var(--terracotta)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 14, color: "var(--terracotta-dk)", lineHeight: 1.5 }}>
      {message}
    </div>
  );
}

export function SetupWarning() {
  return (
    <div style={{ background: "var(--cream-deep)", borderRadius: "var(--r-sm)", padding: "14px 18px", marginBottom: 20, fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
      <strong style={{ color: "var(--charcoal)" }}>Setup needed:</strong> Firebase keys are missing.
      Create <code style={{ background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: 4 }}>.env.local</code> and add your keys.
      See <code style={{ background: "rgba(0,0,0,0.05)", padding: "2px 6px", borderRadius: 4 }}>MANUAL_TASKS.md</code> MT-001.
    </div>
  );
}
