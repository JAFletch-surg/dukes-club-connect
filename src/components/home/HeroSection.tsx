import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
        <p className="text-gold font-mono text-sm tracking-widest uppercase mb-4 animate-fade-in">
          The UK Colorectal Trainee Society
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
          Dukes<span className="text-gold">'</span> Club
        </h1>
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
