import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboard/Dashboar'
import Login from './components/auth/Login'
import Navbar from './components/common/Navbar'
import Unauthorized from './components/Unauthorized'
import NotFound from './components/NotFound'

function App() {
	const is_authentecated = localStorage.getItem('token')

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard"
					element={is_authentecated ? <Dashboard /> : <Unauthorized />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
