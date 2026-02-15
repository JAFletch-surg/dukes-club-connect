import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { criticalConditions } from "@/data/wikiMockData";

const categories = ["General", "Colorectal", "Upper GI", "Vascular"];

const CriticalConditionsPage = () => {
  const readCount = criticalConditions.filter(c => c.isRead).length;
  const total = criticalConditions.length;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Critical Conditions</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle size={20} className="text-wiki-critical" />
          <h1 className="text-xl font-bold text-foreground">Critical Conditions Checklist</h1>
        </div>
        <p className="text-sm text-muted-foreground">Conditions where misdiagnosis could have devastating consequences for life or limb</p>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={(readCount / total) * 100} className="h-2.5 flex-1 max-w-xs [&>div]:bg-gold" />
          <span className="text-sm font-semibold text-foreground">{readCount} of {total}</span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">ISCP General Surgery Curriculum, Appendix 3</p>
      </div>

      {/* Categories */}
      {categories.map(cat => {
        const conditions = criticalConditions.filter(c => c.category === cat);
        if (conditions.length === 0) return null;
        return (
          <div key={cat}>
            <h2 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-2">{cat}</h2>
            <div className="space-y-2">
              {conditions.map(cc => (
                <Card key={cc.id} className="border">
                  <CardContent className="p-4 flex items-start gap-3">
                    {cc.isRead ? (
                      <CheckCircle2 size={20} className="text-wiki-read mt-0.5 shrink-0" />
                    ) : (
                      <Circle size={20} className="text-wiki-unread mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{cc.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Module: {cc.module}</p>
                      <p className="text-xs text-muted-foreground">Assessment: {cc.assessment}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Link to={`/members/wiki/${cc.moduleSlug}/${cc.topicSlug}`}>
                          <Button variant="outline" size="sm" className="h-7 text-xs">Read Article →</Button>
                        </Link>
                        <Link to="/members/questions">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Practice Questions →</Button>
                        </Link>
                      </div>
                      {cc.isRead && cc.readDaysAgo !== undefined && (
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          Read {cc.readDaysAgo} days ago
                          {cc.readDaysAgo > 30 && <Badge className="ml-1.5 bg-wiki-stale/10 text-wiki-stale text-[9px] px-1 py-0 border-0">Needs refresh</Badge>}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CriticalConditionsPage;
