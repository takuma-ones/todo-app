import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-6">タスク管理を始める</h1>

      <Link href="/tasks" passHref>
        <Button variant="default">始める</Button>
      </Link>
    </div>
  )
}
