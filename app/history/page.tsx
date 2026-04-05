"use client";

import HistoryList from "@/components/HistoryList";
import { getAttempts } from "@/services/attemptService";
import { getExerciseById } from "@/services/exerciseService";
import { useEffect, useState } from "react";

interface HistoryItem {
  id: string;
  topic: string;
  skill: string;
  score: number;
  date: string;
  totalQuestions: number;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const attempts = await getAttempts(10);

        if (attempts) {
          const historyItems: HistoryItem[] = [];

          for (const attempt of attempts) {
            // Fetch exercise details
            const exercise = await getExerciseById(attempt.exercise_id);

            if (exercise) {
              historyItems.push({
                id: attempt.id,
                topic: exercise.topic,
                skill: exercise.skill,
                score: attempt.score,
                date: attempt.created_at,
                totalQuestions: exercise.questions.length,
              });
            }
          }

          setHistory(historyItems);
        }
      } catch (err) {
        console.log("Error loading history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  return (
    <div className="page-container">
      <h1>Practice History</h1>
      <p className="page-description">
        View your past practice sessions and track your progress.
      </p>
      {isLoading ? (
        <p className="loading-message">Loading history...</p>
      ) : (
        <HistoryList history={history} />
      )}
    </div>
  );
}
