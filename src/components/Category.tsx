import React from "react";

type CategoryProps = {
  children: React.ReactNode;
};

function Category({ children }: CategoryProps) {
  return (
    <div className="bg-yellow-700 p-4 text-white text-5xl rounded-sm w-full text-center italic">
      {children}
    </div>
  );
}

export default Category;
