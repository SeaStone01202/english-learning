"use client";

interface FillBlankProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FillBlank({
  question,
  value,
  onChange,
}: FillBlankProps) {
  return (
    <div className="question-item">
      <p className="question-text">{question}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer"
        className="input-field"
      />
    </div>
  );
}
