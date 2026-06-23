"use client";

import { ParentNav } from "@/components/ParentNav";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <ParentNav />
      <main className="student-main" style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 28px 80px" }}>
        {children}
      </main>
    </div>
  );
}
