import axios, { AxiosError } from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatchType } from '../app/store'
import { useNavigate } from 'react-router-dom'
import { tokenActions } from '../features/Token/tokenSlice'

function Register() {

  const [firstName, setfirstName] = React.useState('')
  const [lastName, setlastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  

  return (
    <div className = 'flex justify-center items-center h-screen'>
      <form onSubmit={async (event) => {
          const dispatch: AppDispatchType = useDispatch()
          event.preventDefault()
          try {
            const response = await axios.post('api/v1/register', { firstName: firstName, lastName: lastName, email: email, password: password })
            dispatch(tokenActions.setToken(response.data.refreshToken))
            await axios.get('refresh', {
              withCredentials: true,
              headers: {
                'Authorization': `Bearer ${response.data.refreshToken}`
              }
            })
            console.log(response.data)
          } catch (error) {
            const err = error as AxiosError
            console.log(err.response?.data)
          }
      }} className = 'flex flex-col items-center justify-center w-9/12 lg:w-4/12 h-3/4 bg-gray-800 rounded-3xl shadow-md shadow-black'>
        <p className = 'md:text-6xl text-5xl mb-20 font-bold border-b-4 pb-2'>Register</p>
        <div className = 'w-64'>
          <label className='text-sm text-gray-300' htmlFor='firstName'>
            First Name
          </label>
          <br/>
          <input onChange = {(event) => { setfirstName(event.target.value) }} id = 'firstName' value = {firstName} type = 'text' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm' placeholder = 'John' />
        </div>
        <br/>
        <div className = 'w-64'>
          <label className='text-sm text-gray-300' htmlFor='lastName'>
            Last Name
          </label>
          <br/>
          <input onChange = {(event) => { setlastName(event.target.value) }} id = 'lastName' value = {lastName} type = 'text' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm' placeholder = 'Doe' />
        </div>
        <br/>
        <div className = 'w-64'>
          <label className='text-sm text-gray-300' htmlFor='email'>
            Email
          </label>
          <br/>
          <input onChange = {(event) => { setEmail(event.target.value) }} id = 'email' value = {email} type = 'text' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm' placeholder = 'mail@example.com' />
        </div>
        <br/>
        <div className='w-64'>
          <label className = 'text-sm text-gray-300' htmlFor='passInput'>
            Password
          </label>
          <br/>
          <input onChange = {(event) => { setPassword(event.target.value) }} id='passInput' value = {password} type = 'password' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm ' placeholder='Password'/>
        </div>
        <button className='mt-10 hover:scale-110 transition duration-300 bg-gray-900 px-20 py-1 rounded-full'>Sign up</button>
      </form>
    </div>
  )
}

export default Register