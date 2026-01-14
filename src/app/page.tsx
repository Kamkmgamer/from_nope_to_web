import { Navbar, Footer } from "~/components/layout";
import {
  HeroSection,
  FeaturesSection,
  CoursesSection,
  CTASection,
} from "~/components/features/landing";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
