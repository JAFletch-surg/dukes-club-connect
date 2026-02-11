import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-32 pb-20 container mx-auto px-4 text-center">
      <p className="text-gold font-mono text-sm tracking-widest uppercase mb-2">Coming Soon</p>
      <h1 className="text-4xl font-serif font-bold text-foreground">{title}</h1>
      <p className="mt-4 text-muted-foreground">This page is under construction.</p>
    </div>
    <Footer />
  </div>
);

export const About = () => <PlaceholderPage title="About Dukes' Club" />;
export const Events = () => <PlaceholderPage title="Events & Courses" />;
export const News = () => <PlaceholderPage title="News & Blog" />;
export const Exams = () => <PlaceholderPage title="Exams & Training" />;
export const AnnualWeekend = () => <PlaceholderPage title="Annual Weekend" />;
export const Contact = () => <PlaceholderPage title="Contact Us" />;
export const Join = () => <PlaceholderPage title="Join / Login" />;
