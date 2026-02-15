import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Search, ArrowRight, BookOpen, AlertCircle, Sparkles, TrendingUp,
  ChevronDown, ChevronUp, Clock, Flame, GraduationCap,
} from "lucide-react";
import { wikiModules, mockWikiPreferences, mockRecentReads, criticalConditions, moduleColors } from "@/data/wikiMockData";
import { cn } from "@/lib/utils";

const WikiHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOtherModules, setShowOtherModules] = useState(false);

  const criticalRead = criticalConditions.filter(c => c.isRead).length;
  const totalCritical = criticalConditions.length;

  const relevantModuleSlugs = ["elective-general-surgery", "emergency-general-surgery", "trauma", "colorectal", "gsoc", "cross-cutting"];
  const relevantModules = wikiModules.filter(m => relevantModuleSlugs.includes(m.slug));
  const otherModules = wikiModules.filter(m => !relevantModuleSlugs.includes(m.slug));

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-navy p-6 sm:p-8">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 80% 20%, hsl(258 89% 66%), transparent 50%), radial-gradient(circle at 20% 80%, hsl(42 87% 55%), transparent 50%)" }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap size={20} className="text-gold" />
            <span className="text-gold text-sm font-semibold">Revision Wiki</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-foreground mb-2">Good morning, Alex 👋</h1>
          <p className="text-navy-foreground/70 text-sm max-w-xl">Pick up where you left off, or explore your curriculum modules below.</p>
          
          {/* Search */}
          <div className="relative mt-5 max-w-2xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-foreground/40" />
            <Input
              placeholder="Search topics, conditions, procedures or articles..."
              className="pl-11 h-12 text-sm bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/40 focus:bg-navy-foreground/15 focus:border-gold/50 rounded-xl"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded-md border border-navy-foreground/20 bg-navy-foreground/10 px-2 text-[10px] font-medium text-navy-foreground/50">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Smart Entry Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Continue Revising */}
        <Card className="group border bg-card hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-5 pt-4 pb-3 border-b border-border/50 bg-gold/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <BookOpen size={15} className="text-gold" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">Continue Revising</h3>
              </div>
            </div>
            <div className="px-5 py-4 space-y-3">
              {mockRecentReads.slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
                  <div className="w-1 h-8 rounded-full bg-gold/30 group-hover/item:bg-gold transition-colors shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-muted-foreground">{r.moduleTitle}</p>
                    <p className="font-medium text-sm text-foreground truncate group-hover/item:text-primary transition-colors">{r.articleTitle}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock size={10} />{r.readAt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Flame size={12} className="text-gold" />
                <span>You've read 3 articles this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Focus */}
        <Card className="group border bg-card hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-5 pt-4 pb-3 border-b border-border/50 bg-wiki-critical-bg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-wiki-critical/10 flex items-center justify-center">
                  <AlertCircle size={15} className="text-wiki-critical" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">Exam Focus</h3>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Critical Conditions</span>
                  <span className="font-bold text-wiki-critical">{criticalRead}/{totalCritical}</span>
                </div>
                <Progress value={(criticalRead / totalCritical) * 100} className="h-2.5 rounded-full [&>div]:bg-wiki-critical [&>div]:rounded-full" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Index Procedures</span>
                  <span className="font-bold text-wiki-index">12/80</span>
                </div>
                <Progress value={(12 / 80) * 100} className="h-2.5 rounded-full [&>div]:bg-wiki-index [&>div]:rounded-full" />
              </div>
            </div>
            <div className="px-5 pb-4">
              <Link to="/members/wiki/critical-conditions" className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1">
                View Checklist <ArrowRight size={12} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* New & Popular */}
        <Card className="group border bg-card hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="px-5 pt-4 pb-3 border-b border-border/50 bg-primary/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={15} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm">New & Popular</h3>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-wiki-index text-card text-[10px] px-1.5 py-0 rounded-full">NEW</Badge>
                  <span className="text-[11px] text-muted-foreground">5 Feb 2026</span>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug">Paediatric Appendicitis: Special Considerations</p>
                <p className="text-xs text-muted-foreground mt-0.5">Dr Sarah Chen</p>
              </div>
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles size={12} className="text-gold" />
                  <p className="text-[11px] text-muted-foreground font-medium">Most read this month</p>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug">Acute Appendicitis: Diagnosis & Management</p>
                <p className="text-xs text-muted-foreground mt-0.5">142 reads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Your Pathway */}
      <Card className="border bg-card rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center gap-4 px-5 py-4">
            <Badge className="bg-wiki-phase2 text-card rounded-full px-3 py-1 text-xs font-semibold">Phase 2</Badge>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-muted-foreground font-medium">Your pathway progress</span>
                <span className="font-bold text-foreground">34%</span>
              </div>
              <Progress value={34} className="h-2.5 rounded-full [&>div]:bg-gold [&>div]:rounded-full" />
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary">Edit pathway</Button>
          </div>
        </CardContent>
      </Card>

      {/* Your Modules */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-border" />
          <p className="text-xs font-semibold text-muted-foreground tracking-widest">YOUR MODULES</p>
          <div className="h-px flex-1 bg-border" />
        </div>
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
          className="flex items-center gap-2 w-full group"
        >
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold text-muted-foreground tracking-widest group-hover:text-foreground transition-colors flex items-center gap-1.5">
            OTHER MODULES
            {showOtherModules ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
          <div className="h-px flex-1 bg-border" />
        </button>
        {showOtherModules && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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
      <Card className="border hover:shadow-lg transition-all duration-300 group h-full rounded-xl overflow-hidden">
        {/* Colored top accent */}
        <div className="h-1" style={{ backgroundColor: color }} />
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `${color}12` }}>
              <BookOpen size={18} style={{ color }} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{module.title}</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">{module.phase}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{module.description}</p>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
            <span className="bg-muted/50 px-2 py-0.5 rounded-full">{module.topicCount} topics</span>
            {module.criticalCount > 0 && (
              <span className="bg-wiki-critical-bg text-wiki-critical px-2 py-0.5 rounded-full font-medium">{module.criticalCount} critical</span>
            )}
            <span className="bg-muted/50 px-2 py-0.5 rounded-full">{module.articleCount} articles</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={module.readPercent} className="h-2 flex-1 rounded-full [&>div]:bg-gold [&>div]:rounded-full" />
            <span className="text-[11px] font-bold text-muted-foreground">{module.readPercent}%</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WikiHome;
