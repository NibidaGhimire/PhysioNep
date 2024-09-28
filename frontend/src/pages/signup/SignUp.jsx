import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"
import { logo } from "../../assets"

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullName: '',
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
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
            Sign Up
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-800">Full Name</span>
              </label>
              <input type="text" placeholder="Jane Doe" className="w-full input input-bordered h-10 bg-white text-gray-800"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-800">Username</span>
              </label>
              <input type="text" placeholder="janedoe" className="w-full input input-bordered h-10 bg-white text-gray-800"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-gray-800">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10 bg-white"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text text-gray-800">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10 bg-white"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <Link to="/login"
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-800"

            >
              Already have an account?
            </Link>

            <div>
              <button
                disabled={loading}
                className="btn btn-block btn-sm mt-2 border text-white border-slate-700 hover:bg-blue-600"
              >
                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
    </div>
    

  )
}

export default SignUp


