"use client";

import { Question } from "@/lib/mockData";
import FillBlank from "./FillBlank";
import Listening from "./Listening";
import MultipleChoice from "./MultipleChoice";
import Writing from "./Writing";

interface QuestionRendererProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionRenderer({
  question,
  value,
  onChange,
}: QuestionRendererProps) {
  switch (question.type) {
    case "fill_blank":
      return (
        <FillBlank
          question={question.question}
          value={value}
          onChange={onChange}
        />
      );
    case "multiple_choice":
      return (
        <MultipleChoice
          question={question.question}
          options={question.options || []}
          value={value}
          onChange={onChange}
        />
      );
    case "writing":
      return (
        <Writing
          question={question.question}
          value={value}
          onChange={onChange}
        />
      );
    case "listening":
      return (
        <Listening
          question={question.question}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return <p>Unknown question type</p>;
  }
}
