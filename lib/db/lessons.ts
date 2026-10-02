import { createClient } from '@/lib/supabase/server';
import { Lesson } from '@/lib/types';

export async function getPublishedLessons(): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('status', 'published')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }

  return data || [];
}

export async function getLessonsByCreator(userId: string): Promise<Lesson[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('created_by', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }

  return data || [];
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .is('deleted_at', null)
    .single();

  if (error) {
    console.error('Error fetching lesson:', error);
    return null;
  }

  return data;
}

export async function createLesson(userId: string, title: string, description?: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .insert([
      {
        title,
        slug,
        description,
        created_by: userId,
        status: 'draft',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating lesson:', error);
    return null;
  }

  return data;
}

export async function updateLesson(lessonId: string, userId: string, updates: Partial<Lesson>) {
  const supabase = await createClient();

  // Check ownership
  const lesson = await getLesson(lessonId);
  if (!lesson || lesson.created_by !== userId) {
    console.error('Unauthorized: user does not own this lesson');
    return null;
  }

  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', lessonId)
    .select()
    .single();

  if (error) {
    console.error('Error updating lesson:', error);
    return null;
  }

  return data;
}
