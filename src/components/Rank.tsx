"use client";
import { useRank } from "@/hooks/useRank";

import React from "react";

function Rank({ rank }: { rank: string | undefined }) {
  let rankMessage = "";
  if (rank === "SSS") rankMessage = "Supreme System Slayer";
  if (rank === "S") rankMessage = "quest Strategist";
  if (rank === "A") rankMessage = "quest Annihilator";
  if (rank === "B") rankMessage = "quest Breaker";
  if (rank === "C") rankMessage = "quest Chaser";
  if (rank === "D") rankMessage = "Drifter";
  return (
    <>
      <div>{rank}</div>
      <div>{rankMessage}</div>
    </>
  );
}

export default Rank;
