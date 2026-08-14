import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '404 — Page Not Found' }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-brand-red/6 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6">
        <p className="font-mono text-brand-red text-xs tracking-[0.3em] uppercase mb-6">Error 404</p>
        <h1 className="font-display font-black text-[clamp(5rem,20vw,14rem)] leading-none text-white/5 select-none mb-0">
          404
        </h1>
        <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] uppercase text-white -mt-8 mb-4">
          Page Not <span className="text-brand-red">Found</span>
        </h2>
        <p className="text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for has been moved, deleted, or never existed. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
