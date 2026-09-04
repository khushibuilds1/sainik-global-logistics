'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Clock, Globe, Ship, Plane, Truck, Award, Package } from 'lucide-react'

const pillars = [
  { icon: Shield, title: 'Compliance First', text: 'Certified customs experts ensuring regulatory adherence.' },
  { icon: Clock, title: '24/7 Operations', text: 'Round-the-clock support across every timezone.' },
  { icon: Globe, title: 'Global Reach', text: 'Established agent network across 120+ countries.' },
]

export function AboutPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3]">
              
              <motion.div
                className="absolute top-0 left-0 w-[68%] h-[72%] overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80"
                  alt="Sainik Global Port Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Inner gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-dark/60" />
                {/* Bottom red accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-red via-brand-red to-transparent" />
              </motion.div>

              {/* Top Right Small Image - Air Cargo */}
              <motion.div
                className="absolute top-0 right-0 w-[29%] h-[48%] overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80"
                  alt="Air Freight Services"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark/50" />
                
                {/* <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-brand-red/85 flex items-center justify-center backdrop-blur-sm">
                </div> */}
              </motion.div>

              {/* Bottom Right Small Image - Cargo Truck */}
              <motion.div
                className="absolute bottom-0 right-0 w-[29%] h-[48%] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1618582948377-cd7eb0e8cb14?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Road Transport Services"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-brand-dark/50" />
                {/* Icon overlay */}
                {/* <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                  <Truck size={14} className="text-brand-dark" />
                </div> */}
              </motion.div>

              {/* Bottom Left Small Image - Customs/Warehouse */}
              <motion.div
                className="absolute bottom-0 left-0 w-[68%] h-[25%] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
                  alt="Warehouse Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-brand-dark/30" />
              </motion.div>

              {/* === Overlay Brand Elements === */}

              {/* Center Logo Badge */}
              <motion.div
                className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, rotate: -45 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.7, type: 'spring', stiffness: 120 }}
              >
                {/* <div className="w-20 h-20 rounded-full bg-white border-[3px] border-brand-red shadow-[0_0_40px_rgba(240,6,79,0.6),0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/Sainik Logo.jpg"
                    alt="Sainik Global Logistics"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div> */}
              </motion.div>

              {/* 15+ Years Floating Stat (Bottom Left Area) */}
              <motion.div
                className="absolute bottom-8 left-6 z-10"
                initial={{ opacity: 0, y: 20, x: -20 }}
                animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
               
              </motion.div>

              {/* Services Mini Tag (Top Right Area) */}
              <motion.div
                className="absolute top-6 right-[33%] z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center border-2 border-brand-dark">
                      <Ship size={10} className="text-white" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-brand-dark-2 flex items-center justify-center border-2 border-brand-dark">
                      <Plane size={10} className="text-brand-red" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/95 flex items-center justify-center border-2 border-brand-dark">
                      <Truck size={10} className="text-brand-dark" />
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-white/70 tracking-wider uppercase">
                    Sea · Air · Road
                  </span>
                </div>
              </motion.div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-brand-red/60 z-10" />
              <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-brand-red/60 z-10" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-brand-red/60 z-10" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-brand-red/60 z-10" />

            </div>

            {/* Floating TRUSTED Tag Bottom Right */}
            <motion.div
              className="absolute -bottom-5 -right-5 z-20"
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: 1, duration: 0.5, type: 'spring' }}
            >
              {/* <div className="bg-brand-red shadow-[0_12px_40px_rgba(240,6,79,0.5)] px-6 py-3 flex items-center gap-3">
                <Award size={20} className="text-white shrink-0" />
                <div>
                  <p className="font-display font-black text-white text-sm leading-none tracking-wider">TRUSTED</p>
                  <p className="font-mono text-[8px] text-white/90 tracking-[0.2em] uppercase mt-0.5">Est. 2009 · India</p>
                </div>
              </div> */}
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Who We Are
            </motion.p>
            <motion.h2
              className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              India's Trusted<br />
              <span className="text-brand-red">Logistics Partner</span><br />
              Since 2009
            </motion.h2>
            <motion.p
              className="text-white/50 leading-relaxed mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Sainik Global Logistics Private Limited is a premier freight forwarding and logistics company headquartered in Ahmedabad, Gujarat. We specialize in seamless import-export operations with unmatched customs expertise.
            </motion.p>
            <motion.p
              className="text-white/50 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              From Port of Mundra to JNPT and beyond — our team of certified freight professionals handles every consignment with military-grade precision and transparency.
            </motion.p>

            {/* Pillars */}
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="w-8 h-8 border border-brand-red/30 flex items-center justify-center shrink-0 mt-0.5">
                    <p.icon size={14} className="text-brand-red" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white uppercase tracking-wide text-sm">{p.title}</p>
                    <p className="text-white/40 text-sm">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              <Link href="/about" className="btn-primary">
                Learn Our Story <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
