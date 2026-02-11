import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logoWhite from "@/assets/logo-white.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      {/* Animated gradient sweep */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/60" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <img src={logoWhite} alt="The Dukes' Club" className="h-20 md:h-28 mx-auto mb-6" />
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-10 font-sans">
          Advancing colorectal surgical training through education, collaboration, and excellence since founding.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/join">
            <Button variant="gold" size="lg" className="text-base px-8">
              Become a Member <ArrowRight className="ml-1" size={18} />
            </Button>
          </Link>
          <Link to="/events">
            <Button variant="hero" size="lg" className="text-base px-8">
              Upcoming Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
