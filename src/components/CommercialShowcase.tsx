"use client";

import dynamic from "next/dynamic";
import CommercialShowcase2D from "./CommercialShowcase2D";
import ProductFrame from "./ProductFrame";

const CommercialShowcase3D = dynamic(() => import("./CommercialShowcase3D"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-olive-900/5 rounded-[2rem] blur-xl" />
});

export default function CommercialShowcase({ 
  modelUrl, 
  imageUrl,
  title, 
  themeColor = "#5a6333", 
  accentColor = "#d4af37",
  fov,
  autoRotate,
  forcedColor,
  badge
}: { 
  modelUrl?: string; 
  imageUrl: string;
  title: string; 
  themeColor?: string; 
  accentColor?: string;
  fov?: number;
  autoRotate?: boolean;
  forcedColor?: string;
  badge?: string;
}) {
  const content = !modelUrl ? (
    <CommercialShowcase2D 
      imageUrl={imageUrl} 
      title={title} 
      themeColor={themeColor} 
    />
  ) : (
    <CommercialShowcase3D 
      modelUrl={modelUrl}
      imageUrl={imageUrl}
      title={title}
      themeColor={themeColor}
      accentColor={accentColor}
      fov={fov}
      autoRotate={autoRotate}
      forcedColor={forcedColor}
    />
  );

  return (
    <ProductFrame themeColor={themeColor} badge={badge} title={title}>
      {content}
    </ProductFrame>
  );
}
