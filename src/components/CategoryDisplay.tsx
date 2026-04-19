"use client";

function CategoryDisplay({
  icon,
  category,
  stats,
  totalTasks,
}: {
  icon: string;
  category: string;
  stats: number;
  totalTasks: number;
}) {
  return (
    <div className="bg-amber-950 flex items-center justify-between text-2xl text-amber-50 p-1 border-double border-black border-2 rounded-sm w-full max-w-lg mx-auto font-bold ... transition-all duration-300 shadow-[0_0_15px_5px_rgba(255,215,0,0.6)] cursor-pointer ">
      <img src={icon} className="h-15  object-cover" />
      <div>{category}</div>
      <div className="bg-amber-100 text-amber-950 border-2 border-double border-amber-950 ">
        <div className=" flex h-14 w-14 rounded-sm items-center justify-center p-1">
          {stats}/{totalTasks}
        </div>
      </div>
    </div>
  );
}

export default CategoryDisplay;
