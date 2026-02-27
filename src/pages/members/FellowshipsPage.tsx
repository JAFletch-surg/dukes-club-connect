import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin, Clock, Search, Award, Building2, X, BookOpen,
  Play, Users, Quote, GraduationCap, ChevronRight, Stethoscope, ArrowRight,
  Globe, Shield, Sparkles,
} from "lucide-react";
import { mockFellowships } from "@/data/mockMembersData";

type Fellowship = (typeof mockFellowships)[0];

const subspecialtyFilterOptions = ["Pelvic Floor", "IBD", "Robotic", "Laparoscopic", "Cancer", "TAMIS"];

/* ───── Accreditation pill ───── */
const AccreditationPill = ({ name }: { name: string }) => (
  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gold/15 text-gold-foreground border border-gold/30">
    <Shield size={10} className="text-gold" /> {name}
  </span>
);

/* ───── Fellowship Card ───── */
const FellowshipCard = ({ fellowship, onClick }: { fellowship: Fellowship; onClick: () => void }) => (
  <div
    className="group cursor-pointer rounded-xl overflow-hidden bg-card border border-border/60 hover:border-gold/40 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
    onClick={onClick}
  >
    {/* Hero image with overlay */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={fellowship.coverImage}
        alt={fellowship.hospital}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
      
      {/* Play button */}
      {fellowship.videoUrl && (
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/95 backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/30 group-hover:scale-110 transition-transform">
          <Play size={12} className="text-primary ml-0.5" />
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-3 right-3">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
          fellowship.type === "UK"
            ? "bg-navy-foreground/95 text-navy"
            : "bg-gold/90 text-gold-foreground"
        }`}>
          {fellowship.type === "UK" ? "🇬🇧 UK" : "🌍 INTL"}
        </span>
      </div>

      {/* Hospital logo */}
      <div className="absolute bottom-3 left-3">
        <div className="w-10 h-10 rounded-lg bg-card/95 backdrop-blur-sm p-1.5 shadow-lg border border-border/20">
          <img src={fellowship.hospitalLogo} alt={fellowship.hospital} className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Accreditations on image */}
      <div className="absolute bottom-3 right-3 flex gap-1">
        {fellowship.accreditations.slice(0, 2).map((a) => (
          <span key={a} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gold/90 text-gold-foreground">
            {a}
          </span>
        ))}
      </div>
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
      <div>
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {fellowship.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
          <Building2 size={11} className="shrink-0" /> {fellowship.hospital}
        </p>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin size={11} /> {fellowship.location}</span>
        <span className="flex items-center gap-1 font-semibold text-foreground"><Clock size={11} /> {fellowship.duration}</span>
      </div>

      {/* Subspecialties */}
      <div className="flex gap-1 flex-wrap">
        {fellowship.subspecialties.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/8 text-primary font-semibold border border-primary/15">
            {s}
          </span>
        ))}
        {fellowship.subspecialties.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground">
            +{fellowship.subspecialties.length - 3}
          </span>
        )}
      </div>

      {/* Faculty strip */}
      <div className="flex items-center gap-2 pt-2 border-t border-border/40">
        <div className="flex -space-x-2">
          {fellowship.faculty.slice(0, 3).map((f, i) => (
            <Avatar key={i} className="h-7 w-7 border-2 border-card ring-1 ring-border/30">
              <AvatarImage src={f.photo} alt={f.name} />
              <AvatarFallback className="text-[8px] bg-navy text-navy-foreground font-bold">
                {f.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground truncate flex-1">
          {fellowship.faculty.map(f => f.name.split(" ").pop()).join(" · ")}
        </span>
        <ChevronRight size={14} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  </div>
);

/* ───── Info block helper ───── */
const InfoBlock = ({ label, children, icon: Icon }: { label: string; children: React.ReactNode; icon?: React.FC<any> }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
      {Icon && <Icon size={12} className="text-primary" />} {label}
    </p>
    <div className="text-sm text-foreground leading-relaxed">{children}</div>
  </div>
);

/* ───── Page ───── */
const FellowshipsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "UK" | "International">("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<Fellowship | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const toggleTag = (tag: string) =>
    setSelectedTags((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));

  const filtered = mockFellowships.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.hospital.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || f.type === typeFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some((t) => f.subspecialties.includes(t));
    return matchesSearch && matchesType && matchesTags;
  });

  const activeFilterCount = (typeFilter !== "All" ? 1 : 0) + selectedTags.length;

  // Collect all unique accreditations and subspecialties
  const allAccreditations = [...new Set(mockFellowships.flatMap(f => f.accreditations))];
  const allSubspecialties = [...new Set(mockFellowships.flatMap(f => f.subspecialties))];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* ── Hero Header ── */}
      <div className="relative rounded-2xl overflow-hidden bg-navy p-6 sm:p-8">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 40%)`,
        }} />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                  <GraduationCap size={16} className="text-gold" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-navy-foreground/60">Fellowship Directory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy-foreground leading-tight">
                Colorectal Surgery<br />
                <span className="text-gold">Fellowships</span>
              </h1>
              <p className="text-sm text-navy-foreground/60 mt-2 max-w-md">
                {mockFellowships.length} training posts across {new Set(mockFellowships.map(f => f.location.split(",").pop()?.trim())).size} countries — curated by the ACPGBI Trainee Committee
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              <div className="text-center px-4 py-3 rounded-xl bg-navy-foreground/5 border border-navy-foreground/10">
                <p className="text-2xl font-bold text-navy-foreground">{mockFellowships.filter(f => f.type === "UK").length}</p>
                <p className="text-[10px] font-semibold text-navy-foreground/50 uppercase tracking-wider">UK Posts</p>
              </div>
              <div className="text-center px-4 py-3 rounded-xl bg-gold/10 border border-gold/20">
                <p className="text-2xl font-bold text-gold">{mockFellowships.filter(f => f.type === "International").length}</p>
                <p className="text-[10px] font-semibold text-navy-foreground/50 uppercase tracking-wider">International</p>
              </div>
            </div>
          </div>

          {/* ── Accreditations & Subspecialties ribbon ── */}
          <div className="mt-5 pt-5 border-t border-navy-foreground/10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-foreground/40 mr-1">Accreditations</span>
              {allAccreditations.map(a => (
                <span key={a} className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/25">
                  <Award size={9} /> {a}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest text-navy-foreground/40 mr-1">Subspecialties</span>
              {allSubspecialties.map(s => (
                <span key={s} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-navy-foreground/8 text-navy-foreground/70 border border-navy-foreground/10">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
            <Input placeholder="Search by name, hospital, or location…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-1.5">
            {(["All", "UK", "International"] as const).map((type) => (
              <Button
                key={type}
                variant={typeFilter === type ? "navy" : "outline"}
                size="sm"
                className="text-xs h-8 rounded-full px-4"
                onClick={() => setTypeFilter(type)}
              >
                {type === "UK" && "🇬🇧 "}{type === "International" && "🌍 "}{type}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap items-center">
          <Sparkles size={12} className="text-muted-foreground/40" />
          {subspecialtyFilterOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
              }`}
            >
              {tag}
            </button>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setTypeFilter("All"); setSelectedTags([]); }}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-2"
            >
              <X size={12} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((fellowship) => (
          <FellowshipCard key={fellowship.id} fellowship={fellowship} onClick={() => setSelected(fellowship)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-muted-foreground/30" />
          </div>
          <p className="text-sm font-semibold text-muted-foreground">No fellowships match your criteria</p>
          <Button variant="ghost" size="sm" className="mt-3 text-xs"
            onClick={() => { setSearch(""); setTypeFilter("All"); setSelectedTags([]); }}>
            Reset filters
          </Button>
        </div>
      )}

      {/* ── Detail Modal ── */}
      <Dialog open={!!selected} onOpenChange={() => { setSelected(null); setShowVideo(false); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl">
          {selected && (
            <>
              {/* Hero */}
              <div className="relative h-56 sm:h-72 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/10" />
                    {selected.videoUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
                        className="absolute inset-0 flex items-center justify-center group/play"
                      >
                        <div className="w-14 h-14 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform border border-border/20">
                          <Play size={22} className="text-primary ml-0.5" />
                        </div>
                      </button>
                    )}
                  </>
                )}

                {/* Hospital logo */}
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 rounded-xl bg-card/95 backdrop-blur-sm p-2 shadow-lg border border-border/20">
                    <img src={selected.hospitalLogo} alt={selected.hospital} className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Type badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm ${
                    selected.type === "UK"
                      ? "bg-navy-foreground/95 text-navy"
                      : "bg-gold/90 text-gold-foreground"
                  }`}>
                    {selected.type === "UK" ? "🇬🇧 UK Fellowship" : "🌍 International Fellowship"}
                  </span>
                </div>

                {!showVideo && (
                  <div className="absolute bottom-5 left-5 right-5">
                    <h2 className="text-xl font-bold text-navy-foreground leading-snug">{selected.title}</h2>
                    <p className="text-sm text-navy-foreground/70 flex items-center gap-1.5 mt-1.5">
                      <Building2 size={14} /> {selected.hospital}
                    </p>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-5 py-5 space-y-5">
                {/* Meta + Accreditations */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> {selected.location}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} className="text-primary" /> {selected.duration}</span>
                  {selected.accreditations.length > 0 && (
                    <>
                      <span className="text-border">|</span>
                      {selected.accreditations.map((a) => (
                        <AccreditationPill key={a} name={a} />
                      ))}
                    </>
                  )}
                </div>

                {/* Subspecialties */}
                <div className="flex gap-1.5 flex-wrap">
                  {selected.subspecialties.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[11px] font-semibold rounded-full px-3">{s}</Badge>
                  ))}
                </div>

                {/* Video toggle */}
                {selected.videoUrl && (
                  <div className="flex gap-2">
                    <Button
                      variant={showVideo ? "ghost" : "navy"}
                      size="sm"
                      className="text-xs h-8 rounded-full"
                      onClick={() => setShowVideo(false)}
                    >
                      Photo
                    </Button>
                    <Button
                      variant={showVideo ? "navy" : "ghost"}
                      size="sm"
                      className="text-xs h-8 rounded-full"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play size={11} className="mr-1" /> Video
                    </Button>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">{selected.fullDescription}</p>

                <div className="h-px bg-border" />

                {/* Faculty */}
                <InfoBlock label="Faculty & Supervisors" icon={Users}>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {selected.faculty.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card hover:shadow-sm transition-shadow">
                        <Avatar className="h-12 w-12 border-2 border-border">
                          <AvatarImage src={f.photo} alt={f.name} />
                          <AvatarFallback className="text-xs bg-navy text-navy-foreground font-bold">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-foreground">{f.name}</p>
                          <p className="text-[11px] text-muted-foreground">{f.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoBlock>

                {/* Learning Outcomes */}
                {selected.learningOutcomes && (
                  <InfoBlock label="Learning Outcomes" icon={GraduationCap}>
                    <ul className="space-y-1.5 mt-2">
                      {selected.learningOutcomes.map((lo, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" /> {lo}
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>
                )}

                {/* Operative Volume */}
                {selected.operativeVolume && (
                  <InfoBlock label="Expected Operative Volume" icon={Stethoscope}>
                    <div className="border border-border/60 rounded-xl overflow-hidden mt-2">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-navy/5">
                            <th className="text-left p-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Procedure</th>
                            <th className="text-right p-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Volume/yr</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.operativeVolume.map((row, i) => (
                            <tr key={i} className="border-t border-border/30">
                              <td className="p-3 text-foreground">{row.procedure}</td>
                              <td className="p-3 text-right font-bold text-primary">{row.volume}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </InfoBlock>
                )}

                <div className="h-px bg-border" />

                {/* Practical details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/15">
                    <InfoBlock label="Salary">
                      <p className="font-semibold">{selected.salary}</p>
                    </InfoBlock>
                  </div>
                  {selected.onCall && typeof selected.onCall === "object" && (
                    <div className="p-3.5 rounded-xl bg-navy/5 border border-navy/10">
                      <InfoBlock label="On-Call">
                        <p className="font-semibold">{selected.onCall.frequency} ({selected.onCall.type})</p>
                      </InfoBlock>
                    </div>
                  )}
                  <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10">
                    <InfoBlock label="Prerequisites">
                      <p>{selected.prerequisites}</p>
                    </InfoBlock>
                  </div>
                  <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40">
                    <InfoBlock label="Application Process">
                      <p>{selected.applicationProcess}</p>
                    </InfoBlock>
                  </div>
                  {selected.accommodation && (
                    <div className="p-3.5 rounded-xl bg-muted/30 border border-border/40 sm:col-span-2">
                      <InfoBlock label="Accommodation">
                        <p>{selected.accommodation}</p>
                      </InfoBlock>
                    </div>
                  )}
                </div>

                {/* Testimonials */}
                {selected.testimonials && selected.testimonials.length > 0 && (
                  <>
                    <div className="h-px bg-border" />
                    <InfoBlock label="Testimonials" icon={Quote}>
                      <div className="space-y-3 mt-2">
                        {selected.testimonials.map((t, i) => (
                          <blockquote key={i} className="border-l-3 border-gold pl-4 py-2 bg-gold/3 rounded-r-xl">
                            <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
                            <footer className="text-[11px] text-muted-foreground mt-1.5 font-semibold not-italic">{t.name} · {t.year}</footer>
                          </blockquote>
                        ))}
                      </div>
                    </InfoBlock>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FellowshipsPage;
