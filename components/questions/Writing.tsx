"use client";

interface WritingProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Writing({ question, value, onChange }: WritingProps) {
  return (
    <div className="question-item">
      <p className="question-text">{question}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
        className="textarea-field"
        rows={5}
      />
    </div>
  );
}
