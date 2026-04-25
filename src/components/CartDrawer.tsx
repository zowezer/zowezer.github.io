"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[100] bg-ancient-olive/20 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-full max-w-md bg-linen-50 shadow-2xl flex flex-col will-change-transform"
          >
            {/* Header */}
            <div className="p-8 border-b border-gold-thread/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-5 h-5 text-silk-olive stroke-[1.5px]" />
                <h2 className="font-marcellus text-xl tracking-[0.2em] text-silk-olive uppercase">Din Ritual</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-silk-olive/40 hover:text-silk-olive transition-colors"
              >
                <X className="w-6 h-6 stroke-[1px]" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 border border-gold-thread/20 flex items-center justify-center mb-6 opacity-30">
                    <ShoppingBag className="w-8 h-8 text-silk-olive stroke-[1px]" />
                  </div>
                  <p className="font-figtree text-sm uppercase tracking-[0.2em] text-earth-deep/40">Din varukorg är tom</p>
                  <Link 
                    href="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-8 text-[10px] font-bold uppercase tracking-[0.4em] text-silk-olive hover:text-gold-leaf transition-colors"
                  >
                    Börja Utforska
                  </Link>
                </div>
              ) : (
                <div className="space-y-10">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="relative w-24 h-24 bg-transparent border border-gold-thread/10 overflow-hidden">
                        {/* Inner Refraction */}
                        <div className="absolute inset-0 border-[0.5px] border-white/20 pointer-events-none z-10" />
                        <div className="absolute inset-0 opacity-[0.02] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                        
                        <div className="relative w-full h-full mix-blend-multiply p-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                            unoptimized={true}
                          />
                        </div>
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-marcellus text-sm tracking-widest text-silk-olive uppercase">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-silk-olive/20 hover:text-ancient-olive transition-colors"
                            >
                              <X className="w-4 h-4 stroke-[1px]" />
                            </button>
                          </div>
                          <p className="text-[10px] font-figtree font-bold text-gold-leaf tracking-widest">{item.priceString}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gold-thread/20">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-silk-olive/40 hover:text-silk-olive transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[10px] font-bold font-figtree text-silk-olive">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-silk-olive/40 hover:text-silk-olive transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-linen-100/50 border-t border-gold-thread/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-figtree text-[10px] font-bold uppercase tracking-[0.4em] text-earth-deep/40">Totalsumma</span>
                  <span className="font-marcellus text-2xl text-silk-olive">{totalPrice} kr</span>
                </div>
                
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full bg-silk-olive text-linen-50 py-6 text-center font-figtree font-bold uppercase tracking-[0.6em] text-[10px] hover:bg-ancient-olive transition-all shadow-xl"
                >
                  Gå till kassan
                </Link>
                
                <p className="mt-6 text-center text-[9px] font-figtree font-medium uppercase tracking-[0.2em] text-earth-deep/30">
                  Frakt & skatter beräknas i kassan
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
