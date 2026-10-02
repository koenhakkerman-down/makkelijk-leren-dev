export type Role = 'user' | 'content_maker' | 'admin';

export type AppUser = {
  id: string;
  email: string;
  full_name?: string;
  role: Role;
  avatar_url?: string;
};

export const DEFAULT_DAILY_GOAL = 5;
export const MIN_DAILY_GOAL = 5;
export const MIN_DAILY_TIME_GOAL_MINUTES = 5;

export function canManageContent(userRole: Role, ownerId: string | null, currentUserId?: string) {
  if (userRole === 'admin') return true;
  if (userRole === 'content_maker' && ownerId && currentUserId) {
    return ownerId === currentUserId;
  }
  return false;
}
