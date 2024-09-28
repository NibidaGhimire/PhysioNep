import { useParams } from 'react-router-dom'
import { exercises } from '../constants'
import useExercises from '../zustand/useExercises';
// import Webcam from "react-webcam";
import useCam from '../hooks/useCam';

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useCurl from '../hooks/useCurl';
import useBackcurl from '../hooks/useBackcurl';


const ExerciseInfo = () => {
    const { savedexercises, setSavedexercises } = useExercises();
    const { id } = useParams()

    const { handlerun, handlestop, loading, started } = useCam();
    const { handlebirun, handlebistop, loadingg, startedd } = useCurl();
    const {handlebcurlrun, handlebcurlstop, loadinggg, starteddd} = useBackcurl();

    const toggleSaveExercise = (exer) => {
        const isSaved = savedexercises.some((savedExer) => savedExer.id === exer.id);
        if (isSaved) {
            const updatedExercises = savedexercises.filter((savedExer) => savedExer.id !== exer.id);
            setSavedexercises(updatedExercises);
        } else {
            setSavedexercises([...savedexercises, exer]);
        }
    };

    const handleRunPythonScript = async (exer) => {
        console.log(exer.id)
        if (exer.id == 2) {
            handlebirun();
        }
        else if (exer.id == 3) {
            handlebcurlrun();
        }
            
        else{
            handlerun();

        }
    };

    const handleStopPythonScript = async (exer) => {
        if (exer.id == 2) {
            handlebistop();
        }
        else if (exer.id == 3) {
            handlebcurlstop();
        }

        else{
            handlestop();

        }
    };

    return (
        <div className='h-screen w-full bg-white bg-opacity-70 rounded-lg'>
            {
                exercises.map((exer) => (

                    exer.id == id && (
                        <div key={exer.id} className="flex flex-row gap-4 items-center">
                            <div className='flex-[30%] bg-white p-8 h-screen flex flex-col gap-4 shadow-lg shadow-red-400'>
                                <div className='flex flex-col'>
                                    <h1 className="text-[24px] text-red-500 font-bold ">{exer.exercise}</h1>
                                    <img src={exer.pic} alt={exer.exercise} className="border border-black w-fit h-80 object-cover rounded-lg" />
                                </div>

                                <div>
                                    <button
                                        className={`text-black text-[18px] rounded-lg border border-red-500 px-8 py-2 w-full hover:bg-red-500 hover:text-white
                                                    ${savedexercises.some((savedExer) => savedExer.id === exer.id) ? 'bg-red-500 text-white' : ''}`}
                                        onClick={() => toggleSaveExercise(exer)}
                                    >
                                        {savedexercises.some((savedExer) => savedExer.id === exer.id) ? 'Unsave Exercise' : 'Save Exercise'}

                                    </button>
                                </div>
                                <div>
                                    <h2 className="text-[18px] text-red-500 font-bold">Steps</h2>
                                    <ul className="list-disc list-inside">
                                        {
                                            exer.steps.map((step, index) => (
                                                <li key={index} className="text-black text-[16px]">{step}</li>
                                            ))
                                        }
                                    </ul>
                                </div>

                                {(started || startedd|| starteddd) && (
                                    <button className="w-auto text-white text-[18px] font-semibold rounded-lg border-2 border-red-500 px-8 py-2 bg-red-500 hover:bg-red-600" onClick={() => handleStopPythonScript(exer)}>End Exercise</button>
                                )}
                            </div>


                            <div className='flex-[70%] flex items-center justify-center'>
                                {
                                    (loading || loadingg && !loadinggg) && (
                                        <div className='flex flex-col gap-2 items-center justify-center'>
                                            <AiOutlineLoading3Quarters className=' text-blue-500 w-16 h-16' />
                                            <div className="text-black text-[24px] font-semibold rounded-lg  px-8 py-2 w-fit">Loading... Please wait!</div>

                                        </div>
                                    )
                                }
                                {
                                    (!loading && !loadingg && !loadinggg) && (
                                        <button className=" text-black text-[18px] font-semibold rounded-lg border-2 border-red-500 px-8 py-2 w-fit hover:bg-red-500 hover:text-white" onClick={() => handleRunPythonScript(exer)}>{(started || startedd|| starteddd) ? "Started" : "Start Exercise"}</button>
                                    )}
                            </div>
                        </div>
                    )
                ))
            }
        </div>
    )
}

export default ExerciseInfo
