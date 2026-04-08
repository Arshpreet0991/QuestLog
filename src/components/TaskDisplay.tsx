"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Task } from "@/types/index";

function TaskDisplay({ dayId }: { dayId: string }) {
  const [taskList, setTaskList] = useState<Task[]>([]);

  async function showTasks() {
    try {
      const response = await axios.get("/api/dashboard/tasks", {
        params: { dayId },
      });

      if (response.data.success) {
        setTaskList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching the task list: ", error);
    }
  }

  useEffect(() => {
    if (!dayId) return;

    showTasks();
  }, [dayId]);

  return (
    <>
      <div className="mt-15 border-2 border-red-400 flex flex-col items-center justify-center min-h-screen">
        <div>
          <ul className="bg-gray-400 p-4">
            {taskList.map((task) => (
              <li className="bg-amber-600 text-2xl" key={task._id}>
                {task.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TaskDisplay;
