"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSettings } from "@/actions/settings";

export default function Footer() {
  const [socials, setSocials] = useState({ instagram: "#", facebook: "#", archive: "#" });

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings();
      if (settings.socials) setSocials(settings.socials);
    };
    fetchSettings();
  }, []);

  return (
    <footer className="mt-auto border-t border-gold-thread/10 bg-transparent pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-marcellus text-2xl text-ancient-olive uppercase tracking-widest">
              ECO<span className="text-gold-leaf font-light">SOAP</span>
            </Link>
            <p className="mt-4 max-w-xs font-figtree text-earth-deep/50 leading-relaxed uppercase tracking-widest text-[10px]">
              Skapad i världens äldsta tvålstad med samma traditionella metoder i över 2 000 år. Ren, naturlig och tidlös.
            </p>
          </div>
          
          <div>
            <h3 className="font-marcellus text-lg text-ancient-olive mb-6 uppercase tracking-widest">Utforska</h3>
            <ul className="space-y-4 font-figtree text-[10px] font-bold uppercase tracking-widest text-earth-deep/40">
              <li><Link href="/shop" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Kollektionen</Link></li>
              <li><Link href="/about" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Vår Historia</Link></li>
              <li><Link href="/sustainability" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Hållbarhet</Link></li>
              <li><Link href="/contact" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Kontakt</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-marcellus text-lg text-ancient-olive mb-6 uppercase tracking-widest">Anslut</h3>
            <ul className="space-y-4 font-figtree text-[10px] font-bold uppercase tracking-widest text-earth-deep/40">
              <li><a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Instagram</a></li>
              <li><a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">Facebook</a></li>
              <li><a href={socials.archive} className="hover:text-gold-leaf transition-all hover:tracking-[0.2em]">L'Atelier Archive</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gold-thread/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-figtree text-[8px] font-bold uppercase tracking-widest text-earth-deep/30">
            &copy; {new Date().getFullYear()} ECOSOAP. Bevarat Arv.
          </p>
          <div className="flex gap-6 font-figtree text-[8px] font-bold uppercase tracking-widest text-earth-deep/30">
            <Link href="#" className="hover:text-ancient-olive">Integritetspolicy</Link>
            <Link href="#" className="hover:text-ancient-olive">Villkor</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
