"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { saveOrder } from "@/actions/orders";
import { ArrowLeft, CheckCircle2, CreditCard, Truck, ShieldCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "Sverige",
    cardNumber: "•••• •••• •••• ••••",
    expiry: "MM/YY",
    cvc: "•••"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderData = {
      customer: {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        address: `${formData.address}, ${formData.zipCode} ${formData.city}, ${formData.country}`
      },
      items: cart,
      total: totalPrice,
      paymentMethod: "Mock Card"
    };

    const result = await saveOrder(orderData);
    
    if (result.success) {
      clearCart();
      setStep(3);
    } else {
      alert("Något gick fel vid beställningen. Försök igen.");
    }
    
    setIsSubmitting(false);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-40 px-6">
        <h1 className="font-marcellus text-4xl text-ancient-olive mb-8 uppercase tracking-widest">Kassan är tom</h1>
        <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.5em] text-silk-olive border-b border-gold-thread pb-2 hover:text-gold-leaf transition-all">
          Gå till butiken
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-48 pb-32 bg-transparent selection:bg-ancient-olive selection:text-silk-pearl">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Forms */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-6 mb-16">
                    <span className="text-gold-leaf font-bold uppercase tracking-[1.2em] text-[8px]">Step 01</span>
                    <h2 className="font-marcellus text-3xl text-ancient-olive uppercase tracking-[0.2em]">Leverans</h2>
                  </div>

                  <form className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Förnamn</label>
                        <input 
                          type="text" name="firstName" required
                          value={formData.firstName} onChange={handleInputChange}
                          className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Efternamn</label>
                        <input 
                          type="text" name="lastName" required
                          value={formData.lastName} onChange={handleInputChange}
                          className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">E-postadress</label>
                      <input 
                        type="email" name="email" required
                        value={formData.email} onChange={handleInputChange}
                        className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Adress</label>
                      <input 
                        type="text" name="address" required
                        value={formData.address} onChange={handleInputChange}
                        className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Postnummer</label>
                        <input 
                          type="text" name="zipCode" required
                          value={formData.zipCode} onChange={handleInputChange}
                          className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Stad</label>
                        <input 
                          type="text" name="city" required
                          value={formData.city} onChange={handleInputChange}
                          className="w-full bg-white/30 border-b border-gold-thread/20 py-4 focus:border-ancient-olive outline-none transition-colors font-figtree text-sm"
                        />
                      </div>
                    </div>

                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="group relative inline-flex px-24 py-10 bg-silk-olive text-linen-50 rounded-none overflow-hidden transition-all duration-1000 w-full md:w-fit shadow-xl"
                    >
                      <span className="relative z-10 font-figtree font-bold uppercase tracking-[0.6em] text-[8px]">Fortsätt till betalning</span>
                      <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button onClick={() => setStep(1)} className="flex items-center gap-3 text-silk-olive/40 hover:text-silk-olive mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 stroke-[1px]" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Tillbaka</span>
                  </button>
                  
                  <div className="flex items-center gap-6 mb-16">
                    <span className="text-gold-leaf font-bold uppercase tracking-[1.2em] text-[8px]">Step 02</span>
                    <h2 className="font-marcellus text-3xl text-ancient-olive uppercase tracking-[0.2em]">Betalning</h2>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-ancient-olive/10 p-12 mb-16 shadow-2xl relative overflow-hidden">
                    {/* Vellum Press Refinements */}
                    <div className="absolute inset-0 border-[0.5px] border-white/40 pointer-events-none z-10" />
                    <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       <CreditCard className="w-32 h-32 stroke-[0.5px]" />
                    </div>
                    
                    <p className="font-marcellus text-lg text-ancient-olive/60 mb-12 italic uppercase tracking-widest">Säker Transaktion</p>
                    
                    <form onSubmit={handleSubmitOrder} className="space-y-10">
                      <div className="space-y-4">
                        <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Kortnummer</label>
                        <input 
                          type="text" name="cardNumber" disabled
                          value={formData.cardNumber}
                          className="w-full bg-transparent border-b border-gold-thread/20 py-4 outline-none font-figtree text-sm opacity-50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-10">
                        <div className="space-y-4">
                          <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">Giltigt t.o.m</label>
                          <input 
                            type="text" name="expiry" disabled
                            value={formData.expiry}
                            className="w-full bg-transparent border-b border-gold-thread/20 py-4 outline-none font-figtree text-sm opacity-50"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="block font-figtree text-[9px] font-bold uppercase tracking-[0.4em] text-ancient-olive/40">CVC</label>
                          <input 
                            type="text" name="cvc" disabled
                            value={formData.cvc}
                            className="w-full bg-transparent border-b border-gold-thread/20 py-4 outline-none font-figtree text-sm opacity-50"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-6 bg-gold-thread/5 border border-gold-thread/10">
                        <ShieldCheck className="w-5 h-5 text-gold-leaf stroke-[1px]" />
                        <p className="text-[10px] uppercase tracking-widest text-silk-olive/60 leading-relaxed">
                          Detta är en säker demo-checkout. Ingen riktig betalning kommer att debiteras.
                        </p>
                      </div>

                      <button 
                        disabled={isSubmitting}
                        className="group relative inline-flex px-24 py-10 bg-ancient-olive text-silk-pearl rounded-none overflow-hidden transition-all duration-1000 w-full md:w-fit shadow-xl"
                      >
                        <span className="relative z-10 font-figtree font-bold uppercase tracking-[0.6em] text-[8px]">
                          {isSubmitting ? "Bearbetar..." : `Betala ${totalPrice} kr`}
                        </span>
                        <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-white/10 backdrop-blur-3xl border border-ancient-olive/5 shadow-2xl"
                >
                  <CheckCircle2 className="w-20 h-20 text-gold-leaf stroke-[0.5px] mx-auto mb-10" />
                  <h2 className="font-marcellus text-5xl text-ancient-olive uppercase tracking-[0.2em] mb-8">Tack för din order.</h2>
                  <p className="font-figtree text-sm uppercase tracking-[0.3em] text-ancient-olive/40 mb-16 max-w-md mx-auto leading-relaxed">
                    Din beställning är mottagen och din ritual påbörjas snart. En bekräftelse har skickats till din e-post.
                  </p>
                  <Link
                    href="/"
                    className="group relative inline-flex px-24 py-9 bg-silk-olive text-linen-50 rounded-none overflow-hidden transition-all duration-1000 shadow-xl"
                  >
                    <span className="relative z-10 font-figtree font-bold uppercase tracking-[0.6em] text-[8px]">Tillbaka till startsidan</span>
                    <div className="absolute inset-0 bg-gold-leaf translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5">
            <div className="bg-linen-100/50 backdrop-blur-md border border-gold-thread/10 p-12 sticky top-48">
              <h3 className="font-marcellus text-xl text-ancient-olive uppercase tracking-[0.2em] mb-12 border-b border-gold-thread/10 pb-8">Sammanfattning</h3>
              
              <div className="space-y-10 mb-12">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative w-16 h-16 bg-transparent border border-gold-thread/10 overflow-hidden">
                        <div className="absolute inset-0 border-[0.5px] border-white/20 pointer-events-none z-10" />
                        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                        <div className="relative w-full h-full mix-blend-multiply p-1">
                          <Image src={item.image} alt={item.name} fill className="object-contain" unoptimized={true} />
                        </div>
                      </div>
                      <div>
                        <p className="font-marcellus text-xs uppercase tracking-widest text-silk-olive">{item.name}</p>
                        <p className="font-figtree text-[10px] text-earth-deep/40 uppercase tracking-widest mt-1">Antal: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-figtree text-xs font-bold text-silk-olive">{item.price * item.quantity} kr</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6 pt-10 border-t border-gold-thread/10">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-earth-deep/40">
                  <span>Delsumma</span>
                  <span>{totalPrice} kr</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-earth-deep/40">
                  <span>Frakt</span>
                  <span className="text-gold-leaf">Gratis</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-gold-thread/20">
                  <span className="font-marcellus text-xl text-silk-olive uppercase tracking-widest">Total</span>
                  <span className="font-marcellus text-xl text-silk-olive">{totalPrice} kr</span>
                </div>
              </div>

              <div className="mt-16 space-y-6">
                <div className="flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.4em] text-silk-olive/30">
                  <Truck className="w-4 h-4 stroke-[1px]" />
                  <span>Premium Leverans (2-4 dagar)</span>
                </div>
                <div className="flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.4em] text-silk-olive/30">
                  <ShoppingBag className="w-4 h-4 stroke-[1px]" />
                  <span>Klimatneutrala Förpackningar</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
