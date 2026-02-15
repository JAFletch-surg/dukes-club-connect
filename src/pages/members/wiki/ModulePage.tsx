import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, AlertCircle, Scissors, ChevronRight, Search,
  FileText, ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getModuleBySlug, getTopicsByModule, wikiArticles, moduleColors, emergencySubgroups,
  getGuidelinesByTopic,
  WikiTopic,
} from "@/data/wikiMockData";
import { moduleIcons } from "@/data/wikiIcons";
import { cn } from "@/lib/utils";

const ModulePage = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const module = getModuleBySlug(moduleSlug || "");
  const [selectedSubgroup, setSelectedSubgroup] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Get unique subgroups for modules that have them
  const subgroups = isEmergency
    ? emergencySubgroups.filter(sg => topics.some(t => t.subgroup === sg))
    : [];

  const hasSubgroups = subgroups.length > 0;

  // Filter topics based on selected subgroup
  const filteredTopics = hasSubgroups && selectedSubgroup
    ? topics.filter(t => t.subgroup === selectedSubgroup)
    : hasSubgroups
      ? [] // show nothing until a subgroup is selected
      : topics;

  // Apply search filter
  const searchedTopics = searchQuery
    ? topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredTopics;

  // Get articles for selected topic
  const selectedArticles = selectedTopic
    ? wikiArticles.filter(a => a.topicSlug === selectedTopic.slug && a.moduleSlug === module.slug)
    : [];

  const selectedGuidelines = selectedTopic
    ? getGuidelinesByTopic(selectedTopic.slug)
    : [];

  const handleSubgroupClick = (sg: string) => {
    setSelectedSubgroup(sg === selectedSubgroup ? null : sg);
    setSelectedTopicId(null);
    setSearchQuery("");
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(topicId === selectedTopicId ? null : topicId);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      {/* Compact Module Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-border">
        {iconSrc ? (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border bg-card" style={{ borderColor: `${color}30` }}>
            <img src={iconSrc} alt={module.title} className="w-7 h-7 object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
            <BookOpen size={18} style={{ color }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-bold text-foreground">{module.title}</h1>
            <Badge variant="outline" className="text-[10px] rounded-full font-semibold" style={{ borderColor: `${color}40`, color }}>{module.phase}</Badge>
            {criticalCount > 0 && (
              <Badge className="bg-wiki-critical/10 text-wiki-critical text-[10px] rounded-full border-0">{criticalCount} critical</Badge>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>{module.topicCount} topics</span>
            <span>·</span>
            <span>{totalArticles} articles</span>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Progress value={readPercent} className="h-1.5 w-20 [&>div]:bg-gold [&>div]:rounded-full" />
              <span className="font-semibold">{readPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={`Search topics in ${module.title}...`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) {
              setSelectedSubgroup(null);
              setSelectedTopicId(null);
            }
          }}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Cascading Column Layout */}
      <div className="flex border border-border rounded-xl overflow-hidden bg-card min-h-[500px]">
        {/* Column 1: Subgroups (only for modules with subgroups) */}
        {hasSubgroups && !searchQuery && (
          <div className="w-[220px] shrink-0 border-r border-border overflow-y-auto">
            <div className="px-3 py-2.5 border-b border-border bg-muted/30">
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Categories</p>
            </div>
            <div className="py-1">
              {subgroups.map(sg => {
                const sgTopics = topics.filter(t => t.subgroup === sg);
                const sgCritical = sgTopics.filter(t => t.is_critical).length;
                const isActive = selectedSubgroup === sg;
                return (
                  <button
                    key={sg}
                    onClick={() => handleSubgroupClick(sg)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 flex items-center gap-2 text-sm transition-colors",
                      isActive
                        ? "text-card font-semibold"
                        : "text-foreground hover:bg-muted/50"
                    )}
                    style={isActive ? { backgroundColor: color, color: 'white' } : {}}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{sg}</span>
                      {sgCritical > 0 && !isActive && (
                        <span className="text-[10px] text-wiki-critical font-medium">{sgCritical} critical</span>
                      )}
                    </div>
                    <ChevronRight size={14} className={cn("shrink-0 opacity-50", isActive && "opacity-100")} />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Column 2: Topics */}
        <div className={cn(
          "shrink-0 border-r border-border overflow-y-auto",
          hasSubgroups && !searchQuery ? "w-[260px]" : "w-[300px]"
        )}>
          <div className="px-3 py-2.5 border-b border-border bg-muted/30">
            <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
              {searchQuery ? `Results (${searchedTopics.length})` : "Topics"}
            </p>
          </div>
          <div className="py-1">
            {searchedTopics.length > 0 ? (
              searchedTopics.map(topic => {
                const isActive = selectedTopicId === topic.id;
                const readStatus = topic.readCount === 0 ? "none" : topic.readCount >= topic.articleCount ? "all" : "partial";
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 flex items-center gap-2 transition-colors",
                      isActive
                        ? "text-card font-semibold"
                        : "text-foreground hover:bg-muted/50"
                    )}
                    style={isActive ? { backgroundColor: color, color: 'white' } : {}}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          "w-2 h-2 rounded-full shrink-0",
                          readStatus === "all" ? "bg-wiki-read" : readStatus === "partial" ? "bg-wiki-stale" : "bg-muted-foreground/30"
                        )} />
                        <span className="text-sm truncate">{topic.title}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 ml-3.5">
                        {topic.is_critical && (
                          <Badge className={cn(
                            "text-[9px] px-1 py-0 rounded-full border-0",
                            isActive ? "bg-card/20 text-card" : "bg-wiki-critical/10 text-wiki-critical"
                          )}>CRITICAL</Badge>
                        )}
                        {topic.indexProcedures.length > 0 && (
                          <Badge className={cn(
                            "text-[9px] px-1 py-0 rounded-full border-0",
                            isActive ? "bg-card/20 text-card" : "bg-wiki-index/10 text-wiki-index"
                          )}>INDEX</Badge>
                        )}
                        <span className={cn("text-[10px]", isActive ? "text-card/70" : "text-muted-foreground")}>
                          {topic.articleCount} articles
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className={cn("shrink-0 opacity-50", isActive && "opacity-100")} />
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <p className="text-sm">
                  {hasSubgroups && !selectedSubgroup && !searchQuery
                    ? "Select a category to view topics"
                    : "No topics found"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Topic Detail / Articles */}
        <div className="flex-1 overflow-y-auto">
          {selectedTopic ? (
            <div>
              {/* Topic header */}
              <div className="px-5 py-4 border-b border-border" style={{ backgroundColor: `${color}08` }}>
                <div className="flex items-center gap-2 mb-1">
                  {selectedTopic.is_critical && <Badge className="bg-wiki-critical text-card text-[9px] px-1.5 rounded-full border-0">CRITICAL</Badge>}
                  {selectedTopic.phase_tags.map(pt => (
                    <Badge key={pt} variant="outline" className="text-[9px] rounded-full">{pt}</Badge>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-foreground">{selectedTopic.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{selectedTopic.description}</p>
              </div>

              <div className="p-5 space-y-5">
                {/* Critical condition callout */}
                {selectedTopic.is_critical && (
                  <div className="border-l-4 border-l-wiki-critical bg-wiki-critical-bg rounded-r-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertCircle size={14} className="text-wiki-critical" />
                      <span className="text-xs font-bold text-wiki-critical">Critical Condition</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{selectedTopic.critical_label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selectedTopic.critical_assessment_note}</p>
                  </div>
                )}

                {/* Index procedures */}
                {selectedTopic.indexProcedures.length > 0 && (
                  <div className="border-l-4 border-l-wiki-index bg-wiki-index-bg rounded-r-lg p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Scissors size={14} className="text-wiki-index" />
                      <span className="text-xs font-bold text-wiki-index">Index Procedures</span>
                    </div>
                    <ul className="space-y-1">
                      {selectedTopic.indexProcedures.map(ip => (
                        <li key={ip.id} className="text-sm text-foreground flex items-start gap-2">
                          <span className="text-wiki-index mt-0.5">•</span>
                          <div>
                            <span>{ip.procedure_name}</span>
                            {ip.pba_level && <span className="text-[10px] text-muted-foreground ml-1.5">({ip.pba_level})</span>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Articles list */}
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
                    Articles ({selectedArticles.length})
                  </h3>
                  {selectedArticles.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedArticles.map(article => (
                        <Link
                          key={article.id}
                          to={`/members/wiki/${module.slug}/${selectedTopic.slug}/${article.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{article.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                              <DepthBadge depth={article.depth} />
                              <span>{article.estimated_read_minutes} min</span>
                              <span>·</span>
                              <span>{article.author.name}</span>
                            </div>
                          </div>
                          {article.isRead && <span className="text-wiki-read text-xs bg-wiki-read/10 px-1.5 py-0.5 rounded-full">✓</span>}
                          <ChevronRight size={14} className="text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link to={`/members/wiki/${module.slug}/${selectedTopic.slug}`} className="block">
                      <div className="p-4 rounded-lg border border-dashed border-border text-center hover:bg-muted/30 transition-colors">
                        <p className="text-sm text-muted-foreground">View all content for this topic</p>
                        <span className="text-xs text-primary font-medium mt-1 inline-block">Browse Topic →</span>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Guidelines */}
                {selectedGuidelines.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
                      Guidelines ({selectedGuidelines.length})
                    </h3>
                    <div className="space-y-1.5">
                      {selectedGuidelines.map(g => (
                        <a
                          key={g.id}
                          href={g.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                        >
                          <FileText size={14} className={g.type === "uploaded_pdf" ? "text-destructive shrink-0" : "text-primary shrink-0"} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">{g.title}</p>
                            <p className="text-[10px] text-muted-foreground">{g.publisher} · {g.year}</p>
                          </div>
                          <ExternalLink size={10} className="text-muted-foreground shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question bank link */}
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    8 questions available → <Link to="/members/questions" className="text-primary font-semibold hover:underline">Test yourself</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <BookOpen size={20} className="text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Select a topic</h3>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  {hasSubgroups
                    ? "Choose a category, then a topic to see articles and details"
                    : "Click on a topic to see its articles and details"
                  }
                </p>
                <div className="flex items-center gap-3 justify-center mt-4 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1"><Badge className="bg-wiki-critical text-card text-[8px] px-1 py-0 rounded-full border-0">CRITICAL</Badge> Must-know</div>
                  <div className="flex items-center gap-1"><Badge className="bg-wiki-index text-card text-[8px] px-1 py-0 rounded-full border-0">INDEX</Badge> PBA-assessed</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
