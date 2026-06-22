"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, profile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(251,248,243,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--hairline)",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--charcoal)" }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
                <path d="M20 11 L20 29" />
              </svg>
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 21 }}>Soma</span>
            </Link>
            <span style={{ fontSize: 13, color: "var(--ink-muted)", fontWeight: 500 }}>Parent dashboard</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>
              {profile?.displayName || user?.email?.split("@")[0] || "Parent"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--r-md)",
                border: "1px solid var(--hairline)",
                background: "transparent",
                cursor: "pointer",
                fontSize: 13.5,
                fontWeight: 500,
                color: "var(--ink-soft)",
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 28px 80px" }}>
        {children}
      </main>
    </div>
  );
}
