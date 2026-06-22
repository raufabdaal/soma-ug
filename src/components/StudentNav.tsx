"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/student", label: "Home", icon: HomeIcon },
  { href: "/student/learn", label: "Learn", icon: BookIcon },
  { href: "/student/practice", label: "Practice", icon: PencilIcon },
];

export function StudentNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const displayName = profile?.displayName || user?.email?.split("@")[0] || "Student";

  return (
    <>
      {/* ===== DESKTOP TOP NAV (hidden on mobile) ===== */}
      <nav className="nav-desktop">
        <div className="nav-desktop-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link href="/student" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--charcoal)" }}>
              <BrandMark />
              <span className="font-serif-display" style={{ fontWeight: 600, fontSize: 21 }}>Soma</span>
            </Link>
            <div style={{ display: "flex", gap: 4 }}>
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={`nav-desktop-link ${active ? "active" : ""}`}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>{displayName}</span>
            <button onClick={handleLogout} className="nav-logout-btn">Sign out</button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE BOTTOM NAV (hidden on desktop) ===== */}
      <nav className="nav-mobile">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`nav-mobile-item ${active ? "active" : ""}`}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button onClick={handleLogout} className="nav-mobile-item">
          <LogoutIcon />
          <span>Sign out</span>
        </button>
      </nav>
    </>
  );
}

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11 C15 9 8 10 5 12 L5 30 C8 28 15 27 20 29 C25 27 32 28 35 30 L35 12 C32 10 25 9 20 11 Z" />
      <path d="M20 11 L20 29" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" />
    </svg>
  );
}
