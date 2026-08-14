import type { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/services/ServicesHero'
import { ServicesDetail } from '@/components/sections/services/ServicesDetail'
import { ServicesCTA } from '@/components/sections/services/ServicesCTA'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Complete logistics services — sea freight, air freight, road transport, customs clearance, warehousing, and supply chain solutions.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesDetail />
      <ServicesCTA />
    </>
  )
}
