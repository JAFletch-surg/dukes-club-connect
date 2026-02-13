import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, PoundSterling } from "lucide-react";
import awrImage from "@/assets/events/awr-yellow.png";
import ibdImage from "@/assets/events/ibd-yellow.png";
import robotImage from "@/assets/events/robot.png";

const upcomingEvents = [
  {
    title: "Intestinal Failure & Abdominal Wall Day",
    tag: "Conference",
    date: "15 Mar 2026",
    location: "Royal College of Surgeons, London",
    price: "Free",
    description:
      "Lecture-based course on complex herniae, intestinal failure, and abdominal wall management.",
    image: awrImage,
  },
  {
    title: "ACPGBI 2026: Advanced IBD Surgery Course",
    tag: "Workshop",
    date: "22–23 Apr 2026",
    location: "Birmingham NEC",
    price: "£250",
    description:
      "Hands on wet lab workshops on Ileo-anal Pouch and formation of Kono-S anastomosis. Expert consultant faculty.",
    image: ibdImage,
  },
  {
    title: "Robotic Cadaveric CME Course",
    tag: "Workshop",
    date: "10 May 2026",
    location: "Guy's Hospital, London",
    price: "£450 (£300 members)",
    description:
      "Hands-on cadaveric training with evening Zoom masterclass.",
    image: robotImage,
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-2">
              Courses and Webinars
            </p>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-navy-foreground">
              Upcoming Events
            </h2>
            <p className="mt-3 text-navy-foreground/80 max-w-2xl text-sm md:text-base">
              Upcoming Webinars and Courses: Join us for a series of informative sessions and
              engaging courses designed to enhance your knowledge and skills.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/events">
              <Button variant="hero" size="lg">
                View all
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="group rounded-lg border-2 border-navy-foreground overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-navy"
            >
              <div className="aspect-video md:aspect-[4/3] overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-sans font-semibold text-navy-foreground mb-3">
                  {event.title}
                </h3>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-sm text-navy-foreground/70">
                    <CalendarDays size={14} className="text-gold shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy-foreground/70">
                    <MapPin size={14} className="text-gold shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-navy-foreground/70">
                    <PoundSterling size={14} className="text-gold shrink-0" />
                    <span>{event.price}</span>
                  </div>
                </div>
                <p className="text-sm text-navy-foreground/70 mb-4">{event.description}</p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
