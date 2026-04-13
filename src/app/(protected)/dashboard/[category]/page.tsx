<<<<<<< HEAD
// this page is a server side component, because params is a promise, and async function cannot be client components

import TaskForm from "@/components/TaskForm";
=======
import CreateTaskComponent from "@/components/CreateTaskComponent";
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948

async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
<<<<<<< HEAD

  return (
    <>
      <TaskForm category={category} />
    </>
=======
  return (
    <div>
      <CreateTaskComponent category={category} />
    </div>
>>>>>>> 8e7c8f7c5c760652b3b39d0effa8921ce8dc5948
  );
}

export default CategoryPage;
