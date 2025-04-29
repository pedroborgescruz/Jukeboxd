import HeroSection from '../components/heroSection'
import FeatureSection from '../components/featureSection'
import AppDemo from '../components/appDemo'
import CTA from '../components/CTA'
import ImageRow from '../components/library';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AppDemo />
      <ImageRow />
      <FeatureSection />
      <CTA />
    </main>
  )
}
