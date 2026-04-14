"use client";
import { useState } from "react";
import { ITask } from "@/types/Models.Types";

function TaskItems({
  todo,
  updateTask,
  taskComplete,
  deleteTask,
}: {
  todo: ITask;
  updateTask: any;
  taskComplete: any;
  deleteTask: any;
}) {
  const [task, setTask] = useState(todo.task);
  const [isTaskEditable, setIsTaskEditable] = useState(true);
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  // edit task
  const editTask = () => {
    setIsTaskEditable(false); // just enable editing, don't save yet
  };

  const saveTask = () => {
    setIsTaskEditable(true); // disable editing
    updateTask(todo._id, task); // now save
  };

  // toggle task

  const toggleTaskStatus = () => {
    // console.log("todo status in items: ", todo.isCompleted);

    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    taskComplete(todo._id, newStatus);
  };

  // delete task

  return (
    <>
      <div className="bg-amber-200 p-2 rounded-sm text-black text-xl flex justify-between">
        <button
          className={` text-white p-2 rounded-sm ${isCompleted ? "bg-green-700" : "bg-red-500"}`}
          onClick={toggleTaskStatus}
        >
          {isCompleted ? "completed" : "pending"}
        </button>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
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
          onClick={() => deleteTask(todo._id)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default TaskItems;
