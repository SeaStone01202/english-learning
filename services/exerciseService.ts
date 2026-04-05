import { Question } from "@/lib/mockData";
import { supabase } from "@/lib/supabase";

export interface Exercise {
  id: string;
  skill: string;
  topic: string;
  questions: Question[];
  created_at: string;
}

/**
 * Create a new exercise and save to Supabase
 */
export async function createExercise(
  skill: string,
  topic: string,
  questions: Question[],
): Promise<Exercise | null> {
  try {
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
      console.log("Error creating exercise:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("Exception creating exercise:", err);
    return null;
  }
}

/**
 * Get exercise by ID
 */
export async function getExerciseById(id: string): Promise<Exercise | null> {
  try {
    const { data, error } = await supabase
      .from("exercises")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching exercise:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.log("Exception fetching exercise:", err);
    return null;
  }
}
