import { create } from "zustand";


const useExercises= create((set)=>({
    savedexercises:[],
    setSavedexercises:(savedexercises)=>set({savedexercises}),
}))

export default useExercises;