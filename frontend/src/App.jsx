import {  Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import {Toaster} from "react-hot-toast"
import ExerciseInfo from './components/ExerciseInfo'
import { useAuthContext } from './context/AuthContext'
// import DoctorInfo from './components/DoctorInfo'


function App() {
  const {authUser}= useAuthContext();

  return (
    <div className='my-2 mx-4' >
      <Routes>
        <Route path='/*' element={authUser?<Home /> : <Navigate to="/SignUp" />} />
        <Route path='/exercise/:id' element={authUser?<ExerciseInfo /> : <Navigate to="/login" />} />
        {/* <Route path='/doctor/:id' element={authUser?<DoctorInfo /> : <Navigate to="/login" />} /> */}
        <Route path='/login' element={authUser?<Navigate to="/" /> : <Login />} />
        <Route path='/signup' element={authUser?<Navigate to="/" /> : <SignUp />} />

        {/* <Route path='/*' element={<Home />} /> */}
        {/* <Route path='/exercise/:id' element={<ExerciseInfo /> } /> */}
        {/* <Route path='/doctor/:id' element={authUser?<DoctorInfo /> : <Navigate to="/login" />} /> */}
        {/* <Route path='/login' element={<Home />} /> */}
        {/* <Route path='/signup' element={<Home />} /> */}
      </Routes>
      <Toaster />
    </div >
  )
}

export default App