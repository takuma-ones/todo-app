'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const STATUS_OPTIONS = ['TODO', 'DOING', 'DONE'] as const

export default function TaskSearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [summary, setSummary] = useState(searchParams.get('summary') || '')
  const [statusList, setStatusList] = useState<string[]>(searchParams.getAll('statusList'))

  const handleCheckboxChange = (status: string, checked: boolean) => {
    setStatusList((prev) =>
      checked ? [...prev, status] : prev.filter((s) => s !== status)
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (summary.trim()) {
      params.append('summary', summary.trim())
    }
    statusList.forEach((status) => {
      params.append('statusList', status)
    })

    router.push(`/tasks?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="キーワードで検索"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <Button type="submit">検索</Button>
      </div>

      <div className="flex gap-4">
        {STATUS_OPTIONS.map((status) => (
          <Label key={status} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              value={status}
              checked={statusList.includes(status)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(status, checked === true)
              }
            />
            {status}
          </Label>
        ))}
      </div>
    </form>
  )
}
