import { Route, Routes } from 'react-router-dom'
import Navbar from './components/shared/navbar'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/auth' element={<AuthPage />} />
			</Routes>
		</>
	)
}

export default App
