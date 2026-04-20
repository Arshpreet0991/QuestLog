"use client";

import { Bebas_Neue } from "next/font/google";
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

function Rank({ rank }: { rank: string | undefined }) {
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
      <div className="flex flex-col items-center justify-center text-center bg-amber-950 p-1 border-2 border-double rounded-lg border-amber-200">
        <div>
          <h2 className="font-bold">Current Rank</h2>
        </div>
        <div
          style={{ fontFamily: "dmc" }}
          className={`rank-${rank?.toLowerCase()} text-8xl`}
        >
          {rank}
        </div>
        <div
          style={{
            fontFamily: "dmc",
            WebkitTextStroke: "1px black",
            textShadow: "none",
          }}
          className={`rank-${rank?.toLowerCase()} text-4xl`}
        >
          {" "}
          {rankMessage}{" "}
        </div>
      </div>
    </>
  );
}

export default Rank;
