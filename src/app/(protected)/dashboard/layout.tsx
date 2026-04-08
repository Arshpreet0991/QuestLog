"use client";
import { DateProvider } from "@/context/DateContext";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { Task } from "@/types/index";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  return (
    <div>
      <DateProvider value={{ date: currentDate, nextDay, prevDay, dayId }}>
        <nav className="bg-white text-black fixed top-0 left-0 w-full flex justify-between items-center p-1">
          <p className="bg-black text-white p-2 rounded-sm">Quest-Logger</p>
          <button>
            <Link href="/dashboard">home</Link>
          </button>
          <button>
            <Link href="/dashboard/mind">Mind</Link>
          </button>
          <button>
            <Link href="/dashboard/body">Body</Link>
          </button>
          <button>
            <Link href="/dashboard/wealth">Wealth</Link>
          </button>
          <button
            className="bg-black text-white p-2 rounded-sm"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </nav>
        {children}
      </DateProvider>
    </div>
  );
}
