'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Sainik Global handled our entire pharmaceutical shipment — cold chain, documentation, customs — without a single hiccup. Their customs team is the best I've worked with.",
    author: 'Rajiv Mehta',
    role: 'Supply Chain Director',
    company: 'Sunrise Pharma Ltd.',
    location: 'Ahmedabad',
  },
  {
    quote: "We moved over 200 containers last year through Sainik Global. The real-time tracking and dedicated account manager made it feel like an in-house team.",
    author: 'Priya Nair',
    role: 'Head of Procurement',
    company: 'TechFab Industries',
    location: 'Surat',
  },
  {
    quote: "The gems and jewellery shipments to Dubai and Hong Kong were handled with extreme care and all documentation was spotless. Will continue our partnership.",
    author: 'Amit Shah',
    role: 'Export Manager',
    company: 'Shree Gems International',
    location: 'Surat',
  },
  {
    quote: "Outstanding customs clearance at Mundra Port. What used to take 5 days now takes 2. Their EXIM compliance team knows exactly what they're doing.",
    author: 'Deepak Patel',
    role: 'Operations Head',
    company: 'Agro Exports Pvt. Ltd.',
    location: 'Rajkot',
  },
]

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={ref} className="section-padding bg-brand-dark-2 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-brand-red/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.p className="eyebrow mb-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Client Testimonials
          </motion.p>
          <motion.h2
            className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] uppercase text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            Trusted by<br /><span className="text-brand-red">500+ Businesses</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass border border-white/10 p-8 md:p-12 text-center relative"
            >
              <Quote size={32} className="text-brand-red/30 mx-auto mb-6" />
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic">
                "{testimonials[current].quote}"
              </p>
              <div className="border-t border-white/5 pt-6">
                <p className="font-display font-bold text-white uppercase tracking-wide">
                  {testimonials[current].author}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {testimonials[current].role} · {testimonials[current].company}
                </p>
                <p className="font-mono text-[10px] text-brand-red tracking-widest mt-1 uppercase">
                  {testimonials[current].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${i === current ? 'w-8 h-1 bg-brand-red' : 'w-2 h-1 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
