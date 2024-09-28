import { create } from "zustand";


const useProgress= create((set)=>({
    streak:0,
    setStreak:(streak)=>set({streak}),
    lastLoginDate:null,
    setLastLoginDate:(lastLoginDate)=>set({lastLoginDate}),
}))

export default useProgress;