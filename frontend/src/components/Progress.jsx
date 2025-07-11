import { goals } from "../constants";

const Progress = () => {
  return (
    <div className="w-full min-h-screen rounded-2xl bg-[#1c1c1e] p-8 shadow-inner shadow-black/50 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-bold text-[#ff80ab] text-3xl tracking-tight">Your Progress</h1>
        <h1 className="font-bold text-[#ff80ab] text-3xl tracking-tight">Your Notes</h1>
      </div>

      {/* Progress stats & notes */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Progress cards */}
        <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
          <div className="flex flex-col bg-[#262629] px-8 py-6 rounded-2xl shadow-md shadow-pink-500/20 w-56 transition-all duration-300 hover:scale-105">
            <p className="text-gray-400 text-base text-center">Daily Streak</p>
            <p className="text-[#ff80ab] text-6xl text-center font-bold drop-shadow-pink-500">2</p>
            <p className="text-gray-500 text-center text-sm">days</p>
          </div>

          <div className="flex flex-col bg-[#262629] px-8 py-6 rounded-2xl shadow-md shadow-pink-500/20 w-56 transition-all duration-300 hover:scale-105">
            <p className="text-gray-400 text-base text-center">Total Time Exercised</p>
            <p className="text-[#ff80ab] text-4xl text-center font-bold">05:29</p>
            <div className="flex justify-between text-gray-500 text-sm mt-2 px-1">
              <span>min</span>
              <span>sec</span>
            </div>
          </div>
        </div>

        {/* Notes area */}
        <textarea
          className="w-full md:w-1/2 h-48 bg-[#262629] p-4 rounded-2xl shadow-md shadow-pink-500/20 text-gray-200 text-base placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#ff80ab] transition-all duration-300"
          placeholder="Write your notes here..."
        ></textarea>
      </div>

      {/* Goals section */}
      <div>
        <h2 className="font-bold text-[#ff80ab] text-3xl tracking-tight">Your Goals</h2>
        <ul className="flex flex-col gap-4 mt-4">
          {goals.map((goal, index) => (
            <li
              key={index}
              className="flex items-center gap-3 px-5 py-4 bg-[#262629] rounded-2xl shadow-sm shadow-pink-500/10 transition-all duration-300 hover:bg-[#333336]"
            >
              <input
                type="checkbox"
                className="accent-[#ff80ab] w-5 h-5 rounded focus:ring-2 focus:ring-[#ff80ab]"
              />
              <p className="text-gray-300 text-base">{goal}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Progress;
