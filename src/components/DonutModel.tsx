import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { gsap } from 'gsap';
import { Donut } from '../types/donut';

interface DonutModelProps {
  id: string;
  donut: Donut;
  position: [number, number, number];
  scale: number;
  opacity: number;
  index: number;
}

export function DonutModel({ id, donut, position, scale, opacity, index }: DonutModelProps) {
  const meshRef = useRef<Mesh>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(meshRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [position, scale]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      rotationRef.current += delta * 0.5;
      meshRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <mesh ref={meshRef} position={position} name={id}>
      <torusGeometry args={[1, 0.5, 32, 64]} />
      <meshStandardMaterial
        color={donut.color}
        transparent
        opacity={opacity}
        roughness={0.3}
        metalness={0.2}
      />
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[1, 0.2, 32, 64]} />
        <meshStandardMaterial
          color={donut.toppingColor}
          transparent
          opacity={opacity}
          roughness={0.4}
        />
      </mesh>
      {donut.sprinklesColor.map((color, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / donut.sprinklesColor.length) * Math.PI * 2),
            0.3,
            Math.sin((i / donut.sprinklesColor.length) * Math.PI * 2),
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <boxGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ))}
    </mesh>
  );
}