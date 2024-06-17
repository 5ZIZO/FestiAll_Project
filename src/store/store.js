import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
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