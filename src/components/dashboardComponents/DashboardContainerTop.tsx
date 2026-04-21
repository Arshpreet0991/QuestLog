"use client";
import useCalculateStats from "@/hooks/useCalulateStats";
import { useRank } from "@/hooks/useRank";
import Rank from "@/components/RankMessage";
import DateNav from "@/components/DateNav";
import { useDayContext } from "@/context/DayContext";
import ProgressRingDisplay from "./ProgressRingDisplay";
import StreakDisplay from "../taskComponents/StreakDisplay";

function DashboardContainerTop() {
  const { overallStats } = useCalculateStats();

  const { username } = useDayContext();

  const rank = useRank();
  return (
    <div className="flex flex-col  w-full   text-center bg-amber-950/70 gap-1">
      <DateNav />
      <div className="flex text-lg gap-1 ">
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <h1 className="">Streak</h1>
        </div>
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <h1>Rank</h1>
        </div>
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <h1>Progress</h1>
        </div>
      </div>
      <div className="flex gap-1">
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <StreakDisplay />
        </div>
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <div
            style={{ fontFamily: "dmc" }}
            className={`rank-${rank?.toLowerCase()} text-8xl`}
          >
            {rank}
          </div>
        </div>
        <div className="flex-1 border-2 border-amber-100 rounded-md">
          <ProgressRingDisplay
            completed={overallStats.completed}
            total={overallStats.total}
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 border-2 border-amber-100 rounded-md ">
          <Rank rank={rank} />
        </div>
      </div>
    </div>
  );
}

export default DashboardContainerTop;
