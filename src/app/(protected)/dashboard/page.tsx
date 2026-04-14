"use client";

import { useDay } from "@/context/DayContext";
import Link from "next/link";

function DashboardPage() {
  const { date, prevDay, nextDay } = useDay();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={prevDay}
        >
          Prev
        </button>
        <div className="text-2xl bg-white text-black p-1">
          {date.toDateString()}
        </div>
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={nextDay}
        >
          Next
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
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
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Relations
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
