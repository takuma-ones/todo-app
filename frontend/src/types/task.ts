// types/task.ts
import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.number(),
  summary: z.string(),
  description: z.string().optional(),
  status: z.string(),
})

export const TaskListSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>
