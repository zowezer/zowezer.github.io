"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Award, ShieldCheck, Leaf } from "lucide-react";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";

const CommercialShowcase = dynamic(() => import("@/components/CommercialShowcase"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-silk-pearl/50" />
});

const products = [
  {
    id: 1,
    name: "Olive Signature",
    price: "119 kr",
    description: "Den tidlösa klassikern från Aleppo. Rik på naturligt glycerin och E-vitamin från premium olivolja. Ger din hud en mjukhet som varar hela dagen.",
    laurel: "20%",
    image: "/images/olive.png",
    theme: "#1a2421",
    accent: "#8a9a5b",
    badge: "Classicus",
    secondaryDesc: "Vårdande och djupt återfuktande för alla hudtyper."
  },
  {
    id: 2,
    name: "Cinnamon Ritual",
    price: "149 kr",
    description: "En varm och kryddig upplevelse med äkta kanel. Denna tvål stimulerar cirkulationen och sprider en fantastisk doft som vämer både kropp och själ.",
    laurel: "10%",
    image: "/images/cinnamon.jpeg",
    theme: "#5d4037",
    accent: "#d4af37",
    badge: "Energia",
    secondaryDesc: "Naturligt exfolierande och energigivande."
  },
  {
    id: 3,
    name: "White Musk",
    price: "129 kr",
    description: "Vår renaste form av hantverk berikad med misk (vit mysk). En silkeslen tvål som skonsamt rengör på djupet och lämnar en subtil, lyxig doft.",
    laurel: "5%",
    image: "/images/white.jpeg",
    theme: "#e0e0e0",
    accent: "#c2b280",
    badge: "Puritas",
    secondaryDesc: "Mjukgörande med en sofistikerad doftupplevelse."
  },
  {
    id: 4,
    name: "Rose Heritage",
    price: "159 kr",
    description: "En romantisk och förtrollande tvål med äkta rosenvatten. Lugnar huden och sprider en ljuvlig doft av blommande trädgårdar i gryningen.",
    laurel: "10%",
    image: "/images/rose.jpeg",
    theme: "#a36d7d",
    accent: "#f48fb1",
    badge: "Amor",
    secondaryDesc: "Harmoniserande och upplyftande för sinnena."
  }
];

function AuthenticationSeal({ text }: { text: string, color: string }) {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: -5 }}
      viewport={{ once: true }}
      className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <div className="absolute inset-0 bg-ancient-olive shadow-2xl border border-burnished-gold/20" />
      <div className="relative z-10 text-center p-2 border border-burnished-gold/10 m-1 w-full h-full flex flex-col justify-center items-center">
        <span className="text-[5px] md:text-[6px] font-bold uppercase tracking-[0.6em] text-burnished-gold/60 mb-0.5 md:mb-1">Authentic</span>
        <span className="text-[7px] md:text-[8px] font-marcellus uppercase tracking-[0.4em] text-silk-pearl leading-tight">
          {text}
        </span>
      </div>
    </motion.div>
  );
}

export default function Shop() {
  const { addToCart } = useCart();

  const addTrioToCart = () => {
    addToCart({
      id: 99,
      name: "Elite Collection Trio",
      price: "349 kr",
      image: "/images/olive.png",
      theme: "#1a2421"
    });
  };

  return (
    <div className="bg-transparent scroll-smooth selection:bg-ancient-olive selection:text-silk-pearl">
      {/* 1. Header Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-ancient-olive/5 p-6 pt-32">
        <div className="mx-auto max-w-screen-2xl relative z-10 w-full text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-8 md:mb-12">
               <div className="h-[0.5px] w-8 md:w-12 bg-ancient-olive/10" />
               <span className="text-burnished-gold font-bold uppercase tracking-[1em] md:tracking-[1.5em] text-[7px] md:text-[8px]">La Boutique d'Alep</span>
               <div className="h-[0.5px] w-8 md:w-12 bg-ancient-olive/10" />
            </div>
            <h1 className="text-[clamp(3.5rem,14vw,12rem)] font-marcellus text-ancient-olive tracking-tighter leading-none mb-6 md:mb-8">Collectio.</h1>
            <p className="text-ancient-olive/40 font-figtree max-w-xs md:max-w-xl mx-auto text-sm md:text-xl font-light leading-relaxed uppercase tracking-[0.15em] md:tracking-[0.2em] italic">
              Varje block är ett handskuret monument över tvåtusen år av renhet.
            </p>
            <div className="mt-16 md:mt-24 flex flex-col items-center gap-4">
               <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-[0.6em] text-ancient-olive/20">Scrolla för att utforska</span>
               <div className="w-px h-10 md:h-12 bg-ancient-olive/10 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </header>

      {/* 2. Products */}
      {products.map((product, idx) => (
        <section
          key={product.id}
          className="relative min-h-screen flex items-center justify-center py-24 md:py-32 px-6 md:px-24 overflow-hidden border-b border-ancient-olive/5"
        >
          <div className={`mx-auto max-w-screen-2xl h-full w-full flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-center gap-8 md:gap-24`}>
            
            {/* Visual Mounting (Responsive) */}
            <div className="w-full lg:w-1/2 aspect-square max-w-[280px] sm:max-w-[400px] lg:max-w-none relative z-10 flex items-center justify-center">
              <CommercialShowcase 
                imageUrl={product.image} 
                title={product.name}
                themeColor={product.theme}
                badge={product.badge}
              />
            </div>
            
            {/* Product Dossier (Mobile Optimized) */}
            <div className="w-full lg:w-1/2 z-10 py-2 md:py-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-start will-change-transform"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                  <Leaf className="h-3 w-3 md:h-4 md:w-4 text-burnished-gold stroke-[1px]" />
                  <span className="text-burnished-gold font-bold uppercase tracking-[0.8em] md:tracking-[1em] text-[6px] md:text-[7px]">{product.laurel} Laurus Nobilis</span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-marcellus text-ancient-olive mb-3 md:mb-6 tracking-tighter leading-none italic text-balance">
                  {product.name}
                </h2>
                
                <p className="text-ancient-olive/60 font-figtree text-xs md:text-lg mb-4 md:mb-8 leading-relaxed font-light uppercase tracking-widest max-w-xs md:max-w-lg">
                  {product.description}
                </p>

                <p className="hidden md:block font-marcellus text-ancient-olive/40 text-sm md:text-base border-l border-burnished-gold/20 pl-6 italic mb-10">
                  "{product.secondaryDesc}"
                </p>
                
                <div className="hidden md:flex flex-col gap-6 mb-12 border-y border-ancient-olive/5 py-8 w-full">
                  <div className="flex items-center gap-6">
                    <div className="w-8 h-8 border border-ancient-olive/10 flex items-center justify-center text-ancient-olive">
                      <Award className="h-4 w-4 stroke-[1px]" />
                    </div>
                    <span className="font-figtree text-[8px] text-ancient-olive/60 uppercase tracking-[0.4em]">Traditionellt Hantverk</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-8 h-8 border border-ancient-olive/10 flex items-center justify-center text-ancient-olive">
                      <ShieldCheck className="h-4 w-4 stroke-[1px]" />
                    </div>
                    <span className="font-figtree text-[8px] text-ancient-olive/60 uppercase tracking-[0.4em]">100% Ekologisk Renhet</span>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-row items-center gap-8 md:gap-10 mt-4 md:mt-0">
                  <div className="flex flex-col items-start">
                     <span className="text-burnished-gold font-figtree text-[6px] md:text-[7px] uppercase font-bold tracking-[1em] mb-1 md:mb-2 text-left">Pretivm</span>
                     <span className="text-3xl md:text-6xl font-marcellus text-ancient-olive tracking-tighter">{product.price}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-ancient-olive text-silk-pearl font-figtree font-bold py-4 md:py-6 px-8 md:px-10 rounded-none transition-all duration-1000 hover:bg-burnished-gold hover:text-ancient-olive shadow-xl relative overflow-hidden"
                  >
                    <span className="relative z-10 tracking-[0.5em] md:tracking-[0.8em] uppercase text-[7px] md:text-[8px]">Lägg i varukorg</span>
                    <div className="absolute inset-0 bg-white/10 -translate-x-full hover:translate-x-full transition-transform duration-[1.5s]" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* 3. Trio Section (Responsive) */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-8 bg-ancient-olive/[0.02] border-y border-ancient-olive/5 overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 2 }}
             className="will-change-transform"
          >
            <span className="text-burnished-gold font-bold uppercase tracking-[1.5em] md:tracking-[2em] text-[6px] md:text-[7px] mb-8 md:mb-12 block">Exklusivt Trio-Paket</span>
            <h2 className="text-5xl md:text-[8vw] font-marcellus mb-10 md:mb-16 text-ancient-olive tracking-tighter uppercase leading-none italic">Le Trio.</h2>
            <p className="text-ancient-olive/30 font-figtree text-sm md:text-2xl max-w-xs md:max-w-2xl mx-auto mb-12 md:mb-20 font-light leading-relaxed uppercase tracking-widest">
              Upplev hela spektrat av Aleppo. <br className="hidden md:block" />
              Spara vid köp av vår kompletta trio.
            </p>
            <button 
              onClick={addTrioToCart}
              className="group relative bg-ancient-olive text-silk-pearl px-16 md:px-24 py-6 md:py-8 rounded-none font-bold text-[8px] md:text-[9px] transition-all duration-1000 shadow-xl uppercase tracking-[0.8em] md:tracking-[1em] overflow-hidden"
            >
              <span className="relative z-10">Beställ Trion — 349 kr</span>
              <div className="absolute inset-0 bg-burnished-gold translate-y-full group-hover:translate-y-0 transition-transform duration-1000" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
