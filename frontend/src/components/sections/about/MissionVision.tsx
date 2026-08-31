'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Target,
  Eye,
  Heart,
  Pill,
  Factory,
  Car,
  Ship,
  Wrench,
  Package,
  ArrowUpRight,
} from 'lucide-react'

/* ============================================================
   MISSION / VISION / VALUES
============================================================ */

const foundationItems = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To simplify global trade for Indian businesses through transparent, reliable, and technology-driven logistics solutions.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To become a trusted logistics partner for businesses looking for dependable freight forwarding and strategic supply chain support.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    text: 'Integrity in every quote. Accountability for every shipment. Precision in every document. Pride in every delivery.',
  },
]

/* ============================================================
   INDUSTRY EXPERTISE
============================================================ */

const expertiseItems = [
  {
    number: '01',
    icon: Pill,
    title: 'Pharmaceutical Logistics',
    category: 'Healthcare & Life Sciences',
    accent: 'from-emerald-500/[0.07]',
    text: 'End-to-end temperature-controlled freight solutions ensuring full regulatory compliance. We manage DG-classified shipments and non-DG cargo with equal precision, maintaining product integrity from origin to destination — every degree, every mile.',
    tags: [
      'DG Cargo',
      'Cold Chain',
      'Temp-Controlled',
      'Compliance',
    ],
  },

  {
    number: '02',
    icon: Factory,
    title: 'Dairy Machinery',
    category: 'Industrial Equipment',
    accent: 'from-blue-500/[0.07]',
    text: 'Specialists in the movement of large-scale dairy processing equipment. From 2,000-litre silos to unlimited-capacity storage tanks, we handle the full spectrum — delivering heavy industrial assets safely, on time, and without compromise.',
    tags: [
      'Silos & Tanks',
      '2K–Unlimited Litres',
      'Heavy Equipment',
    ],
  },

  {
    number: '03',
    icon: Car,
    title: 'Automotive Components',
    category: 'Automotive Industry',
    accent: 'from-amber-500/[0.07]',
    text: 'Trusted logistics partner for the automotive sector, handling forged components and critical spare parts with speed and reliability. We understand the tight tolerances of automotive supply chains and deliver accordingly — zero delays, zero damage.',
    tags: [
      'Forge Parts',
      'Auto Spares',
      'Supply Chain',
    ],
  },

  {
    number: '04',
    icon: Ship,
    title: 'Project Cargo',
    category: 'Heavy & Oversized Logistics',
    accent: 'from-violet-500/[0.07]',
    text: 'Masters of complex, oversized, and high-value cargo movement via air and sea. Our dedicated project cargo desk manages every detail — from route surveys and risk assessment to OOG shipments and full charter freighter arrangements. No load is too large, no challenge too complex.',
    tags: [
      'Air & Sea',
      'OOG Cargo',
      'Charter Freighter',
      'Oversized',
    ],
  },

  {
    number: '05',
    icon: Wrench,
    title: 'Ship Breaking Spares',
    category: 'Marine Industry',
    accent: 'from-orange-500/[0.07]',
    text: 'A dominant force in the export of ship breaking spare parts, backed by deep industry relationships and high-volume operational capacity. We move marine dismantling components with documentation expertise and global trade compliance — reliably and at scale.',
    tags: [
      'Ship Spares',
      'High Volume Export',
      'Marine Industry',
    ],
  },

  {
    number: '06',
    icon: Package,
    title: 'Capital Goods',
    category: 'Global Industrial Trade',
    accent: 'from-slate-300/[0.06]',
    text: 'Your single-window solution for importing capital goods from any country in the world. Whether brand new or pre-owned, we manage the entire journey — procurement liaison, customs clearance, freight, and last-mile delivery — so your machinery reaches you without friction.',
    tags: [
      'New & Second Hand',
      'End-to-End Import',
      'Global Sourcing',
      'Customs Clearance',
    ],
  },
]

export function MissionVision() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="section-padding bg-brand-dark-2 relative overflow-hidden"
    >

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[300px] bg-brand-red/5 blur-3xl rounded-full" />

      <div className="container-custom relative z-10">




        {/* =====================================================
            INDUSTRY EXPERTISE
        ====================================================== */}

        <div className="mt-28 md:mt-36">


          {/* =================================================
              HEADER
          ================================================== */}

          <motion.div
            className="mb-20"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
          >

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-[2px] bg-brand-red" />

              <p className="font-mono text-[10px] text-brand-red uppercase tracking-[0.3em]">
                Industry Expertise
              </p>

            </div>


            <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8 items-end">

              <h2 className="font-display font-black text-white text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.88] tracking-[-0.03em]">

                Specialized
                <br />

                <span className="text-brand-red">
                  Where It Matters
                </span>

              </h2>
            </div>

          </motion.div>


          {/* =================================================
              EXPERTISE ITEMS
          ================================================== */}

          <div className="relative">


            {/* Main timeline */}

            <div className="hidden md:block absolute left-[34px] top-0 bottom-0 w-px bg-white/[0.08]" />


            {expertiseItems.map((item, i) => {

              const Icon = item.icon

              return (
                <motion.div
                  key={item.number}
                  className="relative group"
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.1,
                  }}
                >


                  {/* =================================================
                      NUMBER
                  ================================================== */}

                  <div className="hidden md:flex absolute left-0 top-10 w-[69px] justify-center z-20">

                    <div className="relative w-[69px] h-[69px] rounded-full bg-brand-dark-2 border border-white/10 group-hover:border-brand-red/70 transition-all duration-500 flex items-center justify-center">

                      {/* Outer glow */}

                      <div className="absolute inset-[-5px] rounded-full border border-brand-red/0 group-hover:border-brand-red/20 transition-all duration-500" />

                      <span className="font-display font-black text-white/30 group-hover:text-brand-red text-sm transition-colors">

                        {item.number}

                      </span>

                    </div>

                  </div>


                  {/* =================================================
                      MOBILE NUMBER
                  ================================================== */}

                  <div className="md:hidden flex items-center gap-4 mb-6">

                    <span className="font-display font-black text-5xl text-white/10">

                      {item.number}

                    </span>

                    <div className="h-px flex-1 bg-white/10" />

                  </div>


                  {/* =================================================
                      MAIN ROW
                  ================================================== */}

                  <div className="md:ml-[100px] mb-8">

                    <div
                      className={`
                        relative
                        overflow-hidden
                        py-8
                        md:py-10
                        px-5
                        md:px-9
                        bg-gradient-to-r ${item.accent}
                        border-l-2
                        border-transparent
                        group-hover:border-brand-red
                        transition-all
                        duration-500
                      `}
                    >




                      {/* =================================================
                          CONTENT
                      ================================================== */}

                      <div className="relative z-10 grid lg:grid-cols-[0.9fr_1.5fr] gap-8 lg:gap-14">


                        {/* =================================================
                            LEFT
                        ================================================== */}

                        <div>


                          {/* Icon + category connected */}

                          <div className="flex items-center gap-4 mb-6">

                            {/* Icon block */}

                            <div className="relative">

                              <div className="w-14 h-14 rounded-xl border border-brand-red/30 bg-brand-red/[0.06] flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-500">

                                <Icon
                                  size={24}
                                  strokeWidth={1.5}
                                  className="text-brand-red group-hover:scale-110 transition-transform duration-500"
                                />

                              </div>

                              

                              

                            </div>


                            {/* Connected line */}

                            <div className="w-8 h-px bg-brand-red/50" />


                            {/* Category */}

                            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-brand-red/80">

                              {item.category}

                            </span>

                          </div>


                          {/* Title */}

                          <h3 className="font-display font-black text-white text-2xl md:text-3xl lg:text-[2.15rem] uppercase leading-[0.95] tracking-tight group-hover:text-brand-red transition-colors duration-300 max-w-md">

                            {item.title}

                          </h3>

                        </div>


                        {/* =================================================
                            RIGHT
                        ================================================== */}

                        <div>

                          {/* Description */}

                          <p className="text-white/65 text-sm md:text-[15px] leading-7 max-w-2xl group-hover:text-white/80 transition-colors duration-300">

                            {item.text}

                          </p>


                          {/* Tags */}

                          <div className="flex flex-wrap gap-2 mt-7">

                            {item.tags.map((tag) => (

                              <span
                                key={tag}
                                className="px-3.5 py-2 rounded-full bg-white/[0.025] border border-white/10 text-[9px] uppercase tracking-[0.08em] text-white/50 group-hover:border-brand-red/30 group-hover:text-white/70 transition-all duration-300"
                              >

                                {tag}

                              </span>

                            ))}

                          </div>

                        </div>

                      </div>


                    </div>

                  </div>


                  {/* Divider */}

                  {i !== expertiseItems.length - 1 && (

                    <div className="md:ml-[100px] h-px bg-white/[0.04] mb-8" />

                  )}

                </motion.div>
              )
            })}

          </div>

                  {/* =====================================================
            MISSION / VISION / VALUES
            YOUR EXISTING DESIGN
        ====================================================== */}

        <div className="mt-20 md:mt-28 grid md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">

          {foundationItems.map((item, i) => {

            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                className="relative card-dark p-7 md:p-8 border border-white/5 hover:border-brand-red/50 transition-all duration-500 group overflow-hidden"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -6,
                }}
              >

                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">

                  <div className="flex items-center justify-between mb-7">

                    <div className="w-14 h-14 border border-brand-red/30 rounded-lg flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/10 transition-all duration-300">

                      <Icon
                        size={23}
                        className="text-brand-red group-hover:scale-110 transition-transform"
                      />

                    </div>

                  </div>

                  <h3 className="font-display font-bold text-white text-xl uppercase tracking-wide mb-4 group-hover:text-brand-red transition-colors">

                    {item.title}

                  </h3>

                  <div className="w-10 h-[2px] bg-brand-red mb-5 group-hover:w-16 transition-all duration-300" />

                  <p className="text-white/50 text-sm md:text-[15px] leading-7 group-hover:text-white/65 transition-colors">

                    {item.text}

                  </p>

                </div>

              </motion.div>
            )
          })}

        </div>



        
        </div>

      </div>

    </section>
  )
}