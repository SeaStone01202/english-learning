"use client";

import ExerciseForm from "@/components/ExerciseForm";
import QuestionRenderer from "@/components/questions/QuestionRenderer";
import { useGenerateExercise, useSubmitAttempt } from "@/hooks/useApi";
import { Question } from "@/lib/ai/generateQuestions";
import { useState } from "react";

export default function PracticePage() {
  const { generate, isLoading: isGenerating } = useGenerateExercise();
  const { submit, isLoading: isSubmitting } = useSubmitAttempt();

  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [exerciseId, setExerciseId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedSkill || !selectedTopic) {
      alert("Please select skill and topic");
      return;
    }

    // Call API to generate questions with Gemini
    const result = await generate(selectedSkill, selectedTopic);

    if (result) {
      setExerciseId(result.exerciseId);
      setQuestions(result.questions);
      setAnswers({});
      setShowResults(false);
      setResults([]);
      setScore(null);
      console.log("Generated with Gemini:", result.questions);
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!exerciseId) {
      alert("No exercise loaded");
      return;
    }

    // Call API to check answers with Gemini
    const result = await submit(exerciseId, questions, answers);

    if (result) {
      setResults(result.results);
      setScore(result.score);
      setShowResults(true);
      console.log("Submitted with Gemini:", result);
    }
  };

  const handleReset = () => {
    setSelectedSkill("");
    setSelectedTopic("");
    setQuestions([]);
    setAnswers({});
    setShowResults(false);
    setExerciseId(null);
    setResults([]);
    setScore(null);
  };

  return (
    <div className="page-container">
      <h1>Practice</h1>

      {questions.length === 0 ? (
        <ExerciseForm
          selectedSkill={selectedSkill}
          onSkillChange={setSelectedSkill}
          selectedTopic={selectedTopic}
          onTopicChange={setSelectedTopic}
          onGenerate={handleGenerate}
          isLoading={isGenerating}
        />
      ) : showResults ? (
        <GeminiResultView
          questions={questions}
          answers={answers}
          results={results}
          score={score}
          onReset={handleReset}
        />
      ) : (
        <div className="exercise-container">
          <div className="exercise-header">
            <h2>
              {selectedTopic} - {selectedSkill}
            </h2>
            <p>
              Answer all questions ({answers ? Object.keys(answers).length : 0}/
              {questions.length} answered)
            </p>
          </div>

          <div className="questions-list">
            {questions.map((question) => (
              <div key={question.id}>
                <QuestionRenderer
                  question={question}
                  value={answers[question.id] || ""}
                  onChange={(value) => handleAnswerChange(question.id, value)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary btn-submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Answers"}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Display Gemini-powered results
 */
function GeminiResultView({
  questions,
  answers,
  results,
  score,
  onReset,
}: {
  questions: Question[];
  answers: Record<number, string>;
  results: any[];
  score: number | null;
  onReset: () => void;
}) {
  return (
    <div className="result-view">
      <h2>Results</h2>
      <div className="score-summary">
        <div className="score-display">
          <span className="score-number">{score ?? 0}%</span>
          <span className="score-text">
            {score !== null ? `Score: ${score}%` : "Checking..."}
          </span>
        </div>
      </div>

      <div className="result-details">
        {results.map((result) => {
          const question = questions.find((q) => q.id === result.id);
          const userAnswer = answers[result.id] || "";

          return (
            <div
              key={result.id}
              className={`result-item ${result.correct ? "correct" : "incorrect"}`}
            >
              <div className="result-header">
                <span
                  className={`result-status ${result.correct ? "correct" : "incorrect"}`}
                >
                  {result.correct ? "✓" : "✗"}
                </span>
                <p className="result-question">{question?.question}</p>
              </div>
              <div className="result-body">
                <p>
                  <strong>Your answer:</strong> {userAnswer || "(empty)"}
                </p>
                {!result.correct && (
                  <p>
                    <strong>Correct answer:</strong> {result.correctAnswer}
                  </p>
                )}
                <p className="result-explanation">
                  <strong>Explanation:</strong> {result.explanation}
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
