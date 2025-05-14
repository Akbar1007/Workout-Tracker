import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import AuthProvider from './components/providers/auth-provider.tsx'
import { ThemeProvider } from './components/providers/theme-provider.tsx'
import './styles/index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider defaultTheme='dark'>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
