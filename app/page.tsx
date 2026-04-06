"use client"

import ExerciseForm from "@/components/ExerciseForm"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, TrendingUp, BookMarked, ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!selectedSkill) {
      alert("Please select a skill")
      return
    }
    setIsLoading(true)
    try {
      window.location.href = `/practice?skill=${selectedSkill}&topic=${selectedTopic}`
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Zap,
      title: "Quick Practice",
      description: "Generate personalized exercises in seconds",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Choose specific skills and topics to master",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your improvements over time",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BookMarked,
      title: "Learn Everywhere",
      description: "Practice on any device, anytime",
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Master English <br />
            <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Practice grammar, vocabulary, speaking, and listening with AI-generated exercises tailored to your skill level. Get instant feedback and track your progress.
          </p>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="border-2 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-950/30 dark:to-cyan-950/30 border-b">
                <CardTitle className="text-xl">Generate Exercise</CardTitle>
                <CardDescription>Start your practice session</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ExerciseForm
                  selectedSkill={selectedSkill}
                  onSkillChange={setSelectedSkill}
                  selectedTopic={selectedTopic}
                  onTopicChange={setSelectedTopic}
                  onGenerate={handleGenerate}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Features & Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-3">Why Learn with Us?</h2>
            <p className="text-muted-foreground text-lg">
              Our AI-powered platform creates custom exercises that adapt to your learning pace and learning style.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Stats Section */}
          <Card className="bg-gradient-to-r from-purple-50 to-cyan-50 dark:from-purple-950/20 dark:to-cyan-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-8">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-sm text-muted-foreground font-medium">Exercises</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-secondary mb-2">4</div>
                  <p className="text-sm text-muted-foreground font-medium">Skill Types</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground font-medium">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Choose Your Focus",
              description: "Select a skill (grammar, vocab, speaking, or listening) and topic you want to practice",
            },
            {
              step: "02",
              title: "Get Personalized Content",
              description: "AI generates custom exercises tailored to your skill level and learning goals",
            },
            {
              step: "03",
              title: "Learn & Improve",
              description: "Practice with instant feedback and track your progress over time in your history",
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <Card className="h-full hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary/20 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-purple-600 to-cyan-600 border-0 overflow-hidden">
        <CardContent className="pt-12 pb-12">
          <div className="text-center text-white space-y-4">
            <h2 className="text-4xl font-bold">Ready to Start?</h2>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Choose a skill above and generate your first exercise. It only takes a few seconds!
            </p>
            <Button
              size="lg"
              onClick={() => {
                const selectElement = document.querySelector('select')
                selectElement?.focus()
              }}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
