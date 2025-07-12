import { useState } from "react";
import axios from "axios";

const SummaryGenerator = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAndSummarize = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/proxy-fetch");

      const caloriesData = res.data.calories;
      const stepsData = res.data.steps;

      function preprocessData(caloriesData, stepsData) {
        const calorieSummary = caloriesData.map((entry) => ({
          start: entry.start,
          end: entry.end,
          calories: entry.data?.energy?.inCalories ?? 0,
        }));

        const stepsSummary = stepsData.map((entry) => ({
          start: entry.start,
          end: entry.end,
          steps: entry.data?.count ?? 0,
        }));

        return { calorieSummary, stepsSummary };
      }

      const { calorieSummary, stepsSummary } = preprocessData(
        caloriesData.slice(-2),
        stepsData.slice(-2)
      );

      console.log("Calories Data:", caloriesData);
      console.log("Steps Data:", stepsData);

      const userPrompt = `

Analyze the chances of having Cardiac Arrest, Insomnia and Depression in the format:
Cardiac Arrest: High/Medium/Low?
Insomnia: High/Medium/Low?
Depression: High/Medium/Low?
Summarize patterns, anomalies, or any indicators of health concerns like cardiac stress or inactivity. Give very to the point answer so that users can understand exactly what's happening to them.

Calories burned:
${calorieSummary
  .map((e) => `From ${e.start} to ${e.end}: ${e.calories.toFixed(2)} cal`)
  .join("\n")}

Step counts:
${stepsSummary
  .map((e) => `From ${e.start} to ${e.end}: ${e.steps} steps`)
  .join("\n")}

`;

      const geminiRes = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBcRlRlZAmK7QkvYQBsW6mHGMkAmmOREGM",
        {
          contents: [
            {
              parts: [{ text: userPrompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSummary(geminiRes.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating summary:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setSummary("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={fetchAndSummarize}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h2 className="text-lg font-bold mb-2">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryGenerator;