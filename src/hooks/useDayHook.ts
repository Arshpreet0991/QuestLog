import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ITask } from "@/types/Models.Types";

const today = new Date();
today.setHours(0, 0, 0, 0); // normalize the date to midnight

export function useDayHook() {
  // get today's date

  const [currentDate, setCurrentDate] = useState(today);
  const [dayId, setDayId] = useState("");
  const [username, setUsername] = useState("");
  const [streakCount, setStreakCount] = useState(0);

  // create todays day document

  const createDay = async () => {
    // create new day
    try {
      // previous date for streak logic
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const response = await axios.post("/api/dashboard/day", {
        currentDate,
        yesterday, // send yesterday for streak check
      });

      if (!response.data.success) {
        return console.error(response.data.error);
      }

      setDayId(response.data.data.day._id);
      setUsername(response.data.data.username);
      setStreakCount(response.data.data.streak);
    } catch (error) {
      return console.error(" day creation failed: ", error);
    }
  };

  // this will run automatically when the dashboard loads
  useEffect(() => {
    createDay();
  }, []);

  // previous day
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
      if (!response.data.success) {
        return console.error(
          "cannot fetch previous day, ",
          response.data.error,
        );
      }

      const day = response.data.data;

      if (!day) {
        console.error("cannot fetch previous day, ", response.data.error);
        return toast.error("No history found");
      }

      setDayId(day._id);
      setCurrentDate(prevDate);
    } catch (error) {
      return console.error("prevDay error: ", error);
    }
  };

  // next day
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

      if (!response.data.success) {
        return console.error("cannot fetch next day, ", response.data.error);
      }

      setDayId(response.data.data.day._id);
      setCurrentDate(nextDate);
    } catch (error) {
      return console.error("next day failed: ", error);
    }
  };
  return {
    currentDate,
    dayId,
    prevDay,
    nextDay,
    username,
    streakCount,
  };
}
