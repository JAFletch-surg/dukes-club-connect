import { useState } from "react";
import { ContentBlock } from "@/data/wikiMockData";
import { Lightbulb, AlertTriangle, Star, GraduationCap, ChevronDown, ChevronUp, Play, ZoomIn, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const calloutConfig = {
  key_point: { icon: Lightbulb, label: "Key Point", borderClass: "border-l-wiki-keypoint", bgClass: "bg-wiki-keypoint-bg", iconClass: "text-wiki-keypoint" },
  warning: { icon: AlertTriangle, label: "Warning", borderClass: "border-l-wiki-warning", bgClass: "bg-wiki-warning-bg", iconClass: "text-wiki-warning" },
  clinical_pearl: { icon: Star, label: "Clinical Pearl", borderClass: "border-l-wiki-pearl", bgClass: "bg-wiki-pearl-bg", iconClass: "text-wiki-pearl" },
  exam_tip: { icon: GraduationCap, label: "Exam Tip", borderClass: "border-l-wiki-examtip", bgClass: "bg-wiki-examtip-bg", iconClass: "text-wiki-examtip" },
};

const RenderBlock = ({ block }: { block: ContentBlock }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  switch (block.type) {
    case "heading": {
      const Tag = block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";
      const sizes = {
        2: "text-xl font-bold mt-10 mb-4 text-foreground pb-2 border-b border-border/50",
        3: "text-lg font-semibold mt-7 mb-3 text-foreground",
        4: "text-base font-semibold mt-5 mb-2 text-foreground",
      };
      return <Tag id={block.text?.toLowerCase().replace(/\s+/g, "-")} className={cn(sizes[block.level as 2 | 3 | 4] || sizes[2])}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="text-foreground/90 leading-[1.8] mb-5" style={{ fontSize: "16px" }}>{block.text}</p>;
    case "list":
      if (block.ordered) {
        return (
          <ol className="list-none pl-0 mb-5 space-y-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-foreground/90 leading-relaxed">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="list-none pl-0 mb-5 space-y-2">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/90 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-border shadow-sm">
          <table className="w-full text-sm">
            {block.headers && (
              <thead>
                <tr className="bg-navy/5">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-bold text-foreground border-b-2 border-border text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 text-foreground/80">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "image":
      return (
        <figure className="mb-6">
          <div
            className={cn(
              "relative rounded-xl overflow-hidden border border-border bg-muted/20 cursor-pointer group transition-all",
              imageZoomed && "fixed inset-4 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center border-0 rounded-2xl"
            )}
            onClick={() => setImageZoomed(!imageZoomed)}
          >
            <img
              src={block.src || "/placeholder.svg"}
              alt={block.caption || "Article illustration"}
              className={cn(
                "w-full object-contain transition-transform",
                !imageZoomed && "max-h-[500px]",
                imageZoomed && "max-h-[90vh] max-w-[90vw]"
              )}
            />
            {!imageZoomed && (
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                <ZoomIn size={24} className="text-card opacity-0 group-hover:opacity-80 transition-opacity drop-shadow-lg" />
              </div>
            )}
          </div>
          {block.caption && (
            <figcaption className="text-xs text-muted-foreground text-center mt-2 italic">{block.caption}</figcaption>
          )}
        </figure>
      );
    case "video":
      return (
        <div className="mb-6">
          <div className="relative rounded-xl overflow-hidden border border-border bg-navy/5 aspect-video flex items-center justify-center">
            {block.src ? (
              <iframe
                src={block.src}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center">
                  <Play size={24} className="text-navy ml-1" />
                </div>
                <p className="text-sm font-medium">Video placeholder</p>
              </div>
            )}
          </div>
          {block.caption && (
            <p className="text-xs text-muted-foreground text-center mt-2">{block.caption}</p>
          )}
        </div>
      );
    case "image_gallery":
      return (
        <div className="mb-6">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin">
            {(block.images || []).map((img, i) => (
              <div key={i} className="flex-none w-72 snap-center">
                <div className="rounded-xl overflow-hidden border border-border bg-muted/20">
                  <img src={img.src || "/placeholder.svg"} alt={img.caption || `Image ${i + 1}`} className="w-full h-48 object-cover" />
                </div>
                {img.caption && <p className="text-[11px] text-muted-foreground mt-1.5 text-center">{img.caption}</p>}
              </div>
            ))}
          </div>
          {block.caption && <p className="text-xs text-muted-foreground text-center mt-1">{block.caption}</p>}
        </div>
      );
    case "key_point":
    case "warning":
    case "clinical_pearl":
    case "exam_tip": {
      const config = calloutConfig[block.type];
      const Icon = config.icon;
      return (
        <div className={cn("border-l-4 rounded-r-xl p-4 mb-5 shadow-sm", config.borderClass, config.bgClass)}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: "currentColor", opacity: 0.1 }}>
              <Icon size={14} className={config.iconClass} />
            </div>
            <span className={cn("text-xs font-bold uppercase tracking-wider", config.iconClass)}>{config.label}</span>
          </div>
          <p className="text-foreground/85 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    }
    case "expandable":
      return (
        <div className="border border-border rounded-xl mb-5 overflow-hidden shadow-sm">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/20 transition-colors">
            <span className="flex items-center gap-2">
              <ChevronDown size={16} className={cn("text-muted-foreground transition-transform", expanded && "rotate-180")} />
              {block.title}
            </span>
            <Badge variant="outline" className="text-[10px] rounded-full">Details</Badge>
          </button>
          {expanded && (
            <div className="px-4 pb-4 text-sm text-foreground/80 leading-relaxed border-t border-border pt-3 bg-muted/10">
              {block.content}
            </div>
          )}
        </div>
      );
    case "reference":
      return (
        <div className="mt-10 pt-6 border-t-2 border-border">
          <h4 className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">References</h4>
          <ol className="list-none space-y-2">
            {block.references?.map((ref) => (
              <li key={ref.number} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-muted/50 text-muted-foreground flex items-center justify-center text-[10px] font-bold shrink-0">{ref.number}</span>
                <span>{ref.text}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    default:
      return null;
  }
};

interface ArticleRendererProps {
  content: ContentBlock[];
}

const ArticleRenderer = ({ content }: ArticleRendererProps) => {
  return (
    <div className="max-w-[680px]">
      {content.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  );
};

export default ArticleRenderer;
