import { Question } from "@/lib/ai/generateQuestions";
import { useState } from "react";

interface GenerateResponse {
  exerciseId: string;
  questions: Question[];
}

export function useGenerateExercise() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (
    skill: string,
    topic: string,
  ): Promise<GenerateResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill, topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate exercise");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      console.log("Error generating exercise:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { generate, isLoading, error };
}

interface CheckAnswerResult {
  id: number;
  correct: boolean;
  correctAnswer?: string;
  explanation: string;
}

interface SubmitResponse {
  results: CheckAnswerResult[];
  score: number;
  attemptId: string;
}

export function useSubmitAttempt() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (
    exerciseId: string,
    questions: Question[],
    answers: Record<number, string>,
  ): Promise<SubmitResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseId, questions, answers }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attempt");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      console.log("Error submitting attempt:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, isLoading, error };
}
