import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";

function AddTaskDashboard() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-amber-950 text-2xl">No Quests added for this day</p>
      <Link className="text-9xl text-amber-950" href="/dashboard/body">
        <IoMdAddCircle />
      </Link>
      <p className="text-amber-950 text">Add Quests</p>
    </div>
  );
}

export default AddTaskDashboard;
