import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { DonutIcon } from './DonutIcon';
import { donuts } from '../data/donuts';

export function MacOSDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const calculateScale = (
    distance: number,
    mouseX: number,
    iconX: number,
    iconWidth: number
  ) => {
    // Maximum scale for the icon directly under the cursor
    const maxScale = 2;
    // Distance at which the magnification effect starts
    const magnificationDistance = 150;
    
    const center = iconX + iconWidth / 2;
    const distanceFromCenter = Math.abs(mouseX - center);
    
    if (distanceFromCenter >= magnificationDistance) return 1;
    
    // Create a smooth scale curve
    const scale = 1 + (maxScale - 1) * 
      (1 - Math.pow(distanceFromCenter / magnificationDistance, 2));
    
    return scale;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dockRef.current) return;

    const dock = dockRef.current;
    const mouseX = e.clientX;
    const dockRect = dock.getBoundingClientRect();

    iconsRef.current.forEach((icon, index) => {
      if (!icon) return;

      const iconRect = icon.getBoundingClientRect();
      const scale = calculateScale(
        dockRect.width,
        mouseX,
        iconRect.left,
        iconRect.width
      );

      gsap.to(icon, {
        scale,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  };

  const handleMouseLeave = () => {
    iconsRef.current.forEach((icon) => {
      if (!icon) return;
      gsap.to(icon, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    });
  };

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div
        ref={dockRef}
        className="flex items-end gap-4 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
        style={{ perspective: "1000px" }}
      >
        {donuts.map((donut, index) => (
          <div
            key={donut.id}
            ref={(el) => (iconsRef.current[index] = el)}
            className="relative w-16 h-16 cursor-pointer transition-transform duration-200"
          >
            <div className="w-full h-full rounded-lg overflow-hidden">
              <Canvas>
                <DonutIcon donut={donut} />
              </Canvas>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 bg-black/80 text-white text-sm px-2 py-1 rounded whitespace-nowrap transition-opacity group-hover:opacity-100">
              {donut.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}