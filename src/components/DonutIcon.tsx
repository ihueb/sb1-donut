import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';
import { Donut } from '../types/donut';

interface DonutIconProps {
  donut: Donut;
}

export function DonutIcon({ donut }: DonutIconProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 4]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1}>
        <torusGeometry args={[1, 0.5, 16, 32]} />
        <meshStandardMaterial
          color={donut.color}
          roughness={0.3}
          metalness={0.2}
        />
        
        {/* Topping */}
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[1, 0.2, 16, 32]} />
          <meshStandardMaterial
            color={donut.toppingColor}
            roughness={0.4}
          />
        </mesh>

        {/* Sprinkles */}
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
            <meshStandardMaterial color={color} />
          </mesh>
        ))}
      </mesh>
    </>
  );
}