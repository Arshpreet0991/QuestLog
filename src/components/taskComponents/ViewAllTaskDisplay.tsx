"use client";
import TaskItems from "@/components/TaskItems";
import { useTaskContext } from "@/context/TaskContext";
import CategoryIconDisplay from "./CategoryIconDisplay";
import DateDisplay from "./DateDisplay";

function ViewAllTaskDisplay() {
  const { taskList } = useTaskContext();

  const list = [...taskList].sort((a, b) => {
    // first sort by taskType — mainQuest first
    if (a.taskType === "mainQuest" && b.taskType !== "mainQuest") return -1;
    if (a.taskType !== "mainQuest" && b.taskType === "mainQuest") return 1;
    // then sort by category
    return a.category.localeCompare(b.category);
  });

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
