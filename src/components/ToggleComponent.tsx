"use client";

import React from "react";
import { useState } from "react";

function ToggleComponent({ isCompleted }: any) {
  const [enabled, setEnabled] = useState(isCompleted);
  return (
    <>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 
        ${enabled ? "bg-green-500" : "bg-gray-300"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 
          ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
    </>
  );
}

export default ToggleComponent;
