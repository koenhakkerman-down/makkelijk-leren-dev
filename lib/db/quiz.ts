import { createClient } from '@/lib/supabase/server';
import { QuizSession } from '@/lib/types';

export async function createQuizSession(
  userId: string,
  lessonId?: string,
  totalQuestions: number = 0,
): Promise<QuizSession | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quiz_sessions')
    .insert([
      {
        user_id: userId,
        lesson_id: lessonId,
        total_questions: totalQuestions,
        elapsed_seconds: 0,
        correct_answers: 0,
        incorrect_answers: 0,
        percentage: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating quiz session:', error);
    return null;
  }

  return data;
}

export async function updateQuizSession(
  sessionId: string,
  userId: string,
  updates: Partial<QuizSession>,
): Promise<QuizSession | null> {
  const supabase = await createClient();

  // Check ownership
  const { data: session, error: fetchError } = await supabase
    .from('quiz_sessions')
    .select('user_id')
    .eq('id', sessionId)
    .single();

  if (fetchError || session.user_id !== userId) {
    console.error('Unauthorized: user does not own this session');
    return null;
  }

  const { data, error } = await supabase
    .from('quiz_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating quiz session:', error);
    return null;
  }

  return data;
}

export async function getQuizSession(sessionId: string, userId: string): Promise<QuizSession | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching quiz session:', error);
    return null;
  }

  return data;
}
