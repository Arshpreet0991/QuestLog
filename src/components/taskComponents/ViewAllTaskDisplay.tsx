"use client";
import TaskItems from "@/components/TaskItems";
import { useTaskContext } from "@/context/TaskContext";
import CategoryIconDisplay from "./CategoryIconDisplay";
import DateDisplay from "./DateDisplay";

function ViewAllTaskDisplay() {
  const { taskList } = useTaskContext();

  const list = taskList.sort((a, b) => a.category.localeCompare(b.category));

  return (
    <>
      <div>
        <DateDisplay />
        {list.map((task) => (
          <div
            key={task._id}
            className="flex items-center justify-between gap-2 p-1"
          >
            <CategoryIconDisplay category={task.category} />
            <TaskItems todo={task} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ViewAllTaskDisplay;
