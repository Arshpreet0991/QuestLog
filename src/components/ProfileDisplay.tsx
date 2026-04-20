import React from "react";

function ProfileDisplay({ username }: { username: string }) {
  return (
    <div className=" p-1">
      <div className="text-white font-bold">
        <h2 className="">Welcome! </h2>
        <span className="text-3xl">{username}</span>
      </div>
    </div>
  );
}

export default ProfileDisplay;
