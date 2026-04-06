"use client"

import { Question } from "@/lib/ai/generateQuestions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface ResultViewProps {
  questions: Question[]
  answers: Record<number, string>
  results?: any[]
  score?: number | null
  onReset: () => void
}

export default function ResultView({
  questions,
  answers,
  results,
  score,
  onReset,
}: ResultViewProps) {
  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      const userAnswer = answers[q.id]?.trim().toLowerCase() || ""
      const correctAnswer = q.correctAnswer.trim().toLowerCase()
      if (userAnswer === correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const finalScore = score ?? calculateScore()
  const total = questions.length
  const percentage = Math.round((finalScore / total) * 100)

  return (
    <div className="space-y-6">
      {/* Score Summary */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white/80 mb-2">Your Score</p>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold">{percentage}%</span>
                <span className="text-lg text-white/80">
                  {finalScore} out of {total} correct
                </span>
              </div>
            </div>
            <div className="text-6xl opacity-20">
              {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
            </div>
          </div>
        </div>
      </Card>

      {/* Results Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Detailed Results</h2>
        {questions.map((q) => {
          const userAnswer = answers[q.id] || ""
          const isCorrect =
            userAnswer.trim().toLowerCase() ===
            q.correctAnswer.trim().toLowerCase()

          return (
            <Card
              key={q.id}
              className={`border-l-4 ${
                isCorrect ? "border-l-green-500" : "border-l-red-500"
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-2">
                      {q.question}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Your answer: </span>
                        <span className="font-medium">{userAnswer || "(empty)"}</span>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="text-muted-foreground">Correct answer: </span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            {q.correctAnswer}
                          </span>
                        </div>
                      )}
                      <div className="mt-3 p-3 bg-muted rounded-md">
                        <span className="text-muted-foreground">Explanation: </span>
                        <span className="text-foreground">{q.explanation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={onReset} size="lg" className="flex-1">
          Try Another Exercise
        </Button>
      </div>
    </div>
  )
}
