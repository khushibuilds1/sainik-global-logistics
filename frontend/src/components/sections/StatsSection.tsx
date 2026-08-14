'use client'

import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const stats = [
  { value: 120, suffix: '+', label: 'Countries Served', description: 'Global reach across 6 continents' },
  { value: 20000, suffix: '+', label: 'Shipments Delivered', description: 'Successful consignments worldwide' },
  { value: 300, suffix: '+', label: 'Business Clients', description: 'Trusted by industry leaders' },
  { value: 15, suffix: '+', label: 'Years Experience', description: 'Decade-long market presence' },
]

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-24 bg-brand-red overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] text-white leading-none mb-2">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    delay={i * 0.2}
                  />
                )}
              </div>
              <p className="font-display font-bold text-white text-lg mb-1 uppercase tracking-wider">{stat.label}</p>
              <p className="font-body text-white/70 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
