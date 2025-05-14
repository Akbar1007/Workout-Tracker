import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'
import FillLoading from '../shared/fill-loading'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Social = () => {
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	const onGoogle = () => {
		setIsLoading(true)
		const googleProvider = new GoogleAuthProvider()
		signInWithPopup(auth, googleProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => setIsLoading(false))
	}

	const onGithub = () => {
		setIsLoading(true)
		const githubProvider = new GithubAuthProvider()
		signInWithPopup(auth, githubProvider)
			.then(() => {
				navigate('/')
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			{isLoading && <FillLoading />}
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-4'>
				<Button
					className='h-12'
					variant={'secondary'}
					disabled={isLoading}
					onClick={onGithub}
					aria-label='github'
				>
					<FaGithub className='mr-2' />
					<span>Continue with GitHub</span>
				</Button>

				<Button
					className='h-12'
					variant={'destructive'}
					disabled={isLoading}
					onClick={onGoogle}
					aria-label='google'
				>
					<FaGoogle className='mr-2' />
					<span>Continue with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
