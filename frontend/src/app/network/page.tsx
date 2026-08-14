import type { Metadata } from 'next'
import { GlobalNetwork } from '@/components/sections/GlobalNetwork'
import { NetworkHero } from '@/components/sections/network/NetworkHero'
import { NetworkStats } from '@/components/sections/network/NetworkStats'
import { NetworkCTA } from '@/components/sections/network/NetworkCTA'

export const metadata: Metadata = {
  title: 'Global Network',
  description: 'Sainik Global Logistics operates across 120+ countries with strategic hubs in South Asia, Middle East, Europe, Americas, and Asia Pacific.',
}

export default function NetworkPage() {
  return (
    <>
      <NetworkHero />
      <NetworkStats />
      <GlobalNetwork />
      <NetworkCTA />
    </>
  )
}
