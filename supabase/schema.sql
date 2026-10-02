-- MakkelijkLeren Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'content_maker', 'admin')),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBJECTS
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#eab308',
  icon TEXT DEFAULT 'book',
  created_by UUID REFERENCES profiles(id),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOPICS
CREATE TABLE topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LESSONS
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LESSON BLOCKS
CREATE TABLE lesson_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  block_type TEXT NOT NULL CHECK (block_type IN ('text', 'image', 'video', 'heading')),
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUESTIONS
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering', 'hotspot', 'drag_drop', 'short_answer', 'essay', 'matrix', 'likert')),
  question_text TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INTEGER DEFAULT 10,
  time_limit INTEGER,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUESTION OPTIONS
CREATE TABLE question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  match_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEDIA
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUIZ SESSIONS
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id UUID REFERENCES topics(id),
  mode TEXT NOT NULL CHECK (mode IN ('practice', 'exam', 'challenge')),
  score INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUIZ ANSWERS
CREATE TABLE quiz_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  selected_option_id UUID,
  answer_text TEXT,
  is_correct BOOLEAN DEFAULT false,
  time_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DAILY GOALS
CREATE TABLE daily_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  questions_goal INTEGER DEFAULT 10,
  minutes_goal INTEGER DEFAULT 15,
  xp_goal INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- DAILY GOAL PROGRESS
CREATE TABLE daily_goal_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID REFERENCES daily_goals(id) ON DELETE CASCADE,
  questions_answered INTEGER DEFAULT 0,
  minutes_spent INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- STREAKS
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BADGES
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT 'trophy',
  criteria JSONB,
  xp_reward INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- USER BADGES
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- USER STATS
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  total_xp INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- REPORTS
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id),
  reported_type TEXT NOT NULL CHECK (reported_type IN ('question', 'user', 'content')),
  reported_id UUID,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUDIT LOGS
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_topics_subject ON topics(subject_id);
CREATE INDEX idx_lessons_topic ON lessons(topic_id);
CREATE INDEX idx_lesson_blocks_lesson ON lesson_blocks(lesson_id);
CREATE INDEX idx_questions_topic ON questions(topic_id);
CREATE INDEX idx_question_options_question ON question_options(question_id);
CREATE INDEX idx_quiz_sessions_user ON quiz_sessions(user_id);
CREATE INDEX idx_quiz_answers_session ON quiz_answers(session_id);
CREATE INDEX idx_user_badges_user ON user_badges(user_id);

-- RLS POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goal_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Public read for published content
CREATE POLICY "Public read published subjects" ON subjects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read topics" ON topics FOR SELECT USING (subject_id IN (SELECT id FROM subjects WHERE is_published = true));
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (is_published = true);
CREATE POLICY "Public read questions" ON questions FOR SELECT USING (topic_id IN (SELECT topic_id FROM topics WHERE subject_id IN (SELECT id FROM subjects WHERE is_published = true)));
CREATE POLICY "Public read badges" ON badges FOR SELECT USING (true);

-- Users manage own data
CREATE POLICY "Users manage own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users manage own quiz sessions" ON quiz_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own answers" ON quiz_answers FOR ALL USING (session_id IN (SELECT id FROM quiz_sessions WHERE user_id = auth.uid()));
CREATE POLICY "Users manage own goals" ON daily_goals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own streaks" ON streaks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own badges" ON user_badges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own stats" ON user_stats FOR ALL USING (auth.uid() = user_id);

-- Content makers manage content
CREATE POLICY "Content makers manage subjects" ON subjects FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('content_maker', 'admin'))
);
CREATE POLICY "Content makers manage topics" ON topics FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('content_maker', 'admin'))
);
CREATE POLICY "Content makers manage lessons" ON lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('content_maker', 'admin'))
);
CREATE POLICY "Content makers manage questions" ON questions FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('content_maker', 'admin'))
);

-- Admins can do everything
CREATE POLICY "Admins manage all" ON audit_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins manage reports" ON reports FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  INSERT INTO public.streaks (user_id) VALUES (NEW.id);
  INSERT INTO public.user_stats (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();