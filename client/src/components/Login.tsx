import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { response } from 'express'
import store, { StateType, AppDispatchType } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { tokenActions } from '../features/Token/tokenSlice'
import { axiosInstance } from '../api/axiosInstance'

function Login() {

  const dispatch: AppDispatchType = useDispatch()
  const token = useSelector((state: StateType) => { return state.token.value })
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const submit = async (email: string, password: string) => {
    try {
      const response = await axios.post('api/v1/login', { email: email, password: password })
      dispatch(tokenActions.setToken(response.data.authToken))
      await axios.get('refresh', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${response.data.refreshToken}`
        }
      })
    } catch (error) {
      const err = error as AxiosError
      console.log(err.response?.data)
    }
  } 

  return (
    <div className = 'flex justify-center items-center h-screen'>
      <form onSubmit={ event => {
        event.preventDefault()
        submit(email, password)
      }} className = 'flex flex-col items-center justify-center w-9/12 lg:w-4/12 h-3/4 bg-gray-800 rounded-3xl shadow-md shadow-black'>
        <p className = 'md:text-6xl text-5xl mb-20 font-bold border-b-4 pb-2'>Login</p>
        <div className = 'w-64'>
          <label className='text-sm text-gray-300' htmlFor='userInput'>
            Email
          </label>
          <br/>
          <input onChange={event => {
            setEmail(event.target.value)
          }} id = 'userInput' value = {email} type = 'text' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm' placeholder = 'mail@example.com' />
        </div>
        <br/>
        <div className='w-64'>
          <label className = 'text-sm text-gray-300' htmlFor='passInput'>
            Password
          </label>
          <br/>
          <input onChange={event => {
            setPassword(event.target.value)
          }} id='passInput' value = {password} type = 'password' className='w-full py-1 px-2 rounded-md indent-2 focus:outline-none text-gray-500 text-sm ' placeholder='Password'/>
        </div>
        <button className='mt-10 hover:scale-110 transition duration-300 bg-gray-900 px-20 py-1 rounded-full'>Login</button>
        <div className = 'px-4 py-4 mt-4'>Not registered? <div className = 'text-gray-500 ml-1 hover:scale-110 cursor-pointer inline transition duration-300' onClick = {() => navigate('/register')}>Register now</div></div>
      </form>
    </div>
  )
}

export default Login