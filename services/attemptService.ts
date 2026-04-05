import { supabase } from "@/lib/supabase";
import { getExerciseById } from "./exerciseService";

export interface Attempt {
  id: string;
  exercise_id: string;
  answers: Record<number, string>;
  results: Record<number, boolean>;
  score: number;
  created_at: string;
}

export interface AttemptDetail extends Attempt {
  exercise?: {
    topic: string;
    skill: string;
    questions: any[];
  };
}

/**
 * Create a new attempt (user submission)
 */
export async function createAttempt(
  exerciseId: string,
  answers: Record<number, string>,
  results: Record<number, boolean>,
  score: number,
): Promise<Attempt | null> {
  try {
    const { data, error } = await supabase
      .from("attempts")
      .insert([
        {
          exercise_id: exerciseId,
          answers,
          results,
          score,
        },
      ])
      .select()
      .single();

    if (error) {
      console.log("Error creating attempt:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("Exception creating attempt:", err);
    return null;
  }
}

/**
 * Get recent attempts (for history page)
 */
export async function getAttempts(
  limit: number = 10,
): Promise<Attempt[] | null> {
  try {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("Error fetching attempts:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("Exception fetching attempts:", err);
    return null;
  }
}

/**
 * Get attempt details including exercise info
 */
export async function getAttemptDetail(
  id: string,
): Promise<AttemptDetail | null> {
  try {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching attempt detail:", error);
      return null;
    }

    // Fetch exercise details
    const exercise = await getExerciseById(data.exercise_id);

    return {
      ...data,
      exercise: exercise || undefined,
    };
  } catch (err) {
    console.log("Exception fetching attempt detail:", err);
    return null;
  }
}
