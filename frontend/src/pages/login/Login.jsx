import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import { logo } from "../../assets"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const { loading, login } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div className="flex flex-row items-center justify-center">
      <div className=" flex-[40%] flex flex-col bg-white bg-opacity-70 justify-center items-center h-screen w-fit p-20 shadow-lg shadow-gray-200 rounded-box">
        <img src={logo} alt="PhysioNep" className="w-96 h-96 object-cover " />
        <br />
        <p className="text-[24px] text-black font-bold"> Welcome to <span className="text-red-500">PhysioNep!</span></p>
      </div>
      <div className='flex-[60%] p-4 h-screen flex items-center justify-center '>
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-60">
            <h1 className="text-3xl font-semibold text-center text-gray-800">
              Login
            </h1>

            <form onSubmit={handleSubmit}>

              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-gray-800">Username</span>
                </label>
                <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10 bg-white text-gray-800"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <label className="label p-2 ">
                  <span className="text-base label-text text-gray-800">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full input input-bordered h-10 bg-white text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-800">
                {"Don't"} have an account?
              </Link>

              <div>
                <button
                  disabled={loading}
                  className="btn btn-block btn-sm mt-2 bg-black hover:bg-blue-600 text-white"
                >
                  {loading ? <span className="loading loading-spinner"></span> : "Login"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Login

