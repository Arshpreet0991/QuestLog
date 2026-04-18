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
    <div className="flex flex-col">
      <nav className="bg-white text-2xl flex text-black p-1 w-full justify-left gap-5">
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/body"
        >
          Body
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/mind"
        >
          Mind
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Wealth
        </Link>
      </nav>
      <div className="">
        <DateNav />
      </div>
      {children}
    </div>
  );
}
