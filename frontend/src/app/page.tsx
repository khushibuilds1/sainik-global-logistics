import { HeroSection } from '@/components/sections/HeroSection'
import { AboutPreview } from '@/components/sections/AboutPreview'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { GlobalNetwork } from '@/components/sections/GlobalNetwork'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { QuoteSection } from '@/components/sections/QuoteSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <StatsSection />
      <GlobalNetwork />
      <WhyChooseUs />
      <TestimonialsSection />
      <QuoteSection />
    </>
  )
}
