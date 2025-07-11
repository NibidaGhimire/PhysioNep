import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { logo } from "../../assets";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-[var(--color-bg)] min-h-screen px-4 text-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--color-primary)] opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--color-secondary)] opacity-20 rounded-full filter blur-3xl"></div>

      {/* Logo + Welcome section without background */}
      <div className="flex-[40%] flex flex-col justify-center items-center p-10">
        <img
          src={logo}
          alt="PhysioNep"
          className="w-48 h-48 object-contain mb-4"
        />
        <p className="text-2xl font-bold text-center text-white">
          Welcome to{" "}
          <span style={{ color: "var(--color-primary)" }}>PhysioNep!</span>
        </p>
      </div>

      <div className="flex-[60%] p-6 flex items-center justify-center w-full">
        <div className="w-full max-w-md bg-[var(--color-lighter)] bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-xl border border-[var(--color-outline)] p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            Login to Your Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 rounded-md bg-transparent border border-[var(--color-outline)] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-sm transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-md bg-transparent border border-[var(--color-outline)] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] shadow-sm transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link
              to="/signup"
              className="block text-sm text-[var(--color-primary)] hover:underline text-center"
            >
              Don't have an account? Sign up
            </Link>

            <button
              disabled={loading}
              className="w-full py-3 rounded-md bg-[var(--color-primary)] text-black font-bold hover:bg-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] shadow-lg"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
