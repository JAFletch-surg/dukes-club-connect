import { useState } from "react";
import { ContentBlock } from "@/data/wikiMockData";
import { Lightbulb, AlertTriangle, Star, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const calloutConfig = {
  key_point: { icon: Lightbulb, label: "Key Point", borderClass: "border-l-wiki-keypoint", bgClass: "bg-wiki-keypoint-bg", iconClass: "text-wiki-keypoint" },
  warning: { icon: AlertTriangle, label: "Warning", borderClass: "border-l-wiki-warning", bgClass: "bg-wiki-warning-bg", iconClass: "text-wiki-warning" },
  clinical_pearl: { icon: Star, label: "Clinical Pearl", borderClass: "border-l-wiki-pearl", bgClass: "bg-wiki-pearl-bg", iconClass: "text-wiki-pearl" },
  exam_tip: { icon: GraduationCap, label: "Exam Tip", borderClass: "border-l-wiki-examtip", bgClass: "bg-wiki-examtip-bg", iconClass: "text-wiki-examtip" },
};

const RenderBlock = ({ block }: { block: ContentBlock }) => {
  const [expanded, setExpanded] = useState(false);

  switch (block.type) {
    case "heading": {
      const Tag = block.level === 2 ? "h2" : block.level === 3 ? "h3" : "h4";
      const sizes = { 2: "text-xl font-bold mt-8 mb-3", 3: "text-lg font-semibold mt-6 mb-2", 4: "text-base font-semibold mt-4 mb-2" };
      return <Tag id={block.text?.toLowerCase().replace(/\s+/g, "-")} className={cn(sizes[block.level as 2 | 3 | 4] || sizes[2], "text-foreground")}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="text-foreground/90 leading-[1.75] mb-4" style={{ fontSize: "16px" }}>{block.text}</p>;
    case "list":
      if (block.ordered) {
        return <ol className="list-decimal pl-6 mb-4 space-y-1.5">{block.items?.map((item, i) => <li key={i} className="text-foreground/90 leading-relaxed">{item}</li>)}</ol>;
      }
      return <ul className="list-disc pl-6 mb-4 space-y-1.5">{block.items?.map((item, i) => <li key={i} className="text-foreground/90 leading-relaxed">{item}</li>)}</ul>;
    case "table":
      return (
        <div className="overflow-x-auto mb-4 rounded-lg border border-border">
          <table className="w-full text-sm">
            {block.headers && (
              <thead><tr className="bg-muted/50">{block.headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border">{h}</th>)}</tr></thead>
            )}
            <tbody>{block.rows?.map((row, i) => <tr key={i} className="border-b border-border last:border-0"><>{row.map((cell, j) => <td key={j} className="px-4 py-2 text-foreground/80">{cell}</td>)}</></tr>)}</tbody>
          </table>
        </div>
      );
    case "key_point":
    case "warning":
    case "clinical_pearl":
    case "exam_tip": {
      const config = calloutConfig[block.type];
      const Icon = config.icon;
      return (
        <div className={cn("border-l-4 rounded-r-lg p-4 mb-4", config.borderClass, config.bgClass)}>
          <div className="flex items-center gap-2 mb-1.5">
            <Icon size={16} className={config.iconClass} />
            <span className={cn("text-sm font-semibold", config.iconClass)}>{config.label}</span>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">{block.text}</p>
        </div>
      );
    }
    case "expandable":
      return (
        <div className="border border-border rounded-lg mb-4">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors">
            {block.title}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expanded && <div className="px-4 pb-4 text-sm text-foreground/80 leading-relaxed border-t border-border pt-3">{block.content}</div>}
        </div>
      );
    case "reference":
      return (
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">References</h4>
          <ol className="list-decimal pl-5 space-y-1.5">{block.references?.map((ref) => <li key={ref.number} className="text-xs text-muted-foreground leading-relaxed">{ref.text}</li>)}</ol>
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
