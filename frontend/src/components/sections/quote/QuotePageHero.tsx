'use client'
import { motion } from 'framer-motion'
import { Clock, ShieldCheck, PhoneCall } from 'lucide-react'

const badges = [
  { icon: Clock,       text: '2-Hour Response' },
  { icon: ShieldCheck, text: 'Consultation' },
  { icon: PhoneCall,   text: 'Dedicated Expert' },
]

export function QuotePageHero() {
  return (
    <section className="relative pt-32 pb-16 bg-brand-dark overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-red/8 via-transparent to-transparent" />
      <div className="container-custom relative z-10">
        <motion.p className="eyebrow mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Free Estimate
        </motion.p>
        <motion.h1
          className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9] text-white max-w-3xl"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          Request a<br /><span className="text-brand-red">Freight Quote</span>
        </motion.h1>
        <motion.p
          className="text-white/50 max-w-xl mt-5 leading-relaxed"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        >
          Fill in your shipment details and our logistics team will send a competitive, detailed quote within 2 business hours.
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-3 mt-8"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        >
          {badges.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 glass border border-white/10 px-4 py-2 text-sm"
            >
              <Icon size={14} className="text-brand-red" />
              <span className="text-white/70 font-body">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
