import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import DestinationsSection from '@/components/DestinationsSection';
import MapSection from '@/components/MapSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DestinationsSection />
      <MapSection />
      <ContactSection />
    </>
  );
}
