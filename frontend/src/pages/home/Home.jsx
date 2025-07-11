import { Route, Routes } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import Exercises from "../../components/Exercises";
import Progress from "../../components/Progress";
import UserProfile from "../../components/UserProfile";
import Consult from "../../components/Consult";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-white">
      <div className="flex-[20%] border-r border-[var(--color-outline)]">
        <Dashboard />
      </div>
      <div className="flex-[80%] p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Exercises />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
