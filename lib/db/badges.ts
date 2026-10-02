import { createClient } from '@/lib/supabase/server';
import { Badge, UserBadge } from '@/lib/types';

export async function getBadges(): Promise<Badge[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('badges').select('*');

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
}

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data || [];
}

export async function awardBadge(userId: string, badgeId: string): Promise<UserBadge | null> {
  const supabase = await createClient();

  // Check if already awarded
  const { data: existing } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .single();

  if (existing) {
    return existing as UserBadge;
  }

  const { data, error } = await supabase
    .from('user_badges')
    .insert([{ user_id: userId, badge_id: badgeId }])
    .select()
    .single();

  if (error) {
    console.error('Error awarding badge:', error);
    return null;
  }

  return data;
}
