import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCarouselStore } from '../store/carouselStore';
import { carouselItems } from '../data/carouselData';

export function CarouselControls() {
  const { currentIndex, setCurrentIndex, isAnimating } = useCarouselStore();

  const handlePrevious = () => {
    if (!isAnimating && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (!isAnimating && currentIndex < carouselItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrevious}
        disabled={isAnimating || currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </motion.button>
      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        disabled={isAnimating || currentIndex === carouselItems.length - 1}
      >
        <ChevronRight size={24} />
      </motion.button>
    </>
  );
}