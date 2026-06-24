"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (profile?.role === "parent") {
      router.replace("/parent");
    } else {
      router.replace("/student");
    }
  }, [user, profile, loading, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: "2.5px solid var(--hairline)",
            borderTopColor: "var(--terracotta)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: "var(--ink-muted)", fontSize: 14 }}>Loading your dashboard...</p>
      </div>
    </div>
  );
}
