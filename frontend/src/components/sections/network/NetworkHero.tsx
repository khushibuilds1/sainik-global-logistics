'use client'

import { motion } from 'framer-motion'
import { Globe, MapPin, TrendingUp } from 'lucide-react'

export function NetworkHero() {
  return (
    <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full" />

      <div className="container-custom relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Global Presence
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9] text-white max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Strategic Hubs<br />
          <span className="text-brand-red">Worldwide Reach</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-white/50 max-w-xl mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          With operations across 120+ countries and regional hubs strategically positioned across key trade corridors, we deliver consistent, reliable logistics services wherever your business takes you.
        </motion.p>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-6 mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: Globe, value: '120+', label: 'Countries' },
            { icon: MapPin, value: '50+', label: 'Regional Hubs' },
            { icon: TrendingUp, value: '15+', label: 'Years Experience' },
          ].map((item, i) => (
            <div key={i} className="card-dark p-4">
              <item.icon size={20} className="text-brand-red mb-2" />
              <p className="font-display font-bold text-white text-2xl">{item.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-wide mt-1">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
