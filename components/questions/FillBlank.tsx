"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface FillBlankProps {
  question: string
  value: string
  onChange: (value: string) => void
}

export default function FillBlank({
  question,
  value,
  onChange,
}: FillBlankProps) {
  return (
    <Card className="p-6 border-l-4 border-l-primary">
      <p className="font-semibold text-base mb-4 text-foreground">{question}</p>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer here..."
      />
    </Card>
  )
}
