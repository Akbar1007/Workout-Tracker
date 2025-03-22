import men from '@/assets/images/men.png'
import { Button } from '@/components/ui/button'
import { featuredItems } from '@/constants'
import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { LogOut } from 'lucide-react'
import { CgGym } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import ProgramsPage from './Programs'

const HomePage = () => {
	const { user, setUser } = useUserState()

	const navigate = useNavigate()

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	return (
		<>
			<div className='flex w-full h-screen items-center'>
				<div className='max-w-xl ml-60 flex h-full flex-col justify-center'>
					<h1 className='text-9xl font-semibold uppercase'>Workout with me</h1>
					<p className='text-muted-foreground'>
						A huge selection of health and fitness content, healthy recipes and
						transformation stories to help you get and stay fit!
					</p>

					{user ? (
						<div className='flex gap-4'>
							<Link to={'/dashboard'}>
								<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
									<span>Go to Workouts</span>
									<CgGym />
								</Button>
							</Link>

							<Button
								className='w-fit mt-6 font-bold h-12'
								size={'lg'}
								variant={'destructive'}
								onClick={onLogout}
							>
								<span>Logout</span>
								<LogOut className='h-5 w-5 ml-2' />
							</Button>
						</div>
					) : (
						<Link to={'auth'}>
							<Button className='w-fit mt-6 font-bold h-12' size={'lg'}>
								Start now.
							</Button>
						</Link>
					)}

					<div className='mt-24'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4 mt-2'>
							{featuredItems.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>

				<img src={men} className='w-1/5 ml-12' />
			</div>

			<ProgramsPage />
		</>
	)
}

export default HomePage
