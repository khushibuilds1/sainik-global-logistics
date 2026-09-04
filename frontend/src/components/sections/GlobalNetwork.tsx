'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const hubs = [
  { name: 'Mumbai', x: '68%', y: '42%', major: true },
  { name: 'Ahmedabad', x: '65%', y: '38%', major: true },
  { name: 'Dubai', x: '59%', y: '36%', major: true },
  { name: 'Singapore', x: '78%', y: '47%', major: true },
  { name: 'Shanghai', x: '82%', y: '33%', major: false },
  { name: 'Hamburg', x: '48%', y: '22%', major: false },
  { name: 'Rotterdam', x: '47%', y: '21%', major: false },
  { name: 'Los Angeles', x: '12%', y: '34%', major: false },
  { name: 'New York', x: '22%', y: '28%', major: false },
  { name: 'Tokyo', x: '86%', y: '30%', major: false },
  { name: 'Sydney', x: '87%', y: '65%', major: false },
  { name: 'Nairobi', x: '57%', y: '50%', major: false },
]

const routes = [
  { x1: '68%', y1: '42%', x2: '59%', y2: '36%' },
  { x1: '59%', y1: '36%', x2: '47%', y2: '21%' },
  { x1: '68%', y1: '42%', x2: '78%', y2: '47%' },
  { x1: '78%', y1: '47%', x2: '82%', y2: '33%' },
  { x1: '59%', y1: '36%', x2: '22%', y2: '28%' },
  { x1: '68%', y1: '42%', x2: '57%', y2: '50%' },
]

export function GlobalNetwork() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="section-padding bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.p className="eyebrow mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Global Presence
          </motion.p>
          <motion.h2
            className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            120+ Countries,<br /><span className="text-brand-red">One Network</span>
          </motion.h2>
        </div>

        {/* Global network image */}
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="relative aspect-[2/1] bg-brand-dark-3 border border-white/5 overflow-hidden">
            <Image
              src="/global-network.jpeg"
              alt="Global logistics network across the world"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />

            {/* Corner labels */}
            <div className="absolute top-3 left-3">
              <span className="font-mono text-[9px] text-white/20 tracking-widest">GLOBAL NETWORK</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="font-mono text-[9px] text-white/20 tracking-widest">120+ COUNTRIES</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
