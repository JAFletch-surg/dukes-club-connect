import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, UserCog, BarChart3, Megaphone, Lock } from "lucide-react";

const AdminPlaceholder = ({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ElementType }) => (
  <div className="space-y-6 max-w-4xl">
    <div>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground mt-1">{subtitle}</p>
    </div>
    <Card className="border">
      <CardContent className="p-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-navy/10 flex items-center justify-center">
          <Icon size={28} className="text-navy" />
        </div>
        <div>
          <p className="text-lg font-semibold text-foreground">Coming Soon</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            This admin feature is under development. It will be available once authentication and role-based access control are enabled.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
          <Lock size={12} />
          <span>Requires Admin role</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const AdminUserManagement = () => (
  <AdminPlaceholder title="User Management" subtitle="Manage member accounts, roles, and approvals" icon={UserCog} />
);

export const AdminContentManager = () => (
  <AdminPlaceholder title="Content Manager" subtitle="Manage videos, events, fellowships, and question bank content" icon={Megaphone} />
);

export const AdminAnalytics = () => (
  <AdminPlaceholder title="Analytics" subtitle="View platform usage, engagement metrics, and member activity" icon={BarChart3} />
);

export const AdminRoleManagement = () => (
  <AdminPlaceholder title="Role Management" subtitle="Configure roles, permissions, and access levels" icon={ShieldCheck} />
);
