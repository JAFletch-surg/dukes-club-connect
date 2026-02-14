import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Search, Eye } from "lucide-react";
import { mockVideos } from "@/data/mockMembersData";

const categories = ["All", "Operative", "Complications", "Webinar", "Education"];

const VideoArchive = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return mockVideos.filter((v) => {
      const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.speaker.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || v.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Video Archive</h1>
        <p className="text-muted-foreground mt-1">Educational videos, operative recordings, and lectures</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or speaker..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                category === cat
                  ? "bg-navy text-navy-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((video) => (
          <Card key={video.id} className="border overflow-hidden cursor-pointer hover:shadow-md transition-shadow group">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-navy flex items-center justify-center">
              <Play size={32} className="text-navy-foreground/60 group-hover:text-navy-foreground transition-colors" />
              <Badge className="absolute top-2 left-2 text-[10px]" variant="secondary">
                {video.category}
              </Badge>
              <span className="absolute bottom-2 right-2 bg-foreground/70 text-background text-[10px] font-mono px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
            </div>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{video.title}</h3>
              <p className="text-xs text-muted-foreground mt-1.5">{video.speaker}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>{new Date(video.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {video.views}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No videos found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default VideoArchive;
