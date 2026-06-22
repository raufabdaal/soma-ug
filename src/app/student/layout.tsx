"use client";

import { StudentNav } from "@/components/StudentNav";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <StudentNav />
      <main className="student-main" style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 28px 80px" }}>
        {children}
      </main>
    </div>
  );
}
