import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Scissors, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { getAllIndexProcedures, wikiModules, moduleColors } from "@/data/wikiMockData";

const IndexProceduresPage = () => {
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(wikiModules.map(m => m.id)));
  const allProcs = getAllIndexProcedures();

  const toggleModule = (id: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Group by module
  const grouped = wikiModules.map(mod => ({
    module: mod,
    procedures: allProcs.filter(p => p.moduleSlug === mod.slug),
  })).filter(g => g.procedures.length > 0);

  const totalProcTopics = new Set(allProcs.map(p => p.topic_id)).size;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Index Procedures</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Scissors size={20} className="text-wiki-index" />
          <h1 className="text-xl font-bold text-foreground">Index Procedures</h1>
        </div>
        <p className="text-sm text-muted-foreground">PBA-assessed operative procedures central to safe patient care</p>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={(12 / totalProcTopics) * 100} className="h-2.5 flex-1 max-w-xs [&>div]:bg-wiki-index" />
          <span className="text-sm font-semibold text-foreground">12 of {totalProcTopics} procedure topics covered</span>
        </div>
      </div>

      {/* Phase filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {["all", "Phase 2", "Phase 3", "Certification"].map(f => (
          <Button
            key={f}
            variant={phaseFilter === f ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => setPhaseFilter(f)}
          >
            {f === "all" ? "All" : f}
          </Button>
        ))}
      </div>

      {/* Grouped list */}
      {grouped.map(({ module: mod, procedures }) => {
        const color = moduleColors[mod.slug] || "#4a5568";
        const isExpanded = expandedModules.has(mod.id);
        return (
          <div key={mod.id}>
            <button
              onClick={() => toggleModule(mod.id)}
              className="flex items-center gap-2 w-full text-left mb-2"
            >
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-sm font-semibold text-foreground">{mod.title}</span>
              <span className="text-xs text-muted-foreground">({procedures.length})</span>
              {isExpanded ? <ChevronUp size={14} className="ml-auto text-muted-foreground" /> : <ChevronDown size={14} className="ml-auto text-muted-foreground" />}
            </button>
            {isExpanded && (
              <div className="space-y-2 ml-5 mb-4">
                {procedures.map(proc => (
                  <Card key={proc.id} className="border" style={{ borderLeftWidth: "3px", borderLeftColor: color }}>
                    <CardContent className="p-3">
                      <p className="font-medium text-sm text-foreground">{proc.procedure_name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Topic: {proc.topicTitle}</p>
                      {proc.pba_level && <p className="text-xs text-muted-foreground">PBA Level: {proc.pba_level}</p>}
                      {(proc.indicative_numbers_phase2 || proc.indicative_numbers_cert) && (
                        <p className="text-xs text-muted-foreground">
                          Indicative: {proc.indicative_numbers_phase2 && `${proc.indicative_numbers_phase2} (Phase 2)`}{proc.indicative_numbers_cert && ` / ${proc.indicative_numbers_cert} (Cert)`}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Link to={`/members/wiki/${proc.moduleSlug}/${proc.topicSlug}`}>
                          <Button variant="outline" size="sm" className="h-6 text-[10px]">Read Article →</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default IndexProceduresPage;
