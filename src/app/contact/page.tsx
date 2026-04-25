"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { getSettings } from "@/actions/settings";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsUpdating] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings();
      setContactEmail(settings.contactEmail);
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    // Simulating API call
    await new Promise(r => setTimeout(r, 2000));
    setIsSent(true);
    setIsUpdating(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-40 pb-32 bg-transparent">
      <div className="mx-auto max-w-screen-2xl px-12 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-gold-leaf font-bold uppercase tracking-[1.5em] text-[8px] mb-8 block">Colloquium</span>
              <h1 className="text-7xl font-marcellus text-ancient-olive italic tracking-tighter uppercase mb-12">Kontakt.</h1>
              <p className="font-figtree text-ancient-olive/40 text-lg leading-relaxed uppercase tracking-widest max-w-md">
                Vänligen kontakta oss för förfrågningar gällande beställningar, samarbeten eller för att lära dig mer om våra ritualer.
              </p>
            </motion.div>

            <div className="space-y-12">
               <div className="flex items-start gap-8 group">
                  <div className="w-12 h-12 border border-gold-thread/20 flex items-center justify-center text-gold-leaf group-hover:bg-gold-leaf group-hover:text-ancient-olive transition-all">
                     <MessageSquare className="w-4 h-4 stroke-[1px]" />
                  </div>
                  <div>
                     <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-ancient-olive/30 block mb-2">Responsum</span>
                     <p className="font-marcellus text-xl text-ancient-olive tracking-widest uppercase">Digital Atelier</p>
                  </div>
               </div>

               <div className="flex items-start gap-8 group">
                  <div className="w-12 h-12 border border-gold-thread/20 flex items-center justify-center text-gold-leaf group-hover:bg-gold-leaf group-hover:text-ancient-olive transition-all">
                     <MapPin className="w-4 h-4 stroke-[1px]" />
                  </div>
                  <div>
                     <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-ancient-olive/30 block mb-2">Atelier Locale</span>
                     <p className="font-marcellus text-xl text-ancient-olive tracking-widest uppercase">Stockholm, Sweden</p>
                  </div>
               </div>
            </div>

            <div className="pt-12 border-t border-gold-thread/10">
               <div className="flex gap-10">
                  {['Instagram', 'Archive', 'Newsletter'].map(link => (
                    <span key={link} className="text-[9px] font-bold uppercase tracking-[0.5em] text-ancient-olive/30 hover:text-gold-leaf cursor-pointer transition-colors">{link}</span>
                  ))}
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="relative bg-white/40 border border-gold-thread/10 p-12 lg:p-20 shadow-2xl backdrop-blur-3xl overflow-hidden">
               {/* Decorative refraction */}
               <div className="absolute inset-0 border-[0.5px] border-white/60 pointer-events-none z-10" />
               <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

               <AnimatePresence mode="wait">
                 {!isSent ? (
                   <motion.form 
                     key="form"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onSubmit={handleSubmit} 
                     className="space-y-12 relative z-20"
                   >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                           <label className="text-[8px] font-bold uppercase tracking-[0.6em] text-ancient-olive/40 ml-4">Fullständigt Namn</label>
                           <input 
                             required
                             type="text" 
                             value={formData.name}
                             onChange={e => setFormData({...formData, name: e.target.value})}
                             className="w-full bg-linen-50/50 border border-gold-thread/20 py-5 px-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest transition-all"
                           />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[8px] font-bold uppercase tracking-[0.6em] text-ancient-olive/40 ml-4">E-postadress</label>
                           <input 
                             required
                             type="email" 
                             value={formData.email}
                             onChange={e => setFormData({...formData, email: e.target.value})}
                             className="w-full bg-linen-50/50 border border-gold-thread/20 py-5 px-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest transition-all"
                           />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[8px] font-bold uppercase tracking-[0.6em] text-ancient-olive/40 ml-4">Ditt Meddelande</label>
                        <textarea 
                          required
                          rows={6}
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-linen-50/50 border border-gold-thread/20 py-5 px-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest transition-all resize-none"
                        />
                     </div>
                     
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="group relative w-full bg-ancient-olive text-silk-pearl py-8 overflow-hidden transition-all duration-1000 disabled:opacity-50"
                     >
                        <span className="relative z-10 font-figtree font-bold uppercase tracking-[0.8em] text-[10px] flex items-center justify-center gap-4">
                          {isSubmitting ? 'Transmitterar...' : <><Send className="w-4 h-4 stroke-[1px]" /> Skicka Förfrågan</>}
                        </span>
                        <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                     </button>
                   </motion.form>
                 ) : (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-center py-20 relative z-20"
                   >
                     <div className="w-24 h-24 border border-gold-leaf flex items-center justify-center mx-auto mb-12">
                        <CheckCircle2 className="w-8 h-8 text-gold-leaf stroke-[1px]" />
                     </div>
                     <h3 className="font-marcellus text-3xl text-ancient-olive uppercase tracking-widest mb-6">Meddelande Mottaget</h3>
                     <p className="font-figtree text-ancient-olive/40 text-sm uppercase tracking-[0.2em] mb-12">Vi återkommer till dig inom kort.</p>
                     <button 
                       onClick={() => setIsSent(false)}
                       className="text-[10px] font-bold uppercase tracking-[0.6em] text-ancient-olive hover:text-gold-leaf transition-colors"
                     >
                       Skicka ett till
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
