import { createClient } from '@/lib/supabase/server';
import { DEFAULT_DAILY_GOAL, MIN_DAILY_GOAL, MIN_DAILY_TIME_GOAL_MINUTES, DailyGoal } from '@/lib/types';

export async function getDailyGoal(userId: string, date: string): Promise<DailyGoal | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_goals')
    .select('*')
    .eq('user_id', userId)
    .eq('effective_date', date)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching daily goal:', error);
    return null;
  }

  return data || null;
}

export async function getOrCreateDailyGoal(userId: string, date: string) {
  let goal = await getDailyGoal(userId, date);

  if (!goal) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('daily_goals')
      .insert([
        {
          user_id: userId,
          goal_type: 'questions',
          target_value: DEFAULT_DAILY_GOAL,
          effective_date: date,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating daily goal:', error);
      return null;
    }

    goal = data;
  }

  return goal;
}

export async function updateDailyGoal(
  userId: string,
  date: string,
  goalType: 'questions' | 'time_minutes',
  targetValue: number,
) {
  const min = goalType === 'questions' ? MIN_DAILY_GOAL : MIN_DAILY_TIME_GOAL_MINUTES;
  const safeValue = Math.max(targetValue, min);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('daily_goals')
    .update({
      goal_type: goalType,
      target_value: safeValue,
    })
    .eq('user_id', userId)
    .eq('effective_date', date)
    .select()
    .single();

  if (error) {
    console.error('Error updating daily goal:', error);
    return null;
  }

  return data;
}
