'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Ship, Plane, Truck, BarChart3 } from 'lucide-react'

const stats = [
  {
    icon: Ship,
    value: '1000+',
    label: 'Weekly Sea Shipments',
    description: 'FCL & LCL across major trade routes'
  },
  {
    icon: Plane,
    value: '500+',
    label: 'Monthly Air Shipments',
    description: 'Direct & consolidated services'
  },
  {
    icon: Truck,
    value: '2000+',
    label: 'Land Movements',
    description: 'Domestic & cross-border'
  },
  {
    icon: BarChart3,
    value: '10M+',
    label: 'Tons Moved Annually',
    description: 'Across all modes'
  },
]

export function NetworkStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">By The Numbers</p>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.95] text-white">
            Network<br />
            <span className="text-brand-red">Performance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="card-dark p-8 border border-white/5 hover:border-brand-red/50 transition-all duration-300 group bg-gradient-to-br from-white/2 to-transparent hover:from-brand-red/5 hover:to-transparent flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 border border-brand-red/30 flex items-center justify-center mb-6 group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-300 rounded-lg">
                <stat.icon size={24} className="text-brand-red group-hover:scale-110 transition-transform" />
              </div>
              <p className="font-display font-black text-3xl text-white mb-2 group-hover:text-brand-red transition-colors">
                {stat.value}
              </p>
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide mb-2 group-hover:text-brand-red transition-colors">
                {stat.label}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors flex-grow">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
