"use client";
import { Stats } from "@/app/(protected)/dashboard/stats/page";
import { useState } from "react";

function StatsItems({ statsObj }: { statsObj: Stats }) {
  const [showNotes, setShowNotes] = useState(false);
  return (
    <div className="grid grid-cols-3 gap-1 w-full mb-1 text-amber-100 text-lg">
      <div className="bg-amber-950 border border-amber-700 rounded-sm p-2 text-center">
        {new Date(statsObj.date).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </div>
      <div className="bg-amber-950 border border-amber-700 rounded-sm p-2 text-center">
        {statsObj.score}%
      </div>
      <div className="bg-amber-950 border border-amber-700 rounded-sm p-2 text-center">
        <button
          className="text-amber-300 hover:text-amber-100 transition-colors"
          onClick={() => setShowNotes(true)}
        >
          📜 Notes
        </button>
      </div>
      {showNotes && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowNotes(false)}
        >
          <div
            className="bg-amber-950 border border-amber-700 rounded-sm p-4 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-amber-100">
              {statsObj.reflection || "No notes for this day"}
            </p>
            <button
              onClick={() => setShowNotes(false)}
              className="mt-4 text-amber-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsItems;
