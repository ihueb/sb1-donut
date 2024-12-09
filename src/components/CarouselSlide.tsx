import { motion } from 'framer-motion';
import { CarouselItem } from '../types/carousel';

interface CarouselSlideProps {
  item: CarouselItem;
  isActive: boolean;
}

export function CarouselSlide({ item, isActive }: CarouselSlideProps) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.8,
        zIndex: isActive ? 1 : 0
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <motion.div
          className="absolute bottom-16 left-8 right-8 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isActive ? 0 : 20, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
          <p className="text-lg text-white/90">{item.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}