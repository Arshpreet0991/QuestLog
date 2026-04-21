"use client";

import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

function RankMessage({ rank }: { rank: string | undefined }) {
  let rankMessage = "";
  let fontColor = "";
  if (rank === "SSS") {
    rankMessage = "Supreme System Slayer";
    fontColor = "";
  }
  if (rank === "S") rankMessage = "Strategist";
  if (rank === "A") rankMessage = "Annihilator";
  if (rank === "B") rankMessage = "Breaker";
  if (rank === "C") rankMessage = "Chaser";
  if (rank === "D") rankMessage = "Drifter";
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center rounded-lg p-1">
        <div
          style={{
            fontFamily: "dmc",
            WebkitTextStroke: "",
            textShadow: "none",
          }}
          className={`rank-${rank?.toLowerCase()} text-4xl `}
        >
          {rankMessage}
        </div>
      </div>
    </>
  );
}

export default RankMessage;
