import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen, AlertCircle, Scissors, ArrowRight, ChevronRight, Bookmark,
  Plus, FileText,
} from "lucide-react";
import {
  getModuleBySlug, getTopicsByModule, wikiArticles, moduleColors, emergencySubgroups,
  WikiTopic,
} from "@/data/wikiMockData";
import { moduleIcons } from "@/data/wikiIcons";
import { cn } from "@/lib/utils";

const ModulePage = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const module = getModuleBySlug(moduleSlug || "");
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [showAddArticle, setShowAddArticle] = useState(false);

  if (!module) {
    return <div className="p-8 text-center text-muted-foreground">Module not found</div>;
  }

  const topics = getTopicsByModule(module.id);
  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  const color = moduleColors[module.slug] || "#4a5568";
  const iconSrc = moduleIcons[module.slug];

  const isEmergency = module.slug === "emergency-general-surgery";
  const totalArticles = topics.reduce((s, t) => s + t.articleCount, 0);
  const totalRead = topics.reduce((s, t) => s + t.readCount, 0);
  const criticalCount = topics.filter(t => t.is_critical).length;
  const readPercent = Math.round((totalRead / Math.max(totalArticles, 1)) * 100);

  const groupedTopics = isEmergency
    ? emergencySubgroups.map(sg => ({ subgroup: sg, topics: topics.filter(t => t.subgroup === sg) })).filter(g => g.topics.length > 0)
    : [{ subgroup: null, topics }];

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      {/* Module Header — enhanced with illustration */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
        <div className="relative p-6 sm:p-8" style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}>
          {/* Subtle pattern overlay */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.04]" style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }} />
          
          <div className="relative flex items-start gap-5">
            {/* Module icon */}
            {iconSrc ? (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 border-2 bg-card shadow-sm" style={{ borderColor: `${color}30` }}>
                <img src={iconSrc} alt={module.title} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
              </div>
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: `${color}18` }}>
                <BookOpen size={28} style={{ color }} />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge variant="outline" className="text-[10px] rounded-full font-semibold" style={{ borderColor: `${color}40`, color }}>{module.phase}</Badge>
                {criticalCount > 0 && (
                  <Badge className="bg-wiki-critical/10 text-wiki-critical text-[10px] rounded-full border-0">{criticalCount} critical conditions</Badge>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">{module.title}</h1>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">{module.description}</p>
              
              {/* Stats row */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="bg-card px-3 py-1.5 rounded-full border border-border font-medium shadow-sm">{module.topicCount} topics</span>
                  <span className="bg-card px-3 py-1.5 rounded-full border border-border font-medium shadow-sm">{totalArticles} articles</span>
                </div>
                <div className="flex items-center gap-2 min-w-[160px] bg-card px-3 py-1.5 rounded-full border border-border shadow-sm">
                  <Progress value={readPercent} className="h-2 flex-1 rounded-full [&>div]:bg-gold [&>div]:rounded-full" />
                  <span className="text-xs font-bold text-muted-foreground">{readPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="flex gap-6 items-start">
        {/* Left: Topic List */}
        <div className="flex-1 min-w-0 space-y-5">
          {groupedTopics.map((group, gi) => (
            <div key={gi}>
              {group.subgroup && (
                <div className="flex items-center gap-2 mb-2.5 mt-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">{group.subgroup}</p>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
              )}
              <div className="space-y-1.5">
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
            <Card className="border rounded-xl bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} className="text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">Select a Topic</h3>
                <p className="text-xs text-muted-foreground mb-5">Click on a topic to see details, articles and index procedures</p>
                <div className="space-y-2 text-xs text-muted-foreground text-left bg-muted/20 rounded-lg p-3">
                  <div className="flex items-center gap-2"><Badge className="bg-wiki-critical text-card text-[9px] px-1.5 rounded-full">CRITICAL</Badge> Misdiagnosis → devastating consequences</div>
                  <div className="flex items-center gap-2"><Badge className="bg-wiki-index text-card text-[9px] px-1.5 rounded-full">INDEX</Badge> PBA-assessed competency</div>
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
          "w-full text-left p-3.5 rounded-xl border transition-all duration-200",
          isSelected
            ? "border-l-[3px] bg-card shadow-sm"
            : "border-transparent hover:bg-card hover:shadow-sm"
        )}
        style={isSelected ? { borderLeftColor: color } : {}}
      >
        <div className="flex items-start gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 transition-transform" style={{ backgroundColor: color, transform: isSelected ? "scale(1.3)" : "scale(1)" }} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-foreground">{topic.title}</span>
              {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[9px] px-1.5 py-0 rounded-full">CRITICAL</Badge>}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{topic.description}</p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-muted-foreground flex-wrap">
              <span className="bg-muted/40 px-2 py-0.5 rounded-full">{topic.articleCount} articles</span>
              {topic.indexProcedures.length > 0 && <span className="bg-wiki-index-bg text-wiki-index px-2 py-0.5 rounded-full font-medium">{topic.indexProcedures.length} index procs</span>}
              <span className={cn(
                "font-medium px-2 py-0.5 rounded-full",
                readStatus === "all" ? "bg-wiki-read/10 text-wiki-read" : readStatus === "partial" ? "bg-wiki-stale/10 text-wiki-stale" : "bg-muted/40 text-muted-foreground"
              )}>
                {readStatus === "none" ? "○ Not started" : `✓ ${topic.readCount}/${topic.articleCount} read`}
              </span>
            </div>
          </div>
          <ChevronRight size={14} className={cn("text-muted-foreground mt-1 shrink-0 transition-transform", isSelected && "rotate-90")} />
        </div>
      </button>
      {isSelected && (
        <div className="lg:hidden mt-1.5">
          <TopicDetail topic={topic} color={color} moduleSlug={moduleSlug} moduleTitle="" />
        </div>
      )}
    </div>
  );
};

const TopicDetail = ({ topic, color, moduleSlug, moduleTitle }: { topic: WikiTopic; color: string; moduleSlug: string; moduleTitle: string }) => {
  const articles = wikiArticles.filter(a => a.topicSlug === topic.slug && a.moduleSlug === moduleSlug);
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <Card className="border rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-5 relative overflow-hidden" style={{ backgroundColor: color }}>
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 100% 0%, hsl(0 0% 100% / 0.3), transparent 60%)` }} />
        <div className="relative">
          {moduleTitle && <p className="text-[10px] uppercase tracking-widest text-card/60 font-medium">{moduleTitle}</p>}
          <h3 className="text-lg font-bold text-card mt-0.5">{topic.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            {topic.is_critical && <Badge className="bg-card/20 text-card text-[9px] border-0 rounded-full backdrop-blur-sm">CRITICAL</Badge>}
            <Badge className="bg-card/20 text-card text-[9px] border-0 rounded-full backdrop-blur-sm">{topic.phase_tags[0]}</Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>

        {topic.is_critical && (
          <div className="border-l-4 border-l-wiki-critical bg-wiki-critical-bg rounded-r-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle size={14} className="text-wiki-critical" />
              <span className="text-xs font-bold text-wiki-critical">Critical Condition</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{topic.critical_label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{topic.critical_assessment_note}</p>
          </div>
        )}

        {topic.indexProcedures.length > 0 && (
          <div className="border-l-4 border-l-wiki-index bg-wiki-index-bg rounded-r-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Scissors size={14} className="text-wiki-index" />
              <span className="text-xs font-bold text-wiki-index">Index Procedures</span>
            </div>
            <ul className="space-y-1.5">
              {topic.indexProcedures.map(ip => (
                <li key={ip.id} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-wiki-index mt-0.5">•</span>
                  <span>{ip.procedure_name}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground mt-2">Requires ≥3 PBAs to specified level</p>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Articles in This Topic</h4>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 text-[11px] gap-1 text-primary">
                  <Plus size={12} /> Add Article
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-lg">Add New Article</DialogTitle>
                  <p className="text-sm text-muted-foreground">Create a new article in <strong>{topic.title}</strong></p>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="article-title">Title</Label>
                    <Input id="article-title" placeholder="e.g. Acute Appendicitis: Diagnosis & Management" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="article-excerpt">Excerpt</Label>
                    <Textarea id="article-excerpt" placeholder="Brief summary for article cards..." rows={2} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Depth</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select depth" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">Quick Review (≤5 min)</SelectItem>
                          <SelectItem value="core">Core Topic (6-15 min)</SelectItem>
                          <SelectItem value="deep">Deep Dive (15+ min)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Key Points (one per line)</Label>
                    <Textarea placeholder="Enter key takeaways, one per line..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input placeholder="e.g. Emergency, Phase 2, Acute Abdomen" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={() => setShowAddDialog(false)} className="bg-navy text-navy-foreground hover:bg-navy/90">
                    <FileText size={14} className="mr-1.5" /> Create Article
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {articles.length > 0 ? (
            <div className="space-y-2">
              {articles.map(article => (
                <Link
                  key={article.id}
                  to={`/members/wiki/${moduleSlug}/${topic.slug}/${article.slug}`}
                  className="block p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group/article"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover/article:text-primary transition-colors">{article.title}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-muted-foreground">
                        <DepthBadge depth={article.depth} />
                        <span>{article.author.name}</span>
                        <span>·</span>
                        <span>{article.estimated_read_minutes} min</span>
                      </div>
                    </div>
                    {article.isRead && <span className="text-wiki-read text-xs bg-wiki-read/10 px-1.5 py-0.5 rounded-full">✓</span>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Link to={`/members/wiki/${moduleSlug}/${topic.slug}`} className="block">
              <Button variant="outline" size="sm" className="w-full text-xs rounded-lg">
                View Topic <ArrowRight size={12} className="ml-1" />
              </Button>
            </Link>
          )}
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">8 questions available → <Link to="/members/questions" className="text-primary font-semibold hover:underline">Test yourself</Link></p>
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
  return <Badge className={cn("text-[9px] px-1.5 py-0 border-0 rounded-full", c.className)}>{c.label}</Badge>;
};

export default ModulePage;
