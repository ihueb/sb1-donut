import { create } from 'zustand';

interface CarouselStore {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

export const useCarouselStore = create<CarouselStore>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  isAnimating: false,
  setIsAnimating: (isAnimating) => set({ isAnimating }),
}));