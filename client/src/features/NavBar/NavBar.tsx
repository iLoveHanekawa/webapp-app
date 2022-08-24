import React from 'react'
import { AiOutlineLogin, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { GrAppsRounded } from 'react-icons/gr'

function NavBar() {
  return (
    <div className = 'text-sm flex justify-between bg-gray-800 items-center shadow-md shadow-black px-4 py-2'>
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'><AiOutlineAppstoreAdd className = 'mr-2 text-lg' />
        <a href = 'https://www.webappssol.com/home' target={'_blank'}>Webapps Solutions</a>
      </p>
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'><AiOutlineLogin className = 'mr-2'/>
        <button>Login</button>
      </p>
    </div>
  )
}

export default NavBar