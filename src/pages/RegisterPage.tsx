import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, UserPlus, CheckCircle, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logoNavy from "@/assets/logo-navy.png";

const APPROVED_DOMAINS = ["nhs.net", "nhs.uk", "doctors.org.uk"];
const APPROVED_SUFFIX = ".ac.uk";

const isApprovedDomain = (email: string): boolean => {
  const domain = email.split("@")[1]?.toLowerCase() || "";
  return (
    APPROVED_DOMAINS.includes(domain) ||
    domain.endsWith(APPROVED_SUFFIX)
  );
};

const trainingStages = [
  "Foundation Year",
  "Core Surgical Training",
  "ST3",
  "ST4",
  "ST5",
  "ST6",
  "ST7",
  "ST8",
  "Post-CCT Fellow",
  "Consultant",
  "Other",
];

const regions = [
  "East Midlands",
  "East of England",
  "London",
  "North East",
  "North West",
  "Scotland",
  "South East",
  "South West",
  "Wales",
  "West Midlands",
  "Yorkshire & Humber",
  "Northern Ireland",
  "International",
];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    region: "",
    trainingStage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [approvalType, setApprovalType] = useState<"auto" | "pending" | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const approved = isApprovedDomain(formData.email);
    
    // Backend integration placeholder
    setTimeout(() => {
      setIsLoading(false);
      setApprovalType(approved ? "auto" : "pending");
      setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
          <Card className="w-full max-w-md border-2 shadow-lg text-center">
            <CardHeader className="pb-2">
              {approvalType === "auto" ? (
                <CheckCircle className="mx-auto h-12 w-12 text-gold mb-2" />
              ) : (
                <Clock className="mx-auto h-12 w-12 text-gold mb-2" />
              )}
              <CardTitle className="text-xl font-sans">
                {approvalType === "auto" ? "Account Created!" : "Registration Received"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                {approvalType === "auto"
                  ? "Your NHS/academic email has been verified. Please check your inbox for a verification link to activate your Trainee account."
                  : "Your account is pending approval by an administrator. You'll receive an email notification once your account has been approved."}
              </p>
              <p className="text-xs text-muted-foreground">
                A verification email has been sent to <span className="font-medium text-foreground">{formData.email}</span>
              </p>
            </CardContent>
            <CardFooter className="justify-center">
              <Link to="/login">
                <Button variant="gold">Go to Login</Button>
              </Link>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logoNavy} alt="The Dukes' Club" className="h-14 mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-sans font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Join the Dukes' Club community
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-sans">Sign Up</CardTitle>
                <CardDescription>
                  NHS, academic &amp; doctors.org.uk emails are auto-approved as Trainee members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Dr. Jane Smith"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-email">
                    Email address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="you@nhs.net"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    autoComplete="email"
                    required
                  />
                  {formData.email && formData.email.includes("@") && (
                    <p className={`text-xs ${isApprovedDomain(formData.email) ? "text-gold" : "text-muted-foreground"}`}>
                      {isApprovedDomain(formData.email)
                        ? "✓ Recognised domain — you'll be auto-approved as Trainee"
                        : "Account will require admin approval"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      autoComplete="new-password"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Confirm password <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Region</Label>
                    <Select value={formData.region} onValueChange={(v) => updateField("region", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Training stage</Label>
                    <Select value={formData.trainingStage} onValueChange={(v) => updateField("trainingStage", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {trainingStages.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Creating account…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus size={16} />
                      Create Account
                    </span>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-gold font-medium hover:text-gold/80 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
