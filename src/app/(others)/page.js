import HeroSection from '@/components/heroSection'
import FeatureSection from '@/components/featureSection'
import AppDemo from '@/components/appDemo'
import CTA from '@/components/CTA'
import ImageRow from '@/components/library';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex items-center bg-[#14091c] justify-center gap-x-6">
        <a
          href="/"
          className="text-base font-bold accent-jukeboxd">
          Create a new account <span aria-hidden="true">→</span>
        </a>
      </div>
      <AppDemo />
      <ImageRow />
      <FeatureSection />
      <CTA />
    </main>
  )
}
