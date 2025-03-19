import { db } from '@/firebase'
import { ITask, ITaskData } from '@types'
import { collection, getDocs, query } from 'firebase/firestore'

export const TaskService = {
	getTasks: async () => {
		let weekTotal = 0
		let monthTotal = 0
		let total = 0

		const q = query(collection(db, 'tasks'))
		const querySnapshot = await getDocs(q)

		let taskData: ITaskData

		const tasks = querySnapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		})) as ITask[]

		taskData = {
			tasks,
			weekTotal,
			monthTotal,
			total,
		}

		return taskData
	},
}
