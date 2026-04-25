"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

type ThemeMode = "normal" | "red" | "blue";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("normal");
  const { totalItems, setIsCartOpen } = useCart();

  // Initialize mode from body class
  useEffect(() => {
    if (document.body.classList.contains('red-mode')) setMode("red");
    else if (document.body.classList.contains('blue-mode')) setMode("blue");
    else setMode("normal");
  }, []);

  const cycleMode = () => {
    const nextMode: ThemeMode = 
      mode === "normal" ? "red" : 
      mode === "red" ? "blue" : "normal";
    
    document.body.classList.remove('red-mode', 'blue-mode');
    if (nextMode === "red") document.body.classList.add('red-mode');
    if (nextMode === "blue") document.body.classList.add('blue-mode');
    
    setMode(nextMode);
  };

  const navLinks = [
    { name: "Collectio", href: "/shop" },
    { name: "L'Atelier", href: "/about" },
    { name: "Archive", href: "#" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-linen-50/70 backdrop-blur-3xl border-b border-gold-thread/10">
      <div className="mx-auto max-w-screen-2xl px-8 lg:px-16">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-5">
              <div className="w-11 h-11 border border-gold-thread flex items-center justify-center group-hover:bg-silk-olive group-hover:border-silk-olive transition-all duration-1000">
                <span className="font-marcellus text-xs text-silk-olive group-hover:text-linen-50">A</span>
              </div>
              <span className="font-marcellus text-xl tracking-[0.3em] text-silk-olive uppercase">
                ECO<span className="text-gold-leaf font-light">SOAP</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-figtree text-[9px] font-bold uppercase tracking-[0.5em] text-silk-olive/30 transition-all duration-1000 hover:text-silk-olive hover:tracking-[0.7em]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle (Cycle) */}
            <button
              onClick={cycleMode}
              className={`p-2 transition-all duration-500 rounded-full border border-gold-thread/20 ${
                mode === 'red' ? 'bg-red-600/10 text-red-600 border-red-200' : 
                mode === 'blue' ? 'bg-blue-600/10 text-blue-600 border-blue-200' : 
                'bg-transparent text-gold-leaf hover:bg-gold-thread/5'
              }`}
              title="Cycle Atelier Essence"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2 text-silk-olive hover:text-gold-leaf transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-none bg-silk-olive text-[6px] font-bold text-linen-50">
                {totalItems}
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-silk-olive hover:text-gold-leaf md:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-t border-gold-thread/10 bg-linen-50 md:hidden"
          >
            <div className="space-y-0 px-6 pb-12 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-6 font-figtree text-[10px] font-bold uppercase tracking-[0.5em] text-earth-deep/50 hover:text-silk-olive border-b border-gold-thread/5 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
