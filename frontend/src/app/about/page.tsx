import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { MissionVision } from '@/components/sections/about/MissionVision'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Sainik Global Logistics — our story, mission, and values.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
    </>
  )
}
