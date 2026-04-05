"use client";

interface ExerciseFormProps {
  selectedSkill: string;
  onSkillChange: (skill: string) => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  onGenerate: () => void;
  isLoading?: boolean;
}

export default function ExerciseForm({
  selectedSkill,
  onSkillChange,
  selectedTopic,
  onTopicChange,
  onGenerate,
  isLoading = false,
}: ExerciseFormProps) {
  const skills = ["grammar", "vocab", "speaking", "listening"];

  return (
    <div className="exercise-form">
      <div className="form-group">
        <label htmlFor="skill">Skill:</label>
        <select
          id="skill"
          value={selectedSkill}
          onChange={(e) => onSkillChange(e.target.value)}
          className="form-select"
        >
          <option value="">Select a skill...</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill.charAt(0).toUpperCase() + skill.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="topic">Topic:</label>
        <input
          id="topic"
          type="text"
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="e.g., Present Tense, Food Vocabulary"
          className="form-input"
        />
      </div>

      <button onClick={onGenerate} disabled={isLoading} className="btn-primary">
        {isLoading ? "Generating..." : "Generate Exercise"}
      </button>
    </div>
  );
}
