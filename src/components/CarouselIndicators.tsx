import { motion } from 'framer-motion';
import { carouselItems } from '../data/carouselData';
import { useCarouselStore } from '../store/carouselStore';

export function CarouselIndicators() {
  const { currentIndex, setCurrentIndex, isAnimating } = useCarouselStore();

  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
      {carouselItems.map((_, index) => (
        <motion.button
          key={index}
          className={`w-3 h-3 rounded-full ${
            currentIndex === index ? 'bg-white' : 'bg-white/50'
          }`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => !isAnimating && setCurrentIndex(index)}
          disabled={isAnimating}
        />
      ))}
    </div>
  );
}