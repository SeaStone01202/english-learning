"use client"

import HistoryList from "@/components/HistoryList"
import { getAttempts } from "@/services/attemptService"
import { getExerciseById } from "@/services/exerciseService"
import { useEffect, useState } from "react"

interface HistoryItem {
  id: string
  topic: string
  skill: string
  score: number
  date: string
  totalQuestions: number
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const attempts = await getAttempts(10)

        if (attempts) {
          const historyItems: HistoryItem[] = []

          for (const attempt of attempts) {
            const exercise = await getExerciseById(attempt.exercise_id)

            if (exercise) {
              historyItems.push({
                id: attempt.id,
                topic: exercise.topic,
                skill: exercise.skill,
                score: attempt.score,
                date: attempt.created_at,
                totalQuestions: exercise.questions.length,
              })
            }
          }

          setHistory(historyItems)
        }
      } catch (err) {
        console.log("Error loading history:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadHistory()
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Practice History</h1>
        <p className="text-muted-foreground">
          View your past practice sessions and track your progress over time.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading history...</p>
        </div>
      ) : (
        <HistoryList history={history} />
      )}
    </div>
  )
}
