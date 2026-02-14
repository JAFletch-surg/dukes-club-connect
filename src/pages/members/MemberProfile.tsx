import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { mockUser } from "@/data/mockMembersData";

const regions = [
  "London", "South East", "South West", "East of England", "West Midlands",
  "East Midlands", "North West", "North East", "Yorkshire", "Wales",
  "Scotland", "Northern Ireland", "International",
];

const trainingStages = [
  "Medical Student", "Foundation", "Core", "ST3", "ST4", "ST5", "ST6", "ST7", "ST8",
  "Post-CCT", "SAS Doctor", "Consultant",
];

const MemberProfile = () => {
  const [directoryVisible, setDirectoryVisible] = useState(mockUser.directorySettings.visible);
  const [settings, setSettings] = useState(mockUser.directorySettings);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      {/* Personal Information */}
      <Card className="border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue={mockUser.firstName} />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue={mockUser.lastName} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Input defaultValue={mockUser.email} disabled className="flex-1" />
                <Badge variant="outline" className="text-emerald-600 border-emerald-600 text-[10px] shrink-0">Verified</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hospital</Label>
              <Input defaultValue={mockUser.hospital} />
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <select className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm" defaultValue={mockUser.region}>
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Training Stage</Label>
              <select className="h-10 w-full px-3 rounded-md border border-input bg-background text-sm" defaultValue={mockUser.trainingStage}>
                {trainingStages.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <Button variant="default" size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      {/* ACPGBI Membership */}
      <Card className="border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">ACPGBI Membership</h2>
          <div className="flex items-center gap-3">
            <Input defaultValue={mockUser.acpgbiNumber} className="max-w-xs" />
            <Badge className="bg-emerald-600 text-emerald-50 text-[10px]">Active ACPGBI Member</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Directory Privacy */}
      <Card className="border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Directory Privacy</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Show me in the members directory</p>
              <p className="text-xs text-muted-foreground">Other members can find and connect with you</p>
            </div>
            <Switch checked={directoryVisible} onCheckedChange={setDirectoryVisible} />
          </div>
          {directoryVisible && (
            <>
              <Separator />
              <div className="space-y-3">
                {[
                  { key: "showEmail", label: "Show email address" },
                  { key: "showHospital", label: "Show hospital" },
                  { key: "showRegion", label: "Show region" },
                  { key: "showTrainingStage", label: "Show training stage" },
                  { key: "showSubspecialties", label: "Show subspecialty interests" },
                  { key: "showSocial", label: "Show social links" },
                ].map((toggle) => (
                  <div key={toggle.key} className="flex items-center justify-between">
                    <Label className="font-normal">{toggle.label}</Label>
                    <Switch
                      checked={(settings as any)[toggle.key]}
                      onCheckedChange={(checked) => setSettings({ ...settings, [toggle.key]: checked })}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="border">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Account</h2>
          <div className="flex gap-3 flex-wrap">
            <Button variant="outline" size="sm">Change Password</Button>
            <Button variant="outline" size="sm">Notification Preferences</Button>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberProfile;
