import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logoHero from "@/assets/logo-hero.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for video metadata to load
    const onMetadataLoaded = () => {
      const handleScroll = () => {
        if (!sectionRef.current || !video) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        // Progress: 0 at top of section, 1 when section scrolled past
        const scrollProgress = Math.min(
          Math.max(-rect.top / (sectionHeight * 0.8), 0),
          1
        );

        // Scrub video based on scroll
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = scrollProgress * video.duration;
        }

        // Parallax on content: moves up slower
        if (contentRef.current) {
          const yOffset = scrollProgress * 120;
          const opacity = 1 - scrollProgress * 1.5;
          contentRef.current.style.transform = `translateY(-${yOffset}px)`;
          contentRef.current.style.opacity = `${Math.max(opacity, 0)}`;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll(); // initial
      return () => window.removeEventListener("scroll", handleScroll);
    };

    video.addEventListener("loadedmetadata", onMetadataLoaded);

    // Also try immediately if already loaded
    if (video.readyState >= 1) {
      const cleanup = onMetadataLoaded();
      return () => {
        video.removeEventListener("loadedmetadata", onMetadataLoaded);
        cleanup?.();
      };
    }

    return () => video.removeEventListener("loadedmetadata", onMetadataLoaded);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh]"
    >
      {/* Sticky video container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-bg.mp4"
          muted
          playsInline
          preload="auto"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/80" />

        {/* Content */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto px-4 text-center">
            <img
              src={logoHero}
              alt="The Dukes' Club"
              className="h-24 md:h-36 lg:h-44 mx-auto mb-8 drop-shadow-2xl"
            />
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-10 font-sans">
              Advancing colorectal surgical training through education,
              collaboration, and excellence.
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
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-gold animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
