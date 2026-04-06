"use client"

import ExerciseForm from "@/components/ExerciseForm"
import QuestionRenderer from "@/components/questions/QuestionRenderer"
import ResultView from "@/components/ResultView"
import { useGenerateExercise, useSubmitAttempt } from "@/hooks/useApi"
import { Question } from "@/lib/ai/generateQuestions"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PracticePage() {
  const { generate, isLoading: isGenerating } = useGenerateExercise()
  const { submit, isLoading: isSubmitting } = useSubmitAttempt()

  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [score, setScore] = useState<number | null>(null)
  const [exerciseId, setExerciseId] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!selectedSkill || !selectedTopic) {
      alert("Please select skill and topic")
      return
    }

    const result = await generate(selectedSkill, selectedTopic)

    if (result) {
      setExerciseId(result.exerciseId)
      setQuestions(result.questions)
      setAnswers({})
      setShowResults(false)
      setResults([])
      setScore(null)
      console.log("Generated with Gemini:", result.questions)
    }
  }

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async () => {
    if (!exerciseId) {
      alert("No exercise loaded")
      return
    }

    const result = await submit(exerciseId, questions, answers)

    if (result) {
      setResults(result.results)
      setScore(result.score)
      setShowResults(true)
      console.log("Submitted with Gemini:", result)
    }
  }

  const handleReset = () => {
    setSelectedSkill("")
    setSelectedTopic("")
    setQuestions([])
    setAnswers({})
    setShowResults(false)
    setExerciseId(null)
    setResults([])
    setScore(null)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Practice</h1>
        <p className="text-muted-foreground">
          Generate and complete exercises to improve your English skills
        </p>
      </div>

      {questions.length === 0 ? (
        <div className="flex justify-center">
          <ExerciseForm
            selectedSkill={selectedSkill}
            onSkillChange={setSelectedSkill}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            onGenerate={handleGenerate}
            isLoading={isGenerating}
          />
        </div>
      ) : showResults ? (
        <ResultView
          questions={questions}
          answers={answers}
          results={results}
          score={score}
          onReset={handleReset}
        />
      ) : (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-2 mb-6">
              <h2 className="text-2xl font-bold">
                {selectedTopic} - {selectedSkill.charAt(0).toUpperCase() + selectedSkill.slice(1)}
              </h2>
              <p className="text-muted-foreground">
                Answer all questions ({Object.keys(answers).length}/{questions.length} answered)
              </p>
            </div>

            <div className="space-y-6">
              {questions.map((question) => (
                <div key={question.id}>
                  <QuestionRenderer
                    question={question}
                    value={answers[question.id] || ""}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="lg"
                className="flex-1"
              >
                {isSubmitting ? "Submitting..." : "Submit Answers"}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
