"use client";

interface ListeningProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Listening({
  question,
  value,
  onChange,
}: ListeningProps) {
  return (
    <div className="question-item">
      <p className="question-text">{question}</p>
      <p className="listening-note">🎧 Listen to the audio and answer below:</p>
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
