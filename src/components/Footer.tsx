import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logoWhite} alt="The Dukes' Club" className="h-12 mb-4" />
            <p className="text-sm text-navy-foreground/60">
              The UK's leading colorectal surgery trainee society, supporting the next generation of colorectal surgeons.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-navy-foreground/70">
              <li><Link to="/about" className="hover:text-navy-foreground transition-colors">About Us</Link></li>
              <li><Link to="/events" className="hover:text-navy-foreground transition-colors">Events & Courses</Link></li>
              <li><Link to="/exams" className="hover:text-navy-foreground transition-colors">Exams & Training</Link></li>
              <li><Link to="/annual-weekend" className="hover:text-navy-foreground transition-colors">Annual Weekend</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-navy-foreground/70">
              <li><Link to="/news" className="hover:text-navy-foreground transition-colors">News & Blog</Link></li>
              <li><Link to="/contact" className="hover:text-navy-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/join" className="hover:text-navy-foreground transition-colors">Join / Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold mb-4">Connect</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="text-navy-foreground/60 hover:text-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-navy-foreground/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-navy-foreground/60 hover:text-gold transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-navy-foreground/60 hover:text-gold transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-foreground/10 text-center text-xs text-navy-foreground/40">
          © {new Date().getFullYear()} Dukes' Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
