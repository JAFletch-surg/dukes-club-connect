import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Events & Courses", path: "/events" },
  { label: "News & Blog", path: "/news" },
  { label: "Exams & Training", path: "/exams" },
  { label: "Annual Weekend", path: "/annual-weekend" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-navy-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-serif font-bold text-navy-foreground">
            Dukes<span className="text-gold">'</span> Club
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-navy-foreground/80 hover:text-navy-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/join">
            <Button variant="gold" size="sm" className="ml-2">
              Join / Login
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-navy-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-navy-foreground/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.path
                  ? "text-gold"
                  : "text-navy-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/join" onClick={() => setMobileOpen(false)}>
            <Button variant="gold" size="sm" className="mt-2 w-full">
              Join / Login
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
