"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ExerciseFormProps {
  selectedSkill: string
  onSkillChange: (skill: string) => void
  selectedTopic: string
  onTopicChange: (topic: string) => void
  onGenerate: () => void
  isLoading?: boolean
}

export default function ExerciseForm({
  selectedSkill,
  onSkillChange,
  selectedTopic,
  onTopicChange,
  onGenerate,
  isLoading = false,
}: ExerciseFormProps) {
  const skills = ["grammar", "vocab", "speaking", "listening"]

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Generate Exercise</CardTitle>
        <CardDescription>Choose your skill level and topic</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="skill" className="text-sm font-medium">
            Skill
          </label>
          <Select
            id="skill"
            value={selectedSkill}
            onChange={(e) => onSkillChange(e.target.value)}
          >
            <option value="">Select a skill...</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill.charAt(0).toUpperCase() + skill.slice(1)}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium">
            Topic
          </label>
          <Input
            id="topic"
            type="text"
            value={selectedTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            placeholder="e.g., Present Tense, Food Vocabulary"
          />
        </div>

        <Button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? "Generating..." : "Generate Exercise"}
        </Button>
      </CardContent>
    </Card>
  )
}
