"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const CommercialShowcase = dynamic(() => import("@/components/CommercialShowcase"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-linen-100" />
});

// Theme-aware Botanical/Valentine Sketch
const BotanicalSketch = ({ className, delay = 0, isValentine = false }: { className?: string, delay?: number, isValentine?: boolean }) => (
  <motion.svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
    animate={{ 
      pathLength: 1, 
      opacity: isValentine ? 0.2 : 0.15, 
      scale: 1,
      rotate: [0, 5, -5, 0] 
    }}
    transition={{ 
      pathLength: { duration: 4, delay, ease: "easeInOut" },
      opacity: { duration: 2, delay },
      scale: { duration: 3, delay },
      rotate: { duration: 20, repeat: Infinity, ease: "linear" }
    }}
  >
    {isValentine ? (
      <path d="M50 85C50 85 85 65 85 40C85 25 70 15 55 15C50 15 45 20 40 25M50 85C50 85 15 65 15 40C15 25 30 15 45 15C50 15 55 20 60 25" 
            stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"/>
    ) : (
      <>
        <path d="M50 98C50 98 52 70 85 40M50 98C50 98 48 70 15 40M50 80C60 65 65 50 65 35C65 20 55 10 50 10C45 10 35 20 35 35C35 50 40 65 50 80Z" 
              stroke="currentColor" strokeWidth="0.2" strokeLinecap="round"/>
        <path d="M50 35L50 10M35 35L15 25M65 35L85 25" 
              stroke="currentColor" strokeWidth="0.1" strokeLinecap="round"/>
      </>
    )}
  </motion.svg>
);

export default function Home() {
  const curation = [
    { id: "01", label: "Skin Health", title: "Botanisk Alkemi", text: "En djupt balanserande symfoni av lagerbär och olivolja för känslig hy." },
    { id: "02", label: "Authentic", title: "Antikt Arv", text: "Tvåtusen år av skönhet bevarad i varje handgjort block." },
    { id: "03", label: "Luminous", title: "Naturlig Lyster", text: "Återställer hudens naturliga barriär för en tidlös utstrålning." },
    { id: "04", label: "Pure Beauty", title: "Gyllene Renhet", text: "Naturens renaste essens för en hälsa som strålar inifrån." }
  ];

  return (
    <div className="flex flex-col bg-transparent selection:bg-silk-olive selection:text-linen-50 w-full relative z-10 min-h-screen">
      
      {/* 1. Atelier Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-[100vh] flex items-center pt-24 lg:pt-32 pb-20 overflow-hidden">
        
        {/* Architectural Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [-12, -8, -12]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-5%] right-[5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] will-change-transform"
          >
            <BotanicalSketch className="w-full h-full text-silk-leaf" delay={0.5} />
            <BotanicalSketch className="w-full h-full text-red-rose/20 red-mode-block hidden" delay={0.5} isValentine />
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 30, 0],
              rotate: [45, 50, 45]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[0%] left-[-5%] w-[500px] lg:w-[800px] h-[500px] lg:h-[800px] opacity-5 will-change-transform"
          >
            <BotanicalSketch className="w-full h-full text-silk-leaf" delay={1.2} />
            <BotanicalSketch className="w-full h-full text-red-rose/20 red-mode-block hidden" delay={1.2} isValentine />
          </motion.div>          <div className="absolute top-0 left-[15%] w-px h-full bg-gold-thread/10 hidden lg:block" />
        </div>

        <div className="mx-auto max-w-screen-2xl px-6 lg:px-24 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            
            <div className="lg:col-span-6 pt-10 text-center lg:text-left flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center lg:items-start"
              >
                <div className="flex items-center gap-6 lg:gap-10 mb-8 lg:mb-12">
                   <span className="text-gold-leaf font-bold uppercase tracking-[1em] lg:tracking-[1.2em] text-[7px] lg:text-[8px]">Skincare Rituals since 2000 BC</span>
                   <div className="h-[0.5px] w-12 lg:w-16 bg-gold-thread/30 hidden sm:block" />
                </div>
                
                <h1 className="text-[clamp(3.5rem,10vw,7.5rem)] font-marcellus text-silk-olive mb-10 lg:mb-12 tracking-tighter leading-[0.85] text-center lg:text-left">
                  Eternal <br />
                  <span className="italic text-gold-leaf/70 font-light ml-[0.1em]">Radiance.</span>
                </h1>
                
                <div className="relative lg:pl-12 w-full flex flex-col items-center lg:items-start">
                   <div className="absolute left-0 top-3.5 w-8 h-[0.5px] bg-gold-thread hidden lg:block" />
                   <p className="max-w-[460px] text-base lg:text-lg leading-relaxed lg:leading-[2] text-earth-deep/50 font-figtree font-light tracking-[0.05em] mb-10 lg:mb-12 uppercase text-center lg:text-left">
                     Upplev antikens mest exklusiva skönhetshemlighet. En närande ritual för en hy i absolut balans.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row items-center gap-10 lg:gap-12 w-full justify-center lg:justify-start">
                      <Link
                        href="/shop"
                        className="group relative inline-flex px-16 py-6 bg-silk-olive text-linen-50 rounded-none overflow-hidden transition-all duration-1000 w-full sm:w-fit shadow-xl justify-center"
                      >
                        <span className="relative z-10 font-figtree font-bold uppercase tracking-[0.5em] text-[9px]">Förvärva Ritualen</span>
                        <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                      </Link>
                      
                      <Link href="/about" className="text-[9px] font-bold uppercase tracking-[0.8em] text-silk-olive/40 flex items-center gap-6 group hover:text-silk-olive transition-colors justify-center">
                        Filosofi
                        <ArrowRight className="h-3 w-3 transition-transform duration-1000 group-hover:translate-x-4 text-gold-leaf" />
                      </Link>
                   </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end w-full">
              <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[580px]">
                 <CommercialShowcase 
                   imageUrl="/images/olive.png"
                   title=""
                   themeColor="#1a2e05"
                   badge="IX"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Atelier Manifesto */}
      <section className="py-24 lg:py-32 relative border-t border-gold-thread/10">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:divide-x md:divide-gold-thread/10 border-y border-gold-thread/10">
             {curation.map((v, i) => (
               <motion.div 
                 key={v.id}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ duration: 2, delay: i * 0.4 }}
                 viewport={{ once: true }}
                 className="group p-10 lg:p-16 hover:bg-linen-100/40 transition-all duration-1000 border-b md:border-b-0 border-gold-thread/10"
               >
                 <div className="mb-8 lg:mb-16 flex justify-between items-start">
                    <span className="font-figtree text-[10px] lg:text-[11px] font-bold uppercase tracking-[1.2em] lg:tracking-[1.5em] text-gold-leaf">{v.label}</span>
                    <span className="font-marcellus text-3xl lg:text-4xl text-silk-olive/10">{v.id}</span>
                 </div>
                 <h3 className="text-2xl lg:text-3xl font-marcellus text-silk-olive mb-6 lg:mb-10 tracking-[0.4em] font-light leading-relaxed">{v.title}</h3>
                 <p className="text-earth-deep/40 text-[12px] lg:text-[13px] leading-relaxed lg:leading-[2.8] tracking-[0.2em] lg:tracking-[0.3em] font-light uppercase">{v.text}</p>
                 <div className="mt-8 lg:mt-16 w-0 group-hover:w-full h-[0.5px] bg-gold-leaf transition-all duration-1000" />
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
