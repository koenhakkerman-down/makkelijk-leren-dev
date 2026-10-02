export type Role = 'user' | 'content_maker' | 'admin';

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  created_by: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
};

export type Question = {
  id: string;
  lesson_id: string;
  question_type: 'multiple_choice_single' | 'multiple_choice_multiple' | 'true_false' | 'short_answer';
  prompt: string;
  explanation?: string;
  media_url?: string;
  created_by: string;
  created_at: string;
};

export type QuestionOption = {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
};

export type QuizSession = {
  id: string;
  user_id: string;
  lesson_id?: string;
  started_at: string;
  completed_at?: string;
  elapsed_seconds: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  percentage: number;
};

export type DailyGoal = {
  id: string;
  user_id: string;
  goal_type: 'questions' | 'time_minutes';
  target_value: number;
  effective_date: string;
};

export type Streak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_goal_date?: string;
};

export type Badge = {
  id: string;
  code: string;
  name: string;
  description?: string;
  criteria: Record<string, any>;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  unlocked_at: string;
};

export const DEFAULT_DAILY_GOAL = 5;
export const MIN_DAILY_GOAL = 5;
export const MIN_DAILY_TIME_GOAL_MINUTES = 5;
