import { useState } from "react";
import axios from "axios";

export function useDayHook() {
  // get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize the date to midnight

  const [currentDate, setCurrentDate] = useState(today);

  // create a day document
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
}
