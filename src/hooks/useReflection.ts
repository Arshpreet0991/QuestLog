import { useDayContext } from "@/context/DayContext";
import axios from "axios";
import { useState } from "react";

function useReflection() {
  const { dayId } = useDayContext();

  // add notes
  const addNotes = async (reflectionText: string) => {
    try {
      const response = await axios.post("/api/dashboard/reflect", {
        dayId,
        reflectionText,
      });
      const data = response.data.data;
      console.log(data);
    } catch (error) {
      return console.error("error adding the reflection notes", error);
    }
  };

  // fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/dashboard/reflect", {
        params: { dayId },
      });
      const data = response.data.data;
      return data.reflection;
    } catch (error) {
      return console.error("error adding the reflection notes", error);
    }
  };
  return { addNotes, fetchNotes };
}

export default useReflection;
