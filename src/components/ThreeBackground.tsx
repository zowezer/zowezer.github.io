"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Bubble({ position, scale, color, speed }: { 
  position: [number, number, number], 
  scale: number, 
  color: string, 
  speed: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  const initialY = position[1];
  
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const currentPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Falling motion
    targetPos.y -= speed * delta * 2;
    
    // Reset position if it falls off screen
    if (targetPos.y < -viewport.height / 2 - 2) {
      targetPos.y = viewport.height / 2 + 5;
      targetPos.x = (Math.random() - 0.5) * viewport.width;
    }

    // 2. Mouse Repel Logic
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

    const dist = targetPos.distanceTo(mouseVec);
    const repelRadius = 4;
    const repelStrength = 2;

    if (dist < repelRadius) {
      const dir = new THREE.Vector3().subVectors(targetPos, mouseVec).normalize();
      const force = (1 - dist / repelRadius) * repelStrength;
      targetPos.add(dir.multiplyScalar(force));
    }

    // 3. Smooth interpolation
    currentPos.lerp(targetPos, 0.05);
    meshRef.current.position.copy(currentPos);
    
    // Subtle rotation and oscillation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
    meshRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + initialY) * 0.002;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.3}
          radius={1}
          opacity={0.2}
          transparent
          roughness={0.1}
          metalness={0}
          transmission={1}
          thickness={0.5}
        />
      </Sphere>
    </mesh>
  );
}

function Scene() {
  const { viewport } = useThree();
  // Distinct glassy colors: Amber, Emerald, Sapphire
  const colors = ["#ffbf00", "#50c878", "#0f52ba"];
  
  const bubbles = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * viewport.width,
        (Math.random() - 0.5) * viewport.height * 2,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      scale: 0.4,
      color: colors[i % colors.length],
      speed: 0.12,
    }));
  }, [viewport.width, viewport.height]);

  return (
    <>
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      {bubbles.map((props, i) => (
        <Bubble key={i} {...props} />
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#fafaf9]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
