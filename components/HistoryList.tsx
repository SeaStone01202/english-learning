"use client";

import Link from "next/link";

interface HistoryItem {
  id: string;
  topic: string;
  skill: string;
  score: number;
  date: string;
  totalQuestions: number;
}

interface HistoryListProps {
  history: HistoryItem[];
}

export default function HistoryList({ history }: HistoryListProps) {
  return (
    <div className="history-list">
      {history.length === 0 ? (
        <p className="empty-message">
          No practice history yet. Start practicing!
        </p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Skill</th>
              <th>Score</th>
              <th>Questions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="history-table-row">
                <td>
                  <Link href={`/history/${item.id}`} className="history-link">
                    {item.topic}
                  </Link>
                </td>
                <td>
                  <span className="skill-badge">{item.skill}</span>
                </td>
                <td>
                  <span
                    className={`score-badge ${item.score >= 80 ? "good" : item.score >= 60 ? "okay" : "needs-work"}`}
                  >
                    {item.score}%
                  </span>
                </td>
                <td>{item.totalQuestions}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
