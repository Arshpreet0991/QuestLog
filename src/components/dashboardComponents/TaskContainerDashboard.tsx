"use client";
import { useTaskList } from "@/hooks/useTaskList";
import AddTaskDashboard from "./AddTaskDashboard";
import ShowMainQuestDashboard from "./ShowMainQuestDashboard";

function TaskContainerDashboard() {
  const { taskList } = useTaskList();
  return (
    <div
      className=" flex flex-col items-center justify-center  w-full"
      // style={{
      //   backgroundImage: "url('/bg-parchment-hd.png')",
      //   backgroundSize: "100% 100%",
      // }}
    >
      <div className="w-full">
        {taskList.length === 0 ? (
          <AddTaskDashboard />
        ) : (
          <ShowMainQuestDashboard />
        )}
      </div>
    </div>
  );
}

export default TaskContainerDashboard;
