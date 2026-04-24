"use client";
import { useState } from "react";

const sections = [
  {
    icon: "⚔️",
    title: "This Is Not a To-Do List",
    content:
      "The Main Quest is a habit builder, not a task manager. The goal is not to check off boxes — it is to build discipline through consistent daily action. Every quest you complete is a rep. Reps compound over time.",
  },
  {
    icon: "👑",
    title: "The Main Quest — Your Most Valuable Task",
    content:
      "Apply the 80/20 rule. One task in each category will have more impact than all others combined. That is your Main Quest. It should be the hardest, most important thing you can do today. Add it first. Complete it first.",
  },
  {
    icon: "🏆",
    title: "Ranks — Your Progress Mirror",
    content:
      "Your rank reflects how much you completed today. Complete your Main Quest to reach at least B rank. Push further with side quests to climb toward S and SSS. Your rank resets daily — every day is a fresh battle.",
  },
  {
    icon: "📅",
    title: "Plan 7 Days Ahead",
    content:
      "You can plan up to 7 days in advance. Use this. Set your quests the night before or in the morning before your day begins. A planned day is a won day. An unplanned day is a lost one.",
  },
  {
    icon: "🌱",
    title: "Three Categories, One Life",
    content:
      "Body. Mind. Wealth. These three areas compound on each other. Small daily improvements in each — even one task per category — build into massive change over months. Consistency over intensity.",
  },
  {
    icon: "📜",
    title: "The Two Most Important Habits",
    content:
      "First: add your quests before your day begins. Plan the night before or first thing in the morning. Second: reflect at the end of each day. What went right? What needs work? These two habits are the engine of the entire system.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-4 py-8"
      style={{
        background: "radial-gradient(ellipse at top, #1c0a00 0%, #000000 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <p
          className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: "var(--font-im-fell)" }}
        >
          Adventurer's Codex
        </p>
        <h1
          className="text-5xl text-amber-300 mb-3"
          style={{
            fontFamily: "dmc",
            textShadow:
              "0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,165,0,0.3)",
          }}
        >
          How It Works
        </h1>
        <div className="w-32 h-px bg-amber-700 mx-auto" />
      </div>

      {/* Accordion sections */}
      <div className="w-full max-w-lg flex flex-col gap-3">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-sm overflow-hidden border border-amber-900"
            style={{
              background:
                openIndex === index
                  ? "radial-gradient(circle, #92400e 0%, #1c0a00 100%)"
                  : "radial-gradient(circle, #57200a 0%, #1c0800 100%)",
            }}
          >
            {/* Header button */}
            <button
              className="w-full flex items-center justify-between p-4 text-left"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.icon}</span>
                <span
                  className="text-amber-100 text-lg font-bold"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  {section.title}
                </span>
              </div>
              <span className="text-amber-400 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Content */}
            {openIndex === index && (
              <div className="px-4 pb-4">
                <div className="w-full h-px bg-amber-800 mb-3" />
                <p
                  className="text-amber-200 text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-im-fell)" }}
                >
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 text-center">
        <p
          className="text-amber-700 text-sm italic"
          style={{ fontFamily: "var(--font-im-fell)" }}
        >
          "Small deeds done are better than great deeds planned."
        </p>
      </div>
    </div>
  );
}
