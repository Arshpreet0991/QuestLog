"use client";

function QuestTitleDisplay({
  taskType,
  category,
}: {
  taskType: string;
  category: string;
}) {
  return (
    <div className="bg-amber-950 flex items-center justify-center text-2xl text-amber-50  border-double border-black border-2 rounded-sm w-full max-w-lg mx-auto font-bold ... transition-all duration-300 shadow-[0_0_15px_5px_rgba(255,215,0,0.6)] cursor-pointer p-2">
      <div className="">Add Your {taskType} Quest</div>
      <div className="bg-amber-100 text-amber-950 border-2 border-double border-amber-950 "></div>
    </div>
  );
}

export default QuestTitleDisplay;
