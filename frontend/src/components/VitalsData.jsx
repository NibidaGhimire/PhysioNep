import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFire, BsHeartPulse, BsActivity, BsWind, BsDroplet } from "react-icons/bs";

const iconMap = {
  calorieSummary: <BsFire className="text-4xl text-[#ff80ab]" />,
  stepsSummary: <BsActivity className="text-4xl text-[#ff80ab]" />,
  heartSummary: <BsHeartPulse className="text-4xl text-[#ff80ab]" />,
  respirationSummary: <BsWind className="text-4xl text-[#ff80ab]" />,
  oxygenSummary: <BsDroplet className="text-4xl text-[#ff80ab]" />,
};

const labelMap = {
  calorieSummary: "Calories Burned",
  stepsSummary: "Steps Walked",
  heartSummary: "Heart Rate",
  respirationSummary: "Respiration Rate",
  oxygenSummary: "Oxygen Saturation",
};

const unitMap = {
  calorieSummary: "cal",
  stepsSummary: "steps",
  heartSummary: "bpm",
  respirationSummary: "breaths/min",
  oxygenSummary: "% SpO₂",
};


const hardcodedVitals = {
  heartSummary: 72,       
  respirationSummary: 16, 
  oxygenSummary: 98,      
};


const symbolMap = {
  calorieSummary: "🔥",
  stepsSummary: "🚶‍♂️",
  heartSummary: "❤️",
  respirationSummary: "🌬️",
  oxygenSummary: "💧",
};

const VitalsData = () => {
  const [vitals, setVitals] = useState(null);
  const [commonTimeFrame, setCommonTimeFrame] = useState({ start: null, end: null });

  const fetchVitals = async () => {
    try {
      const res = await axios.post("api/proxy-fetch");

      const caloriesData = res.data.calories;
      const stepsData = res.data.steps;

      const allEntries = [...(caloriesData ?? []), ...(stepsData ?? [])];
      if (allEntries.length === 0) {
        setCommonTimeFrame({ start: null, end: null });
      } else {
        const startTimes = allEntries.map((e) => new Date(e.start).getTime());
        const endTimes = allEntries.map((e) => new Date(e.end).getTime());
        setCommonTimeFrame({
          start: new Date(Math.min(...startTimes)),
          end: new Date(Math.max(...endTimes)),
        });
      }

      const summarizeCalories = () => {
        if (!Array.isArray(caloriesData) || caloriesData.length === 0) return null;
        const entry = caloriesData.at(-1);
        return entry.data?.energy?.inCalories.toFixed(2) ?? 0;
      };

      const summarizeSteps = () => {
        if (!Array.isArray(stepsData) || stepsData.length === 0) return null;
        return stepsData.reduce((sum, entry) => sum + (entry.data?.count ?? 0), 0);
      };

      setVitals({
        calorieSummary: summarizeCalories(),
        stepsSummary: summarizeSteps(),
        heartSummary: hardcodedVitals.heartSummary,
        respirationSummary: hardcodedVitals.respirationSummary,
        oxygenSummary: hardcodedVitals.oxygenSummary,
      });
    } catch (error) {
      console.error("Vitals fetch failed:", error.message);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  if (!vitals || !commonTimeFrame.start || !commonTimeFrame.end) return null;

  return (
    <div className="w-full p-6 rounded-xl bg-[#1e1e1e] shadow-inner shadow-black/30">
      <h2 className="text-3xl font-bold text-[#ff80ab] mb-8 text-center">Your Vitals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Object.entries(vitals).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center bg-[#2a2a2a] rounded-xl aspect-square p-6 shadow-md shadow-black/50 hover:bg-[#333] transition-colors duration-300"
          >
            <div className="text-6xl mb-4">{iconMap[key]}</div>
            <div className="text-5xl font-extrabold text-[#ff80ab] mb-2">
              {value} {unitMap[key]}
            </div>
            <div className="flex items-center gap-2 text-xl text-white mb-3">
              <span>{symbolMap[key]}</span>
              <span>{labelMap[key]}</span>
            </div>
            <div className="text-sm text-gray-400 text-center">
              {commonTimeFrame.start.toLocaleString()} → {commonTimeFrame.end.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitalsData;
