import HeroSection from '../components/heroSection'
import FeatureSection from '../components/featureSection'
import AppDemo from '../components/appDemo'
import CTA from '../components/CTA'
import Footer from '../components/footer'
import ImageRow from '../components/library';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImageRow />
      <AppDemo />
      <FeatureSection />
      <CTA />
      <Footer />
    </main>
  )
}
