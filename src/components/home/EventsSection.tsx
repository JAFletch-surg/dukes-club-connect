import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const upcomingEvents = [
  {
    title: "Annual Weekend 2026",
    date: "14-16 March 2026",
    location: "Royal College of Surgeons, London",
    tag: "Conference",
    description: "Three days of lectures, workshops, and hands-on surgical training with leading colorectal surgeons.",
  },
  {
    title: "FRCS Viva Preparation Course",
    date: "22 April 2026",
    location: "Online",
    tag: "Exam Prep",
    description: "Interactive viva practice with experienced examiners and structured feedback.",
  },
  {
    title: "Robotic Colorectal Surgery Masterclass",
    date: "10 May 2026",
    location: "Birmingham QE Hospital",
    tag: "Workshop",
    description: "Hands-on robotic surgery training with simulation and live case observation.",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-gold font-mono text-sm tracking-widest uppercase mb-2">Stay Updated</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Upcoming Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="group rounded-lg border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-2" style={{ background: "var(--gradient-gold)" }} />
              <div className="p-6">
                <span className="inline-block text-xs font-mono font-semibold text-gold bg-gold/10 px-2 py-1 rounded mb-3">
                  {event.tag}
                </span>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button variant="outline" size="lg">
              View All Events <ArrowRight className="ml-1" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
