"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const navItems = [
    { href: "/student", label: "Dashboard", icon: HomeIcon },
    { href: "/student/learn", label: "Learn", icon: BookIcon },
    { href: "/student/practice", label: "Practice", icon: PencilIcon },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      {/* Top nav */}
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

            <div style={{ display: "flex", gap: 6 }}>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      borderRadius: "var(--r-md)",
                      textDecoration: "none",
                      fontSize: 14.5,
                      fontWeight: active ? 600 : 500,
                      color: active ? "var(--charcoal)" : "var(--ink-soft)",
                      background: active ? "var(--cream-deep)" : "transparent",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <item.icon />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>
              {profile?.displayName || user?.email?.split("@")[0] || "Student"}
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

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </svg>
  );
}
