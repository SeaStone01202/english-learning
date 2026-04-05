import {
  generateQuestionsWithAI,
  type Question,
} from "@/lib/ai/generateQuestions";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface GenerateRequest {
  skill: string;
  topic: string;
}

interface GenerateResponse {
  exerciseId: string;
  questions: Question[];
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { skill, topic } = body;

    // Validate input
    if (!skill || !topic) {
      return NextResponse.json(
        { error: "skill and topic are required" },
        { status: 400 },
      );
    }

    // Generate questions using AI
    const questions = await generateQuestionsWithAI(skill, topic);

    // Save exercise to Supabase
    const { data, error } = await supabase
      .from("exercises")
      .insert([
        {
          skill,
          topic,
          questions,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save exercise" },
        { status: 500 },
      );
    }

    const response: GenerateResponse = {
      exerciseId: data.id,
      questions,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.log("Error in POST /api/generate:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
