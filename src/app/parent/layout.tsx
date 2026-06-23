"use client";

import { ParentNav } from "@/components/ParentNav";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <ParentNav>{children}</ParentNav>;
}
