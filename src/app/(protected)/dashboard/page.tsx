"use client";

import useCalculateStats from "@/hooks/useCalulateStats";
import { useRank } from "@/hooks/useRank";
import Rank from "@/components/RankMessage";
import DateNav from "@/components/DateNav";
import { useDayContext } from "@/context/DayContext";
import TaskContainerDashboard from "@/components/dashboardComponents/TaskContainerDashboard";
import DashboardContainerTop from "@/components/dashboardComponents/DashboardContainerTop";

function DashboardPage() {
  const { username } = useDayContext();

  const rank = useRank();
  return (
    <div className="flex flex-col justify-center items-center h-full bg-amber-100/30  ">
      {/* -----------------------------top half-------------------------- */}
      <DashboardContainerTop />

      {/* ----------------bottom half --------------- */}
      <div className="mt-auto w-full flex flex-col items-center h-3/4  p-1 justify-center">
        <TaskContainerDashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
