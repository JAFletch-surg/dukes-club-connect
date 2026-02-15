import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, BookOpen, AlertCircle, Scissors, Flame, ArrowUp } from "lucide-react";
import { wikiModules, criticalConditions, mockRecentReads, moduleColors, mockWikiPreferences } from "@/data/wikiMockData";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ProgressPage = () => {
  const criticalRead = criticalConditions.filter(c => c.isRead).length;
  const totalCritical = criticalConditions.length;

  const statCards = [
    { label: "Articles Read", value: "23 / 200", percent: 11.5, icon: BookOpen, color: "text-foreground" },
    { label: "Critical Conditions", value: `${criticalRead} / ${totalCritical}`, percent: (criticalRead / totalCritical) * 100, icon: AlertCircle, color: "text-wiki-critical" },
    { label: "Index Procedures", value: "12 / 80", percent: 15, icon: Scissors, color: "text-wiki-index" },
    { label: "Revision Streak", value: "5 days", percent: 100, icon: Flame, color: "text-gold", isStreak: true },
  ];

  const relevantModules = wikiModules.filter(m =>
    ["elective-general-surgery", "emergency-general-surgery", "trauma", "colorectal", "gsoc", "cross-cutting"].includes(m.slug)
  );

  // Heatmap data — simplified representation
  const allTopicSlugs = wikiModules.flatMap(m => {
    const count = m.topicCount;
    return Array.from({ length: count }, (_, i) => ({
      module: m.title,
      moduleSlug: m.slug,
      color: m.readPercent > 0 && Math.random() < m.readPercent / 100
        ? (Math.random() > 0.5 ? "read" : "stale")
        : "unread",
    }));
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Progress</span>
      </nav>

      <h1 className="text-xl font-bold text-foreground">My Progress</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <Card key={stat.label} className="border">
            <CardContent className="p-4">
              <stat.icon size={18} className={cn(stat.color, "mb-2")} />
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</p>
              {!stat.isStreak && <Progress value={stat.percent} className="h-1.5 mt-2 [&>div]:bg-gold" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pathway Progress */}
      <Card className="border">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-wiki-phase2 text-card">Phase 2</Badge>
            <span className="text-sm font-semibold text-foreground">Your Pathway</span>
          </div>
          <div className="space-y-3">
            {relevantModules.map(mod => (
              <div key={mod.id} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: moduleColors[mod.slug] }} />
                <span className="text-xs text-foreground w-48 truncate">{mod.title}</span>
                <Progress value={mod.readPercent} className="h-1.5 flex-1 [&>div]:bg-gold" />
                <span className="text-[11px] text-muted-foreground w-8 text-right">{mod.readPercent}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Curriculum Heatmap */}
      <Card className="border">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Curriculum Coverage</h3>
          <div className="flex flex-wrap gap-1">
            {allTopicSlugs.map((t, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-4 h-4 rounded-sm cursor-pointer transition-colors",
                      t.color === "read" && "bg-wiki-read",
                      t.color === "stale" && "bg-wiki-stale",
                      t.color === "unread" && "bg-wiki-unread",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  <p>{t.module}</p>
                  <p className="text-muted-foreground capitalize">{t.color}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-wiki-read" /> Read (&lt;30d)</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-wiki-stale" /> Stale (&gt;30d)</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-wiki-unread" /> Unread</span>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {mockRecentReads.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.articleTitle}</p>
                  <p className="text-xs text-muted-foreground">{r.topicTitle} · {r.moduleTitle}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <Badge variant="outline" className="text-[9px]">{r.depth}</Badge>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{r.readAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="border">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">This week: 3 articles read, 2 topics started</p>
            <p className="text-xs text-muted-foreground">Last week: 2 articles</p>
          </div>
          <div className="flex items-center gap-1 text-wiki-read">
            <ArrowUp size={16} />
            <span className="text-sm font-semibold">↑ 50%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
