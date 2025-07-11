import { doctors } from "../constants";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import SearchInput from "./SearchInput";
import { useState } from "react";

const Consult = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const DoctorInfo = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between items-center p-6 bg-[#262629] rounded-2xl shadow-md shadow-pink-500/10">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-[#ff80ab]">
              {selectedDoctor.name}
            </h1>
            <p className="text-sm text-gray-400">{selectedDoctor.hospital}</p>
            <div className="flex flex-row gap-4 mt-4">
              <button className="flex items-center gap-2 bg-[#ff80ab] text-black px-4 py-2 rounded-lg font-medium hover:bg-pink-300 transition-all">
                Chat <FaRegMessage />
              </button>
              <button className="flex items-center gap-2 bg-[#ff80ab] text-black px-4 py-2 rounded-lg font-medium hover:bg-pink-300 transition-all">
                Call <IoIosCall />
              </button>
            </div>
          </div>
          <img
            src={selectedDoctor.profile}
            alt="doctor"
            className="w-28 h-28 rounded-xl border-2 border-[#ff80ab] object-cover"
          />
        </div>

        <div className="p-6 bg-[#1f1f22] rounded-2xl mt-4 shadow-sm shadow-pink-500/10">
          <h2 className="text-lg font-semibold text-[#ff80ab] mb-2">About</h2>
          <p className="text-gray-300 text-sm">{selectedDoctor.info}</p>
        </div>

        <div className="p-6 bg-[#1f1f22] rounded-2xl mt-4 shadow-sm shadow-pink-500/10 overflow-auto">
          <h2 className="text-lg font-semibold text-[#ff80ab] mb-2">
            Specializations
          </h2>
          <ul className="flex flex-col gap-2">
            {selectedDoctor.specializations.map((specialization, index) => (
              <li key={index} className="text-gray-300 text-sm">
                • {specialization}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen rounded-2xl bg-[#1c1c1e] p-6 shadow-inner shadow-black/50 flex flex-col gap-6">
      <div className="bg-[#262629] px-6 py-6 rounded-2xl shadow-md shadow-pink-500/10 text-center">
        <h1 className="text-[#ff80ab] text-2xl font-bold">
          Consult with Doctors
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left doctor list */}
        <div className="flex-[30%] flex flex-col gap-4 overflow-auto max-h-[calc(100vh-200px)]">
          <SearchInput />
          {doctors.map((doctor, index) => (
            <div
              key={index}
              onClick={() => setSelectedDoctor(doctor)}
              className={`flex items-center gap-4 p-4 bg-[#262629] rounded-2xl shadow-sm shadow-pink-500/10 cursor-pointer transition-all hover:bg-[#333336] ${
                selectedDoctor?.name === doctor.name
                  ? "border-2 border-[#ff80ab]"
                  : ""
              }`}
            >
              <img
                src={doctor.profile}
                alt="doctor"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#ff80ab]"
              />
              <div className="flex flex-col">
                <h2 className="text-[#ff80ab] font-semibold text-base">
                  {doctor.name}
                </h2>
                <p className="text-gray-400 text-xs">{doctor.hospital}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right doctor info */}
        <div className="flex-[70%] bg-[#262629] rounded-2xl p-6 shadow-sm shadow-pink-500/10 min-h-[300px]">
          {!selectedDoctor ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <FaRegMessage className="w-20 h-20" />
              <p className="text-lg">Click on a doctor to view details</p>
            </div>
          ) : (
            <DoctorInfo />
          )}
        </div>
      </div>
    </div>
  );
};

export default Consult;
