import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isSignedIn: false,
  setSignIn: (status) => set({ isSignedIn: status }),
}));

export default useAuthStore;