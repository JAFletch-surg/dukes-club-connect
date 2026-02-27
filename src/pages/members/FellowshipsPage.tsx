import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin, Clock, Search, Award, Building2, X, BookOpen,
  Users, Quote, GraduationCap, Stethoscope, BedDouble, ChevronDown,
  List, Map as MapIcon, Shield,
} from "lucide-react";
import { mockFellowships } from "@/data/mockMembersData";

type Fellowship = (typeof mockFellowships)[0];

const SUBSPECIALTY_OPTIONS = [
  "Robotic", "IBD", "Cancer - Advanced", "Pelvic Floor", "Laparoscopic",
  "Proctology", "Abdominal Wall", "TAMIS", "Emergency General Surgery",
  "Peritoneal Malignancy", "Intestinal Failure", "Endoscopic",
];
const ACCREDITATION_OPTIONS = ["ACPGBI", "RCS Eng", "ESCP", "Intuitive", "RCSI"];

/* ───── Multi-select dropdown ───── */
const MultiSelectDropdown = ({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) => {
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 text-xs gap-1.5 rounded-md font-medium">
          {label}
          {selected.length > 0 && (
            <span className="ml-1 bg-primary text-primary-foreground rounded-full w-4.5 h-4.5 text-[10px] flex items-center justify-center font-bold">
              {selected.length}
            </span>
          )}
          <ChevronDown size={12} className="ml-0.5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="space-y-0.5 max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer text-sm"
            >
              <Checkbox
                checked={selected.includes(opt)}
                onCheckedChange={() => toggle(opt)}
                className="h-3.5 w-3.5"
              />
              <span className="text-card-foreground">{opt}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/* ───── Fellowship list row ───── */
const FellowshipRow = ({ fellowship, onClick }: { fellowship: Fellowship; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full text-left flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/40 transition-colors group"
  >
    {/* Left: main info */}
    <div className="flex-1 min-w-0 space-y-1">
      <h3 className="text-[15px] font-bold text-navy leading-snug group-hover:text-primary transition-colors">
        {fellowship.name}
      </h3>
      <p className="text-[13px] text-muted-foreground flex items-center gap-1.5 truncate">
        <Building2 size={12} className="shrink-0" />
        {fellowship.hospitals.join(" / ")}
      </p>
      <p className="text-[13px] text-muted-foreground flex items-center gap-1.5">
        <MapPin size={12} className="shrink-0" />
        {fellowship.city}, {fellowship.country === "Ireland" ? "Ireland" : "UK"}
      </p>
    </div>

    {/* Middle: duration + accommodation */}
    <div className="hidden sm:flex items-center gap-2 shrink-0 pt-1">
      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-muted text-muted-foreground flex items-center gap-1">
        <Clock size={10} /> {fellowship.duration}
      </span>
      {fellowship.accommodation_available && (
        <span className="text-[11px] px-2 py-1 rounded-md bg-muted text-muted-foreground" title="Accommodation available">
          <BedDouble size={12} />
        </span>
      )}
    </div>

    {/* Right: tags */}
    <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0 max-w-[240px]">
      <div className="flex gap-1 flex-wrap justify-end">
        {fellowship.subspecialties.slice(0, 3).map((s) => (
          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
            {s}
          </span>
        ))}
        {fellowship.subspecialties.length > 3 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            +{fellowship.subspecialties.length - 3}
          </span>
        )}
      </div>
      <div className="flex gap-1 flex-wrap justify-end">
        {fellowship.accreditation.map((a) => (
          <span key={a} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/10 text-gold-foreground border border-gold/20 flex items-center gap-0.5">
            <Shield size={8} /> {a}
          </span>
        ))}
      </div>
    </div>

    {/* Mobile: tags below */}
    <div className="sm:hidden flex flex-col gap-1 shrink-0">
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground">
        {fellowship.duration}
      </span>
    </div>
  </button>
);

/* ───── Info block helper ───── */
const InfoBlock = ({ label, children, icon: Icon }: { label: string; children: React.ReactNode; icon?: React.FC<any> }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
      {Icon && <Icon size={12} className="text-gold" />} {label}
    </p>
    <div className="text-sm text-foreground leading-relaxed">{children}</div>
  </div>
);

/* ───── Page ───── */
const FellowshipsPage = () => {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState<"All" | "UK" | "Ireland">("All");
  const [selectedSubspecialties, setSelectedSubspecialties] = useState<string[]>([]);
  const [selectedAccreditations, setSelectedAccreditations] = useState<string[]>([]);
  const [selected, setSelected] = useState<Fellowship | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filterBarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = filterBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const published = useMemo(() => mockFellowships.filter((f) => f.status === "published"), []);

  const filtered = useMemo(() => {
    return published.filter((f) => {
      const q = search.toLowerCase();
      const matchesSearch = !q || f.name.toLowerCase().includes(q) ||
        f.hospitals.some((h) => h.toLowerCase().includes(q)) ||
        f.city.toLowerCase().includes(q);
      const matchesCountry = countryFilter === "All" ||
        (countryFilter === "UK" && f.country === "United Kingdom") ||
        (countryFilter === "Ireland" && f.country === "Ireland");
      const matchesSubs = selectedSubspecialties.length === 0 ||
        selectedSubspecialties.some((s) => f.subspecialties.includes(s));
      const matchesAccr = selectedAccreditations.length === 0 ||
        selectedAccreditations.some((a) => f.accreditation.includes(a));
      return matchesSearch && matchesCountry && matchesSubs && matchesAccr;
    });
  }, [search, countryFilter, selectedSubspecialties, selectedAccreditations, published]);

  const activeFilterCount = (countryFilter !== "All" ? 1 : 0) + selectedSubspecialties.length + selectedAccreditations.length;

  const clearFilters = () => {
    setSearch("");
    setCountryFilter("All");
    setSelectedSubspecialties([]);
    setSelectedAccreditations([]);
  };

  return (
    <div className="space-y-4 max-w-5xl">
      {/* ── Slim Header ── */}
      <div className="py-2">
        <h1 className="text-2xl font-serif font-bold text-navy leading-tight">Fellowship Directory</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Browse {published.length} colorectal surgery training posts across the UK and Ireland
        </p>
      </div>

      {/* ── Sentinel for sticky detection ── */}
      <div ref={filterBarRef} className="h-0" />

      {/* ── Sticky Filter Bar ── */}
      <div className={`sticky top-0 z-30 -mx-1 px-1 py-3 transition-shadow ${isSticky ? "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border" : ""}`}>
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <Input
              placeholder="Search by name, hospital, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Country segmented control */}
          <div className="flex rounded-md border border-border overflow-hidden shrink-0">
            {(["All", "UK", "Ireland"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCountryFilter(c)}
                className={`px-3 h-9 text-xs font-medium transition-colors ${
                  countryFilter === c
                    ? "bg-navy text-navy-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted"
                } ${c !== "All" ? "border-l border-border" : ""}`}
              >
                {c === "UK" && "🇬🇧 "}{c === "Ireland" && "🇮🇪 "}{c}
              </button>
            ))}
          </div>

          {/* Dropdowns */}
          <MultiSelectDropdown
            label="Subspecialty"
            options={SUBSPECIALTY_OPTIONS}
            selected={selectedSubspecialties}
            onChange={setSelectedSubspecialties}
          />
          <MultiSelectDropdown
            label="Accreditation"
            options={ACCREDITATION_OPTIONS}
            selected={selectedAccreditations}
            onChange={setSelectedAccreditations}
          />

          {/* View toggle */}
          <div className="flex rounded-md border border-border overflow-hidden shrink-0 ml-auto">
            <button
              onClick={() => setViewMode("list")}
              className={`px-2.5 h-9 transition-colors ${viewMode === "list" ? "bg-navy text-navy-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
              title="List view"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`px-2.5 h-9 border-l border-border transition-colors ${viewMode === "map" ? "bg-navy text-navy-foreground" : "bg-card text-muted-foreground hover:bg-muted"}`}
              title="Map view"
            >
              <MapIcon size={14} />
            </button>
          </div>
        </div>

        {/* Results count + clear */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {published.length} fellowships
          </p>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              <X size={11} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ── List View ── */}
      {viewMode === "list" ? (
        <div className="space-y-2">
          {filtered.map((f) => (
            <FellowshipRow key={f.id} fellowship={f} onClick={() => setSelected(f)} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                <BookOpen size={24} className="text-muted-foreground/50" />
              </div>
              <p className="text-sm font-semibold text-muted-foreground">No fellowships match your criteria</p>
              <Button variant="outline" size="sm" className="mt-3 text-xs" onClick={clearFilters}>
                Reset filters
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* ── Map View placeholder ── */
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <MapIcon size={32} className="mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground font-medium">Map view coming soon</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Interactive map with fellowship locations across the UK & Ireland</p>
        </div>
      )}

      {/* ── Detail Modal ── */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto gap-0 rounded-xl">
          {selected && (
            <div className="space-y-5">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-navy leading-snug">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                  <span className="flex items-center gap-1"><Building2 size={13} /> {selected.hospitals.join(" / ")}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {selected.city}, {selected.country === "Ireland" ? "Ireland" : "UK"}</span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {selected.duration}</span>
                </DialogDescription>
              </DialogHeader>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selected.accreditation.map((a) => (
                  <span key={a} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gold/10 text-gold-foreground border border-gold/20 flex items-center gap-1">
                    <Shield size={10} className="text-gold" /> {a}
                  </span>
                ))}
                {selected.subspecialties.map((s) => (
                  <span key={s} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {s}
                  </span>
                ))}
                {selected.accommodation_available && (
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-1">
                    <BedDouble size={10} /> Accommodation available
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-foreground leading-relaxed">{selected.fullDescription}</p>

              <div className="h-px bg-border" />

              {/* Supervisors */}
              <InfoBlock label="Supervisors" icon={Users}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selected.supervisors.map((s, i) => (
                    <span key={i} className="text-sm px-3 py-1.5 rounded-lg bg-navy text-navy-foreground font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </InfoBlock>

              {/* Learning Outcomes */}
              {selected.learningOutcomes && (
                <InfoBlock label="Learning Outcomes" icon={GraduationCap}>
                  <ul className="space-y-1.5 mt-1">
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
                  <div className="rounded-lg overflow-hidden mt-1 border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-navy text-navy-foreground">
                          <th className="text-left p-2.5 text-[11px] font-bold uppercase tracking-wider">Procedure</th>
                          <th className="text-right p-2.5 text-[11px] font-bold uppercase tracking-wider">Volume/yr</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.operativeVolume.map((row, i) => (
                          <tr key={i} className="border-t border-border/50">
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

              {/* Practical details */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Salary</p>
                  <p className="text-sm font-medium text-foreground">{selected.salary_per_annum}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">On-Call (Weekday)</p>
                  <p className="text-sm font-medium text-foreground">{selected.on_call.weekday}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Prerequisites</p>
                  <p className="text-sm text-foreground">{selected.prerequisites}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Application Process</p>
                  <p className="text-sm text-foreground">{selected.applicationProcess}</p>
                </div>
              </div>

              {/* Testimonials */}
              {selected.testimonials && selected.testimonials.length > 0 && (
                <>
                  <div className="h-px bg-border" />
                  <InfoBlock label="Testimonials" icon={Quote}>
                    <div className="space-y-3 mt-1">
                      {selected.testimonials.map((t, i) => (
                        <blockquote key={i} className="border-l-2 border-gold pl-4 py-1">
                          <p className="text-sm text-foreground italic leading-relaxed">"{t.quote}"</p>
                          <footer className="text-[11px] text-muted-foreground mt-1 font-semibold not-italic">{t.name} · {t.year}</footer>
                        </blockquote>
                      ))}
                    </div>
                  </InfoBlock>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FellowshipsPage;
