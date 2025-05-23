// lib/api.ts
import axios from '@/lib/axios'
import { TaskListSchema, TaskSchema } from '@/types/task'

export async function fetchTasks() {
  const res = await axios.get('/tasks')
  return TaskListSchema.parse(res.data)
}

export async function fetchTask(id: number) {
  const res = await axios.get(`/tasks/${id}`)
  return TaskSchema.parse(res.data)
}
