import HeroSection from '../components/heroSection'
import FeatureSection from '../components/featureSection'
import AppDemo from '../components/appDemo'
import CTA from '../components/CTA'
import Footer from '../components/footer'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AppDemo />
      <FeatureSection />
      <CTA />
      <Footer />
    </main>
  )
}
