import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { programs } from '@/constants'
import { FaArrowRight } from 'react-icons/fa'

const ProgramsPage = () => {
	return (
		<div className='container max-w-5xl mx-auto'>
			<h1 className='text-4xl pt-22'>Available Programs</h1>
			<p className='mt-2 text-muted-foreground'>
				Programs offer day-to-day guidance on an interactive calendar to keep
				you on track.
			</p>
			<div className='grid grid-cols-3 gap-4 my-8'>
				{programs.map(item => (
					<Card key={item.title} className='relative p-8 cursor-pointer group'>
						<h3>{item.title}</h3>
						<p className='text-sm text-muted-foreground mt-2 ml-2'>
							{item.description}
						</p>
						<Button
							size={'icon'}
							variant={'ghost'}
							className='absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform'
						>
							<FaArrowRight />
						</Button>
					</Card>
				))}
			</div>
		</div>
	)
}

export default ProgramsPage
