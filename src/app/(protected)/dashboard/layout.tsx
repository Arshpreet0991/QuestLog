"use client";

import { DayProvider } from "@/context/DayContext";
import Link from "next/link";
import DateNav from "@/components/DateNav";
import { TaskProvider } from "@/context/TaskContext";

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
            <Link
              className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
              href="/dashboard/wealth"
            >
              Logout
            </Link>
          </nav>

          {children}
        </div>
      </TaskProvider>
    </DayProvider>
  );
}
