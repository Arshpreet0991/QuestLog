"use client";
import { useRef, useState } from "react";
import useReflection from "@/hooks/useReflection";

function ReflectionForm() {
  const [reflection, setReflection] = useState("");

  const { addNotes, fetchNotes } = useReflection();

  const handleReflectionSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    addNotes(reflection);
    fetchNotes();
  };

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleReflectionSubmit}>
        <label htmlFor="wentRight">Add Notes for the day</label>
        <textarea
          id="wentRight"
          className="bg-white p-1 rounded-sm w-full text-black min-h-24"
          placeholder="what can be improved upon"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
        <button className="bg-green-500 text-xl px-2 py-1 text-center">
          Save
        </button>
      </form>
    </div>
  );
}

export default ReflectionForm;
