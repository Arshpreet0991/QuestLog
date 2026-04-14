// this page is a server side component, because params is a promise, and async function cannot be client components

import TaskForm from "@/components/TaskForm";

async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <>
      <TaskForm category={category} />
    </>
  );
}

export default CategoryPage;
