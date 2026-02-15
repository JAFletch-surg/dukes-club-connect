import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Bookmark, AlertCircle, Scissors } from "lucide-react";
import { getModuleBySlug, getTopicBySlug, getArticlesByTopic, moduleColors } from "@/data/wikiMockData";
import { cn } from "@/lib/utils";

const TopicArticlesPage = () => {
  const { moduleSlug, topicSlug } = useParams<{ moduleSlug: string; topicSlug: string }>();
  const module = getModuleBySlug(moduleSlug || "");
  const topic = getTopicBySlug(moduleSlug || "", topicSlug || "");
  const articles = getArticlesByTopic(topicSlug || "", moduleSlug || "");
  const color = module ? moduleColors[module.slug] || "#4a5568" : "#4a5568";

  if (!module || !topic) {
    return <div className="p-8 text-center text-muted-foreground">Topic not found</div>;
  }

  const totalReadTime = articles.reduce((s, a) => s + a.estimated_read_minutes, 0);
  const readCount = articles.filter(a => a.isRead).length;

  const depthConfig: Record<string, { label: string; className: string }> = {
    quick: { label: "Quick Review", className: "bg-wiki-read/10 text-wiki-read" },
    core: { label: "Core Topic", className: "bg-wiki-phase2/10 text-wiki-phase2" },
    deep: { label: "Deep Dive", className: "bg-primary/10 text-primary" },
  };

  return (
    <div className="space-y-4 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <Link to={`/members/wiki/${module.slug}`} className="hover:text-foreground transition-colors">{module.title}</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">{topic.title}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
          {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[10px] px-2 py-0">CRITICAL</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{topic.description}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>{articles.length} articles</span>
          <span>·</span>
          <span>{readCount} read</span>
          <span>·</span>
          <span>{totalReadTime} min total</span>
        </div>
        <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs gap-1"><Bookmark size={12} /> Bookmark Topic</Button>
      </div>

      {/* Critical / Index banners */}
      {topic.is_critical && (
        <div className="border-l-4 border-l-wiki-critical bg-wiki-critical-bg rounded-r-lg p-3 flex items-start gap-2">
          <AlertCircle size={16} className="text-wiki-critical mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">{topic.critical_label}</p>
            <p className="text-xs text-muted-foreground">{topic.critical_assessment_note}</p>
          </div>
        </div>
      )}
      {topic.indexProcedures.length > 0 && (
        <div className="border-l-4 border-l-wiki-index bg-wiki-index-bg rounded-r-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Scissors size={14} className="text-wiki-index" />
            <span className="text-xs font-semibold text-wiki-index">Index Procedures</span>
          </div>
          <ul className="text-sm text-foreground space-y-0.5">
            {topic.indexProcedures.map(ip => <li key={ip.id}>• {ip.procedure_name}{ip.pba_level ? ` (${ip.pba_level})` : ""}</li>)}
          </ul>
        </div>
      )}

      {/* Article Cards */}
      {articles.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {articles.map(article => {
            const dc = depthConfig[article.depth] || depthConfig.core;
            return (
              <Link key={article.id} to={`/members/wiki/${moduleSlug}/${topicSlug}/${article.slug}`}>
                <Card className={cn(
                  "border h-full hover:shadow-md transition-all duration-200",
                  article.isRead && "bg-wiki-read/5"
                )}>
                  <CardContent className="p-5">
                    <Badge className={cn("text-[10px] px-2 py-0 border-0 mb-2", dc.className)}>{dc.label}</Badge>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{article.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{article.author.name} · {new Date(article.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {article.estimated_read_minutes} min read</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {article.tags.map(tag => <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0">{tag}</Badge>)}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <Button variant="outline" size="sm" className="h-7 text-xs">Read Now</Button>
                      {article.isRead && <span className="text-xs text-wiki-read font-medium">✓ Read</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <Card className="border">
          <CardContent className="p-8 text-center">
            <BookOpen size={32} className="mx-auto text-muted-foreground/40 mb-3" />
            <h3 className="font-semibold text-foreground mb-1">No articles yet</h3>
            <p className="text-sm text-muted-foreground">Articles for this topic are being written. Check back soon!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TopicArticlesPage;
