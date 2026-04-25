"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface BubbleProps {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
}

const Bubble = ({ x, y, size }: BubbleProps) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const posX = useSpring(0, { stiffness: 30, damping: 25 });
  const posY = useSpring(0, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bubbleRef.current) return;

      const rect = bubbleRef.current.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - bubbleCenterX;
      const dy = e.clientY - bubbleCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const radius = 400; 

      if (distance < radius) {
        const force = (radius - distance) / radius;
        const angle = Math.atan2(dy, dx);
        posX.set(-Math.cos(angle) * force * 150);
        posY.set(-Math.sin(angle) * force * 150);
      } else {
        posX.set(0);
        posY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [posX, posY]);

  return (
    <motion.div
      ref={bubbleRef}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        x: posX,
        y: posY,
      }}
      className="fixed rounded-full border border-white/20 bg-white/[0.04] pointer-events-none z-[60] overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05),inset_0_0_5px_rgba(255,255,255,0.02)] will-change-transform"
    >
      {/* Restored Original Iridescent Sheen */}
      <div className="absolute inset-0 opacity-45 mix-blend-overlay" 
           style={{
             background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #fdf2f8 20%, #e0f2fe 50%, #fefce8 80%, transparent 100%)'
           }} 
      />
      
      {/* Defined Sharp Highlight */}
      <div className="absolute top-[10%] left-[12%] w-[30%] h-[30%] rounded-full bg-white/30" />
      
      {/* Sharp Internal Rim */}
      <div className="absolute inset-0 border-r border-b border-white/10 rounded-full" />
    </motion.div>
  );
};

export default function InteractiveBubbles() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  // Scale factor: 0.5 on mobile, 1.0 on desktop (base sizes already reduced by 50% from original large ones)
  const scale = isMobile ? 0.6 : 1;

  // 3 Large distinct hero bubbles
  const heroBubbles = [
    { id: 'b1', x: 10, y: 15, size: 210 * scale },
    { id: 'b2', x: 65, y: 40, size: 140 * scale },
    { id: 'b3', x: 35, y: 70, size: 175 * scale },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60]">
      {heroBubbles.map((b) => (
        <Bubble 
          key={b.id} 
          x={b.x} 
          y={b.y} 
          size={b.size} 
        />
      ))}
    </div>
  );
}
