import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";

import { FaCrown } from "react-icons/fa";

const Dashboard = () => {
  const { authUser } = useAuthContext();
  const { logout } = useLogout();
  const location = useLocation();

  return (
    <div className="flex flex-col gap-6 bg-[var(--color-lighter)] bg-opacity-90 px-6 py-8 rounded-2xl h-full shadow-lg shadow-black border border-[var(--color-outline)]">
      <h1 className="text-2xl font-extrabold text-[var(--color-primary)] text-center">
        PhysioNep
      </h1>

      <div className="flex flex-col gap-3 items-center">
        <img
          src={authUser?.profilePic}
          alt="profile"
          className="w-20 h-20 rounded-full border-2 border-[var(--color-primary)] object-cover"
        />
        <h2 className="text-lg font-semibold text-white">
          {authUser?.fullName}
        </h2>
      </div>

      <nav className="flex flex-col gap-2">
        <h2 className="text-xl text-[var(--color-primary)] font-semibold px-3">
          Dashboard
        </h2>

        {[
          { path: "/", label: "Exercises" },
          { path: "/progress", label: "Progress" },
          { path: "/consult", label: "Consult", pro: true },
          { path: "/summary", label: "Check Vitals", pro: true },
          { path: "/userprofile", label: "User Settings" },
        ].map(({ path, label, pro }) => {
          const isActive = location.pathname === path;
          const baseClasses =
            "block w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ";
          const activeClasses = "bg-[var(--color-primary)] text-black";
          const inactiveClasses =
            "text-white hover:bg-[var(--color-primary)] hover:text-black";

          if (pro) {
            return (
              <Link
                key={path}
                to={path}
                className={`${baseClasses} ${
                  isActive
                    ? activeClasses
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                } flex justify-between items-center`}
              >
                <span>{label}</span>
                <div className="flex items-center gap-1 text-[var(--color-primary)] font-bold text-xs">
                  <FaCrown /> PRO
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={path}
              to={path}
              className={`${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        className="mt-auto bg-[var(--color-primary)] text-black font-semibold py-2 rounded-lg shadow-md hover:bg-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
        onClick={logout}
      >
        Logout
      </button>

      <p className="text-center text-gray-400 text-xs select-none mt-6">
        © 2024 PhysioNep. All rights reserved.
      </p>

      <div className="mt-8 w-full bg-gray-800 rounded-lg py-4 text-center text-gray-500 font-light select-none">
        Advertisement
      </div>
    </div>
  );
};

export default Dashboard;
