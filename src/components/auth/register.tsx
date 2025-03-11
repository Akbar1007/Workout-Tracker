import { registerSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

const Register = () => {
	const { setAuth } = useAuthState()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password } = values
	}

	return (
		<div className='flex flex-col'>
			<h1 className='font-bold text-xl'>Register</h1>
			<p className='text-muted-foreground'>
				Already have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('login')}
				>
					Sign in
				</span>
			</p>

			<Separator className='my-3' />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input placeholder='example@gmail.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='********' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input placeholder='********' type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div>
						<Button type='submit' className='h-12 w-full mt-2'>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Register
