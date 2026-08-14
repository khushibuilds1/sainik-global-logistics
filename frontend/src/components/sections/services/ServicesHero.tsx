'use client'
import { motion } from 'framer-motion'

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-custom relative z-10">
        <motion.p className="eyebrow mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>What We Offer</motion.p>
        <motion.h1
          className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9] text-white max-w-4xl"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          Full-Spectrum<br /><span className="text-brand-red">Logistics Services</span>
        </motion.h1>
        <motion.p
          className="text-white/50 max-w-xl mt-6 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        >
          From first-mile pickup to last-mile delivery — every mode, every lane, every compliance requirement covered.
        </motion.p>
      </div>
    </section>
  )
}
