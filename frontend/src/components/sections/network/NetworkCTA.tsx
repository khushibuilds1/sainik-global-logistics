'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function NetworkCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="section-padding bg-brand-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-brand-red/5 blur-[100px] rounded-full -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[1] text-white mb-6">
            Ready to Ship<br />
            <span className="text-brand-red">Anywhere in the World?</span>
          </h2>

          <motion.p
            className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Connect with our team to explore shipping solutions to your destination, no matter how remote or complex your logistics challenge.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link href="/contact" className="btn-red group">
              Get a Quote
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn-outline text-sm">
              View Services <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
