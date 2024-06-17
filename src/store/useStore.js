import { create } from 'zustand';

const useStore = create((set) => ({
  places: [],
  setPlaces: (places) => set({ places }),
}));

export default useStore;