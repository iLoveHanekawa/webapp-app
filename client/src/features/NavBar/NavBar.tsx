import React from 'react'
import { AiOutlineLogin, AiOutlineLogout, AiOutlineAppstoreAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { StateType, AppDispatchType } from '../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { tokenActions } from '../Token/tokenSlice'
import { userActions } from '../User/userSlice'
import axios from 'axios'
import { navActions } from './NavSlice'

function NavBar() {

  const navigate = useNavigate()
  const token = useSelector((state: StateType) => state.token.value)
  const dispatch: AppDispatchType = useDispatch()
  const name = useSelector((state: StateType) => state.user.name)

  return (

    <div className = 'absolute w-full text-sm flex justify-between bg-gray-800 items-center shadow-md shadow-black px-4 py-2'>
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'><AiOutlineAppstoreAdd className = 'mr-2 text-lg' />
        <a href = 'https://www.webappssol.com/home' target={'_blank'}>Webapps Solutions</a>
      </p>
      <div className = 'flex'>
      {token !== null && <div className='mr-4'>{name}</div>}
      <p className='flex justify-center items-center hover:scale-110 transition duration-500'>
        {token === null? <AiOutlineLogin className = 'mr-2'/>: <AiOutlineLogout className='mr-1' />}
        <button onClick = {async () => {
          if(token !== null) {
            dispatch(tokenActions.removeToken(null))
            dispatch(userActions.logout(null))
            dispatch(navActions.loggedOut(true))
          }
          navigate('/')
        }}>
          <div>{token === null? `Login`: `Logout`}</div>
        </button>
      </p>
      </div>
    </div>
  )
}

export default NavBar