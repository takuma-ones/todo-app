'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { fetchTasks } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types/task'

export default function TaskListTable() {
  const searchParams = useSearchParams()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const summary = searchParams.get('summary') ?? ''
    const statusListRaw = searchParams.getAll('statusList')
    const statusList = statusListRaw.length > 0 ? statusListRaw : []

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetchTasks({
          summary,
          statusList,
        })
        setTasks(result)
      } catch (e) {
        console.error(e)
        setError('タスクの取得中にエラーが発生しました。')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  if (isLoading) {
    return <p>読み込み中...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <p>タスクがありません。</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="rounded shadow">
              <Link
                href={`/tasks/${task.id}`}
                className="block border p-4 rounded hover:bg-blue-50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-blue-600 flex gap-4">
                  <Badge className="inline-flex items-center justify-center w-20 h-6">
                    {task.status}
                  </Badge>
                  {task.summary}
                </h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
