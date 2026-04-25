"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProductFrameProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  className?: string;
  themeColor?: string;
}

// Elite Botanical Detail (Watermark)
const BotanicalWatermark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path 
      d="M50 95C50 95 52 65 85 35M50 95C50 95 48 65 15 35M50 75C60 60 62 45 62 30M50 50C40 35 38 20 38 10" 
      stroke="currentColor" 
      strokeWidth="0.5" 
      strokeLinecap="round" 
    />
  </svg>
);

export default function ProductFrame({ 
  children, 
  badge, 
  className,
}: ProductFrameProps) {
  return (
    <div className={cn("relative group w-full aspect-square", className)}>
      
      {/* 1. Atelier Outer Frame (Gold Leaf Layer) */}
      <div className="relative w-full h-full p-[1px] bg-gradient-to-br from-gold-thread/40 via-gold-leaf/10 to-gold-thread/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-transform duration-1000 group-hover:scale-[1.01] will-change-transform">
        
        {/* 2. The Main Surface (Vellum Paper) */}
        <div className="relative w-full h-full bg-linen-50 overflow-hidden">
          
          {/* Theme Tint Overlay (Crucial for Red Mode) */}
          <div className="absolute inset-0 bg-gold-leaf/5 mix-blend-soft-light pointer-events-none z-0" />
          
          {/* Internal Metallic Border (Fine Gold Thread) */}
          <div className="absolute inset-2 border-[0.5px] border-gold-leaf/20 pointer-events-none z-10" />
          
          {/* Liquid Glass Refraction */}
          <div className="absolute inset-0 border-[0.5px] border-white/60 pointer-events-none z-20" />
          
          {/* Physical Texture (Paper Grain) */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
          
          {/* Botanical Watermarks (Tonal) */}
          <BotanicalWatermark className="absolute -top-12 -left-12 w-52 h-52 text-silk-olive/5 rotate-45 pointer-events-none" />
          <BotanicalWatermark className="absolute -bottom-16 -right-16 w-52 h-52 text-silk-olive/5 -rotate-45 pointer-events-none" />
          
          {/* Luxury Corner Brackets (Gold Leaf) */}
          <div className="absolute top-4 left-4 w-10 h-10 pointer-events-none z-30">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gold-leaf/40" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gold-leaf/40" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-leaf shadow-[0_0_10px_rgba(var(--accent),0.2)]" />
          </div>
          <div className="absolute top-4 right-4 w-10 h-10 pointer-events-none z-30 rotate-90">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-[1px] h-full bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-leaf" />
          </div>
          <div className="absolute bottom-4 left-4 w-10 h-10 pointer-events-none z-30 -rotate-90">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-[1px] h-full bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-leaf" />
          </div>
          <div className="absolute bottom-4 right-4 w-10 h-10 pointer-events-none z-30 rotate-180">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-[1px] h-full bg-gold-leaf/40" />
             <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold-leaf" />
          </div>

          {/* Dynamic Light Sweep (Animated Shimmer) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s] ease-in-out pointer-events-none" />

          {/* 3. The Content Area */}
          <div className="relative w-full h-full flex items-center justify-center p-12 md:p-20">
            {children}
          </div>

          {/* 4. Museum Inventory Tag (Integrated) */}
          {badge && (
            <div className="absolute -bottom-1 -right-1 w-24 h-24 md:w-32 md:h-32 bg-silk-pearl p-1 shadow-2xl z-40 border-[0.5px] border-gold-thread/20">
               <div className="w-full h-full border border-gold-thread/10 flex flex-col justify-center items-center text-center p-2">
                  <span className="font-figtree text-[6px] md:text-[7px] uppercase tracking-[0.4em] text-silk-olive/30 mb-1">Ritualis</span>
                  <span className="font-marcellus text-xs md:text-sm text-silk-olive uppercase tracking-widest">{badge}</span>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Contact Shadow (Warm Tint) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gold-leaf/[0.03] blur-[40px] rounded-full -z-10" />
    </div>
  );
}
