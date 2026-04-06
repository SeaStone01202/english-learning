"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Headphones } from "lucide-react"

interface ListeningProps {
  question: string
  value: string
  onChange: (value: string) => void
}

export default function Listening({
  question,
  value,
  onChange,
}: ListeningProps) {
  return (
    <Card className="p-6 border-l-4 border-l-primary">
      <p className="font-semibold text-base mb-4 text-foreground">{question}</p>
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
        <Headphones className="h-4 w-4" />
        <span>Listen to the audio and type your answer below</span>
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type what you hear..."
      />
    </Card>
  )
}
