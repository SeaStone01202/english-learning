"use client";

interface MultipleChoiceProps {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function MultipleChoice({
  question,
  options,
  value,
  onChange,
}: MultipleChoiceProps) {
  return (
    <div className="question-item">
      <p className="question-text">{question}</p>
      <div className="options-container">
        {options.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={value === option}
              {/* onChange={(e) => onChange(e.target.value)} */}
            onChange={(e) => {
  console.log(e.target.value);
  onChange(e.target.value);
}}
              className="radio-input"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
