// Mock data for questions
export interface Question {
  id: number;
  type: "fill_blank" | "multiple_choice" | "writing" | "listening";
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export const mockQuestions: Question[] = [
  {
    id: 1,
    type: "fill_blank",
    question: "She ___ (go) to school every day.",
    correctAnswer: "goes",
    explanation:
      'Use "goes" for third person singular present tense with "she".',
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "He ___ football.",
    options: ["play", "plays", "played"],
    correctAnswer: "plays",
    explanation: '"plays" is correct for third person singular.',
  },
  {
    id: 3,
    type: "writing",
    question: "Write a sentence about your favorite hobby.",
    correctAnswer: "",
    explanation: "Good efforts on expressing yourself in English!",
  },
  {
    id: 4,
    type: "listening",
    question:
      'What is the main topic? (Sample: "Today we discuss...") - correct answer is "weather"',
    correctAnswer: "weather",
    explanation: "The speaker was talking about the weather forecast.",
  },
];

export interface HistoryItem {
  id: number;
  topic: string;
  skill: string;
  score: number;
  date: string;
  totalQuestions: number;
}

export const mockHistory: HistoryItem[] = [
  {
    id: 1,
    topic: "Present Tense",
    skill: "grammar",
    score: 75,
    date: "2026-04-01",
    totalQuestions: 4,
  },
  {
    id: 2,
    topic: "Food Vocabulary",
    skill: "vocab",
    score: 90,
    date: "2026-03-28",
    totalQuestions: 4,
  },
  {
    id: 3,
    topic: "Basic Greetings",
    skill: "speaking",
    score: 85,
    date: "2026-03-25",
    totalQuestions: 4,
  },
];
