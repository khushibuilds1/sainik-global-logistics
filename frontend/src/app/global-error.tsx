'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-brand-dark text-white min-h-screen flex items-center justify-center font-body">
        <div className="text-center px-6">
          <p className="font-mono text-brand-red text-xs tracking-[0.3em] uppercase mb-4">Unexpected Error</p>
          <h2 className="font-display font-black text-5xl uppercase text-white mb-4">
            Something Went <span className="text-brand-red">Wrong</span>
          </h2>
          <p className="text-white/40 max-w-sm mx-auto mb-8">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={reset}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
