import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {submitted ? (
          <div className="text-center space-y-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                If an account exists for{" "}
                <span className="font-medium text-foreground">{email}</span>,
                you'll receive a password reset link shortly.
              </p>
            </div>
            <div className="space-y-3">
              <Link to="/login" className="block">
                <Button variant="gold" className="w-full h-11">
                  Back to Login
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setEmail(""); }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Try a different email
              </button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft size={14} />
                Back to login
              </Link>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Reset your password</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email address</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-11"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                className="w-full h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Reset Link
                    <ArrowRight size={16} />
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
