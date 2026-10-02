-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Roles
create table if not exists public.roles (
  id text primary key,
  label text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'user' references public.roles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles(role);

-- Subjects / topics
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  name text not null,
  slug text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(subject_id, slug)
);

-- Lessons / sets
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  topic_id uuid references public.topics(id),
  created_by uuid not null references public.profiles(id),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.lesson_blocks (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  block_type text not null check (block_type in ('text','image','explanation','question','section')),
  sort_order int not null default 0,
  content jsonb,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Questions and options
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  question_type text not null check (
    question_type in (
      'multiple_choice_single',
      'multiple_choice_multiple',
      'true_false',
      'short_answer',
      'fill_blank',
      'matching',
      'ordering',
      'flashcard',
      'image_choice',
      'image_input',
      'math'
    )
  ),
  prompt text not null,
  explanation text,
  media_url text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.question_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Media
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null,
  mime_type text not null,
  file_size bigint not null default 0,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Quiz sessions
create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  elapsed_seconds int not null default 0,
  total_questions int not null default 0,
  correct_answers int not null default 0,
  incorrect_answers int not null default 0,
  percentage numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.quiz_sessions(id) on delete cascade,
  question_id uuid not null references public.questions(id),
  selected_answers jsonb,
  is_correct boolean not null default false,
  response_time_ms int not null default 0,
  created_at timestamptz not null default now()
);

-- Progress and goals
create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid references public.lessons(id),
  completed boolean not null default false,
  completed_at timestamptz,
  score numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create table if not exists public.daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_type text not null check (goal_type in ('questions','time_minutes')),
  target_value int not null,
  effective_date date not null,
  created_at timestamptz not null default now(),
  unique(user_id, effective_date)
);

create table if not exists public.daily_goal_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_id uuid not null references public.daily_goals(id) on delete cascade,
  progress_value int not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(goal_id)
);

-- Streaks and badges
create table if not exists public.streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_goal_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  criteria jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  unlocked_at timestamptz not null default now(),
  unique(user_id, badge_id)
);

-- Leaderboard and statistics
create table if not exists public.leaderboard_stats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total_questions int not null default 0,
  correct_answers int not null default 0,
  wrong_answers int not null default 0,
  accuracy numeric not null default 0,
  total_learning_minutes int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Reports and audit log
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reported_by uuid not null references public.profiles(id),
  lesson_id uuid references public.lessons(id),
  question_id uuid references public.questions(id),
  reason text not null,
  status text not null default 'open' check (status in ('open','in_review','resolved','rejected')),
  reporter_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Seed roles
insert into public.roles (id, label) values
  ('user', 'Gebruiker'),
  ('content_maker', 'Content Maker'),
  ('admin', 'Admin')
on conflict (id) do nothing;

-- Example badges
insert into public.badges (code, name, description, criteria)
values
  ('first_quiz', 'Eerste quiz', 'Voltooi je eerste quiz.', '{"type": "first_quiz"}'),
  ('daily_goal', 'Dagelijks doel', 'Voltooi je dagelijkse doel.', '{"type": "daily_goal"}'),
  ('streak_7', 'Streak Master', 'Behaal 7 dagen achter elkaar.', '{"type": "streak", "min_days": 7}')
on conflict (code) do nothing;

-- RLS
alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_blocks enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.media enable row level security;
alter table public.quiz_sessions enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.user_progress enable row level security;
alter table public.daily_goals enable row level security;
alter table public.daily_goal_progress enable row level security;
alter table public.streaks enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.leaderboard_stats enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

-- Basic policies
create policy "Users can see own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Anyone can read published lessons" on public.lessons for select using (status = 'published' or auth.uid() = created_by);
create policy "Content makers can manage own lessons" on public.lessons for all using (auth.uid() = created_by) with check (auth.uid() = created_by);

create policy "Users can read their own stats" on public.leaderboard_stats for select using (auth.uid() = user_id);
create policy "Users can read own quiz sessions" on public.quiz_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own quiz sessions" on public.quiz_sessions for insert with check (auth.uid() = user_id);

create policy "Admins can read all reports" on public.reports for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "Users can create reports" on public.reports for insert with check (auth.uid() = reported_by);

create policy "Admins can view all audit logs" on public.audit_logs for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Grant service role access for server-side operations
create role postgres login;
