import React from "react";

function ProgressRingDisplay({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : completed / total;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="100" height="100">
        {/* background ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#FEF3C7"
          strokeWidth="10"
        />
        {/* progress ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#22C55E"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      {/* text in center */}
      <div className="absolute text-white text-lg font-bold">
        <h1>
          {completed}/{total}
        </h1>
      </div>
    </div>
  );
}

export default ProgressRingDisplay;
