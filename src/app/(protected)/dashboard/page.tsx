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
    <div className="flex flex-col  items-center h-full bg-linear-to-b from-amber-950 to-amber-100/50">
      {/* -----------------------------top half-------------------------- */}
      <DashboardContainerTop />

      {/* ----------------bottom half --------------- */}
      <div className="w-full flex flex-col p-1 mt-4 h-full">
        <TaskContainerDashboard />
      </div>
    </div>
  );
}

export default DashboardPage;
