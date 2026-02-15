import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, AlertCircle, Scissors, ArrowRight, ChevronRight, Bookmark,
} from "lucide-react";
import {
  getModuleBySlug, getTopicsByModule, wikiArticles, moduleColors, emergencySubgroups,
  WikiTopic,
} from "@/data/wikiMockData";
import { cn } from "@/lib/utils";

const ModulePage = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const module = getModuleBySlug(moduleSlug || "");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  if (!module) {
    return <div className="p-8 text-center text-muted-foreground">Module not found</div>;
  }

  const topics = getTopicsByModule(module.id);
  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  const color = moduleColors[module.slug] || "#4a5568";

  const isEmergency = module.slug === "emergency-general-surgery";
  const totalArticles = topics.reduce((s, t) => s + t.articleCount, 0);
  const totalRead = topics.reduce((s, t) => s + t.readCount, 0);
  const criticalCount = topics.filter(t => t.is_critical).length;

  // Group topics by subgroup for emergency
  const groupedTopics = isEmergency
    ? emergencySubgroups.map(sg => ({ subgroup: sg, topics: topics.filter(t => t.subgroup === sg) })).filter(g => g.topics.length > 0)
    : [{ subgroup: null, topics }];

  return (
    <div className="space-y-4 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      {/* Module Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
          <BookOpen size={18} style={{ color }} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{module.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-[10px]">{module.phase}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
            <span>{module.topicCount} topics</span>
            {criticalCount > 0 && <span className="text-wiki-critical font-medium">{criticalCount} critical</span>}
            <span>{totalArticles} articles</span>
            <span>{Math.round((totalRead / Math.max(totalArticles, 1)) * 100)}% read</span>
          </div>
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="flex gap-6 items-start">
        {/* Left: Topic List */}
        <div className="flex-1 min-w-0 space-y-4">
          {groupedTopics.map((group, gi) => (
            <div key={gi}>
              {group.subgroup && (
                <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2 mt-4">{group.subgroup}</p>
              )}
              <div className="space-y-1">
                {group.topics.map(topic => (
                  <TopicRow
                    key={topic.id}
                    topic={topic}
                    color={color}
                    isSelected={selectedTopicId === topic.id}
                    onSelect={() => setSelectedTopicId(topic.id === selectedTopicId ? null : topic.id)}
                    moduleSlug={module.slug}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Topic Detail (desktop only) */}
        <div className="hidden lg:block w-[380px] shrink-0 sticky top-4">
          {selectedTopic ? (
            <TopicDetail topic={selectedTopic} color={color} moduleSlug={module.slug} moduleTitle={module.title} />
          ) : (
            <Card className="border">
              <CardContent className="p-8 text-center">
                <BookOpen size={32} className="mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Select a Topic</h3>
                <p className="text-xs text-muted-foreground">Click on a topic to see details, articles and index procedures</p>
                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground text-left">
                  <div className="flex items-center gap-2"><Badge className="bg-wiki-critical text-card text-[9px] px-1.5">CRITICAL</Badge> Misdiagnosis → devastating consequences</div>
                  <div className="flex items-center gap-2"><Badge className="bg-wiki-index text-card text-[9px] px-1.5">INDEX</Badge> PBA-assessed competency</div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const TopicRow = ({ topic, color, isSelected, onSelect, moduleSlug }: { topic: WikiTopic; color: string; isSelected: boolean; onSelect: () => void; moduleSlug: string }) => {
  const readStatus = topic.readCount === 0 ? "none" : topic.readCount >= topic.articleCount ? "all" : "partial";
  return (
    <div>
      <button
        onClick={onSelect}
        className={cn(
          "w-full text-left p-3 rounded-lg border transition-all duration-200",
          isSelected
            ? "border-l-[3px] bg-muted/30"
            : "border-transparent hover:bg-muted/20"
        )}
        style={isSelected ? { borderLeftColor: color } : {}}
      >
        <div className="flex items-start gap-2">
          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm text-foreground">{topic.title}</span>
              {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[9px] px-1.5 py-0">CRITICAL</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{topic.description}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
              <span>{topic.articleCount} articles</span>
              {topic.indexProcedures.length > 0 && <span>{topic.indexProcedures.length} index procs</span>}
              <span className={cn(
                "font-medium",
                readStatus === "all" ? "text-wiki-read" : readStatus === "partial" ? "text-wiki-stale" : "text-wiki-unread"
              )}>
                {readStatus === "none" ? "○ Not started" : `✓ ${topic.readCount}/${topic.articleCount} read`}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className="text-muted-foreground mt-1 shrink-0" />
        </div>
      </button>
      {/* Mobile: show inline detail when selected */}
      {isSelected && (
        <div className="lg:hidden mt-1">
          <TopicDetail topic={topic} color={color} moduleSlug={moduleSlug} moduleTitle="" />
        </div>
      )}
    </div>
  );
};

const TopicDetail = ({ topic, color, moduleSlug, moduleTitle }: { topic: WikiTopic; color: string; moduleSlug: string; moduleTitle: string }) => {
  const articles = wikiArticles.filter(a => a.topicSlug === topic.slug && a.moduleSlug === moduleSlug);

  return (
    <Card className="border overflow-hidden">
      {/* Header */}
      <div className="p-4" style={{ backgroundColor: color }}>
        <p className="text-[10px] uppercase tracking-widest text-card/70">{moduleTitle}</p>
        <h3 className="text-lg font-bold text-card mt-0.5">{topic.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          {topic.is_critical && <Badge className="bg-card/20 text-card text-[9px] border-0">CRITICAL</Badge>}
          <Badge className="bg-card/20 text-card text-[9px] border-0">{topic.phase_tags[0]}</Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">{topic.description}</p>

        {/* Critical box */}
        {topic.is_critical && (
          <div className="border-l-4 border-l-wiki-critical bg-wiki-critical-bg rounded-r-lg p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle size={14} className="text-wiki-critical" />
              <span className="text-xs font-semibold text-wiki-critical">Critical Condition</span>
            </div>
            <p className="text-sm font-medium text-foreground">{topic.critical_label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{topic.critical_assessment_note}</p>
          </div>
        )}

        {/* Index Procedures */}
        {topic.indexProcedures.length > 0 && (
          <div className="border-l-4 border-l-wiki-index bg-wiki-index-bg rounded-r-lg p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Scissors size={14} className="text-wiki-index" />
              <span className="text-xs font-semibold text-wiki-index">Index Procedures</span>
            </div>
            <ul className="space-y-1">
              {topic.indexProcedures.map(ip => (
                <li key={ip.id} className="text-sm text-foreground flex items-start gap-1.5">
                  <span className="text-muted-foreground">•</span>
                  <span>{ip.procedure_name}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground mt-1.5">Requires ≥3 PBAs to specified level</p>
          </div>
        )}

        {/* Articles */}
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">Articles in This Topic</h4>
          {articles.length > 0 ? (
            <div className="space-y-2">
              {articles.map(article => (
                <Link
                  key={article.id}
                  to={`/members/wiki/${moduleSlug}/${topic.slug}/${article.slug}`}
                  className="block p-2.5 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{article.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                        <DepthBadge depth={article.depth} />
                        <span>{article.author.name}</span>
                        <span>·</span>
                        <span>{article.estimated_read_minutes} min</span>
                      </div>
                    </div>
                    {article.isRead && <span className="text-wiki-read text-xs">✓</span>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link
              to={`/members/wiki/${moduleSlug}/${topic.slug}`}
              className="block"
            >
              <Button variant="outline" size="sm" className="w-full text-xs">
                View Topic <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          )}
        </div>

        {/* Cross-references */}
        <div className="pt-2 border-t border-border space-y-1.5">
          <p className="text-xs text-muted-foreground">8 questions available → <Link to="/members/questions" className="text-primary hover:underline">Test yourself</Link></p>
        </div>
      </CardContent>
    </Card>
  );
};

const DepthBadge = ({ depth }: { depth: string }) => {
  const config = {
    quick: { label: "Quick Review", className: "bg-wiki-read/10 text-wiki-read" },
    core: { label: "Core Topic", className: "bg-wiki-phase2/10 text-wiki-phase2" },
    deep: { label: "Deep Dive", className: "bg-primary/10 text-primary" },
  };
  const c = config[depth as keyof typeof config] || config.core;
  return <Badge className={cn("text-[9px] px-1.5 py-0 border-0", c.className)}>{c.label}</Badge>;
};

export default ModulePage;
