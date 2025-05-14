import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Navbar from './components/shared/navbar'
import { Toaster } from './components/ui/sonner'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import ProgramsPage from './pages/Programs'

const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/programs' element={<ProgramsPage />} />
			</Routes>
			<Toaster position='top-center' />
		</>
	)
}

export default App
