import { Card, CardContent } from "@/components/ui/card";
import { Radio, Mic } from "lucide-react";

const ComingSoon = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ElementType }) => (
  <div className="space-y-6 max-w-4xl">
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </div>
    <Card className="border">
      <CardContent className="p-12 text-center">
        <Icon size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <h2 className="text-xl font-semibold text-muted-foreground">Coming Soon</h2>
        <p className="text-sm text-muted-foreground/70 mt-2 max-w-md mx-auto">
          We're working on bringing this feature to you. Check back soon for updates.
        </p>
      </CardContent>
    </Card>
  </div>
);

export const LiveWebinars = () => (
  <ComingSoon title="Live Webinars" subtitle="Join live educational sessions" icon={Radio} />
);

export const Podcasts = () => (
  <ComingSoon title="Podcasts" subtitle="Listen to our podcast series" icon={Mic} />
);
