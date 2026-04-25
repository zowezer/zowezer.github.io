"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage, Center, Clone } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

function Model({ modelUrl, onLoaded, forcedColor }: { modelUrl: string; onLoaded: () => void; forcedColor?: string }) {
  const { scene } = useGLTF(modelUrl, 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const name = mesh.name.toLowerCase();
          
          let finalColor = forcedColor;
          let roughness = 0.8;
          let metalness = 0.05;

          if (name.includes("leaf") || name.includes("blad")) {
            finalColor = "#3d5a27"; 
            roughness = 0.6;
          } else if (name.includes("olive") || name.includes("oliver")) {
            finalColor = "#1a2e05"; 
            roughness = 0.3;
          } else if (name.includes("wood") || name.includes("bark") || name.includes("stick") || name.includes("kanel")) {
            finalColor = "#5d4037"; 
            roughness = 0.9;
          } else if (name.includes("misk") || name.includes("musk") || name.includes("flower") || name.includes("blomma")) {
            finalColor = "#fdf5e6"; 
            roughness = 0.5;
          }

          if (finalColor) {
            const material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(finalColor),
              roughness: roughness,
              metalness: metalness,
              sheen: 0.5,
              sheenRoughness: 0.8,
              sheenColor: new THREE.Color("#ffffff"),
            });
            mesh.material = material;
          }
          
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });
      onLoaded();
    }
  }, [scene, onLoaded, forcedColor, modelUrl]);

  return <Clone object={scene} />;
}
export default function CommercialShowcase3D({ 
  modelUrl, 
  imageUrl,
  title, 
  forcedColor
}: { 
  modelUrl: string; 
  imageUrl: string;
  title: string; 
  themeColor?: string; 
  accentColor?: string;
  fov?: number;
  autoRotate?: boolean;
  forcedColor?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence>
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent">
            <div className="w-3 h-3 border-2 border-olive-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </AnimatePresence>

      <div className="w-full h-full relative z-10">
        <Canvas dpr={[1, 2]} camera={{ fov: 45 }} gl={{ alpha: true }}>
...
          <Suspense fallback={null}>
            <Stage 
              environment="apartment" 
              intensity={0.6} 
              shadows="contact"
              adjustCamera={1.2}
            >
              <PresentationControls
                global
                snap
                speed={1.5}
                rotation={[0, 0.3, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Center>
                  <Model 
                    modelUrl={modelUrl} 
                    onLoaded={() => setIsLoaded(true)} 
                    forcedColor={forcedColor}
                  />
                </Center>
              </PresentationControls>
            </Stage>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
