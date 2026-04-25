"use client";

import Image from "next/image";

export default function CommercialShowcase2D({ 
  imageUrl,
  title, 
}: { 
  imageUrl: string;
  title: string; 
  themeColor?: string; 
}) {
  return (
    <div className="relative w-full h-full mix-blend-multiply flex items-center justify-center">
      <Image
        src={imageUrl}
        alt={title || "Aleppo Artifact"}
        fill
        className="object-contain grayscale-[0.05] contrast-[1.05]"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        unoptimized={true}
      />
    </div>
  );
}
