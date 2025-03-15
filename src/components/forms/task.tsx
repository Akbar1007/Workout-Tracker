import { taskSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const TaskForm = () => {
	// title will come form props

	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title: '' },
	})

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		const { title } = values
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Enter a task'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-end'>
						<Button type='submit' disabled={isLoading}>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</>
	)
}

export default TaskForm
