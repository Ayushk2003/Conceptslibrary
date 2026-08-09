import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check, Menu, ShoppingBag, Sparkles } from 'lucide-react';

interface Props { onBack: () => void; isDark?: boolean }

const scents = [
  { name: 'No. 01 Air', notes: 'Neroli · White tea', color: '#d6b77a' },
  { name: 'No. 02 Moss', notes: 'Hinoki · Vetiver', color: '#335b49' },
  { name: 'No. 03 Dusk', notes: 'Tonka · Amber', color: '#775267' },
];

export default function ModernConcept({ onBack, isDark }: Props) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const scent = scents[active];
  return <div className={`min-h-screen selection:bg-[#161714] selection:text-white ${isDark?'bg-[#10110f] text-[#f3f0e9]':'bg-[#f3f0e9] text-[#161714]'}`}>
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl ${isDark?'border-white/10 bg-[#10110f]/80':'border-black/10 bg-[#f3f0e9]/80'}`}>
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 lg:px-10">
        <button onClick={onBack} className="flex items-center gap-2 text-sm"><ArrowLeft className="h-4 w-4"/> Concepts</button>
        <div className="text-xl font-semibold tracking-[.35em]">AURA</div>
        <div className="flex items-center gap-5"><button className="hidden text-sm sm:block">Journal</button><button aria-label="Shopping bag"><ShoppingBag className="h-5 w-5"/></button><button className="lg:hidden" aria-label="Menu"><Menu/></button></div>
      </div>
    </header>

    <main>
      <section className="relative min-h-screen overflow-hidden pt-20">
        <div className="absolute inset-0"><img src={`${import.meta.env.BASE_URL}aura-collection.png`} alt="Aura refillable deodorant collection" className="h-full w-full object-cover object-[68%_center]"/><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent"/></div>
        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-[1500px] items-center px-5 py-20 lg:px-10">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8}} className="max-w-2xl text-white">
            <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[.28em] text-white/70"><Sparkles className="h-4 w-4"/> The new daily ritual</p>
            <h1 className="text-6xl font-medium leading-[.92] tracking-[-.06em] sm:text-7xl lg:text-[7.5rem]">Presence,<br/><span className="font-serif italic text-[#d7bf91]">refined.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/75 sm:text-xl">A refillable object for modern life. Clean protection, architectural form, and fine fragrance in one quiet gesture.</p>
            <div className="mt-9 flex flex-wrap gap-3"><button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-[#d7bf91]">Shop the collection <ArrowUpRight className="h-4 w-4"/></button><button className="rounded-full border border-white/30 px-6 py-3 backdrop-blur hover:bg-white/10">Discover the ritual</button></div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-36">
        <div className="lg:sticky lg:top-32 lg:self-start"><p className="text-xs uppercase tracking-[.25em] text-black/50">Choose your atmosphere</p><h2 className="mt-4 text-5xl font-medium tracking-[-.05em] sm:text-6xl">One object.<br/>Three states.</h2><p className="mt-6 max-w-sm text-black/60">Move through the collection. Each finish changes the mood, never the performance.</p></div>
        <div>
          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] bg-[#171815] p-8 text-white sm:p-12">
            <div className="absolute inset-0 opacity-50" style={{background:`radial-gradient(circle at 62% 42%, ${scent.color}, transparent 45%)`}}/>
            <AnimatePresence mode="wait"><motion.div key={active} initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:1.03}} className="relative flex min-h-[520px] flex-col justify-between">
              <div><span className="text-sm text-white/50">0{active+1} / 03</span><h3 className="mt-3 text-4xl sm:text-5xl">{scent.name}</h3><p className="mt-2 text-white/55">{scent.notes}</p></div>
              <div className="mx-auto h-72 w-36 rounded-[2.2rem] border border-white/20 shadow-2xl" style={{background:`linear-gradient(145deg, ${scent.color}, #111)`}}><div className="mx-4 mt-5 h-16 rounded-[1.4rem] bg-black/25"/><div className="mt-24 text-center text-sm tracking-[.3em]">AURA</div></div>
              <button onClick={()=>setSelected(active)} className="self-start rounded-full bg-white px-6 py-3 font-medium text-black">{selected===active ? <span className="flex items-center gap-2"><Check className="h-4 w-4"/> Selected</span> : 'Select this finish'}</button>
            </motion.div></AnimatePresence>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">{scents.map((item,i)=><button key={item.name} onClick={()=>setActive(i)} className={`rounded-2xl border p-4 text-left transition ${active===i?'border-black bg-white':'border-black/10 hover:bg-white/50'}`}><span className="block h-2 w-8 rounded-full" style={{background:item.color}}/><span className="mt-4 block text-sm font-medium">{item.name}</span><span className="text-xs text-black/45">{item.notes}</span></button>)}</div>
        </div>
      </section>

      <section className={`${isDark?'bg-[#181916]':'bg-[#ded8cc]'} px-5 py-24 lg:px-10 lg:py-36`}>
        <div className="mx-auto max-w-[1500px]"><p className="text-xs uppercase tracking-[.28em] opacity-50">Quiet intelligence</p><h2 className="mt-5 max-w-4xl text-5xl leading-[1.02] tracking-[-.05em] sm:text-7xl">Everything you need.<br/><span className="font-serif italic opacity-50">Nothing you do not.</span></h2><div className="mt-16 grid gap-8 md:grid-cols-3">{[['Refill, not replace','One precision case. Lightweight refills delivered only when you ask.'],['Skin first','A clean mineral formula designed for daily comfort and reliable protection.'],['Scent as atmosphere','Fine-fragrance compositions that sit close and evolve quietly through the day.']].map((x,i)=><article key={x[0]} className="border-t border-current/20 pt-6"><span className="text-xs opacity-40">0{i+1}</span><h3 className="mt-8 text-2xl">{x[0]}</h3><p className="mt-4 max-w-sm leading-relaxed opacity-55">{x[1]}</p></article>)}</div></div>
      </section>

      <footer className="px-5 py-10 lg:px-10"><div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-5 text-sm sm:flex-row"><span className="font-semibold tracking-[.25em]">AURA</span><span className="opacity-45">Designed for the rituals that stay.</span></div></footer>
    </main>
  </div>
}
