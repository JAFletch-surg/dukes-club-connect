import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { mockDirectoryMembers } from "@/data/mockMembersData";

const regions = ["All", "London", "North West", "West Midlands", "Scotland", "South West", "Yorkshire", "East of England", "Northern Ireland"];

const MemberDirectory = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  const filtered = useMemo(() => {
    return mockDirectoryMembers.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.region.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = region === "All" || m.region === region;
      return matchesSearch && matchesRegion;
    });
  }, [search, region]);

  const getInitials = (name: string) => {
    const parts = name.replace(/^(Dr|Mr|Mrs|Ms|Prof)\s+/i, "").split(" ");
    return parts.map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Member Directory</h1>
        <p className="text-muted-foreground mt-1">Connect with fellow colorectal surgery trainees</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or region..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((member) => (
          <Card key={member.id} className="border">
            <CardContent className="p-5 text-center">
              <Avatar className="h-14 w-14 mx-auto mb-3">
                <AvatarFallback className="bg-navy text-navy-foreground text-sm font-semibold">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {member.trainingStage} · {member.region}
              </p>
              <Button variant="outline" size="sm" className="mt-3 w-full text-xs">
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MemberDirectory;
