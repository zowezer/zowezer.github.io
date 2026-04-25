"use client";

import type { Metadata } from "next";
import { Marcellus, Figtree, Tenor_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import InteractiveBubbles from "@/components/InteractiveBubbles";
import { getSettings } from "@/actions/settings";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
});

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-tenor",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [themeClass, setThemeClass] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchSettings = async () => {
      const settings = await getSettings();
      if (settings.defaultMode === "red") setThemeClass("red-mode");
      else if (settings.defaultMode === "blue") setThemeClass("blue-mode");
      else setThemeClass("");
    };
    fetchSettings();
  }, []);

  // Bubbles only on Home, Shop, Checkout
  const showBubbles = pathname === "/" || pathname === "/shop" || pathname === "/checkout";

  if (!mounted) {
    return (
      <html lang="sv" className={`${marcellus.variable} ${figtree.variable} ${tenorSans.variable} h-full`}>
        <head>
          <title>ECOSOAP - Traditional Goods Exchange</title>
          <meta name="description" content="Authentic Aleppo soap and ancient skincare rituals for modern radiance." />
        </head>
        <body className="min-h-full flex flex-col font-figtree antialiased relative">
          <CartProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="sv" className={`${marcellus.variable} ${figtree.variable} ${tenorSans.variable} h-full`}>
      <head>
        <title>ECOSOAP - Traditional Goods Exchange</title>
        <meta name="description" content="Authentic Aleppo soap and ancient skincare rituals for modern radiance." />
      </head>
      <body className={`min-h-full flex flex-col font-figtree antialiased relative ${themeClass}`}>
        <CartProvider>
          {showBubbles && <InteractiveBubbles />}
          <Navbar />
          <CartDrawer />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
