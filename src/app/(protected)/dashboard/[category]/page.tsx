import CreateTaskComponent from "@/components/CreateTaskComponent";

async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <CreateTaskComponent category={category} />
    </div>
  );
}

export default CategoryPage;
