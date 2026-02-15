import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen, AlertCircle, Scissors, ChevronRight, Search,
  FileText, ExternalLink, ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getModuleBySlug, getTopicsByModule, wikiArticles, moduleColors, emergencySubgroups,
  getGuidelinesByTopic,
  WikiTopic,
} from "@/data/wikiMockData";
import { moduleIcons } from "@/data/wikiIcons";
import { cn } from "@/lib/utils";

// Mobile drill-down depth: "subgroups" | "topics" | "detail"
type MobileView = "subgroups" | "topics" | "detail";

const ModulePage = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const module = getModuleBySlug(moduleSlug || "");
  const [selectedSubgroup, setSelectedSubgroup] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileView, setMobileView] = useState<MobileView>("subgroups");

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

  const subgroups = isEmergency
    ? emergencySubgroups.filter(sg => topics.some(t => t.subgroup === sg))
    : [];
  const hasSubgroups = subgroups.length > 0;

  const filteredTopics = hasSubgroups && selectedSubgroup
    ? topics.filter(t => t.subgroup === selectedSubgroup)
    : hasSubgroups ? [] : topics;

  const searchedTopics = searchQuery
    ? topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredTopics;

  const selectedArticles = selectedTopic
    ? wikiArticles.filter(a => a.topicSlug === selectedTopic.slug && a.moduleSlug === module.slug)
    : [];
  const selectedGuidelines = selectedTopic ? getGuidelinesByTopic(selectedTopic.slug) : [];

  const handleSubgroupClick = (sg: string) => {
    setSelectedSubgroup(sg === selectedSubgroup ? null : sg);
    setSelectedTopicId(null);
    setSearchQuery("");
    setMobileView("topics");
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopicId(topicId === selectedTopicId ? null : topicId);
    setMobileView("detail");
  };

  const handleMobileBack = () => {
    if (mobileView === "detail") {
      setSelectedTopicId(null);
      setMobileView("topics");
    } else if (mobileView === "topics") {
      setSelectedSubgroup(null);
      setMobileView("subgroups");
    }
  };

  // For modules without subgroups, start mobile at "topics"
  const effectiveMobileView = !hasSubgroups && mobileView === "subgroups" ? "topics" : mobileView;

  return (
    <div className="space-y-4 max-w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{module.title}</span>
      </nav>

      {/* Compact Module Header */}
      <div className="flex items-center gap-3 sm:gap-4 pb-3 border-b border-border">
        {iconSrc ? (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 border bg-card" style={{ borderColor: `${color}30` }}>
            <img src={iconSrc} alt={module.title} className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
          </div>
        ) : (
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
            <BookOpen size={18} style={{ color }} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-base sm:text-lg font-bold text-foreground truncate">{module.title}</h1>
            <Badge variant="outline" className="text-[10px] rounded-full font-semibold hidden sm:inline-flex" style={{ borderColor: `${color}40`, color }}>{module.phase}</Badge>
            {criticalCount > 0 && (
              <Badge className="bg-wiki-critical/10 text-wiki-critical text-[10px] rounded-full border-0">{criticalCount} critical</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs text-muted-foreground">
            <span>{module.topicCount} topics</span>
            <span>·</span>
            <span>{totalArticles} articles</span>
            <span className="hidden sm:inline">·</span>
            <div className="hidden sm:flex items-center gap-1.5">
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
          placeholder={`Search topics...`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) {
              setSelectedSubgroup(null);
              setSelectedTopicId(null);
              setMobileView("topics");
            }
          }}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* ===== MOBILE: Stacked drill-down ===== */}
      <div className="lg:hidden">
        {/* Mobile back button */}
        {(effectiveMobileView === "topics" && hasSubgroups || effectiveMobileView === "detail") && (
          <button
            onClick={handleMobileBack}
            className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3"
          >
            <ArrowLeft size={16} />
            <span>
              {effectiveMobileView === "detail"
                ? selectedSubgroup || "Topics"
                : "Categories"
              }
            </span>
          </button>
        )}

        {/* Mobile: Subgroups list */}
        {effectiveMobileView === "subgroups" && hasSubgroups && !searchQuery && (
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            <div className="px-3 py-2.5 border-b border-border bg-muted/30">
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Categories</p>
            </div>
            {subgroups.map(sg => {
              const sgTopics = topics.filter(t => t.subgroup === sg);
              const sgCritical = sgTopics.filter(t => t.is_critical).length;
              return (
                <button
                  key={sg}
                  onClick={() => handleSubgroupClick(sg)}
                  className="w-full text-left px-4 py-3 flex items-center gap-2 text-sm border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground">{sg}</span>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted-foreground">
                      <span>{sgTopics.length} topics</span>
                      {sgCritical > 0 && <span className="text-wiki-critical font-medium">{sgCritical} critical</span>}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile: Topics list */}
        {effectiveMobileView === "topics" && (
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            <div className="px-3 py-2.5 border-b border-border bg-muted/30">
              <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">
                {searchQuery ? `Results (${searchedTopics.length})` : selectedSubgroup || "Topics"}
              </p>
            </div>
            {searchedTopics.length > 0 ? (
              searchedTopics.map(topic => {
                const readStatus = topic.readCount === 0 ? "none" : topic.readCount >= topic.articleCount ? "all" : "partial";
                return (
                  <button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic.id)}
                    className="w-full text-left px-4 py-3 flex items-center gap-2 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                  >
                    <span className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      readStatus === "all" ? "bg-wiki-read" : readStatus === "partial" ? "bg-wiki-stale" : "bg-muted-foreground/30"
                    )} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-foreground">{topic.title}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {topic.is_critical && <Badge className="bg-wiki-critical/10 text-wiki-critical text-[9px] px-1 py-0 rounded-full border-0">CRITICAL</Badge>}
                        {topic.indexProcedures.length > 0 && <Badge className="bg-wiki-index/10 text-wiki-index text-[9px] px-1 py-0 rounded-full border-0">INDEX</Badge>}
                        <span className="text-[10px] text-muted-foreground">{topic.articleCount} articles</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                {hasSubgroups && !selectedSubgroup && !searchQuery ? "Select a category" : "No topics found"}
              </div>
            )}
          </div>
        )}

        {/* Mobile: Topic detail */}
        {effectiveMobileView === "detail" && selectedTopic && (
          <TopicDetailPanel
            topic={selectedTopic}
            color={color}
            moduleSlug={module.slug}
            articles={selectedArticles}
            guidelines={selectedGuidelines}
          />
        )}
      </div>

      {/* ===== DESKTOP: Cascading columns ===== */}
      <div className="hidden lg:flex border border-border rounded-xl overflow-hidden bg-card min-h-[500px]">
        {/* Column 1: Subgroups */}
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
                    onClick={() => { setSelectedSubgroup(sg === selectedSubgroup ? null : sg); setSelectedTopicId(null); setSearchQuery(""); }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 flex items-center gap-2 text-sm transition-colors",
                      isActive ? "text-card font-semibold" : "text-foreground hover:bg-muted/50"
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
                    onClick={() => setSelectedTopicId(topic.id === selectedTopicId ? null : topic.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 flex items-center gap-2 transition-colors",
                      isActive ? "text-card font-semibold" : "text-foreground hover:bg-muted/50"
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
                          <Badge className={cn("text-[9px] px-1 py-0 rounded-full border-0", isActive ? "bg-card/20 text-card" : "bg-wiki-critical/10 text-wiki-critical")}>CRITICAL</Badge>
                        )}
                        {topic.indexProcedures.length > 0 && (
                          <Badge className={cn("text-[9px] px-1 py-0 rounded-full border-0", isActive ? "bg-card/20 text-card" : "bg-wiki-index/10 text-wiki-index")}>INDEX</Badge>
                        )}
                        <span className={cn("text-[10px]", isActive ? "text-card/70" : "text-muted-foreground")}>{topic.articleCount} articles</span>
                      </div>
                    </div>
                    <ChevronRight size={14} className={cn("shrink-0 opacity-50", isActive && "opacity-100")} />
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <p className="text-sm">{hasSubgroups && !selectedSubgroup && !searchQuery ? "Select a category to view topics" : "No topics found"}</p>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Detail */}
        <div className="flex-1 overflow-y-auto">
          {selectedTopic ? (
            <TopicDetailPanel
              topic={selectedTopic}
              color={color}
              moduleSlug={module.slug}
              articles={selectedArticles}
              guidelines={selectedGuidelines}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <BookOpen size={20} className="text-muted-foreground/40" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">Select a topic</h3>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  {hasSubgroups ? "Choose a category, then a topic to see articles" : "Click on a topic to see its articles"}
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

/* ===== Shared Topic Detail Panel ===== */
const TopicDetailPanel = ({
  topic, color, moduleSlug, articles, guidelines,
}: {
  topic: WikiTopic;
  color: string;
  moduleSlug: string;
  articles: typeof wikiArticles;
  guidelines: ReturnType<typeof getGuidelinesByTopic>;
}) => (
  <div>
    <div className="px-4 sm:px-5 py-4 border-b border-border" style={{ backgroundColor: `${color}08` }}>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[9px] px-1.5 rounded-full border-0">CRITICAL</Badge>}
        {topic.phase_tags.map(pt => (
          <Badge key={pt} variant="outline" className="text-[9px] rounded-full">{pt}</Badge>
        ))}
      </div>
      <h2 className="text-base sm:text-lg font-bold text-foreground">{topic.title}</h2>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{topic.description}</p>
    </div>

    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">
      {topic.is_critical && (
        <div className="border-l-4 border-l-wiki-critical bg-wiki-critical-bg rounded-r-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <AlertCircle size={14} className="text-wiki-critical" />
            <span className="text-xs font-bold text-wiki-critical">Critical Condition</span>
          </div>
          <p className="text-sm font-semibold text-foreground">{topic.critical_label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{topic.critical_assessment_note}</p>
        </div>
      )}

      {topic.indexProcedures.length > 0 && (
        <div className="border-l-4 border-l-wiki-index bg-wiki-index-bg rounded-r-lg p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Scissors size={14} className="text-wiki-index" />
            <span className="text-xs font-bold text-wiki-index">Index Procedures</span>
          </div>
          <ul className="space-y-1">
            {topic.indexProcedures.map(ip => (
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

      <div>
        <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Articles ({articles.length})</h3>
        {articles.length > 0 ? (
          <div className="space-y-1.5">
            {articles.map(article => (
              <Link
                key={article.id}
                to={`/members/wiki/${moduleSlug}/${topic.slug}/${article.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{article.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground flex-wrap">
                    <DepthBadge depth={article.depth} />
                    <span>{article.estimated_read_minutes} min</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{article.author.name}</span>
                  </div>
                </div>
                {article.isRead && <span className="text-wiki-read text-xs bg-wiki-read/10 px-1.5 py-0.5 rounded-full">✓</span>}
                <ChevronRight size={14} className="text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <Link to={`/members/wiki/${moduleSlug}/${topic.slug}`} className="block">
            <div className="p-4 rounded-lg border border-dashed border-border text-center hover:bg-muted/30 transition-colors">
              <p className="text-sm text-muted-foreground">View all content for this topic</p>
              <span className="text-xs text-primary font-medium mt-1 inline-block">Browse Topic →</span>
            </div>
          </Link>
        )}
      </div>

      {guidelines.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Guidelines ({guidelines.length})</h3>
          <div className="space-y-1.5">
            {guidelines.map(g => (
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

      <div className="pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          8 questions available → <Link to="/members/questions" className="text-primary font-semibold hover:underline">Test yourself</Link>
        </p>
      </div>
    </div>
  </div>
);

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
