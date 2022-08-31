import axios, { AxiosError } from 'axios'
import React from 'react'
import { axiosInstance } from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, StateType } from '../app/store'
import { response } from 'express'
import { tokenActions } from '../features/Token/tokenSlice'
import { userActions } from '../features/User/userSlice'
import { navActions } from '../features/NavBar/NavSlice'

function Dashboard() {

  const navigate = useNavigate();
  const dispatch: AppDispatchType = useDispatch();
  const [reload, setReload] = React.useState(false)
  const token = useSelector((state: StateType) => state.token.value)
  console.log(token)
  const [msg, setMsg] = React.useState<{userMsg: string, secretMsg: string} | null>(null)
  React.useEffect(() => {
    const fetchSecretNumber = async() => {
      try {
        const reponse = await axios.get('/api/v1/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
        const { userMsg, secretMsg } = reponse.data
        setMsg({ userMsg, secretMsg })
      } catch (error) {
        const err = error as AxiosError
        if(err.response?.status === 401) {
          try {
            const response = await axios.get('/token', { withCredentials: true })
            dispatch(tokenActions.setToken(response.data.token))
          } catch (error) {
            dispatch(tokenActions.removeToken(null))
            dispatch(userActions.logout(null))
            dispatch(navActions.loggedOut(true))
            navigate('/')
          }
        }
      }
    }
    fetchSecretNumber()
  }, [token, reload])

  return (
    <div className = 'w-full absolute top-1/4'>
      {msg === null? <div className='absolute left-32 text-lg'>Loading...</div>: 
      <div className='bg-green-400 text-6xl tracking-tighter'>
        <div className='absolute left-32'>
          <div className=''>{`${msg.userMsg}`}</div>
          <div className='text-gray-400 text-2xl tracking-normal'>{`${msg.secretMsg}`}</div>
          <div className='flex gap-2 mt-20 items-center'>
            <div className = 'text-sm tracking-normal text-gray-500'>Don't like the secret number?</div>  
            <button onClick = {() => {
              setReload(i => !i)
            }} className='text-sm hover:text-white bg-gray-800 px-3 hover:scale-105 transition duration-300 py-1 rounded-lg'>Get new secret</button>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Dashboard
