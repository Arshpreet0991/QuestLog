"use client";

import { DayProvider } from "@/context/DayContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);
  const [dayId, setDayId] = useState("");

  const createDay = async () => {
    try {
      const response = await axios.post("/api/dashboard/day", { currentDate });

      if (!response.data.success) return;
      const newDay = response.data.data;
      setDayId(newDay._id);
    } catch (error) {
      console.error(" day creation failed: ", error);
    }
  };

  useEffect(() => {
    createDay();
  }, []);

  const prevDay = async () => {
    const dayLimit = new Date(today);
    dayLimit.setDate(dayLimit.getDate() - 6);
    try {
      const prevDate = new Date(currentDate); // set date mutates the original object, therefore i have to make a copy of it
      prevDate.setDate(currentDate.getDate() - 1);

      if (prevDate.getTime() < dayLimit.getTime()) {
        toast.error("7 day limit reached");
        return;
      }

      const response = await axios.get("/api/dashboard/day/", {
        params: { date: prevDate },
      });
      if (!response.data.success) toast.error("No day history");

      const day = response.data.data;
      console.log(day);

      if (!day) {
        toast.error("No history found");
        return;
      }

      setDayId(day._id);
      setCurrentDate(prevDate);

      console.log("sending date: ", prevDate);
    } catch (error) {
      console.error("prevDay error: ", error);
      toast.error("No history found");
    }
  };
  const nextDay = async () => {
    const dayLimit = new Date(today);
    dayLimit.setDate(dayLimit.getDate() + 6);
    try {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);

      if (nextDate.getTime() > dayLimit.getTime()) {
        toast.error("7 day limit reached");
        return;
      }

      const response = await axios.post("/api/dashboard/day", {
        currentDate: nextDate,
      });
      if (!response.data.success) return;

      const day = response.data.data;
      setDayId(day._id);
      setCurrentDate(nextDate);
    } catch (error) {
      console.error("prev day failed: ", error);
    }
  };

  return (
    <DayProvider
      value={{ date: currentDate, nextDay, prevDay, createDay, dayId }}
    >
      <nav className="bg-white text-2xl fixed top-0 flex text-black p-1 w-full justify-between">
        <button className="bg-amber-100 p-1 rounded-sm">Home</button>
        <button className="bg-amber-100 p-1 rounded-sm">Body</button>
        <button className="bg-amber-100 p-1 rounded-sm">Mind</button>
        <button className="bg-amber-100 p-1 rounded-sm">Wealth</button>
        <button className="bg-amber-100 p-1 rounded-sm">Relationships</button>
        <button className="bg-amber-100 p-1 rounded-sm">Logout</button>
      </nav>

      {children}
    </DayProvider>
  );
}
