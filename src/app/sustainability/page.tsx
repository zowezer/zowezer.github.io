"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Wind, Droplets, ShieldCheck, Award } from "lucide-react";

// Elite Botanical SVG for reuse
const BotanicalSketch = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 95C50 95 52 65 85 35M50 95C50 95 48 65 15 35M50 75C60 60 62 45 62 30M50 50C40 35 38 20 38 10" 
          stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" opacity="0.3"/>
  </svg>
);

export default function Sustainability() {
  const pillars = [
    {
      id: "01",
      title: "Cradle to Earth",
      label: "Biodegradable",
      text: "Vår tvål är 100% biologiskt nedbrytbar. Inga syntetiska kemikalier lämnar spår i naturens kretslopp.",
      icon: <Recycle className="w-5 h-5 stroke-[1px]" />
    },
    {
      id: "02",
      title: "Ancient Purity",
      label: "Zero Waste",
      text: "Från handskurna block till pappersförpackningar – vi eliminerar plast helt från badrummet.",
      icon: <Wind className="w-5 h-5 stroke-[1px]" />
    },
    {
      id: "03",
      title: "Enduring Value",
      label: "Longevity",
      text: "Ett enda block Aleppotvål varar upp till tre gånger längre än konventionell flytande tvål.",
      icon: <Award className="w-5 h-5 stroke-[1px]" />
    },
    {
      id: "04",
      title: "Botanical Ethics",
      label: "Vegan",
      text: "Inga animaliska fetter, ingen palmolja. Endast oliv- och lagerbärsolja av högsta kvalitet.",
      icon: <Leaf className="w-5 h-5 stroke-[1px]" />
    }
  ];

  return (
    <div className="min-h-screen pt-40 pb-32">
      {/* Hero Section */}
      <section className="relative py-48 overflow-hidden bg-ancient-olive">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <BotanicalSketch className="absolute -top-20 -left-20 w-[800px] h-[800px] rotate-45" />
          <BotanicalSketch className="absolute -bottom-20 -right-20 w-[800px] h-[800px] -rotate-12" />
        </div>
        
        <div className="mx-auto max-w-screen-2xl px-12 lg:px-24 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-gold-leaf font-bold uppercase tracking-[1.5em] text-[8px] mb-8 block">Ethica & Natura</span>
            <h1 className="text-[clamp(3.5rem,10vw,8.5rem)] font-marcellus text-silk-pearl tracking-tighter leading-none italic uppercase mb-16">
              Hållbart <br /> <span className="not-italic text-gold-leaf">Arv.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-figtree text-silk-pearl/40 leading-relaxed uppercase tracking-[0.2em]">
              Skönhet som respekterar tidens gång och jordens resurser. En 2000-årig ritual för en modern framtid.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-72">
        <div className="mx-auto max-w-screen-2xl px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-ancient-olive/5 border-y border-ancient-olive/5">
             {pillars.map((p, i) => (
               <motion.div
                 key={p.id}
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 transition={{ duration: 1.5, delay: i * 0.2 }}
                 viewport={{ once: true }}
                 className="group p-16 hover:bg-ancient-olive/[0.02] transition-all duration-1000"
               >
                 <div className="mb-16 flex justify-between items-start">
                    <div className="w-10 h-10 border border-gold-thread/20 flex items-center justify-center text-gold-leaf group-hover:bg-gold-leaf group-hover:text-ancient-olive transition-all">
                       {p.icon}
                    </div>
                    <span className="font-marcellus text-4xl text-ancient-olive/10">{p.id}</span>
                 </div>
                 <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-leaf mb-4 block">{p.label}</span>
                 <h3 className="text-2xl font-marcellus text-ancient-olive mb-8 tracking-widest">{p.title}</h3>
                 <p className="text-ancient-olive/40 text-[12px] leading-relaxed uppercase tracking-widest">{p.text}</p>
                 <div className="mt-16 w-0 group-hover:w-full h-[0.5px] bg-gold-leaf transition-all duration-1000" />
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Long-form Content */}
      <section className="py-40 bg-ancient-olive/[0.01]">
        <div className="mx-auto max-w-screen-xl px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative aspect-[4/5] bg-ancient-olive/5 overflow-hidden group">
               <div className="absolute inset-12 border border-gold-thread/10 pointer-events-none z-10" />
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541233349642-6e425fe6190e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center grayscale transition-transform duration-[10s] group-hover:scale-110 opacity-40" />
            </div>
            <div className="space-y-16">
               <div className="space-y-8">
                  <h2 className="text-5xl font-marcellus text-ancient-olive italic tracking-tighter">Renhet utan <br /> kompromisser.</h2>
                  <div className="h-px w-24 bg-gold-leaf/40" />
               </div>
               <div className="space-y-10 font-figtree text-ancient-olive/60 text-lg leading-relaxed uppercase tracking-widest">
                  <p>
                    Aleppotvål består av endast fyra ingredienser: olivolja, lagerbärsolja, vatten och lut. Inget annat. Inga konserveringsmedel, färgämnen eller syntetiska parfymer.
                  </p>
                  <p>
                    Genom att stödja traditionella tvålmästare bevarar vi inte bara en antik teknik, utan vi främjar också en produktion som är naturligt koldioxidsnål och fri från industriell avfallshantering.
                  </p>
                  <div className="flex items-center gap-6 pt-8">
                     <ShieldCheck className="w-6 h-6 text-gold-leaf stroke-[1px]" />
                     <span className="text-[10px] font-bold tracking-[0.5em] text-ancient-olive/40">Garanterad Ekologisk Renhet</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
