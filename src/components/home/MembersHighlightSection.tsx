import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lock, Play, BookOpen, Map } from "lucide-react";

const features = [
  { icon: Play, title: "Video & Webinar Archive", description: "Searchable library of surgical lectures and live webinar recordings via Vimeo" },
  { icon: BookOpen, title: "FRCS Question Bank", description: "Practice questions, viva prep, and colorectal wiki for exam success" },
  { icon: Map, title: "Fellowships Directory", description: "Interactive map of UK and worldwide colorectal fellowships" },
];

const MembersHighlightSection = () => {
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--navy-foreground)) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Lock size={14} /> Members Only
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-navy-foreground">
            Exclusive Member Resources
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-navy-foreground/70">
            Unlock a wealth of training resources, exam preparation tools, and fellowship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-lg border border-navy-foreground/20 bg-navy-foreground/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <f.icon className="text-gold mb-4" size={32} />
              <h3 className="text-lg font-semibold text-navy-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-navy-foreground/60">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/join">
            <Button variant="gold" size="lg">
              Join to Access
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MembersHighlightSection;
