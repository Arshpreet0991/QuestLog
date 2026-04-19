"use client";

import { DayProvider } from "@/context/DayContext";
import Link from "next/link";
import DateNav from "@/components/DateNav";
import { TaskProvider } from "@/context/TaskContext";
import NavBarComponent from "@/components/NavBarComponent";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <NavBarComponent />
      <div className="">
        <DateNav />
      </div>
      {children}
    </div>
  );
}
