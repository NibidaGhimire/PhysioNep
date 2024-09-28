import { exercises } from '../constants'
import { Link } from 'react-router-dom'

const Exercise = () => {
    return (
        <div className="flex flex-row flex-wrap gap-4 items-center justify-between mx-16">
          {
            exercises.map((exer) => (
              <Link key={exer.id} to={`/exercise/${exer.id}`}>
              <div 
                className="flex flex-col gap-2 bg-white p-4 rounded-xl shadow-lg shadow-red-300"
              >
                <img src={exer.pic} alt={exer.exercise} className="w-60 h-60 object-cover rounded-lg" />
                <p className="text-center font-semibold  text-black text-[18px]">{exer.exercise}</p>
              </div>
              </Link>
              
            ))
          }
        </div>
    )
}

export default Exercise
