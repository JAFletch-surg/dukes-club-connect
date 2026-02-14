import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logoNavy from "@/assets/logo-navy.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Backend integration placeholder
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/">
              <img src={logoNavy} alt="The Dukes' Club" className="h-14 mx-auto mb-4" />
            </Link>
            <h1 className="text-2xl font-serif font-bold text-foreground">Reset Password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send you a link to reset your password
            </p>
          </div>

          <Card className="border-2 shadow-lg">
            {submitted ? (
              <>
                <CardHeader className="text-center pb-2">
                  <Mail className="mx-auto h-12 w-12 text-gold mb-2" />
                  <CardTitle className="text-xl font-serif">Check Your Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    If an account exists for <span className="font-medium text-foreground">{email}</span>,
                    you'll receive a password reset link shortly.
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Link to="/login" className="w-full">
                    <Button variant="gold" className="w-full">
                      Back to Login
                    </Button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setEmail(""); }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Try a different email
                  </button>
                </CardFooter>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-sans">Forgot Password</CardTitle>
                  <CardDescription>
                    Enter the email address associated with your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email address</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
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
                        Sending…
                      </span>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Back to login
                  </Link>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
