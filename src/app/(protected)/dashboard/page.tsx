"use client";

import Link from "next/link";
import useCalculateStats from "@/hooks/useCalulateStats";
import { useRank } from "@/hooks/useRank";
import Rank from "@/components/Rank";
import DateNav from "@/components/DateNav";
import CategoryDisplay from "@/components/CategoryDisplay";

function DashboardPage() {
  const { bodyTaskStats, mindTaskStats, wealthTaskStats, overallStats } =
    useCalculateStats();

  const rank = useRank();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  ">
      <div>
        <DateNav />
      </div>

      <div>
        Overall Progress: {overallStats.completed}/{overallStats.total}
      </div>
      <div className="flex items-center justify-center text-3xl text-white">
        <Rank rank={rank} />
      </div>
      <div
        className=" flex flex-col items-center justify-center border-2 border-white min-w-3/12 py-20 px-15"
        style={{
          backgroundImage: "url('/bg-parchment-hd.png')",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col gap-5 items-center justify-center mt-10 border-2 border-red-600 w-full">
          <Link
            className=" text-4xl text-white p-2 w-full rounded-sm text-center flex justify-between items-center flex-wrap "
            href="/dashboard/body"
          >
            <CategoryDisplay
              category="Body"
              icon="/icon-body.webp"
              stats={bodyTaskStats.completed}
              totalTasks={bodyTaskStats.total}
            />
          </Link>
          <Link
            className="text-4xl text-white p-2 w-full rounded-sm text-center flex justify-between items-center flex-wrap  "
            href="/dashboard/mind"
          >
            <CategoryDisplay
              category="mind"
              icon="/icon-mind.webp"
              stats={mindTaskStats.completed}
              totalTasks={mindTaskStats.total}
            />
          </Link>
          <Link
            className="text-4xl text-white p-2 w-full rounded-sm text-center flex justify-between items-center flex-wrap  "
            href="/dashboard/wealth"
          >
            <CategoryDisplay
              category="wealth"
              icon="/icon-wealth.webp"
              stats={wealthTaskStats.completed}
              totalTasks={wealthTaskStats.total}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
