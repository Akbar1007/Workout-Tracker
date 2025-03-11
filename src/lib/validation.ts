import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(8, 'Wrong password'),
})

export const registerSchema = z
	.object({
		email: z.string().email('Invalid email'),
		password: z.string().min(8, 'Wrong password'),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Password do not match.',
		path: ['confirmPassword'],
	})
