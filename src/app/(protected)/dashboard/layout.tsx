"use client";

import { DayProvider } from "@/context/DayContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ITask } from "@/types/Models.Types";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);
  const [dayId, setDayId] = useState("");
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const createDay = async () => {
    try {
      const response = await axios.post("/api/dashboard/day", { currentDate });

      if (!response.data.success) return;
      const newDay = response.data.data;
      setDayId(newDay._id);
      await fetchAllTasks(newDay._id);
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

  // fetch all tasks
  const fetchAllTasks = async (id: string) => {
    const response = await axios.get("/api/dashboard/tasks", {
      params: { dayId: id },
    });
    if (response.data.success) setTaskList(response.data.data);
  };

  useEffect(() => {
    if (!dayId) return;
    fetchAllTasks(dayId);
  }, [dayId]);

  return (
    <DayProvider
      value={{
        date: currentDate,
        nextDay,
        prevDay,
        createDay,
        dayId,
        taskList,
        setTaskList,
      }}
    >
      <nav className="bg-white text-2xl fixed top-0 flex text-black p-1 w-full justify-between">
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard"
        >
          Home
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/body"
        >
          Body
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/mind"
        >
          Mind
        </Link>
        <Link
          className="bg-orange-600 text-2xl text-white p-2 w-3xs rounded-sm text-center font-bold"
          href="/dashboard/wealth"
        >
          Wealth
        </Link>
      </nav>

      {children}
    </DayProvider>
  );
}
