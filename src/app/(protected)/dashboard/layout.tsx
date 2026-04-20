"use client";

import { DayProvider } from "@/context/DayContext";
import Link from "next/link";
import DateNav from "@/components/DateNav";
import { TaskProvider } from "@/context/TaskContext";
import { signOut } from "next-auth/react";
import NavBarComponent from "@/components/NavBarComponent";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DayProvider>
      <TaskProvider>
        <div className="w-full min-h-screen flex flex-col max-w-xl mx-auto">
          <NavBarComponent />
          <div className="flex-1 flex flex-col">{children}</div>
        </div>
      </TaskProvider>
    </DayProvider>
  );
}
