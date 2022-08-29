import React from 'react'
import { AiOutlineLogin, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function NavBar() {

  const navigate = useNavigate()

  return (
    <div className = 'absolute w-full text-sm flex justify-between bg-gray-800 items-center shadow-md shadow-black px-4 py-2'>
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'><AiOutlineAppstoreAdd className = 'mr-2 text-lg' />
        <a href = 'https://www.webappssol.com/home' target={'_blank'}>Webapps Solutions</a>
      </p>
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'><AiOutlineLogin className = 'mr-2'/>
        <button onClick = {() => {
          navigate('/')
        }}>Login</button>
      </p>
    </div>
  )
}

export default NavBar