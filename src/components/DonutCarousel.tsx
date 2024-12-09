import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { DonutModel } from './DonutModel';
import { donuts } from '../data/donuts';
import { useDonutStore } from '../store/donutStore';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

export function DonutCarousel() {
  const { currentIndex, setCurrentIndex } = useDonutStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const itemWidth = window.innerWidth / 3;
    const maxX = -(donuts.length - 1) * itemWidth;

    draggableRef.current = Draggable.create(slider, {
      type: "x",
      inertia: true,
      bounds: { minX: maxX, maxX: 0 },
      dragResistance: 0.5,
      edgeResistance: 0.85,
      onDrag: function() {
        const progress = Math.abs(this.x / maxX);
        progressRef.current = progress;
        updateDonutPositions(progress);
      },
      onDragEnd: function() {
        const progress = progressRef.current;
        const targetIndex = Math.round(progress * (donuts.length - 1));
        const targetX = -(targetIndex * itemWidth);

        gsap.to(slider, {
          x: targetX,
          duration: 0.5,
          ease: "elastic.out(1, 0.8)",
          onUpdate: () => {
            const currentProgress = Math.abs(gsap.getProperty(slider, "x") as number / maxX);
            updateDonutPositions(currentProgress);
          },
          onComplete: () => {
            setCurrentIndex(targetIndex);
          }
        });
      }
    })[0];

    return () => {
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
    };
  }, [setCurrentIndex]);

  const updateDonutPositions = (progress: number) => {
    const index = progress * (donuts.length - 1);
    const fractionalIndex = index % 1;
    const currentWholeIndex = Math.floor(index);

    donuts.forEach((_, i) => {
      const distance = i - currentWholeIndex;
      const scale = 1 - Math.abs(distance - fractionalIndex) * 0.3;
      const opacity = 1 - Math.abs(distance - fractionalIndex) * 0.5;

      gsap.to(`#donut-${i}`, {
        scale: Math.max(0.7, scale * 2),
        opacity: Math.max(0.3, opacity),
        z: -Math.abs(distance - fractionalIndex) * 100,
        duration: 0.1
      });
    });
  };

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden">
      <div
        ref={sliderRef}
        className="w-full h-full touch-none cursor-grab active:cursor-grabbing"
      >
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 2, 12]} />
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {donuts.map((donut, index) => {
            const offset = index - currentIndex;
            const position: [number, number, number] = [
              offset * 4,
              0,
              Math.abs(offset) * -1.5
            ];
            const scale = Math.max(0.8, 2 - Math.abs(offset) * 0.5);
            const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.3);

            return (
              <DonutModel
                key={donut.id}
                id={`donut-${index}`}
                donut={donut}
                position={position}
                scale={scale}
                opacity={opacity}
                index={index}
              />
            );
          })}
        </Canvas>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-2 transition-opacity duration-500">
          {donuts[currentIndex].name}
        </h2>
        <p className="text-xl text-white/80 transition-opacity duration-500">
          {donuts[currentIndex].description}
        </p>
      </div>
    </div>
  );
}