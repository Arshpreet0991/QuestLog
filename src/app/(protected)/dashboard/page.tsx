"use client";

import Link from "next/link";
import useCalculateStats from "@/hooks/useCalulateStats";
import { useRank } from "@/hooks/useRank";
import Rank from "@/components/Rank";
import DateNav from "@/components/DateNav";
import CategoryDisplay from "@/components/CategoryDisplay";
import ProfileDisplay from "@/components/ProfileDisplay";
import { useDayContext } from "@/context/DayContext";

function DashboardPage() {
  const { bodyTaskStats, mindTaskStats, wealthTaskStats, overallStats } =
    useCalculateStats();

  const { username } = useDayContext();

  const rank = useRank();
  return (
    <div className="flex flex-col justify-center items-center h-full  ">
      {/* -----------------------------top half-------------------------- */}
      <div className="w-full flex items-center justify-between text-center ">
        <div className="flex-1">
          <ProfileDisplay username={username} />
        </div>
        <Rank rank={rank} />
        <div className="text-center flex-1 text-white font-bold">
          <span>Overall Progress</span>
          <span className="text-4xl flex-1">
            {overallStats.completed}/{overallStats.total}
          </span>
        </div>
      </div>

      {/* ----------------bottom half --------------- */}
      <div className="mt-auto w-full flex flex-col items-center h-3/4">
        <div className="w-full">
          <DateNav />
        </div>
        <div
          className=" flex flex-col items-center justify-center  w-11/12 h-full"
          style={{
            backgroundImage: "url('/bg-parchment-hd.png')",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="flex flex-col items-center justify-center min-w-10/12">
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
    </div>
  );
}

export default DashboardPage;
