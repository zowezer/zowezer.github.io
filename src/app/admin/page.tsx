"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOrders, updateOrderStatus, getAnalytics } from "@/actions/orders";
import { updateDefaultMode, getSettings, updateContactEmail, updateSocials } from "@/actions/settings";
import { 
  Lock, Package, Users, BarChart3, ArrowRight, LogOut, 
  Clock, CheckCircle2, Truck, X, Mail, MessageSquare, 
  TrendingUp, MapPin, CreditCard, AlertCircle, RefreshCcw, 
  Undo2, Filter, ChevronRight, Activity, Search, ShoppingBag,
  Timer, Award, ArrowUpRight, ArrowDownRight, Globe, Calendar, 
  Sparkles, Sun, Droplets, AtSign, Save, Share2, Layout
} from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [view, setView] = useState<"orders" | "analytics" | "settings">("orders");
  const [filter, setFilter] = useState("alla");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [insightTimeframe, setInsightTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly" | "allTime">("daily");
  const [defaultMode, setDefaultMode] = useState<"normal" | "red" | "blue">("normal");
  const [contactEmail, setContactEmail] = useState("");
  const [socials, setSocials] = useState({ instagram: "", facebook: "", archive: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aleppo2026") {
      setIsAuthenticated(true);
    } else {
      alert("Fel lösenord");
    }
  };

  const refreshData = async () => {
    try {
      const [ordersData, analyticsData, settings] = await Promise.all([
        getOrders(),
        getAnalytics(),
        getSettings()
      ]);
      setOrders([...ordersData].reverse());
      setAnalytics(analyticsData);
      setDefaultMode(settings.defaultMode);
      setContactEmail(settings.contactEmail);
      if (settings.socials) setSocials(settings.socials);
    } catch (err) {
      console.error("Sync error:", err);
    }
  };

  const handleModeChange = async (mode: "normal" | "red" | "blue") => {
    const res = await updateDefaultMode(mode);
    if (res.success) {
      setDefaultMode(mode);
      setSuccessMsg(`Default mode updated to ${mode.toUpperCase()}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const res = await updateContactEmail(contactEmail);
    const res2 = await updateSocials(socials);
    if (res.success && res2.success) {
      setSuccessMsg("Settings updated successfully");
      setTimeout(() => setSuccessMsg(null), 3000);
    } else {
      setError("Failed to update settings");
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
      const interval = setInterval(refreshData, 15000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await updateOrderStatus(orderId, status);
      if (res.success) {
        setSuccessMsg(`Status uppdaterad: ${status.toUpperCase()}`);
        await refreshData();
        if (selectedOrder?.id === orderId) setSelectedOrder(res.order);
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setError(res.error || "Misslyckades att uppdatera status");
      }
    } catch (err) {
      setError("Tekniskt fel vid uppdatering");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === "alla" ? true : o.status === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q) || o.customer.email.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-silk-pearl px-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-white p-12 border border-gold-thread/20 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 border border-gold-thread flex items-center justify-center mb-6"><Lock className="w-6 h-6 text-silk-olive stroke-[1px]" /></div>
            <h1 className="font-marcellus text-2xl text-ancient-olive uppercase tracking-[0.2em]">Atelier Control</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-linen-50 border border-gold-thread/20 py-4 px-4 focus:border-ancient-olive outline-none text-center font-figtree text-sm" placeholder="PASSCODE" />
            <button type="submit" className="w-full bg-ancient-olive text-silk-pearl py-5 font-bold uppercase tracking-[0.6em] text-[8px] hover:bg-silk-olive transition-all">Entra</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-silk-pearl pt-40 pb-32 selection:bg-ancient-olive selection:text-silk-pearl font-figtree">
      <div className="mx-auto max-w-screen-2xl px-12 lg:px-24">
        
        <div className="flex flex-col md:flex-row gap-12 mb-20 items-start md:items-center justify-between border-b border-ancient-olive/10 pb-12">
          <div className="flex items-center gap-12">
             <div className="flex flex-col">
                <span className="text-gold-leaf font-bold uppercase tracking-[1.2em] text-[8px] mb-2 text-ancient-olive/40">Operational Hub</span>
                <h1 className="font-marcellus text-6xl text-ancient-olive tracking-tighter uppercase italic">Control.</h1>
             </div>
             <div className="h-12 w-px bg-ancient-olive/10 hidden md:block" />
             <nav className="flex gap-10">
                <button onClick={() => setView("orders")} className={`text-[10px] font-bold uppercase tracking-[0.5em] pb-2 border-b transition-all ${view === 'orders' ? 'text-ancient-olive border-gold-leaf' : 'text-ancient-olive/30 border-transparent hover:text-ancient-olive/50'}`}>Orders</button>
                <button onClick={() => setView("analytics")} className={`text-[10px] font-bold uppercase tracking-[0.5em] pb-2 border-b transition-all ${view === 'analytics' ? 'text-ancient-olive border-gold-leaf' : 'text-ancient-olive/30 border-transparent hover:text-ancient-olive/50'}`}>Intelligence</button>
                <button onClick={() => setView("settings")} className={`text-[10px] font-bold uppercase tracking-[0.5em] pb-2 border-b transition-all ${view === 'settings' ? 'text-ancient-olive border-gold-leaf' : 'text-ancient-olive/30 border-transparent hover:text-ancient-olive/50'}`}>Essence</button>
             </nav>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[8px] font-bold uppercase tracking-[0.6em] text-ancient-olive/30 hover:text-ancient-olive flex items-center gap-3 bg-white/50 px-6 py-3 border border-gold-thread/10 transition-all">Termination <LogOut className="w-3.5 h-3.5" /></button>
        </div>

        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-widest text-center">
            {successMsg}
          </motion.div>
        )}

        {view === "orders" && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center bg-white/30 p-8 border border-gold-thread/10">
               <div className="relative w-full lg:w-96 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ancient-olive/20 group-focus-within:text-gold-leaf transition-colors" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SÖK NR, NAMN ELLER E-POST..." className="w-full bg-linen-50 border border-gold-thread/20 py-4 pl-12 pr-4 focus:border-ancient-olive outline-none font-figtree text-[10px] font-bold tracking-widest uppercase" />
               </div>
               <div className="flex flex-wrap gap-3 items-center">
                  {["alla", "pending", "skickad", "levererad", "retur"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`px-6 py-2 border text-[7px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-ancient-olive text-silk-pearl border-ancient-olive' : 'border-gold-thread/20 text-ancient-olive/40 hover:border-ancient-olive/40'}`}>{f === 'pending' ? 'Väntar' : f === 'skickad' ? 'Skickad' : f === 'levererad' ? 'Levererad' : f === 'retur' ? 'RETUR' : 'Alla'}</button>
                  ))}
               </div>
            </div>
            <div className="bg-white/40 backdrop-blur-3xl border border-ancient-olive/5 shadow-2xl overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead><tr className="border-b border-ancient-olive/10 bg-ancient-olive/[0.03] text-[9px] font-bold uppercase tracking-[0.5em] text-ancient-olive/40"><th className="p-10">Reference</th><th className="p-10">Client</th><th className="p-10">Placement</th><th className="p-10">Total</th><th className="p-10">Status</th><th className="p-10"></th></tr></thead>
                  <tbody className="divide-y divide-ancient-olive/5">
                    {filteredOrders.length === 0 ? (<tr><td colSpan={6} className="p-40 text-center text-xs uppercase tracking-[0.4em] text-ancient-olive/20 italic">No intelligence found.</td></tr>) : filteredOrders.map((o) => (
                      <tr key={o.id} className="group hover:bg-ancient-olive/[0.02] transition-all cursor-pointer" onClick={() => setSelectedOrder(o)}>
                        <td className="p-10 font-bold text-silk-olive tracking-widest text-xs">{o.id}</td>
                        <td className="p-10"><div className="flex flex-col"><span className="font-marcellus text-base text-ancient-olive tracking-widest uppercase">{o.customer.name}</span><span className="text-[10px] text-ancient-olive/30 tracking-wider mt-1 uppercase font-bold">{o.customer.email}</span></div></td>
                        <td className="p-10 text-[11px] text-ancient-olive/60 uppercase tracking-widest font-medium">{new Date(o.createdAt).toLocaleDateString('sv-SE')}</td>
                        <td className="p-10 font-marcellus text-xl text-ancient-olive font-bold">{o.total} kr</td>
                        <td className="p-10"><div className={`inline-flex items-center gap-2.5 px-4 py-1.5 border ${o.status === 'pending' ? 'bg-gold-leaf/10 border-gold-leaf/20 text-gold-leaf' : o.status === 'skickad' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' : o.status === 'retur' ? 'bg-red-500/10 border-red-500/20 text-red-600' : 'bg-silk-olive/10 border-silk-olive/20 text-silk-olive'} text-[8px] font-bold uppercase tracking-[0.2em]`}>{o.status === 'pending' ? <Clock className="w-3 h-3" /> : o.status === 'skickad' ? <Truck className="w-3 h-3" /> : o.status === 'retur' ? <RefreshCcw className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}{o.status === 'pending' ? 'VÄNTAR' : o.status.toUpperCase()}</div></td>
                        <td className="p-10 text-right opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-5 h-5 ml-auto text-gold-leaf" /></td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {view === "analytics" && (
          <div className="space-y-16 animate-in fade-in duration-1000">
             <div className="flex gap-4 p-1 bg-ancient-olive/5 w-fit border border-gold-thread/10 mb-10">
               {["daily", "weekly", "monthly", "yearly", "allTime"].map(t => (
                 <button key={t} onClick={() => setInsightTimeframe(t as any)} className={`px-10 py-2 text-[9px] font-bold uppercase tracking-[0.4em] transition-all ${insightTimeframe === t ? 'bg-ancient-olive text-silk-pearl shadow-lg' : 'text-ancient-olive/40 hover:text-ancient-olive'}`}>{t === 'allTime' ? 'Global' : t}</button>
               ))}
            </div>
            {/* Minimal placeholder for analytics grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
                <div className="h-40 bg-white border border-gold-thread/10"></div>
                <div className="h-40 bg-white border border-gold-thread/10"></div>
                <div className="h-40 bg-white border border-gold-thread/10"></div>
                <div className="h-40 bg-white border border-gold-thread/10"></div>
            </div>
          </div>
        )}

        {view === "settings" && (
          <div className="max-w-4xl space-y-16 animate-in fade-in duration-700">
            <section className="bg-white/40 border border-gold-thread/10 p-12">
               <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-ancient-olive/30 mb-8 block">Default Essence</span>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "normal", label: "Botanical", icon: Sun, color: "bg-ancient-olive" },
                    { id: "red", label: "Valentine", icon: Sparkles, color: "bg-red-600" },
                    { id: "blue", label: "Sapphire", icon: Droplets, color: "bg-blue-600" }
                  ].map(m => (
                    <button 
                      key={m.id} 
                      onClick={() => handleModeChange(m.id as any)}
                      className={`flex flex-col items-center gap-6 p-10 border transition-all ${defaultMode === m.id ? 'border-ancient-olive bg-white shadow-xl' : 'border-gold-thread/10 bg-white/20 hover:border-ancient-olive/40'}`}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center ${defaultMode === m.id ? m.color + ' text-white' : 'bg-ancient-olive/5 text-ancient-olive/30'}`}>
                        <m.icon className="w-5 h-5 stroke-[1px]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em]">{m.label}</span>
                    </button>
                  ))}
               </div>
            </section>

            <form onSubmit={handleSettingsUpdate} className="space-y-12">
              <section className="bg-white/40 border border-gold-thread/10 p-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-ancient-olive/30 mb-10 block">Communications</span>
                <div className="relative">
                  <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ancient-olive/20" />
                  <input 
                    type="email" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="CONTACT EMAIL"
                    className="w-full bg-linen-50 border border-gold-thread/20 py-6 pl-16 pr-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest"
                  />
                </div>
              </section>

              <section className="bg-white/40 border border-gold-thread/10 p-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-ancient-olive/30 mb-10 block">Social Presence</span>
                <div className="space-y-6">
                  <div className="relative">
                    <Share2 className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ancient-olive/20" />
                    <input 
                      type="text" 
                      value={socials.instagram} 
                      onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                      placeholder="e.g., https://instagram.com/your-brand"
                      className="w-full bg-linen-50 border border-gold-thread/20 py-6 pl-16 pr-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-widest text-ancient-olive/20 pointer-events-none">Instagram</span>
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ancient-olive/20" />
                    <input 
                      type="text" 
                      value={socials.facebook} 
                      onChange={(e) => setSocials({...socials, facebook: e.target.value})}
                      placeholder="e.g., https://facebook.com/your-brand"
                      className="w-full bg-linen-50 border border-gold-thread/20 py-6 pl-16 pr-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-widest text-ancient-olive/20 pointer-events-none">Facebook</span>
                  </div>
                  <div className="relative">
                    <Layout className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ancient-olive/20" />
                    <input 
                      type="text" 
                      value={socials.archive} 
                      onChange={(e) => setSocials({...socials, archive: e.target.value})}
                      placeholder="e.g., /about or https://archive.org"
                      className="w-full bg-linen-50 border border-gold-thread/20 py-6 pl-16 pr-6 focus:border-ancient-olive outline-none font-figtree text-sm tracking-widest"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[7px] font-bold uppercase tracking-widest text-ancient-olive/20 pointer-events-none">Archive</span>
                  </div>
                </div>
              </section>

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-ancient-olive text-silk-pearl px-20 py-8 font-bold uppercase tracking-[0.6em] text-[10px] hover:bg-silk-olive transition-all flex items-center gap-6 shadow-2xl"
                >
                  {isUpdating ? 'Saving...' : <><Save className="w-5 h-5 stroke-[1px]" /> Enforce Changes</>}
                </button>
              </div>
            </form>
          </div>
        )}

        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="fixed inset-0 z-[100] bg-ancient-olive/50 backdrop-blur-md" />
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: 'spring', damping: 30, stiffness: 180 }} className="fixed right-0 top-0 z-[101] h-full w-full max-w-2xl bg-linen-50 shadow-2xl flex flex-col">
                 <div className="p-12 border-b border-gold-thread/10 flex items-center justify-between bg-white/40 backdrop-blur-2xl"><div className="flex flex-col"><span className="text-[11px] font-bold uppercase tracking-[0.6em] text-gold-leaf mb-2 font-figtree">{selectedOrder.id}</span><h2 className="font-marcellus text-3xl text-ancient-olive uppercase tracking-[0.1em]">Dossier Client</h2></div><button onClick={() => setSelectedOrder(null)} className="p-4 bg-ancient-olive/5 hover:bg-ancient-olive hover:text-silk-pearl transition-all group"><X className="w-6 h-6 stroke-[1px] group-hover:rotate-90 transition-transform" /></button></div>
                 <div className="flex-grow overflow-y-auto p-12 custom-scrollbar space-y-16 pb-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <section className="space-y-6"><span className="text-[9px] font-bold uppercase tracking-[0.5em] text-ancient-olive/30 flex items-center gap-3"><Users className="w-3.5 h-3.5" /> Identity</span><div className="bg-white/60 p-8 border border-gold-thread/10 shadow-sm"><p className="font-marcellus text-2xl text-ancient-olive uppercase tracking-widest">{selectedOrder.customer.name}</p><p className="font-bold text-[10px] text-ancient-olive/40 mt-3 tracking-widest uppercase">{selectedOrder.customer.email}</p><p className="text-[10px] text-ancient-olive/60 mt-8 leading-relaxed font-bold tracking-widest uppercase border-t border-gold-thread/10 pt-6"><MapPin className="w-3 h-3 mb-2 opacity-50" />{selectedOrder.customer.address}</p></div></section>
                       <section className="space-y-6"><span className="text-[9px] font-bold uppercase tracking-[0.5em] text-ancient-olive/30 flex items-center gap-3"><Package className="w-3.5 h-3.5" /> Context</span><div className="bg-white/60 p-8 border border-gold-thread/10 shadow-sm space-y-6"><div className="flex justify-between items-center border-b border-gold-thread/5 pb-4"><span className="text-[10px] font-bold uppercase tracking-widest text-ancient-olive/40">Amount</span><span className="font-marcellus text-xl text-gold-leaf">{selectedOrder.total} kr</span></div><div className="space-y-4">{selectedOrder.items.map((item: any) => (<div key={item.id} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest"><span className="text-ancient-olive/70">{item.quantity}x {item.name}</span><span className="text-ancient-olive/30">{item.priceString}</span></div>))}</div></div></section>
                    </div>
                    <div className="bg-ancient-olive/[0.02] p-10 border border-gold-thread/20">
                       <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-ancient-olive/30 mb-10 block">Master Execution</span>
                       <div className="grid grid-cols-2 gap-4">
                          {[{ id: "pending", label: "Väntar", icon: Clock }, { id: "skickad", label: "Skickad", icon: Truck }, { id: "levererad", label: "Levererad", icon: CheckCircle2 }, { id: "retur", label: "RETUR", icon: RefreshCcw }].map(s => (
                            <button key={s.id} onClick={() => handleStatusUpdate(selectedOrder.id, s.id)} disabled={selectedOrder.status === s.id || isUpdating} className={`flex items-center justify-center gap-4 py-8 border transition-all ${selectedOrder.status === s.id ? (s.id === 'retur' ? 'bg-red-600 text-white border-red-600' : 'bg-ancient-olive text-silk-pearl border-ancient-olive') : (s.id === 'retur' ? 'bg-red-50 border-red-100 text-red-600/60 hover:bg-red-600 hover:text-white' : 'bg-white border-gold-thread/20 text-ancient-olive/40 hover:border-ancient-olive hover:text-ancient-olive')} disabled:cursor-not-allowed`}><s.icon className={`w-4 h-4 ${selectedOrder.status === s.id ? (s.id === 'retur' ? 'text-white' : 'text-gold-leaf') : ''}`} /><span className="text-[9px] font-bold uppercase tracking-[0.4em]">{isUpdating && selectedOrder.status !== s.id ? '...' : s.label}</span></button>
                          ))}
                       </div>
                    </div>
                 </div>
                 <div className="p-10 bg-white/80 backdrop-blur-3xl border-t border-gold-thread/10 flex justify-end"><button onClick={() => setSelectedOrder(null)} className="px-16 py-6 bg-ancient-olive text-silk-pearl text-[9px] font-bold uppercase tracking-[0.5em] hover:bg-silk-olive transition-all">Close Dossier</button></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
