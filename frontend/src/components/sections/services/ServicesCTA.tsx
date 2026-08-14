'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export function ServicesCTA() {
  return (
    <section className="section-padding bg-brand-red relative overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-white/60 text-xs tracking-[0.25em] uppercase mb-3">
              Ready to Ship?
            </p>
            <h2 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] uppercase text-white leading-[0.95]">
              Get a Freight Quote<br />
            </h2>
            <p className="text-white/70 mt-3 max-w-lg leading-relaxed">
              Tell us your cargo details and our logistics experts will send you a competitive, detailed quote — no obligation.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 shrink-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-white text-brand-red font-display font-bold tracking-wider uppercase text-sm px-8 py-4 hover:bg-white/90 transition-colors"
            >
              Request a Quote <ArrowRight size={16} />
            </Link>
            <a
              href="tel:+917600951298"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-display font-bold tracking-wider uppercase text-sm px-8 py-4 hover:bg-white/10 transition-colors"
            >
              <Phone size={15} /> Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
