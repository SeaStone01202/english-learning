"use client";

import { Question } from "@/lib/mockData";

interface ResultViewProps {
  questions: Question[];
  answers: Record<number, string>;
  onReset: () => void;
}

export default function ResultView({
  questions,
  answers,
  onReset,
}: ResultViewProps) {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      const userAnswer = answers[q.id]?.trim().toLowerCase() || "";
      const correctAnswer = q.correctAnswer.trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="result-view">
      <h2>Results</h2>
      <div className="score-summary">
        <div className="score-display">
          <span className="score-number">{percentage}%</span>
          <span className="score-text">
            {score} out of {total} correct
          </span>
        </div>
      </div>

      <div className="result-details">
        {questions.map((q) => {
          const userAnswer = answers[q.id] || "";
          const isCorrect =
            userAnswer.trim().toLowerCase() ===
            q.correctAnswer.trim().toLowerCase();

          return (
            <div
              key={q.id}
              className={`result-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <div className="result-header">
                <span
                  className={`result-status ${isCorrect ? "correct" : "incorrect"}`}
                >
                  {isCorrect ? "✓" : "✗"}
                </span>
                <p className="result-question">{q.question}</p>
              </div>
              <div className="result-body">
                <p>
                  <strong>Your answer:</strong> {userAnswer || "(empty)"}
                </p>
                {!isCorrect && (
                  <p>
                    <strong>Correct answer:</strong> {q.correctAnswer}
                  </p>
                )}
                <p className="result-explanation">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onReset} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
