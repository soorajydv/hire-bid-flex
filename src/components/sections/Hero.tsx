import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, Users, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.2
      }} />

      <div className="container-mobile py-20 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="hero-title">
                Hire Locally,
                <br />
                Work Flexibly
              </h1>
              <p className="hero-subtitle lg:mx-0">
                Connect with skilled professionals in your area or find your next opportunity. 
                HireNearby makes it easy to hire and get hired in your local community.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
                <Link to="/jobs">
                  <Search className="w-5 h-5 mr-2" />
                  Find Work
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/20 hover:bg-primary/5" asChild>
                <Link to="/post-job">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Post a Job
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">1000+ Active Users</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-5 h-5 text-accent" />
                <span className="text-sm">500+ Jobs Posted</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-success" />
                <span className="text-sm">50+ Cities</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="Professionals connecting through HireNearby platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-card rounded-lg p-4 shadow-medium border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">New Job Posted</p>
                  <p className="text-xs text-muted-foreground">Plumber needed nearby</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-card rounded-lg p-4 shadow-medium border hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">3 Bids Received</p>
                  <p className="text-xs text-muted-foreground">Starting from $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};