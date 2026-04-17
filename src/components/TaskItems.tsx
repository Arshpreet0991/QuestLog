"use client";
import { useState } from "react";
import { Category, ITask } from "@/types/Models.Types";
import useTask from "@/hooks/useTask";
import ToggleComponent from "./ToggleComponent";

function TaskItems({ todo }: { todo: ITask }) {
  // get task crud from useTask
  const { deleteTask, taskComplete, updateTask } = useTask({ task: todo });

  const [taskTitle, setTaskTitle] = useState(todo.title);
  const [isTaskEditable, setIsTaskEditable] = useState(true);

  // edit task
  const editTask = () => {
    setIsTaskEditable(false); // just enable editing, don't save yet
  };

  const saveTask = () => {
    setIsTaskEditable(true); // disable editing
    updateTask(todo._id!, taskTitle); // now save
  };

  return (
    <>
      <div className="bg-amber-200 p-2 rounded-sm text-black text-xl flex justify-between">
        <div className="flex items-center">
          <button
            onClick={() => taskComplete(todo._id!)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
        ${todo.isCompleted ? "bg-green-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 
          ${todo.isCompleted ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          disabled={isTaskEditable}
          className={`${isTaskEditable ? "" : "bg-green-200 border-2 border-black px-2 rounded-sm"}`}
        />
        <button
          onClick={isTaskEditable ? editTask : saveTask}
          className="bg-amber-800 text-white p-2 rounded-sm"
        >
          {isTaskEditable ? "edit" : "save"}
        </button>
        <button
          className="bg-amber-800 text-white p-2 rounded-sm"
          onClick={() => deleteTask(todo._id!)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default TaskItems;
