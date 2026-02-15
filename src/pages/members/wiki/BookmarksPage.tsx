import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, ChevronRight } from "lucide-react";

const BookmarksPage = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/members/wiki" className="hover:text-foreground transition-colors">Wiki Home</Link>
        <ChevronRight size={12} />
        <span className="text-foreground font-medium">Bookmarks</span>
      </nav>

      <h1 className="text-xl font-bold text-foreground">My Bookmarks</h1>

      <Tabs defaultValue="topics">
        <TabsList>
          <TabsTrigger value="topics">Topics</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="topics">
          <EmptyBookmarks type="topics" />
        </TabsContent>
        <TabsContent value="articles">
          <EmptyBookmarks type="articles" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EmptyBookmarks = ({ type }: { type: string }) => (
  <Card className="border mt-4">
    <CardContent className="p-8 text-center">
      <Bookmark size={32} className="mx-auto text-muted-foreground/40 mb-3" />
      <h3 className="font-semibold text-foreground mb-1">No bookmarks yet</h3>
      <p className="text-sm text-muted-foreground">Browse the wiki and bookmark {type} you want to revisit.</p>
      <Link to="/members/wiki">
        <Button variant="outline" size="sm" className="mt-4">Browse Wiki</Button>
      </Link>
    </CardContent>
  </Card>
);

export default BookmarksPage;
