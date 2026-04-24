"use client";
import TaskForm from "@/components/TaskForm";
import { Category } from "@/types/Models.Types";
import TaskItems from "@/components/TaskItems";
import { useParams } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import CategoryDisplay from "@/components/CategoryDisplay";
import useCalculateStats from "@/hooks/useCalulateStats";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as Category;

  const { taskList } = useTaskContext();
  const { bodyTaskStats, mindTaskStats, wealthTaskStats } = useCalculateStats();

  // filter tasklist by category
  const taskListCategory = taskList.filter(
    (task) => task.category === category,
  );

  return (
    <>
      <TaskForm category={category} />
      <div>
        {taskListCategory.map((task) => (
          <div key={task._id}>
            <TaskItems todo={task} />
          </div>
        ))}
      </div>
    </>
  );
}
