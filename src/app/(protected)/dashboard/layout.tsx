"use client";

import { DayProvider } from "@/context/DayContext";
import Link from "next/link";
import DateNav from "@/components/DateNav";
import { TaskProvider } from "@/context/TaskContext";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DayProvider>
      <TaskProvider>
        <div className="flex flex-col">{children}</div>
      </TaskProvider>
    </DayProvider>
  );
}
