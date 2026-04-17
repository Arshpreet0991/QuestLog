"use client";

import Link from "next/link";
import useCalculateStats from "@/hooks/useCalulateStats";
import { useRank } from "@/hooks/useRank";
import Rank from "@/components/Rank";

function DashboardPage() {
  const { bodyTaskStats, mindTaskStats, wealthTaskStats } = useCalculateStats();
  const rank = useRank();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex items-center justify-center text-3xl text-white">
        <Rank rank={rank} />
      </div>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/body"
        >
          Body {bodyTaskStats.completed}/{bodyTaskStats.total}
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/mind"
        >
          Mind {mindTaskStats.completed}/{mindTaskStats.total}
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Wealth {wealthTaskStats.completed}/{wealthTaskStats.total}
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
