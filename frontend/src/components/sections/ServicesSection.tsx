'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Ship, Plane, Truck, FileCheck, Package, Globe, Warehouse, Anchor, ArrowRight, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'sea-freight',
    icon: Ship,
    title: 'Sea Freight',
    description: 'Full container load (FCL) and less-than-container-load (LCL) shipping solutions for global cargo movement.',
    tags: ['FCL', 'LCL', 'RoRo'],
  },
  {
    id: 'air-freight',
    icon: Plane,
    title: 'Air Freight',
    description: 'Time-critical air cargo services with direct and consolidated options to 200+ global destinations.',
    tags: ['Express', 'Charter', 'General'],
  },
  {
    id: 'road-transport',
    icon: Truck,
    title: 'Road Transport',
    description: 'Domestic and cross-border trucking with real-time tracking and guaranteed delivery timelines.',
    tags: ['FTL', 'LTL', 'Multimodal'],
  },
  {
    id: 'customs',
    icon: FileCheck,
    title: 'Customs Clearance',
    description: 'End-to-end customs documentation, tariff classification, and compliance management at all major ports.',
    tags: ['Import', 'Export', 'Compliance'],
  },
  {
    id: 'import',
    icon: Package,
    title: 'Import Services',
    description: 'Seamless import handling from purchase order to final delivery, including duty management.',
    tags: ['CIF', 'CIP', 'DAP'],
  },
  {
    id: 'export',
    icon: Globe,
    title: 'Export Services',
    description: 'Complete export management with documentation, letter of credit, and cargo insurance support.',
    tags: ['FOB', 'CFR', 'EXW'],
  },

  {
    id: 'shipping-agency',
    icon: Anchor,
    title: 'Shipping Agency',
    description: 'Port agency services, vessel coordination, husbanding, and stevedoring at major Indian ports.',
    tags: ['Port', 'Husbanding', 'NVOCC'],
  },
  {
    id: 'door-to-door',
    icon: ArrowRight,
    title: 'Door-to-Door',
    description: 'Complete origin-to-destination logistics with single point of contact and full visibility.',
    tags: ['DDP', 'DDU', 'Integrated'],
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} id="services" className="section-padding bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              className="eyebrow mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              What We Do
            </motion.p>
            <motion.h2
              className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.95] text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Logistics Built for<br />
              <span className="text-brand-red">Every Trade Lane</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link href="/services" className="btn-outline text-sm">
              View All Services <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card-dark p-6 group cursor-pointer flex flex-col h-full border border-white/5 hover:border-brand-red/50 transition-all duration-300 bg-gradient-to-br from-white/2 to-transparent hover:from-brand-red/5 hover:to-transparent"
            >
              <div className="w-14 h-14 border border-brand-red/30 flex items-center justify-center mb-6 group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-300 rounded-lg">
                <service.icon size={24} className="text-brand-red group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-3 uppercase tracking-wide group-hover:text-brand-red transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4 flex-grow group-hover:text-white/70 transition-colors">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.tags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] text-white/40 border border-white/15 px-2.5 py-1 tracking-widest uppercase rounded hover:border-brand-red/50 hover:text-brand-red/80 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
