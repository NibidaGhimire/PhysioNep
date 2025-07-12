import { useEffect, useState } from "react";
import axios from "axios";

const SummaryGenerator = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndSummarize = async () => {
      try {
        const res = await axios.post("api/proxy-fetch");

        const { calories, steps, heart, respiration, oxygen } = res.data;

        const buildArray = (arr, pick) =>
          (Array.isArray(arr) ? arr : []).map((e) => ({
            start: e.start,
            end: e.end,
            value: pick(e),
          }));

        const calorieSummary = buildArray(
          calories,
          (e) => e.data?.energy?.inCalories ?? 0
        );
        const stepsSummary = buildArray(steps, (e) => e.data?.count ?? 0);
        const heartSummary = buildArray(heart, (e) => e.data?.count ?? 0);
        const respirationSummary = buildArray(
          respiration,
          (e) => e.data?.count ?? 0
        );
        const oxygenSummary = buildArray(oxygen, (e) => e.data?.count ?? 0);

        const prompt = `
You are a virtual medical assistant summarizing fitness vitals for a physiotherapy patient. Write ONE concise paragraph highlighting trends over the past week (no lists, no disclaimers).

Active Calories Burned:
${calorieSummary
  .map((e) => `From ${e.start} to ${e.end}: ${e.value.toFixed(2)} cal`)
  .join("\n")}
Steps walked:
${stepsSummary
  .map((e) => `From ${e.start} to ${e.end}: ${e.value} steps`)
  .join("\n")}
Heart Rate: 72 beats per minute
Respiration: 16 breath per minute
SpO₂: 98% spo2
`;

        const gemini = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBcRlRlZAmK7QkvYQBsW6mHGMkAmmOREGM",
          { contents: [{ parts: [{ text: prompt }] }] },
          { headers: { "Content-Type": "application/json" } }
        );

        setSummary(
          gemini.data.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
        );
      } catch (err) {
        console.error("Summary error:", err);
        setError("Failed to generate summary.");
      }
    };

    fetchAndSummarize();
  }, []);

  return (
    <div className="mt-6 bg-[#1e1e1e] p-6 rounded-xl shadow-inner shadow-black/30 text-gray-300">
      <h2 className="text-2xl font-semibold text-[#ff80ab] mb-4">
        Vitals Summary
      </h2>

      {summary === null && !error && (
        <div className="h-20 w-full bg-[#2a2a2a] rounded-lg animate-pulse" />
      )}

      {error && (
        <p className="text-red-400 bg-[#2a2a2a] p-4 rounded-lg">{error}</p>
      )}

      {summary && (
        <div className="bg-[#2a2a2a] p-4 rounded-lg text-gray-200 border border-[#3b3b3b] shadow">
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryGenerator;
