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
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
        <div className="h-full bg-gold rounded-r-full transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 flex-wrap">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki</Link>
        <ChevronRight size={12} />
        <Link to={`/members/wiki/${module.slug}`} className="hover:text-foreground transition-colors">{module.title}</Link>
        <ChevronRight size={12} />
        <Link to={`/members/wiki/${module.slug}/${topic.slug}`} className="hover:text-foreground transition-colors">{topic.title}</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{article.title}</span>
      </nav>

      <div className="flex gap-10">
        {/* Main Content */}
        <div className="flex-1 min-w-0" ref={contentRef}>
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge className={cn("text-[10px] px-2.5 py-0.5 border-0 rounded-full", dc.className)}>{dc.label}</Badge>
              <Badge variant="outline" className="text-[10px] rounded-full">{module.phase}</Badge>
              {topic.is_critical && <Badge className="bg-wiki-critical text-card text-[10px] px-2.5 py-0.5 rounded-full">CRITICAL</Badge>}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-navy-foreground text-xs font-bold shadow-sm">
                  {article.author.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.role}</p>
                </div>
              </div>
              <span className="text-muted-foreground/30">|</span>
              <span className="text-xs">{new Date(article.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs">{article.estimated_read_minutes} min read</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-full"><Bookmark size={13} /> Bookmark</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 rounded-full"><Share2 size={13} /> Share</Button>
            </div>
          </div>

          {/* Key Points */}
          <Card className="border-l-4 border-l-gold border rounded-xl mb-8 overflow-hidden">
            <div className="bg-gold/5 px-5 py-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gold/15 flex items-center justify-center">
                  <Star size={14} className="text-gold" />
                </div>
                <span className="text-sm font-bold text-foreground">Key Points</span>
              </div>
              <ul className="space-y-2">
                {article.key_points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-gold/15 text-gold flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Full article body */}
          <div className={cn(!showFullArticle && "hidden sm:block")}>
            <ArticleRenderer content={article.content} />
          </div>
          <div className="sm:hidden">
            {!showFullArticle && (
              <Button variant="outline" onClick={() => setShowFullArticle(true)} className="w-full mt-4 rounded-xl">
                Read full article ↓
              </Button>
            )}
          </div>

          {/* Test Your Knowledge */}
          <Card className="border rounded-xl mt-10 overflow-hidden">
            <div className="bg-primary/5 border-b border-border/50 px-5 py-3">
              <h3 className="font-bold text-foreground text-sm">🧠 Test Your Knowledge</h3>
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-3">8 questions available on this topic</p>
              <Link to="/members/questions">
                <Button variant="outline" size="sm" className="rounded-full">Practice on this topic →</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
            {prevArticle ? (
              <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${prevArticle.slug}`} className="flex items-center gap-2 text-sm text-primary hover:underline group">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> {prevArticle.title}
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${nextArticle.slug}`} className="flex items-center gap-2 text-sm text-primary hover:underline group">
                {nextArticle.title} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ) : <div />}
          </div>

          {/* Feedback */}
          <div className="flex items-center justify-center gap-4 mt-8 py-5 bg-muted/20 rounded-xl">
            <span className="text-sm text-muted-foreground">Was this article helpful?</span>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full hover:bg-wiki-read/10 hover:text-wiki-read hover:border-wiki-read/30"><ThumbsUp size={14} /></Button>
            <Button variant="outline" size="sm" className="h-8 gap-1 rounded-full hover:bg-wiki-critical/10 hover:text-wiki-critical hover:border-wiki-critical/30"><ThumbsDown size={14} /></Button>
          </div>

          {/* Author */}
          <Card className="border rounded-xl mt-6 overflow-hidden">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-navy-foreground text-sm font-bold shrink-0 shadow-sm">
                {article.author.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{article.author.name}</p>
                <p className="text-xs text-muted-foreground">{article.author.role}</p>
                <p className="text-xs text-primary mt-0.5 hover:underline cursor-pointer">More articles by this author</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TOC Sidebar (desktop) */}
        <aside className="hidden lg:block w-[220px] shrink-0">
          <div className="sticky top-16">
            <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">On this page</p>
            <nav className="space-y-0.5 border-l-2 border-border">
              {headings.map((h, i) => (
                <a
                  key={i}
                  href={`#${h.text?.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    "block text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all py-1.5 px-3 -ml-[2px] border-l-2 border-transparent hover:border-gold rounded-r-md",
                    h.level === 3 && "pl-5"
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
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-navy text-navy-foreground rounded-full w-11 h-11 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <List size={18} />
      </button>
      {showTOC && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-2xl shadow-xl max-h-[50vh] overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-foreground">Table of Contents</p>
            <button onClick={() => setShowTOC(false)} className="text-muted-foreground p-1 hover:bg-muted/30 rounded-lg"><ChevronDown size={18} /></button>
          </div>
          <nav className="space-y-1">
            {headings.map((h, i) => (
              <a
                key={i}
                href={`#${h.text?.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setShowTOC(false)}
                className={cn("block text-sm text-muted-foreground hover:text-foreground py-1.5 px-3 rounded-lg hover:bg-muted/30 transition-colors", h.level === 3 && "pl-6")}
              >
                {h.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-card/95 backdrop-blur-sm border-t border-border flex items-center justify-around py-2.5 z-30">
        <Button variant="ghost" size="sm" className="text-xs gap-1"><Bookmark size={14} /> Save</Button>
        <Button variant="ghost" size="sm" className="text-xs gap-1"><Share2 size={14} /> Share</Button>
        {nextArticle && (
          <Link to={`/members/wiki/${moduleSlug}/${topicSlug}/${nextArticle.slug}`}>
            <Button size="sm" className="text-xs gap-1 bg-gold text-gold-foreground hover:bg-gold/90 rounded-full">Next <ArrowRight size={14} /></Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
