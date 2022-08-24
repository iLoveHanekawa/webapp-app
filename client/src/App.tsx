import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {
    return <div className = 'font-nunito flex items-center flex-col'>
        <Routes>
            <Route path = '/login' element = {<Login />} />
            <Route path = '/register' element = {<Register />} />
            <Route path = '/dashboard' element = {<Dashboard />} />
        </Routes>
        
    </div>
}

export default App
