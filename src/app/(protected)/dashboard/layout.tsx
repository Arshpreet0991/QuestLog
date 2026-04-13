"use client";
<<<<<<< HEAD

import { DayProvider } from "@/context/DayContext";
import axios from "axios";
import { useEffect, useState } from "react";

=======
import { DateProvider } from "@/context/DateContext";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { Task } from "@/types/index";
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState(today);
<<<<<<< HEAD
  const [dayId, setDayId] = useState("");

  const createDay = async () => {
    try {
      const response = await axios.post("/api/dashboard/day", { currentDate });

      if (!response.data.success) return;
      const newDay = response.data.data;
      setDayId(newDay._id);
    } catch (error) {
      console.error(" day creation failed: ", error);
=======

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
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
    }
  };

  useEffect(() => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
  );
}
