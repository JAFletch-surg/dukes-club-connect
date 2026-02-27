import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Clock, Search, Award, Building2, X, BookOpen, Map, Navigation, Play, Users, Quote, GraduationCap } from "lucide-react";
import { mockFellowships } from "@/data/mockMembersData";

type Fellowship = typeof mockFellowships[0];

const subspecialtyFilterOptions = ["Pelvic Floor", "IBD", "Robotic", "Laparoscopic", "Cancer", "TAMIS"];
const durationOptions = ["All", "6 months", "12 months"] as const;

const FellowshipCard = ({ fellowship, onClick }: { fellowship: Fellowship; onClick: () => void }) => (
  <Card
    className="group border-0 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    onClick={onClick}
  >
    {/* Cover image with gradient overlay */}
    <div className="relative h-44 overflow-hidden">
      <img
        src={fellowship.coverImage}
        alt={fellowship.hospital}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
      
      {/* Type badge */}
      <Badge
        className="absolute top-3 right-3 text-[10px] font-bold border-0"
        style={{
          backgroundColor: fellowship.type === "UK" ? "hsl(var(--navy))" : "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
        }}
      >
        {fellowship.type === "UK" ? "🇬🇧 UK" : "🌍 International"}
      </Badge>

      {/* Video indicator */}
      {fellowship.videoUrl && (
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
          <Play size={14} className="text-primary-foreground ml-0.5" />
        </div>
      )}

      {/* Title on image */}
      <div className="absolute bottom-3 left-4 right-4">
        <h3 className="text-sm font-bold text-primary-foreground leading-tight">{fellowship.title}</h3>
        <p className="text-[11px] text-primary-foreground/80 flex items-center gap-1 mt-0.5">
          <Building2 size={10} /> {fellowship.hospital}
        </p>
      </div>
    </div>

    <CardContent className="p-4 space-y-3">
      {/* Location & Duration row */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin size={12} /> {fellowship.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {fellowship.duration}</span>
      </div>

      {/* Faculty avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {fellowship.faculty.map((f, i) => (
            <Avatar key={i} className="h-7 w-7 border-2 border-card">
              <AvatarImage src={f.photo} alt={f.name} />
              <AvatarFallback className="text-[9px] bg-muted">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground">
          {fellowship.faculty.map(f => f.name.split(" ").pop()).join(", ")}
        </span>
      </div>

      {/* Subspecialties */}
      <div className="flex gap-1.5 flex-wrap">
        {fellowship.subspecialties.map((s) => (
          <span
            key={s}
            className="text-[10px] px-2 py-0.5 rounded-full font-medium border border-border bg-accent text-accent-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Accreditations */}
      {fellowship.accreditations.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {fellowship.accreditations.map((a) => (
            <Badge key={a} variant="outline" className="text-[10px] border-gold/40 text-gold bg-gold/5">
              <Award size={8} className="mr-0.5" /> {a}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

const FellowshipsPage = () => {
  const [search, setSearch] = useState("");
  const [distanceSearch, setDistanceSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "UK" | "International">("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [durationFilter, setDurationFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Fellowship | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const toggleTag = (tag: string) =>
    setSelectedTags((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));

  const filtered = mockFellowships.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.hospital.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || f.type === typeFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some((t) => f.subspecialties.includes(t));
    const matchesDuration = durationFilter === "All" || f.duration === durationFilter;
    return matchesSearch && matchesType && matchesTags && matchesDuration;
  });

  const activeFilterCount = (typeFilter !== "All" ? 1 : 0) + selectedTags.length + (durationFilter !== "All" ? 1 : 0);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={22} className="text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Fellowship Database</h1>
        </div>
        <p className="text-muted-foreground text-sm">Explore colorectal surgery fellowship opportunities worldwide</p>
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy/10">
            <span className="w-2 h-2 rounded-full bg-navy" /> {mockFellowships.filter(f => f.type === "UK").length} UK
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary" /> {mockFellowships.filter(f => f.type === "International").length} International
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name, hospital, or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["All", "UK", "International"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  typeFilter === type
                    ? "bg-navy text-navy-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
            {durationOptions.map((d) => (
              <button
                key={d}
                onClick={() => setDurationFilter(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  durationFilter === d
                    ? "bg-navy text-navy-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d === "All" ? "Any duration" : d}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs text-muted-foreground font-medium">Subspecialty:</span>
          {subspecialtyFilterOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              }`}
            >
              {tag}
            </button>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setTypeFilter("All"); setSelectedTags([]); setDurationFilter("All"); }}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Distance Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="relative flex-1 max-w-md">
          <Navigation size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by distance from address (e.g. Manchester M1 1AA)..."
            value={distanceSearch}
            onChange={(e) => setDistanceSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="shrink-0" onClick={() => setShowMap(!showMap)}>
          <Map size={14} className="mr-1.5" /> {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {/* Map Placeholder */}
      {showMap && (
        <Card className="border-0 overflow-hidden shadow-sm">
          <div className="relative w-full h-48 sm:h-64 bg-navy/5 flex flex-col items-center justify-center gap-3">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[30%] left-[35%] w-3 h-3 rounded-full bg-primary animate-pulse" />
              <div className="absolute top-[25%] left-[55%] w-3 h-3 rounded-full bg-gold animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute top-[45%] left-[42%] w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute top-[60%] left-[48%] w-3 h-3 rounded-full bg-gold animate-pulse" style={{ animationDelay: "0.3s" }} />
              <div className="absolute top-[35%] left-[65%] w-3 h-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.8s" }} />
            </div>
            <Map size={32} className="text-muted-foreground/40" />
            <div className="text-center z-10">
              <p className="text-sm font-semibold text-muted-foreground">Interactive Map Coming Soon</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Powered by Mapbox</p>
            </div>
            {distanceSearch && (
              <Badge variant="outline" className="z-10 text-xs mt-1">
                <Navigation size={10} className="mr-1" /> Searching near: {distanceSearch}
              </Badge>
            )}
          </div>
        </Card>
      )}

      {/* Fellowship Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((fellowship) => (
          <FellowshipCard key={fellowship.id} fellowship={fellowship} onClick={() => setSelected(fellowship)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No fellowships found</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your filters</p>
          <Button variant="outline" size="sm" className="mt-3"
            onClick={() => { setSearch(""); setTypeFilter("All"); setSelectedTags([]); setDurationFilter("All"); }}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => { setSelected(null); setShowVideo(false); }}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
          {selected && (
            <>
              {/* Hero image / Video toggle */}
              <div className="relative h-52 sm:h-64 overflow-hidden">
                {showVideo && selected.videoUrl ? (
                  <iframe
                    src={selected.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${selected.title} video`}
                  />
                ) : (
                  <>
                    <img src={selected.coverImage} alt={selected.hospital} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                    {selected.videoUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
                        className="absolute inset-0 flex items-center justify-center group/play"
                      >
                        <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center border border-primary-foreground/20 group-hover/play:scale-110 transition-transform">
                          <Play size={24} className="text-primary-foreground ml-1" />
                        </div>
                      </button>
                    )}
                  </>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge
                    className="border-0 font-bold"
                    style={{
                      backgroundColor: selected.type === "UK" ? "hsl(var(--navy))" : "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    {selected.type === "UK" ? "🇬🇧 UK" : "🌍 International"}
                  </Badge>
                </div>
                {!showVideo && (
                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="text-lg font-bold text-primary-foreground">{selected.title}</h2>
                    <p className="text-sm text-primary-foreground/80 flex items-center gap-1 mt-0.5">
                      <Building2 size={13} /> {selected.hospital}
                    </p>
                  </div>
                )}
              </div>

              <div className="px-5 pb-5 space-y-5">
                {/* Quick info row */}
                <div className="flex gap-4 text-sm text-muted-foreground -mt-1">
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {selected.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {selected.duration}</span>
                </div>

                {/* Video toggle buttons */}
                {selected.videoUrl && (
                  <div className="flex gap-2">
                    <Button variant={showVideo ? "outline" : "default"} size="sm" onClick={() => setShowVideo(false)}>
                      Photo
                    </Button>
                    <Button variant={showVideo ? "default" : "outline"} size="sm" onClick={() => setShowVideo(true)}>
                      <Play size={12} className="mr-1" /> Watch Video
                    </Button>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">{selected.fullDescription}</p>

                {/* Faculty Section */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Users size={13} /> Faculty
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selected.faculty.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                        <Avatar className="h-12 w-12 border-2 border-card shadow-sm">
                          <AvatarImage src={f.photo} alt={f.name} />
                          <AvatarFallback className="text-xs bg-muted">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                {selected.learningOutcomes && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Learning Outcomes</p>
                    <ul className="space-y-1.5">
                      {selected.learningOutcomes.map((lo, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span> {lo}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Accreditations */}
                {selected.accreditations.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selected.accreditations.map((a) => (
                      <Badge key={a} variant="outline" className="text-xs border-gold/30 text-gold bg-gold/5">
                        <Award size={10} className="mr-1" /> {a}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Salary & On-call */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Salary</p>
                    <p className="text-sm text-foreground">{selected.salary}</p>
                  </div>
                  {selected.onCall && typeof selected.onCall === "object" && (
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">On-Call</p>
                      <p className="text-sm text-foreground">{selected.onCall.frequency} ({selected.onCall.type})</p>
                    </div>
                  )}
                </div>

                {/* Operative Volume */}
                {selected.operativeVolume && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Expected Operative Volume</p>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="text-left p-2.5 text-xs font-semibold text-muted-foreground">Procedure</th>
                            <th className="text-right p-2.5 text-xs font-semibold text-muted-foreground">Volume/Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.operativeVolume.map((row, i) => (
                            <tr key={i} className="border-t border-border">
                              <td className="p-2.5 text-foreground">{row.procedure}</td>
                              <td className="p-2.5 text-right font-medium text-foreground">{row.volume}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Prerequisites & Application */}
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Prerequisites</p>
                  <p className="text-sm text-foreground">{selected.prerequisites}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Application Process</p>
                  <p className="text-sm text-foreground">{selected.applicationProcess}</p>
                </div>
                {selected.accommodation && (
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Accommodation</p>
                    <p className="text-sm text-foreground">{selected.accommodation}</p>
                  </div>
                )}

                {/* Testimonials */}
                {selected.testimonials && selected.testimonials.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Testimonials</p>
                    <div className="space-y-3">
                      {selected.testimonials.map((t, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg bg-gold/5 border border-gold/10">
                          <Quote size={16} className="text-gold shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
                            <p className="text-xs text-muted-foreground mt-1.5 font-medium">{t.name} · {t.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subspecialties */}
                <div className="flex gap-2 flex-wrap">
                  {selected.subspecialties.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FellowshipsPage;
