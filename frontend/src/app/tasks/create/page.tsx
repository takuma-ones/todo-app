import TaskForm from '@/components/tasks/TaskForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CreateTaskPage() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <Link href="/" passHref>
        <Button variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          戻る
        </Button>
      </Link>
      <h1 className="text-2xl font-bold mt-6">タスク新規作成</h1>
      <TaskForm submitLabel="作成" />
    </div>
  )
}
