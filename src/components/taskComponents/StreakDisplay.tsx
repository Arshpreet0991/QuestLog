"use client";
import { useDayContext } from "@/context/DayContext";

function StreakDisplay() {
  const { streakCount } = useDayContext();

  return (
    <div
      style={{
        fontFamily: "dmc",
        WebkitTextStroke: "",
        textShadow: "none",
      }}
      className="text-center"
    >
      <p className="text-8xl">{streakCount}</p>
    </div>
  );
}

export default StreakDisplay;
