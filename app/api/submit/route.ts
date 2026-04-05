import {
  checkAnswersWithAI,
  type CheckAnswerResult,
  type Question,
} from "@/lib/ai/generateQuestions";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface SubmitRequest {
  exerciseId: string;
  questions: Question[];
  answers: Record<number, string>;
}

interface SubmitResponse {
  results: CheckAnswerResult[];
  score: number;
  attemptId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitRequest = await request.json();
    const { exerciseId, questions, answers } = body;

    // Validate input
    if (!exerciseId || !questions || !answers) {
      return NextResponse.json(
        { error: "exerciseId, questions, and answers are required" },
        { status: 400 },
      );
    }

    // Check answers using AI
    const results = await checkAnswersWithAI(questions, answers);

    // Calculate score
    const correctCount = results.filter((r) => r.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);

    // Convert results to results object for storage
    const resultsObject: Record<number, boolean> = {};
    results.forEach((r) => {
      resultsObject[r.id] = r.correct;
    });

    // Save attempt to Supabase
    const { data, error } = await supabase
      .from("attempts")
      .insert([
        {
          exercise_id: exerciseId,
          answers,
          results: resultsObject,
          score,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save attempt" },
        { status: 500 },
      );
    }

    const response: SubmitResponse = {
      results,
      score,
      attemptId: data.id,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log("Error in POST /api/submit:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
