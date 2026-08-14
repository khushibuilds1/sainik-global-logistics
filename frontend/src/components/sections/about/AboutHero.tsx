'use client'

import { motion } from 'framer-motion'

export function AboutHero() {
  return (
    <section className="relative pt-10 pb-16 md:pt-28 md:pb-28 bg-brand-dark overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Subtle red glow */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full" />

      <div className="container-custom relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div>

            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.p>

            {/* Main heading */}
            <motion.h1
              className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.88] tracking-tight text-white"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Built on Trust,
              <br />

              <span className="text-brand-red">
                Driven by Precision
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/50 max-w-xl mt-7 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
              }}
            >
              Since 2009, Sainik Global Logistics has been helping businesses
              move goods across borders with reliable freight forwarding,
              customs coordination, and end-to-end logistics solutions.
            </motion.p>

          </div>

          {/* =====================================================
              RIGHT SIDE — SIMPLE GLOBAL MOVEMENT
          ====================================================== */}

          <motion.div
            className="relative hidden lg:flex h-[420px] items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >

            {/* Large SGL typography */}
            <motion.div
              className="absolute select-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
              }}
            >

              <p className="font-display font-black text-[190px] leading-none tracking-[-0.08em] text-white/[0.035]">
                SGL
              </p>

            </motion.div>

            {/* Main horizontal route */}
            <div className="absolute left-8 right-8 top-1/2">

              {/* Background line */}
              <div className="h-px w-full bg-white/10" />

              {/* Animated red line */}
              <motion.div
                className="absolute left-0 top-0 h-px bg-brand-red"
                initial={{ width: 0 }}
                animate={{ width: '72%' }}
                transition={{
                  duration: 1.8,
                  delay: 0.6,
                  ease: 'easeOut',
                }}
              />

            </div>

            {/* =================================================
                ORIGIN
            ================================================= */}

            <motion.div
              className="absolute left-8 top-[calc(50%-8px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >

              <div className="relative">

                <div className="w-4 h-4 border border-brand-red rounded-full bg-brand-dark flex items-center justify-center">

                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />

                </div>

              </div>

              <div className="absolute top-7 left-0 whitespace-nowrap">

                <p className="text-[9px] text-brand-red uppercase tracking-[0.25em]">
                  Origin
                </p>

                <p className="text-white/50 text-xs uppercase tracking-wide mt-1">
                  India
                </p>

              </div>

            </motion.div>

            {/* =================================================
                MIDDLE POINT
            ================================================= */}

            <motion.div
              className="absolute left-[48%] top-[calc(50%-4px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >

              <div className="w-2 h-2 rounded-full bg-white/30" />

              <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">

                <p className="text-[8px] text-white/25 uppercase tracking-[0.2em]">
                  Connect
                </p>

              </div>

            </motion.div>

            {/* =================================================
                DESTINATION
            ================================================= */}

            <motion.div
              className="absolute right-[20%] top-[calc(50%-8px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >

              <motion.div
                className="w-4 h-4 border border-brand-red rounded-full bg-brand-dark flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(240,6,79,0)',
                    '0 0 18px rgba(240,6,79,0.4)',
                    '0 0 0px rgba(240,6,79,0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >

                <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />

              </motion.div>

              <div className="absolute top-7 left-0 whitespace-nowrap">

                <p className="text-[9px] text-brand-red uppercase tracking-[0.25em]">
                  Destination
                </p>

                <p className="text-white/50 text-xs uppercase tracking-wide mt-1">
                  Worldwide
                </p>

              </div>

            </motion.div>

            {/* =================================================
                LARGE CENTER TEXT
            ================================================= */}

            <motion.div
              className="absolute left-1/2 top-[34%] -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
              }}
            >

              <p className="font-display font-bold text-white text-xl uppercase tracking-[0.15em]">
                Moving Forward
              </p>

              <p className="text-white/25 text-[9px] uppercase tracking-[0.35em] mt-2">
                Across Borders
              </p>

            </motion.div>

            {/* =================================================
                SMALL BOTTOM LABEL
            ================================================= */}

            <motion.div
              className="absolute bottom-8 right-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >

              <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
                GLOBAL LOGISTICS
              </p>

            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}