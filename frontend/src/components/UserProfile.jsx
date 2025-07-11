import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#1c1c1e] p-6 rounded-2xl shadow-inner shadow-black/50">
      <div className="flex flex-col items-center bg-[#262629] p-8 rounded-2xl shadow-md shadow-pink-500/10 max-w-sm w-full">
        <img
          src={authUser?.profilePic}
          alt="profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-[#ff80ab] shadow-lg shadow-pink-500/30"
        />
        <h1 className="mt-4 text-2xl font-bold text-[#ff80ab]">
          {authUser?.fullName}
        </h1>
        <p className="text-gray-400 text-sm">{authUser?.email}</p>

        <div className="w-full mt-6 border-t border-[#333] pt-4 flex flex-col gap-2">
          <p className="text-gray-300 text-center">
            Welcome to your profile! 🌟
          </p>
          <button className="w-full bg-[#ff80ab] text-black font-medium py-2 rounded-lg hover:bg-pink-300 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
