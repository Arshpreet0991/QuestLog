import React from "react";

function CategoryIconDisplay({ category }: { category: string }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center rounded-sm">
        <img
          className="h-20 w-20 object-contain"
          src={`/icon-${category}.png`}
        />
      </div>
    </div>
  );
}

export default CategoryIconDisplay;
