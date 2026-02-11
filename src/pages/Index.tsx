import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import EventsSection from "@/components/home/EventsSection";
import SocialFeedSection from "@/components/home/SocialFeedSection";
import MembersHighlightSection from "@/components/home/MembersHighlightSection";
import SponsorsSection from "@/components/home/SponsorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <EventsSection />
      <SocialFeedSection />
      <MembersHighlightSection />
      <SponsorsSection />
      <Footer />
    </div>
  );
};

export default Index;
