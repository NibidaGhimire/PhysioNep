import { goals } from "../constants"

const Progress = () => {
  return (
    <div className="w-full h-screen rounded-xl bg-gray-100 p-4 opacity-100 shadow-lg shadow-gray-200 flex flex-col">
      <div className="flex flex-row justify-between">
        <p className="mx-4 font-bold text-red-500 text-[24px] ">Your Progress</p>
        <p className="mx-4 font-bold text-red-500 text-[24px] ">Your Notes</p>
      </div>

      <br />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col bg-green-600 px-8 py-4 w-fit h-auto rounded-lg shadow-lg shadow-red-400">
            <p className="text-white text-[24px] text-center"> Daily streaks</p>
            <p className="text-white text-[96px] text-center font-bold">2</p>
            <p className="text-white text-center">days</p>
          </div>
          <div className="flex flex-col bg-blue-600 px-8 py-4 w-fit h-auto rounded-lg shadow-lg shadow-red-400">
            <p className="text-white text-[24px] text-center"> Total Time Exercised</p>
            <p className="text-white text-[96px] text-center font-bold">05:29</p>
            <div className="mx-6 text-white flex flex-row justify-between">
              <p>minutes</p>
              <p>seconds</p>
            </div>
          </div>
        </div>

        <div>
          <textarea className="w-[400px] h-full bg-white p-4 rounded-lg shadow-lg shadow-red-400 text-black text-[20px] overflow-auto border border-black" placeholder="Write your notes here..."></textarea>
        </div>
      </div>

      <br />
      <br />

      <p className="mx-4 font-bold text-red-500 text-[24px] ">Your Goals</p>
      <br />
      <ul className="flex flex-col gap-4">
        {
          goals.map((goal, index) => (
            <div key={index} className="flex flex-row gap-4 px-4 py-2 w-auto h-auto bg-white rounded-lg shadow-md shadow-red-400">
              <input type="checkbox" className="mr-2" />
              <p className="text-black text-[16px]">{goal}</p>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

export default Progress
