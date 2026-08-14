export function ClientsMarquee() {
  const clients = [
    'MAERSK', 'MSC', 'CMA CGM', 'EVERGREEN', 'HAPAG-LLOYD',
    'ONE LINE', 'COSCO', 'YANG MING', 'PIL', 'ZIM',
    'AIR INDIA CARGO', 'EMIRATES SKY CARGO', 'QATAR CARGO',
  ]

  return (
    <div className="bg-brand-dark-2 border-y border-white/5 py-4 overflow-hidden">
      <div className="flex">
        {/* Two identical runs, each 100% wide — CSS animates -50% so the seam is invisible */}
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap shrink-0 pr-12">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="font-display font-bold text-white/15 text-sm tracking-[0.2em] uppercase">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
