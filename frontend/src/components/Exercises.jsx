import '../index.css'

import { useState } from "react"
import SearchInput from "./SearchInput"
import Exercise from './Exercise'
import SavedExercises from './SavedExercises'
import { logo } from '../assets'


const Exercises = () => {
  const [active, setActive] = useState({ exercises: true, savedExercises: false })
  return (
    <div className="w-full h-fit rounded-xl bg-red-50 p-4 opacity-100 shadow-lg shadow-gray-200 flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className='flex flex-row'>
          <img src={logo} alt="logo" className="w-12 h-12" />
          <p className="mx-4 font-bold text-red-500 text-[24px] flex-[25%]">PhysioNep</p>
        </div >
        <SearchInput  />
      </div>
      <div className="flex flex-row border border-slate-300 rounded-t-lg">
        <p
          className={`flex-[50%] text-center text-[18px] py-4 text-black font-bold rounded-t-lg ${active.exercises ? "bg-red-500 text-white" : ""}`}
          onClick={() => setActive({ exercises: true, savedExercises: false })}
        >Exercises</p>
        <p
          className={`flex-[50%] text-center text-[18px] py-4 text-black font-bold rounded-t-lg ${active.savedExercises ? "bg-red-500 text-white" : ""}`}
          onClick={() => setActive({ exercises: false, savedExercises: true })}
        >Saved Exercises</p>
      </div>
      {
        active.exercises && (
          <Exercise />
        )
      }
      {
        active.savedExercises && (
          <SavedExercises />
        )
      }
    </div>
  )
}

export default Exercises
