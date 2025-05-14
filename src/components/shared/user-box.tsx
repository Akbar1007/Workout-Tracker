import { LogOut, LucideLoader2 } from 'lucide-react'
import { CgGym } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'
import { useUserState } from '@/stores/user.store'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const UserBox = () => {
	const { user, setUser } = useUserState()

	const navigate = useNavigate()

	if (!user) return <LucideLoader2 className='animate-spin' />

	const onLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/auth')
		})
	}

	const onDashboard = () => {
		navigate('/dashboard')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user.photoURL!} alt='avatar-image' />
					<AvatarFallback
						role='img'
						aria-label='picture-fallback'
						className='uppercase'
					>
						{user.email![0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary/50 p-1'>
							<Avatar>
								<AvatarImage src={user.photoURL!} />
								<AvatarFallback className='uppercase'>
									{user.email![0]}
								</AvatarFallback>
							</Avatar>
						</div>

						<div className='space-y-1'>
							{/* adds ... if it is too long */}
							<p className='line-clamp-1'>{user.displayName ?? user.email}</p>
						</div>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={onDashboard}>
						<CgGym className='w-4 h-4 mr-2' />
						<span>Training</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						className='cursor-pointer bg-destructive'
						onClick={onLogout}
					>
						<LogOut className='w-4 h-4 mr-2' />
						<span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
