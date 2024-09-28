
import { Route, Routes } from "react-router-dom"
import Dashboard from "../../components/Dashboard"
import Exercises from "../../components/Exercises"
import Progress from "../../components/Progress"
import UserProfile from "../../components/UserProfile"
import Consult from "../../components/Consult"


const Home = () => {

	return (
		<div className="flex flex-row gap-4">
			<div className=" flex-[20%]">
				<Dashboard />
			</div>
			<div className="flex-[80%]">
				<Routes>
					<Route path='/' element={<Exercises />} />
					<Route path='/progress' element={<Progress />} />
					<Route path='/consult' element={<Consult />} />

					<Route path='/userprofile' element={<UserProfile />} />

				</Routes>
			</div>

		</div>
	)
}

export default Home
