import type { Metadata } from 'next'
import { ContactPage as ContactPageComponent } from '@/components/sections/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Sainik Global Logistics. Our team is available 24/7 for your logistics needs.',
}

export default function ContactPage() {
  return <ContactPageComponent />
}
