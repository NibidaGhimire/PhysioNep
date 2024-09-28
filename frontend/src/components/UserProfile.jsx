import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="w-full h-screen rounded-xl bg-gray-100 p-4 opacity-100 shadow-lg shadow-gray-200 flex flex-col items-center justify-center">
      <div>
        <img src={authUser?.profilePic} alt="profile" className="w-40 h-40 rounded-full border-2 border-black " />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-[24px] font-semibold text-red-500">{authUser?.fullName}</h1>
        <p className="text-[16px] text-slate-500">{authUser?.email}</p>
        
      </div>
    </div>
  )
}

export default UserProfile
