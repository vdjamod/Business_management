import Footer from "../Footer";
import Header from "../Header";
import HeroSection from "./HeroSection";
import CallToAction from "./CallToAction";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";

export default function Home() {
  return (
    <div className="home-page overflow-x-hidden bg-gray-100">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Call-to-Action Section */}
      <CallToAction
        title="Ready to Transform Your Business?"
        description="Join businesses who are already using Visionary to streamline their operations."
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
