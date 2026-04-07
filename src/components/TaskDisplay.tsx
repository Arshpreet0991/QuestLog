"use client";
import React from "react";
import { useState } from "react";
import CreateTaskComponent from "./CreateTaskComponent";

function TaskDisplay() {
  const [taskList, setTaskList] = useState([]);

  return (
    <>
      <div className="mt-15 border-2 border-red-400 flex flex-col items-center justify-center min-h-screen">
        <CreateTaskComponent />
      </div>
    </>
  );
}

export default TaskDisplay;
