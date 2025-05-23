"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ValidationErrorResponse } from "@/types/validation"
import type { AxiosError } from "axios"

export default function CreateTaskPage() {
  const router = useRouter()
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("TODO")
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFieldErrors({})
    setGeneralError("")

    try {
      await axios.post("/tasks", {
        summary,
        description,
        status,
      })
      router.push("/")
    } catch (error) {
      const axiosError = error as AxiosError<ValidationErrorResponse>

      if (
        axiosError.response?.status === 400 &&
        Array.isArray(axiosError.response.data?.errors)
      ) {
        const newErrors: Record<string, string> = {}
        axiosError.response.data.errors.forEach((e) => {
          newErrors[e.field] = e.defaultMessage
        })
        setFieldErrors(newErrors)
      } else {
        setGeneralError("タスクの作成に失敗しました。")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">タスク新規作成</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="summary">概要</Label>
          <Input
            id="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          {fieldErrors.summary && (
            <p className="text-sm text-red-600 mt-1">{fieldErrors.summary}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">詳細</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          {fieldErrors.description && (
            <p className="text-sm text-red-600 mt-1">{fieldErrors.description}</p>
          )}
        </div>

        <div>
          <Label htmlFor="status">ステータス</Label>
          <select
            id="status"
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
          {fieldErrors.status && (
            <p className="text-sm text-red-600 mt-1">{fieldErrors.status}</p>
          )}
        </div>

        {generalError && <p className="text-red-600">{generalError}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "作成中..." : "作成"}
        </Button>
      </form>
    </div>
  )
}
