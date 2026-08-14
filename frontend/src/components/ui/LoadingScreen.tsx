'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)

          setTimeout(() => {
            setLoading(false)
          }, 500)

          return 100
        }

        return Math.min(p + Math.random() * 10, 100)
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: {
              duration: 0.6,
              ease: 'easeInOut',
            },
          }}
          className="fixed inset-0 z-[9999] bg-brand-dark flex items-center justify-center overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[350px] h-[350px] rounded-full bg-brand-red/5 blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
            className="relative flex flex-col items-center"
          >
            {/* Logo container */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
              }}
              className="relative"
            >
              {/* Soft animated border */}
              <motion.div
                animate={{
                  opacity: [0.25, 0.6, 0.25],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 rounded-full border border-brand-red/30"
              />

              {/* Logo */}
              <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-2xl">
                <img
                  src="/Sainik Logo.jpg"
                  alt="Sainik Global Logistics"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Company name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
              className="text-center mt-7"
            >
              <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.16em] text-white uppercase">
                Sainik Global
              </h1>

              <p className="font-mono text-xs text-brand-red tracking-[0.35em] mt-2 uppercase">
                Logistics
              </p>
            </motion.div>

            {/* Loading area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 w-64"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                  Preparing
                </span>

                <span className="font-mono text-[10px] text-brand-red">
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-brand-red"
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.15,
                    ease: 'easeOut',
                  }}
                />

                {/* Small moving highlight */}
                <motion.div
                  animate={{
                    x: ['-100%', '500%'],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute top-0 left-0 h-full w-16 bg-white/30"
                />
              </div>
            </motion.div>

            {/* Small bottom label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-5 text-[9px] font-mono tracking-[0.25em] text-white/20 uppercase"
            >
              Global Freight Solutions
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 