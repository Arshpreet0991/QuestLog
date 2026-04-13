"use client";

import { DayProvider } from "@/context/DayContext";
import axios from "axios";
import { useEffect, useState } from "react";

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
    try {
      const prevDate = new Date(currentDate); // set date mutates the original object, therefore i have to make a copy of it
      prevDate.setDate(currentDate.getDate() - 1);

      const response = await axios.post("/api/dashboard/day", {
        currentDate: prevDate,
      });
      if (!response.data.success) return;

      const day = response.data.data;
      setDayId(day._id);
      setCurrentDate(prevDate);
    } catch (error) {
      console.error("prev day failed: ", error);
    }
  };
  const nextDay = async () => {
    try {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);

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
