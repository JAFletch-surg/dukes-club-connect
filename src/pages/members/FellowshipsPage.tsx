import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin, Clock, Search, Award, Building2, X, BookOpen,
  Play, Users, Quote, GraduationCap, ChevronRight, Stethoscope, ArrowRight,
} from "lucide-react";
import { mockFellowships } from "@/data/mockMembersData";

type Fellowship = (typeof mockFellowships)[0];

const subspecialtyFilterOptions = ["Pelvic Floor", "IBD", "Robotic", "Laparoscopic", "Cancer", "TAMIS"];

const FellowshipCard = ({ fellowship, onClick }: { fellowship: Fellowship; onClick: () => void }) => (
  <Card
    className="group overflow-hidden cursor-pointer border border-border/60 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
    onClick={onClick}
  >
    {/* Cover image */}
    <div className="relative h-40 overflow-hidden">
      <img
        src={fellowship.coverImage}
        alt={fellowship.hospital}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/5" />

      {fellowship.videoUrl && (
        <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Play size={11} className="text-foreground ml-0.5" />
        </div>
      )}

      <div className="absolute top-3 right-3">
        <span className={`text-[10px] font-semibold px-2 py-1 rounded ${
          fellowship.type === "UK"
            ? "bg-navy-foreground/90 text-navy"
            : "bg-gold text-gold-foreground"
        }`}>
          {fellowship.type === "UK" ? "UK" : "INTL"}
        </span>
      </div>

      <div className="absolute bottom-3 left-3.5 right-3.5">
        <h3 className="text-[13px] font-bold text-navy-foreground leading-snug line-clamp-2">{fellowship.title}</h3>
      </div>
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 size={11} className="text-foreground/50 shrink-0" />
        <span className="truncate">{fellowship.hospital}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin size={11} /> {fellowship.location}</span>
        <span className="flex items-center gap-1 font-medium text-foreground"><Clock size={11} /> {fellowship.duration}</span>
      </div>

      {/* Faculty */}
      <div className="flex items-center gap-2 pt-1 border-t border-border/50">
        <div className="flex -space-x-1.5">
          {fellowship.faculty.slice(0, 3).map((f, i) => (
            <Avatar key={i} className="h-6 w-6 border border-card">
              <AvatarImage src={f.photo} alt={f.name} />
              <AvatarFallback className="text-[8px] bg-muted">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-[11px] text-muted-foreground truncate">
          {fellowship.faculty.map(f => f.name.split(" ").pop()).join(" · ")}
        </span>
      </div>

      {/* Tags */}
      <div className="flex gap-1 flex-wrap">
        {fellowship.subspecialties.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground font-medium">
            {s}
          </span>
        ))}
        {fellowship.subspecialties.length > 3 && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">
            +{fellowship.subspecialties.length - 3}
          </span>
        )}
      </div>

      {/* Accreditations */}
      {fellowship.accreditations.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {fellowship.accreditations.map((a) => (
            <span key={a} className="text-[10px] px-1.5 py-0.5 rounded bg-gold/10 text-gold font-semibold flex items-center gap-0.5">
              <Award size={8} /> {a}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end pt-1">
        <span className="text-[11px] font-medium text-primary flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          View details <ChevronRight size={12} />
        </span>
      </div>
    </div>
  </Card>
);

/* ───── Info block helper ───── */
const InfoBlock = ({ label, children, icon: Icon }: { label: string; children: React.ReactNode; icon?: React.FC<any> }) => (
  <div className="space-y-1">
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
      {Icon && <Icon size={12} />} {label}
    </p>
    <div className="text-sm text-foreground leading-relaxed">{children}</div>
  </div>
);

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

  return (
    <div className="space-y-5 max-w-6xl">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope size={18} className="text-foreground/60" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Fellowship Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
            Colorectal Surgery Fellowships
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mockFellowships.length} training posts across {new Set(mockFellowships.map(f => f.location.split(",").pop()?.trim())).size} countries
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 rounded border border-border bg-card font-medium text-foreground">
            {mockFellowships.filter(f => f.type === "UK").length} UK
          </span>
          <span className="px-2.5 py-1 rounded border border-border bg-card font-medium text-foreground">
            {mockFellowships.filter(f => f.type === "International").length} International
          </span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Filters ── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60" />
            <Input placeholder="Search fellowships..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
          <div className="flex gap-1.5">
            {(["All", "UK", "International"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-foreground text-background"
                    : "bg-card text-muted-foreground border border-border hover:bg-muted/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap items-center">
          {subspecialtyFilterOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-foreground text-background"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted/50"
              }`}
            >
              {tag}
            </button>
          ))}
          {activeFilterCount > 0 && (
            <button
              onClick={() => { setTypeFilter("All"); setSelectedTags([]); }}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 ml-1"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((fellowship) => (
          <FellowshipCard key={fellowship.id} fellowship={fellowship} onClick={() => setSelected(fellowship)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={36} className="mx-auto text-muted-foreground/20 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No fellowships match your criteria</p>
          <Button variant="ghost" size="sm" className="mt-2 text-xs"
            onClick={() => { setSearch(""); setTypeFilter("All"); setSelectedTags([]); }}>
            Reset filters
          </Button>
        </div>
      )}

      {/* ── Detail Modal ── */}
      <Dialog open={!!selected} onOpenChange={() => { setSelected(null); setShowVideo(false); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selected && (
            <>
              {/* Hero */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                    {selected.videoUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
                        className="absolute inset-0 flex items-center justify-center group/play"
                      >
                        <div className="w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover/play:scale-110 transition-transform">
                          <Play size={20} className="text-foreground ml-0.5" />
                        </div>
                      </button>
                    )}
                  </>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                    selected.type === "UK"
                      ? "bg-navy-foreground/90 text-navy"
                      : "bg-gold text-gold-foreground"
                  }`}>
                    {selected.type === "UK" ? "🇬🇧 UK" : "🌍 International"}
                  </span>
                </div>
                {!showVideo && (
                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="text-lg font-bold text-navy-foreground leading-snug">{selected.title}</h2>
                    <p className="text-sm text-navy-foreground/70 flex items-center gap-1 mt-1">
                      <Building2 size={13} /> {selected.hospital}
                    </p>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="px-5 py-5 space-y-5">
                {/* Meta row */}
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin size={13} /> {selected.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {selected.duration}</span>
                </div>

                {/* Video toggle */}
                {selected.videoUrl && (
                  <div className="flex gap-2">
                    <Button
                      variant={showVideo ? "ghost" : "navy"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => setShowVideo(false)}
                    >
                      Photo
                    </Button>
                    <Button
                      variant={showVideo ? "navy" : "ghost"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play size={11} className="mr-1" /> Video
                    </Button>
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-foreground leading-relaxed">{selected.fullDescription}</p>

                {/* Subspecialties */}
                <div className="flex gap-1.5 flex-wrap">
                  {selected.subspecialties.map((s) => (
                    <Badge key={s} variant="secondary" className="text-[11px] font-medium">{s}</Badge>
                  ))}
                </div>

                {/* Accreditations */}
                {selected.accreditations.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {selected.accreditations.map((a) => (
                      <span key={a} className="text-[11px] px-2 py-0.5 rounded bg-gold/10 text-gold font-semibold flex items-center gap-1">
                        <Award size={10} /> {a}
                      </span>
                    ))}
                  </div>
                )}

                <div className="h-px bg-border" />

                {/* Faculty */}
                <InfoBlock label="Faculty & Supervisors" icon={Users}>
                  <div className="grid sm:grid-cols-2 gap-2.5 mt-2">
                    {selected.faculty.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-border/60 bg-card">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage src={f.photo} alt={f.name} />
                          <AvatarFallback className="text-[10px] bg-muted">{f.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{f.name}</p>
                          <p className="text-[11px] text-muted-foreground">{f.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfoBlock>

                {/* Learning Outcomes */}
                {selected.learningOutcomes && (
                  <InfoBlock label="Learning Outcomes" icon={GraduationCap}>
                    <ul className="space-y-1 mt-1">
                      {selected.learningOutcomes.map((lo, i) => (
                        <li key={i} className="text-sm text-foreground flex items-start gap-2">
                          <ArrowRight size={12} className="text-muted-foreground mt-1 shrink-0" /> {lo}
                        </li>
                      ))}
                    </ul>
                  </InfoBlock>
                )}

                {/* Operative Volume */}
                {selected.operativeVolume && (
                  <InfoBlock label="Expected Operative Volume" icon={Stethoscope}>
                    <div className="border border-border/60 rounded-lg overflow-hidden mt-2">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="text-left p-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Procedure</th>
                            <th className="text-right p-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Volume/yr</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selected.operativeVolume.map((row, i) => (
                            <tr key={i} className="border-t border-border/40">
                              <td className="p-2.5 text-foreground">{row.procedure}</td>
                              <td className="p-2.5 text-right font-semibold text-foreground">{row.volume}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </InfoBlock>
                )}

                <div className="h-px bg-border" />

                {/* Practical details in 2-col grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoBlock label="Salary">
                    <p>{selected.salary}</p>
                  </InfoBlock>
                  {selected.onCall && typeof selected.onCall === "object" && (
                    <InfoBlock label="On-Call">
                      <p>{selected.onCall.frequency} ({selected.onCall.type})</p>
                    </InfoBlock>
                  )}
                  <InfoBlock label="Prerequisites">
                    <p>{selected.prerequisites}</p>
                  </InfoBlock>
                  <InfoBlock label="Application Process">
                    <p>{selected.applicationProcess}</p>
                  </InfoBlock>
                  {selected.accommodation && (
                    <InfoBlock label="Accommodation">
                      <p>{selected.accommodation}</p>
                    </InfoBlock>
                  )}
                </div>

                {/* Testimonials */}
                {selected.testimonials && selected.testimonials.length > 0 && (
                  <>
                    <div className="h-px bg-border" />
                    <InfoBlock label="Testimonials" icon={Quote}>
                      <div className="space-y-3 mt-2">
                        {selected.testimonials.map((t, i) => (
                          <blockquote key={i} className="border-l-2 border-gold/50 pl-3.5 py-1">
                            <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
                            <footer className="text-[11px] text-muted-foreground mt-1 font-medium not-italic">{t.name} · {t.year}</footer>
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
