import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

import { FaCrown } from "react-icons/fa";


const Dashboard = () => {
    const { authUser } = useAuthContext();
    const { logout } = useLogout();
    const location = useLocation();


    return (

        <div className="flex flex-col gap-5 bg-white bg-opacity-80 px-4 py-4 rounded-xl h-full shadow-gray-200 shadow-xl">
            <h1 className="text-[20px] font-bold text-red-800  text-center">PhysioNep</h1>

            <div className="flex flex-col gap-2 items-center">
                <img src={authUser?.profilePic} alt="profile" className="w-20 h-20 rounded-full border-2  border-black " />
                <h1 className="text-[18px] font-semibold text-red-500">{authUser?.fullName}</h1>
            </div>
            <div className="flex flex-col ">
                <h1 className="text-[20px] text-red-500 px-4 py-2 rounded-x">Dashboard</h1>
                <Link to='/' className={`text-[16px] w-full px-4 py-2 rounded-xl ${location.pathname === '/' ? 'bg-red-300 text-black font-medium' : 'text-black'}`} >Exercises</Link>
                <Link to='/progress' className={`text-[16px] w-full px-4 py-2 rounded-xl ${location.pathname === '/progress' ? 'bg-red-300 text-black font-medium' : 'text-black'}`}>Progress</Link>
                <Link to='/consult' className={`text-[16px] w-full rounded-xl ${location.pathname === '/consult' ? 'bg-red-300 text-black font-medium' : 'bg-slate-200 text-black'} `}>
                    <div className="flex flex-row items-center  w-full px-4 py-2 rounded-xl justify-between">
                        <p>Consult</p>
                        <div className="flex flex-row gap-2 items-center">
                            <FaCrown />
                            <p className="text-slate-600 text-[12px]">PRO</p>
                        </div>

                    </div>
                </Link>
                <Link to='/userprofile' className={`text-[16px] w-full px-4 py-2 rounded-xl ${location.pathname === '/userprofile' ? 'bg-red-300 text-black font-medium' : 'text-black'} `}>User Settings</Link>
            </div>

            <button className="text-[16px] w-full px-4 py-2 rounded-xl bg-red-700 text-white"
                onClick={logout}
            >Logout</button>

            <div>
                <p className="text-[12px] text-center text-gray-500">© 2024 PhysioNep. All rights reserved.</p>
            </div>

            <div className="mt-4 w-auto h-full bg-white flex  justify-center p-8 text-gray-600">
        
                <p>Advertisement</p>
            </div>
        </div>
    )
}

export default Dashboard
