import { useParams } from "react-router-dom";
import { exercises } from "../constants";
import useExercises from "../zustand/useExercises";
import useCam from "../hooks/useCam";
import useCurl from "../hooks/useCurl";
import useBackcurl from "../hooks/useBackcurl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ExerciseInfo = () => {
  const { savedexercises, setSavedexercises } = useExercises();
  const { id } = useParams();

  const { handlerun, handlestop, loading, started } = useCam();
  const { handlebirun, handlebistop, loadingg, startedd } = useCurl();
  const { handlebcurlrun, handlebcurlstop, loadinggg, starteddd } =
    useBackcurl();

  const toggleSaveExercise = (exer) => {
    const isSaved = savedexercises.some(
      (savedExer) => savedExer.id === exer.id
    );
    if (isSaved) {
      const updatedExercises = savedexercises.filter(
        (savedExer) => savedExer.id !== exer.id
      );
      setSavedexercises(updatedExercises);
    } else {
      setSavedexercises([...savedexercises, exer]);
    }
  };

  const handleRunPythonScript = (exer) => {
    if (exer.id == 2) handlebirun();
    else if (exer.id == 3) handlebcurlrun();
    else handlerun();
  };

  const handleStopPythonScript = (exer) => {
    if (exer.id == 2) handlebistop();
    else if (exer.id == 3) handlebcurlstop();
    else handlestop();
  };

  return (
    <div className="h-screen w-full bg-[#121212] rounded-xl p-6 shadow-lg shadow-black/40 overflow-auto">
      {exercises.map(
        (exer) =>
          exer.id == id && (
            <div key={exer.id} className="flex flex-col md:flex-row gap-6">
  {/* Left panel */}
  <div className="flex-[28%] bg-[#1e1e1e] rounded-xl p-6 flex flex-col gap-6 shadow-inner shadow-black/30">
    <div>
      <h1 className="text-[22px] font-semibold text-[#ff80ab]">{exer.exercise}</h1>
      <img
        src={exer.pic}
        alt={exer.exercise}
        className="w-full h-72 object-cover rounded-lg mt-3 shadow-md shadow-black/50"
      />
    </div>

    <button
      className={`text-sm font-medium rounded-lg px-4 py-2 transition-all duration-200
        ${
          savedexercises.some((savedExer) => savedExer.id === exer.id)
            ? "bg-[#ff80ab] text-black hover:bg-pink-400"
            : "border border-pink-400 text-pink-400 hover:bg-[#ff80ab] hover:text-black"
        }`}
      onClick={() => toggleSaveExercise(exer)}
    >
      {savedexercises.some((savedExer) => savedExer.id === exer.id)
        ? "Unsave Exercise"
        : "Save Exercise"}
    </button>

    <div>
      <h2 className="text-[18px] text-[#ff80ab] font-semibold">Steps</h2>
      <ul className="list-disc list-inside space-y-1 mt-1">
        {exer.steps.map((step, index) => (
          <li key={index} className="text-gray-300 text-[15px]">{step}</li>
        ))}
      </ul>
    </div>

    {(started || startedd || starteddd) && (
      <button
        className="text-sm font-semibold rounded-lg px-4 py-2 bg-[#ff80ab] text-black hover:bg-pink-400 transition-all duration-200"
        onClick={() => handleStopPythonScript(exer)}
      >
        End Exercise
      </button>
    )}
  </div>

  {/* Right panel */}
  <div className="flex-[72%] flex items-center justify-center bg-[#1e1e1e] rounded-xl p-6 shadow-inner shadow-black/30 min-h-[300px]">
    {(loading || loadingg || loadinggg) ? (
      <div className="flex flex-col items-center gap-4">
        <AiOutlineLoading3Quarters className="animate-spin text-[#ff80ab] w-14 h-14" />
        <p className="text-gray-300 text-lg">Loading... Please wait!</p>
      </div>
    ) : (
      <button
        className="text-base font-semibold rounded-lg border-2 border-[#ff80ab] px-8 py-3 text-[#ff80ab] hover:bg-[#ff80ab] hover:text-black transition-all duration-200"
        onClick={() => handleRunPythonScript(exer)}
      >
        {(started || startedd || starteddd) ? "Started" : "Start Exercise"}
      </button>
    )}
  </div>
</div>

          )
      )}
    </div>
  );
};

export default ExerciseInfo;
