'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function DeleteTaskForm({ taskId }: { taskId: number }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('本当に削除しますか？')) {
      e.preventDefault()
    }
  }

  return (
    <form method="POST" action={`/tasks/${taskId}`} onSubmit={handleSubmit}>
      <input type="hidden" name="_method" value="DELETE" />
      <Button type="submit" variant="destructive" className="flex items-center gap-1">
        <Trash2 className="w-4 h-4" />
        削除
      </Button>
    </form>
  )
}
