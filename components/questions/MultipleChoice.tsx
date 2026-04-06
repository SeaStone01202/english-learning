"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface MultipleChoiceProps {
  question: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function MultipleChoice({
  question,
  options,
  value,
  onChange,
}: MultipleChoiceProps) {
  return (
    <Card className="p-6 border-l-4 border-l-primary">
      <p className="font-semibold text-base mb-4 text-foreground">{question}</p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-option`}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border border-input cursor-pointer"
            />
            <Label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer font-normal text-foreground hover:text-primary transition-colors"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  )
}
