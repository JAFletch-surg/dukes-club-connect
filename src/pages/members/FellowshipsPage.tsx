import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Clock, Search, Users, Briefcase } from "lucide-react";
import { mockFellowships } from "@/data/mockMembersData";

type Fellowship = typeof mockFellowships[0];

const FellowshipsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "UK" | "International">("All");
  const [selected, setSelected] = useState<Fellowship | null>(null);

  const filtered = mockFellowships.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || f.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Fellowship Database</h1>
        <p className="text-muted-foreground mt-1">Explore colorectal surgery fellowship opportunities</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          {(["All", "UK", "International"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                typeFilter === type ? "bg-navy text-navy-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((fellowship) => (
          <Card key={fellowship.id} className="border hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(fellowship)}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-foreground pr-2">{fellowship.title}</h3>
                <Badge variant={fellowship.type === "UK" ? "default" : "secondary"} className="text-[10px] shrink-0">
                  {fellowship.type}
                </Badge>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5"><MapPin size={12} /> {fellowship.location}</p>
                <p className="flex items-center gap-1.5"><Clock size={12} /> {fellowship.duration}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{fellowship.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{selected.title}</DialogTitle>
                  <Badge variant={selected.type === "UK" ? "default" : "secondary"}>{selected.type}</Badge>
                </div>
                <DialogDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {selected.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {selected.duration}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <p className="text-sm text-foreground leading-relaxed">{selected.fullDescription}</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Supervisors</p>
                    <p className="text-sm text-foreground">{selected.supervisors.join(", ")}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Operative Volume</p>
                    <p className="text-sm text-foreground">{selected.operativeVolume.major} major / {selected.operativeVolume.minor} minor per year</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">On-Call</p>
                    <p className="text-sm text-foreground">{selected.onCall}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Salary</p>
                    <p className="text-sm text-foreground">{selected.salary}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Prerequisites</p>
                  <p className="text-sm text-foreground">{selected.prerequisites}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Application Process</p>
                  <p className="text-sm text-foreground">{selected.applicationProcess}</p>
                </div>

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
