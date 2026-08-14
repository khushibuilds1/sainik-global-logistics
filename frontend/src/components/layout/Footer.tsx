import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const services = [
  'Sea Freight', 'Air Freight', 'Road Transport',
  'Customs Clearance', 'Import Services', 'Export Services','Shipping Agency', 'Door-to-Door Logistics',
]

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Global Network', href: '/network' },
  { label: 'Request Quote', href: '/quote' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-brand-dark-2 border-t border-white/5">
      {/* Main footer */}
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              {/* <div className="w-10 h-10 border border-brand-red/50 rotate-45 flex items-center justify-center">
                <span className="font-display font-black text-sm text-brand-red -rotate-45">SG</span>
              </div> */}
              <div>
                <p className="font-display font-bold text-white text-lg leading-none tracking-wider uppercase">Sainik Global</p>
                <p className="font-mono text-[9px] text-brand-red tracking-[0.3em] mt-2 uppercase">Logistics</p>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Your trusted partner for global trade. Connecting businesses worldwide through reliable freight, customs, and supply chain excellence.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow mb-5">Services</p>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-red transition-all duration-300" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="eyebrow mb-5">Quick Links</p>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 text-sm hover:text-white transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-brand-red transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-5">Contact Us</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={14} className="text-brand-red mt-1 shrink-0" />
                <div>
                  <p className="text-white/20 text-xs font-mono tracking-wider mb-1">Registered Office</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    E-102, Devsatya Cooperative Housing Society, New CG Road, Chandkheda, Ahmedabad, Gandhinagar, Gujarat — 382424
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin size={14} className="text-brand-red mt-1 shrink-0" />
                <div>
                  <p className="text-white/20 text-xs font-mono tracking-wider mb-1">Corporate Office</p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    602, 6th Floor, Mangal Murti Complex, Opp. City Gold Theatre, Nr. Shiv Cinema, Ashram Road, Ahmedabad — 380009
                  </p>
                </div>
              </div>
              <a href="mailto:sales@sainikglobal.com" className="flex items-center gap-3 group">
                <Mail size={14} className="text-brand-red shrink-0" />
                <span className="text-white/50 text-sm group-hover:text-white transition-colors">sales@sainikglobal.com</span>
              </a>
              <a href="tel:+917600951298" className="flex items-center gap-3 group">
                <Phone size={14} className="text-brand-red shrink-0" />
                <span className="text-white/50 text-sm group-hover:text-white transition-colors">+91 7600951298</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col  items-center">
          <p className="font-mono text-xs text-white/20">
            © {new Date().getFullYear()} Sainik Global Logistics Private Limited. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-mono text-xs text-white/20 hover:text-white/50 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="font-mono text-xs text-white/20 hover:text-white/50 transition-colors">Terms of Service</Link>
            <p className="font-mono text-xs text-white/20">GSTIN: 24ABTCS1582J1ZT</p>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
