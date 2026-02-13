import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, MapPin, PoundSterling, Search, ArrowRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import awrImage from "@/assets/events/awr-yellow.png";
import ibdImage from "@/assets/events/ibd-yellow.png";
import robotImage from "@/assets/events/robot.png";

const subspecialties = [
  "Cancer - Colon", "Cancer - Rectal", "Cancer - Anal", "Cancer - Advanced",
  "Peritoneal Malignancy", "IBD", "Abdominal Wall", "Pelvic Floor",
  "Proctology", "Fistula", "Intestinal Failure", "Emergency", "Trauma",
  "Research", "Endoscopy", "Training", "Radiology", "Robotic",
  "Laparoscopic", "Open", "TAMIS", "General",
] as const;

const eventTypes = ["Conference", "Workshop", "Webinar", "Course", "Masterclass"] as const;

type EventItem = {
  title: string;
  eventType: (typeof eventTypes)[number];
  subspecialties: (typeof subspecialties)[number][];
  date: string;
  sortDate: string;
  location: string;
  price: string;
  priceValue: number;
  description: string;
  image: string;
  dateAdded: string;
};

const allEvents: EventItem[] = [
  {
    title: "Intestinal Failure & Abdominal Wall Day",
    eventType: "Conference",
    subspecialties: ["Intestinal Failure", "Abdominal Wall"],
    date: "15 Mar 2026",
    sortDate: "2026-03-15",
    location: "Royal College of Surgeons, London",
    price: "Free",
    priceValue: 0,
    description: "Lecture-based course on complex herniae, intestinal failure, and abdominal wall management.",
    image: awrImage,
    dateAdded: "2025-12-01",
  },
  {
    title: "ACPGBI 2026: Advanced IBD Surgery Course",
    eventType: "Workshop",
    subspecialties: ["IBD", "Laparoscopic"],
    date: "22–23 Apr 2026",
    sortDate: "2026-04-22",
    location: "Birmingham NEC",
    price: "£250",
    priceValue: 250,
    description: "Hands on wet lab workshops on Ileo-anal Pouch and formation of Kono-S anastomosis. Expert consultant faculty.",
    image: ibdImage,
    dateAdded: "2025-11-15",
  },
  {
    title: "Robotic Cadaveric CME Course",
    eventType: "Workshop",
    subspecialties: ["Robotic", "Cancer - Rectal"],
    date: "10 May 2026",
    sortDate: "2026-05-10",
    location: "Guy's Hospital, London",
    price: "£450 (£300 members)",
    priceValue: 450,
    description: "Hands-on cadaveric training with evening Zoom masterclass.",
    image: robotImage,
    dateAdded: "2026-01-10",
  },
  {
    title: "Pelvic Floor Masterclass",
    eventType: "Masterclass",
    subspecialties: ["Pelvic Floor", "Proctology"],
    date: "18 Jun 2026",
    sortDate: "2026-06-18",
    location: "St Mark's Hospital, London",
    price: "£175",
    priceValue: 175,
    description: "Comprehensive masterclass covering advanced pelvic floor assessment and management techniques.",
    image: awrImage,
    dateAdded: "2026-01-20",
  },
  {
    title: "Emergency Colorectal Surgery Webinar",
    eventType: "Webinar",
    subspecialties: ["Emergency", "General"],
    date: "5 Jul 2026",
    sortDate: "2026-07-05",
    location: "Online",
    price: "Free",
    priceValue: 0,
    description: "Interactive webinar covering acute management of colorectal emergencies with expert panel discussion.",
    image: ibdImage,
    dateAdded: "2026-02-01",
  },
  {
    title: "TAMIS & Transanal Surgery Course",
    eventType: "Course",
    subspecialties: ["TAMIS", "Cancer - Rectal", "Endoscopy"],
    date: "12 Sep 2026",
    sortDate: "2026-09-12",
    location: "Royal London Hospital",
    price: "£350",
    priceValue: 350,
    description: "Practical course on transanal minimally invasive surgery techniques with live demonstrations.",
    image: robotImage,
    dateAdded: "2026-02-10",
  },
];

type SortOption = "date" | "price" | "dateAdded";

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [selectedSubspecialties, setSelectedSubspecialties] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  const toggleFilter = (value: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filteredEvents = useMemo(() => {
    let events = [...allEvents];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.subspecialties.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by subspecialty
    if (selectedSubspecialties.length > 0) {
      events = events.filter((e) =>
        e.subspecialties.some((s) => selectedSubspecialties.includes(s))
      );
    }

    // Filter by event type
    if (selectedEventTypes.length > 0) {
      events = events.filter((e) => selectedEventTypes.includes(e.eventType));
    }

    // Sort
    events.sort((a, b) => {
      if (sortBy === "date") return a.sortDate.localeCompare(b.sortDate);
      if (sortBy === "price") return a.priceValue - b.priceValue;
      return b.dateAdded.localeCompare(a.dateAdded);
    });

    return events;
  }, [search, sortBy, selectedSubspecialties, selectedEventTypes]);

  const clearFilters = () => {
    setSearch("");
    setSelectedSubspecialties([]);
    setSelectedEventTypes([]);
    setSortBy("date");
  };

  const hasActiveFilters = search || selectedSubspecialties.length > 0 || selectedEventTypes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-12 bg-navy">
        <div className="container mx-auto px-4">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-2">
            Courses & Webinars
          </p>
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-navy-foreground">
            Events & Courses
          </h1>
          <p className="mt-3 text-navy-foreground/80 max-w-2xl text-sm md:text-base">
            Browse our upcoming webinars, workshops, and courses designed to enhance your surgical knowledge and skills.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-navy border-t border-navy-foreground/10">
        <div className="container mx-auto px-4 space-y-6">
          {/* Search + Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/50"
              />
            </div>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-full sm:w-48 bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (soonest)</SelectItem>
                <SelectItem value="price">Price (lowest)</SelectItem>
                <SelectItem value="dateAdded">Recently added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Type Tags */}
          <div>
            <p className="text-xs font-semibold text-navy-foreground/60 uppercase tracking-wider mb-2">Event Type</p>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter(type, selectedEventTypes, setSelectedEventTypes)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    selectedEventTypes.includes(type)
                      ? "bg-gold text-gold-foreground border-gold"
                      : "bg-navy-foreground/10 text-navy-foreground/70 border-navy-foreground/20 hover:border-navy-foreground/40"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Subspecialty Tags */}
          <div>
            <p className="text-xs font-semibold text-navy-foreground/60 uppercase tracking-wider mb-2">Subspecialty</p>
            <div className="flex flex-wrap gap-2">
              {subspecialties.map((sub) => (
                <button
                  key={sub}
                  onClick={() => toggleFilter(sub, selectedSubspecialties, setSelectedSubspecialties)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                    selectedSubspecialties.includes(sub)
                      ? "bg-gold text-gold-foreground border-gold"
                      : "bg-navy-foreground/10 text-navy-foreground/70 border-navy-foreground/20 hover:border-navy-foreground/40"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors"
            >
              <X size={14} /> Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-navy-foreground/60 text-lg">No events match your filters.</p>
              <button onClick={clearFilters} className="mt-4 text-gold hover:text-gold/80 text-sm font-medium">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.title}
                  className="group rounded-lg border-2 border-navy-foreground overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-navy"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge className="bg-gold/20 text-gold border-gold/30 hover:bg-gold/30 text-[10px]">
                        {event.eventType}
                      </Badge>
                      {event.subspecialties.map((sub) => (
                        <Badge
                          key={sub}
                          variant="outline"
                          className="border-navy-foreground/30 text-navy-foreground/70 text-[10px]"
                        >
                          {sub}
                        </Badge>
                      ))}
                    </div>

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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
