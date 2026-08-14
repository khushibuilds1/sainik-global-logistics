'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Ship, Plane, Truck, FileCheck, Package, Globe, Warehouse, Anchor, ArrowRight, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const serviceDetails = [
  {
    id: 'sea-freight', icon: Ship, title: 'Sea Freight',
    description: 'Comprehensive ocean freight solutions for FCL (Full Container Load) and LCL (Less than Container Load) shipments. We work with all major shipping lines — Maersk, MSC, CMA CGM, Evergreen, Hapag-Lloyd — offering competitive rates and priority allocation.',
    features: ['FCL & LCL Solutions', 'Major Port Coverage', 'Reefer & Special Cargo', 'Dangerous Goods Certified', 'Real-time Tracking', 'Pre-shipment Inspection'],
  },
  {
    id: 'air-freight', icon: Plane, title: 'Air Freight',
    description: 'Time-critical and high-value cargo handled with precision. We offer general cargo, express, and charter air freight services via Air India Cargo, Emirates, Qatar Airways Cargo, and all major airlines.',
    features: ['General & Express Air', 'Charter Services', 'Perishables & Cold Chain', 'High-Value Cargo', 'IATA Compliant', '200+ Destinations'],
  },
  {
    id: 'road-transport', icon: Truck, title: 'Road Transport',
    description: 'FTL and LTL road freight across India with GPS-tracked vehicles. Cross-border trucking to Nepal, Bangladesh, and Bhutan via our bonded carrier network.',
    features: ['FTL / LTL Services', 'GPS Tracked Fleet', 'Pan-India Coverage', 'Cross-border Trucking', 'ODC / Heavy Cargo', 'Multimodal Integration'],
  },
  {
    id: 'customs', icon: FileCheck, title: 'Customs Clearance',
    description: 'Licensed Customs House Agent (CHA) services at all major Indian ports and ICDs. Our experts handle HS classification, duty optimization, and complete documentation compliance.',
    features: ['Import & Export Clearance', 'Duty Drawback', 'HS Classification', 'DGFT / IEC Compliance', 'SVB / EOC Handling', 'AEO Facilitation'],
  },
  {
    id: 'import', icon: Package, title: 'Import Services',
    description: 'End-to-end import management from origin consolidation to inland delivery. We manage LC documentation, bill of entry, and coordinate with port, customs, and transport.',
    features: ['LC Documentation', 'Bill of Entry Filing', 'Port Clearance', 'Duty Management', 'Post-clearance Audit', 'ITC-HS Classification'],
  },
  {
    id: 'export', icon: Globe, title: 'Export Services',
    description: 'Complete export documentation and freight services including shipping bills, certificates of origin, fumigation, pre-shipment inspection, and cargo booking.',
    features: ['Shipping Bill Filing', 'Certificate of Origin', 'Fumigation & Phyto', 'RODTEP / MEIS Benefits', 'LC Negotiation Support', 'Export Insurance'],
  },
  {
    id: 'shipping-agency', icon: Anchor, title: 'Shipping Agency',
    description: 'Vessel agency, husbanding, and NVOCC services at key Indian ports. We coordinate with port authorities, stevedores, and shipping lines for vessel calls.',
    features: ['Port Agency', 'Husbanding Services', 'NVOCC Operations', 'Stevedoring Coordination', 'Bunker Arrangements', 'Crew Services'],
  },
  {
    id: 'door-to-door', icon: ArrowRight, title: 'Door-to-Door Logistics',
    description: 'Fully integrated origin-to-destination logistics with a single point of contact. We manage pickup, export documentation, freight, customs at destination, and last-mile delivery.',
    features: ['Single Contact Point', 'End-to-End Visibility', 'DDP / DAP / DDU Terms', 'Multi-Modal Options', 'Full Cargo Insurance', 'SLA-Bound Service'],
  },
  {
    id: 'supply-chain', icon: BarChart3, title: 'Supply Chain Solutions',
    description: 'Strategic supply chain consulting and 4PL management. We design, optimize, and run supply chains for complex multi-origin, multi-destination enterprises.',
    features: ['4PL Management', 'Vendor Management', 'JIT Logistics', 'Inventory Optimization', 'Demand Planning', 'Supply Chain Analytics'],
  },
]

export function ServicesDetail() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  return (
    <section ref={ref} className="section-padding bg-brand-dark-2">
      <div className="container-custom space-y-6">
        {serviceDetails.map((service, i) => (
          <motion.div
            key={service.id}
            id={service.id}
            className="card-dark p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.05 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 border border-brand-red/30 flex items-center justify-center">
                    <service.icon size={18} className="text-brand-red" />
                  </div>
                  <h2 className="font-display font-bold text-white text-2xl uppercase tracking-wide">{service.title}</h2>
                </div>
                <p className="text-white/50 leading-relaxed mb-6">{service.description}</p>
                <Link href="/quote" className="btn-primary py-2.5 text-xs inline-flex">
                  Get Quote for {service.title}
                </Link>
              </div>
              <div>
                <p className="eyebrow mb-3">Key Features</p>
                <ul className="space-y-2">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-white/50 text-sm">
                      <span className="w-1 h-1 bg-brand-red rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
