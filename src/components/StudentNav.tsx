"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/student", label: "Home", icon: HomeIcon },
  { href: "/student/learn", label: "Learn", icon: BookIcon },
  { href: "/student/practice", label: "Practice", icon: PencilIcon },
  { href: "/student/settings", label: "Profile", icon: SettingsIcon },
];

export function StudentNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const displayName = profile?.displayName || user?.displayName || "Student";

  return (
    <div className="app-shell">
      {/* ===== DESKTOP LEFT SIDEBAR ===== */}
      <aside className="sidebar">
        <Link href="/student" className="sidebar-brand">
          <BrandMark />
          <span>Soma</span>
        </Link>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`sidebar-link ${active ? "active" : ""}`}>
                <item.icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className="sidebar-logout">
          <LogoutIcon />
          Sign out
        </button>

        <div className="sidebar-user">
          <div className="name">{displayName}</div>
          <div className="role">Student</div>
        </div>
      </aside>

      {/* ===== CONTENT ===== */}
      <div className="app-content">
        {children}
      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
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
      </nav>
    </div>
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
function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" />
    </svg>
  );
}
