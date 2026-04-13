"use client";
<<<<<<< HEAD

import { useDay } from "@/context/DayContext";
import Link from "next/link";

function DashboardPage() {
  const { date, prevDay, nextDay } = useDay();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={prevDay}
        >
          Prev
        </button>
        <div className="text-2xl bg-white text-black p-1">
          {date.toDateString()}
        </div>
        <button
          className="bg-blue-500 text-black p-2 rounded-sm"
          onClick={nextDay}
        >
          Next
        </button>
      </div>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/body"
        >
          Mind
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/mind"
        >
          Body
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Wealth
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Relations
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;
=======
import React, { useEffect } from "react";
import Category from "@/components/Category";
import ImageBox from "@/components/ImageBox";
import NavButtons from "@/components/NavButtons";
import DateDisplay from "@/components/DateDisplay";
import RankDisplay from "@/components/RankDisplay";
import useDate, { DateProvider } from "@/context/DateContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Dashboard() {
  /*
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);

  const [dayId, setDayId] = useState("");

  const createToday = async () => {
    const res = await axios.post("/api/dashboard/day", {
      date: currentDate.toISOString(),
    });
    if (res.data.success) {
      setCurrentDate(currentDate);

      setDayId(res.data.data._id);
      console.log("day id: ", dayId);
    } else {
      toast.error("Error Loading the Day");
    }
  };

  useEffect(() => {
    createToday();
  }, []);

  const nextDay = async () => {
    try {
      const next = new Date(currentDate);
      next.setHours(0, 0, 0, 0);
      next.setDate(currentDate.getDate() + 1);

      const res = await axios.post("/api/dashboard/day", { date: next });
      if (res.data.success) {
        setCurrentDate(next);
        setDayId(res.data.data._id);
      } else {
        console.error("Next day document not created");
      }
    } catch (error) {
      console.error(error);
      toast.error("Max 7 days ahead");
    }
  };

  const prevDay = async () => {
    try {
      const prev = new Date(currentDate);
      prev.setHours(0, 0, 0, 0);
      prev.setDate(currentDate.getDate() - 1);
      const res = await axios.get("/api/dashboard/day", {
        params: { date: prev },
      });

      if (res.data.success) {
        setCurrentDate(prev);
        setDayId(res.data.data._id);
      } else {
        toast.error("No history found");
      }
    } catch (error) {
      console.error(error);
      toast.error("No tasks history found");
    }
  };

  */

  const { nextDay, prevDay } = useDate();
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center">
        <div className="flex justify-between items-center p-2">
          <ImageBox />
          <RankDisplay />
        </div>
        <div className="flex items-center justify-between m-5">
          <NavButtons children="◀" fn={prevDay} />
          <DateDisplay />
          <NavButtons children="▶" fn={nextDay} />
        </div>
        <div className="flex flex-col gap-5">
          <Link href="/dashboard/body">
            <Category children="BODY" />
          </Link>
          <Link href="/dashboard/mind">
            <Category children="MIND" />
          </Link>
          <Link href="/dashboard/wealth">
            <Category children="WEALTH" />
          </Link>
        </div>
      </div>
    </>
  );
}
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
