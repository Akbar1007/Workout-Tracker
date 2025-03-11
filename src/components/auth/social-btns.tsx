import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Social = () => {
	return (
		<>
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-4'>
				<Button className='h-12' variant={'secondary'}>
					<FaGithub className='mr-2' />
					<span>Continue with GitHub</span>
				</Button>

				<Button className='h-12' variant={'destructive'}>
					<FaGoogle className='mr-2' />
					<span>Continue with Google</span>
				</Button>
			</div>
		</>
	)
}

export default Social
