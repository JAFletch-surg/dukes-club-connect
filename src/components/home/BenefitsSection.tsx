import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, GraduationCap, Video, Globe, Award } from "lucide-react";

const benefits = [
  { icon: BookOpen, title: "FRCS Resources", description: "Access exam prep, question banks, and viva courses" },
  { icon: Video, title: "Webinar Archive", description: "Watch live and recorded surgical webinars" },
  { icon: GraduationCap, title: "Training Support", description: "Exam advice, fellowship guides, and mentorship" },
  { icon: Users, title: "Community", description: "Connect with colorectal trainees across the UK" },
  { icon: Globe, title: "Fellowships Map", description: "Interactive UK & worldwide fellowship directory" },
  { icon: Award, title: "Annual Weekend", description: "Premier conference with hands-on courses" },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-mono text-sm tracking-widest uppercase mb-2">Why Join?</p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-card-foreground">
            Membership Benefits
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
            Everything you need to excel in your colorectal surgery training journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group p-6 rounded-lg border border-border bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <b.icon className="text-primary group-hover:text-gold transition-colors" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/join">
            <Button variant="gold" size="lg">
              Join Dukes' Club Today
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
