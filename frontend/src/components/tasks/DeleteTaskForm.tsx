'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

export default function DeleteTaskForm({ taskId }: { taskId: number }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('本当に削除しますか？')) return

    try {
      await axios.delete(`/tasks/${taskId}`)
      router.push('/') // 一覧ページなどへリダイレクト
    } catch (error) {
      alert('削除に失敗しました')
      console.error(error)
    }
  }

  return (
    <Button onClick={handleDelete} variant="destructive" className="flex items-center gap-1">
      <Trash2 className="w-4 h-4" />
      削除
    </Button>
  )
}
