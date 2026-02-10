import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Public client (RLS 적용)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client (RLS 우회)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null;

// 타입 정의
export interface Author {
  id: string;
  name: string;
  bio: string | null;
  status: string;
  created_at: string;
}

export interface Work {
  id: string;
  author_id: string;
  title: string;
  genre: string;
  synopsis: string;
  status: string;
  chapters_count: number;
  created_at: string;
  updated_at: string;
  author?: Author;
}

export interface Chapter {
  id: string;
  work_id: string;
  title: string;
  content: string;
  chapter_number: number;
  status: string;
  word_count: number;
  published_at: string | null;
}

// 장르 한글명
export const GENRES: Record<string, string> = {
  sf: 'SF',
  fantasy: '판타지',
  romance: '로맨스',
  mystery: '미스터리',
  horror: '공포',
  drama: '드라마',
  comedy: '코미디',
  action: '액션',
  historical: '역사',
  other: '기타',
};
