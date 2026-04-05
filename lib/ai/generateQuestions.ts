import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Question {
  id: number;
  type: "fill_blank" | "multiple_choice" | "writing" | "listening";
  question: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

/**
 * Generate questions using Google Gemini API
 */
export async function generateQuestionsWithAI(
  skill: string,
  topic: string,
): Promise<Question[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate 10 English learning questions for ${skill} skill about the topic: "${topic}".
Mix question types: fill_blank, multiple_choice, writing, and listening.
    
Return ONLY a valid JSON array (no markdown, no extra text) with this exact structure:
[
  {
    "id": 1,
    "type": "fill_blank",
    "question": "She ___ (go) to school.",
    "options": null,
    "correctAnswer": "goes",
    "explanation": "Use goes for third person singular."
  },
  {
    "id": 2,
    "type": "multiple_choice",
    "question": "He ___ football.",
    "options": ["play", "plays", "played"],
    "correctAnswer": "plays",
    "explanation": "Correct form for he/she/it."
  },
  ...more questions (total 10)
]

Make sure:
1. Each question has id (1-10), type, question, correctAnswer, explanation
2. Multiple choice questions have options array with 3-4 options
3. Writing/listening questions can have empty correctAnswer
4. Mix different question types evenly
5. Return ONLY the JSON array, nothing else`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response:", text.substring(0, 200)); // Log first 200 chars

    // Parse JSON response - handle both plain JSON and JSON in code blocks
    let jsonMatch = text.match(/\[[\s\S]*\]/);

    // If not found, try to find JSON within markdown code blocks
    if (!jsonMatch) {
      jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonMatch[0] = jsonMatch[1]; // Extract JSON from markdown
      }
    }

    if (!jsonMatch) {
      console.error("Could not find JSON in Gemini response");
      throw new Error("Invalid response format from Gemini");
    }

    const questions: Question[] = JSON.parse(jsonMatch[0]);
    console.log("Successfully parsed questions:", questions.length);
    return questions;
  } catch (err) {
    console.error("Error generating questions with Gemini:", err);
    throw new Error(
      `Failed to generate questions: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

/**
 * Check answers using Google Gemini API
 */
export interface CheckAnswerResult {
  id: number;
  correct: boolean;
  correctAnswer?: string;
  explanation: string;
}

export async function checkAnswersWithAI(
  questions: Question[],
  answers: Record<number, string>,
): Promise<CheckAnswerResult[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const questionsText = questions
      .map(
        (q) =>
          `Q${q.id}: ${q.question} (Type: ${q.type}) (Correct: ${q.correctAnswer})`,
      )
      .join("\n");

    const answersText = Object.entries(answers)
      .map(([qId, answer]) => `Q${qId}: ${answer}`)
      .join("\n");

    const prompt = `Check these English learning answers and provide detailed feedback.

Questions:
${questionsText}

User Answers:
${answersText}

Return ONLY a valid JSON array (no markdown, no extra text). For each question, return:
[
  {
    "id": 1,
    "correct": true,
    "correctAnswer": "goes",
    "explanation": "Correct! Use goes for third person singular."
  },
  {
    "id": 2,
    "correct": false,
    "correctAnswer": "plays",
    "explanation": "Incorrect. The correct answer is 'plays' because..."
  }
]

Return ONLY the JSON array, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("Gemini check response:", text.substring(0, 200)); // Log first 200 chars

    // Parse JSON response - handle both plain JSON and JSON in code blocks
    let jsonMatch = text.match(/\[[\s\S]*\]/);

    // If not found, try to find JSON within markdown code blocks
    if (!jsonMatch) {
      jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        jsonMatch[0] = jsonMatch[1]; // Extract JSON from markdown
      }
    }

    if (!jsonMatch) {
      console.error("Could not find JSON in Gemini check response");
      throw new Error("Invalid response format from Gemini");
    }

    const results: CheckAnswerResult[] = JSON.parse(jsonMatch[0]);
    console.log("Successfully parsed results:", results.length);
    return results;
  } catch (err) {
    console.error("Error checking answers with Gemini:", err);
    throw new Error(
      `Failed to check answers: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}
