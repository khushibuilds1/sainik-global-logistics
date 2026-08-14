import type { Metadata } from 'next'
import { QuoteSection } from '@/components/sections/QuoteSection'
import { QuotePageHero } from '@/components/sections/quote/QuotePageHero'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Get a competitive freight quote from Sainik Global Logistics within 2 hours. Sea, air, road, customs — all covered.',
}

export default function QuotePage() {
  return (
    <>
      <QuotePageHero />
      <QuoteSection />
    </>
  )
}
