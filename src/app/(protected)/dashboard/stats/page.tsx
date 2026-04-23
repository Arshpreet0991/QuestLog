"use client";
import StatsItems from "@/components/taskComponents/StatsItems";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Stats = {
  id: string;
  reflection: string;
  date: string;
  score: number;
};

function StatsPage() {
  const [stats, setStats] = useState<Stats[]>([]);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/api/dashboard/stats");
      if (response.data.success) setStats(response.data.data);
      return toast.success("Stats fetched");
    } catch (error) {
      return toast.error("Failed to Fetch Stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <div>
        {/* header */}
        <div className="grid grid-cols-3 gap-1 w-full mb-2 text-amber-400 text-sm font-bold uppercase tracking-widest">
          <div className="text-center">Date</div>
          <div className="text-center">Completion Rate</div>
          <div className="text-center">Notes</div>
        </div>

        {stats.map((statsObj) => (
          <div key={statsObj.id}>
            <StatsItems statsObj={statsObj} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsPage;
