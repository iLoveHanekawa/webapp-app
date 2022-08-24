import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  return (
    <div className = 'flex justify-center items-center h-screen'>
      <form className = 'flex flex-col items-center justify-center w-9/12 lg:w-4/12 h-3/4 bg-gray-800 rounded-3xl shadow-md shadow-black'>
        <p className = 'md:text-6xl text-5xl mb-20 font-bold border-b-4 pb-2'>Login</p>
        <div className = 'w-64'>
          <label className='text-sm text-gray-300' htmlFor='userInput'>
            Username
          </label>
          <br/>
          <input id = 'userInput' type = 'text' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm' placeholder = 'Username' />
        </div>
        <br/>
        <div className='w-64'>
          <label className = 'text-sm text-gray-300' htmlFor='passInput'>
            Password
          </label>
          <br/>
          <input id='passInput' type = 'password' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm ' placeholder='Password'/>
        </div>
        <button className='mt-10 hover:scale-110 transition duration-300 bg-gray-900 px-20 py-1 rounded-full'>Login</button>
        <p className = 'mt-4'>Not registered? <span className = 'text-gray-500 ml-1 cursor-pointer transition duration-300 hover:scale-110' onClick = {() => navigate('/register')}>Register now</span></p>
      </form>
    </div>
  )
}

export default Login