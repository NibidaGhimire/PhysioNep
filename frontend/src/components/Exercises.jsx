import { useState } from "react";
import SearchInput from "./SearchInput";
import Exercise from "./Exercise";
import SavedExercises from "./SavedExercises";
import { logo } from "../assets";

const Exercises = () => {
  const [active, setActive] = useState({
    exercises: true,
    savedExercises: false,
  });

  return (
    <div className="w-full rounded-2xl bg-[#1a1a1a] px-8 shadow-md shadow-black/40 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#121212] rounded-xl shadow-md shadow-black/30">
        <div className="flex items-center gap-4 select-none">
          <img
            src={logo}
            alt="PhysioNep"
            className="w-10 h-10 rounded-full saturate-75 shadow-[0_0_8px_#ff80ab]/30"
          />
          <h1 className="text-2xl font-semibold text-white tracking-wide">
            PhysioNep
          </h1>
        </div>

        {/* Search input with smaller softer pink button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="rounded-l-md px-4 py-2 w-64 bg-[#222222] text-white placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <button className="bg-[var(--color-primary)] rounded-r-md px-4 py-2 hover:bg-pink-500 transition text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex max-w-md bg-[#1e1e1e] rounded-full overflow-hidden mt-4 shadow-inner shadow-black/30">
        <button
          onClick={() => setActive({ exercises: true, savedExercises: false })}
          className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 rounded-full ${
            active.exercises
              ? "bg-[var(--color-primary)] text-black shadow-[0_0_10px_#ff80ab]/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Exercises
        </button>
        <button
          onClick={() => setActive({ exercises: false, savedExercises: true })}
          className={`flex-1 py-3 text-sm font-semibold transition-all duration-300 rounded-full ${
            active.savedExercises
              ? "bg-[var(--color-primary)] text-black shadow-[0_0_10px_#ff80ab]/40"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Saved Exercises
        </button>
      </div>

      {/* Content */}
      <div className="overflow-auto max-h-[72vh]">
        {active.exercises && <Exercise />}
        {active.savedExercises && <SavedExercises />}
      </div>
    </div>
  );
};

export default Exercises;
