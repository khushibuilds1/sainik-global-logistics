'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Ship, Plane, Truck, Package, Anchor } from 'lucide-react'
import { gsap } from 'gsap'

export function HeroSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    gsap.to(gridRef.current, {
      backgroundPositionY: '60px',
      duration: 20,
      repeat: -1,
      ease: 'none',
    })

    if (!orbitRef.current) return
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark">
      {/* Animated grid background */}
      <div ref={gridRef} className="absolute inset-0 grid-bg opacity-60" />

      {/* Red accent corner */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-brand-red/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-brand-red/8 via-transparent to-transparent pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
      </div>

      <div className="container-custom relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left — headline */}
          <div>
            <motion.p
              className="eyebrow flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <span className="w-8 h-px bg-brand-red" />
              Sainik Global Logistics 
              <span className="w-8 h-px bg-brand-red" />
            </motion.p>

            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight uppercase text-white"
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                Global
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                className="font-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight uppercase text-brand-red"
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              >
                Freight
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                className="font-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight uppercase text-white"
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Solutions.
              </motion.h1>
            </div>

            <motion.p
              className="text-white/55 text-lg leading-relaxed max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              From ocean freight to air cargo, road transport to customs brokerage — we deliver your goods across 120+ countries with reliability, speed, and complete transparency. Your global logistics partner, 24/7.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <Link href="/quote" className="btn-primary group">
                Get Instant Quote
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline group">
                Contact Us
              </Link>
            </motion.div>

          </div>

          {/* Right — Logistics Visual */}
          <div className="relative hidden lg:flex items-center justify-center h-[600px]">
            {/* Animated orbit ring */}
            <div ref={orbitRef} className="absolute w-[500px] h-[500px]">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
              {/* Mid ring */}
              <div className="absolute inset-[60px] rounded-full border border-dashed border-brand-red/15" />
              {/* Inner ring */}
              <div className="absolute inset-[130px] rounded-full border border-white/[0.06]" />

              {/* Orbiting icons */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-dark-2 border border-brand-red/30 flex items-center justify-center shadow-[0_0_30px_rgba(240,6,79,0.15)]">
                  <Plane size={22} className="text-brand-red" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-dark-2 border border-brand-red/30 flex items-center justify-center shadow-[0_0_30px_rgba(240,6,79,0.15)]">
                  <Ship size={22} className="text-brand-red" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-dark-2 border border-brand-red/30 flex items-center justify-center shadow-[0_0_30px_rgba(240,6,79,0.15)]">
                  <Truck size={22} className="text-brand-red" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                <div className="w-14 h-14 rounded-full bg-brand-dark-2 border border-brand-red/30 flex items-center justify-center shadow-[0_0_30px_rgba(240,6,79,0.15)]">
                  <Anchor size={22} className="text-brand-red" />
                </div>
              </motion.div>
            </div>

            {/* Center Globe */}
            <motion.div
              className="relative z-10 w-72 h-72 rounded-full bg-gradient-to-br from-brand-dark-2 via-brand-dark to-brand-dark-2 border border-brand-red/40 flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(240,6,79,0.2),inset_0_0_40px_rgba(0,0,0,0.5)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {/* Globe grid pattern */}
              <div className="absolute inset-0 rounded-full opacity-30">
                <div className="absolute top-1/2 left-0 w-full h-px bg-brand-red/40" />
                <div className="absolute top-1/4 left-0 w-full h-px bg-white/10" />
                <div className="absolute top-3/4 left-0 w-full h-px bg-white/10" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-brand-red/30" />
                <div className="absolute top-0 left-1/4 w-px h-full bg-white/10" />
                <div className="absolute top-0 left-3/4 w-px h-full bg-white/10" />
              </div>

              {/* Logo and Text */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                

                {/* Brand text */}
                <div className="text-center">
                  <p className="font-display font-black text-5xl text-white tracking-wider">SAINIK</p>
                  <p className="font-mono text-[13px] text-brand-red tracking-[0.3em] mt-0.2">GLOBAL LOGISTICS</p>
                </div>
              </div>

              {/* Rotating inner ring */}
              <div className="absolute inset-4 rounded-full border border-brand-red/20" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-8 rounded-full border border-white/5" style={{ animation: 'spin 15s linear infinite reverse' }} />
              <div className="absolute inset-12 rounded-full border border-brand-red/10" style={{ animation: 'spin 25s linear infinite' }} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6 }}
      >
        <span className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase">Explore Below</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} className="text-brand-red" />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
