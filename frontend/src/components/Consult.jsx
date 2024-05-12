import { doctors } from '../constants'

import { FaRegMessage } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import SearchInput from './SearchInput';
import { useState } from 'react';



const Consult = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);


    const DoctorInfo = () => {
        return (
            <div className="flex flex-col h-full">
                <div className='flex flex-row justify-between items-center m-8 border-2 border-black'>
                    <div className='flex flex-col '>
                        <div className='mx-8 flex flex-col '>
                            <h1 className="text-[24px] text-red-500 font-bold">{selectedDoctor.name}</h1>
                            <p className="text-[16px] text-slate-500">{selectedDoctor.hospital}</p>
                        </div>
                        <div className='m-8 flex flex-row gap-4 '>
                            <button className="flex flex-row items-center justify-between bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600">Chat {<FaRegMessage />}</button>
                            <button className="flex flex-row items-center justify-between bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600">Call {<IoIosCall />}</button>
                        </div>
                    </div>

                    <img src={selectedDoctor.profile} alt="doctor" className="w-40 h-40 rounded-md border-2 border-red-500 m-8" />
                </div>
                <div className='flex flex-col mx-8 text-balance'>
                    <h1 className="text-[18px] text-red-500 font-semibold ">About</h1>
                    <p className="text-[16px] text-slate-700">{selectedDoctor.info}</p>
                </div>
                <div className='overflow-auto'>
                    <h1 className="text-[18px] text-red-500 font-semibold m-8">Specialization</h1>
                    <ul className="flex flex-col gap-4 mx-8">
                        {selectedDoctor.specializations.map((specialization, index) => (
                            <li key={index} className="text-[16px] text-slate-700">{specialization}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }


    return (
        <div className="w-full h-screen rounded-xl bg-gray-100 p-4 opacity-100 shadow-lg shadow-gray-200 flex flex-col gap-8">
            <div className='bg-red-100 px-8 py-8 rounded-lg shadow-md shadow-red-200'>
                <h1 className="text-center text-red-500 text-[24px] font-bold">Consult with Doctors</h1>
            </div>
            <div className='flex flex-row gap-2'>

                <div className='flex-[30%] flex flex-col gap-4 px-4 rounded-lg overflow-auto h-full'>
                    <div>
                        <SearchInput />
                    </div>
                    {
                        doctors.map((doctor, index) => (
                            <div
                                key={index}
                                className="flex flex-row gap-4 items-center border-2 border-slate-300 p-4 bg-white rounded-lg "
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <img src={doctor.profile} alt="doctor" className="w-20 h-20 rounded-full border-2 border-red-400 " />
                                <div className='flex flex-col '>
                                    <h1 className="text-[18px] text-red-500 font-semibold">{doctor.name}</h1>
                                    <p className="text-[12px] text-slate-500">{doctor.hospital}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>


                <div className='bg-white flex-[70%]'>
                    {!selectedDoctor && (
                        <div className='flex flex-col h-full border-2 border-slate-300 items-center justify-center'>
                            <div>
                                <FaRegMessage className='w-24 h-24' />
                            </div>
                            <p className=' text-[24px]'>
                                Click to view information.
                            </p>
                        </div>
                    )}

                    {selectedDoctor && (
                        <DoctorInfo />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Consult
