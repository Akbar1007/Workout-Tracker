import TaskForm from '@/components/forms/task-form'
import FillLoading from '@/components/shared/fill-loading'
import TaskItem from '@/components/shared/task-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase'
import { taskSchema } from '@/lib/validation'
import { TaskService } from '@/services/task.service'
import { useUserState } from '@/stores/user.store'
import { ITask } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { BadgePlus } from 'lucide-react'
import { useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { z } from 'zod'

const Dashboard = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [currentTask, setCurrentTask] = useState<ITask | null>(null)
	const [open, setOpen] = useState(false)

	const { user } = useUserState()

	const { isPending, error, data, refetch } = useQuery({
		queryKey: ['tasks-data'],
		queryFn: TaskService.getTasks,
	})
	// do not forget to remove
	console.log(data)

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null

		return addDoc(collection(db, 'tasks'), {
			title,
			status: 'unstarted',
			startTime: null,
			endTime: null,
			userId: user.uid,
		})
			.then(() => refetch())
			.finally(() => setOpen(false))
	}

	const onUpdate = ({ title }: z.infer<typeof taskSchema>) => {
		if (!user || !currentTask) return null

		const ref = doc(db, 'tasks', currentTask.id)

		return updateDoc(ref, { title })
			.then(() => refetch())
			.catch(e => console.log('Error is here:', e))
			.finally(() => setIsEditing(false))
	}

	// const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
	// 	if (!user) return null
	// 	if (!currentTask) return null
	// 	console.log('Current task:', currentTask)
	// 	console.log('Current task id:', currentTask.id)

	// 	try {
	// 		const ref = doc(db, 'tasks', currentTask.id)
	// 		console.log(currentTask.id)

	// 		await updateDoc(ref, { title })
	// 		await refetch()
	// 	} catch (e) {
	// 		console.log('Error updating doc:', e)
	// 	} finally {
	// 		setIsEditing(false)
	// 	}
	// }

	const onStartEditing = (task: ITask) => {
		setIsEditing(true)
		setCurrentTask(task)
	}

	// const onDelete = () => {

	// }

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 w-full gap-8 items-center'>
					<div className='flex flex-col space-y-3'>
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-t from-background to-secondary'>
							<div className='text-2xl font-bold'>Trainings</div>
							<Button
								size={'icon'}
								onClick={() => {
									setOpen(true)
								}}
							>
								<BadgePlus />
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between bg-gradient-to-b from-background to-secondary relative min-h-60'>
							{isPending && <FillLoading />}
							{error && (
								<Alert variant='destructive'>
									<FiAlertCircle className='h-4 w-4' />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>{error.message}</AlertDescription>
								</Alert>
							)}
							{data && (
								<div className='flex flex-col space-y-3 w-full'>
									{!isEditing &&
										data.tasks.map(task => (
											<TaskItem
												key={task.id}
												task={task}
												onStartEditing={() => onStartEditing(task)}
											/>
										))}
									{isEditing && (
										<TaskForm
											title={currentTask?.title}
											isEdit
											onClose={() => setIsEditing(false)}
											handler={onUpdate}
										/>
									)}
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col space-y-3 w-full'>
						<div className='p-4 rounded-md bg-gradient-to-r from-blue-900 to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-secondary to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>02:08:47</div>
						</div>
						<div className='p-4 rounded-md bg-gradient-to-r from-destructive to-background relative h-24'>
							<div className='text-2xl font-bold'>Total week</div>
							<div className='text-3xl font-bold'>02:08:47</div>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger></DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create a new task</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm
						handler={
							onAdd as (
								values: z.infer<typeof taskSchema>
							) => Promise<void | null>
						}
					/>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Dashboard
