"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useDate from "@/context/DateContext";
import toast from "react-hot-toast";

function CreateTaskComponent({ category }: { category: string }) {
  const { date, dayId } = useDate();
  date.setHours(0, 0, 0, 0);

  const [taskContent, setTaskContent] = useState("");

  const task = {
    content: taskContent,
    taskType: "sideQuest",
    category: category,
    dayId: dayId,
  };

  const addTask = async () => {
    console.log(task);
    const response = await axios.post("/api/dashboard/tasks", task);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="">
        <label htmlFor="createTask"></label>
        <input
          type="text"
          id="createTask"
          placeholder="Add Quests"
          className="bg-white text-black p-2 text-2xl rounded-l-sm flex-2"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
        />

        <button
          onClick={addTask}
          className=" bg-blue-500 px-2 py-2 text-2xl rounded-r-sm flex-1"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default CreateTaskComponent;
