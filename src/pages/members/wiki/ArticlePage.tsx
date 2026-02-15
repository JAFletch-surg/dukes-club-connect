import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight, Star, Bookmark, Share2, ThumbsUp, ThumbsDown,
  ArrowLeft, ArrowRight, List, ChevronDown,
} from "lucide-react";
import {
  getArticleBySlug, getModuleBySlug, getTopicBySlug, getArticlesByTopic,
  moduleColors, ContentBlock,
} from "@/data/wikiMockData";
import ArticleRenderer from "@/components/wiki/ArticleRenderer";
import { cn } from "@/lib/utils";

const ArticlePage = () => {
  const { moduleSlug, topicSlug, articleSlug } = useParams<{ moduleSlug: string; topicSlug: string; articleSlug: string }>();
  const [readProgress, setReadProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const article = getArticleBySlug(moduleSlug || "", topicSlug || "", articleSlug || "");
  const module = getModuleBySlug(moduleSlug || "");
  const topic = getTopicBySlug(moduleSlug || "", topicSlug || "");
  const siblingArticles = getArticlesByTopic(topicSlug || "", moduleSlug || "");
  const currentIndex = siblingArticles.findIndex(a => a.slug === articleSlug);
  const prevArticle = currentIndex > 0 ? siblingArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < siblingArticles.length - 1 ? siblingArticles[currentIndex + 1] : null;

  const color = module ? moduleColors[module.slug] || "#4a5568" : "#4a5568";

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const rect = el.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const total = el.scrollHeight - window.innerHeight;
      setReadProgress(Math.min(100, (scrolled / Math.max(total, 1)) * 100));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract headings for TOC
  const headings = article?.content.filter(b => b.type === "heading" && (b.level === 2 || b.level === 3)) || [];

  if (!article || !module || !topic) {
    return <div className="p-8 text-center text-muted-foreground">Article not found</div>;
  }

  const depthConfig = {
    quick: { label: "Quick Review", className: "bg-wiki-read/10 text-wiki-read" },
    core: { label: "Core Topic", className: "bg-wiki-phase2/10 text-wiki-phase2" },
    deep: { label: "Deep Dive", className: "bg-primary/10 text-primary" },
  };
  const dc = depthConfig[article.depth];

  return (
    <div className="max-w-6xl">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5">
        <div className="h-full bg-gold transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki</Link>
        <ChevronRight size={12} />
        <Link to={`/members/wiki/${module.slug}`} className="hover:text-foreground transition-colors">{module.title}</Link>
        <ChevronRight size={12} />
        <Link to={`/members/wiki/${module.slug}/${topic.slug}`} className="hover:text-foreground transition-colors">{topic.title}</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0" ref={contentRef}>
          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={cn("text-[10px] px-2 py-0 border-0", dc.className)}>{dc.label}</Badge>
              <Badge variant="outline" className="text-[10px]">{module.phase}</Badge>
              {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[10px] px-2 py-0">CRITICAL</Badge>}
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{article.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-navy-foreground text-[10px] font-bold">
                  {article.author.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.role}</p>
                </div>
              </div>
              <span className="text-xs">·</span>
              <span className="text-xs">{new Date(article.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span className="text-xs">·</span>
              <span className="text-xs">{article.estimated_read_minutes} min read</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5"><Bookmark size={14} /> Bookmark</Button>
              <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5"><Share2 size={14} /> Share</Button>
            </div>
          </div>

          {/* Key Points */}
          <div className="border-l-4 border-l-gold bg-gold/5 rounded-r-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-gold" />
              <span className="text-sm font-bold text-foreground">Key Points</span>
            </div>
            <ul className="space-y-1.5">
              {article.key_points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="text-gold mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full article body */}
          <div className={cn(!showFullArticle && "hidden sm:block")}>
            <ArticleRenderer content={article.content} />
          </div>
          <div className="sm:hidden">
            {!showFullArticle && (
              <Button variant="outline" onClick={() => setShowFullArticle(true)} className="w-full mt-4">
                Read full article ↓
              </Button>
            )}
          </div>

          {/* Test Your Knowledge */}
          <Card className="border mt-8">
            <CardContent className="p-5">
              <h3 className="font-semibold text-foreground mb-2">Test Your Knowledge</h3>
              <p className="text-sm text-muted-foreground mb-3">8 questions available on this topic</p>
              <Link to="/members/questions">
                <Button variant="outline" size="sm">Practice on this topic →</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            {prevArticle ? (
              <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${prevArticle.slug}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                <ArrowLeft size={14} /> {prevArticle.title}
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${nextArticle.slug}`} className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                {nextArticle.title} <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>

          {/* Feedback */}
          <div className="flex items-center justify-center gap-4 mt-6 py-4 border-t border-border">
            <span className="text-sm text-muted-foreground">Was this article helpful?</span>
            <Button variant="ghost" size="sm" className="h-8 gap-1"><ThumbsUp size={14} /></Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1"><ThumbsDown size={14} /></Button>
          </div>

          {/* Author */}
          <Card className="border mt-4">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-navy-foreground text-xs font-bold shrink-0">
                {article.author.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">{article.author.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TOC Sidebar (desktop) */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-16">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-3">On this page</p>
            <nav className="space-y-1">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#${h.text?.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    "block text-xs text-muted-foreground hover:text-foreground transition-colors py-1",
                    h.level === 3 && "pl-3"
                  )}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Mobile TOC */}
      <button
        onClick={() => setShowTOC(!showTOC)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-navy text-navy-foreground rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
      >
        <List size={18} />
      </button>
      {showTOC && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-xl shadow-xl max-h-[50vh] overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Table of Contents</p>
            <button onClick={() => setShowTOC(false)} className="text-muted-foreground"><ChevronDown size={18} /></button>
          </div>
          <nav className="space-y-2">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.text?.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setShowTOC(false)}
                className={cn("block text-sm text-muted-foreground hover:text-foreground py-1", h.level === 3 && "pl-4")}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border flex items-center justify-around py-2 z-30">
        <Button variant="ghost" size="sm" className="text-xs gap-1"><Bookmark size={14} /> Save</Button>
        <Button variant="ghost" size="sm" className="text-xs gap-1"><Share2 size={14} /> Share</Button>
        {nextArticle && (
          <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${nextArticle.slug}`}>
            <Button variant="gold" size="sm" className="text-xs gap-1">Next <ArrowRight size={14} /></Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
