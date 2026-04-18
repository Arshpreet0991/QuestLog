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
        <div className="flex flex-col">
          <nav className="bg-white text-2xl flex text-black p-1 w-full justify-end">
            <button
              className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
            >
              Logout
            </button>
          </nav>

          {children}
        </div>
      </TaskProvider>
    </DayProvider>
  );
}
