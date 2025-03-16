import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import { Toaster } from './components/ui/sonner'
import AuthPage from './pages/Auth'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/Home'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
			<Toaster position='top-center' />
		</>
	)
}

export default App
