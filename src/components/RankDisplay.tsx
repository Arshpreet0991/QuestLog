"use client";
import React from "react";
import { useState } from "react";

function RankDisplay() {
  const [rank, SetRank] = useState("D");
  return <div className="bg-white text-5xl text-black p-4">Rank {rank}</div>;
}

export default RankDisplay;
