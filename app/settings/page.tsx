"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedKey = localStorage.getItem("apiKey") || ""
    setApiKey(savedKey)
  }, [])

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setError("API key cannot be empty")
      return
    }
    localStorage.setItem("apiKey", apiKey)
    setSaveSuccess(true)
    setError(null)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleClearApiKey = () => {
    setApiKey("")
    localStorage.removeItem("apiKey")
    setSaveSuccess(true)
    setError(null)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences and API configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Store your API key securely in your browser for AI-powered exercises
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value)
                setError(null)
              }}
              placeholder="Enter your Google Generative AI API key"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser for security. Learn more at{" "}
              <a
                href="https://ai.google.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ai.google.dev
              </a>
            </p>
          </div>

          {error && (
            <div className="flex gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-200">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="flex gap-3 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-700 dark:text-green-200">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>Settings saved successfully!</span>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSaveApiKey} size="lg" className="flex-1">
              Save API Key
            </Button>
            <Button
              onClick={handleClearApiKey}
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Clear API Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            English Learning App helps you improve your English skills through interactive exercises in grammar, vocabulary, speaking, and listening.
          </p>
          <p>
            Version <span className="font-mono">1.0.0</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
