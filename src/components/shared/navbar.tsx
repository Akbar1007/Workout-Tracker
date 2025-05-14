import { Link } from 'react-router-dom'

import { navLinks } from '@/constants'
import { useUserState } from '@/stores/user.store'
import { Button } from '../ui/button'
import { ModeToggle } from './mode-toggle'
import UserBox from './user-box'

const Navbar = () => {
	const { user } = useUserState()

	return (
		<div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
			<div className='container max-w-6xl mx-auto h-full flex justify-between items-center'>
				<Link to={'/'}>
					<h1 className='text-2xl font-bold pl-2'>WORKOUT TRACKER</h1>
				</Link>
				<div className='flex items-center gap-3'>
					{navLinks.map(link => (
						<Link
							to={link.path}
							key={link.path}
							className='font-medium hover:underline'
						>
							{link.label}
						</Link>
					))}
					<ModeToggle />

					{user ? (
						<UserBox />
					) : (
						<Link to={'auth'}>
							<Button
								variant={'secondary'}
								className='cursor-pointer'
								aria-label='join'
							>
								Join for Free
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
