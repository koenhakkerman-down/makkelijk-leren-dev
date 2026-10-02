import { createClient } from '@/lib/supabase/server';
import { Streak } from '@/lib/types';

export async function getStreak(userId: string): Promise<Streak | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching streak:', error);
    return null;
  }

  return data || null;
}

export async function getOrCreateStreak(userId: string): Promise<Streak | null> {
  let streak = await getStreak(userId);

  if (!streak) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('streaks')
      .insert([
        {
          user_id: userId,
          current_streak: 0,
          longest_streak: 0,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating streak:', error);
      return null;
    }

    streak = data;
  }

  return streak;
}

export async function updateStreak(userId: string, currentStreak: number, longestStreak: number, lastGoalDate: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('streaks')
    .update({
      current_streak: currentStreak,
      longest_streak: Math.max(longestStreak, currentStreak),
      last_goal_date: lastGoalDate,
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating streak:', error);
    return null;
  }

  return data;
}
