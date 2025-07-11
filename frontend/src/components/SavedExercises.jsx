import { Link } from "react-router-dom";
import useExercises from "../zustand/useExercises";

const SavedExercises = () => {
  const { savedexercises } = useExercises();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-4">
      {savedexercises.length === 0 ? (
        <p className="text-gray-500 text-lg text-center w-full mt-10">
          You haven’t saved any exercises yet.
        </p>
      ) : (
        savedexercises.map((exer) => (
          <Link
            key={exer.id}
            to={`/exercise/${exer.id}`}
            className="group relative rounded-xl overflow-hidden cursor-pointer shadow-sm shadow-black/50 bg-[#222222] transition-transform duration-200 hover:scale-[1.03] hover:shadow-md hover:shadow-pink-400/60"
          >
            <img
              src={exer.pic}
              alt={exer.exercise}
              className="w-full h-52 object-cover rounded-xl"
            />

            <div className="absolute bottom-0 w-full bg-black bg-opacity-40 px-3 py-2">
              <h3 className="text-white text-base font-semibold select-none truncate">
                {exer.exercise}
              </h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default SavedExercises;
