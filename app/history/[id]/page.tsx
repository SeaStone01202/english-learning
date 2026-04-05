"use client";

import { getAttemptDetail } from "@/services/attemptService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AttemptDetail {
  id: string;
  exercise_id: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  score: number;
  created_at: string;
  exercise?: {
    topic: string;
    skill: string;
    questions: any[];
  };
}

export default function HistoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [attempt, setAttempt] = useState<AttemptDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const detail = await getAttemptDetail(id);
        setAttempt(detail);
      } catch (err) {
        console.log("Error loading attempt detail:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div className="page-container">
        <p className="loading-message">Loading details...</p>
      </div>
    );
  }

  if (!attempt || !attempt.exercise) {
    return (
      <div className="page-container">
        <h1>Practice Detail</h1>
        <p className="empty-message">Attempt not found.</p>
      </div>
    );
  }

  const { exercise, answers, results, score } = attempt;

  return (
    <div className="page-container">
      <button
        onClick={() => router.back()}
        className="btn-link"
        style={{ marginBottom: "1rem" }}
      >
        ← Back to History
      </button>

      <h1>Practice Detail</h1>

      <div className="detail-header">
        <h2>
          {exercise.topic} - {exercise.skill}
        </h2>
        <p>
          Score: <span className="score-badge good">{score}%</span>
        </p>
        <p className="detail-date">
          {new Date(attempt.created_at).toLocaleString()}
        </p>
      </div>

      <div className="detail-content">
        {exercise.questions.map((question: any) => {
          const userAnswer = answers[question.id] || "";
          const isCorrect = results[question.id];

          return (
            <div
              key={question.id}
              className={`result-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <div className="result-header">
                <span
                  className={`result-status ${isCorrect ? "correct" : "incorrect"}`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
                <p className="result-question">{question.question}</p>
              </div>
              <div className="result-body">
                <p>
                  <strong>Your answer:</strong> {userAnswer || "(empty)"}
                </p>
                {!isCorrect && (
                  <p>
                    <strong>Correct answer:</strong> {question.correctAnswer}
                  </p>
                )}
                <p className="result-explanation">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
