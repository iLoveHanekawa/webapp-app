import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { StateType } from '../app/store'

function Dashboard() {

  const token = useSelector((state: StateType) => state.token.value)
  const [msg, setMsg] = React.useState<{userMsg: string, secretMsg: string} | null>(null)
  console.log(msg)
  React.useEffect(() => {
    const fetchSecretNumber = async() => {
      try {
        const reponse = await axios('api/v1/dashboard', { headers: { 'Authorization': `Bearer ${token}` } })
        const { userMsg, secretMsg } = reponse.data
        setMsg({ userMsg, secretMsg })
      } catch (error) {
        console.log(error); 
      }
    }
    fetchSecretNumber()
  }, [token])

  return (
    <div className = 'w-full h-full absolute top-1/4'>
      {msg === null? <div className='absolute left-32 text-lg'>Loading...</div>: 
      <div className='bg-green-400 text-6xl tracking-tighter'>
        <div className='absolute left-32'>
          <div className=''>{`${msg.userMsg}`}</div>
          <div className='text-gray-400 text-lg tracking-normal'>{`${msg.secretMsg}`}</div>
        </div>
      </div>}
    </div>
  )
}

export default Dashboard