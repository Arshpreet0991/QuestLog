"use client";

import { useDay } from "@/context/DayContext";
import Link from "next/link";
import { categoryStats } from "@/helpers/calculateTaskCompletion";

function DashboardPage() {
  const { date, prevDay, nextDay, taskList } = useDay();

  const stats = categoryStats(taskList);

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
          Body{" "}
          <p>
            {stats["body"]?.completed ?? 0} / {stats["body"]?.total ?? 0}
          </p>
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/mind"
        >
          Mind{" "}
          <p>
            {stats["mind"]?.completed ?? 0} / {stats["mind"]?.total ?? 0}
          </p>
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Wealth
          <p>
            {stats["wealth"]?.completed ?? 0} / {stats["wealth"]?.total ?? 0}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
