"use client";
import React from "react";
import ToggleComponent from "./ToggleComponent";
import { useState } from "react";
import { Task } from "@/types";
import axios from "axios";
import { log } from "console";

function ListItem({
  taskList,
  setTaskList,
}: {
  taskList: Task[];
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [editEnabled, setEditEnabled] = useState(true);

  const toggleTaskComplete = async (taskId: string) => {
    const update = taskList.map((eachVal) => {
      if (eachVal._id === taskId) {
        return { ...eachVal, isCompleted: !eachVal.isCompleted };
      } else return eachVal;
    });
    console.log(update);

    setTaskList(update);
    try {
      await axios.patch(`/api/dashboard/tasks/${taskId}`, {
        isCompleted: !taskList.find((t) => t._id === taskId)?.isCompleted,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editTaskContent = (taskId: string, content: string) => {
    taskList.map((task) => {
      if (task._id === taskId) {
        return { ...task, content: task.content };
      } else return task;
    });
  };

  return (
    <>
      <ul className="bg-gray-700 p-2 flex flex-col gap-2">
        {taskList.map((task: Task) => (
          <li
            className="bg-amber-100 text-black p-2 rounded-sm flex gap-2 justify-between text-4xl items-center"
            key={task._id}
          >
            {task.content}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={task.isCompleted}
                onChange={() => toggleTaskComplete(task._id)}
              />
              <div className="w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
            </label>
            <button> {editEnabled ? "✏️" : "💾"}</button>
            {/* <button> 💾</button> */}
            <button> ❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListItem;
