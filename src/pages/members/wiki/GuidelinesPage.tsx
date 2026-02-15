import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChevronRight, Search, FileText, ExternalLink, Upload, Filter,
} from "lucide-react";
import {
  wikiGuidelines, wikiModules, guidelinePublishers, WikiGuideline,
} from "@/data/wikiMockData";

const GuidelinesPage = () => {
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [publisherFilter, setPublisherFilter] = useState("all");

  const filtered = useMemo(() => {
    return wikiGuidelines.filter(g => {
      const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.publisher.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchModule = moduleFilter === "all" || g.moduleSlug === moduleFilter;
      const matchPublisher = publisherFilter === "all" || g.publisher === publisherFilter;
      return matchSearch && matchModule && matchPublisher;
    });
  }, [search, moduleFilter, publisherFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, WikiGuideline[]>();
    filtered.forEach(g => {
      const mod = wikiModules.find(m => m.slug === g.moduleSlug);
      const key = mod?.title || g.moduleSlug;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(g);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Guidelines Library</span>
      </nav>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-navy p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center shrink-0">
            <FileText size={24} className="text-gold" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-navy-foreground">Guidelines Library</h1>
            <p className="text-sm text-navy-foreground/70 mt-1 max-w-2xl">
              Key clinical guidelines linked to the curriculum. Browse by module, publisher, or search by keyword.
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs">
              <Badge className="bg-navy-foreground/10 text-navy-foreground border-0 rounded-full">{wikiGuidelines.length} guidelines</Badge>
              <Badge className="bg-navy-foreground/10 text-navy-foreground border-0 rounded-full">{guidelinePublishers.length} publishers</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search guidelines by title, publisher or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger className="w-[180px] h-10 rounded-xl text-xs">
              <Filter size={12} className="mr-1.5" />
              <SelectValue placeholder="All modules" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modules</SelectItem>
              {wikiModules.map(m => (
                <SelectItem key={m.slug} value={m.slug}>{m.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={publisherFilter} onValueChange={setPublisherFilter}>
            <SelectTrigger className="w-[140px] h-10 rounded-xl text-xs">
              <SelectValue placeholder="All publishers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All publishers</SelectItem>
              {guidelinePublishers.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Upload hint */}
      <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border bg-muted/20">
        <Upload size={16} className="text-muted-foreground shrink-0" />
        <p className="text-xs text-muted-foreground">
          Admin: Upload PDF guidelines or link external URLs via the <strong>Add Guideline</strong> button below.
        </p>
        <Button variant="outline" size="sm" className="ml-auto h-7 text-[11px] rounded-lg shrink-0">
          <Upload size={12} className="mr-1" /> Add Guideline
        </Button>
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <Card className="border rounded-xl">
          <CardContent className="p-8 text-center">
            <FileText size={32} className="mx-auto text-muted-foreground/30 mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No guidelines found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(([moduleName, guidelines]) => (
            <div key={moduleName}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h2 className="text-sm font-bold text-foreground">{moduleName}</h2>
                <span className="text-xs text-muted-foreground">({guidelines.length})</span>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <div className="space-y-2">
                {guidelines.map(g => (
                  <GuidelineCard key={g.id} guideline={g} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const GuidelineCard = ({ guideline: g }: { guideline: WikiGuideline }) => {
  const isPdf = g.type === "uploaded_pdf";
  return (
    <a
      href={g.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPdf ? "bg-destructive/10" : "bg-primary/10"}`}>
          {isPdf ? <FileText size={18} className="text-destructive" /> : <ExternalLink size={18} className="text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{g.title}</h3>
            <Badge variant="outline" className="text-[9px] px-1.5 py-0 rounded-full">{g.year}</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{g.publisher}</p>
          {g.summary && <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">{g.summary}</p>}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {g.tags.map(tag => (
              <Badge key={tag} className="text-[9px] px-1.5 py-0 bg-muted/50 text-muted-foreground border-0 rounded-full">{tag}</Badge>
            ))}
            <Badge className={`text-[9px] px-1.5 py-0 border-0 rounded-full ${isPdf ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
              {isPdf ? "PDF" : "External Link"}
            </Badge>
          </div>
        </div>
        <ExternalLink size={14} className="text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
      </div>
    </a>
  );
};

export default GuidelinesPage;
