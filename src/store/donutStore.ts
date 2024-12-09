import { create } from 'zustand';

interface DonutStore {
  currentIndex: number;
  targetPosition: number;
  setCurrentIndex: (index: number) => void;
  setTargetPosition: (position: number) => void;
}

export const useDonutStore = create<DonutStore>((set) => ({
  currentIndex: 0,
  targetPosition: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setTargetPosition: (position) => set({ targetPosition: position }),
}));