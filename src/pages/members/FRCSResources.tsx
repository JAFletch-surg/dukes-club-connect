import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, GraduationCap, ExternalLink } from "lucide-react";

const resources = [
  {
    title: "Question Bank",
    description: "500+ colorectal MCQs with detailed explanations covering all major topics.",
    icon: FileText,
    badge: "500+ Qs",
    link: "/members/questions",
    available: true,
  },
  {
    title: "Viva Preparation",
    description: "Structured clinical scenarios and model answers for viva practice.",
    icon: GraduationCap,
    badge: "30+ scenarios",
    link: null,
    available: false,
  },
  {
    title: "Revision Notes",
    description: "Concise topic summaries for key areas of colorectal surgery.",
    icon: BookOpen,
    badge: "Coming soon",
    link: null,
    available: false,
  },
  {
    title: "External Resources",
    description: "Curated links to courses, question banks, and revision materials.",
    icon: ExternalLink,
    badge: "Updated",
    link: null,
    available: false,
  },
];

const FRCSResources = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">FRCS Resources</h1>
        <p className="text-muted-foreground mt-1">Everything you need for exam preparation</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {resources.map((resource) => {
          const Wrapper = resource.available ? Link : "div";
          const wrapperProps = resource.available ? { to: resource.link! } : {};
          return (
            <Wrapper key={resource.title} {...(wrapperProps as any)}>
              <Card className={`border h-full transition-shadow ${resource.available ? "hover:shadow-md cursor-pointer" : "opacity-70"}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                      <resource.icon size={20} className="text-navy" />
                    </div>
                    <Badge variant={resource.available ? "default" : "secondary"} className="text-[10px]">
                      {resource.badge}
                    </Badge>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{resource.description}</p>
                  {!resource.available && (
                    <p className="text-xs text-muted-foreground/60 mt-3 italic">Coming soon</p>
                  )}
                </CardContent>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
};

export default FRCSResources;
