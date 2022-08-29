import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import NavBar from './features/NavBar/NavBar'
import { useSelector } from 'react-redux'
import { StateType } from './app/store'

function App() {

    const token = useSelector((state: StateType) => { return state.token.value })

    return <div className = 'bg-gray-900 relative w-full h-screen font-nunito text-white'>
        <NavBar />
        <Routes>
            <Route path = '/' element = {token === null? <Login />: <Navigate to = '/dashboard' />} />
            <Route path = '/register' element = {token === null? <Register />: <Navigate to = '/dashboard' />} />
            <Route path = '/dashboard' element = {token === null? <Navigate to = '/' />: <Dashboard />} />
        </Routes>
    </div>
}

export default App
