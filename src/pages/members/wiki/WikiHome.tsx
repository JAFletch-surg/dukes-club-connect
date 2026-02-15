import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowRight, BookOpen, AlertCircle, Sparkles, TrendingUp,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { wikiModules, mockWikiPreferences, mockRecentReads, criticalConditions, moduleColors } from "@/data/wikiMockData";
import { cn } from "@/lib/utils";

const WikiHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOtherModules, setShowOtherModules] = useState(false);

  const criticalRead = criticalConditions.filter(c => c.isRead).length;
  const totalCritical = criticalConditions.length;
  const totalArticlesRead = 23;
  const totalArticles = 200;

  // Phase 2 relevant modules (simplified)
  const relevantModuleSlugs = ["elective-general-surgery", "emergency-general-surgery", "trauma", "colorectal", "gsoc", "cross-cutting"];
  const relevantModules = wikiModules.filter(m => relevantModuleSlugs.includes(m.slug));
  const otherModules = wikiModules.filter(m => !relevantModuleSlugs.includes(m.slug));

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search topics, conditions, procedures or articles..."
          className="pl-12 h-12 text-base bg-card border-border"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Smart Entry Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Continue Revising */}
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-gold" />
              <h3 className="font-semibold text-foreground text-sm">Continue Revising</h3>
            </div>
            <div className="space-y-2.5">
              {mockRecentReads.slice(0, 3).map((r, i) => (
                <div key={i} className="text-sm">
                  <p className="text-xs text-muted-foreground">{r.moduleTitle}</p>
                  <p className="font-medium text-foreground truncate">{r.articleTitle}</p>
                  <p className="text-xs text-muted-foreground">{r.readAt}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">You've read 3 articles this week</p>
          </CardContent>
        </Card>

        {/* Exam Focus */}
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-wiki-critical" />
              <h3 className="font-semibold text-foreground text-sm">Exam Focus</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Critical Conditions</span>
                  <span className="font-semibold text-wiki-critical">{criticalRead} of {totalCritical}</span>
                </div>
                <Progress value={(criticalRead / totalCritical) * 100} className="h-2 [&>div]:bg-wiki-critical" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Index Procedures</span>
                  <span className="font-semibold text-wiki-index">12 of 80</span>
                </div>
                <Progress value={(12 / 80) * 100} className="h-2 [&>div]:bg-wiki-index" />
              </div>
            </div>
            <Link to="/members/wiki/critical-conditions" className="text-xs text-primary font-medium hover:underline mt-3 inline-block">
              View Checklist →
            </Link>
          </CardContent>
        </Card>

        {/* New & Popular */}
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-primary" />
              <h3 className="font-semibold text-foreground text-sm">New & Popular</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Badge className="bg-wiki-index text-card text-[10px] px-1.5 py-0">NEW</Badge>
                  <span className="text-xs text-muted-foreground">5 Feb 2026</span>
                </div>
                <p className="text-sm font-medium text-foreground">Paediatric Appendicitis: Special Considerations</p>
                <p className="text-xs text-muted-foreground">Dr Sarah Chen</p>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-0.5">Most read this month</p>
                <p className="text-sm font-medium text-foreground">Acute Appendicitis: Diagnosis & Management</p>
                <p className="text-xs text-muted-foreground">142 reads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Pathway */}
      <Card className="border bg-card">
        <CardContent className="p-5 flex flex-wrap items-center gap-4">
          <Badge className="bg-wiki-phase2 text-card">Phase 2</Badge>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Your pathway progress</span>
              <span className="font-semibold text-foreground">34%</span>
            </div>
            <Progress value={34} className="h-2 [&>div]:bg-gold" />
          </div>
          <Button variant="ghost" size="sm" className="text-xs">Edit pathway</Button>
        </CardContent>
      </Card>

      {/* Your Modules */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground tracking-widest mb-3">YOUR MODULES</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relevantModules.map(mod => (
            <ModuleCard key={mod.id} module={mod} />
          ))}
        </div>
      </div>

      {/* Other Modules */}
      <div>
        <button
          onClick={() => setShowOtherModules(!showOtherModules)}
          className="flex items-center gap-2 text-xs font-semibold text-muted-foreground tracking-widest mb-3 hover:text-foreground transition-colors"
        >
          OTHER MODULES
          {showOtherModules ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {showOtherModules && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherModules.map(mod => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ModuleCard = ({ module }: { module: typeof wikiModules[0] }) => {
  const color = moduleColors[module.slug] || "#4a5568";
  return (
    <Link to={`/members/wiki/${module.slug}`}>
      <Card className="border hover:shadow-md transition-all duration-200 group h-full" style={{ borderLeftWidth: "4px", borderLeftColor: color }}>
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
              <BookOpen size={16} style={{ color }} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{module.title}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{module.phase}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{module.description}</p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2">
            <span>{module.topicCount} topics</span>
            <span>·</span>
            {module.criticalCount > 0 && (<><span className="text-wiki-critical font-medium">{module.criticalCount} critical</span><span>·</span></>)}
            <span>{module.articleCount} articles</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={module.readPercent} className="h-1.5 flex-1 [&>div]:bg-gold" />
            <span className="text-[11px] font-medium text-muted-foreground">{module.readPercent}%</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WikiHome;
