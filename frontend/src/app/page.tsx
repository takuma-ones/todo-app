import Link from 'next/link'
import { fetchTasks } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function Home() {
  const tasks = await fetchTasks()

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      {/* タイトルと新規追加ボタンを横並びに */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">タスク一覧</h1>
        <Link href="/tasks/create" passHref>
          <Button variant="default">新規追加</Button>
        </Link>
      </div>

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
