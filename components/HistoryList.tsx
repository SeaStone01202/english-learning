"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

interface HistoryItem {
  id: string
  topic: string
  skill: string
  score: number
  date: string
  totalQuestions: number
}

interface HistoryListProps {
  history: HistoryItem[]
}

export default function HistoryList({ history }: HistoryListProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    if (score >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  }

  const getSkillColor = (skill: string) => {
    const colors: Record<string, string> = {
      grammar: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      vocab: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      speaking: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      listening: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[skill] || "bg-gray-100 text-gray-800"
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No practice history yet.</p>
        <Link
          href="/practice"
          className="text-primary hover:underline flex items-center justify-center gap-2"
        >
          Start practicing now
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {history.map((item) => (
        <Link key={item.id} href={`/history/${item.id}`}>
          <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-foreground truncate">
                    {item.topic}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        item.score >= 80
                          ? "text-green-600 dark:text-green-400"
                          : item.score >= 60
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.score}%
                    </div>
                  </div>

                  <div className="text-right text-sm">
                    <Badge className={`${getSkillColor(item.skill)} mb-2`}>
                      {item.skill}
                    </Badge>
                    <p className="text-muted-foreground">
                      {item.totalQuestions} questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
