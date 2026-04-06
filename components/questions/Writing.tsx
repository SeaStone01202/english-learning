"use client"

import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

interface WritingProps {
  question: string
  value: string
  onChange: (value: string) => void
}

export default function Writing({ question, value, onChange }: WritingProps) {
  return (
    <Card className="p-6 border-l-4 border-l-primary">
      <p className="font-semibold text-base mb-4 text-foreground">{question}</p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
        rows={5}
      />
    </Card>
  )
}
