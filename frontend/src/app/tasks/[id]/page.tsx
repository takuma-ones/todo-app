import { fetchTask } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

type TaskDetailPageProps = {
  params: { id: string }
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const id = Number(params.id)
  if (isNaN(id)) return notFound()

  try {
    const task = await fetchTask(id)

    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6" >
        {/* 戻るボタン */}
        <Link href="/" passHref>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            戻る
          </Button>
        </Link>

        {/* 見出し + ステータス */}
        <div className="flex items-center gap-4 mt-6">
          <Badge>{task.status}</Badge>
          <h1 className="text-2xl font-bold">{task.summary}</h1>
        </div>

        {/* 区切り線 */}
        <hr />

        {/* 詳細内容 */}
        <div className="text-gray-700 whitespace-pre-wrap">
          {task.description || <span className="text-gray-400 italic">詳細はありません</span>}
        </div>
      </div>
    )
  } catch {
    return notFound()
  }
}
