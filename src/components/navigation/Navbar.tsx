import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, User, PlusCircle } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container-mobile">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">HireNearby</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/jobs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/jobs") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Find Work
            </Link>
            <Link
              to="/post-job"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/post-job") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Post a Job
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/jobs"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Work
              </Link>
              <Link
                to="/post-job"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Post a Job
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="pt-4 pb-2 border-t space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button variant="hero" className="w-full justify-start" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};