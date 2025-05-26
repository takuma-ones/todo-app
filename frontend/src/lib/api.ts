import axios from '@/lib/axios'
import { TaskListSchema, TaskSchema } from '@/types/task'

export async function fetchTasks(params?: { summary?: string; statusList?: string[] }) {
  const queryParams = new URLSearchParams()

  if (params?.summary) {
    queryParams.append('summary', params.summary)
  }
  if (params?.statusList) {
    params.statusList.forEach(status => {
      queryParams.append('statusList', status)
    })
  }

  const res = await axios.get(`/tasks?${queryParams.toString()}`)
  return TaskListSchema.parse(res.data)
}

export async function fetchTask(id: number) {
  const res = await axios.get(`/tasks/${id}`)
  return TaskSchema.parse(res.data)
}
