import { IoSearch } from 'react-icons/io5'

const SearchInput = () => {
  return (
    <form className=' flex relative items-center justify-center h-10 w-auto'>
        <input type="text" className='px-4 py-2 mx-auto  bg-white border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 w-full h-full' 
            placeholder='Search'
        />
        <button className='px-4 mx-auto bg-red-500 text-white rounded-r-md focus:outline-none hover:bg-red-600 whitespace-nowrap h-full ' >
            <IoSearch />
        </button>
    </form>

  )
}

export default SearchInput

