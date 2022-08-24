import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import NavBar from './features/NavBar/NavBar'

function App() {
    return <div className = 'bg-gray-900 w-full h-screen font-nunito text-white'>
        <NavBar />
        <Routes>
            <Route path = '/' element = {<Login />} />
            <Route path = '/register' element = {<Register />} />
            <Route path = '/dashboard' element = {<Dashboard />} />
        </Routes>
    </div>
}

export default App
