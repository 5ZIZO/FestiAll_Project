import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      supabase: supabase,
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: 'accessToken',
      // getStorage: () => localStorage, 명시적 사용하려 했으나 비권장 사항 확인(레거시?)
    }
  )
);

export default useAuthStore;