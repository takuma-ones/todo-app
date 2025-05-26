'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import TaskSearchForm from '@/components/tasks/TaskSearchForm'
import TaskListTable from '@/components/tasks/TaskListTable'

export default function TaskPage() {
  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">タスク一覧</h1>

        <Link href="/tasks/create" passHref>
          <Button variant="default">新規追加</Button>
        </Link>
      </div>

      <TaskSearchForm />
      <TaskListTable />
    </div>
  )
}
