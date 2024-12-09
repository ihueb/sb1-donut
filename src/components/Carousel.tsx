import { useEffect } from 'react';
import { CarouselControls } from './CarouselControls';
import { CarouselIndicators } from './CarouselIndicators';
import { CarouselSlide } from './CarouselSlide';
import { carouselItems } from '../data/carouselData';
import { useCarouselStore } from '../store/carouselStore';

export function Carousel() {
  const { currentIndex, setIsAnimating } = useCarouselStore();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex, setIsAnimating]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {carouselItems.map((item, index) => (
        <CarouselSlide
          key={item.id}
          item={item}
          isActive={index === currentIndex}
        />
      ))}
      <CarouselControls />
      <CarouselIndicators />
    </div>
  );
}