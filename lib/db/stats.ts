import { createClient } from '@/lib/supabase/server';

export async function getLeaderboardStats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('leaderboard_stats')
    .select('*')
    .order('total_learning_minutes', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching leaderboard stats:', error);
    return [];
  }

  return data || [];
}

export async function getUserStats(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('leaderboard_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user stats:', error);
    return null;
  }

  return data || null;
}
