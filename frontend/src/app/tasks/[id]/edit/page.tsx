import TaskForm from '@/components/tasks/TaskForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchTask } from '@/lib/api'

type TaskEditPageProps = {
  params: { id: string }
}

export default async function EditTaskPage({ params }: TaskEditPageProps) {
  const id = Number(params.id)
  if (isNaN(id)) return notFound()

  try {
    const task = await fetchTask(id)

    const validStatuses = ['TODO', 'DOING', 'DONE'] as const
    const isValidStatus = (status: string): status is typeof validStatuses[number] =>
      validStatuses.includes(status as any)
    const status: 'TODO' | 'DOING' | 'DONE' = isValidStatus(task.status) ? task.status : 'TODO'

    return (
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <Link href="/" passHref>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            戻る
          </Button>
        </Link>

        <h1 className="text-2xl font-bold mt-6">タスク編集</h1>

        <TaskForm
          taskId={id}
          initialSummary={task.summary}
          initialDescription={task.description}
          initialStatus={status}
          submitLabel="更新"
        />
      </div>
    )
  } catch {
    return (
      <p className="text-center text-red-600 mt-8">タスクの読み込みに失敗しました。</p>
    )
  }
}
