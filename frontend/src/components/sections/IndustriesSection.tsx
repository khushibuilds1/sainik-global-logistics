'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Pill, Car, Cpu, Wheat, Gem, Shirt, Factory } from 'lucide-react'

const industries = [
  { icon: Cpu, title: 'Electronics & Tech', text: 'ESD-safe handling, express routing, and insurance for high-value electronics.' },
  { icon: Pill, title: 'Pharma & Healthcare', text: 'GDP-compliant cold chain, WHO documentation, and controlled substance expertise.' },
  { icon: Car, title: 'Automotive', text: 'JIT delivery, bulk CKD/SKD handling, and OEM supply chain integration.' },
  { icon: Zap, title: 'Energy & Industrial', text: 'ODC cargo specialists for turbines, transformers, and heavy equipment.' },
  { icon: Wheat, title: 'Agri & Commodities', text: 'Temperature-controlled reefer containers and phytosanitary compliance.' },
  { icon: Gem, title: 'Gems & Jewellery', text: 'Insured door-to-door for precious stones and high-value shipments.' },
  { icon: Shirt, title: 'Textiles & Apparel', text: 'Gujarat\'s textile trade specialists with Surat and Ahmedabad expertise.' },
  { icon: Factory, title: 'Chemical & Industrial', text: 'HAZMAT certified handling, MSDS documentation, and safe stowage.' },
]

export function IndustriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.p className="eyebrow mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Industries We Serve
          </motion.p>
          <motion.h2
            className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Deep Sector<br /><span className="text-brand-red">Expertise</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              className="card-dark p-6 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Hover background */}
              <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 border border-brand-red/20 group-hover:border-brand-red/50 flex items-center justify-center mb-4 transition-colors">
                  <ind.icon size={20} className="text-brand-red" />
                </div>
                <h3 className="font-display font-bold text-white uppercase tracking-wide mb-2 group-hover:text-brand-red transition-colors">
                  {ind.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{ind.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
