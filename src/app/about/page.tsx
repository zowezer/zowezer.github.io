"use client";

import { motion } from "framer-motion";
import { History, Waves, Sun, Leaf } from "lucide-react";

// Elite Botanical SVG
const BotanicalDetail = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 95C50 95 52 65 85 35M50 95C50 95 48 65 15 35M50 75C60 60 62 45 62 30M50 50C40 35 38 20 38 10" 
          stroke="currentColor" strokeWidth="0.2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

export default function About() {
  const steps = [
    {
      title: "Skörd",
      icon: <Leaf className="h-5 w-5 stroke-[1px]" />,
      description: "Under senhösten skördas oliverna och pressas till ren olja.",
    },
    {
      title: "Kokning",
      icon: <Waves className="h-5 w-5 stroke-[1px]" />,
      description: "Oljan blandas med vatten och lut, och värms sedan i stora underjordiska kar i tre dagar.",
    },
    {
      title: "Skärning",
      icon: <History className="h-5 w-5 stroke-[1px]" />,
      description: "Tvålen hälls ut på en plan yta, kyls ner och skärs för hand i block.",
    },
    {
      title: "Lagring",
      icon: <Sun className="h-5 w-5 stroke-[1px]" />,
      description: "Blocken staplas i torn och torkas i luften i 9-12 månader, vilket gör utsidan gyllene.",
    },
  ];

  return (
    <div className="bg-transparent min-h-screen pt-40">
      {/* 1. History Header (Elite Style) */}
      <section className="relative py-48 overflow-hidden bg-ancient-olive text-silk-pearl selection:bg-burnished-gold selection:text-ancient-olive">
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <BotanicalDetail className="absolute -top-20 -right-20 w-[600px] h-[600px] text-burnished-gold rotate-12" />
        </div>
        
        <div className="mx-auto max-w-screen-2xl px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-10 mb-16">
               <span className="text-burnished-gold font-bold uppercase tracking-[1.5em] text-[7px]">Chronica Aleppensis</span>
               <div className="h-[0.5px] flex-grow bg-burnished-gold/20" />
            </div>
            <h1 className="text-[clamp(4rem,10vw,8rem)] font-marcellus text-white mb-16 tracking-tighter leading-none italic">
              2,000 År av <span className="not-italic text-burnished-gold">Tradition.</span>
            </h1>
            <p className="text-2xl font-figtree text-white/90 leading-relaxed max-w-2xl font-medium uppercase tracking-widest">
              Aleppotvål, eller Saryon Ghar, är ursprunget till alla hårda tvålar. Ett heligt recept som bevarats genom dynastier.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Alchemist's Process */}
      <section className="py-72 relative">
        <div className="mx-auto max-w-screen-2xl px-12 lg:px-24">
          <div className="text-center mb-40">
             <span className="text-burnished-gold font-bold uppercase tracking-[2em] text-[8px] mb-8 block">Processvs</span>
             <h2 className="text-6xl font-marcellus text-ancient-olive tracking-tighter italic">Resan till Guld.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-x divide-ancient-olive/5 border-y border-ancient-olive/5">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: idx * 0.3 }}
                viewport={{ once: true }}
                className="group p-20 hover:bg-white/[0.2] transition-all duration-1000"
              >
                <div className="mb-20 flex justify-between items-center">
                   <div className="w-10 h-10 border border-ancient-olive/10 flex items-center justify-center text-ancient-olive group-hover:bg-ancient-olive group-hover:text-silk-pearl transition-all duration-700">
                      {step.icon}
                   </div>
                   <span className="font-marcellus text-3xl text-ancient-olive/10 group-hover:text-ancient-olive/30">0{idx + 1}</span>
                </div>
                <h3 className="text-xl font-marcellus text-ancient-olive mb-10 tracking-[0.3em] font-light">{step.title}</h3>
                <p className="text-ancient-olive/40 text-[11px] leading-[2.5] tracking-[0.2em] font-light uppercase">{step.description}</p>
                <div className="mt-20 w-0 group-hover:w-full h-[0.5px] bg-burnished-gold transition-all duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Manifesto */}
      <section className="py-72 relative bg-ancient-olive/[0.01] border-t border-ancient-olive/5">
        <div className="mx-auto max-w-screen-2xl px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="aspect-square bg-ancient-olive/5 p-4 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 border border-burnished-gold/10 m-12 pointer-events-none z-10" />
               <BotanicalDetail className="absolute inset-0 w-full h-full text-ancient-olive/[0.03] scale-150 group-hover:rotate-45 transition-transform duration-[10s]" />
               <div className="w-full h-full bg-silk-pearl/20 backdrop-blur-3xl flex flex-col justify-center items-center text-center p-20">
                  <span className="font-marcellus text-4xl text-ancient-olive/60 tracking-widest italic mb-6">MCM</span>
                  <p className="text-[10px] font-figtree font-bold uppercase tracking-[0.8em] text-ancient-olive/20">Hand-Pressed Antiquity</p>
               </div>
            </div>
            <div>
              <span className="text-burnished-gold font-bold uppercase tracking-[2em] text-[8px] mb-12 block">Ethos</span>
              <h2 className="text-7xl font-marcellus text-ancient-olive mb-16 tracking-tighter leading-none italic">Ren. Transparent. <br /> <span className="not-italic text-burnished-gold">Essentiell.</span></h2>
              <div className="space-y-12 font-figtree text-ancient-olive/40 text-lg font-light leading-relaxed uppercase tracking-widest">
                <p>
                  Vi tror att skönhet inte ska komma på bekostnad av hälsa eller planet. Kommersiella tvålar är ofta fyllda med syntetik som torkar ut huden.
                </p>
                <p>
                  Aleppotvål är annorlunda. Den är biologiskt nedbrytbar, vegansk och otroligt mångsidig. En ritual för kropp, ansikte och själ.
                </p>
                <div className="pt-8">
                   <div className="h-px w-24 bg-burnished-gold/40 mb-8" />
                   <p className="font-semibold text-ancient-olive/80">
                     Genom att välja Aleppotvål stödjer du en tradition som har överlevt imperier, krig och tiden själv.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
