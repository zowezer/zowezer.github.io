"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, PerspectiveCamera, Environment, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SoapObject({ textureUrl }: { textureUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(textureUrl);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Interactive scale
    const targetScale = hovered ? 1.4 : 1.2;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    if (hovered) {
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 0.5]} />
        <MeshDistortMaterial 
          map={texture} 
          speed={hovered ? 3 : 1} 
          distort={0.2} 
          radius={1}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh scale={[0.8, 0.8, 0.3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5a6333" emissive="#5a6333" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 20;
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 3;
      p[i * 3 + 1] = (Math.random() - 0.5) * 3;
      p[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={points.length / 3} 
          array={points} 
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#d4af37" transparent opacity={0.6} />
    </points>
  );
}

export default function ProductMesh({ textureUrl }: { textureUrl: string }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} gl={{ alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f2edda" />
        
        <SoapObject textureUrl={textureUrl} />
        <Particles />
        
        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.4} 
          scale={5} 
          blur={2} 
          far={1} 
          color="#30322a"
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
